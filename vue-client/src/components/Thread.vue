<template>
    <div
        class="card row-hover pos-relative py-3 px-3 mb-3 border-warning border-top-0 border-right-0 border-bottom-0 rounded-0"
    >
        <div class="row align-items-center">
            <div class="col-md-8 mb-3 mb-sm-0">
                <h5>
                    <a href="!#" class="text-primary"> {{ thread.title }} </a>
                </h5>
                <p class="text-sm">
                    <span class="op-6">Posté il y a </span>
                    <a class="text-black" href="!#">
                        {{ days > 0 ? `${days - 1} jours` : null }}
                        {{ hours ? `${hours} heures` : null }}
                        {{ minutes ? `${minutes} minutes ` : null }}
                        {{ seconds ? `${seconds} secondes ` : null }}
                    </a>
                    <span class="op-6">par </span>
                    <a class="text-black" href="!#"
                        >{{ thread.author?.name || ' Laurent' }}
                    </a>
                </p>
                <div class="text-sm op-5">
                    {{ thread['tags'].join(', ') }}
                </div>
            </div>
            <div class="col-md-4 op-7">
                <div class="row text-center op-7">
                    <div class="col px-1">
                        <i class="ion-connection-bars icon-1x"></i>
                        <span class="d-block text-sm">141 Votes</span>
                    </div>
                    <div class="col px-1">
                        <i class="ion-ios-chatboxes-outline icon-1x"></i>
                        <span class="d-block text-sm">122 Replys</span>
                    </div>
                    <div class="col px-1">
                        <i class="ion-ios-eye-outline icon-1x"></i>
                        <span class="d-block text-sm">290 Views</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Thread',

    props: ['thread'],

    data() {
        return {
            days: '',
            hours: '',
            minutes: '',
            seconds: '',
            thread: {},
        };
    },

    methods: {
        //https://stackoverflow.com/questions/34351963/how-to-show-time-ago-in-javascript-node-js
        dateDiffCalc(value) {
            const ms = Math.abs(value[0].getTime() - value[1].getTime());
            const secsdf = Math.floor(((ms / 1000) % (60 * 60)) % 60);
            const mindf = Math.floor((ms / (60 * 1000)) % 60);
            const hourdf = Math.floor((ms / (60 * 1000 * 60)) % 24);
            const daydf = Math.round(ms / (60 * 1000 * 60) / 24);
            return {
                days: daydf,
                hours: hourdf,
                minutes: mindf,
                seconds: secsdf,
            };
        },

        postedAgo() {
            const createdAt = new Date(this.thread.created_at);

            return this.dateDiffCalc([new Date(), createdAt]);
        },
    },

    beforeMount() {
        this.thread = this.$props.thread;
    },

    mounted() {
        const when = this.postedAgo();

        this.days = when.days;
        this.hours = when.hours;
        this.minutes = when.minutes;
        this.seconds = when.seconds;
    },
};
</script>
