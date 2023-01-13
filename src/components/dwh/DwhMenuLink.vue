<script setup lang="ts">
    const props = defineProps({
        disabled: { type: Boolean, default: false },
        href: { type: String, required: true },
        html: { type: Boolean, default: false },
        label: String,
        target: String
    });

    function handleClick(e: Event) {
        if (props.disabled)
            e.preventDefault();
    }
</script>

<template>
    <a
        class="dwh-menu-link"
        :class="{ 'dwh-menu-link--disabled': disabled }"
        :href="href"
        :target="target"
        @click="handleClick"
    >
        <slot>
            <span
                v-if="html"
                :html="label" />
            <span v-else>{{ label }}</span>
        </slot>
    </a>
</template>

<style scoped lang="less">
    .dwh-menu-link {
        display: block;
        padding: 2px 4px;
        white-space: nowrap;
        color: white;
        text-decoration: none;

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
