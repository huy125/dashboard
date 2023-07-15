import {DonutData} from "@/app/types";

const operatingProfitStrategyData: DonutData[] = [
    { label: 'B2B', value: 714241 },
    { label: 'B2C', value: 114711 },
];

const totalValue = operatingProfitStrategyData.reduce((acc, item) => acc + item.value, 0);
const operatingProfitStrategyPercentageData = operatingProfitStrategyData.map((item) => ({
   label: item.label,
   value: +((item.value / totalValue) * 100).toFixed(2),
}));

export default operatingProfitStrategyPercentageData;