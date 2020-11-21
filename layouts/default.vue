<template>
  <div class="container">
    <Loader v-if="pending" />
    <template v-else>
      <app-header
        @open-catalog="toggleCatalog"
        @openCart="openCart"
      />
      <div class="layout-main">
        <app-navbar :opened="isCatalogOpen" @close="toggleCatalog" />
        <div class="layout-main__content">
          <nuxt />
        </div>
        <transition name="cart-fade">
          <cart
            v-if="isCartOpen"
            @closeCart="openCart"
          />
        </transition>
      </div>

    </template>
  </div>

</template>

<script>
  import appHeader from "../components/Header";
  import appNavbar from "../components/Navbar";
  import Cart from "../components/Cart";
  export default {
    components: {
      Cart,
      appHeader,
      appNavbar
    },
    data: () => ({
      pending: false,
      isCartOpen: false,
      isCatalogOpen: false,
    }),
    created() {
      window.store = this.$store
      this.init()
    },
    methods: {
      async init() {
        try {
          this.pending = true;
          await this.$store.dispatch('products/fetchCategories')
          await this.$store.dispatch('products/fetchProducts')
        } finally {
          this.pending = false;
        }
      },
      openCart() {
        this.isCartOpen = !this.isCartOpen
      },
      toggleCatalog() {
        this.isCatalogOpen = !this.isCatalogOpen
      }
    }
  }

</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  max-height: 100%;
}
.layout-main {
  position: relative;
  display: flex;
  flex: 1 1 auto;
  overflow-y: auto;

  &__content {
    flex: 1 1 auto;
  }
}
</style>
