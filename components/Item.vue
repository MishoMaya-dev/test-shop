<template>
  <div class="item" :class="{ 'for-cart': forCart }">
    <StarRate :rate="product.rating" />
    <img :src="product.photo" alt="" class="item__image">
    <img
      v-if="product.inCart"
      src="../assets/trash.svg"
      alt="Удалить"
      class="item__cart"
      @click="$emit('delete')"
    >
    <img
      v-else
      src="../assets/mini-cart.svg"
      alt="Корзина"
      class="item__cart"
      @click="$emit('add')"
    >
    <div class="item__description">
      <span class="item__name">{{ product.name }}</span>
      <span class="item__price">{{ product.price }} ₽</span>
    </div>
  </div>
</template>

<script>
import StarRate from './common/StarRate'

export default {
  name: 'Item',
  components: {StarRate},
  props: {
    product: Object,
    forCart: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    icon() {
      return {
        name: this.forCart ? 'trash' : 'mini-cart',
        emit: this.forCart ? 'delete' : 'add',
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  .item {
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: auto 1fr auto;
    grid-template-areas:
      'star img icon'
      'desc desc desc';
    align-items: flex-start;
    justify-items: center;
    padding: 18px 16px 16px 18px;
    background: #FFFFFF;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    &__top {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 16px;
    }
    &__image {
      height: 180px;
      grid-area: img;
    }
    &__cart {
      grid-area: icon;
      cursor: pointer;
      height: 14px;
      width: 12px;
    }
    &__description {
      display: flex;
      flex-direction: column;
      grid-area: desc;
      width: 100%;
    }
    &__name {
      margin-bottom: 6px;
      font-size: 14px;
      line-height: 18px;
      color: #59606D;
    }
    &__price {
      font-weight: bold;
      font-size: 14px;
      line-height: 18px;
      color: #1F1F1F;
    }
  }

  .for-cart {
    grid-template-areas:
      'img desc icon'
      'img star icon';
    justify-items: flex-start;
    align-items: center;
    padding: 15px 22px;
    .item {
      &__image {
        height: 90px;
      }
      &__description {
        height: 100%;
      }
      &__cart {
        height: 22px;
        width: unset;
      }
    }
  }
</style>
