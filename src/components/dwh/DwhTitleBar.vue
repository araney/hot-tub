<script setup lang="ts">
    import { inject } from "vue";
    import { NotificationBell } from "@dwh/notificationcenter/src/vue3";

    import DwhUserMenu from "./DwhUserMenu.vue";
    import DwhHelpMenu from "./DwhHelpMenu.vue";

    import { applicationTitleKey, authUrlKey, authVersionKey, environmentKey, userTeamMemberNumberKey } from "./injectionKeys";

    const applicationTitle = inject(applicationTitleKey);
    const authUrl = inject(authUrlKey);
    const authVersion = inject(authVersionKey);
    const environment = inject(environmentKey);
    const userTeamMemberNumber = inject(userTeamMemberNumberKey);
</script>

<template>
    <div class="dwh-title-bar">
        <div class="dwh-title-bar--company-logo">David Weekley Homes</div>
        <div class="dwh-title-bar--controls">
            <div class="dwh-title-bar--application-title">{{ applicationTitle }}</div>
            <NotificationBell
                :auth-url="authUrl"
                :auth-version="(authVersion as any)"
                :environment="(environment as any)"
                :team-member-number="userTeamMemberNumber"
                notifications-url="#/notifications" />
            <DwhUserMenu />
            <DwhHelpMenu />
        </div>
    </div>
</template>

<style scoped lang="less">
    .dwh-title-bar {
        border-bottom: 1px solid black;
        min-height: 50px;
        padding: 0 20px;

        display: flex;
        align-items: center;

        &--company-logo {
            flex: 1 1 0px;
            font-weight: bold;
        }

        &--controls {
            display: flex;
            align-items: center;
            gap: 8px;

            :deep(.dwh-menu) {
                align-self: stretch;
            }
        }
    }
</style>
