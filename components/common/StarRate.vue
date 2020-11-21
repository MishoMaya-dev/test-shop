<template>
  <div class="rate">
    <i ref="star" class="fas fa-star rate__star fill" :style="fillStar"></i>
    <i class="far fa-star rate__star"></i>
    <span class="rate__bill">{{ rate }}</span>
  </div>
</template>

<script>
  export default {
    name: "StarRate",
    props: {
      rate: Number,
    },
    computed: {
      fillStar() {
        const percent = Math.ceil((this.rate / 5) * 100)
        return {
          background: `linear-gradient(0deg, #F2C94C ${percent}%, #FFFFFF ${percent}%)`,
          webkitBackgroundClip: "text",
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
.rate {
  position: relative;
  display: flex;
  align-items: center;
  grid-area: star;
  &__star {
    position: absolute;
    left: 0;
    font-size: 14px;
    color: #F2C94C;
    &.fill {
      -webkit-text-fill-color: transparent;
    }
  }
  &__bill {
    font-size: 10px;
    line-height: 13px;
    color: #F2C94C;
    margin-left: 20px;
  }
}
</style>
