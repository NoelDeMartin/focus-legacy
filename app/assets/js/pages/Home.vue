<template>
    <div class="bg-background w-screen h-screen overflow-auto">

        <div class="p-8">
            <v-form @submit.prevent="createTask">
                <v-text-field v-model="newTask" />
            </v-form>

            <TaskItem
                v-for="task in tasks"
                :key="task.id"
                :task="task"
                @toggle="toggleTask(task)"
            />

            <p v-if="tasks.length == 0">
                No Tasks
            </p>

        </div>

    </div>
</template>

<script>
import gql from 'graphql-tag';

import TaskItem from '@/components/TaskItem.vue';

export default {
    apollo: {
        tasks: gql`{tasks:getTasks{id,name,author_id,created_at,updated_at,completed_at}}`,
        $error: function (e) {
            console.log(e);
        },
    },
    components: {
        TaskItem,
    },
    props: {
        serverUrl: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            tasks: [],
            newTask: '',
        };
    },
    methods: {
        createTask() {
            if (this.newTask.length > 0) {
                // TODO loading
                this.$apollo.mutate({
                    mutation: gql`mutation ($name: String!) {
                        createTask(name: $name) { id }
                    }`,
                    variables: {
                        name: this.newTask,
                    },
                })
                    .then(() => {
                        this.newTask = '';

                        // TODO use subscriptions instead
                        this.$apollo.queries.tasks.refetch();
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        toggleTask(task) {
            console.log(task);

            // TODO loading
            this.$apollo.mutate({
                mutation: gql`mutation ($id: ID!, $completed_at: Date) {
                    updateTask(id: $id, completed_at: $completed_at) { id }
                }`,
                variables: {
                    id: task.id,
                    completed_at: task.completed_at ? null : 'now',
                },
            }).then(() => {
                this.newTask = '';

                // TODO use subscriptions instead
                this.$apollo.queries.tasks.refetch();
            });
            // TODO handle error
        },
    },
};
</script>
