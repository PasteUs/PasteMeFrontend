<template>
    <b-row class="not-found-body">
        <b-col md="2"></b-col>
        <b-col md="8">
            <p class="not_found_face">:(</p>
            <p class="not_found_content">{{ $t('lang.not_found.content.title') }}</p>
            <p><b-button @click="$router.push('/')" variant="light">{{ $t('lang.not_found.content.go_home') }}</b-button></p>
            <p class="not_found_footer">{{ $t('lang.not_found.footer.text') }}</p>
            <p class="not_found_footer">{{ $t('lang.not_found.footer.beg.left') }}&nbsp;<github-button
                    href="https://github.com/LucienShui/PasteMe"
                    data-show-count="true"
                    style="position: relative; bottom: -.25em"
            >Star</github-button>&nbsp;{{ $t('lang.not_found.footer.beg.right') }}</p>
        </b-col>
        <b-col md="2"></b-col>
    </b-row>
</template>

<script>
    import GithubButton from 'vue-github-button'
    export default {
        name: "NotFound",
        components: {
            GithubButton
        },
        mounted() {
            this.$store.commit('updateNotFound', {
                not_found: true
            });
        }
    }
</script>

<style scoped>
    .not_found_content {
        line-height: 1em;
        font-size: 1.5em;
    }

    .not_found_footer {
        line-height: 1em;
        font-size: 1em;
    }

    .not_found_face {
        font-size: 7em;
    }

    .not-found-body {
        color: #FFFFFF;
    }
</style>
