<script setup lang="ts">
    import { inject } from "vue";
    import { NotificationCenter } from "@dwh/notificationcenter/src/vue3";

    import { authUrlKey, authVersionKey, environmentKey, userTeamMemberNumberKey } from "./injectionKeys";

    const authUrl = inject(authUrlKey);
    const authVersion = inject(authVersionKey);
    const environment = inject(environmentKey);
    const userTeamMemberNumber = inject(userTeamMemberNumberKey);
</script>

<template>
    <NotificationCenter
        :auth-url="authUrl"
        :auth-version="(authVersion as any)"
        :environment="(environment as any)"
        :team-member-number="userTeamMemberNumber" />
</template>