// src/components/InputForm.tsx
import React, { useState } from "react";
import { calculateResults } from "../utils/calculate";
import ResultsTable from "./ResultsTable";
import styles from "./InputForm.module.css";

const InputForm: React.FC = () => {
  const [inputs, setInputs] = useState({
    diameterMM: 20,
    frequencyMHz: 60,
    coaxLengthMM: 50,
    qFactor: 60,
    parasiticCap: 2,
    coaxCapacitance: 102,
  });

  const [showOptional, setShowOptional] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: parseFloat(e.target.value) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const output = calculateResults(inputs);
    setResults(output);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Required Inputs */}
        {[
          { id: "diameterMM", label: "Inductor Diameter (mm) [10–30]" },
          { id: "frequencyMHz", label: "Resonance Frequency (MHz) [20–100]" },
          { id: "coaxLengthMM", label: "Coax Cable Length (mm) [0–100]" },
          { id: "qFactor", label: "Q Factor (unitless)" },
          { id: "parasiticCap", label: "PCB Parasitic Capacitance (pF)" },
        ].map(({ id, label }) => (
          <div key={id} className={styles.inputGroup}>
            <label htmlFor={id} className={styles.label}>
              {label}
            </label>
            <input
              className={styles.input}
              type="number"
              name={id}
              id={id}
              value={inputs[id as keyof typeof inputs]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        {/* Toggle for Optional Inputs */}
        <button
          type="button"
          onClick={() => setShowOptional(!showOptional)}
          className={styles.toggleButton}
        >
          {showOptional ? "Hide Optional Inputs" : "Show Optional Inputs"}
        </button>

        {/* Optional Inputs */}
        {showOptional && (
          <div className={styles.optionalBox}>
            <label htmlFor="coaxCapacitance" className={styles.label}>
              Coax Capacitance per meter (pF) [default = 102]:
            </label>
            <input
              className={styles.input}
              type="number"
              name="coaxCapacitance"
              id="coaxCapacitance"
              value={inputs.coaxCapacitance}
              onChange={handleChange}
              min={1}
            />
          </div>
        )}

        <button type="submit" className={styles.submitButton}>
          Calculate
        </button>
      </form>

      {/* Inductance Summary Output */}
      {results.length > 0 && (
        <div className={styles.results}>
          <h3 className={styles.resultsTitle}>Coil Inductance Values</h3>
          <ul className={styles.resultsList}>
            {results.map((r) => (
              <li key={r.n}>
                n = {r.n} turn(s): {r.L_nH} nH
              </li>
            ))}
          </ul>
        </div>
      )}

      {results.length > 0 && <ResultsTable results={results} />}
    </div>
  );
};

export default InputForm;
