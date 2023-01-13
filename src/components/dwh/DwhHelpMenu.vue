<script setup lang="ts">
    import { ref } from "vue";

    import DwhContactHelpDeskModal from "./DwhContactHelpDeskModal.vue";
    import DwhMenu, { DwhMenuLink, DwhMenuItem } from "./DwhMenu.vue";

    const contactHelpDeskModalIsOpen = ref(false);

    function handleContactHelpDeskClicked() {
        contactHelpDeskModalIsOpen.value = true;
    }
</script>

<template>
    <DwhMenu 
        align="right" 
        label="Help"
    >
        <DwhMenuItem 
            html 
            label="Contact Help Desk&hellip;" 
            @click="handleContactHelpDeskClicked" />
        <DwhMenuLink 
            href="http://www.google.com" 
            target="_blank" 
            label="Help Documentation" />
    </DwhMenu>

    <DwhContactHelpDeskModal v-model:open="contactHelpDeskModalIsOpen" />
</template>

<style scoped lang="less">
    .dwh-help-menu {
        
    }
</style>
