import {DonutData} from "@/app/types";

export function getAchievedIncomePercentage(year: number): DonutData[] {
    switch (year) {
        case 2020:
            return [
                { label: 'Income', value: 90 },
                { label: 'Target', value: 10 },
            ];
        case 2021:
            return [
                { label: 'Income', value: 80 },
                { label: 'Target', value: 20 },
            ];
        case 2022:
            return [
                { label: 'Income', value: 90 },
                { label: 'Target', value: 10 },
            ];
        case 2023:
            return [
                { label: 'Income', value: 70 },
                { label: 'Target', value: 30 },
            ];
        case 2024:
            return [
                { label: 'Income', value: 60 },
                { label: 'Target', value: 40 },
            ];
        default:
            return [];
    }
}