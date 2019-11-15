<template>
    <b-container :class="{ 'background_gray' : $store.state.read_once, 'background_blue' : $store.state.not_found }" fluid
                 id="app"
                 style="height: 100%;">
        <Header :hidden="$store.state.not_found"/>
        <transition mode="out-in" name="router-fade">
            <router-view id="fixed"/>
        </transition>
        <Footer :hidden="$store.state.not_found"/>
    </b-container>
</template>

<script lang="ts">
    import {Component} from "vue-property-decorator";
    import Header from "./components/Header.vue";
    import Footer from "./components/Footer.vue";
    import Vue from "vue";

    @Component({
        components: {
            Header,
            Footer
        }
    })
    export default class App extends Vue {
        $cookie: any;
        setI18n: any;

        mounted() {
            if (this.$cookie.get('pasteme_lang') === null) {
                this.$cookie.set('pasteme_lang', 'zh-CN', 7);
            }
            this.setI18n(this.$cookie.get('pasteme_lang'));
        }
    }
</script>

<style scoped>
    #fixed {
        padding-top: 4.5em;
    }

    .background_gray {
        background: #f0f0f0;
    }

    .background_blue {
        background: #0099CC;
    }

    .router-fade-enter-active, .router-fade-leave-active {
        transition: opacity .3s ease;
    }

    .router-fade-enter, .router-fade-leave-to {
        opacity: 0;
    }
</style>
