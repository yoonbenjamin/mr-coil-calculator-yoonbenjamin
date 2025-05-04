// src/App.tsx
import React from "react";
import InputForm from "./components/InputForm";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>MR Coil Calculator</h1>
      <InputForm />
    </div>
  );
}

export default App;
