<template>
    <ErrorModal />
    <h2>Page accueil Dashboard</h2>
    <p>Bienvenue Mr le Président</p>
    <ul>
        <li>
            <RouterLink to="channels">Channels</RouterLink>
        </li>
        <li>
            <RouterLink to="threads">Threads</RouterLink>
        </li>
    </ul>
</template>
<script>
import ErrorModal from '@/components/ErrorModal.vue';
export default {
    component: { ErrorModal },
};
</script>
