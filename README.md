# Forex Rates App

A simple forex rates table application built with Next.js.

## Features

- Display latest forex exchange rates
- Automatically adjust rates (+10.0002)
- Special visual indicators:
  - HKD currency: Red border
  - Even numbers: Red border

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure API Key
Create a `.env` file in the project root:
```
apiKey=your_fixer_api_key_here
```

### 3. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the result.

## Special Rules

### Even Number Logic
This application uses a special method to determine even numbers:
- **Check the last digit of the number to determine odd/even**
- Example: 123.456 → Last digit is 6 (even) → Display red border
- Example: 789.123 → Last digit is 3 (odd) → Display normal border

## API Source

Uses [Fixer.io API](https://fixer.io/) to fetch real-time exchange rate data.
