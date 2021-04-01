import { mount, shallowMount } from "@vue/test-utils";
import BuyComboButtons from "@/components/combo/BuyComboButtons.vue";

describe("BuyComboButton", () => {
  it("creates a TCGplayer button", () => {
    const wrapper = mount(BuyComboButtons, {
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

  it("includes TCGplayer price if available", async () => {
    const wrapper = shallowMount(BuyComboButtons, {
      propsData: {
        cards: ["card 1", "card 2", "card 3"],
        tcgplayerPrice: "",
      },
    });

    expect(wrapper.find("#tcg-buy-this-combo").text()).not.toContain("$");

    await wrapper.setProps({
      tcgplayerPrice: "40.32",
    });

    expect(wrapper.find("#tcg-buy-this-combo").text()).toContain("($40.32)");
  });

  it("fires a google analytics event when TCGplayer button is clicked", async () => {
    const spy = jest.fn();
    const wrapper = mount(BuyComboButtons, {
      propsData: {
        cards: ["card 1", "card 2", "card 3"],
      },
      mocks: {
        $gtag: {
          event: spy,
        },
      },
    });

    await wrapper.find("#tcg-buy-this-combo").trigger("click");

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith("Buy on TCGplayer button clicked", {
      event_category: "Combo Detail Page Actions",
    });
  });

  it("creates a Card Kingdom button", () => {
    const wrapper = mount(BuyComboButtons, {
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

  it("fires a google analytics event when Card Kingdom button is clicked", async () => {
    const spy = jest.fn();
    const wrapper = mount(BuyComboButtons, {
      propsData: {
        cards: ["card 1", "card 2", "card 3"],
      },
      mocks: {
        $gtag: {
          event: spy,
        },
      },
    });

    await wrapper.find("#ck-buy-this-combo").trigger("click");

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith("Buy on Card Kingdom button clicked", {
      event_category: "Combo Detail Page Actions",
    });
  });

  it("includes Card Kingdom price if available", async () => {
    const wrapper = shallowMount(BuyComboButtons, {
      propsData: {
        cards: ["card 1", "card 2", "card 3"],
        cardkingdomPrice: "",
      },
    });

    expect(wrapper.find("#ck-buy-this-combo").text()).not.toContain("$");

    await wrapper.setProps({
      cardkingdomPrice: "40.32",
    });

    expect(wrapper.find("#ck-buy-this-combo").text()).toContain("($40.32)");
  });
});
