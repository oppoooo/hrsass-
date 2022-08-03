export const imgError = {
  // 被绑定的元素到Dom中

  inserted: function (el, { value }) {
    el.onerror = function () {
      el.src = value
    }
  },
}
export const aa = {
  inserted() {},
}
