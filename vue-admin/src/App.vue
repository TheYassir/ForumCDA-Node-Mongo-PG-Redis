<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Header from '@/components/Header.vue';
import Nav from '@/components/Nav.vue';
import QuickActions from '@/components/QuickActions.vue';
import ErrorModal from '@/components/ErrorModal.vue';
</script>

<template>
    <Header />
    <Nav />
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <ErrorModal />

        <QuickActions />

        <RouterView />
    </main>
</template>
