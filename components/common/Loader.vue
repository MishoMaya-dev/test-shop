<template>
  <div class="loader">
    <i class="fas fa-spin" :class="`fa-${icon}`"></i>
  </div>
</template>

<script>
  import {getRandomInt} from '../../plugins'

  const ICONS = [
    'star',
    'drumstick',
    'pepper-hot',
    'pizza-slice',
    'ice-cream',
    'bat',
    'paw-claws',
    'heart',
    'atom'
  ];

  export default {
    name: 'Loader',
    data: () => ({
      icon: ICONS[0],
    }),
    created() {
      this.init();
    },
    methods: {
      init() {
        const num = getRandomInt(0, ICONS.length);
        this.icon = ICONS[num];
      },
    },
  }
</script>

<style lang="scss" scoped>
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 80px;
}
</style>
