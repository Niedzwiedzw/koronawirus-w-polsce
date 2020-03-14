<template>
  <div class="Home">
    <div v-for="city of cities" :key="city.name">
      <p>{{city.name}}</p>
      <p>{{city.district}}</p>
      <p>przypadków: {{city.cases}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, onMounted} from '@vue/composition-api';
import {City} from "@/models";
import {getCities} from "@/api-client/requests";

export default defineComponent({
    name: "Home",
    setup() {
        const cities = ref<City[]>([]);
        const loading = ref(false);
        onMounted(async () => {
            loading.value = true;
            cities.value = (await getCities()) ?? [];
            loading.value = false;
        });
        return {
            cities,
        };
    }
})
</script>

<style scoped lang="scss">
@import "src/styles/main";

.Home {

}
</style>