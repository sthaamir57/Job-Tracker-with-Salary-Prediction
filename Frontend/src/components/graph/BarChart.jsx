import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(
    CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend
);


function BarChart({cardsData}) {
  const options = {};
  const data = {
    labels: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
    datasets: [
      {
        label: "No. of jobs applied",
        data: [1, 4, 7, 0, 4, 3, 2],
        backgroundColor: "white",
        // borderColor: ["rgba(54, 162, 235, 1)"],
        // borderWidth: 1,
      }
    ]
  };

  return (
    <div className='w-full p-4 border border-neutral-800'>
      <h2 className='text-neutral-100 font-semibold mb-6'>Last Applied Job this Week</h2>
      <Bar options={options} data={data} />
    </div>
  );
}

export default BarChart