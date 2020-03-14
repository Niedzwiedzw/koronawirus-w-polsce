<template>
  <div class="home">
    <section class="city-boxes">
      <cov-city-box class="city-box" v-for="city of cities" :key="city.slug" :city="city"/>
    </section>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@vue/composition-api';
import CovCityBox from "@/views/components/home/CovCityBox.vue";
import {useCities} from "@/useCases";

export default defineComponent({
  name: "Home",
  components: {
    CovCityBox,
  },
  setup() {
    return {
      ...useCities(),
    };
  }
})
</script>

<style scoped lang="scss">
@import "src/styles/main";

.home {
  max-width: $desktop-min !important;
  @include grid-center;
  .city-boxes {
    @include grid-center;
    grid-template-columns: repeat(auto-fit, minmax($city-box-size + 1rem, 1fr));
    grid-gap: 1rem;
  }
}
</style>