import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Main() {
  const [sum, setSum] = useState(10000);
  const [term, setTerm] = useState(1);
  const [monthlyPayment, setMonthlyPayment] = useState(171952);

  const updateMonthlyPayment = () => {
    const monthlyInterest = (17.25 / 12) * 0.1;
    console.log(monthlyInterest);
    const monthlyAmount = sum * (monthlyInterest + (monthlyInterest /(1 + monthlyInterest) * term - 1));
    setMonthlyPayment(monthlyAmount);
  }

  return (
    <div className="main">
      <div className="header">
        <p className="header_name">
          Сила кошелька
        </p>
      </div>

      <div className="main__body">
        <p className="main__body-text">Рассчитать кредит</p>

        <div className="input__group">
          <div className="input-sum">
            <input type="text"
                   className="input-sum__input"
                   placeholder="Сумма"
                   value={sum}
                   onChange={(e) => {
                     setSum(e.target.value); updateMonthlyPayment()
                   }}
            />
          </div>

          <div className="input-term">
            <input type="text"
                   className="input-term__input"
                   placeholder="Срок кредитования"
                   value={term}
                   onChange={(e) => {
                     setTerm(e.target.value);
                     updateMonthlyPayment()
                   }}
            />
          </div>
        </div>

        <div className="loan-calculation">
          <div className="loan-calculation__payment">
            от {monthlyPayment} руб/мес

            <span className="loan-calculation__payment-sub-text">платёж</span>
          </div>

          <div className="loan-calculation__percentage">
            до 17,25%

            <span className="loan-calculation__percentage-sub-text">ставка</span>
          </div>
        </div>

        <div className="next-button">
          <Link to="/">
            Перейти
          </Link>
        </div>
      </div>
    </div>
  );
}




