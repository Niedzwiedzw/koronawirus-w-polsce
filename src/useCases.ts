import {ref, computed, onMounted} from '@vue/composition-api';
import {City} from "@/models";
import {getCities, getCity} from "@/api-client/requests";

export function useLoading() {
    const loading = ref(false);

    const withLoading = async (procedure: () => Promise<any>) => {
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

    onMounted(() => {
        withLoading(async () => {
            cities.value = await getCities();
        })
    });

    return {
        cities,
        ...rest,
    };
}

export function useCity(citySlug: string) {
    const city = ref<City | null>(null);
    const {withLoading, ...rest} = useLoading();

    withLoading(async () => {
       city.value = await getCity(citySlug)
    });

    return {
        city,
        ...rest,
    };
}