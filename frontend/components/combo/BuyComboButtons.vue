<template>
  <div>
    <div class="lg:flex">
      <ExternalLink
        id="tcg-buy-this-combo"
        :to="tcgPlayerLink"
        class="button w-full flex-shrink"
        :class="{ disabled: tcgPlayerOutOfStock }"
        :disabled="tcgPlayerOutOfStock"
        @click="onClick('TCGplayer')"
      >
        <!-- SVG from EDHREC.com -->
        <svg
          aria-hidden="true"
          class=""
          focusable="false"
          height="12"
          version="1.1"
          viewBox="0 0 10.399999 12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m4.22 0.8h-2.5536c-0.4496 0-0.8 0.3576-0.8 0.8v8.8c0 0.4424 0.3584 0.8 0.8 0.8h7.0672c0.4496 0 0.8-0.3576 0.8-0.8v-8.8c9e-7 -0.4424-0.3584-0.8-0.8-0.8h-1.4896l0.5472 2.52c0.025596 0.0768-0.00804 0.14-0.1008 0.188-0.0672 0.0352-0.1472 0.0528-0.24 0.0528-0.041604 0-0.072 0-0.092796-4e-3l-2.2712 0.9552 0.656 3.2432c0.020004 0.051204 0.00804 0.099204-0.036 0.144-0.0432 0.044796-0.1096 0.075204-0.1968 0.0912-0.051996 0.00636-0.087996 0.0096-0.108 0.0096-0.1496 0-0.2584-0.039996-0.3256-0.12l-2.444-3.9624c-0.056-0.0776-0.0384-0.148 0.0544-0.212 0.0776-0.048 0.1648-0.072 0.264-0.072 0.02 0 0.0504 0.0032 0.092 0.0096l2.1968-1.128-1.02-1.7152zm-4.22 0.005604c0-0.4456 0.3576-0.8056 0.8-0.8056h8.8c0.4424 0 0.8 0.36 0.8 0.8056v10.389c0 0.4456-0.3576 0.8056-0.8 0.8056h-8.8c-0.4424 0-0.8-0.36-0.8-0.8056z"
            fill-rule="evenodd"
            stroke-width=".8"
          ></path>
        </svg>

        TCGplayer {{ tcgplayerPriceLabel }}
      </ExternalLink>
      <span class="mx-1"></span>
      <ExternalLink
        id="ck-buy-this-combo"
        :to="cardkingdomLink"
        class="button w-full flex-shrink"
        :class="{ disabled: cardkingdomOutOfStock }"
        :disabled="cardkingdomOutOfStock"
        @click="onClick('Card Kingdom')"
      >
        <!-- SVG from EDHREC.com -->
        <svg
          aria-hidden="true"
          height="12"
          version="1.1"
          viewBox="0 0 3.7041667 3.1750001"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(0 -293.82)">
            <path
              d="m0 293.82v1.1592h0.52042v2.0158h2.6633v-2.0158h0.52042v-1.1592h-0.57636v1.0908h-0.49196v-1.084h-0.54839v1.084h-0.47074v-1.084h-0.54839v1.084h-0.49196v-1.0908z"
            ></path>
          </g>
        </svg>

        Card Kingdom {{ cardkingdomPriceLabel }}
      </ExternalLink>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import ExternalLink from "@/components/ExternalLink.vue";

export default Vue.extend({
  components: {
    ExternalLink,
  },
  props: {
    cards: {
      type: Array as PropType<string[]>,
      default() {
        return [];
      },
    },
    tcgplayerPrice: {
      type: String,
      default: "",
    },
    cardkingdomPrice: {
      type: String,
      default: "",
    },
  },
  computed: {
    cardsWithQuantities(): string[] {
      return this.cards.map((name) => {
        return `1 ${name}`;
      });
    },
    cardkingdomLink(): string {
      const cardQuery = encodeURI(this.cardsWithQuantities.join("\n"));

      return `https://www.cardkingdom.com/builder?partner=CommanderSpellbook&utm_source=edhrec&utm_medium=commanderspellbook&utm_campaign=edhrec&c=${cardQuery}`;
    },
    tcgPlayerLink(): string {
      const cardQuery = encodeURI(this.cardsWithQuantities.join("||"));

      return `https://www.tcgplayer.com/massentry?partner=EDHREC&utm_campaign=affiliate&utm_medium=commanderspellbook&utm_source=EDHREC&c=${cardQuery}`;
    },
    tcgplayerPriceLabel(): string {
      if (this.tcgPlayerOutOfStock) {
        return "(Unavailable)";
      }
      return `($${this.tcgplayerPrice})`;
    },
    tcgPlayerOutOfStock(): boolean {
      return this.tcgplayerPrice === "";
    },
    cardkingdomPriceLabel(): string {
      if (this.cardkingdomOutOfStock) {
        return "(Unavailable)";
      }
      return `($${this.cardkingdomPrice})`;
    },
    cardkingdomOutOfStock(): boolean {
      return this.cardkingdomPrice === "";
    },
  },
  methods: {
    onClick(kind: "TCGplayer" | "Card Kingdom"): void {
      this.$gtag.event(`Buy on ${kind} button clicked`, {
        event_category: "Combo Detail Page Actions",
      });
    },
  },
});
</script>
