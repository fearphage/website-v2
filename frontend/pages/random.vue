<template>
  <SplashPage
    title="Randomizing"
    flavor="Ever try to count hyperactive schoolchildren while someone shouts random numbers in your ear? It’s like that."
    art-circle-card-name="Chaosphere"
    art-circle-artist-name="Steve Luke"
  />
</template>

<script lang="ts">
import Vue from "vue";
import SplashPage from "@/components/SplashPage.vue";
import random from "@/lib/api/random";

export default Vue.extend({
  name: "RandomPage",
  components: {
    SplashPage,
  },
  layout: "SplashLayout",

  async mounted(): Promise<void> {
    let query = this.$route.query.q;
    if (typeof query !== "string") {
      query = "";
    }
    const router = this.$router;

    try {
      const randomCombo = await random(query);
      const params: Parameters<typeof router.replace>[0] = {
        path: `/combo/${randomCombo.commanderSpellbookId}/`,
      };

      if (query) {
        params.query = { q: query };
      }

      router.replace(params);
    } catch (err) {
      router.replace({ path: "/combo-not-found/" });
    }
  },
});
</script>
