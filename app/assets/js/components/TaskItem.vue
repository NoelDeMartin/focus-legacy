<template>
    <div class="task-item bg-gray p-2 border border-b-0 border-grey flex items-center">
        <v-checkbox
            :input-value="task.completed_at"
            :hide-details="true"
            class="flex-no-grow"
            @click="$emit('toggle')"
        />
        <label class="text-lg ml-2">{{ task.name }}</label>
    </div>
</template>

<script>
export default {
    props: {
        task: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style lang="scss">
    .task-item:last-child {
        border-bottom-width: config('borderWidths.default') !important;
    }
</style>
