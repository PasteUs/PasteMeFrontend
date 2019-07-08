<template>
    <div class="row">
        <div class="col-md-12">
            <div class="footer">
                <p><a id="one-word" style="cursor: pointer;" @click="refresh">{{ oneWord }}</a></p>
                <p>
                    <a href='http://blog.lucien.ink' target='_blank'>Lucien's Blog</a>
                    <a v-for="footer in $store.state.config.footer" v-bind:key="footer.id">&nbsp;&nbsp;|&nbsp;&nbsp;<a :href="footer.url" target="_blank">{{ footer.text }}</a></a>
                </p>
                <p>
                    <a>&copy; 2018 - {{ year }} </a>
                    <a href='mailto:lucien@lucien.ink'>Lucien Shui</a>
                    <a> All rights reserved</a>
                </p>
            </div>
        </div>
        <b-tooltip target="one-word" placement="topright">{{ $t('lang.footer.tooltip') }}</b-tooltip>
    </div>
</template>

<script>
    export default {
        name: "Footer",
        data() {
            return {
                oneWord: 'Loading...',
                year: new Date().getFullYear(),
            }
        },
        mounted() {
            this.refresh();
        },
        methods: {
            async getOne() {
                let one = null;
                do {
                    await this.api.get('https://v1.hitokoto.cn', {
                        encode: 'text'
                    }).then(response => {
                        one = response;
                    });
                } while (one.replace(/[\u4e00-\u9fa5]/ig, '**').length > 100);
                return one;
            },
            refresh() {
                this.getOne().then(result => {
                    this.oneWord = result;
                });
            }
        }
    }
</script>

<style scoped>
    .footer {
        font-size: .8em;
        text-align: center;
        margin-top: .8em;
    }

    .footer a:link, .footer a:visited {
        color: #38488f;
    }
    #one-word {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
</style>
