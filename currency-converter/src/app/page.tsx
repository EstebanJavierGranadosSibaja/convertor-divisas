'use client';

import { useState, useEffect } from 'react';
import { useFetch } from './hooks/useFetch';
import { useLocalStorage } from './hooks/useLocalStorage';
import Barchart from './components/Barchart';

export default function Home() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [conversion, setConversion] = useLocalStorage('lastConversion', null);

  const { data, loading, error } = useFetch<{ data: { [key: string]: { value: number } } }>(
    '/api/convert'
  );

  useEffect(() => {
    if (data && fromCurrency && toCurrency) {
      const rate = data.data[toCurrency]?.value;
      if (rate) {
        setConversion({ amount, fromCurrency, toCurrency, result: amount * rate });
      }
    }
  }, [data, amount, fromCurrency, toCurrency]);

  return (
    <div>
      <h1>Conversor de Monedas</h1>

      <div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          {data &&
            Object.keys(data.data).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
        </select>
        <span> a </span>
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          {data &&
            Object.keys(data.data).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
        </select>

        <h2>
          {conversion
            ? `${conversion.amount} ${conversion.fromCurrency} = ${conversion.result.toFixed(2)} ${conversion.toCurrency}`
            : 'Ingrese valores'}
        </h2>
      </div>

      <Barchart />
    </div>
  );
}