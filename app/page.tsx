export default async function Home() {
  const apiKey = process.env.apiKey;
  if (!apiKey) {
    return <div>Error: API key not configured</div>;
  }

  const response = await fetch('https://api.apilayer.com/fixer/latest', {
    headers: { apikey: apiKey },
  });
  const data = await response.json();
  const originalRates = data.rates || {};

  const adjustedRates = Object.fromEntries(
    Object.entries(originalRates).map(([currency, rate]) => {

      // Make sure there is no JS decimal point floating problem after adding 10.0002 to the number 
      // by dynamically applying toFixed with the same decimal places as the original rate
      const rateStr = (rate as number).toString();
      const decimalPart = rateStr.includes('.') ? rateStr.split('.')[1] : '';
      const decimalPlaces = decimalPart.length || 4;

      const adjustedValue = Number(rate) + 10.0002;
      return [currency, Number(adjustedValue.toFixed(decimalPlaces))];
    })
  );

  // const adjustedRates: { [key: string]: number } = {};
  // for (const currency in originalRates) {
  //   adjustedRates[currency] = Number(originalRates[currency]) + 10.0002;
  // }

  function isEven(value: number) {
    // From Email:
    // How to define an even number:
    // In the requirement, please check the last digit of the floating number to differentiate its odd/even value.
    const valueStr = value.toString();
    const lastDigit = valueStr[valueStr.length - 1];
    return Number(lastDigit) % 2 === 0;
  }

  // function isEven(value: number) {
  //   return Number.isInteger(value) && value % 2 === 0;
  // }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Forex Rates Table</h1>
      <table className="border-collapse w-full">
        <thead>
          <tr className="bg-gray-200 text-black">
            <th className="border p-2">Currency</th>
            <th className="border p-2">Original Rate</th>
            <th className="border p-2">Adjusted Rate (+10.0002)</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(originalRates).map(([currency, rate]) => (
            <tr key={currency}>
              <td
                className={`p-2 ${
                  currency === 'HKD' ? 'border-2 border-red-500' : 'border'
                }`}
              >
                {currency}
              </td>
              <td
                className={`p-2 ${
                  isEven(Number(rate)) ? 'border-2 border-red-500' : 'border'
                }`}
              >
                {Number(rate)}
              </td>
              <td
                className={`p-2 ${
                  isEven(Number(adjustedRates[currency]))
                    ? 'border-2 border-red-500'
                    : 'border'
                }`}
              >
                {Number(adjustedRates[currency])}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}