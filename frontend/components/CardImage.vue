<template>
  <FlipperCard :flipped="loaded && readyToFlip">
    <template slot="front">
      <img class="back-card" src="~/assets/images/card-back.png" alt="" />
    </template>
    <template slot="back">
      <img class="front-card" :src="img" :alt="name" @load="onImgLoad" />
    </template>
  </FlipperCard>
</template>

<script lang="ts">
import Vue from "vue";
import FlipperCard from "@/components/FlipperCard.vue";

export default Vue.extend({
  components: {
    FlipperCard,
  },
  props: {
    img: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      loaded: false,
      readyToFlip: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.readyToFlip = true;
    }, 300);
  },
  methods: {
    onImgLoad(): void {
      this.loaded = true;
    },
  },
});
</script>

<style scoped>
.front-card {
  @apply rounded-xl;
}
</style>
