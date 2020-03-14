import {fromPairs, isNil, map, zip} from "lodash";
import {getDocument} from "@/api-client/requests";
import {slice2d} from "@/api-client/helpers";

export const CITIES_START_Y = 5;
export const CITIES_END_Y = 26;
export const CITIES_START_X = 1;
export const CITIES_END_X = 21;
export const CITIES_START: [number, number] = [CITIES_START_X, CITIES_START_Y];
export const CITIES_END: [number, number] = [CITIES_END_X, CITIES_END_Y];




export interface CityRaw {
    'Miasto': string;
    'Wojewodztwo': string;
    'Stan Stabilny lub Dobry': string;
    'Stan Ciezki': string;
    'Nieaktywne przypadki': string;
    'SUMA': string;
    'Zgony': string;
    'Zdrowi': string;
    'Aktywne przypadki': string;
    'dzien (+)': string;
    '7 dni (+)': string;
    'data ostatniego przypadku': string;
    'gowno_1': null;  // padding
    'Populacja (~)': string;
    '% Stan Stabilny lub Dobry': string;
    '% Stan Ciezki': string;
    '% Smierc': string;
    'gowno_2': null; // padding
    'miesiac (+)': string; // padding
    'zeszly tydzien (+)': string; // padding
}

export const CITY_FIELDS: Array<keyof CityRaw> = [
    'Miasto',
    'Wojewodztwo',
    'Stan Stabilny lub Dobry',
    'Stan Ciezki',
    'Nieaktywne przypadki',
    'SUMA',
    'Zgony',
    'Zdrowi',
    'Aktywne przypadki',
    'dzien (+)',
    '7 dni (+)',
    'data ostatniego przypadku',
    'gowno_1', // padding
    'Populacja (~)',
    '% Stan Stabilny lub Dobry',
    '% Stan Ciezki',
    '% Smierc',
    'gowno_2',// padding
    'miesiac (+)',// padding
    'zeszly tydzien (+)',// padding
];

function cityFromRaw(line: string[]): CityRaw | null {
    return CITY_FIELDS.length === line.length ? fromPairs(zip(CITY_FIELDS, line)) as CityRaw : null;
}

function getCitiesSquare(document: string[][]): string[][] {
    return slice2d(document, CITIES_START, CITIES_END);
}

export async function getRawCities(): Promise<(CityRaw | null)[]> {
    const document = await getDocument();
    return isNil(document) ? [] : map(getCitiesSquare(document), cityFromRaw);
}
