<template>
    <transition name="component-fade" mode="out-in">
        <component :is="view" v-bind="$data"></component>
    </transition>
</template>

<script>
import stateMixins from "../assets/js/mixins/stateMixin";
import {mapGetters} from "vuex"
import PasswordAuth from "../components/PasswordAuth"
import PasteView from "../components/PasteView";
import Loading from "../components/Loading";
import ManualDeleted from "../components/ManualDeleted";

export default {
    name: "View",
    mixins: [stateMixins],
    data() {
        return {}
    },
    computed: {
        ...mapGetters([
            "view",
            "lang",
            "content",
            "config"
        ])
    },
    watch: {
        "$route.params.key": function () {
            this.init();
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.$store.commit("init");

            this.updateView("loading");
            let url = this.api.join(this.config.api.backend, 'paste', this.$route.params.key)
            this.api.get(url).then(response => {
                if (response.status === 200) {
                    this.updateView("paste_view");
                    this.updateContent(response.content);
                    this.updateLang(response.lang === "plain" ? "plaintext" : response.lang);
                } else if (response.status === 403) {
                    this.updateView("password_auth");
                } else {
                    this.$router.push("What_are_you_nong_sha_lei?");
                }
            });
        },
    },
    components: {
        "password_auth": PasswordAuth,
        "paste_view": PasteView,
        "loading": Loading,
        "manual_deleted": ManualDeleted
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
