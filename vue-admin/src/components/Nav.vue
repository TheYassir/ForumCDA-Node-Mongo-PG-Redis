<template>
    <nav
        id="sidebarMenu"
        class="col-md-3 col-lg-2 d-md-block bg-light sidebar-admin collapse"
    >
        <div class="position-sticky pt-3">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <RouterLink end class="nav-link" aria-current="page" to="/">
                        <span class="fas fa-home" /> Dashboard
                    </RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink
                        class="nav-link"
                        aria-current="page"
                        to="/profile/me"
                    >
                        <span class="fas fa-users" /> Votre Profile
                    </RouterLink>
                </li>
            </ul>

            <h6
                class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
            >
                <span>Administration</span>
            </h6>

            <ul class="nav flex-column mb-2">
                <li class="nav-item">
                    <RouterLink class="nav-link" to="/current">
                        <span class="fas fa-file" data-feather="file-text" />
                        Résumé de la semaine
                    </RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink
                        class="nav-link"
                        aria-current="page"
                        to="/roles"
                    >
                        <span class="fas fa-user-lock" /> Gestion des Rôles
                    </RouterLink>
                </li>

                <li class="nav-item">
                    <RouterLink
                        class="nav-link"
                        aria-current="page"
                        to="/employees"
                    >
                        <span class="fas fa-user" /> Employés
                    </RouterLink>
                </li>

                <li class="nav-item">
                    <RouterLink
                        class="nav-link"
                        aria-current="page"
                        to="channels"
                    >
                        <span class="fas fa-file" /> Channels
                    </RouterLink>
                </li>

                <li class="nav-item">
                    <RouterLink
                        class="nav-link"
                        aria-current="page"
                        to="threads"
                    >
                        <span class="fas fa-store" /> Threads
                    </RouterLink>
                </li>

                <li class="nav-item">
                    <RouterLink class="nav-link" aria-current="page" to="logs">
                        <span class="fas fa-pen" /> Logs
                    </RouterLink>
                </li>

                <li class="nav-item">
                    <RouterLink
                        class="nav-link"
                        aria-current="page"
                        to="/users"
                    >
                        <span class="fas fa-users" /> Utilisateurs
                    </RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink
                        class="nav-link"
                        aria-current="page"
                        to="/reports"
                    >
                        <span class="fas fa-area-chart" /> Rapports
                    </RouterLink>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Nav',
};
</script>
