<template>
    <h1>Logs</h1>
    <button @click="getLogs">Get Logs</button>
</template>

<script>
import config from '@/mixins/config.js';

export default {
    mixins: [config],
    name: 'Logs',

    methods: {
        async getLogs() {
            try {
                const response = await fetch(this.logsUrl, {
                    headers: this.headers,
                });

                if (response.ok) {
                    console.log(response);
                }
                const res = await fetch(`${this.logsUrl}/stats`, {
                    'Content-Type': 'text/plain',
                });

                const text = await res.text();

                console.log(text);
            } catch (e) {
                console.log(e);
            }
        },
    },
};
</script>
