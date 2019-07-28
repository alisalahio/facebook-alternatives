<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Modal',

  data: () => ({
    isModal: false
  })
}
</script>

<template>
  <transition name="modal">
    <div
      v-show="isModal"
      class="modal-mask"
    >
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-body">
            <slot name="body" />
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <a
                class="modal-default-button"
                @click="$emit('close')"
              >
                Close
              </a>
            </slot>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="stylus" scoped>

.modal-mask
  position fixed
  z-index 9998
  top 0
  left 0
  width 100%
  height 100%
  background-color rgba(0, 0, 0, .5)
  display table
  transition opacity .2s ease

.modal-wrapper
  display table-cell
  vertical-align middle

.modal-container
  width 400px
  max-width 90vw
  margin 0px auto
  padding 20px 30px
  background-color #fff
  border-radius 2px
  box-shadow 0 2px 8px rgba(0, 0, 0, .33)
  transition all .2s ease

.modal-body
  margin 20px 0

.modal-footer
  margin-top 60px
  display flex
  align-items center
  justify-content center

.modal-enter
  opacity 0

.modal-leave-active
  opacity 0

.modal-enter .modal-container,
.modal-leave-active .modal-container
  -webkit-transform scale(.9)
  transform scale(.9)

</style>
