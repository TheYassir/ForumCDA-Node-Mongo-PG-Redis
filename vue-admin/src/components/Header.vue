<template>
    <header
        class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow"
    >
        <RouterLink class="navbar-brand col-md-3 col-lg-2 me-0 px-3" to="/">
            Oclock Reddit Dashboard
        </RouterLink>

        <div class="navbar-nav">
            <div class="nav-item text-nowrap">
                <RouterLink class="nav-link px-3" to="!#">
                    Sign out
                </RouterLink>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'Header',
};
</script>
