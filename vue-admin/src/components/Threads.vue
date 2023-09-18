<template>
    <section class="mt-5 mb-5">
        <div class="row">
            <h1 class="text-primary">
                <i class="fas fa-user" /> Les stats sur les channels
            </h1>

            <div class="alert alert-danger" v-if="errors && errors.message">
                <p class="text-danger">{errors.message}</p>
            </div>

            <p>CHARTS</p>
            <div class="grid">
                <article class="chart">
                    <Line
                        id="3"
                        height="300"
                        :chart-data="chartDataDaily"
                        :chart-options="options"
                    />
                </article>
                <article class="chart">
                    <Line
                        id="4"
                        height="300"
                        :chart-data="chartDataMonthly"
                        :chart-options="options"
                    />
                </article>
            </div>
        </div>
    </section>
</template>

<script>
import { Line } from 'vue-chartjs';
import config from '@/mixins/config.js';

import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
} from 'chart.js';

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale
);

export default {
    mixins: [config],
    name: 'Channels',
    components: { Line },
    data() {
        return {
            errors: [],
            options: {
                maintainAspectRatio: false,
                animation: true,
                responsive: true,
            },
            chartDataDaily: {
                labels: [],
                datasets: [
                    {
                        data: [],
                        label: 'Threads Created',
                        backgroundColor: 'blue',
                    },
                ],
            },
            chartDataMonthly: {
                labels: [],
                datasets: [
                    {
                        data: [],
                        label: 'Threads Created',
                        backgroundColor: 'red',
                    },
                ],
            },
        };
    },
    beforeMount() {
        this.getThreads()
            .then(() => {
                this.chartDataDaily.labels =
                    this.threads.threadsDailyArchives.map(thread => thread._id);

                this.chartDataDaily.datasets[0].data =
                    this.threads.threadsDailyArchives.map(
                        thread => thread.number
                    );

                this.chartDataMonthly.labels =
                    this.threads.threadsMonthlyArchives.map(
                        thread => thread._id
                    );

                this.chartDataMonthly.datasets[0].data =
                    this.threads.threadsMonthlyArchives.map(
                        thread => thread.number
                    );
            })
            .catch(console.log);
    },
    mounted() {
        if (this.channels && this.channels.message) {
            this.errors = this.channels;
        }
    },
};
</script>
