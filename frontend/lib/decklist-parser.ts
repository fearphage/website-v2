import scryfall from "scryfall-client";
import lookup from "@/lib/api/spellbook-api";

import type {
  FormattedApiResponse,
  ColorIdentityColors,
} from "@/lib/api/types";
import type Card from "@/lib/api/models/card";

// this is a little complicated, but basically
// we pull off the quantity for the card (if any)
// when the card is in one of the following forms
// * 123 Card Name
// * 123x Card Name
// * 123X Card Name
// this is saved as the second match in the array
// returned by the match method, the card name is
// saved in the 3rd match
const DECK_ENTRY_REGEX = /^(\d*[xX]?\s)?(.*)$/;

type CombosInDecklist = {
  combosInDecklist: FormattedApiResponse[];
  potentialCombos: FormattedApiResponse[];
  missingCardsForPotentialCombos: Card[];
};

type Deck = {
  cards: string[];
  numberOfCards: number;
  colorIdentity: ColorIdentityColors[];
};

function filterOutInvalidCardNameEntries(cardName: string) {
  const normalizedCardName = cardName.trim();
  // filter out empty values and values that start with //
  // (common way to denote sections of a decklist, so it shouldn't
  // be considered part of the decklist)
  return normalizedCardName && !normalizedCardName.startsWith("//");
}

function parseCardData(deckEntry: string): [string, number] {
  // it's technically possible for match to return null
  // so we need to default to an empty array to destructure
  // the variables
  const [, quantityAsString, name] = deckEntry.match(DECK_ENTRY_REGEX) || [];
  // if the quantity doesn't exist, then we default to 1
  // and we remove the x (lowercase or uppercase)
  // before casting it to a number
  const quantity = Number((quantityAsString || "1").replace(/x/i, ""));

  return [name, quantity];
}

function removeSetAndCollectorNumberData(cardName: string): string {
  // removes set name or collector data, which we assume
  // is anything after a space followed by an open parenthesis
  // NOTE: there are a handful of magic cards that use ( in the
  // the name, but they are all silver border so far and unlikely
  // to be present in the Commander Spellbook database
  return cardName.split(" (")[0].trim();
}

function findMissingCards(decklist: string[], cardsInCombo: Card[]): Card[] {
  const missingCards: Card[] = [];

  cardsInCombo.forEach((card) => {
    if (missingCards.length > 1) {
      // no need to keep checking if we know up front
      // that we're missing more than one card
      return;
    }

    const cardIsInDeck = decklist.find((cardName) => {
      return card.matchesNameExactly(cardName);
    });

    if (!cardIsInDeck) {
      missingCards.push(card);
    }
  });

  return missingCards;
}

async function getColorIdentityFromDeck(
  cards: string[]
): Promise<ColorIdentityColors[]> {
  try {
    const cardsFromScryfall = await scryfall.getCollection(
      cards.map((cardName) => {
        return {
          name: cardName,
        };
      })
    );
    const allColors = cardsFromScryfall.reduce((identity, card) => {
      identity.push(...card.color_identity);
      return identity;
    }, [] as ColorIdentityColors[]);

    // this is a quick hack to filter
    // out any redundant colors, so we
    // have a nice small array representing
    // the colors
    return Array.from(new Set(allColors)) satisfies ColorIdentityColors[];
  } catch (err) {
    // in case we encounter an error in Scryfall
    // best to just default to a WUBRG identity
    return ["w", "u", "b", "r", "g"];
  }
}

export async function convertDecklistToDeck(decklist: string): Promise<Deck> {
  let numberOfCardsInDeck = 0;

  const cards = decklist
    .split("\n")
    .filter(filterOutInvalidCardNameEntries)
    .map((deckEntry) => {
      const [cardName, quantity] = parseCardData(deckEntry);

      numberOfCardsInDeck += quantity;

      return cardName;
    })
    .map(removeSetAndCollectorNumberData);

  const colorIdentity = await getColorIdentityFromDeck(cards);

  return {
    numberOfCards: numberOfCardsInDeck,
    cards,
    colorIdentity,
  };
}

// this function loops through the entire combo database
// to pull out any combos where the entire set of cards
// are available in the provided decklist
// and any combos where only a single card is missing
export async function findCombosFromDecklist(
  decklist: string[]
): Promise<CombosInDecklist> {
  const combos = await lookup();
  const combosInDecklist: FormattedApiResponse[] = [];
  const potentialCombos: FormattedApiResponse[] = [];
  const missingCardsForPotentialCombos: Card[] = [];

  combos.forEach((combo) => {
    const missingCards = findMissingCards(decklist, combo.cards);

    if (missingCards.length === 0) {
      combosInDecklist.push(combo);
    } else if (missingCards.length === 1) {
      potentialCombos.push(combo);
      missingCardsForPotentialCombos.push(missingCards[0]);
    }
  });

  return {
    combosInDecklist,
    potentialCombos,
    missingCardsForPotentialCombos,
  };
}
