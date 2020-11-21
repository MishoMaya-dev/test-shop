<template>
  <div class="goods">
    <div class="goods__sort">
      <Select
        v-model="sort"
        :options="['дате', 'цене', 'популярности']"
        :arrow-down="isDown"
        @set-current="handleSort"
      />
    </div>
    <div class="goods__items">
      <item
        v-for="product in sortedGoods"
        :product="product"
        :key="product.id"
        @add="addProductToCart(product)"
        @delete="deleteProductFromCart(product)"
      />
    </div>
  </div>

</template>

<script>
  import { mapMutations } from 'vuex'
  import Item from "../../components/Item";
  import Select from "../../components/common/Select";

  export default {
    name: 'CatalogId',
    components: {
      Select,
      Item
    },
    data: () => ({
      sort: 'дате',
      isDown: true,
    }),
    computed: {
      currentCategoryId() {
        return +this.$route.params.id
      },
      storeGoods() {
        return this.$store.getters['products/goods']
      },
      goods() {
        return [...this.storeGoods].filter(good => good.category === this.currentCategoryId)
      },
      sortedGoods() {
        let goods;
        switch (this.sort) {
          case 'цене':
            goods = [...this.goods].sort((a, b) => a.price - b.price)
            break
          case 'популярности':
            goods = [...this.goods].sort((a, b) => b.rating - a.rating)
            break
          default:
            goods = [...this.goods]
        }
        if (!this.isDown) {
          return [...goods].reverse()
        }
        return [...goods]
      },
    },
    watch: {
      sort() {
        this.isDown = true
      },
    },
    created() {
      window.cat = this
    },
    methods: {
      ...mapMutations('products', ['addProductToCart', 'deleteProductFromCart']),
      handleSort(option) {
        if (this.sort === option) {
          this.isDown = !this.isDown
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .goods {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    overflow-y: auto;
    padding: 42px 25px 0;
    @media (min-width: 768px) {
      padding: 42px 88px 0 25px;
    }
    &__sort {
      display: flex;
      flex: 0 0 auto;
      justify-content: flex-end;
    }
    &__title {
      margin-right: 6px;
    }
    &__select {
      color: #59606D;
    }
    &__items {
      margin-top: 34px;
      display: grid;
      flex: 1 1 auto;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      grid-gap: 16px;
    }
  }
</style>
