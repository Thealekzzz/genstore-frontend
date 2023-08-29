import React from 'react';

import closeImage from "../../imgs/close.svg";

import styles from "./Popup.module.css";

const Popup = ({ isOpen, setIsOpen, style, children }) => {
    /**
     * Элемент попапа
     * @param {boolean} isOpen Флаг состояния показа попапа 
     * @param {boolean} setIsOpen Коллбек установки состояния показа попапа 
     */

    // const [isVisible, setIsVisible] = useState(isOpen);

    // const handleCloseByEscape = evt => {
    //     console.log(evt.key)
    //     if (evt.key === "Escape") {
    //         closePopup();
    //     }
    // }

    function handleWrapperClick(evt) {
        if (evt.target.classList.contains(styles.popup)) {
            closePopup();
        }
    }

    function closePopup() {
        setIsOpen(false);
    }

    // Добавляю возможность закрыть попап нажатием Escape
    // useEffect(() => {
    //     if (isOpen) {
    //         console.log("Добавляю")
    //         window.addEventListener("keydown", handleCloseByEscape);

    //     } else {
    //         console.log("Убираю")
    //         window.removeEventListener("keydown", handleCloseByEscape);

    //     }

    // }, [isOpen]);

    return (
        <div
            className={[styles.popup, !isOpen && styles.hidden].join(" ")}
            onClick={handleWrapperClick}
        >
            <div
                className={styles.popupContainer}
                style={style}
            >
                {children}

                <img src={closeImage} alt="Закрыть, кнопка" className={styles.closeButton} onClick={closePopup} />
            </div>
        </div>
    );
};

export default Popup;