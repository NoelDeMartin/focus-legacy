<template>
    <input
        :name="name"
        :value="value"
        type="hidden"
    >
</template>

<script>
export default {
    data() {
        return {
            name: '',
            value: '',
        };
    },
    mounted() {
        const param = document.querySelector('meta[name="csrf-param"]');
        const token = document.querySelector('meta[name="csrf-token"]');

        if (param && token) {
            this.name = param.getAttribute('content');
            this.value = token.getAttribute('content');
        }
    },
};
</script>
