import {CityRaw} from "@/api-client/city";
import moment from 'moment';

export class City {
    public constructor(private raw: CityRaw) {}
    public get name(): string { return this.raw['Miasto']; }
    public get district(): string { return this.raw['Wojewodztwo']; }
    public get cases(): number { return parseInt(this.raw['Aktywne przypadki']); }
    public get in_stable_condition(): number { return parseInt(this.raw['Stan Stabilny lub Dobry']); }
    public get critical_condition(): number { return parseInt(this.raw['Stan Ciezki']); }
    public get deaths(): number { return parseInt(this.raw['Zgony']); }
    public get weeklyIncrease(): number { return parseInt(this.raw['zeszly tydzien (+)']); }
    public get monthlyIncrease(): number { return parseInt(this.raw['miesiac (+)']); }
    public get recovered(): number { return parseInt(this.raw['Zdrowi']); }
    public get lastCase(): moment.Moment { return moment(this.raw['data ostatniego przypadku']); }
}
