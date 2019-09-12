export default (Vue) => {
    Vue.directive('focus', {
        inserted: function (el) {
            el.focus()
        }
    });
}
