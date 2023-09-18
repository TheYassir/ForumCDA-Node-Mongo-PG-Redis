<template>
    <div class="container">
        <div class="ibox-content forum-container">
            <CreateChannel />

            <div class="forum-title">
                <div class="pull-right forum-desc">
                    <small>Total posts: 320,800</small>
                </div>
                <h3>General subjects / Sticky Welcome Channel</h3>
            </div>

            <div class="forum-item active">
                <div class="row">
                    <div class="col-md-9">
                        <div class="forum-icon">
                            <i class="fas fa-shield"></i>
                        </div>
                        <RouterLink to="/discussions" class="forum-item-title">
                            General Discussion
                        </RouterLink>
                        <div class="forum-sub-title">
                            Talk about sports, entertainment, music, movies,
                            your favorite color, talk about anything.
                        </div>
                    </div>
                    <div class="col-md-1 forum-info">
                        <span class="views-number">1216</span>
                        <div>
                            <small>Views</small>
                        </div>
                    </div>
                    <div class="col-md-1 forum-info">
                        <span class="views-number">368</span>
                        <div>
                            <small>Topics</small>
                        </div>
                    </div>
                    <div class="col-md-1 forum-info">
                        <span class="views-number">140</span>
                        <div>
                            <small>Posts</small>
                        </div>
                    </div>
                </div>
            </div>

            <div class="forum-title">
                <div class="pull-right forum-desc">
                    <small>Total posts: 17,800,600</small>
                </div>
                <h3>Other subjects</h3>
            </div>

            <div
                v-for="channel in channels"
                key="channel.id"
                class="forum-item"
            >
                <div class="row">
                    <div class="col-md-9">
                        <div class="forum-icon">
                            <i class="fal fa-clock-o"></i>
                        </div>
                        <RouterLink
                            :to="`/channel/${channel.id}`"
                            class="forum-item-title"
                            >{{ channel.name }}</RouterLink
                        >
                        <div class="forum-sub-title">
                            {{ channel.description }}
                        </div>
                    </div>
                    <div class="col-md-1 forum-info">
                        <span class="views-number"> 1516 </span>
                        <div>
                            <small>Views</small>
                        </div>
                    </div>
                    <div class="col-md-1 forum-info">
                        <span class="views-number"> 238 </span>
                        <div>
                            <small>Topics</small>
                        </div>
                    </div>
                    <div class="col-md-1 forum-info">
                        <span class="views-number"> 180 </span>
                        <div>
                            <small>Posts</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CreateChannel from './CreateChannel.vue';
import config from '@/mixins/config/index.js';

export default {
    mixins: [config],
    components: { CreateChannel },
    name: 'Home',
    data() {
        return {
            listening: false,
            channels: [],
        };
    },
    methods: {
        async getNotified() {
            // ! On va chercher les Server Sent Events
            // ? Mettre ça dans un context
            let events;
            if (!this.listening) {
                events = new EventSource(`${this.pgUrl}/events`);
                events.onmessage = event => {
                    const parsedData = JSON.parse(event.data);

                    // ! Ici on reçoit un thread quand il vient d'être créé, au choix, on l'affiche ou on fait des notifications.
                    console.log(parsedData);
                };
                this.listening = true;
            }
        },

        async getChannels() {
            try {
                const response = await fetch(`${this.mongoUrl}/channels`);

                if (response.ok) {
                    const channels = await response.json();
                    this.channels = channels;
                }
            } catch (error) {
                console.error(error.message);
                console.error(error.stack);
            }
        },
    },

    mounted() {
        this.getChannels()
            .then(() => this.getNotified())
            .catch(console.log);
    },
};
</script>
