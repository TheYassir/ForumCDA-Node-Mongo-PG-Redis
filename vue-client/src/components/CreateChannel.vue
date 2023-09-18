<template>
    <div>
        <div class="container">
            <div
                class="modal fade"
                id="channelModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="channelModalLabel"
                aria-modal="true"
            >
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <form @submit.prevent="onSubmit">
                            <div
                                class="modal-header d-flex align-items-center bg-primary text-white"
                            >
                                <h6
                                    class="modal-title mb-0"
                                    id="channelModalLabel"
                                >
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
                                    <label for="channelName">
                                        Channel Name
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control mb-3"
                                        id="channelName"
                                        placeholder="Enter channel name"
                                        name="name"
                                        v-model="formData.name"
                                        required
                                    />
                                </div>
                                <label for="description">
                                    Channel Description
                                </label>
                                <textarea
                                    required
                                    id="description"
                                    class="form-control summernote"
                                    v-model="formData.description"
                                    name="description"
                                    placeholder="Description"
                                ></textarea>
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
            class="btn btn-lg btn-block btn-success rounded-0 py-4 mb-3 bg-op-6 roboto-bold float-end"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#channelModal"
        >
            Create a Channel
        </button>
    </div>
</template>

<script>
import config from '@/mixins/config';

export default {
    mixins: [config],

    data() {
        return {
            original: { name: '', description: '' },
            name: '',
            description: '',
            formData: {
                name: '',
                description: '',
            },
        };
    },

    methods: {
        async onSubmit(e) {
            e.preventDefault();

            try {
                // Faire des headers avec className
                const res = await fetch(`${this.pgUrl}/channels/create`, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify(this.formData),
                });

                await res.json();

                this.formData = this.original;
            } catch (error) {
                console.error(error);
            }
        },
    },
};
</script>
