<template>
    <div id="windy">
    </div>
</template>
<script>
import { useStore } from 'vuex'
import { computed, ref } from 'vue';
import callWindy from '@/api/windy'

export default {
    setup() {
        const visibility = ref(true)
        const store = useStore()
        const langData = computed(() => store.getters.getLangData("leftbar"))
        const handerCollapseButton = function () {
            visibility.value = !visibility.value
        }
        return { langData, visibility, handerCollapseButton, store }
    },
    methods: {
        createMap() {
            callWindy(this.store.state.info.latitude, this.store.state.info.longitude, this.store.state.info.resolvedAddress);
        }
    },
    mounted() {
        this.createMap()
    }
}
</script>
<style>
#windy {
    width: 100%;
    height: 100%;
    border-radius: 5px;
}
</style>