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
            const sendUrl = this.api.join(this.$store.getters.config.api.backend, 'paste', this.$route.params.key);
            this.api.get(sendUrl, this.form, false).then(({content, lang}) => {
                this.updateContent(content);
                this.updateLang(lang === "plain" ? "plaintext" : lang);
                this.updateView("paste_view");
            }).catch(error => {
                if (error.response) {
                    let data = error.response.data;
                    if (data.code === 40301) {
                        this.flag = false;
                        this.form.password = null;
                        return
                    } else if (data.code === 40402) {
                        this.$router.push("What_are_you_nong_sha_lei?");
                        return
                    }
                }
                this.api.errorHandler(error);
            });
        }
    }
}
</script>

<style scoped>

</style>
