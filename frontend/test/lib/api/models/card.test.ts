/* eslint-disable @typescript-eslint/no-non-null-assertion */
import scryfall from "scryfall-client";
import Card from "@/lib/api/models/card";
import getExternalCardData from "@/lib/get-external-card-data";

jest.mock("@/lib/get-external-card-data");
jest.mock("scryfall-client");

describe("Card", () => {
  beforeEach(() => {
    jest.mocked(getExternalCardData).mockReturnValue({
      aliases: ["biollante plant beast form"],

      isBanned: false,
      isPreview: false,
      isFeatured: false,
      images: {
        oracle: "https://c1.scryfall.com/file/oracle.jpg",
        artCrop: "https://c1.scryfall.com/file/art.jpg",
      },
      prices: {
        tcgplayer: 123,
        cardkingdom: 456,
      },
      edhrecLink: "https//edhrec.com/card",
    });
  });

  it("has a name attribute", () => {
    const card = new Card("Sydri, Galvanic Genius");

    expect(card.name).toEqual("Sydri, Galvanic Genius");
  });

  describe("getImageUrl", () => {
    it("gets the art crop url", () => {
      const card = new Card("Sydri, Galvanic Genius");

      expect(card.getImageUrl("oracle")).toBe(
        "https://c1.scryfall.com/file/oracle.jpg"
      );
    });

    it("gets the oracle image url", () => {
      const card = new Card("Sydri, Galvanic Genius");

      expect(card.getImageUrl("artCrop")).toBe(
        "https://c1.scryfall.com/file/art.jpg"
      );
    });
  });

  describe("getPrice", () => {
    it("gets the tcgplayer price", () => {
      const card = new Card("Sydri, Galvanic Genius");

      expect(card.getPrice("tcgplayer")).toBe(123);
    });

    it("gets the cardkigndom price", () => {
      const card = new Card("Sydri, Galvanic Genius");

      expect(card.getPrice("cardkingdom")).toBe(456);
    });
  });

  describe("matchesName", () => {
    it("returns true when the input is the name", () => {
      const card = new Card("Sydri, Galvanic Genius");

      expect(card.matchesName("Sydri, Galvanic Genius")).toBe(true);
      expect(card.matchesName("Arjun, the Shifting Flame")).toBe(false);
    });

    it("returns true for partial matches", () => {
      const card = new Card("Sydri, Galvanic Genius");

      expect(card.matchesName("Sydri")).toBe(true);
      expect(card.matchesName("alv")).toBe(true);
      expect(card.matchesName("nius")).toBe(true);
    });

    it("disregards punctuation and casing", () => {
      const card = new Card("Sydri, Galvanic Genius");

      expect(card.matchesName("sYd~Ri G!alva??nIc GENIUS")).toBe(true);
    });

    it("matches aliases if the main name does not match", () => {
      const card = new Card("Nethroi, Apex of Death");

      expect(card.matchesName("Biollante, Plant Beast Form")).toBe(true);
      expect(card.matchesName("Plant Beast")).toBe(true);
      expect(card.matchesName("biOllAnTe! PlaNt BeA,st Fo---rM")).toBe(true);
    });
  });

  describe("matchesNameExactly", () => {
    it("returns true when the input is the name", () => {
      const card = new Card("Sydri, Galvanic Genius");

      expect(card.matchesNameExactly("Sydri, Galvanic Genius")).toBe(true);
      expect(card.matchesNameExactly("Arjun, the Shifting Flame")).toBe(false);
    });

    it("returns false for partial matches", () => {
      const card = new Card("Sydri, Galvanic Genius");

      expect(card.matchesNameExactly("Sydri")).toBe(false);
    });

    it("disregards punctuation and casing", () => {
      const card = new Card("Sydri, Galvanic Genius");

      expect(card.matchesNameExactly("sYd~Ri G!alva??nIc GENIUS")).toBe(true);
    });

    it("checks aliases when name does not match", () => {
      const card = new Card("Nethroi, Apex of Death");

      expect(card.matchesNameExactly("Biollante, Plant Beast Form")).toBe(true);
      expect(card.matchesNameExactly("Plant Beast")).toBe(false);
      expect(card.matchesNameExactly("biOllAnTe! PlaNt BeA,st Fo---rM")).toBe(
        true
      );
    });
  });

  describe("toString", () => {
    it("returns the raw name", () => {
      const card = new Card("Sydri, Galvanic Genius");

      expect(card.toString()).toEqual("Sydri, Galvanic Genius");
      expect(`text ${card} text`).toEqual("text Sydri, Galvanic Genius text");
    });
  });

  describe("getScryfallData", () => {
    it("calls out to scryfall.getCard", async () => {
      const payload = {};

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jest.mocked(scryfall.getCard).mockResolvedValue(payload as any);

      const card = new Card("Sydri, Galvanic Genius");

      const scryfallResult = await card.getScryfallData();

      expect(scryfallResult).toBe(payload);
      expect(scryfall.getCard).toBeCalledTimes(1);
      expect(scryfall.getCard).toBeCalledWith(
        "Sydri, Galvanic Genius",
        "exactName"
      );
    });
  });

  describe("isFeatured", () => {
    it("returns false when card is not featured", () => {
      const card = new Card("Arjun, the Shifting Flame");

      expect(card.isFeatured()).toBe(false);
    });

    it("returns true when card is featured", () => {
      jest.mocked(getExternalCardData).mockReturnValue({
        aliases: [],
        isBanned: false,
        isPreview: false,
        isFeatured: true,
        images: {
          oracle: "https://c1.scryfall.com/file/oracle.jpg",
          artCrop: "https://c1.scryfall.com/file/art.jpg",
        },
        prices: {
          tcgplayer: 123,
          cardkingdom: 456,
        },
        edhrecLink: "https//edhrec.com/card",
      });
      const card = new Card("Arjun, the Shifting Flame");

      expect(card.isFeatured()).toBe(true);
    });
  });

  describe("isBanned", () => {
    it("returns false when card is not featured", () => {
      const card = new Card("Arjun, the Shifting Flame");

      expect(card.isBanned()).toBe(false);
    });

    it("returns true when card is featured", () => {
      jest.mocked(getExternalCardData).mockReturnValue({
        aliases: [],
        isBanned: true,
        isPreview: false,
        isFeatured: false,
        images: {
          oracle: "https://c1.scryfall.com/file/oracle.jpg",
          artCrop: "https://c1.scryfall.com/file/art.jpg",
        },
        prices: {
          tcgplayer: 123,
          cardkingdom: 456,
        },
        edhrecLink: "https//edhrec.com/card",
      });
      const card = new Card("Arjun, the Shifting Flame");

      expect(card.isBanned()).toBe(true);
    });
  });

  describe("isPreview", () => {
    it("returns false when card is not featured", () => {
      const card = new Card("Arjun, the Shifting Flame");

      expect(card.isPreview()).toBe(false);
    });

    it("returns true when card is featured", () => {
      jest.mocked(getExternalCardData).mockReturnValue({
        aliases: [],
        isBanned: false,
        isPreview: true,
        isFeatured: false,
        images: {
          oracle: "https://c1.scryfall.com/file/oracle.jpg",
          artCrop: "https://c1.scryfall.com/file/art.jpg",
        },
        prices: {
          tcgplayer: 123,
          cardkingdom: 456,
        },
        edhrecLink: "https//edhrec.com/card",
      });
      const card = new Card("Arjun, the Shifting Flame");

      expect(card.isPreview()).toBe(true);
    });
  });

  describe("getEdhrecLink", () => {
    it("returns the edhrec link", () => {
      const card = new Card("Arjun, the Shifting Flame");

      expect(card.getEdhrecLink()).toBe("https//edhrec.com/card");
    });
  });

  describe("toString", () => {
    it("returns the raw name", () => {
      const card = new Card("Sydri, Galvanic Genius");

      expect(card.toString()).toEqual("Sydri, Galvanic Genius");
      expect(`text ${card} text`).toEqual("text Sydri, Galvanic Genius text");
    });
  });
});
