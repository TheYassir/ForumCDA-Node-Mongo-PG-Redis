const headers = new Headers();
headers.set('Content-Type', 'application/json');
headers.set('Accept', 'application/json');

export default {
    data() {
        return {
            headers,
            // server_url: 'http://localhost:9000',
            // pgUrl: 'http://localhost:5000/api',
            // logsUrl: 'http://localhost:9050',
            channels: [],
            threads: [],
            // Sur les VM cloud

            server_url: 'http://kenshirosan-server.eddi.cloud:9000',
            pgUrl: 'http://kenshirosan-server.eddi.cloud:5000/api',
            logsUrl: 'http://kenshirosan-server.eddi.cloud:9050',
        };
    },
    methods: {
        async getChannels() {
            try {
                const response = await fetch(
                    `${this.server_url}/channels/archives`,
                    { headers: this.headers }
                );

                const channels = await response.json();

                this.channels = channels;
            } catch (e) {
                console.error(e.message);
            }
        },
        async getThreads() {
            try {
                const response = await fetch(`${this.server_url}/threads`, {
                    headers: this.headers,
                });

                const threads = await response.json();

                this.threads = threads;
            } catch (e) {
                console.error(e.message);
            }
        },
    },
};
