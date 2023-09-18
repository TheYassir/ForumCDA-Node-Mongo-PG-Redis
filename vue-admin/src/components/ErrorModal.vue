<template>
    <div
        class="error-modal alert alert-danger"
        v-if="error.hasOwnProperty('type')"
    >
        <h1>{{ error.type }}</h1>
        <p>{{ error.errors.error }}</p>
    </div>
</template>

<script>
import config from '@/mixins/config.js';

export default {
    mixins: [config],
    name: 'ErrorModal',

    data() {
        return {
            listening: false,
            error: {},
        };
    },
    methods: {
        getNotified() {
            let events;
            if (!this.listening) {
                events = new EventSource(`${this.pgUrl}/errors`);

                events.onmessage = event => {
                    const parsedData = JSON.parse(event.data);

                    this.error = parsedData;
                };

                this.listening = true;
            }
        },
    },
    mounted() {
        this.getNotified();
    },
};
</script>
