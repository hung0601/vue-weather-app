/* eslint-disable */ 
<template>
  <div class="about">
    <div class="main-div">
      <h3>{{ langData.creater }}</h3>
      <p>{{ langData.api }}</p>
      <RouterLink to="/">{{ langData.homepage }}</RouterLink>

    </div>

  </div>
</template>
<script>
import { useStore } from 'vuex'
import { computed } from 'vue';
import getLocation from '@/api/location';
getLocation();
export default {
  setup() {
    const store = useStore()
    const langData = computed(() => store.getters.getLangData("about"))
    return { langData }
  }
}
</script>

<style>
.main-div {
  position: relative;
  padding: 20px 20px;
  background-color: white;
  border-radius: 5px;
  text-align: center;
}
</style>
