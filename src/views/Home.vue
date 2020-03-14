<template>
  <div class="Home">
    <section class="city-boxes">
      <cov-city-box class="city-box" v-for="city of cities" :key="city.slug" :city="city"/>
    </section>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, onMounted} from '@vue/composition-api';
import {City} from "@/models";
import {getCities} from "@/api-client/requests";
import CovCityBox from "@/views/components/home/CovCityBox.vue";
import {useCities} from "@/useCases";

export default defineComponent({
    name: "Home",
    components: {
        CovCityBox,
    },
    setup() {
        onMounted(() => {
           const audio = new Audio('trzymamy-sie.mp3');
           audio.play();
        });
        return {
            ...useCities(),
        };
    }
})
</script>

<style scoped lang="scss">
@import "src/styles/main";

.Home {
  @include grid-center;
  .city-boxes {
    @include grid-center;
    grid-template-columns: repeat(auto-fit, minmax($city-box-size + 1rem, 1fr));
    grid-gap: 1rem;
  }
}
</style>