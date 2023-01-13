<script setup lang="ts">
    const props = defineProps({
        disabled: { type: Boolean, default: false },
        html: { type: Boolean, default: false },
        label: String
    });

    function handleClick(e: Event) {
        if (props.disabled) {
            e.preventDefault();
            e.stopPropagation();
        }
    }
</script>

<template>
    <div
        class="dwh-menu-item"
        :class="{ 'dwh-menu-item--disabled': disabled }"
        @click="handleClick"
    >
        <slot>
            <span
                v-if="html"
                v-html="label" />
            <span v-else>{{ label }}</span>
        </slot>
    </div>
</template>

<style scoped lang="less">
    .dwh-menu-item {
        padding: 4px;
        white-space: nowrap;

        &:not(&--disabled):hover {
            cursor: pointer;
            background-color: white;
            color: black;
        }

        &--disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    }
</style>
