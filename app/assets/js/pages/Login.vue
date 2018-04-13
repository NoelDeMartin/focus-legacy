<template>
    <div class="flex items-center justify-center w-screen h-screen">
        <v-form
            ref="form"
            v-model="valid"
            method="POST"
            class="bg-white p-4 rounded w-screen-90 max-w-xl border border-gray"
            lazy-validation
        >
            <CSRFField />
            <v-text-field
                v-model="url"
                :rules="urlRules"
                name="url"
                label="Url"
                required
            />
            <v-btn
                color="primary"
                @click="submit"
            >
                Authenticate
            </v-btn>
        </v-form>
    </div>
</template>

<script>
import CSRFField from '../components/CSRFField.vue';

export default {
    components: {
        CSRFField,
    },
    data() {
        return {
            valid: true,
            url: '',
            urlRules: [
                v => !!v || 'Url is required',
            ],
        };
    },
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                this.$refs.form.$el.submit();
            }
        },
    },
};
</script>
