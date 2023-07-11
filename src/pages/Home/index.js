import React from "react";
import "./styles.scss";
import logoMagalu from "../../img/logoMagalu.png";

export default function Home() {
  return (
    <div className="container--home">
      <div className="home__content">
        <div className="home__image-container">
          <img src={logoMagalu} alt="logoMagalu" />
        </div>
        <div className="home__title">
          <h1>REMSIS</h1>
          <p className="uppercase">Sistemas de controle de transferência entre cds e filiais</p>
        </div>
      </div>
    </div>
  );
}
