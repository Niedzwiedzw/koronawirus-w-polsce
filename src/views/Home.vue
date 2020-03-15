<template>
  <div class="home">
    <div class="discord-invite">
      <h3 class="discord-title">
        Konwersacja
      </h3>
      <iframe src="https://discordapp.com/widget?id=687997179620622388&theme=dark"
              width="295" height="200" allowtransparency="true" frameborder="0"></iframe>
    </div>
    <transition-group name="slide-down" tag="section" class="city-boxes">
      <cov-city-box
          v-if="poland !== null"
          class="poland-box"
          :city="poland"
          :key="poland.slug"
      ></cov-city-box>

      <cov-city-box class="city-box" v-for="city of cities" :key="city.slug" :city="city"/>
    </transition-group>
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

  .discord-invite {
    @include grid-center;
    .discord-title {
      text-align: center;
      width: 100%;
    }
    margin-bottom: 1rem;
  }

  .city-boxes {
    @include grid-center;
    grid-template-columns: repeat(auto-fit, minmax($city-box-size + 1rem, 1fr));
    grid-gap: 1rem;

    .poland-box {
      border: 5px solid $color-secondary;
      grid-column: 1 / -1;
    }
  }
}
</style>