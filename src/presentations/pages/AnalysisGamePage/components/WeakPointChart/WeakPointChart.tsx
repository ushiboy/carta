import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
);

type Props = {
  labels: string[];
  corrected: number[];
  incorrected: number[];
};

export function WeakPointChart({ labels, corrected, incorrected }: Props) {
  const data = {
    labels,
    datasets: [
      {
        label: "正答率",
        data: corrected,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        stack: "Stack 0",
      },
      {
        label: "誤答率",
        data: incorrected,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        stack: "Stack 0",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
}
