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
import TaskItem from './components/TaskItem.vue';

import Task from './models/Task';

import { definitionsFromContext } from './soukai/webpack-helpers';
import Soukai from './soukai/Soukai';
import LogEngine from './soukai/LogEngine';
import ADMPEngine from './soukai/ADMPEngine';

export default {
    components: {
        TaskItem,
    },
    props: {
        accessToken: {
            type: String,
            required: true,
        },
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
    created() {
        Soukai.useEngine(new LogEngine(new ADMPEngine(this.serverUrl, this.accessToken)));
        Soukai.loadModels(definitionsFromContext(require.context('./models', true, /\.js$/)));
        Task.all().then(tasks => {
            this.tasks = tasks;
        });
    },
    methods: {
        createTask() {
            // TODO loading
            Task.create({ name: this.newTask })
                .then(task => {
                    this.tasks.push(task);
                    this.newTask = '';
                });
            // TODO handle error
        },
        toggleTask(task) {
            // TODO loading
            task.update({
                completed_at: task.completed
                    ? { operation: 'unset' }
                    : Date.now(),
            });
            // TODO handle error
        },
    },
};
</script>
