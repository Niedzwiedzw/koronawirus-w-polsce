<template>
  <div class="CovCityBox" :class="{showSummary}" @click="showSummary = !showSummary">
    <h3 class="name">{{city.name}}</h3>
    <p class="last-case"><strong>ostatni przypadek</strong>: <em>mniej niż {{city.lastCase.fromNow()}}</em></p>
    <p class="total-cases">{{city.cases}} 🥵</p>
    <p class="recovered">{{city.recovered}} 💕</p>
    <p class="deaths">{{city.deaths}} 💀</p>
    <transition name="slide-down" mode="out-in">
      <div class="summary" v-if="showSummary">
        <h5 class="cases-state" style="grid-column: 1 / -1">Stan chorych:</h5>
        <p class="stable-contidion">stabilny: {{city.inStableCondition}}</p>
        <p class="critical-contidion">ciężki: {{city.criticalCondition}}</p>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from '@vue/composition-api';
import {City} from "@/models";

export default defineComponent({
    name: "CovCityBox",
    props: {
        city: {
            type: Object as () => City,
            required: true,
        }
    },
    setup(props) {
        const showSummary = ref(false);
        return {
          showSummary,
        }
    }
})
</script>

<style scoped lang="scss">
@import "src/styles/main";

.CovCityBox {
  @include grid-center;
  @include hoverable;
  & > * {
    text-align: center;
  }

  & * {
    transition: all .2s ease-in-out;
  }
  padding: .5rem;
  width: $city-box-size;
  height: $city-box-size;
  background-color: $white;
  color: $color-darker;
  border-radius: 1rem;
  grid-template: min-content 1fr min-content / 1fr 1fr 1fr;
  grid-template-areas:
    "name name name"
    "last-case last-case last-case"
    "total-cases recovered deaths";

  grid-template-rows: min-content;  // for summary

  &.showSummary {
    grid-template-areas:
        "name name name"
        "last-case last-case last-case"
        "total-cases recovered deaths"
        "summary summary summary";
  }

  .summary {
    @include grid-center;
    grid-area: summary;
    grid-column: 1 / -1;
    grid-template-rows: min-content min-content;
    grid-template-columns: 1fr 1fr;
    grid-auto-flow: column;
    font-size: $font-small;
  }
  .name {
    grid-area: name;
    font-weight: 900;
    text-align: center;
    width: 100%;
    font-size: $font-large;
  }

  .district {
    grid-area: district;
  }

  .weekly-increase {
    grid-area: weekly-increase;
  }

  .last-case {
    grid-area: last-case;
    font-size: $font-x-small;
  }

  .total-cases {
    grid-area: total-cases;
    @include dance;
  }

  .recovered {
    grid-area: recovered;
    @include dance;
  }

  .deaths {
    grid-area: deaths;
    @include dance;
  }
}
</style>