<template>
  <div style="margin: 0 8px">
    <SvgIcon
      @click="onFullScreen"
      className="fullscreen"
      iconClass="fullscreen"
    ></SvgIcon>
  </div>
</template>

<script>
import SvgIcon from '@/src/components/SvgIcon/index.vue'
import screenfull from 'screenfull'
export default {
  name: 'FullScreen',
  data() {
    return {}
  },
  created() {},
  methods: {
    onFullScreen() {
      if (screenfull.isEnabled) {
        screenfull.toggle()
      }
    }
  },
  components: { SvgIcon }
}
</script>

<style scoped lang="scss">
.fullscreen {
  color: #fff;
  font-size: 20px;
}
</style>
