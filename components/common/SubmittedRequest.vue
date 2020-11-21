<template>
 <div class="submit">
   <img src="@/assets/okay.svg" class="submit__image">
   <span class="submit__text">Заявка успешно отправлена</span>
   <span class="submit__subtext">Вскоре наш менеджер свяжется с Вами</span>
 </div>
</template>

<script>
  export default {
    name: 'SubmittedRequest'
  }
</script>

<style lang="scss" scoped>
  .submit {
    position: relative;
    top: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &__image {
      margin-bottom: 24px;
    }
    &__text {
      margin-bottom: 2px;
      font-weight: bold;
      font-size: 24px;
      line-height: 31px;
    }
    &__subtext {
      font-size: 16px;
      line-height: 21px;
      color: #59606D;
    }
  }
</style>
