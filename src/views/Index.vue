<template>
    <transition name="component-fade" mode="out-in">
        <component :is="view" v-bind="$data"></component>
    </transition>
</template>

<script>
    import stateMixins from "../assets/js/mixins/stateMixin";
    import {mapGetters} from "vuex"
    export default {
        name: "Index",
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
                if (this.$route.params.key === "") {
                    this.updateView("home");
                } else {
                    this.updateView("loading");
                    this.api.get(this.$store.getters.config.api + this.$route.params.key, {
                        json: true
                    }).then(response => {
                        if (response.status === 200) {
                            this.updateView("paste_view");
                            this.updateContent(response.content);
                            this.updateLang(response.lang === "plain" ? "plaintext" : response.lang);
                        } else if (response.status === 401) {
                            this.updateView("password_auth");
                        } else if (response.status === 403) {
                            this.updateView("manual_deleted");
                        } else if (response.status === 404 && this.$route.params.key.search("[a-zA-Z]{1}") !== -1) {
                            this.$store.commit("updateMode", {
                                read_once: true,
                            });
                            this.updateView("home");
                        } else {
                            this.$router.push("What_are_you_nong_sha_lei?");
                        }
                    });
                }
            },
        },
        components: {
            "home": () => import(/* webpackChunkName: "home" */ "../components/Form"),
            "success": () => import(/* webpackChunkName: "success" */ "../components/Success"),
            "password_auth": () => import(/* webpackChunkName: "password_auth" */ "../components/PasswordAuth"),
            "paste_view": () => import(/* webpackChunkName: "paste_view" */ "../components/PasteView"),
            "loading": () => import(/* webpackChunkName: "loading" */ "../components/Loading"),
            "manual_deleted": () => import(/* webpackChunkName: "manual_deleted" */ "../components/ManualDeleted")
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
