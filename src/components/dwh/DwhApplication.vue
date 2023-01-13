<script lang="ts">
    import { RouteRecordRaw } from "vue-router";

    export type Route = {
        name?: string;
        title?: string;
        path: string;
        component: RouteRecordRaw["component"]
    }
</script>

<script setup lang="ts">
    import { PropType, provide } from "vue";

    import DwhNavigationBar from "./DwhNavigationBar.vue";
    import DwhTitleBar from "./DwhTitleBar.vue";

    import * as injectionKeys from "./injectionKeys";

    import router from "../../router";

    const props = defineProps({
        applicationTitle: { type: String, required: true },
        authUrl: { type: String, required: true },
        authVersion: { type: Number, default: 2 },
        environment: { type: String, required: true },
        routes: { type: Array as PropType<Route[]>, required: true },
        userTeamMemberNumber: { type: String, required: true }
    });

    provide(injectionKeys.applicationTitleKey, props.applicationTitle);
    provide(injectionKeys.authUrlKey, props.authUrl);
    provide(injectionKeys.authVersionKey, props.authVersion);
    provide(injectionKeys.environmentKey, props.environment);
    provide(injectionKeys.userTeamMemberNumberKey, props.userTeamMemberNumber);

    const navigableRoutes: Route[] = [];

    props.routes.forEach(r => {
        const route: RouteRecordRaw = {
            path: r.path,
            name: r.name,
            component: r.component
        };
        router.addRoute(route);

        if (r.title)
            navigableRoutes.push(r);
    });

    router.addRoute({ path: "/profile", component: () => import("./DwhProfilePage.vue") });
    router.addRoute({ path: "/notifications", component: () => import("./DwhNotificationPage.vue") });
    
    let path = window.location.hash.length > 0
        ? window.location.hash.substring(1)
        : "/";

    if (path[0] !== "/")
        path = `/${path}`;

    // re-trigger current route now that routes are loaded
    router.replace(path);
</script>

<template>
    <div class="dwh-application">
        <DwhTitleBar />
        <DwhNavigationBar :routes="navigableRoutes" />
        <main>
            <RouterView />
        </main>
    </div>
</template>

<style scoped lang="less">
    .dwh-application {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;

        main {
            padding: 20px;
            flex: 1;
            overflow: auto;
        }
    }
</style>
