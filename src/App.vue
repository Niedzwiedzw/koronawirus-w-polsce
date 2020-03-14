<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import "src/styles/main";
  #app {
    @include grid-center;
    background-color: $color-darker;
  }
</style>
