<template>
    <div class="main-body">
        <a-menu theme="dark" mode="horizontal" class="option-nav" v-model:selectedKeys="current">
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
        <div class="grid-container2">
            <div v-if="info && !info.hasOwnProperty('errorCode')" class="grid-left-item" style="position: relative;">
                <div class="left-item">
                    <LineChart :info="info.days[0].hours" :now="info.currentConditions.datetime" />
                </div>
                <div class="left-side-bar left-item" :class="{ 'fullscreen': isFullscreen }">
                    <font-awesome-icon @click="handlerExpandButton" class="expand-button" :icon="['fas', 'expand']" />
                    <LeftBar :class="{ 'fullscreen': isFullscreen }" />
                </div>

            </div>
            <div v-if="info && info.hasOwnProperty('errorCode')" class="view">
                <h3>Invalid location found. Please check your location!</h3>
            </div>
            <div v-else-if="info" class="view">
                <router-view :key="$route.path" />
            </div>

        </div>



    </div>
</template>
<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import { useStore } from 'vuex'
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router'
import LeftBar from '@/components/main/LeftBarView.vue';
import LineChart from '@/components/chart/LineChart.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faExpand } from '@fortawesome/free-solid-svg-icons'

library.add(faExpand)
// import callWindy from '@/api/windy'
export default {
    setup() {
        const router = useRouter()
        const store = useStore()
        const langData = computed(() => store.getters.getLangData("cityview"))
        let results;
        switch (router.currentRoute._value.name) {
            case "today":
                results = ['1'];
                break;
            case "hourly":
                results = ['2'];
                break;
            case "weekend":
                results = ['3'];
                break;
            default:
                results = ['1']
                break;
        }
        const current = ref(results);
        const isFullscreen = ref(false);
        const handlerExpandButton = () => {
            isFullscreen.value = !isFullscreen.value;
            //callWindy(store.state.info.latitude, store.state.info.longitude, store.state.info.resolvedAddress);
        }
        return { router, langData, current, isFullscreen, handlerExpandButton }
    },
    components: { LeftBar, LineChart, FontAwesomeIcon },
    computed: {
        ...mapState([
            'info'
        ]),
        ...mapMutations([
            'setData'
        ]),

    },
    watch: {
        '$route'(to) {
            switch (to.name) {
                case "today":
                    this.current = ['1'];
                    break;
                case "hourly":
                    this.current = ['2'];
                    break;
                case "weekend":
                    this.current = ['3'];
                    break;
                default:
                    this.current = ['1'];
                    break;
            }
        },
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
.expand-button {
    font-size: 30px;
    position: absolute;
    z-index: 1003;
}

.expand-button:hover {
    cursor: pointer;
}

.windy-map {
    width: 100%;
    height: 100%;
    z-index: 800;
}

.fullscreen {
    position: fixed;
    top: 0;
    z-index: 1002;
    width: 100% !important;
    height: 100vh !important;
    margin-top: 0 !important;
}

.view {
    width: 100%;
    margin-left: 50%;
    transform: translateX(-50%);
}

.main-body {
    background-image: linear-gradient(0deg, #d8eeee, #d8eeee 25%, #275683a8 65%, #16416a 90%, #16416a);
    position: relative;
}

.option-nav {
    top: 70px;
    position: sticky;
    z-index: 999;
}

.left-side-bar {
    display: block;
    height: 50vh;
    width: 100%;

}

.grid-container2 {
    display: grid;
    grid-template-columns: 50% 50%;
}

.left-item {
    width: 95%;
    margin-left: 50%;
    transform: translateX(-50%);
    background-color: white;
    margin-top: 30px;
    border-radius: 5px;
}



@media only screen and (max-width: 900px) {
    .grid-container2 {
        grid-template-columns: 100%;
    }
}
</style>