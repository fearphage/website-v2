<template>
  <ExternalLink :to="link" class="button w-full">
    <!-- TODO for some reason, this svg looks right in development and is weirdly huge and cropped in production :( -->
    <!-- <svg -->
    <!--   aria&#45;hidden="true" -->
    <!--   focusable="false" -->
    <!--   viewbox="0 0 848 848" -->
    <!--   xmlns="http://www.w3.org/2000/svg" -->
    <!--   xmlns:svg="http://www.w3.org/2000/svg" -->
    <!--   class="edhrec&#45;icon" -->
    <!-- > -->
    <!--   <path -->
    <!--     d="m274.758564,4.548195a42.85523,47.51192 0 0 0 &#45;42.8579,47.51482a42.85523,47.51192 0 0 0 42.8579,47.51482a42.85523,47.51192 0 0 0 6.16728,&#45;0.57151l61.52529,148.5655l&#45;58.67182,30.45193l0,356.34075l140.52144,&#45;72.92545l140.52153,72.92545l0,&#45;356.34072l&#45;58.67181,&#45;30.45196l61.52527,&#45;148.56547a42.85523,47.51192 0 0 0 6.18567,0.57151a42.85523,47.51192 0 0 0 42.83943,&#45;47.51482a42.85523,47.51192 0 0 0 &#45;42.83943,&#45;47.51482a42.85523,47.51192 0 0 0 &#45;42.8578,47.51482a42.85523,47.51192 0 0 0 14.59884,35.65653l&#45;62.61142,147.83068l&#45;58.69028,&#45;30.45194l&#45;58.6902,30.45194l&#45;62.59303,&#45;147.8307a42.85523,47.51192 0 0 0 14.59884,&#45;35.65654a42.85523,47.51192 0 0 0 &#45;42.8578,&#45;47.51482zm&#45;43.7968,419.87754l&#45;176.91749,90.60065l0,238.10478l176.91749,&#45;91.15171l0,&#45;237.55372zm386.67798,0l0,237.55372l176.91749,91.15171l0,&#45;238.10478l&#45;176.91749,&#45;90.60065zm&#45;193.35737,200.18274l0,0.0209l&#45;419.98115,219.91882l419.98115,0l0.0377,0l419.98115,0l&#45;419.98105,&#45;219.91932l0,&#45;0.0209l&#45;0.0189,0l&#45;0.0189,0.0005z" -->
    <!--   /> -->
    <!--   <path -->
    <!--     d="m304.333314,87.719555l130.13697,&#45;73.74926l0,35.8616l113.44379,&#45;35.8616l&#45;130.42049,75.04774l0,&#45;35.7808l&#45;113.16027,34.48232" -->
    <!--   /> -->
    <!-- </svg> -->
    View on EDHREC</ExternalLink
  >
</template>

<script lang="ts">
import Vue from "vue";
import ExternalLink from "@/components/ExternalLink.vue";

export default Vue.extend({
  components: {
    ExternalLink,
  },
  props: {
    link: {
      type: String,
      default: "",
    },
  },
});
</script>

<style scoped>
svg.edhrec-icon {
  height: 18px;
  margin-top: -5px;
}
</style>
