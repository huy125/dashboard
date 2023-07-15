import OperatingProfitBarChart from "@/app/components/IncomeSource/OperatingProfitBarChart";
import operatingProfitChartData from "../../../../public/operatingProfitChartData";

const OperatingProfit = () => {
    const totalProfit = operatingProfitChartData.reduce((acc, dataPoint) => acc + dataPoint.value, 0);
    return (
        <div>
            <a className="h-[26rem] block p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div className="flex flex-col items-center justify-center text-center">
                    <p className="mb-2 text-xl">Operating</p>
                    <p className="mb-2 text-3xl">Profits</p>
                    <OperatingProfitBarChart data={operatingProfitChartData} width={150} height={250}/>
                    <p className="mb-2 text-2xl">{totalProfit}</p>
                </div>
            </a>
        </div>
    );
}

export default OperatingProfit;

