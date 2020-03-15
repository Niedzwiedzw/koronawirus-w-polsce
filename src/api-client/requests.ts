import {map, isNil, filter, find, split} from 'lodash';
import moment from 'moment';

import {City} from "@/models";
import {CityRaw, getRawCities} from "@/api-client/city";
import {DEBUG} from '@/config';
import {LAST_UPDATE_CELL_X, LAST_UPDATE_CELL_Y} from "@/api-client/last-update";
import {cell} from "@/api-client/helpers";

const BACKEND_API = 'https://google-driver-wheel.herokuapp.com/document/' +
    'https://docs.google.com/spreadsheets/u/2/d/' +
    '1ierEhD6gcq51HAm433knjnVwey4ZE5DCnu1bW7PRG3E/htmlview?usp=sharing&sle=true';

async function get<T>(url: string): Promise<T | null> {
    const raw = await fetch(url);
    try {
        return await raw.json();
    } catch (e) {
        /* eslint-disable no-console */
        if (DEBUG) console.error(`request failed`, {reason: e.toString()});
        /* eslint-enable no-console */
        return null;
    }
}

export async function getDocument(): Promise<string[][] | null> {
    return await get(BACKEND_API);
}

export async function getCities(): Promise<City[]> {
    return map(filter((await getRawCities()), (c) => !isNil(c)), (raw) => new City(raw as CityRaw));
}

export async function getCity(slug: string): Promise<City | null> {
    return find((await getCities()), (c) => c.slug === slug) ?? null;
}

function parseDate(value: string): moment.Moment | null {  // "OSTATNIA AKTUALIZACJA: 15.03.2020, 0:30"
    const dateStr = split(value, ':').slice(1).join(':');   //  " 15.03.2020, 0:30"
    return isNil(dateStr) ? null : moment(dateStr, ' DD.MM.YYYY, H:mm');
}


export async function getLastUpdate(): Promise<moment.Moment | null> {
    const document = await getDocument();
    const date = isNil(document)
        ? null
        : cell(document, LAST_UPDATE_CELL_X, LAST_UPDATE_CELL_Y) ?? null;
    return isNil(date) ? null : parseDate(date);
}
