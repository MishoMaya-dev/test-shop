<template>
  <div class="cart">
    <div
      class="cart__overlay"
      @click.self="$emit('closeCart')"
    />
    <div class="cart__panel">
      <div class="cart__header">
        <span class="cart__title">Корзина</span>
        <i
          class="fas fa-times cart__close"
          @click="$emit('closeCart')"
        />
      </div>
      <div
        class="cart__goods"
        v-if="!submit"
      >
        <div
          class="cart__full-cart"
          v-if="cartProducts.length !== 0"
        >
          <div class="cart__stuff">
            <span class="cart__name">Товары в корзине</span>
            <transition-group
              class="cart__items"
              name="cart-list"
              tag="div"
            >
              <Item
                v-for="product in cartProducts"
                :key="product.id"
                :product="product"
                for-cart
                @delete="deleteProductFromCart(product)"
              />
            </transition-group>
          </div>
          <form class="cart__form" @submit.prevent="onSubmit">
            <span class="cart__name">Оформить заказ</span>
            <div class="cart__inputs">
              <input
                v-model="name"
                type="text"
                class="cart__input"
                placeholder="Ваше имя"
                @input="clearErrors"
              >
              <masked-input
                v-model="phone"
                mask="\+\7 111 111-11-11"
                placeholder="Телефон"
                class="cart__input"
                @input="clearErrors"

              />
              <input
                v-model="address"
                type="text"
                class="cart__input"
                placeholder="Адрес"
                @input="clearErrors"
              >
            </div>
            <button
              :disabled="isDirty"
              class="cart__button"
              :class="{ disabled: isDirty }"
              type="submit"
            >
              Отправить
            </button>
          </form>
          <div class="cart__warning" v-if="isDirty">
            <span class="cart__point">!!</span>
            <span class="cart__warning-text">
              Все поля обязательные.<br>
              После удачной отправки формы содержимое корзины очищается
            </span>
          </div>
        </div>
        <div
          class="cart__empty-cart"
          v-else
        >
          <span class="cart__text">
            Пока что вы ничего не добавили в корзину.
          </span>
          <button
            class="cart__button"
            @click="$emit('closeCart')"
          >
            Перейти к выбору
          </button>
        </div>
      </div>
      <submitted-request v-else />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import MaskedInput from 'vue-masked-input'
import SubmittedRequest from "./common/SubmittedRequest";
import Item from "./Item";

export default {
  name: 'Cart',
  components: {Item, SubmittedRequest, MaskedInput},
  data: () => ({
    name: '',
    phone: '',
    address: '',
    submit: false,
    isDirty: false,
  }),
  computed: {
    isDisabled() {
      return this.name === '' || this.phone === '' || this.address === ''
    },
    cartProducts() {
      return this.$store.getters['products/cart']
    }
  },
  methods: {
    ...mapMutations('products', ['deleteProductFromCart', 'clearCart']),
    clearErrors() {
      this.isDirty = false
    },
    onSubmit() {
      if (this.isDisabled) {
        this.isDirty = true
        return
      }
      this.submit = true
      this.clearCart()
    },
  }
}
</script>

<style lang="scss" scoped>
 .cart {
   position: fixed;
   top: 0;
   right: 0;
   bottom: 0;
   left: 0;
   z-index: 10;
   &__overlay {
     position: absolute;
     top: 0;
     right: 0;
     bottom: 0;
     left: 0;
     background: #FFFFFF;
     opacity: 0.8;
   }
   &__items {
     display: grid;
     grid-gap: 12px;
   }
   &__panel {
     position: absolute;
     right: 0;
     width: 460px;
     max-width: 100vw;
     height: 100%;
     padding: 30px 20px;
     background: #FFFFFF;
     box-shadow: -4px 0 16px rgba(0, 0, 0, 0.05);
     border-radius: 8px 0 0 8px;
     overflow-y: auto;
     @media (min-width: 600px) {
       padding: 52px 48px;
     }
   }
   &__header {
     display: flex;
     justify-content: space-between;
     align-items: center;
     margin-bottom: 24px;
   }
   &__title {
     font-size: 32px;
     line-height: 41px;
   }
   &__close {
     width: 14px;
     height: 14px;
     cursor: pointer;
   }
   &__stuff {
     display: grid;
     margin-bottom: 32px;
   }
   &__name {
     margin-bottom: 16px;
     font-size: 18px;
     line-height: 23px;
     color: #59606D;
   }
   &__form {
     display: grid;
     margin-bottom: 27px;
   }
   &__inputs {
     display: grid;
     grid-template-columns: auto;
     grid-gap: 16px;
     margin-bottom: 24px;
   }
   &__input {
     height: 50px;
     padding: 14px 14px 15px;
     background: #F8F8F8;
     border: none;
     border-radius: 8px;
     font-size: 16px;
     line-height: 21px;
     color: #959DAD;
     text-overflow: ellipsis;
   }
   &__warning {
     position: sticky;
   }
   &__point {
     position: absolute;
     top: 0;
     font-weight: bold;
     font-size: 32px;
     line-height: 41px;
     color: #EB5757;
   }
   &__warning-text {
     position: relative;
     top: 5px;
     left: 27px;
     font-size: 16px;
     line-height: 21px;
   }
   &__empty-cart {
     display: grid;
     grid-gap: 24px;
   }
   &__text {
     font-size: 22px;
     line-height: 28px;
   }
   &__button {
     width: 100%;
     height: 50px;
     background: #1F1F1F;
     color: #FFFFFF;
     border: none;
     border-radius: 8px;
     cursor: pointer;
     &.disabled {
       background: #59606D;
     }
   }
 }
</style>
