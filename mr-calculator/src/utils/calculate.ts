// src/utils/calculate.ts
type InputParams = {
    diameterMM: number;
    frequencyMHz: number;
    coaxLengthMM: number;
    qFactor: number;
    parasiticCap: number;
    coaxCapacitance?: number; // optional
};

export function calculateResults({
    diameterMM,
    frequencyMHz,
    coaxLengthMM,
    qFactor,
    parasiticCap,
    coaxCapacitance = 102,
}: InputParams) {
    const a = 0.762;
    const b = 0.448;
    const p = 1.418;
    const turns = [1, 2, 3];
    const f = frequencyMHz * 1e6; // MHz → Hz
    const X = coaxLengthMM / 1000; // mm → meters
    const c = coaxCapacitance * 1e-12; // pF → F/m
    const cp = parasiticCap * 1e-12; // pF → F

    return turns.map((n) => {
        const L_nH = Math.pow(n, 2) * (a * diameterMM + b * diameterMM * Math.log(p));
        const L = L_nH * 1e-9; // nH → H

        const CT = 1 / (Math.pow(2 * Math.PI * f, 2) * L); // Farads
        const CM = (qFactor / (2 * Math.PI * f * X * c)) - CT - cp; // Farads

        return {
            n,
            L_nH: L_nH.toFixed(2),
            CT_pF: (CT * 1e12).toFixed(2),
            CM_pF: (CM * 1e12).toFixed(2),
        };
    });
}
