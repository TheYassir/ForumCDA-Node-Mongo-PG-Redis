<template>
    <div class="container">
        <div class="ibox-content forum-container">
            <ThreadHeading />
            <div class="forum-title">
                <div class="pull-right forum-desc">
                    <small>Total replies: 320,800</small>
                </div>
                <h3>{{ title }}</h3>
            </div>
            <div class="forum-item">
                <p>{{ description }}</p>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-lg-9 mb-3">
                        <Thread
                            v-for="thread in threads"
                            :key="thread.id"
                            :thread="thread"
                        />
                    </div>

                    <Sidebar />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ThreadHeading from '@/components/ThreadHeading.vue';
import Thread from '@/components/Thread.vue';
import Sidebar from '@/components/Sidebar.vue';
import config from '@/mixins/config';
import { useRoute } from 'vue-router';

export default {
    mixins: [config],
    components: { ThreadHeading, Thread, Sidebar },
    data() {
        return {
            channel: {},
            threads: [],
            description: '',
            title: '',
        };
    },

    methods: {
        async getThreads() {
            try {
                const route = useRoute();
                // Faire des headers avec className
                const res = await fetch(
                    `${this.mongoUrl}/channel/${route.params.id}/threads`,
                    {
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                    }
                );

                const ret = await res.json();
                console.log(ret);
                return ret;
            } catch (error) {
                console.error(error);
            }
        },
    },
    mounted() {
        this.getThreads().then(channel => {
            this.title = channel.name;

            channel.threads.sort((a, b) => b.id - a.id);

            this.threads = channel.threads;
            this.description = channel.description;
        });
    },
};
</script>
