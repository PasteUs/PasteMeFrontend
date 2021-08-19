<template>
    <transition name="component-fade" mode="out-in">
        <component :is="view" v-bind="$data"></component>
    </transition>
</template>

<script>
import stateMixins from "../assets/js/mixins/stateMixin";
import {mapGetters} from "vuex"
import Form from "../components/Form"
import Success from "../components/Success"

export default {
    name: "Home",
    mixins: [stateMixins],
    data() {
        return {}
    },
    computed: {
        ...mapGetters([
            "view",
            "lang",
            "content"
        ])
    },
    mounted() {
        this.$store.commit("init");
        this.updateView("home");
    },
    components: {
        "home": Form,
        "success": Success,
    }
}
</script>

<style scoped>
.component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .6s ease;
}

.component-fade-enter, .component-fade-leave-to {
    opacity: 0;
}
</style>
