// src/components/ResultsTable.tsx
import React from "react";
import styles from "./ResultsTable.module.css";

type Result = {
  n: number;
  L_nH: string;
  CT_pF: string;
  CM_pF: string;
};

const ResultsTable: React.FC<{ results: Result[] }> = ({ results }) => {
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          <th className={styles.th}>Turns (n)</th>
          <th className={styles.th}>Inductance (nH)</th>
          <th className={styles.th}>Tuning Capacitance (pF)</th>
          <th className={styles.th}>Matching Capacitance (pF)</th>
        </tr>
      </thead>
      <tbody>
        {results.map((row) => (
          <tr key={row.n}>
            <td className={styles.td}>{row.n}</td>
            <td className={styles.td}>{row.L_nH}</td>
            <td className={styles.td}>{row.CT_pF}</td>
            <td className={styles.td}>{row.CM_pF}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultsTable;
