import { shallowMount } from "@vue/test-utils";
import PlaceholderText from "@/components/PlaceholderText.vue";

describe("PlaceholderText", () => {
  it("creates a text-bar element with a set width", () => {
    const wrapper = shallowMount(PlaceholderText);

    expect(wrapper.find(".text-bar").attributes("style")).toMatch(
      /width: \d*%/
    );
  });
});
