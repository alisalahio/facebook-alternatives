<script>
export default {
  name: 'home',

  data: () => ({
    isJustCopied: false
  }),

  methods: {
    copy() {
      this.$copyText('https://quitfacebook.org/').then(function (e) {
        console.log(e)
      })
      this.activateJustCopied()
    },
    activateJustCopied() {
      this.isJustCopied = true
      setTimeout(() => {
        this.isJustCopied = false
      }, 2500)

    }
  }
}
</script>

<template>
  <div class="home my-6">
    <div class="flex flex-col content-center items-center">
      <div class="flex flex-col items-center select-none">
        <img
          class="w-24 h-24 mr-2"
          alt="Quit Facebook Logo"
          src="../assets/logo.png"
        >
        <h1 class="text-5xl text-blue-dark font-black uppercase text-center">Quit Facebook</h1>
      </div>
      <h3 class="text-base mt-6 mb-12 text-black text-center">You can quit Facebook easier by using these crowd-sourced alternatives!</h3>
      <div class="flex flex-col content-center items-center">
        <a
          class="uppercase my-2 bg-white hover:bg-grey-lightest text-grey-darkest font-semibold py-4 px-6 border border-grey rounded shadow cursor-pointer"
          @click="copy"
          v-tooltip="{
            content: 'Copied to clipboard!',
            show: isJustCopied,
            trigger: 'manual'
          }"
        >
          <span>🔗 Share with a friend</span>
        </a>
        <a
          class="uppercase my-2 bg-white hover:bg-grey-lightest text-grey-darkest font-semibold py-4 px-6 border border-grey rounded shadow cursor-pointer"
          href="https://producthunt.com/quitfacebook"
          target="_blank"
        >
          <span>😻 We're is on Product Hunt</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="stylus">
.tooltip
  display block !important
  z-index 10000

  .tooltip-inner
    background #2779BD
    color white
    border-radius 16px
    padding 7px 12px 7px

  .tooltip-arrow
    width 0
    height 0
    border-style solid
    position absolute
    margin 5px
    border-color #2779BD
    z-index 1

  &[x-placement^="top"]
    margin-bottom 5px

    .tooltip-arrow
      border-width 5px 5px 0 5px
      border-left-color transparent !important
      border-right-color transparent !important
      border-bottom-color transparent !important
      bottom -5px
      left calc(50% - 5px)
      margin-top 0
      margin-bottom 0

  &[x-placement^="bottom"]
    margin-top 5px

    .tooltip-arrow
      border-width 0 5px 5px 5px
      border-left-color transparent !important
      border-right-color transparent !important
      border-top-color transparent !important
      top -5px
      left calc(50% - 5px)
      margin-top 0
      margin-bottom 0

  &[x-placement^="right"]
    margin-left 5px

    .tooltip-arrow
      border-width 5px 5px 5px 0
      border-left-color transparent !important
      border-top-color transparent !important
      border-bottom-color transparent !important
      left -5px
      top calc(50% - 5px)
      margin-left 0
      margin-right 0

  &[x-placement^="left"]
    margin-right 5px

    .tooltip-arrow
      border-width 5px 0 5px 5px
      border-top-color transparent !important
      border-right-color transparent !important
      border-bottom-color transparent !important
      right -5px
      top calc(50% - 5px)
      margin-left 0
      margin-right 0

  &.popover
    $color #f9f9f9

    .popover-inner
      background $color
      color black
      padding 24px
      border-radius 5px
      box-shadow 0 5px 30px rgba(black, .1)

    .popover-arrow
      border-color $color

  &[aria-hidden='true']
    visibility hidden
    opacity 0
    transition opacity .15s, visibility .15s

  &[aria-hidden='false']
    visibility visible
    opacity 1
    transition opacity .15s

</style>
