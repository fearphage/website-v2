import { shallowMount } from "@vue/test-utils";
import type { VueComponent } from "@/test/types";
import SimiliarCombosButton from "@/components/combo/SimiliarCombosButton.vue";
import makeFakeCombo from "@/lib/api/make-fake-combo";
import search from "@/lib/api/search";

jest.mock("@/lib/api/search");

describe("SimiliarCombosButton", () => {
  beforeEach(() => {
    document.execCommand = jest.fn();
  });

  it("is shown only when similiar combos are avaialble", async () => {
    const wrapper = shallowMount(SimiliarCombosButton, {
      propsData: {
        comboId: "fake-id",
        cards: ["card 1", "card 2"],
      },
    });

    expect(wrapper.find("#has-similiar-combos").exists()).toBe(false);

    await wrapper.setData({
      numberOfSimiliarCombos: 3,
    });

    expect(wrapper.find("#has-similiar-combos").exists()).toBe(true);
  });

  it("reports how many similiar combs there are", async () => {
    const wrapper = shallowMount(SimiliarCombosButton, {
      propsData: {
        comboId: "fake-id",
        cards: ["card 1", "card 2"],
      },
    });

    await wrapper.setData({
      numberOfSimiliarCombos: 1,
    });

    expect(wrapper.find("#has-similiar-combos").text()).toBe(
      "View Another Combo Using these Cards"
    );

    await wrapper.setData({
      numberOfSimiliarCombos: 99,
    });

    expect(wrapper.find("#has-similiar-combos").text()).toBe(
      "Find 99 Other Combos Using These Cards"
    );
  });

  describe("lookupSimiliarCombos", () => {
    beforeEach(() => {
      jest.mocked(search).mockResolvedValue({
        combos: [],
        message: "",
        vendor: "cardkingdom",
        sort: "colors",
        order: "descending",
        errors: [],
      });
    });

    it("looks up combos that contain the cards in the combo", async () => {
      const wrapper = shallowMount(SimiliarCombosButton, {
        propsData: {
          comboId: "fake-id",
          cards: ["card 1", "card 2"],
        },
      });
      const vm = wrapper.vm as VueComponent;

      await vm.lookupSimiliarCombos();

      expect(search).toBeCalledTimes(1);
      expect(search).toBeCalledWith(
        `-spellbookid:fake-id card="card 1" card="card 2"`
      );
    });

    it("uses single quotes if card name contains double quotes", async () => {
      const wrapper = shallowMount(SimiliarCombosButton, {
        propsData: {
          comboId: "fake-id",
          cards: ["card 1", 'card "2"'],
        },
      });
      const vm = wrapper.vm as VueComponent;

      await vm.lookupSimiliarCombos();

      expect(search).toBeCalledTimes(1);
      expect(search).toBeCalledWith(
        `-spellbookid:fake-id card="card 1" card='card "2"'`
      );
    });

    it("leaves hasSimiliarCombos as false when no combos return from search", async () => {
      const wrapper = shallowMount(SimiliarCombosButton, {
        propsData: {
          comboId: "fake-id",
          cards: ["card 1", "card 2"],
        },
      });
      const vm = wrapper.vm as VueComponent;

      await vm.lookupSimiliarCombos();

      expect(vm.hasSimiliarCombos).toBe(false);
    });

    it("sets hasSimiliarCombos to true when combos return from search", async () => {
      jest.mocked(search).mockResolvedValue({
        combos: [makeFakeCombo()],
        message: "",
        vendor: "cardkingdom",
        sort: "colors",
        order: "descending",
        errors: [],
      });

      const wrapper = shallowMount(SimiliarCombosButton, {
        propsData: {
          id: "fake-id",
          cards: ["card 1", "card 2"],
        },
      });
      const vm = wrapper.vm as VueComponent;

      await vm.lookupSimiliarCombos();

      expect(vm.hasSimiliarCombos).toBe(true);
    });
  });

  describe("goToSimiliarCombos", () => {
    it("reroutes to search page", async () => {
      const pushSpy = jest.fn();
      const wrapper = shallowMount(SimiliarCombosButton, {
        propsData: {
          comboId: "fake-id",
          cards: ["card 1", "card 2"],
        },
        mocks: {
          $router: {
            push: pushSpy,
          },
          $gtag: {
            event: jest.fn(),
          },
        },
      });
      const vm = wrapper.vm as VueComponent;

      await vm.goToSimiliarCombos();

      expect(pushSpy).toBeCalledTimes(1);
      expect(pushSpy).toBeCalledWith({
        path: "/search/",
        query: {
          q: `-spellbookid:fake-id card="card 1" card="card 2"`,
        },
      });
    });

    it("sends an analytics event", async () => {
      const eventSpy = jest.fn();
      const wrapper = shallowMount(SimiliarCombosButton, {
        propsData: {
          comboId: "fake-id",
          cards: ["card 1", "card 2"],
        },
        mocks: {
          $router: {
            push: jest.fn(),
          },
          $gtag: {
            event: eventSpy,
          },
        },
      });
      const vm = wrapper.vm as VueComponent;

      await vm.goToSimiliarCombos();

      expect(eventSpy).toBeCalledTimes(1);
      expect(eventSpy).toBeCalledWith(
        "Combos Using These Cards Button Clicked",
        {
          event_category: "Combo Detail Page Actions",
        }
      );
    });
  });
});
