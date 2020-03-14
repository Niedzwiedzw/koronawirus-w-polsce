import {map, isNil, filter, find} from 'lodash';
import {City} from "@/models";
import {CityRaw, getRawCities} from "@/api-client/city";
import {DEBUG} from '@/config';

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
