import { shallowMount } from "@vue/test-utils";
import BuyComboButton from "@/components/combo/BuyComboButton.vue";

describe("BuyComboButton", () => {
  it("creates a TCGPlayer button", () => {
    const wrapper = shallowMount(BuyComboButton, {
      propsData: {
        cards: ["card 1", "card 2", "card 3"],
      },
    });

    const tcgButton = wrapper.find("#tcg-buy-this-combo");

    expect(tcgButton.text()).toContain("TCGplayer");
    expect(tcgButton.attributes("href")).toBe(
      "https://www.tcgplayer.com/massentry?partner=EDHREC&utm_campaign=affiliate&utm_medium=clipboard&utm_source=EDHREC&c=1%20card%201%7C%7C1%20card%202%7C%7C1%20card%203"
    );
  });

  it("creates a Card Kingdom button", () => {
    const wrapper = shallowMount(BuyComboButton, {
      propsData: {
        cards: ["card 1", "card 2", "card 3"],
      },
    });

    const ckButton = wrapper.find("#ck-buy-this-combo");

    expect(ckButton.text()).toContain("Card Kingdom");
    expect(ckButton.attributes("href")).toBe(
      "https://www.cardkingdom.com/builder?partner=edhrec&utm_source=edhrec&utm_medium=clipboard&utm_campaign=edhrec&c=1%20card%201%0A1%20card%202%0A1%20card%203"
    );
  });
});
