<script lang="ts">
    import { Message } from "@dwh/utilities-message";

    export { default as DwhMenuDivider } from "./DwhMenuDivider.vue";
    export { default as DwhMenuLink } from "./DwhMenuLink.vue";
    export { default as DwhMenuItem } from "./DwhMenuItem.vue";

    let _id = 0;

    export const dwhMenuOpened = new Message<number>();
</script>

<script setup lang="ts">
    import { computed, ref, watch } from "vue";

    const id = _id++;

    const props = defineProps({
        label: String,
        align: { validator: (v: string) => ["left", "right"].includes(v), default: "left" },
        open: { type: Boolean, default: null }
    });

    const emit = defineEmits<{
        (e: "update:open", open: boolean): void
    }>();

    const toggleElement = ref<HTMLElement>();
    const panelElement = ref<HTMLElement>();

    const localOpen = ref(false);

    const alignClass = computed(() => `dwh-menu--align-${props.align}`);
    const openClass = computed(() => localOpen.value ? "dwh-menu--open" : null);

    if (props.open === true)
        localOpen.value = true;

    function toggle() {
        if (localOpen.value === true)
            close();
        else
            open();
    }

    function open() {
        setOpen(true);
    }

    function close() {
        setOpen(false);
    }

    function setOpen(open: boolean) {
        if (props.open === null)
            localOpen.value = open;
        else
            emit("update:open", open);
    }

    document.addEventListener("click", e => {
        close();
    });

    dwhMenuOpened.subscribe(menuId => {
        if (menuId !== id)
            close();
    });

    watch(() => props.open, () => {
        if (props.open === true || props.open === false)
            localOpen.value = props.open;
    });

    watch(localOpen, () => {
        if (localOpen.value === true)
            dwhMenuOpened.publish(id);
    }, {
        immediate: true
    });
</script>

<template>
    <div
        class="dwh-menu"    
        :class="[ alignClass, openClass ]"
    >
        <div
            class="dwh-menu__toggle"
            ref="toggleElement"
            @click.stop="toggle"
        >
            <slot name="toggle-content">
                <slot name="toggle-label">{{ label }}</slot>
                <i v-show="!localOpen" class="fas fa-caret-down"></i>
                <i v-show="localOpen" class="fas fa-caret-up"></i>
            </slot>
        </div>
        <div
            class="dwh-menu__panel"
            ref="panelElement"
        >
            <slot />
        </div>
    </div>
</template>

<style scoped lang="less">
    .dwh-menu {
        position: relative;

        &__toggle {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 0 8px;
            height: 100%;

            &:hover {
                cursor: pointer;
                background-color: black;
                color: white;
            }
        }

        &--open &__toggle {
            background-color: black;
            color: white;
        }

        &__panel {
            @panel-padding: 8px 2px;

            display: none;
            position: absolute;
            padding: @panel-padding;
            min-width: calc(100% - (@panel-padding * 2));
            background-color: black;
            color: white;
        }

        &--open &__panel {
            display: block;
        }

        &--align-right &__panel {
            right: 0;
        }
    }
</style>
