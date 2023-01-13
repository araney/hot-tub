<script setup lang="ts">
    import DwhApplication, { Route } from "./dwh/DwhApplication.vue";

    const routes: Route[] = [
        { path: "/", title: "Home", component: () => import("./PageHome.vue") },
        { path: "/one", title: "One", component: () => import("./PageOne.vue") }
    ];
</script>

<template>
    <DwhApplication
        application-title="Hot Tub"
        auth-url="https://localhost:44333/auth/headers/v2"
        environment="test"
        user-team-member-number="9909614"
        :routes="routes" />
</template>

<style scoped lang="less">
    
</style>
