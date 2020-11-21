<template>
  <div class="header">
    <div class="header__logo">
      <i class="far fa-bars header__catalog" @click="$emit('open-catalog')" />
      <nuxt-link to="/catalog/1" tag="h1" class="header__title">TestList</nuxt-link>
    </div>
    <div class="header__cart">
      <img
        src="../assets/cart.svg"
        alt="Корзина"
        @click="$emit('openCart')"
      >
      <div v-if="!!cart.length" class="header__badge">{{ cart.length }}</div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Header',
    computed: {
      ...mapGetters('products', ['cart'])
    },
  }
</script>

<style lang="scss" scoped>
  .header {
    z-index: 2;
    display: flex;
    flex: 0 0 auto;
    justify-content: space-between;
    align-items: center;
    padding: 18px 18px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
    border-radius: 0 0 8px 8px;
    background: #FFFFFF;
    @media (min-width: 768px) {
      padding: 18px 88px;
    }
    &__logo {
      display: flex;
      align-items: center;
    }
    &__catalog {
      display: block;
      margin-right: 10px;
      font-size: 24px;
      @media (min-width: 768px) {
        display: none;
      }
    }
    &__title {
      font-size: 22px;
      line-height: 28px;
      color: #59606D;
      cursor: pointer;
    }
    &__cart {
      position: relative;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    &__badge {
      position: absolute;
      top: -4px;
      right: -6px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #959DAD;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 8px;
      line-height: 10px;
      color: #FFFFFF;
    }
  }
</style>
