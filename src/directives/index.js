import store from '@/store'
export const imgError = {
  inserted: function (el, { value }) {
    if (!el.src) {
      el.src = value
    } else {
      el.onerror = function () {
        el.src = value
      }
    }
  },
  update(el, { value }) {
    if (!el.src) {
      el.src = value
    }
  }
}

export const isHas = {
  // bind 指令和dom绑定
  inserted(el, binding) {
    const has = store.state.permission.points.includes(binding.value)
    if (!has) {
      el.remove()
    }
  }
}
