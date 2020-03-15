<template>
  <header>
    <div class="nav">
      <div class="nav__right">
        <div class="nav__right__logo nav__logo">
          <img src="@/assets/logo.png">
        </div>
        <span class="nav__right__title nav__title desktop-only">
          <p class="nav__title--first-line">Koronawirus: SARS-COV-2 - COVID-19 </p>
          <p class="nav__title--second-line">Statystyka w Polsce</p>
        </span>
      </div>
      <div class="nav__left nav-left desktop-only">
        <div class="nav-left__options">
          Ostatnia aktualizacja: {{lastUpdatePretty}}
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import {useLastUpdate} from "@/useCases";


export default {
  setup() {
      return {
          ...useLastUpdate(),
      }
  }
}
</script>

<style scoped lang="scss">
@import "../../../styles/main";

header {
  width: 100%;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 3em;
  height: 3.5rem;

  background-color: $color-secondary;

  &__title {
    font-size: $font-medium;
    font-weight: 600;
    border-left: 3px solid white;
    padding-left: 0.5em;
    &--first-line {
      margin-bottom: 0;
      margin-top: 0;
    }
    &--second-line {
      margin-bottom: 0;
      margin-top: 0;
    }
  }

  &__right {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 32%;

    &__logo {
      margin-right: 1em;
      img {
        width: 2.5em;
        height: 2.5em;
      }
    }
  }

  &__left {
    width: 30%;
  }
}
</style>