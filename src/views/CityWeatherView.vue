<template>
    <div class="main-body">
        <a-menu theme="dark" mode="horizontal" class="option-nav">
            <a-menu-item key="1">
                <router-link :to="{ name: 'today' }">{{ langData.today }}</router-link>
            </a-menu-item>
            <a-menu-item key="2">
                <router-link :to="{ name: 'hourly' }">{{ langData.hourly }}</router-link>
            </a-menu-item>
            <a-menu-item key="3">
                <router-link :to="{ name: 'weekend' }">{{ langData.days }}</router-link>
            </a-menu-item>
        </a-menu>

        <div v-if="info && info.hasOwnProperty('errorCode')" class="view">
            <h3>Invalid location found. Please check your location!</h3>
        </div>
        <div v-else-if="info" class="view">
            <router-view :key="$route.path" />
        </div>
    </div>
</template>
<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import { useStore } from 'vuex'
import { computed } from 'vue';
export default {
    setup() {
        const store = useStore()
        const langData = computed(() => store.getters.getLangData("cityview"))
        return { langData }
    },
    computed: {
        ...mapState([
            'info'
        ]),
        ...mapMutations([
            'setData'
        ]),

    },
    methods: {
        ...mapActions([
            'setDataAsync'
        ]),
    },
    props: {
        city: { required: true }
    },
    created() {
        this.setDataAsync(this.$route.params.city)
        // store.dispatch('setDataAsync', this.$route.params.city);
    }
}
</script>
<style>
.view {
    width: 80%;
    margin-left: 50%;
    transform: translateX(-50%);
}

.main-body {
    background-color: #e7e9eb;
    position: relative;
}

.option-nav {
    top: 70px;
    position: sticky;
    z-index: 999;
}

@media only screen and (max-width: 600px) {
    .view {
        width: 95%;
    }
}
</style>