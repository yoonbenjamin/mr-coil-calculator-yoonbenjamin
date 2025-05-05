# mr-coil-calculator-yoonbenjamin

# MR Coil Calculator

This is a React web application for calculating the inductance and required tuning/matching capacitance values for MRI surface coils. It helps prototype and analyze coil designs based on user-defined physical and electrical parameters.

## Features

- Accepts user input for:
  - Coil diameter
  - Resonance frequency
  - Coax cable length
  - Q factor
  - Parasitic capacitance
  - (Optional) Coax capacitance per meter
- Outputs inductance and capacitance values for different numbers of turns
- Clean and responsive UI using CSS Modules
- No Tailwind or external styling dependencies

## Tech Stack

- React + TypeScript
- Vite
- CSS Modules (no Tailwind)

## Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
