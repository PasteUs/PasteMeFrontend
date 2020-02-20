<template>
    <b-row>
        <b-col md="4"></b-col>
        <b-col md="4">
            <b-form @submit.prevent="onSubmit">
                <b-form-group :label="$t('lang.auth.form.label')">
                    <b-form-input
                    type="password"
                    v-model="form.password"
                    v-focus
                    :placeholder="flag ? '' : this.$t('lang.auth.form.placeholder')">
                </b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary">{{ $t('lang.auth.form.button') }}</b-button>
            </b-form>
        </b-col>
    </b-row>
</template>

<script>
    import stateMixin from "../assets/js/mixins/stateMixin";
    export default {
        name: "PasswordAuth",
        mixins: [stateMixin],
        data() {
            return {
                flag: true,
                form: {
                    password: null,
                }
            }
        },
        methods: {
            onSubmit() {
                const sendUrl = `${this.$store.getters.config.backendApi}${this.$route.params.key},${this.form.password}`;
                this.api.get(sendUrl, {
                    json: 'true'
                }).then(({status, content, lang}) => {
                    if (status === 200) {
                        this.updateContent(content);
                        this.updateLang(lang === "plain" ? "plaintext" : lang);
                        this.updateView("paste_view");
                    } else {
                        this.flag = false;
                        this.form.password = null;
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>
