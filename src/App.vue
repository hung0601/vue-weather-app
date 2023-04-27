<template>
  <a-layout style="min-height: 100%;position: relative;">

    <MainContent />
  </a-layout>
</template>
<script>

import { defineComponent } from 'vue';

import MainContent from '@/components/main/MainView.vue';
export default defineComponent({
  components: {

    MainContent
  },
  data() {
    return {

    };
  },
});
</script>

<style></style>
