<template>
    <div class="row">
        <div class="col-md-12">
            <div class="footer">
                <p><a id="one-word" @click="refresh">{{ oneWord }}</a></p>
                <b-popover
                        target="one-word"
                        triggers="hover"
                        placement="top">
                    <a id="one-popover">{{ 0 >= cut_down_time ? $t('lang.footer.tooltip.refresh') :
                        $t('lang.footer.tooltip.wait', { sec: cut_down_time }) }}</a>
                </b-popover>
                <p>
                    <a href='http://blog.lucien.ink' target='_blank'>Lucien's Blog</a>
                    <a v-for="footer in $store.state.config.footer"
                       v-bind:key="footer.id">&nbsp;&nbsp;|&nbsp;&nbsp;<a
                            :href="footer.url" target="_blank">{{ footer.text }}</a></a>
                </p>
                <p>
                    <a>Copyright&nbsp;&copy;&nbsp;2018&nbsp;-&nbsp;{{ year }}&nbsp;</a>
                    <a href='mailto:lucien@lucien.ink'>Lucien&nbsp;Shui</a>
                </p>
                <p title="赞助商">
                    <a href="https://promotion.aliyun.com/ntms/yunparter/invite.html?userCode=30tfqka6"
                       title="阿里云限量红包，上云就上阿里云，享数字化转型，市场占有率超过第 2-5 名总和" class="logo" target="_blank">
                        <img src="https://cdn.jsdelivr.net/gh/PasteUs/CDN@0.0.11/pasteme/img/aliyun.svg" alt="Aliyun">
                    </a>
                    <a href="https://www.bt.cn/?invite_code=MV9ibGZqbWs="
                       title="宝塔服务器面板，一键全能部署及管理，送你3188元礼包，点我领取" target="_blank" class="logo">
                        <img src="https://www.bt.cn/Public/images/bt_logo.png" alt="BT">
                    </a>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Footer",
        data() {
            return {
                oneWord: 'Loading...',
                year: new Date().getFullYear(),
                cut_down_time: 0,
            }
        },
        mounted() {
            this.getOne().then(result => {
                this.oneWord = result;
            })
        },
        methods: {
            getOne() {
                return this.api.get('https://v1.hitokoto.cn', {
                    encode: 'text'
                }, [], false);
            },
            refresh() {
                if (this.cut_down_time === 0) {
                    this.cut_down_time = -1;
                    this.oneWord = 'Loading...';
                    this.getOne().then(result => {
                        this.oneWord = result;
                        this.cut_down_time = 5;
                        let clock = window.setInterval(() => {
                            --this.cut_down_time;
                            if (this.cut_down_time === 0) {
                                window.clearInterval(clock);
                            }
                        }, 1000);
                    });
                }
            },
            makeToast(title, message, append = false) {
                this.$bvToast.toast(message, {
                    title: title,
                    autoHideDelay: 500,
                    appendToast: append
                })
            }
        }
    }
</script>

<style scoped>
    .footer {
        font-size: .8em;
        text-align: center;
    }

    .footer p {
        margin: 1em;
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
        cursor: pointer;
    }

    #one-popover {
        font-family: Menlo, Monaco, "Andale Mono", "lucida console", "Courier New", monospace;
    }

    .logo img {
        height: 2em;
    }
    .logo svg {
        height: 2em;
    }
    .logo {
        margin: .5em;
    }
</style>
