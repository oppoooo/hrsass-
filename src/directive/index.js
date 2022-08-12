export const imgError = {
  // 被绑定的元素到Dom中

  // 绑定的元素插入到dom，图片数据还没请求回来
  inserted: function (el, { value }) {
    if (!el.src) {
      el.src = value
    } else {
      el.onerror = function () {
        el.src = value
      }
    }
  },
  // 指令所绑定的元素更新时触发
  update(el, { value }) {
    if (!el.src) {
      el.src = value
    }
  },
}
export const aa = {
  inserted() {},
}
