import AreaChart from "@/app/components/IncomeSource/AreaChart";
import {useState} from "react";
import {AreaData} from "@/app/types";
import {getMonthlyIncome} from "@/app/data/monthlyIncome";
import {getMonthlyTargetIncome} from "@/app/data/monthlyTargetIncome";

interface IncomeSourceSideBarProps {
    onDynamicChartDataUpdate: (year: number) => void;
}

const IncomeSourceSideBar: React.FC<IncomeSourceSideBarProps> = ({ onDynamicChartDataUpdate }) => {
    const yearLabels = [2020, 2021, 2022, 2023, 2024];
    const [monthlyIncomeData, setMonthlyIncomeData] = useState<AreaData[]>(getMonthlyIncome(2020));
    const [monthlyTargetIncomeData, setMonthlyTargetIncomeData] = useState<AreaData[]>(getMonthlyTargetIncome(2020));

    const handleButtonClick = (year: number) => {
        const monthlyIncomeData = getMonthlyIncome(year);
        setMonthlyIncomeData(monthlyIncomeData);

        const monthlyTargetIncomeData = getMonthlyTargetIncome(year);
        setMonthlyTargetIncomeData(monthlyTargetIncomeData);

        // Call the callback function with the selected year
        onDynamicChartDataUpdate(year);
    };

    const yearlyIncome = monthlyIncomeData.reduce((acc, data) => acc + data.value, 0);
    const formattedYearlyIncome = yearlyIncome.toLocaleString();

    const yearlyTargetIncome = monthlyTargetIncomeData.reduce((acc, data) => acc + data.value, 0);
    const formattedYearlyTargetIncome = yearlyTargetIncome.toLocaleString();

    return (
        <div className="justify-center p-8 flex flex-col sm:h-screen sm:w-80">
            <button className="bg-blue-400 rounded-full w-48 h-10">
                Income Sources
            </button>
            <div className="justify-normal mt-3 mb-3">
                <h2>
                    Grand total income, and their breakdown showing the achievement percentage and highlight for
                    most valuable source, Marketing strategies, and operation profit.
                </h2>
            </div>
            <div className="flex mt-3 mb-3">
                {yearLabels.map((label, index) => (
                    <button
                        key={index}
                        className="bg-dark hover:bg-white hover:text-black text-white text-sm rounded px-2 py-1"
                        onClick={() => handleButtonClick(label)}
                    >
                        <span className="mr-2">{label}</span>
                    </button>
                ))}
            </div>
            <div>
                <h2 className='text-2xl'>Financial Statistics</h2>
                <p className='text-5xl p-0.5'>{formattedYearlyIncome}</p>
                <p className='py-1'>Income Target {formattedYearlyTargetIncome}</p>
            </div>
            <div>
                <AreaChart data={monthlyIncomeData} width={285} height={120}/>
            </div>
            <div className='container mx-auto mt-9'>
                <p>Quantity of Item&apos;s</p>
                <table className="table-auto text-sm">
                    <tbody>
                    <tr>
                        <td className="md:py-3">Usage fees</td>
                        <td className="md:py-3">10%</td>
                        <td className="md:py-3">11,856</td>
                    </tr>
                    <tr>
                        <td className="md:py-3">Subscription</td>
                        <td className="md:py-3">11%</td>
                        <td className="md:py-3">13,188</td>
                    </tr>
                    <tr>
                        <td className="md:py-3">Renting</td>
                        <td className="md:py-3">14%</td>
                        <td className="md:py-3">16,488</td>
                    </tr>
                    <tr>
                        <td className="md:py-3">Licensing</td>
                        <td className="md:py-3">62%</td>
                        <td className="md:py-3">72,768</td>
                    </tr>
                    <tr>
                        <td className="md:py-3">Advertising</td>
                        <td className="md:py-3">2%</td>
                        <td className="md:py-3">2,844</td>
                    </tr>
                    <tr>
                        <td className="md:py-3">Asset Sale</td>
                        <td className="md:py-3">0%</td>
                        <td className="md:py-3">26</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default IncomeSourceSideBar;
