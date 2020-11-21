<template>
  <div class="catalog" :class="{ 'catalog--opened': opened  }">
    <div class="catalog__overlay" @click.self="$emit('close')"></div>
    <div class="catalog__content">
      <h2 class="catalog__title">Каталог</h2>
      <nuxt-link
        v-for="category in categories"
        :key="category.id"
        :to="`/catalog/${category.id}`"
        class="catalog__page"
        active-class="active"
      >
        {{ category.name }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Navbar',
    props: {
      opened: {
        type: Boolean,
        default: false,
      }
    },
    computed: {
      categories() {
        return this.$store.getters['products/categories']
      },
    },
  }
</script>

<style lang="scss" scoped>
  .catalog {
    z-index: 1;
    &__overlay {
      position: absolute;
      height: 100%;
      bottom: 0;
      left: 0;
      display: none;
      background: #FFFFFF;
      opacity: 0;
      width: 100%;
      transition: all 5s linear;
    }
    &__content {
      position: absolute;
      height: 100%;
      bottom: 0;
      left: 0;
      display: none;
      flex-direction: column;
      padding: 32px 25px 0 88px;
      background: #FFFFFF;
      @media (min-width: 768px) {
        position: unset;
        display: flex;
      }
    }
    &--opened &__content {
      display: flex;
    }
    &--opened &__overlay {
      display: block;
      opacity: 0.8;
      @media (min-width: 768px) {
        display: none;
      }
    }
    &__title {
      margin-bottom: 24px;
      font-size: 32px;
      line-height: 41px;
      color: #1F1F1F;
    }
    &__page {
      margin-bottom: 16px;
      font-size: 16px;
      line-height: 21px;
      color: #959DAD;
      text-decoration: none;
      &:hover {
        color: #59606D;
      }
    }
  }
  .active {
     text-decoration-line: underline;
     color: #1F1F1F;
   }
</style>
