<script setup lang="ts">
    import { inject, ref } from "vue";
    import { DwhTeamMemberPhoto } from "@dwh/organization-service-components-vue-3";

    import DwhMenu, { DwhMenuDivider, DwhMenuItem, DwhMenuLink } from "./DwhMenu.vue";
    import DwhFeatureFlagModal from "./DwhFeatureFlagModal.vue";
    import DwhImpersonationModal from "./DwhImpersonationModal.vue";

    import { authUrlKey, authVersionKey, environmentKey, userTeamMemberNumberKey } from "./injectionKeys";

    const authUrl = inject(authUrlKey);
    const authVersion = inject(authVersionKey);
    const environment = inject(environmentKey);
    const userTeamMemberNumber = inject(userTeamMemberNumberKey);

    const featureFlagModalIsOpen = ref(false);
    const impersonationModalIsOpen = ref(false);

    function handleFeatureFlagsClicked() {
        featureFlagModalIsOpen.value = true;
    }

    function handleImpersonateTeamMemberClicked() {
        impersonationModalIsOpen.value = true;
    }
</script>

<template>
    <DwhMenu
        class="dwh-user-menu"
        align="right"
    >
        <template #toggle-label>
            <DwhTeamMemberPhoto
                :auth-url="authUrl"
                :auth-version="(authVersion as any)"
                :environment="(environment as any)"
                :team-member-identifier="userTeamMemberNumber" />
        </template>
        <DwhMenuItem 
            html 
            label="Impersonate Team Member&hellip;" 
            @click="handleImpersonateTeamMemberClicked" />
        <DwhMenuItem 
            html 
            label="Feature Flags&hellip;"
            @click="handleFeatureFlagsClicked" />
        <DwhMenuDivider />
        <DwhMenuLink label="Profile" href="#/profile" />
        <DwhMenuItem label="Sign Out" />
    </DwhMenu>

    <DwhFeatureFlagModal v-model:open="featureFlagModalIsOpen" />
    <DwhImpersonationModal v-model:open="impersonationModalIsOpen" />
</template>

<style scoped lang="less">
    .dwh-user-menu {
        :deep(.dwh-team-member-photo img) {
            height: 45px;
            width: 45px;
            filter: grayscale();
        }
    }
</style>
