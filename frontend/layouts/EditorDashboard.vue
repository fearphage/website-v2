<template>
  <div>
    <AnalyticsCookieBanner />
    <div v-if="provisioned" class="w-full md:flex md:h-screen">
      <a ref="skipLink" href="#main" class="sr-only">Skip to main content</a>
      <DashboardNav />
      <main id="main" class="p-8 flex-grow md:w-2/3 max-w-5xl mx-auto">
        <Nuxt />
      </main>
    </div>
    <div v-else>
      <CompleteAccountSetup class="h-screen px-2" />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import AnalyticsCookieBanner from "@/components/AnalyticsCookieBanner.vue";
import DashboardNav from "@/components/dashboard/DashboardNav.vue";
import CompleteAccountSetup from "@/components/dashboard/CompleteAccountSetup.vue";

export default Vue.extend({
  components: {
    AnalyticsCookieBanner,
    DashboardNav,
    CompleteAccountSetup,
  },
  middleware({ store, redirect }) {
    // TODO is this the best way to handle this????
    if (process.server) {
      return;
    }

    const isAuthenticated = store.getters["auth/isAuthenticated"];

    if (!isAuthenticated) {
      // TODO should probably have a return param
      // to get back to the specific dashboard page
      // the user was trying to access
      return redirect("/login/");
    }
  },
  computed: {
    isAuthenticated(): boolean {
      return this.$store.getters["auth/isAuthenticated"];
    },
    provisioned(): boolean {
      return this.$store.getters["auth/user"].provisioned === true;
    },
  },
  async mounted() {
    await this.$store.dispatch("auth/lookupUser");

    if (!this.isAuthenticated) {
      this.$router.push("/login/");
    }
  },
});
</script>
