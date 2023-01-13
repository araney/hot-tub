<script setup lang="ts">
    import { ref, watch } from "vue";

    const props = defineProps({
        title: { type: String, required: true },
        open: { type: Boolean, default: null }
    });

    const emit = defineEmits<{
        (e: "update:open", open: boolean): void
    }>();

    const dialogElement = ref<HTMLDialogElement>();

    const localOpen = ref(false);

    if (props.open === true)
        localOpen.value = true;

    function toggle() {
        if (localOpen.value === true)
            close();
        else
            open();
    }

    function open() {
        updateOpen(true);
    }

    function close() {
        updateOpen(false);
    }

    function updateOpen(open: boolean) {
        if (props.open === null)
            localOpen.value = open;
        else
            emit("update:open", open);
    }

    // fired when user closes dialog with ESC key
    function handleDialogCancel() {
        close();
    }

    watch(() => props.open, () => {
        if (props.open === true || props.open === false)
            localOpen.value = props.open;
    });

    watch(localOpen, () => {
        if (localOpen.value === true)
            dialogElement.value?.showModal();
        else
            dialogElement.value?.close();
    }, { 
        immediate: true
    });
</script>

<template>
    <Teleport to="body">
        <dialog
            class="dwh-modal" 
            ref="dialogElement"
            v-bind="$attrs"
            @cancel="handleDialogCancel"
        >
            <div class="dwh-modal__header">
                <div class="dwh-modal__title">{{ title }}</div>
                <div
                    class="dwh-modal__close-button"
                    @click="close"
                >
                    <i class="fas fa-times"></i>
                </div>
            </div>
            <div class="dwh-modal__body">
                <slot />
            </div>
        </dialog>
    </Teleport>
</template>

<style scoped lang="less">
    .dwh-modal {
        border: none;
        padding: 0;
        width: 400px;

        &::backdrop {
            background: transparent;
            backdrop-filter: invert();
        }

        &__header {
            padding: 8px;
            display: flex;
            align-items: center;
            border-bottom: 1px solid black;
        }

        &__title {
            flex: 1;
            font-weight: bold;
        }

        &__close-button {
            cursor: pointer;
        }

        &__body {
            padding: 20px 8px;
        }
    }
</style>
