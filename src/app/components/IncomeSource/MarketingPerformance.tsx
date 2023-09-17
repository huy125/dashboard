import AverageMonthlyIncome from "@/app/components/IncomeSource/AverageMonthlyIncome";
import OperatingProfit from "@/app/components/IncomeSource/OperatingProfit";
import MarketingStrategy from "@/app/components/IncomeSource/MarketingStrategy";

const MarketingPerformance = () => {
    return (
        <div className="justify-center flex flex-col space-y-4">
            <AverageMonthlyIncome/>
            <OperatingProfit/>
            <MarketingStrategy/>
        </div>
    );
}

export default MarketingPerformance;