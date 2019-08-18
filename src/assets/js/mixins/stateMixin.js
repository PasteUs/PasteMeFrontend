export default {
    methods: {
        _baseUpdate(object) {
            this.$store.commit("updateState", object);
        },
        updateView(view) {
            this._baseUpdate({ view });
        },
        updateContent(content) {
            this._baseUpdate({ content });
        },
        updateKey(key) {
            this._baseUpdate({ key });
        },
        updateLang(lang) {
            this._baseUpdate({ lang });
        }
    }
}
