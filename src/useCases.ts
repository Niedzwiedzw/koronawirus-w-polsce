import {ref, computed, onMounted} from '@vue/composition-api';
import {Moment} from 'moment';
import {City} from "@/models";
import {getCities, getCity, getLastUpdate} from "@/api-client/requests";


export function useLoading() {
    const loading = ref(false);

    const withLoading = async (procedure: () => Promise<void>) => {
      loading.value = true;
      await procedure();
      loading.value = false;
    };

    return {
        loading,
        withLoading,
    };
}

export function useCities() {
    const {withLoading, ...rest} = useLoading();
    const cities = ref<City[]>([]);
    const poland = computed<City | null>(() => City.fromMultiple(cities.value, 'Polska'));
    onMounted(() => {
        withLoading(async () => {
            cities.value = await getCities();
        })
    });

    return {
        cities,
        ...rest,
        poland,
    };
}

export function useCity(citySlug: string) {
    const city = ref<City | null>(null);
    const {withLoading, ...rest} = useLoading();

    onMounted(() => {
        withLoading(async () => {
            city.value = await getCity(citySlug);
        });
    });

    return {
        city,
        ...rest,
    };
}

export function useLastUpdate() {  // remember to name-space 'loading' variable when merging multiple use-cases
    const {withLoading, ...rest} = useLoading();
    const lastUpdate = ref<Moment | null>(null);
    const lastUpdatePretty = computed<string>(() => lastUpdate.value?.fromNow() ?? '-- brak --');
    onMounted(async () => {
        withLoading(async () => {
            lastUpdate.value = await getLastUpdate();
        });
    });

    return {
        lastUpdate,
        lastUpdatePretty,
        ...rest,
    }
}
