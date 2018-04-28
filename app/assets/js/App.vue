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
import ADMP from './lib/ADMP';

import TaskItem from './components/TaskItem.vue';

import Task from './models/Task';
import Soukai from './models/Soukai';
import LogEngine from './models/LogEngine';
import InMemoryEngine from './models/InMemoryEngine';

export default {
    components: {
        TaskItem,
    },
    props: {
        accessToken: {
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
        Soukai.use(new LogEngine(new InMemoryEngine()));
        ADMP.init(this.accessToken);
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
