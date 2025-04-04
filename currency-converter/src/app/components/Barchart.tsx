import { Bar } from 'react-chartjs-2';
import { useFetch } from '../hooks/useFetch';

export default function Barchart() {
  const { data, loading, error } = useFetch<{ data: { [key: string]: { value: number } } }>(
    '/api/convert'
  );

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  const chartData = {
    labels: Object.keys(data?.data || {}),
    datasets: [
      {
        label: 'Tasa de Cambio',
        data: Object.values(data?.data || {}).map((entry) => entry.value),
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  };

  return <Bar data={chartData} />;
}