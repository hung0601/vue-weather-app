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
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router'

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
        return { router, langData, current }
    },

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
</style>