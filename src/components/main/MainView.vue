<template>
    <div class="right-content">

        <div class="header-paner">
            <div class="collapse-button">
                <MenuUnfoldOutlined v-if="store.state.leftbarview" @click="store.commit('toggleLeftbar')" />
                <MenuFoldOutlined v-else @click="store.commit('toggleLeftbar')" />
            </div>
            <div class="header-component">
                <h2 style="display: block;color: #fff;">Weather forecast</h2>
            </div>
            <a-auto-complete class="search-box" v-model:value="location" :options="searchResults"
                :placeholder="langData.search" @select="onSearch" @search="handlerInput" />

            <div class="header-paner-left header-component">
                <div class="language">
                    <a-dropdown>
                        <a style="color: #fff;" class="ant-dropdown-link" @click.prevent>
                            <global-outlined />
                            <span class="main-nav-text">{{ langData.language }}</span>
                            <DownOutlined />
                        </a>
                        <template #overlay>
                            <a-menu @click="handleMenuClick">
                                <a-menu-item key="en">English</a-menu-item>
                                <a-menu-item key="vn">Tiếng Việt</a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                    <!-- <a-select ref="select" style="width: 150px;" v-model:value="language"
                            @change="handleLanguageChange">
                            <a-select-option value="en">English</a-select-option>
                            <a-select-option value="vn">Tiếng Việt</a-select-option>
                        </a-select> -->

                </div>
                <div class="user-header" v-if="store.state.user.loggedIn">
                    <a-avatar style="background-color: #87d068">
                        <template #icon>
                            <UserOutlined />
                        </template>
                    </a-avatar>
                    <p class="main-nav-text">{{ store.state.user.data.displayName }}</p>
                    <LogoutOutlined class="logout-button" v-on:click="() => { store.dispatch('logOut') }" />
                </div>
                <div v-else>
                    <RouterLink style="color: #fff;" :to="{ name: 'login' }">
                        <LoginOutlined /> <span class="main-nav-text">{{ langData.signin }}</span>
                    </RouterLink>
                </div>

            </div>

        </div>
        <div>
            <router-view :key="$route.params.city"></router-view>
        </div>

        <div style="text-align: center">
            Ant Design ©2018 Created by Ant UED
        </div>
    </div>
</template>

<script >

import {
    LogoutOutlined,
    UserOutlined,
    GlobalOutlined,
    DownOutlined,
    LoginOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,


} from '@ant-design/icons-vue'
import { Loader } from '@googlemaps/js-api-loader';
import { useStore } from 'vuex'
import { ref, computed } from 'vue';



export default ({
    setup() {
        const store = useStore()
        const language = ref('vn')
        const langData = computed(() => store.getters.getLangData("mainnav"))
        const handleLanguageChange = () => {
            store.commit("setLanguage", language.value)
        }
        const handleMenuClick = e => {
            store.commit("setLanguage", e.key)

        }
        return { handleMenuClick, store, language, langData, handleLanguageChange }
    },
    data() {
        return {
            location: '',
            searchResults: [],
            apiKey: 'AIzaSyDQr6a74_C8UYfDjFjLYaofM3ifD7KHfXo',
            service: null,
        }
    },
    components: {
        UserOutlined, LogoutOutlined, GlobalOutlined, DownOutlined, LoginOutlined, MenuUnfoldOutlined, MenuFoldOutlined
    },
    created() {
        const loader = new Loader({
            apiKey: this.apiKey,
            libraries: ["places"],
            types: ["(city)"],
        })
        loader
            .load()
            .then((google) => {
                this.service = new google.maps.places.AutocompleteService();

            })
            .catch(e => {
                console.log(e)
            });
    },
    mounted() {

    },
    methods: {
        onSearch() {
            this.$router.push({ name: 'today', params: { city: this.location } })
            this.location = ''
        },
        handlerInput() {
            this.service.getPlacePredictions({
                input: this.location,
                types: ['(cities)']
            }, (predictions, status) => {
                if (status !== 'OK') {
                    this.searchResults = []
                    return 'error'
                }
                this.searchResults = predictions.map(prediction => { return { value: prediction.description } })
            })

        }
    }
});
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

.ant-layout-header {
    height: auto !important;
}

.right-content {
    width: 100%;
    position: relative;
    min-height: 70px;
}

.header-paner {
    position: -webkit-sticky;
    position: sticky;
    z-index: 1000;
    top: 0;
    background-color: var(--header-bg);
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
}

.header-component {
    width: 30% !important;
    align-items: center;
    text-align: center;
}

.ant-layout-header {
    background-color: var(--header-nav-bg);
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

.ant-menu-horizontal {
    background-color: var(--header-nav-bg) !important;
    display: flex;
    justify-content: center;
    width: 100% !important;
}

.user-header {
    display: flex;
    color: white;
    align-items: center;
}

.user-header p {
    margin-bottom: 0;
    margin-left: 5px;
}

.header-paner-left {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 20px;
    margin-right: 30px;
}

/* .language {
    width: 20%;
} */

.ant-select-selector {
    margin-right: 0px;
}

.logout-button {
    font-size: 2rem;
    margin-left: 10px;
    font-weight: 500;
}

.logout-button:hover {
    cursor: pointer;
}

.main-nav-text {
    margin-left: 10px;
}

.search-box {
    width: 400px;
}

@media only screen and (max-width: 950px) {
    .main-nav-text {
        display: none;
    }

    .search-box {
        width: 200px;
    }

    h2 {
        font-size: 20px;
    }
}

@media only screen and (max-width: 400px) {
    .search-box {
        width: 100px;
    }

    h2 {
        font-size: 16px;
    }

    .collapse-button svg {
        width: 22px !important;
    }
}
</style>