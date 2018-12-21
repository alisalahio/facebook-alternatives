<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import AddProduct from '@/components/AddProduct'
import axios from 'axios'

export default {
  name: 'home',

  components: {
    AddProduct
  },

  data: () => ({
    isJustCopied: false,
    ip: null
  }),

  computed: {
    ...mapGetters('categories', { getCategories: 'find' }),
    ...mapGetters('products', { getProducts: 'find' }),
    ...mapState('upvotes', ['upvotes']),
    categories() {
      return this.getCategories({
        query: {
          $limit: 99,
          $sort: { order: 1 }
        }
      }).data
    }
  },

  mounted() {
    this.findCategories({
      query: {
        $limit: 99
      }
    })
  },

  methods: {
    ...mapActions('categories', { findCategories: 'find' }),
    ...mapActions('products', { findProducts: 'find' }),
    ...mapActions('votes', { createVote: 'create' }),
    ...mapActions('global', ['showAddProduct', 'hideAddProduct']),
    ...mapActions('upvotes', ['addUpvote']),
    copy() {
      this.$copyText('https://deletefacebook.wiki/').then(function (e) {
        console.log(e)
      })
      this.activateJustCopied()
    },
    activateJustCopied() {
      this.isJustCopied = true
      setTimeout(() => {
        this.isJustCopied = false
      }, 2500)
    },
    async getIP() {
      var response = await axios.get('https://api.ipify.org/?format=json')
      return response.data.ip
    },
    async upvote(productId) {
      this.ip = await this.getIP()
      this.createVote({
        productId: productId,
        ip: this.ip
      })
      this.addUpvote(productId)
    },
    isUpvoted(productId) {
      return this.upvotes.includes(productId)
    }
  }
}
</script>

<template>
  <div class="home my-6 container mx-auto">
    <a
      href="https://twitter.com/alollou"
      target="_blank"
      class="border-t border-l border-left border-grey rounded pin-b pin-r fixed flex items-center p-2 bg-white z-50"
    >
      <span class="text-blue-dark px-2">by </span>
      <img class="w-6 h-6 rounded-full" src="https://pbs.twimg.com/profile_images/1073368061183516672/tcWzTTZw_400x400.jpg">
      <span class="text-blue-dark px-2">@alollou</span>
    </a>
    <add-product
      :categories="categories"
    />
    <div class="flex flex-col" >
      <div class="flex justify-start items-start lg:flex-1">
        <div class="flex select-none flex-col lg:flex-row flex-1">
          <img
            class="w-24 h-24 mr-2 -ml-4"
            alt="DELETE Facebook Logo"
            src="../assets/logo.png"
          >
          <h1 class="text-3xl lg:text-2xl text-blue-dark font-black uppercase">Delete <br /> Facebook <br /> Wiki</h1>
        </div>
      </div>
      <h3 class="text-lg mt-8 mb-10  mx-1 font-normal text-grey-darkest leading-normal">
        <a target="_blank"
          class="text-blue-dark font-bold hover:underline cursor-pointer"
          href="https://twitter.com/hashtag/deletefacebook"
        >
          #DeleteFacebook
        </a>
        is now easier by using these products instead! <br />Feel free
        <a
          class="text-blue-dark font-bold hover:underline cursor-pointer"
          @click="copy"
          v-tooltip.bottom="{
            content: 'Copied to clipboard!',
            show: isJustCopied,
            trigger: 'manual'
          }"
        >Share it with a friend 🔗</a>
        or
        <a
          class="text-blue-dark font-bold hover:underline cursor-pointer"
          @click="showAddProduct"
        >Add an alternative 🤩</a> <br /> Also,
        <a
          class="text-blue-dark font-bold hover:underline cursor-pointer"
          href="https://www.producthunt.com/posts/delete-facebook-wiki"
        >we're on Product Hunt 😻</a>
      </h3>
    </div>
    <div
      v-show="categories.length > 0"
      v-for="category in categories"
      :key="category._id"
      class="flex mb-4 sm:flex-col lg:flex-row"
    >
      <div class="sm:w-full lg:w-1/3 bg-grey-darker h-12 flex flex-col justify-center content-center pin-t sticky rounded-lg">
        <h4 class="align-middle my-auto text-xl pl-4 text-white">{{ category.title }}</h4>
      </div>
      <div class="sm:w-full lg:w-2/3 lg:ml-6 sm:mt-4 md:mt-0 mb-2">
        <a
          v-show="category.products.data.length > 0"
          v-for="product of category.products.data"
          :key="product._id"
          :href="product.url"
          target="_blank"
          class="mb-1 py-2 rounded content-center items-center flex text-lg align-middle pl-2 text-blue-darker hover:bg-grey-lighter"
        >
          <img class="w-8 h-8" :src="`${product.imageUrl}`">
          <span class="pl-2 hover:underline flex-1">{{ product.title }}</span>
          <span
            v-show="product.votes"
            class="text-sm text-black pr-2"
          >
            {{ product.votes }} pts
          </span>
          <button
            @click.prevent="upvote(product._id)"
            class="mr-2 rounded-full text-white font-bold py-2 px-3 border-b-4 no-underline"
            :class="{
              'bg-green-dark border-green-darker cursor-not-allowed': isUpvoted(product._id),
              'bg-grey-lighter border-grey-light hover:bg-green-light hover:border-green': isUpvoted(product._id) === false
            }"
            :disabled="isUpvoted(product._id)"
          >
            👍
          </button>
        </a>
      </div>
    </div>
    <footer class="flex flex-col mt-12 sm:mb-20 lg:mb-12">
      <a
        class="text-grey-darker no-underline hover:underline text-sm"
        href="http://iplegalcorner.com/fair-use-of-trademark-for-comment-and-criticism/"
      >
        This site is non-commercial and not affiliated with any companies/products listed.
      </a>
      <a
        class="text-grey-darker no-underline hover:underline mt-4 text-sm"
        href="http://iplegalcorner.com/fair-use-of-trademark-for-comment-and-criticism/"
      >
        Alternatives are crowd-sourced and voted-on by site visitors.
      </a>
    </footer>
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
