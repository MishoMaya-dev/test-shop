<template>
  <div class="select">
    <div class="select__current">
      <span>Сортировать по: </span>
      <span class="select__current-value" @click="toggle">
        {{ current }}
        <i v-if="arrowDown" class="fas fa-caret-down"></i>
        <i v-else class="fas fa-caret-up"></i>
      </span>
    </div>
    <div class="select__options" v-show="showed">
      <div
        v-for="(option, i) in options"
        class="select__option"
        :class="{ 'select__option--current': current === option }"
        :key="i"
        @click="setCurrent(option)"
      >
        <span>{{ option }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Select',
    model: {
      prop: 'current',
      event: 'set-current',
    },
    props: {
      current: String,
      options: Array,
      arrowDown: Boolean,
    },
    data: () => ({
      showed: false,
    }),
    methods: {
      toggle() {
        this.showed = !this.showed
      },
      setCurrent(option) {
        this.showed = false
        this.$emit('set-current', option)
      },
    }
  }
</script>

<style lang="scss" scoped>
.select {
  position: relative;
  user-select: none;

  &__current-value {
    color: #59606D;
    cursor: pointer;
  }

  &__options {
    position: absolute;
    top: calc(100% + 6px);
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 8px 0;
    background: #FFFFFF;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
  }

  &__option {
    height: 26px;
    padding: 4px 12px;
    text-overflow: ellipsis;
    cursor: pointer;
    color: #959DAD;

    &:hover {
      color: #1F1F1F;
      background: #F8F8F8;
    }

    &--current {
      color: #1F1F1F;
      background: #F8F8F8;
    }
  }
}
</style>
