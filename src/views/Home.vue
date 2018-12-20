<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import AddProduct from '@/components/AddProduct'

export default {
  name: 'home',

  components: {
    AddProduct
  },

  data: () => ({
    isJustCopied: false
  }),

  computed: {
    ...mapGetters('categories', { getCategories: 'find' }),
    categories() {
      return this.getCategories({
        query: {
          $limit: 99
        }
      }).data
    }
  },

  created() {
    this.findCategories({
      query: {
        $limit: 99
      }
    })
  },

  methods: {
    ...mapActions('categories', { findCategories: 'find' }),
    ...mapActions('global', ['showAddProduct', 'hideAddProduct']),
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
  <div class="home my-6 container mx-auto">
    <add-product
      :categories="categories"
    />
    <div class="flex flex-col">
      <div class="flex select-none sm:flex-col md:flex-row">
        <img
          class="sm:w-24 sm:w-24 md:w-32 md:h-32 mr-2"
          alt="Quit Facebook Logo"
          src="../assets/logo.png"
        >
        <h1 class="text-5xl text-blue-dark font-black uppercase">Quit <br /> Facebook</h1>
      </div>
      <h3 class="text-lg mt-6 mx-1 text-black">You can quit Facebook easier by using these crowd-sourced alternatives!</h3>
      <div class="my-8 flex sm:flex-col md:flex-row lg:flex-row ">
        <a
          class="mx-1 my-1 uppercase bg-white hover:bg-grey-lightest text-grey-darkest font-semibold py-3 px-4 border border-grey rounded shadow cursor-pointer"
          @click="copy"
          v-tooltip.bottom="{
            content: 'Copied to clipboard!',
            show: isJustCopied,
            trigger: 'manual'
          }"
        >
          <span>🔗 Share this</span>
        </a>
        <a
          class="mx-1 my-1 uppercase bg-white hover:bg-grey-lightest text-grey-darkest font-semibold py-3 px-4 border border-grey rounded shadow cursor-pointer"
          @click="showAddProduct"
        >
          <span>🤩 Add alternative</span>
        </a>
        <!-- <a
          class="mx-2 my-1 uppercase bg-white hover:bg-grey-lightest text-grey-darkest font-semibold py-3 px-4 border border-grey rounded shadow cursor-pointer"
          href="https://producthunt.com/quitfacebook"
          target="_blank"
        >
          <span>😻 Product Hunted</span>
        </a> -->
      </div>
    </div>
    <div
      v-show="categories.length > 0"
      v-for="category in categories"
      :key="category._id"
      class="flex mb-4 sm:flex-col lg:flex-row"
    >
      <div class="sm:w-full md:w-full lg:w-1/4 bg-green h-12 flex flex-col justify-center content-center pin-t sticky rounded-lg">
        <h4 class="align-middle my-auto text-xl pl-2 text-white">{{ category.title }}</h4>
      </div>
      <div class="sm:w-full md:w-full lg:w-3/4 lg:ml-6">
        <a
          href="https://spotify.com"
          target="_blank"
          class="mb-4 py-4 rounded content-center items-center flex text-lg align-middle hover:underline pl-2 text-blue-darker bg-grey-lightest hover:bg-grey-lighter"
        >
          <img class="w-8 h-8" src="//logo.clearbit.com/spotify.com?size=32">
          <span class="pl-2">Spotify</span>
        </a>
        <a
          href="https://spotify.com"
          target="_blank"
          class="py-4 rounded content-center items-center flex text-lg align-middle my-auto hover:underline pl-2 text-blue-darker bg-grey-lightest hover:bg-grey-lighter"
        >
          <img class="w-8 h-8" src="//logo.clearbit.com/spotify.com?size=32">
          <span class="pl-2">Spotify</span>
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
