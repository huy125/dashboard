"use client"
import DynamicChart from "@/app/components/IncomeSource/DynamicChart";
import IncomeSourceSideBar from "@/app/components/IncomeSource/IncomeSourceSidebar";
import {useState} from "react";
import {getTopIncomeSourceForYear} from "@/app/data/topIncomeSourceData";
import {getAchievedIncomePercentage} from "@/app/data/achievedIncomePercentage";
import MarketingPerformance from "@/app/components/IncomeSource/MarketingPerformance";
import {DonutData, ScatterData} from "@/app/types";

const IncomeSource: React.FC = () => {
    const [topIncomeSourceData, setScatterChartData] = useState<ScatterData[]>(getTopIncomeSourceForYear(2020));
    const [achievedIncomePercentage, setDonutAchievedIncomeData] = useState<DonutData[]>(getAchievedIncomePercentage(2020));
    const handleDynamicChartDataUpdate = (year: number) => {
        // Simulated data for each year, replace this with your actual data
        const topIncomeSourceData = getTopIncomeSourceForYear(year);
        setScatterChartData(topIncomeSourceData);
        const achievedIncomePercentage = getAchievedIncomePercentage(year);
        setDonutAchievedIncomeData(achievedIncomePercentage);
    };

    return (
        <div className="flex flex-wrap items-center justify-center h-screen">
            <div className="w-3/12 p-4">
                <IncomeSourceSideBar onDynamicChartDataUpdate={handleDynamicChartDataUpdate} />
            </div>
            <div className="w-8/12 p-4">
                <DynamicChart scatterData={topIncomeSourceData} donutAchievedIncomeData={achievedIncomePercentage} width={1200} height={800} />
            </div>
            <div className="w-1/12 p-4">
                <MarketingPerformance/>
            </div>
        </div>
    );
};

export default IncomeSource;
