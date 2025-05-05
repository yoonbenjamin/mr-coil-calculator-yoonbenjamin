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
    parasiticCap: 9.9,
    coaxCapacitance: 102,
    coaxInductance: 312,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showOptional, setShowOptional] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: parseFloat(e.target.value) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (inputs.frequencyMHz < 20 || inputs.frequencyMHz > 100)
      newErrors.frequencyMHz = "Frequency must be between 20–100 MHz";
    if (inputs.diameterMM < 10 || inputs.diameterMM > 30)
      newErrors.diameterMM = "Diameter must be between 10–30 mm";
    if (inputs.coaxLengthMM < 0 || inputs.coaxLengthMM > 200)
      newErrors.coaxLengthMM = "Coax length must be between 0–200 mm";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const output = calculateResults(inputs);
      setResults(output);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Required Inputs */}
        {[
          { id: "frequencyMHz", label: "Resonance frequency (MHz) [20–100]" },
          { id: "diameterMM", label: "Inductor diameter (mm) [10–30]" },
          { id: "coaxLengthMM", label: "Coax cable length (mm) [0–200]" },
        ].map(({ id, label }) => (
          <div key={id} className={styles.inputGroup}>
            <label htmlFor={id} className={styles.label}>{label}</label>
            <input
              className={styles.input}
              type="number"
              name={id}
              id={id}
              value={inputs[id as keyof typeof inputs]}
              onChange={handleChange}
              required
            />
            {errors[id] && <p className={styles.error}>{errors[id]}</p>}
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
            <div className={styles.inputGroup}>
              <div className={styles.inlineRow}>
                <label htmlFor="coaxInductance" className={styles.label}>
                  Coaxial cable inductance per meter (nH):
                </label>
                <input
                  className={styles.input}
                  type="number"
                  name="coaxInductance"
                  id="coaxInductance"
                  value={inputs.coaxInductance}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.note}>
                Note: Initial assumptions use values from coax cable (insert part # here)
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="coaxCapacitance" className={styles.label}>
                Coaxial cable capacitance per meter (pF):
              </label>
              <input
                className={styles.input}
                type="number"
                name="coaxCapacitance"
                id="coaxCapacitance"
                value={inputs.coaxCapacitance}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="parasiticCap" className={styles.label}>
                PCB parasitic capacitance (nH):
              </label>
              <input
                className={styles.input}
                type="number"
                name="parasiticCap"
                id="parasiticCap"
                value={inputs.parasiticCap}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="qFactor" className={styles.label}>
                Q factor of coil:
              </label>
              <input
                className={styles.input}
                type="number"
                name="qFactor"
                id="qFactor"
                value={inputs.qFactor}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        <button type="submit" className={styles.submitButton}>
          Calculate tuning and matching capacitance values
        </button>
      </form>

      {results.length > 0 && (
        <div className={styles.results}>
          <h3 className={styles.resultsTitle}>Coil inductance values</h3>
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
