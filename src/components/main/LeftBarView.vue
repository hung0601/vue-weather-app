<template>
    <a-layout-sider class="leftbar" :class="{ 'visibility': store.state.leftbarview }">

        <div class="logo">
            <img src="@/assets/logo.svg" />
        </div>
        <a-menu style="background-color: #59516e;" theme="dark" mode="inline">
            <a-menu-item key="1">
                <router-link to="/">{{ langData.home }}</router-link>

            </a-menu-item>
            <a-menu-item key="2">
                <router-link :to="{ name: 'today', params: { city: 'Ha Noi' } }">{{ langData.hanoi }}</router-link>
            </a-menu-item>
            <a-menu-item key="3">
                <router-link :to="{ name: 'today', params: { city: 'Tokyo' } }">{{ langData.tokyo }}</router-link>
            </a-menu-item>
            <a-menu-item key="4">
                <router-link :to="{ name: 'today', params: { city: 'New York' } }">{{ langData.newyork }}</router-link>
            </a-menu-item>
            <a-menu-item key="5">
                <router-link :to="{ name: 'today', params: { city: 'London' } }">{{ langData.london }}</router-link>
            </a-menu-item>
            <a-menu-item key="6">
                <router-link to="/about">{{ langData.about }}</router-link>
            </a-menu-item>

        </a-menu>
    </a-layout-sider>
</template>
<script>
import { useStore } from 'vuex'
import { computed, ref } from 'vue';
export default {
    setup() {
        const visibility = ref(true)
        const store = useStore()
        const langData = computed(() => store.getters.getLangData("leftbar"))
        const handerCollapseButton = function () {
            visibility.value = !visibility.value
        }
        return { langData, visibility, handerCollapseButton, store }
    }
}
</script>
<style>
:root {
    --menu-bg: #59516e;
    --menu-item-selected: #493579;
    --header-nav-bg: #001529;
    --header-bg: #0f263c;
    --left-bar-trigger: #604b91;
}

#components-layout-demo-side .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);

}

.site-layout .site-layout-background {
    background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
    background: #141414;
}

.logo {
    text-align: center;
    height: 150px;
}

.logo img {
    width: 60%;
    margin-top: 10px;
}

.ant-layout-sider-children {
    background-color: var(--menu-bg);
}


.ant-menu-item:hover {
    background-color: var(--menu-item-selected) !important;
}

.ant-layout-sider-trigger {
    background-color: var(--left-bar-trigger) !important;
}

.ant-menu-sub {
    background-color: #615875 !important;
}

.ant-menu-item-selected {
    background-color: var(--menu-item-selected) !important;
}

.collapse-button {
    display: none;
    color: white;
    font-size: 30px;
    z-index: 1001;
}

.leftbar {

    height: 100vh !important;
}

@media only screen and (max-width: 1050px) {
    .collapse-button {
        display: block;
    }


    .visibility {
        display: none;
    }
}
</style>