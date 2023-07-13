import React from "react";
//eslint-disable-next-line
import styles from "./styles.css";
import { FiFrown } from "react-icons/fi";

export default function NotFoundPage() {
  return (
    <div className="form-create not-found-page">
      <p>Página não encontrada</p>
      <p>A página não existe, a página foi removida ou o link que utilizou está errado</p>
      <FiFrown className="FiFrown not-found-icon" />
    </div>
  );
}
