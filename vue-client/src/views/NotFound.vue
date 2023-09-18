<template>
    <div class="container">
        <h2>Oh NOOOONNNNNNNNNNNN!!!!!!</h2>
        <img :src="img" alt="Page Not Found" class="img-fluid mb-5" />
    </div>
</template>

<script>
import img from '@/assets/img/404.gif';
export default {
    name: 'NotFound',
    data() {
        return {
            img,
        };
    },
};
</script>
