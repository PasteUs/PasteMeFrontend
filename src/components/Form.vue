<template>
    <b-row>
        <b-col md="1" lg="2"></b-col>
        <b-col md="10" lg="8">
            <b-form @submit.prevent="onSubmit">
                <b-row>
                    <b-col md="7" lg="5">
                        <b-form-group>
                            <b-input-group :prepend="$t('lang.form.input[0].prepend')">
                                <b-form-select v-model="form.lang">
                                    <option value="plain">{{ $t('lang.form.select.plain') }}</option>
                                    <option value="cpp">C/C++</option>
                                    <option value="java">Java</option>
                                    <option value="python">Python</option>
                                    <option value="bash">Bash</option>
                                    <option value="markdown">Markdown</option>
                                    <option value="json">JSON</option>
                                    <option value="go">Go</option>
                                </b-form-select>
                            </b-input-group>
                        </b-form-group>
                        <b-form-group>
                            <b-input-group :prepend="$t('lang.form.input[1].prepend')">
                                <b-form-input type="password" autocomplete="off" v-model="form.password"
                                              :placeholder="$t('lang.form.input[1].placeholder')"></b-form-input>
                                <b-input-group-append is-text>
                                    <b-form-checkbox switch class="mr-n2" :checked="form.password !== ''" disabled>
                                    </b-form-checkbox>
                                </b-input-group-append>
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="12">
                        <b-form-group>
                            <b-form-textarea v-model="form.content" rows="10"
                                             :placeholder="$t('lang.form.textarea.placeholder.' +
                                             ($store.state.read_once ? 'read_once' : 'write_something_here'))"
                                             required no-resize style="tab-size: 4;"></b-form-textarea>
                        </b-form-group>
                        <div class="form-inline"> <!-- 如果用 b-form-group 的话，会有 1.78 px 的偏移 -->
                            <b-button type="submit" :variant="$store.state.read_once ? 'dark' : 'primary'"
                                      style="margin-right: .65em">
                                {{ $t('lang.form.submit') }}
                            </b-button>
                            <b-form-checkbox
                                v-model="form.self_destruct" v-show="!$store.state.read_once" inline
                                :disabled="nobody" checked="checked" switch>
                                {{ $t('lang.form.checkbox') }}
                            </b-form-checkbox>
                            <div class="d-inline-flex">
                                <div v-show="form.self_destruct" class="form-inline">
                                    <b-input-group prepend="浏览" append="次">
                                        <b-form-input type="number" :min="boundary.count.min" :max="boundary.count.max"
                                                      v-model.number="form.expire_count"
                                                      :disabled="nobody"></b-form-input>
                                    </b-input-group>
                                    <a>&nbsp;or&nbsp;</a>
                                    <b-input-group append="分钟后">
                                        <b-form-input type="number" :min="boundary.minute.min"
                                                      :max="boundary.minute.max"
                                                      v-model.number="form.expire_minute"
                                                      :disabled="nobody"></b-form-input>
                                    </b-input-group>
                                </div>
                            </div>
                        </div>
                    </b-col>
                </b-row>
            </b-form>
        </b-col>
        <b-col md="1" lg="2"></b-col>
    </b-row>
</template>

<script>
import stateMixins from "../assets/js/mixins/stateMixin";

export default {
    name: "Form",
    mixins: [stateMixins],
    data() {
        return {
            boundary: {
                count: {
                    min: 1,
                    max: 3
                },
                minute: {
                    min: 1,
                    max: 60
                },
            },
            form: {
                lang: 'plain',
                content: '',
                password: '',
                self_destruct: true,
                expire_count: 1,
                expire_minute: 5
            },
        }
    },
    computed: {
        nobody: function () {
            return this.$store.state.namespace === 'nobody'
        }
    },
    methods: {
        onSubmit() {
            this.api.post(
                this.api.join(this.$store.getters.config.api.backend, 'paste/'),
                this.form
            ).then(response => {
                if (response.status === 201) {
                    this.updateView("success");
                    this.updateKey(response.key);
                } else {
                    alert(response.status + ': ' + response.message)
                }
            })
        }
    }
}
</script>

<style scoped>

</style>
