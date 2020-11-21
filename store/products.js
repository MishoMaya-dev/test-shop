import {loadImg} from "../plugins"

function setLocalCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart))
}

export const state = () => ({
  goods: [],
  categories: [],
  cart: [],
})

export const mutations = {
  setProducts(state, goods) {
    state.goods = goods
  },
  setCategories(state, categories) {
    state.categories = categories
  },
  addProductToCart(state, prod) {
    prod.inCart = true
    state.cart.push(prod)
    setLocalCart(state.cart)
  },
  deleteProductFromCart(state, prod) {
    prod.inCart = false;
    state.cart = state.cart.filter(p => p.id !== prod.id)
    setLocalCart(state.cart)
  },
  clearCart(state) {
    state.cart.forEach(prod => {
      prod.inCart = false
    })
    state.cart = [];
    localStorage.removeItem('cart')
  },
  trySetSavedCart(state) {
    const savedCart = localStorage.getItem('cart')
    if (!savedCart) return;
    const cart = JSON.parse(savedCart)
    state.cart = cart;
  }
}

export const actions = {
  async fetchCategories({ commit }) {
    const arrCategories = await this.$axios.$get('http://front-test.idalite.com/api/product-category')
    commit('setCategories', arrCategories)
  },
  async fetchProducts({ commit }) {
    const arrGoods = await this.$axios.$get('http://front-test.idalite.com/api/product')
    arrGoods.forEach(good => {
      good.inCart = false;
      good.photo = `http://front-test.idalite.com${good.photo}`
    })
    commit('setProducts', arrGoods);
    commit('trySetSavedCart');
    await Promise.all([...arrGoods].map(good => loadImg(good.photo)))
  }
}

export const getters = {
  categories(state) {
    return state.categories
  },
  goods(state) {
    return state.goods
  },
  cart(state) {
    return state.cart
  }
}
