import { shallowMount } from "@vue/test-utils";
import type { Router, VueComponent } from "@/test/types";
import AdvancedSearchPage from "@/pages/advanced-search.vue";

describe("AdvancedSearchPage", () => {
  let $router: Router;

  beforeEach(() => {
    $router = {
      push: jest.fn(),
    };
  });

  it("renders a placeholder query until a search term is entered", async () => {
    const wrapper = shallowMount(AdvancedSearchPage, {
      mocks: {
        $router,
      },
      stubs: {
        ArtCircle: true,
        NuxtLink: true,
        MultiSearchInput: true,
        RadioSearchInput: true,
      },
    });

    expect(wrapper.find("#search-query span").text()).toContain(
      "(your query will populate here"
    );

    await wrapper.setData({
      cards: [
        {
          value: "cardname",
          operator: ":",
        },
      ],
    });

    expect(wrapper.find("#search-query span").text()).toContain("cardname");
    expect(wrapper.find("#search-query span").text()).not.toContain(
      "(your query will populate here"
    );
  });

  it("only renders vendor when price is added to query", async () => {
    const wrapper = shallowMount(AdvancedSearchPage, {
      mocks: {
        $router,
      },
      stubs: {
        ArtCircle: true,
        NuxtLink: true,
        MultiSearchInput: true,
        RadioSearchInput: true,
      },
    });

    expect(wrapper.find("#vendor").exists()).toBe(false);

    await wrapper.setData({
      price: [{ value: "1", operator: "<-number" }],
    });

    expect(wrapper.find("#vendor").exists()).toBe(true);

    await wrapper.setData({
      price: [
        { value: "     ", operator: "<-number" },
        { value: "", operator: "<-number" },
        { value: "", operator: "<-number" },
        { value: "", operator: "<-number" },
      ],
    });

    expect(wrapper.find("#vendor").exists()).toBe(false);

    await wrapper.setData({
      price: [
        { value: "", operator: "<-number" },
        { value: "", operator: "<-number" },
        { value: "", operator: "<-number" },
        { value: "", operator: "<-number" },
        { value: "3", operator: "<-number" },
        { value: "", operator: "<-number" },
        { value: "", operator: "<-number" },
        { value: "", operator: "<-number" },
      ],
    });
    expect(wrapper.find("#vendor").exists()).toBe(true);
  });

  describe("submit", () => {
    it("redirects to search with query based on data", () => {
      const wrapper = shallowMount(AdvancedSearchPage, {
        mocks: {
          $router,
        },
        stubs: {
          ArtCircle: true,
          NuxtLink: true,
          MultiSearchInput: true,
          RadioSearchInput: true,
        },
      });

      wrapper.setData({
        cards: [
          {
            value: "cardname",
            operator: ":",
          },
          {
            value: "card 2",
            operator: "=",
          },
        ],
        cardAmounts: [
          {
            value: "3",
            operator: ">-number",
          },
          {
            value: "card 4",
            operator: "=-exclude",
          },
        ],
        prerequisites: [
          {
            value: "pre 1",
            operator: ":",
          },
          {
            value: "2",
            operator: ">-number",
          },
        ],
        steps: [
          {
            value: "step 1",
            operator: ":",
          },
          {
            value: "3",
            operator: ">-number",
          },
        ],
        results: [
          {
            value: "result 1",
            operator: ":",
          },
          {
            value: "result 2",
            operator: "=",
          },
        ],
        colorIdentity: [
          {
            value: "temur",
            operator: ":",
          },
        ],
        previewed: "exclude",
        banned: "is",
      });

      (wrapper.vm as VueComponent).submit();

      expect($router.push).toBeCalledTimes(1);
      expect($router.push).toBeCalledWith({
        path: "/search/",
        query: {
          q: `cardname card="card 2" cards>3 -card="card 4" ci:temur pre:"pre 1" prerequisites>2 step:"step 1" steps>3 result:"result 1" result="result 2" exclude:previewed is:banned`,
        },
      });
    });

    it("ignores data with empty spaces", () => {
      const wrapper = shallowMount(AdvancedSearchPage, {
        mocks: {
          $router,
        },
        stubs: {
          ArtCircle: true,
          NuxtLink: true,
          MultiSearchInput: true,
          RadioSearchInput: true,
        },
      });
      wrapper.setData({
        cards: [
          { value: "card 1", operator: ":" },
          { value: "", operator: ":" },
          { value: "        ", operator: ":" },
          { value: "card 2", operator: ":" },
        ],
      });

      (wrapper.vm as VueComponent).submit();

      expect($router.push).toBeCalledTimes(1);
      expect($router.push).toBeCalledWith({
        path: "/search/",
        query: {
          q: `card:"card 1" card:"card 2"`,
        },
      });
    });

    it("uses single quotes when data includes double quotes", () => {
      const wrapper = shallowMount(AdvancedSearchPage, {
        mocks: {
          $router,
        },
        stubs: {
          ArtCircle: true,
          NuxtLink: true,
          MultiSearchInput: true,
          RadioSearchInput: true,
        },
      });
      wrapper.setData({
        cards: [{ value: 'Card with "symbols"', operator: ":" }],
      });

      (wrapper.vm as VueComponent).submit();

      expect($router.push).toBeCalledTimes(1);
      expect($router.push).toBeCalledWith({
        path: "/search/",
        query: {
          q: `card:'Card with "symbols"'`,
        },
      });
    });

    it("uses no quotes when data has only alhpanumeric characters", () => {
      const wrapper = shallowMount(AdvancedSearchPage, {
        mocks: {
          $router,
        },
        stubs: {
          ArtCircle: true,
          NuxtLink: true,
          MultiSearchInput: true,
          RadioSearchInput: true,
        },
      });
      wrapper.setData({
        cards: [{ value: "card123", operator: "=" }],
      });

      (wrapper.vm as VueComponent).submit();

      expect($router.push).toBeCalledTimes(1);
      expect($router.push).toBeCalledWith({
        path: "/search/",
        query: {
          q: `card=card123`,
        },
      });
    });

    it("uses no key when key is card and there are only alphanumeric characters", () => {
      const wrapper = shallowMount(AdvancedSearchPage, {
        mocks: {
          $router,
        },
        stubs: {
          ArtCircle: true,
          NuxtLink: true,
          MultiSearchInput: true,
          RadioSearchInput: true,
        },
      });
      wrapper.setData({
        cards: [{ value: "card123", operator: ":" }],
      });

      (wrapper.vm as VueComponent).submit();

      expect($router.push).toBeCalledTimes(1);
      expect($router.push).toBeCalledWith({
        path: "/search/",
        query: {
          q: `card123`,
        },
      });
    });

    it("adds an s to keys that are not ci (transforms to colors) or pre (transforms to prerequisites) when they are setting a number of the key", () => {
      const wrapper = shallowMount(AdvancedSearchPage, {
        mocks: {
          $router,
        },
        stubs: {
          ArtCircle: true,
          NuxtLink: true,
          MultiSearchInput: true,
          RadioSearchInput: true,
        },
      });
      wrapper.setData({
        cardAmounts: [{ value: "5", operator: ">-number" }],
        colorIdentity: [{ value: "5", operator: ">-number" }],
        prerequisites: [{ value: "5", operator: ">-number" }],
        steps: [{ value: "5", operator: ">-number" }],
        results: [{ value: "5", operator: ">-number" }],
      });

      (wrapper.vm as VueComponent).submit();

      expect($router.push).toBeCalledTimes(1);
      expect($router.push).toBeCalledWith({
        path: "/search/",
        query: {
          q: `cards>5 colors>5 prerequisites>5 steps>5 results>5`,
        },
      });
    });

    it("handles exclusion keys", () => {
      const wrapper = shallowMount(AdvancedSearchPage, {
        mocks: {
          $router,
        },
        stubs: {
          ArtCircle: true,
          NuxtLink: true,
          MultiSearchInput: true,
          RadioSearchInput: true,
        },
      });
      wrapper.setData({
        cards: [{ value: "card 1", operator: ":-exclude" }],
      });

      (wrapper.vm as VueComponent).submit();

      expect($router.push).toBeCalledTimes(1);
      expect($router.push).toBeCalledWith({
        path: "/search/",
        query: {
          q: `-card:"card 1"`,
        },
      });
    });

    it("only applies previewed property when `include` is not used", () => {
      const wrapper = shallowMount(AdvancedSearchPage, {
        mocks: {
          $router,
        },
        stubs: {
          ArtCircle: true,
          NuxtLink: true,
          MultiSearchInput: true,
          RadioSearchInput: true,
        },
      });
      wrapper.setData({
        previewed: "include",
      });

      (wrapper.vm as VueComponent).submit();

      expect($router.push).not.toBeCalled();

      wrapper.setData({
        previewed: "exclude",
      });
      (wrapper.vm as VueComponent).submit();

      expect($router.push).toBeCalledWith({
        path: "/search/",
        query: {
          q: "exclude:previewed",
        },
      });

      wrapper.setData({
        previewed: "is",
      });
      (wrapper.vm as VueComponent).submit();

      expect($router.push).toBeCalledWith({
        path: "/search/",
        query: {
          q: "is:previewed",
        },
      });
    });

    it("only applies banned property when `exclude` is not used", () => {
      const wrapper = shallowMount(AdvancedSearchPage, {
        mocks: {
          $router,
        },
        stubs: {
          ArtCircle: true,
          NuxtLink: true,
          MultiSearchInput: true,
          RadioSearchInput: true,
        },
      });
      wrapper.setData({
        banned: "exclude",
      });

      (wrapper.vm as VueComponent).submit();

      expect($router.push).not.toBeCalled();

      wrapper.setData({
        banned: "include",
      });
      (wrapper.vm as VueComponent).submit();

      expect($router.push).toBeCalledWith({
        path: "/search/",
        query: {
          q: "include:banned",
        },
      });

      wrapper.setData({
        banned: "is",
      });
      (wrapper.vm as VueComponent).submit();

      expect($router.push).toBeCalledWith({
        path: "/search/",
        query: {
          q: "is:banned",
        },
      });
    });

    it("only applies vendor property when `cardkingdom` is not used and price exists", () => {
      const wrapper = shallowMount(AdvancedSearchPage, {
        mocks: {
          $router,
        },
        stubs: {
          ArtCircle: true,
          NuxtLink: true,
          MultiSearchInput: true,
          RadioSearchInput: true,
        },
      });
      wrapper.setData({
        vendor: "cardkingdom",
      });

      (wrapper.vm as VueComponent).submit();

      expect($router.push).not.toBeCalled();

      wrapper.setData({
        vendor: "tcgplayer",
      });

      (wrapper.vm as VueComponent).submit();

      expect($router.push).not.toBeCalled();

      wrapper.setData({
        price: [{ value: "1", operator: ">-number" }],
        vendor: "cardkingdom",
      });

      (wrapper.vm as VueComponent).submit();

      expect($router.push).toBeCalledWith({
        path: "/search/",
        query: {
          q: "price>1",
        },
      });

      wrapper.setData({
        price: [{ value: "1", operator: ">-number" }],
        vendor: "tcgplayer",
      });
      (wrapper.vm as VueComponent).submit();

      expect($router.push).toBeCalledWith({
        path: "/search/",
        query: {
          q: "price>1 vendor:tcgplayer",
        },
      });
    });

    it("prevents submission if query is empty", () => {
      const wrapper = shallowMount(AdvancedSearchPage, {
        mocks: {
          $router,
        },
        stubs: {
          ArtCircle: true,
          NuxtLink: true,
          MultiSearchInput: true,
          RadioSearchInput: true,
        },
      });
      const vm = wrapper.vm as VueComponent;

      vm.submit();

      expect($router.push).not.toBeCalled();
      expect(vm.validationError).toBe("No search queries entered.");
    });

    it("prevents submission if query is not empty, but only has blank spaces", () => {
      const wrapper = shallowMount(AdvancedSearchPage, {
        mocks: {
          $router,
        },
        stubs: {
          ArtCircle: true,
          NuxtLink: true,
          MultiSearchInput: true,
          RadioSearchInput: true,
        },
      });
      const vm = wrapper.vm as VueComponent;

      wrapper.setData({
        cards: [
          { value: "", operator: ":" },
          { value: "     ", operator: ":" },
        ],
        results: [{ value: " ", operator: ":" }],
      });

      vm.submit();

      expect($router.push).not.toBeCalled();
      expect(vm.validationError).toBe("No search queries entered.");
    });

    it("prevents submission if query contains both double and single quotes", () => {
      const wrapper = shallowMount(AdvancedSearchPage, {
        mocks: {
          $router,
        },
        stubs: {
          ArtCircle: true,
          NuxtLink: true,
          MultiSearchInput: true,
          RadioSearchInput: true,
        },
      });
      const vm = wrapper.vm as VueComponent;
      wrapper.setData({
        cards: [
          { value: `Card with "symbols" and 'symbols'`, operator: ":" },
          { value: "basic card", operator: ":" },
        ],
      });

      vm.submit();

      expect($router.push).not.toBeCalled();
      expect(vm.validationError).toBe(
        "Check for errors in your search terms before submitting."
      );
    });

    it("prevents submission if query contains non-numeric values for numeric operator", () => {
      const wrapper = shallowMount(AdvancedSearchPage, {
        mocks: {
          $router,
        },
        stubs: {
          ArtCircle: true,
          NuxtLink: true,
          MultiSearchInput: true,
          RadioSearchInput: true,
        },
      });
      const vm = wrapper.vm as VueComponent;
      wrapper.setData({
        cardAmounts: [{ value: "card 1", operator: ":-number" }],
        cards: [{ value: "basic card", operator: ":" }],
      });

      vm.submit();

      expect($router.push).not.toBeCalled();
      expect(vm.validationError).toBe(
        "Check for errors in your search terms before submitting."
      );
    });
  });

  describe("validate", () => {
    it("resets global validation error message", () => {
      const wrapper = shallowMount(AdvancedSearchPage, {
        stubs: {
          ArtCircle: true,
          NuxtLink: true,
          MultiSearchInput: true,
          RadioSearchInput: true,
        },
      });
      const vm = wrapper.vm as VueComponent;

      wrapper.setData({
        validationError: "some error",
      });

      vm.validate();

      expect(vm.validationError).toBe("");
    });

    it("returns true when there is a validation error", () => {
      const wrapper = shallowMount(AdvancedSearchPage, {
        stubs: {
          ArtCircle: true,
          NuxtLink: true,
          MultiSearchInput: true,
          RadioSearchInput: true,
        },
      });
      const vm = wrapper.vm as VueComponent;

      expect(vm.validate()).toBe(false);

      wrapper.setData({
        cards: [{ value: `' card "`, operator: ":" }],
      });

      expect(vm.validate()).toBe(true);
    });

    it("adds validation error to inputs for mixing quotes", () => {
      const wrapper = shallowMount(AdvancedSearchPage, {
        stubs: {
          ArtCircle: true,
          NuxtLink: true,
          MultiSearchInput: true,
          RadioSearchInput: true,
        },
      });
      const vm = wrapper.vm as VueComponent;
      const cards = [
        { value: `' card 1"`, operator: ":", error: "" },
        { value: " card 2", operator: ":" },
        { value: `' card 3"`, operator: ":" },
        { value: "card with '", operator: ":" },
        { value: 'card with "', operator: ":" },
      ];

      wrapper.setData({
        cards,
      });

      expect(vm.validate()).toBe(true);

      expect(cards[0].error).toBe(
        "Contains both single and double quotes. A card name may only use one kind."
      );
      expect(cards[1].error).toBeFalsy();
      expect(cards[2].error).toBe(
        "Contains both single and double quotes. A card name may only use one kind."
      );
      expect(cards[3].error).toBeFalsy();
      expect(cards[4].error).toBeFalsy();
    });

    it("adds validation error for providing non-numeric values for numeric operators", () => {
      const wrapper = shallowMount(AdvancedSearchPage, {
        stubs: {
          ArtCircle: true,
          NuxtLink: true,
          MultiSearchInput: true,
          RadioSearchInput: true,
        },
      });
      const vm = wrapper.vm as VueComponent;
      const cardAmounts = [
        { value: "card 1", operator: ":-number", error: "" },
        { value: "2", operator: ":-number" },
        { value: "3.05", operator: ":-number" },
      ];

      wrapper.setData({
        cardAmounts,
      });

      expect(vm.validate()).toBe(true);

      expect(cardAmounts[0].error).toBe(
        "Contains a non-integer. Use a full number instead."
      );
      expect(cardAmounts[1].error).toBeFalsy();
      expect(cardAmounts[2].error).toBe(
        "Contains a non-integer. Use a full number instead."
      );
    });
  });

  describe("updateRadio", () => {
    it("updates model with value", async () => {
      const FakeRadioSearchInput = {
        template: "<div></div>",
      };
      const wrapper = shallowMount(AdvancedSearchPage, {
        stubs: {
          ArtCircle: true,
          NuxtLink: true,
          MultiSearchInput: true,
          RadioSearchInput: FakeRadioSearchInput,
        },
      });
      const vm = wrapper.vm as VueComponent;

      await wrapper.setData({
        // need a price to expose the vendor radio button
        price: [{ value: "3", operator: "<-number" }],
        vendor: "cardkingdom",
        previewed: "include",
        banned: "exclude",
      });

      const radioButtons = wrapper.findAllComponents(FakeRadioSearchInput);
      const vendorInput = radioButtons.at(0);
      const previewedInput = radioButtons.at(1);
      const bannedInput = radioButtons.at(2);

      await vendorInput.vm.$emit("update-radio", "tcgplayer");
      expect(vm.vendor).toBe("tcgplayer");

      await previewedInput.vm.$emit("update-radio", "is");
      expect(vm.previewed).toBe("is");

      await bannedInput.vm.$emit("update-radio", "is");

      expect(vm.banned).toBe("is");
    });
  });
});
