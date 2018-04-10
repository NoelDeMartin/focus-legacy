<template>
    <v-form
        ref="form"
        v-model="valid"
        method="POST"
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
        <v-btn @click="submit">Submit</v-btn>
    </v-form>
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
