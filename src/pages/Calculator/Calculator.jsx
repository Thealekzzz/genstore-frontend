import React, { useEffect, useState } from 'react';

import "./Calculator.css";
import pragh from "./imgs/graph.svg";
import { SERVER_PORT, SERVER_URL } from '../../config';

const Calculator = () => {
  const animalMax = countValue(1200);
  const animalMin = 1;
  const prices = [
    { count: 100, price: 200 },
    { count: 500, price: 150 },
    { count: Infinity, price: 100 },
  ];
  const promocodes = {
    "SALE10": {sale: .1, description: "-10% на сумму расчета"},
    "SALE20": {sale: .2, description: "-20% на сумму расчета"},
  }

  const [value, setValue] = useState(300);
  const [promoValue, setPromoValue] = useState("");
  const [animals, setAnimals] = useState(countAnimals(300));
  const [cost, setCost] = useState(0);
  const [costWithDiscount, setCostWithDiscount] = useState(0);
  const [sales, setSales] = useState({});
  const [discount, setDiscount] = useState(0);

  function countAnimals(num) {
    return Math.max(Math.round(num * num / 5000), 1);
  }

  function countValue(num) {
    return Math.max(Math.round((num * 5000) ** 0.5), 1);
  }

  function handleRangeInputChange(evt) {
    setValue(Math.min(Math.max(evt.target.value, animalMin), animalMax));
  }

  function handleNumberInputChange(evt) {
    setAnimals(evt.target.value);
  }

  function handleNumberInputBlur(evt) {
    setValue(countValue(Math.min(Math.max(evt.target.value, animalMin), animalMax)));
  }

  function handlePromoCheck() {   
    fetch(`${SERVER_URL}:${SERVER_PORT}/api/promocode?code=${promoValue}`)
    .then(res => res.json())
    .then(response => {
      if (response.sale) {
        setSales(prev => ({ ...prev, [promoValue]: response }));
        setPromoValue("");
      } else {
        console.log(response.message);
      }
    })
    .catch(err => {
      console.log("Ошибка при проверке промокода");
    });
  }

  function handleCountCost() {
    let num = animals;
    let cost = 0;

    for (let i = 0; i < prices.length; i++) {
      if (num < prices[i].count) {
        cost += num * prices[i].price;
        break;

      } else {
        cost += prices[i].price * prices[i].count;
        num -= prices[i].count;
      }
    }

    const sale = Object.entries(sales).reduce((acc, [promocode, {sale}]) => acc + sale / 100, 0);
    const discount = cost * sale;

    setCost(cost);
    setDiscount(cost * sale);
    setCostWithDiscount(cost - discount);
  }

  useEffect(() => {
    for (let i = prices.length - 1; i > 0; i--) {
      prices[i].count = prices[i].count - prices[i - 1].count;
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setAnimals(countAnimals(value));
    // eslint-disable-next-line
  }, [value]);

  useEffect(handleCountCost, [animals, sales]);


  return (
    <div className="calculator">
      <div className="page__container">
        <div className='page__head '>
          <h1 className="page__title">Калькулятор стоимости расчета</h1>
          <p className="page__text calculator__text">Здесь можно расчитать стоимость расчета с учетом количества данных и промокодов</p>
        </div>
      </div>

      <div className="page__container">
        <div className="section ">
          <h2 className="section__title">Как считается стоимость расчета?</h2>

          <img src={pragh} className='calculator__graph' alt="Схема расчета оплаты расчета" />
        </div>
      </div>

      <div className="page__container">
        <div className="section calculator__section">

          <div className="calculator__slider-section">
            <p className="page__text">Количество животных</p>
            <input type="number" className="input_type_simple" max={animalMax} min={animalMin} value={animals} onChange={handleNumberInputChange} onBlur={handleNumberInputBlur} />
            <input type="range" className="calculator__slider" max={animalMax} min={animalMin} value={value} onChange={handleRangeInputChange} />

          </div>

          <div className="calculator__promo-and-result">
            <div className="calculator__promo-section">
              <div className="calculator__promo-section-head">
                <label className='input__label'>
                  <input type="text" id="input-promo" className="input input_type_simple input_color_white calculator__promo-input" placeholder='Промокод' value={promoValue} onChange={(evt) => setPromoValue(evt.target.value)} />
                  <p className="input__error input-promo-error">Недействительный промокод</p>

                </label>
                <button className="button" onClick={handlePromoCheck}>Проверить</button>

              </div>

              <ul className={`calculator__promo-codes ${!Object.entries(sales).length && "hidden"}`}>
                {Object.entries(sales).map(([promocode, {sale, description}]) => (
                  <li className="calculator__promo-code" key={promocode}>
                    <span className="calculator__promo-code-name">{promocode}</span>
                    <span className="calculator__promo-code-description">{description}</span>
                  </li>

                ))}
              </ul>
            </div>

            <div className="calculator__result-secton">
              {/* <button className="button" onClick={handleCountCost}>Рассчитать</button> */}
              <div className="calculator__price-wrapper">
                <p className={`calculator__old-price ${!Object.entries(sales).length && "hidden"}`}>{cost} ₽</p>
                <p className="calculator__text_big">{costWithDiscount} ₽</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;