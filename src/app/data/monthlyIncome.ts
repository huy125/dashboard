import {AreaData} from "@/app/types";

export function getMonthlyIncome(year: number): AreaData[] {
    switch (year) {
        case 2020:
            return [
                { label: 'Jan', value: 84834 },
                { label: 'Feb', value: 69175 },
                { label: 'Mar', value: 65641 },
                { label: 'Apr', value: 66885 },
                { label: 'May', value: 66885 },
                { label: 'Jun', value: 66885 },
                { label: 'Jul', value: 66885 },
                { label: 'Aug', value: 66885 },
                { label: 'Sep', value: 66885 },
                { label: 'Oct', value: 66885 },
                { label: 'Nov', value: 66885 },
                { label: 'Dec', value: 66885 },
            ];
        case 2021:
            return [
                { label: 'Jan', value: 71042 },
                { label: 'Feb', value: 66885 },
                { label: 'Mar', value: 66885 },
                { label: 'Apr', value: 75200 },
                { label: 'May', value: 66885 },
                { label: 'Jun', value: 66885 },
                { label: 'Jul', value: 66885 },
                { label: 'Aug', value: 71391 },
                { label: 'Sep', value: 71729 },
                { label: 'Oct', value: 66885 },
                { label: 'Nov', value: 70076 },
                { label: 'Dec', value: 66885 },
            ];
        case 2022:
            return [
                { label: 'Jan', value: 64935 },
                { label: 'Feb', value: 58642 },
                { label: 'Mar', value: 57631 },
                { label: 'Apr', value: 58951 },
                { label: 'May', value: 60548 },
                { label: 'Jun', value: 55608 },
                { label: 'Jul', value: 57631 },
                { label: 'Aug', value: 60978 },
                { label: 'Sep', value: 59906 },
                { label: 'Oct', value: 66178 },
                { label: 'Nov', value: 62246 },
                { label: 'Dec', value: 57631 },
            ];
        case 2023:
            return [
                { label: 'Jan', value: 64935 },
                { label: 'Feb', value: 58642 },
                { label: 'Mar', value: 61887 },
                { label: 'Apr', value: 77629 },
                { label: 'May', value: 60548 },
                { label: 'Jun', value: 63286 },
                { label: 'Jul', value: 57631 },
                { label: 'Aug', value: 60978 },
                { label: 'Sep', value: 59906 },
                { label: 'Oct', value: 66178 },
                { label: 'Nov', value: 84003 },
                { label: 'Dec', value: 57631 },
            ];
        case 2024:
            return [
                { label: 'Jan', value: 66885 },
                { label: 'Feb', value: 66885 },
                { label: 'Mar', value: 66885 },
                { label: 'Apr', value: 66885 },
                { label: 'May', value: 66885 },
                { label: 'Jun', value: 66885 },
                { label: 'Jul', value: 66885 },
                { label: 'Aug', value: 66885 },
                { label: 'Sep', value: 66885 },
                { label: 'Oct', value: 66885 },
                { label: 'Nov', value: 66885 },
                { label: 'Dec', value: 66885 },
            ];
        default:
            return [];
    }
}