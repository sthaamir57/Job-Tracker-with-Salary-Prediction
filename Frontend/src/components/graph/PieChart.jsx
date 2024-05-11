import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(
    Tooltip, Legend, ArcElement
);

function PieChart({pieData}) {
    console.log(pieData);
    const options = {
        aspectRatio: 2

    };
    const data = {
        labels: ["Wishlist", "Applied", "Interviewing", "Offer", "Rejected"],
        datasets: [
        {
            label: "No. of jobs applied",
            data: pieData,
            backgroundColor: [
                "#f5f5f5",
                "#ea580c",
                "#eab308",
                "#16a34a",
                "#dc2626"
            ],
            borderColor: ["rgb(23, 23, 23)"],
            // borderWidth: 1,
            hoverOffset: 4,
        }
        ]
    };

    let total_jobs = 0;
    data.datasets[0].data.forEach( num => {
        total_jobs += num;
    })

  return (
    <div className='w-full p-4 border border-neutral-800'>
      <h2 className='text-neutral-100 font-semibold mb-6'>{total_jobs} Jobs Applied Till Now</h2>
      <Doughnut options={options} data={data} />
    </div>
  )
}

export default PieChart