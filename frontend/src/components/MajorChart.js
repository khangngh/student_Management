import { Pie } from "react-chartjs-2"
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

function MajorChart({ data }) {

    const chartData = {
        labels: data.map(m => m.major),

        datasets: [
            {
                data: data.map(m => m.count),

                backgroundColor: [
                    "#4CAF50",
                    "#2196F3",
                    "#FF9800",
                    "#9C27B0",
                    "#F44336"
                ],

                borderWidth: 1
            }
        ]
    }

    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top"
            }
        }
    }

    return (
        <div style={{ width: "240px", height: "240px" }}>
            <Pie data={chartData} options={options} />
        </div>
    )
}

export default MajorChart