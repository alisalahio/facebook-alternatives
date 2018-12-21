<script>
import Modal from '@/components/Modal.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AddProduct',

  components: { Modal },

  props: {
    categories: {
      type: Array,
      default: null
    }
  },

  data: () => ({
    errorMessages: '',
    title: null,
    url: null,
    categoryId: 'default',
    valid: true
  }),


  computed: {
    ...mapState('global', ['isAddProductVisible']),
    modal: {
      get: function() {
        return this.isAddProductVisible
      },
      set: function(newValue) {
        newValue === true ? this.showAddProduct() : this.hideAddProduct()
      }
    },
    form() {
      return {
        title: this.title,
        url: this.url,
        categoryId: this.categoryId
      }
    }

  },

  methods: {
    ...mapActions('global', ['showAddProduct', 'hideAddProduct']),
    ...mapActions('products', ['create']),
    isUrl(val) {
      var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
      return regexp.test(val)
    },
    validate() {
      if (this.url === '' || this.title === '' || this.categoryId === undefined || this.categoryId === 'default') {
        return false
      }
      return true
    },
    submit() {
      if (this.validate()) {
        console.log(this.categoryId)
        this.create({
          title: this.title,
          url: this.url,
          categoryId: this.categoryId
        })
        alert('Submitted successfully, thanks for contributing 🤩')
        this.hideAddProduct()
      }
    }

  }

}
</script>

<template>
  <modal
    v-show="modal"
    @close="hideAddProduct"
  >
    <div slot="body">
      <h2 class="text-center text-blue-dark font-bold uppercase mb-12">Add Product</h2>
      <form
        v-on:submit.prevent="submit"
        class="w-full"
      >
        <div class="flex flex-wrap -mx-3 mb-2">
          <div class="w-full px-3 mb-2 md:mb-0">
            <div class="relative">
              <select
                v-model="categoryId"
                class="block appearance-none w-full border border-grey text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-grey"
              >
                <option
                  value="default"
                  disabled
                >
                  Alternative for…
                </option>
                <option
                  v-show="categories.length > 0"
                  v-for="category in categories"
                  :key="category._id"
                  :value="category._id"
                >
                  {{ category.title }}
                </option>
              </select>
              <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-black">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-2">
          <div class="w-full px-3 mb-2 md:mb-0">
            <input
              v-model="title"
              class="appearance-none block w-full text-black border border-grey rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Name"
            >
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-2">
          <div class="w-full px-3 mb-2 md:mb-0">
            <input
              v-model="url"
              class="appearance-none block w-full text-black border border-grey rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="URL"
            >
          </div>
        </div>
        <div class="md:flex md:items-center mt-2">
          <button
            class="bg-blue-dark hover:bg-blue focus:shadow-outline focus:outline-none text-white font-bold py-4 px-4 rounded w-full"
            type="button"
            @click="submit"
          >
            Submit
          </button>
        </div>

      </form>
    </div>
    <div slot="footer">
      <a
        class="font-bold hover:underline cursor-pointer"
        @click="hideAddProduct"
      >
        Cancel
      </a>
    </div>
  </modal>
</template>

<style scoped>
</style>
