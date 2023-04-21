<template>
  <a-layout style="min-height: 100%;position: relative;">
    <div class="left-side-bar">
      <LeftBar class="left-layout" />
    </div>

    <MainContent />
  </a-layout>
</template>
<script>

import { defineComponent } from 'vue';
import LeftBar from '@/components/main/LeftBarView.vue';
import MainContent from '@/components/main/MainView.vue';
export default defineComponent({
  components: {
    LeftBar,
    MainContent
  },
  data() {
    return {

    };
  },
});
</script>

<style>
.left-side-bar {
  height: 100vh !important;
  position: sticky;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
}
</style>
