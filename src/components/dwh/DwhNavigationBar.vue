<script setup lang="ts">
    import { PropType } from "vue";
    import { Route } from "./DwhApplication.vue";

    const props = defineProps({
        routes: { type: Array as PropType<Route[]>, default: () => [] }
    });
</script>

<template>
    <div class="dwh-navigation-bar">
        <div class="dwh-navigation-bar__routes">
            <RouterLink
                v-for="route in routes"
                :to="route.path"
            >
                <span>{{ route.title }}</span>
            </RouterLink>
        </div>
    </div>
</template>

<style scoped lang="less">
    .dwh-navigation-bar {
        border-bottom: 1px solid black;
        height: 36px;
        padding: 0 20px;

        display: flex;
        align-items: stretch;

        &__routes {
            display: flex;
            align-items: stretch;

            a {
                display: flex;
                align-items: center;
                border-right: 1px solid black;
                padding: 0 8px;
                color: black;
                text-decoration: none;

                &.router-link-active {
                    border-bottom: 1px solid white;
                    margin-bottom: -1px;

                    &:hover {
                        border-bottom-color: black;
                    }
                }

                &:first-child {
                    border-left: 1px solid black;
                }

                &:hover {
                    color: white;
                    background-color: black;
                }
            }
        }
    }
</style>
