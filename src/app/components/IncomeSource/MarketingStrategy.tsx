import OperatingProfitDonutChart from "@/app/components/IncomeSource/OperatingProfitDonutChart";
import operatingProfitStrategyPercentageData from "../../../../public/operatingProfitStrategyPercentageData";

const MarketingStrategy = () => {
    const b2BPercentage = operatingProfitStrategyPercentageData.find(dataPoint => dataPoint.label === 'B2B')?.value || 0;
    const b2CPercentage = operatingProfitStrategyPercentageData.find(dataPoint => dataPoint.label === 'B2C')?.value || 0;
    return (
        <div>
            <a className="h-80 block p-4 bg-white border border-gray-200 rounded-lg shadow
                          hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div className="flex flex-col items-center justify-center text-center">
                    <p className="mb-2 text-2xl">B2B</p>
                    <p className="mb-2 text-xl">{b2BPercentage}%</p>
                    <OperatingProfitDonutChart data={operatingProfitStrategyPercentageData} width={125} height={125}/>
                    <p className="mb-2 text-xl">{b2CPercentage}%</p>
                    <p className="mb-2 text-2xl">B2C</p>
                </div>
            </a>
        </div>
    );
}

export default MarketingStrategy;