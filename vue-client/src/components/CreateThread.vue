<template>
    <div class="container">
        <div
            class="modal fade"
            id="threadModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="threadModalLabel"
            aria-modal="true"
        >
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <form @submit.prevent="onSubmit" ref="threadForm">
                        <div
                            class="modal-header d-flex align-items-center bg-primary text-white"
                        >
                            <h6 class="modal-title mb-0" id="threadModalLabel">
                                New Discussion
                            </h6>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="threadName"> Thread Name </label>
                                <input
                                    type="text"
                                    class="form-control mb-3"
                                    id="threadName"
                                    placeholder="Enter channel name"
                                    name="title"
                                    v-model="formData.title"
                                    required
                                />
                            </div>
                            <label for="description">
                                Thread Description
                            </label>
                            <textarea
                                required
                                id="description"
                                class="form-control summernote"
                                name="body"
                                v-model="formData.body"
                                placeholder="Description"
                            ></textarea>
                            <div class="form-group">
                                <label for="threadTags"> Thread Tags </label>
                                <input
                                    type="text"
                                    class="form-control mb-3"
                                    id="threadTags"
                                    placeholder="Une liste de tags séparés par des virgules"
                                    name="tags"
                                    v-model="formData.tags"
                                    required
                                />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="submit"
                                class="btn btn-primary"
                                data-bs-dismiss="modal"
                            >
                                Post
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <button
        class="btn btn-lg btn-block btn-success rounded-0 py-2 bg-op-9 roboto-bold"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#threadModal"
    >
        Create a Thread / Ask a Question
    </button>
</template>

<script>
import config from '@/mixins/config';
import { useRoute } from 'vue-router';

export default {
    mixins: [config],

    name: 'CreateThread',
    data() {
        return {
            formData: {
                title: '',
                body: '',
                tags: '',
                user_id: 1,
                channel_id: 1,
            },
        };
    },

    mounted() {
        const route = useRoute();

        this.formData.channel_id = route.params.id;

        console.log(route.params);
    },

    methods: {
        // const { title, body, tags } = this.data

        async onSubmit() {
            try {
                this.formData.tags = this.formData.tags
                    .split(/\,|!|\|/)
                    .filter(tag => {
                        const regexp = /[a-zA-Z]+\s+[a-zA-Z]+/g;
                        tag = tag.trim();
                        if (regexp.test(tag) || tag.indexOf(' ') !== -1) {
                            return null;
                        }

                        return tag;
                    })
                    .map(tag => {
                        tag = tag.trim();
                        return tag;
                    });
                // Faire des headers avec classe
                const res = await fetch(`${this.pgUrl}/threads/create`, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify(this.formData),
                });

                const message = await res.json();

                this.$refs.threadForm.reset();
                console.log(message);
            } catch (error) {
                console.error(error);
            }
        },
    },
};
</script>

<style scoped></style>
