<template>
    <div class="row text-left mb-5">
        <div class="col-lg-4 mb-3 mb-sm-0">
            <div
                class="dropdown bootstrap-select form-control form-control-lg bg-white bg-op-9 text-sm w-lg-50"
                style="width: 100%"
            >
                <select
                    class="form-control form-control-lg bg-white bg-op-9 text-sm w-lg-50"
                    data-toggle="select"
                    tabIndex="-98"
                >
                    <option value="Categories">Categories</option>
                    <option>Learn</option>
                    <option>Share</option>
                    <option>Build</option>
                </select>
            </div>
        </div>
        <div class="col-lg-4 text-lg-right">
            <div
                class="dropdown bootstrap-select form-control form-control-lg bg-white bg-op-9 ml-auto text-sm w-lg-50"
                style="width: 100%"
            >
                <select
                    class="form-control form-control-lg bg-white bg-op-9 ml-auto text-sm w-lg-50"
                    data-toggle="select"
                    tabIndex="-98"
                >
                    <option value="Filter by">Filter by</option>
                    <option>Votes</option>
                    <option>Replys</option>
                    <option>Views</option>
                </select>
            </div>
        </div>
        <div class="col-lg-4 text-center">
            <CreateThread />
        </div>
    </div>
</template>

<script>
import CreateThread from '@/components/CreateThread.vue';
export default {
    components: { CreateThread },
    name: 'ThreadHeading',
};
</script>

<style scoped></style>
