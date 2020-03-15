<template>
<div id="app">
  <cov-header />
  <main>
    <router-view/>
  </main>
  <cov-footer />
</div>
</template>

<script lang="ts">
import CovFooter from './views/components/home/CovFooter.vue'
import CovHeader from './views/components/home/CovHeader.vue'

export default {
  components: { CovFooter, CovHeader }
}
</script>>

<style lang="scss">
@import "src/styles/main";
header { grid-area: header; }
main { 
  grid-area: main;
  display: flex;
  justify-content: center;
}
footer { grid-area: footer; }

#app {
  height: 100%;
  display: grid;
  grid-template-rows: 1fr auto;
  grid-gap: 2em;
  grid-template-areas:
    'header'
    'main'
    'footer';
}
</style>
