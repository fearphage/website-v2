<template>
  <div class="px-4 mt-3 flex items-center sm:px-1">
    <div class="flex-1 flex justify-between">
      <button
        class="back-button nav-button"
        :class="{ invisible: currentPage === 1 }"
        @click="goBack"
      >
        <svg
          class="nav-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
        Previous <span class="sr-only">78 combos</span>
      </button>

      <button
        class="forward-button nav-button"
        :class="{ invisible: currentPage >= totalPages }"
        @click="goForward"
      >
        Next <span class="sr-only">78 combos</span>
        <svg
          class="nav-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    totalPages: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    goBack(): void {
      this.$emit("go-back");
    },
    goForward(): void {
      this.$emit("go-forward");
    },
  },
});
</script>

<style scoped>
.nav-button {
  @apply relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-dark;
}

.nav-button:first-child {
  @apply ml-0;
}

.nav-button:last-child {
  @apply mr-0;
}

.nav-icon {
  @apply h-5 w-5;
}
</style>
