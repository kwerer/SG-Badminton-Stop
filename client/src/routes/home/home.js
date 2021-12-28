import React from "react";
import { Container } from "react-bootstrap";
import GameCard from "../../commonComponents/GameCard";
import styles from "./styles.module.css";

export default function Home() {
  return (
    <>
      <div className={styles.MainDiv}>
        <GameCard />
      </div>
    </>
  );
}
