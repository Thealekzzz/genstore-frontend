import { useContext, useEffect, useRef, useState } from 'react';

import { SERVER_PORT, SERVER_URL } from '../../config';

import "./Evaluate.css";

import ColumnPickerTable from "../../components/ColumnPickerTable/ColumnPickerTable";
import ExtraBullsList from "../../components/ExtraBullsList/ExtraBullsList";

import PageHeading from '../../ui/PageHeading/PageHeading';
import SectionHeading from "../../ui/SectionHeading/SectionHeading";
import Paragraph from '../../ui/Paragraph/Paragraph';
import PreviewTable from "../../components/PreviewTable/PreviewTable";
import ButtonWithStatus from "../../components/ButtonWithStatus/ButtonWithStatus";
import ButtonAccent from '../../components/ButtonAccent/ButtonAccent';

import TokenContext from '../../contexts/TokenContext';

const allowedExtensions = ['.xlsx', '.csv'];

const Evaluate = () => {
    const fileInput = useRef();
    const continueButton = useRef();
    const pickForm = useRef();
    const columnPickerTable = useRef();
    // const downloadButton = useRef();

    const token = useContext(TokenContext);

    const [uploadFileStatus, setUploadFileStatus] = useState({ visible: false, status: "", message: "" });
    const [secondStepStatus, setSecondStepStatus] = useState({ visible: false, status: "", message: "" });
    const [thirdStepStatus, setThirdStepStatus] = useState({ visible: false, status: "", message: "" });
    const [isContinueButtonDisabled, setIsContinueButtonDisabled] = useState(true);

    const [currentStep, setCurrentStep] = useState({ step: 1 });

    const [childColumnInputValue, setChildColumnInputValue] = useState("A");

    const [tableDump, setTableDump] = useState([]);
    const [, setSavedFilename] = useState("");
    const [fileId, setFileId] = useState(null);
    const [extraMatchesBullsMarkers, setExtraMatchesBullsMarkers] = useState([]);
    const [thirdStepText, setThirdStepText] = useState([]);
    const [linkToResultFile, setLinkToResultFile] = useState("");


    function uploadFileButtonClick() {
        fileInput.current.click();

    }

    function uploadFileInputChange() {
        if (!fileInput.current.files.length) {
            console.log("Файл не выбран");
            return;
        }

        const filename = fileInput.current.files[0].name
        const fileExtension = filename.match(/\.[^.\\/:*?"<>|\r\n]+$/)[0];

        if (!allowedExtensions.includes(fileExtension)) {
            setUploadFileStatus({ visible: true, status: "Error", message: "Формат файла не поддерживается" });
            return;
        }

        let formData = new FormData();
        formData.append("file", fileInput.current.files[0]);
        formData.append("filename", filename);

        setUploadFileStatus({ visible: true, status: "Loading", message: "Загрузка файла" })

        fetch(`${SERVER_URL}:${SERVER_PORT}/api/files/upload/evaluate`, {
            method: "POST",
            body: formData,
            headers: {
                authorization: token ? "Bearer " + token : null,
                // "Content-Type": "multipart/form-data"
            }
        })
            .then(data => data.json())
            .then(data => {
                setUploadFileStatus({ visible: true, status: 'Success', message: 'Файл загружен' });

                setFileId(data.fileId);
                setTableDump(data.tableDump);

                // Показываю следующий этап с задержкой
                setTimeout(() => {
                    setCurrentStep({ step: 2 });
                }, 500);
            })
            .catch((err) => {
                setSecondStepStatus({ visible: true, status: "Error", message: err.message });
            })

    }

    function continueButtonClick() {
        setSecondStepStatus({ visible: true, status: "Loading", message: "Поиск быков в БД" });

        const inputs = [...columnPickerTable.current.querySelectorAll("input")];

        let objectData = {
            fileId,
            childColumnSymbol: childColumnInputValue,
            parentsMarkers: {
                parentsNames: inputs.slice(0, 3).map(cell => cell.value),
                parentsNAABs: inputs.slice(3, 6).map(cell => cell.value),
                parentsIDs: inputs.slice(6, 9).map(cell => cell.value),
                parentsInvs: inputs.slice(9, 12).map(cell => cell.value),
            }
        };

        fetch(`${SERVER_URL}:${SERVER_PORT}/api/evaluation/find-bulls`, {
            method: "POST",
            body: JSON.stringify(objectData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(data => data.json())
            .then(data => {
                setSecondStepStatus({ visible: true, status: data.status, message: data.message });

                const parentsWithNoMatches = [];
                const parentsWithSingleMatch = [];
                const parentsWithExtraMatches = [];

                for (const key in data.uniqueParentsWithDataFromDB) {
                    const matches = data.uniqueParentsWithDataFromDB[key].matches.length;
                    if (matches === 0) {
                        parentsWithNoMatches.push({
                            ...data.uniqueParentsWithDataFromDB[key],
                            name: key,
                        });

                    } else if (matches === 1) {
                        parentsWithSingleMatch.push({
                            ...data.uniqueParentsWithDataFromDB[key],
                            name: key,
                        });

                    } else {
                        parentsWithExtraMatches.push({
                            ...data.uniqueParentsWithDataFromDB[key],
                            name: key,
                        });
                    }
                }

                setExtraMatchesBullsMarkers(parentsWithExtraMatches);

                if (parentsWithExtraMatches?.length && parentsWithNoMatches.length) {
                    setThirdStepText({
                        title: "Уточнение данных",
                        paragraph: `Некоторых предков невозможно однозначно идентифицировать по имеющимся данным. Поэтому ниже для каждого такого предка нужно выбрать верного, найдя его по кличке. Также в базе не было найдено ${parentsWithNoMatches.length} быков: ${parentsWithNoMatches.map(el => el.name).join(", ")}.`
                    })

                } else if (parentsWithExtraMatches?.length) {
                    setThirdStepText({
                        title: "Уточнение данных",
                        paragraph: `Некоторых предков невозможно однозначно идентифицировать по имеющимся данным. Поэтому ниже для каждого такого предка нужно выбрать верного, найдя его по кличке.`
                    })

                } else if (parentsWithNoMatches?.length) {
                    setThirdStepText({
                        title: "Не все данные найдены",
                        paragraph: `В базе данных не было найдено ${parentsWithNoMatches.length} быков: ${parentsWithNoMatches.map(el => el.name).join(", ")}.`
                    })

                } else {
                    setThirdStepText({
                        title: "Все быки найдены в базе",
                        paragraph: `Данные всех быков найдены. Можно переходить к расчету показателей потомства.`
                    })

                }

                // Показываю следующий этап с задержкой
                setTimeout(() => {
                    setCurrentStep({ step: 3 });

                }, 500);
            })
            .catch((err) => {
                setSecondStepStatus({ visible: true, status: "Error", message: err.message });
            })
    }

    function evaluateButtonClick() {
        setThirdStepStatus({ visible: true, status: "Loading", message: "Происходит расчет" })

        // Получаю данные всех инпутов
        let fd = new FormData(pickForm.current)
        let temp = [...fd.entries()] // Переделываю их в массив
        console.log(temp);

        // Создаю объект с данными инпутов
        let formData = {}
        temp.forEach(inputData => {
            formData[inputData[0]] = inputData[1].split("_")[1]
        })

        formData.fileId = fileId;
        console.log(formData);

        fetch(`${SERVER_URL}:${SERVER_PORT}/api/evaluation/evaluate`, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(data => data.json())
            .then(({ status, message, linkToFile }) => {
                setThirdStepStatus({ visible: true, status, message });

                // Показываю следующий этап с задержкой
                setTimeout(() => {
                    setCurrentStep({ step: 4 });

                    setLinkToResultFile(linkToFile);
                }, 500);

            })
            .catch((err) => {
                setSecondStepStatus({ visible: true, status: "Error", message: err.message });
            });


    }

    function handleDownloadButtonClick(e) {
        e.target.setAttribute("disabled", true)

        // Алгоритм для скачивания файла
        // fetch(linkToResultFile)
        //     .then(response => response.blob())
        //     .then(blob => {
        //         const link = document.createElement("a");
        //         link.href = URL.createObjectURL(blob);
        //         link.download = savedFilename;
        //         link.click();
        //     })
        //     .catch(console.error);

        setTimeout(() => {
            e.target.removeAttribute("disabled")

        }, 1000);
    }

    function handleInputChange(inputs) {
        if (inputs.slice(0, 3).every(input => input.value) && childColumnInputValue) {
            if (
                inputs.slice(3, 6).every(input => input.value) ||
                inputs.slice(6, 9).every(input => input.value) ||
                inputs.slice(9).every(input => input.value)
            ) {
                // continueButton.current.removeAttribute("disabled")
                setIsContinueButtonDisabled(false);
                // setSecondStepStatus(prev => {return {...prev, status: ""}});

            } else {
                // continueButton.current.setAttribute("disabled", true)
                setIsContinueButtonDisabled(true);
                // setSecondStepStatus(prev => {return {...prev, status: "Error"}});

            }
        } else {
            // continueButton.current.setAttribute("disabled", true)
            setIsContinueButtonDisabled(true);
            // setSecondStepStatus(prev => {return {...prev, status: "Error"}});

        }
    }

    // Слушатели для проверки правильности данных для настройки расчета
    // Для расчета нужна инфа о колонке клички потомка, кличках предков и хотя бы один их идентификатор
    useEffect(() => {
        // Получаю параметры из адресной строки
        const location = window.location.href.slice(window.location.href.lastIndexOf("?"));
        const params = new URLSearchParams(location);

        // Если есть параметр evaluateId - значит на страницу перешли о страницы Evaluates
        // А значит надо работать с уже загруженным на сайт файлом
        if (params.get("evaluateId")) {
            setCurrentStep({ step: 2 });
            setUploadFileStatus({ visible: true, message: "Файл уже загружен пользователем", status: "Success" });

            fetch(`${SERVER_URL}:${SERVER_PORT}/api/orders/${params.get("evaluateId")}/table-dump`, {
                headers: {
                    authorization: token ? "Bearer " + token : null,
                }
            })
                .then(res => res.json())
                .then(data => {
                    setTableDump(data.tableDump);
                    setSavedFilename(data.savedFilename);
                })
                .catch(console.log)

        }
    }, [token]);


    return (
        <>
            <section className="evaluate-container">
                <div className="text-block">
                    <PageHeading>Расчет показателей потомства</PageHeading>
                    <SectionHeading style={{ marginBottom: 10 }}>1. Загрузка файла</SectionHeading>
                    <Paragraph style={{ maxWidth: 600 }}>Ниже можно загрузить таблицу с данными предков и расчитать прогнозируемые показатели потомства</Paragraph>

                </div>

                <input type="file" name="file" id="file" hidden ref={fileInput} onChange={uploadFileInputChange} />

                <ButtonWithStatus
                    handleClick={uploadFileButtonClick}
                    processStatus={uploadFileStatus}
                    buttonDisabled={uploadFileStatus.status === "" || uploadFileStatus.status === "Error" ? false : true}
                    buttonText="Загрузить файл"
                />

            </section>

            <section className={`evaluate-container animated ${currentStep.step >= 2 ? "" : "hidden"}`}>
                <div className="text-block">
                    <SectionHeading style={{ marginBottom: 10 }}>2. Настройка расчета</SectionHeading>
                    <Paragraph style={{ maxWidth: 800 }}>Теперь необходимо указать, в каких колонках таблицы расположены данные о предках, такие как кличка, семенной код, идентификационный или инвентарный номер.</Paragraph>
                    <Paragraph style={{ maxWidth: 700 }}>При отсутствии каки-либо показателей поля нужно оставить пустыми.</Paragraph>
                    <Paragraph style={{ maxWidth: 700 }}>Для удобства ниже находятся первые строки загруженной таблицы.</Paragraph>

                    <PreviewTable tableDump={tableDump} style={{ marginTop: 50 }} />

                    <div className="child-column-picker" style={{ marginTop: 50 }} >
                        <div className="child-column-picker__title">Столбец с кличкой или инвентарным номером потомка</div>
                        <input
                            type="text"
                            name="child-column"
                            className="child-column-picker__input"
                            value={childColumnInputValue}
                            onChange={(e) => setChildColumnInputValue(e.target.value)}
                        />
                    </div>

                    <ColumnPickerTable onInputChange={handleInputChange} ref={columnPickerTable} style={{ marginTop: 50 }} />

                </div>

                <ButtonWithStatus
                    handleClick={continueButtonClick}
                    buttonRef={continueButton}
                    processStatus={secondStepStatus}
                    buttonDisabled={isContinueButtonDisabled || (secondStepStatus.status === "" || secondStepStatus.status === "Error" ? false : true)}
                    buttonText="Продолжить"
                />

            </section>

            <section className={`evaluate-container animated ${currentStep.step >= 3 ? "" : "hidden"}`}>
                <div className="text-block">
                    <SectionHeading style={{ marginBottom: 10 }}>3. {thirdStepText.title}</SectionHeading>
                    <Paragraph style={{ maxWidth: 800 }}>{thirdStepText.paragraph}</Paragraph>

                    <ExtraBullsList extraMatchesBullsMarkers={extraMatchesBullsMarkers} ref={pickForm} />

                </div>

                <ButtonWithStatus
                    handleClick={evaluateButtonClick}
                    processStatus={thirdStepStatus}
                    buttonDisabled={thirdStepStatus.status === "" || thirdStepStatus.status === "Error" ? false : true}
                    buttonText="Выполнить расчет"
                />

            </section>

            <section className={`evaluate-container animated ${currentStep.step >= 4 ? "" : "hidden"}`}>
                <div className="text-block">
                    <SectionHeading style={{ marginBottom: 10 }}>4. Расчет завершен</SectionHeading>
                    <Paragraph style={{ maxWidth: 800 }}>Показатели потомства расчитаны. Теперь можно скачать файл</Paragraph>

                </div>

                <div className="button-wrapper">

                    <ButtonAccent onClick={handleDownloadButtonClick} href={linkToResultFile} download>Скачать</ButtonAccent>

                    {/* <a href="#temp" download className='button button_accent' >
                        Скачать
                    </a> */}
                </div>

            </section>
        </>
    );
};

export default Evaluate;