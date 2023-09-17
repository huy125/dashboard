import {ScatterData} from "@/app/types/charts/scatterDataType";

export function getTopIncomeSourceForYear(year: number): ScatterData[] {
    switch (year) {
        case 2020:
            return [
                {x: 1, y: 3, value: 867216},
                {x: 7, y: 2, value: 691419},
                {x: 4, y: 1, value: 307374},
                {x: 2, y: 8, value: 776113},
                {x: 6, y: 6, value: 908442},
                {x: 5, y: 9, value: 396734},
            ];
        case 2021:
            return [
                {x: 1, y: 3, value: 174300},
                {x: 7, y: 2, value: 128452},
                {x: 4, y: 1, value: 60477},
                {x: 2, y: 8, value: 155730},
                {x: 6, y: 6, value: 227163},
                {x: 5, y: 9, value: 82830},
            ];
        case 2022:
            return [
                {x: 1, y: 3, value: 177100},
                {x: 7, y: 2, value: 130229},
                {x: 4, y: 1, value: 61204},
                {x: 2, y: 8, value: 157387},
                {x: 6, y: 6, value: 117541},
                {x: 5, y: 9, value: 77422},
            ];
        case 2023:
            return [
                {x: 1, y: 3, value: 177100},
                {x: 7, y: 2, value: 182598},
                {x: 4, y: 1, value: 61204},
                {x: 2, y: 8, value: 157387},
                {x: 6, y: 6, value: 117541},
                {x: 5, y: 9, value: 77422},
            ];
        case 2024:
            return [
                {x: 1, y: 3, value: 168000},
                {x: 7, y: 2, value: 123865},
                {x: 4, y: 1, value: 58526},
                {x: 2, y: 8, value: 150928},
                {x: 6, y: 6, value: 222098},
                {x: 5, y: 9, value: 79200},
            ];
        default:
            return [];
    }
}