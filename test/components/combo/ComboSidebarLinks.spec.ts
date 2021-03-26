import { shallowMount } from "@vue/test-utils";
import ComboSidebarLinks from "@/components/combo/ComboSidebarLinks.vue";

describe("ComboSidebarLinks", () => {
  it("creates a copy combo button", () => {
    const CopyComboLinkButtonStub = { template: "<div></div>" };
    const wrapper = shallowMount(ComboSidebarLinks, {
      stubs: {
        CopyComboLinkButton: CopyComboLinkButtonStub,
      },
      propsData: {
        comboLink: "https://example.com/combo/3",
      },
    });

    expect(wrapper.findComponent(CopyComboLinkButtonStub).exists()).toBe(true);
  });

  it("creates buy this combo buttons", () => {
    const BuyComboButtonStub = {
      template: "<div></div>",
      props: ["cards"],
    };
    const wrapper = shallowMount(ComboSidebarLinks, {
      stubs: {
        BuyComboButton: BuyComboButtonStub,
      },
      propsData: {
        comboLink: "https://example.com/combo/3",
        comboId: "fake-id",
        cards: ["card 1", "card 2"],
      },
    });

    expect(wrapper.findComponent(BuyComboButtonStub).exists()).toBe(true);
    expect(wrapper.findComponent(BuyComboButtonStub).props("cards")).toEqual([
      "card 1",
      "card 2",
    ]);
  });

  it("creates a 'Find Other Combos Using These Cards' button when there are related searches", () => {
    const SimiliarCombosButtonStub = { template: "<div></div>" };
    const wrapper = shallowMount(ComboSidebarLinks, {
      stubs: {
        SimiliarCombosButton: SimiliarCombosButtonStub,
      },
      propsData: {
        comboLink: "https://example.com/combo/3",
        comboId: "fake-id",
        cards: ["card 1", "card 2"],
      },
    });

    expect(wrapper.findComponent(SimiliarCombosButtonStub).exists()).toBe(true);
  });
});
