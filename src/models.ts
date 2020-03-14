import {CityRaw} from "@/api-client/city";

export class City {
    public constructor(private raw: CityRaw) {}
    public get name(): string { return this.raw['Miasto']; }
    public get district(): string { return this.raw['Wojewodztwo']; }
    public get cases(): number { return parseInt(this.raw['Aktywne przypadki']); }
}
