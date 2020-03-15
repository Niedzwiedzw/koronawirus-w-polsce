import {reduce} from 'lodash';
import {CityRaw} from "@/api-client/city";
import moment from 'moment';
import slugify from '@sindresorhus/slugify';
moment.locale('pl');

export class City {
    public constructor(
        public name: string,
        public district: string,
        public cases: number,
        public inStableCondition: number,
        public criticalCondition: number,
        public recovered: number,
        public deaths: number,
        public lastCase: moment.Moment,
        public weeklyIncrease: number,
        public monthlyIncrease: number,
    ) {}
    static fromRaw(raw: CityRaw): City {
        return new City(
            raw['Miasto'],
            raw['Wojewodztwo'],
            parseInt(raw['Aktywne przypadki']),
            parseInt(raw['Stan Stabilny lub Dobry']),
            parseInt(raw['Stan Ciezki']),
            parseInt(raw['Zdrowi']),
            parseInt(raw['Zgony']),
            moment(raw['data ostatniego przypadku'], 'DD.MM.YYYY'),
            parseInt(raw['zeszly tydzien (+)'].replace(/[-\s.]/, '')),
            parseInt(raw['miesiac (+)']),
        );
    }
    public get slug(): string { return slugify(this.name); }

    public concat(other: City, name?: string): City {
        return new City(
            name ? name : `${this.name} + ${other.name}`,
            name ? name : (this.district === other.district ? this.district : `${this.district} + ${other.district}`),
            this.cases + other.cases,
            this.inStableCondition + other.inStableCondition,
            this.criticalCondition + other.criticalCondition,
            this.recovered + other.recovered,
            this.deaths + other.deaths,
            this.lastCase.isAfter(other.lastCase) ? this.lastCase : other.lastCase,
            this.weeklyIncrease + other.weeklyIncrease,
            this.monthlyIncrease + other.monthlyIncrease,
        )
    }

    static fromMultiple(cities: City[], areaName?: string): City | null {
        return reduce(cities, (v, c) => v.concat(c, areaName)) ?? null;
    }
}
