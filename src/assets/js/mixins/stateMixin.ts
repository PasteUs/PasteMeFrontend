import {Component} from "vue-property-decorator";
import Vue from "vue";
@Component
export default class StateMixins extends Vue{
    api: any;
    _baseUpdate(object: any) {
        this.$store.commit("updateState", object);
    }
    updateView(view: any) {
        this._baseUpdate({ view });
    }
    updateContent(content: any) {
        this._baseUpdate({ content });
    }
    updateKey(key: any) {
        this._baseUpdate({ key });
    }
    updateLang(lang: any) {
        this._baseUpdate({ lang });
    }
}
