<template>
  <div>
    <div class="container pt-6 mb-6">
      <ArtCircle
        card-name="Goblin Guide"
        artist="Mark Zug"
        class="m-auto md:block hidden"
      />
      <h1 class="heading-title">Syntax Guide</h1>
      <p class="text-center">
        A variety of parameters can be used to search for combos.
      </p>
    </div>

    <div class="border-b-2 border-gray-400 w-full">
      <div class="container pb-6">
        <div class="flex flex-col md:flex-row md:flex-wrap">
          <nuxt-link
            v-for="section in sections"
            :key="section.id"
            :to="'#' + section.id"
            class="button flex-grow text-center md:w-1/4"
          >
            <div>
              {{ section.text }}
            </div>
          </nuxt-link>
        </div>

        <p class="pl-4 pr-4">
          No matter what parameter is used, capitalization will be disregarded,
          so a search of
          <code>CARD:"BREATH OF" COLORIDENTITY:TEMUR RESULT:INFINITE</code>
          is equivalent to
          <code>card:"breath of" coloridentity:temur result:infinite</code>
        </p>
      </div>
    </div>

    <SearchGuide
      heading="Cards"
      heading-card-name="Peek"
      heading-artist-name="Adam Rex"
      :snippets="cardSnippets"
    >
      <p>
        You can find cards in a combo simply by entering the card names, or
        parts of the card names, into the search bar. Passing multiple card
        names will result in combos that have cards that contain those words
        among the names of the cards in the combo.
      </p>
      <p>
        You can lookup longer names for cards by using the
        <code>card</code> key with single (<code>'</code>) or double
        (<code>"</code>) quotes. This will find combos that contain cards with
        names that include the whole phrase. For instance,
        <code>card:dream</code>, will include combos that contain the card
        Sickening Dreams, Dream Stalker, Dreamtail Heron, etc. If
        <code>card:"dream stalk"</code> is used, then only combos that contain
        Dream Stalker wil lbe displayed.
      </p>
      <p>
        To find combos with an exact card name, use
        <code>card=</code> instead.
      </p>
      <p>
        Use <code>-card</code> To find combos that do not include a certain
        card.
      </p>
      <p>
        The <code>=</code>, <code>&gt;</code>, <code>&lt;</code>,
        <code>&gt;=</code>, <code>&lt;=</code> operators can also be used with
        numbers to to find combos restricted by the number of cards.
      </p>

      <p>An alias for <code>card</code> is <code>cards</code>.</p>
    </SearchGuide>

    <SearchGuide
      heading="Color Identity"
      heading-card-name="Fist of Suns"
      heading-artist-name="Arnie Swekel"
      :snippets="colorIdentitySnippets"
    >
      <p>
        The color identity of a combo determines what colors the combo is
        comprised of. The most basic search is in the form,
        <code>coloridentity:bug</code>, which in this example finds all the
        combos that can be played within a green, blue, black color identity.
      </p>

      <p>
        The <code>coloridentity</code> parameter accepts full color names like
        <code>green</code> or the single character representations of the colors
        (<code>w</code>, <code>u</code>, <code>b</code>, <code>r</code>,
        <code>g</code>). You can use the names for color combinations such as
        <code>boros</code>, <code>izzet</code>, <code>naya</code>,
        <code>sultai</code>, etc.
      </p>

      <p>
        The <code>=</code>, <code>&gt;</code>, <code>&lt;</code>,
        <code>&gt;=</code>, <code>&lt;=</code> operators can also be used to
        find combos with a range of color identities. These operators can be
        used with the color values or a number to indicate the number of colors
        required for the combo.
      </p>

      <p>
        Aliases for the <code>coloridentity</code> key include
        <code>color_identity</code>, <code>color</code>, <code>colors</code>,
        <code>commander</code>, <code>id</code>, <code>ids</code>,
        <code>c</code>, and <code>ci</code>.
      </p>
    </SearchGuide>

    <SearchGuide
      heading="Prerequisites"
      heading-card-name="Long-Term Plans"
      heading-artist-name="Ben Thompson"
      :snippets="prerequisiteSnippets"
    >
      <p>
        The prerequisites are the elements that need to be in place before the
        combo can be initiated.
      </p>

      <p>
        You can also use <code>-prerequisites</code> to find combos that do not
        contain the value passed.
      </p>

      <p>
        The <code>=</code>, <code>&gt;</code>, <code>&lt;</code>,
        <code>&gt;=</code>, <code>&lt;=</code> operators can also be used with
        numbers to to find combos restricted by the number of prerequisites.
      </p>

      <p>
        Aliases for <code>prerequisites</code> are <code>prerequisite</code> and
        <code>pre</code>.
      </p>
    </SearchGuide>

    <SearchGuide
      heading="Steps"
      heading-card-name="The Grand Calcutron"
      heading-artist-name="Sean Murray"
      :snippets="stepSnippets"
    >
      <p>
        The steps are the elements that need to be followed to execute the
        combo.
      </p>

      <p>
        You can also use <code>-steps</code> to find combos that do not contain
        steps with the value passed.
      </p>

      <p>
        The <code>=</code>, <code>&gt;</code>, <code>&lt;</code>,
        <code>&gt;=</code>, <code>&lt;=</code> operators can also be used with
        numbers to to find combos restricted by the number of steps.
      </p>

      <p>An alias for <code>steps</code> is <code>step</code>.</p>
    </SearchGuide>

    <SearchGuide
      heading="Results"
      heading-card-name="Revel in Riches"
      heading-artist-name="Eric Deschamps"
      :snippets="resultSnippets"
    >
      <p>
        The results are the effects that occur as a result of completing the
        combo.
      </p>

      <p>
        You can also use <code>-results</code> to find combos that do not
        contain results with the value passed.
      </p>

      <p>
        The <code>=</code>, <code>&gt;</code>, <code>&lt;</code>,
        <code>&gt;=</code>, <code>&lt;=</code> operators can also be used with
        numbers to to find combos restricted by the number of results.
      </p>

      <p>An alias for <code>results</code> is <code>result</code>.</p>
    </SearchGuide>

    <SearchGuide
      heading="Spellbook ID"
      heading-card-name="Fractured Identity"
      heading-artist-name="Yongjae Choi"
      :snippets="idSnippets"
    >
      <p>
        You can also search by <code>spellbookid</code> if you want to find a
        specific combo by its id. Using more than one
        <code>spellbookid</code> will result in a query error.
      </p>

      <p>
        <code>sid</code> and <code>sbid</code> are aliases for
        <code>spellbookid</code>.
      </p>

      <p>
        A more useful parameter to use is <code>-spellbookid</code>, to more
        easilly omit certain combos. For instance, for finding all combos using
        Basalt Monolith and Mesmeric Orb except
        <nuxt-link to="/combo/450/">combo 450</nuxt-link>.
      </p>
    </SearchGuide>

    <SearchGuide
      heading="Popularity"
      heading-card-name="Korvold, Fae-Cursed King"
      heading-artist-name="Wisnu Tan"
      :snippets="popularitySnippets"
    >
      <p>
        You can also search by <code>popularity</code> to find combos by the
        number of decks that contain the combo according to
        <ExternalLink to="https://edhrec.com/">EDHREC</ExternalLink>.
      </p>

      <p>
        Use the <code>=</code>, <code>&gt;</code>, <code>&lt;</code>,
        <code>&gt;=</code>, <code>&lt;=</code> operators when constructing your
        search.
      </p>

      <p>
        <code>deck</code> and <code>decks</code> are aliases for
        <code>popularity</code>.
      </p>
    </SearchGuide>

    <SearchGuide
      heading="Price"
      heading-card-name="Smothering Tithe"
      heading-artist-name="Mark Behm"
      :snippets="priceSnippets"
    >
      <p>
        The <code>=</code>, <code>&gt;</code>, <code>&lt;</code>,
        <code>&gt;=</code>, <code>&lt;=</code> operators can be used with
        <code>price</code> to to find combos restricted by the price of the
        combo.
      </p>

      <p>
        By default, the Card Kingdom price will be used when searching for
        combos. You can use <code>vendor</code> to override this behavior.
        Possible values are:
      </p>

      <ul>
        <li><code>cardkingdom</code></li>
        <li><code>tcgplayer</code></li>
      </ul>

      <p>
        Combos where the price is not available are omitted from search results
        when using the <code>price</code> parameter.
      </p>

      <p><code>usd</code> is an alias for <code>price</code>.</p>
    </SearchGuide>

    <SearchGuide
      id="previewed"
      heading="Previewed / Spoiled"
      heading-card-name="Spoils of Adventure"
      heading-artist-name="Zezhou Chen"
      :snippets="previewedSnippets"
    >
      <p>
        By default, combo results will include combos that contain cards that
        have been newly previewed and are <em>technically</em> not yet legal in
        Commander. To exclude these combos, use
        <code>exclude:previewed</code> or <code>exclude:spoiled</code>.
      </p>

      <p>
        To find combos that contain cards that are not yet legal in Commander,
        use <code>is:previewed</code> or <code>is:spoiled</code>.
      </p>

      <p>
        To find combos that contain <em>no</em> cards that are not yet legal in
        Commander, use <code>not:previewed</code> or
        <code>not:spoiled</code> instead.
      </p>
    </SearchGuide>

    <SearchGuide
      heading="Banned"
      heading-card-name="Leovold, Emissary of Trest"
      heading-artist-name="Magali Villeneuve"
      :snippets="bannedSnippets"
    >
      <p>
        By default, combo results will not include combos that contain cards
        that are banned in Commander. Use <code>include:banned</code> to allow
        combo results that are banned in Commander.
      </p>

      <p>
        To find specific combos that contain cards that are banned in Commander,
        use <code>is:banned</code>.
      </p>

      <p>
        To find combos that contain <em>no</em> cards that are banned in
        Commander, use <code>not:banned</code> instead.
      </p>
    </SearchGuide>

    <SearchGuide
      id="sort"
      heading="Sort / Order"
      heading-card-name="Brainstorm"
      heading-artist-name="DiTerlizzi"
      :snippets="sortOrderSnippets"
    >
      <p>
        By default, combo results will be sorted by popularity (the number of
        decks the combo is in according to
        <ExternalLink to="https://edhrec.com/">EDHREC</ExternalLink>), starting
        with combos in the most decks and going to the least. Use
        <code>sort</code> to change the criteria for sorting the combos.
        Available options are:
      </p>

      <ul>
        <li>
          <code>colors</code> (or <code>ci</code>, <code>color-identity</code>,
          <code>color</code>)
        </li>

        <li><code>price</code> (or <code>usd</code>)</li>

        <li><code>results</code> (or <code>number-of-results</code>)</li>
        <li><code>steps</code> (or <code>number-of-steps</code>)</li>

        <li>
          <code>prerequisites</code> (or <code>number-of-prerequisites</code>)
        </li>

        <li><code>cards</code> (or <code>number-of-cards</code>)</li>

        <li><code>created</code></li>
      </ul>

      <p>
        By default, when sorted by popularity, the combo results are ordered in
        descending order. All other sort options order the results in ascending
        order instead. Use
        <code>order</code> to alter the default behavior.
      </p>

      <p>
        When sorting by price, combos with no price available are treated as
        having a price of 0.
      </p>
    </SearchGuide>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ArtCircle from "@/components/ArtCircle.vue";
import ExternalLink from "@/components/ExternalLink.vue";
import SearchGuide from "@/components/syntax-guide/SearchGuide.vue";

export default Vue.extend({
  components: {
    ArtCircle,
    ExternalLink,
    SearchGuide,
  },
  data() {
    return {
      sections: [
        {
          id: "cards",
          text: "Cards",
        },
        {
          id: "color-identity",
          text: "Color Identity",
        },
        {
          id: "prerequisites",
          text: "Prerequisites",
        },
        {
          id: "steps",
          text: "Steps",
        },
        {
          id: "results",
          text: "Results",
        },
        {
          id: "spellbook-id",
          text: "Combo Identifier",
        },
        {
          id: "popularity",
          text: "Popularity",
        },
        {
          id: "price",
          text: "Price",
        },
        {
          id: "previewed",
          text: "Previewed / Spoiled",
        },
        {
          id: "banned",
          text: "Banned",
        },
        {
          id: "sort",
          text: "Sort / Order",
        },
      ],
      cardSnippets: [
        {
          search: "kenrith golem",
          description:
            "Combos that contain a card with the word kenrith in the name and a card with the word golem in the name",
        },
        {
          search: 'card:"breath of" -card:brudiclad',
          description:
            'Combos that contain a card with the phrase "breath of" in the name, but do not include any cards with the word brudiclad in the name',
        },
        {
          search: 'card="sydri, galvanic genius"',
          description:
            'Combos that contain card with the exact name "sydri, galvanic genius"',
        },
        {
          search: "cards>2 cards<=5",
          description:
            "Combos that contain more than 2 cards but no greater than 5 cards",
        },
      ],
      colorIdentitySnippets: [
        {
          search: "coloridentity:bug",
          description: "Combos within the black, blue, green color identity.",
        },
        {
          search: "ci=temur",
          description:
            "Combos that have exactly the blue, green, red color identity.",
        },
        {
          search: "c<3",
          description:
            "Combos that have no more than 2 colors in their color identity.",
        },
        {
          search: "colors=3 ids>=wb",
          description:
            "Combos that have exactly 3 colors in their color identity and 2 of those colors must be white and black.",
        },
      ],
      resultSnippets: [
        {
          search: "result:infinite",
          description:
            'Combos that include the word "infinite" in one of the results.',
        },
        {
          search: 'result:"win the game" -result:infinite',
          description:
            'Combos that include the phrase "win the game" and do not include the word "infinite" in any of the results.',
        },
        {
          search: "result=3",
          description: "Combos that include exactly 3 results.",
        },
      ],
      prerequisiteSnippets: [
        {
          search: "prerequisite:mana",
          description:
            'Combos that include the word "mana" in one of the prerequisites.',
        },
        {
          search: 'pre:"mana to cast it" -pre:permanent',
          description:
            'Combos that include the phrase "mana to cast it" in one of the prerequisites and no prerequisite with the word "permanent".',
        },
        {
          search: "pre<=3",
          description: "Combos that have no more than 3 prerequisites.",
        },
      ],
      stepSnippets: [
        {
          search: "step:permanent",
          description:
            'Combos that include the word "permanent" in one of the steps.',
        },
        {
          search: 'steps:"mill target opponent"',
          description:
            'Combos that include the phrase "mill target opponent" in one of the steps.',
        },
        {
          search: "steps>6",
          description: "Combos that contain greater than 6 steps.",
        },
      ],
      idSnippets: [
        {
          search: "spellbookid:450",
          description: "The combo for Basalt Monolith and Mesmeric Orb.",
        },
        {
          search: '-sid:450 card="Basalt Monolith" card="Mesmeric Orb"',
          description:
            "Combos that contain the cards Basalt Monolith and Mesmeric Orb except for combo 450.",
        },
      ],
      popularitySnippets: [
        {
          search: "popularity>1000",
          description:
            "Combos that are in more than 1000 decks according to EDHREC.",
        },
        {
          search: "decks<10",
          description:
            "Combos that are in less than 10 decks according to EDHREC.",
        },
      ],
      priceSnippets: [
        {
          search: "price<5",
          description:
            "Combos where the entire price of the combo is less than $5.00 according to Card Kingdom.",
        },
        {
          search: "usd>100 vendor:tcgplayer",
          description:
            "Combos where the entire price of the combo is greater than $100.00 according to TCGplayer.",
        },
      ],
      previewedSnippets: [
        {
          search: "exclude:previewed",
          description:
            "Exclude any combos that contain cards that are not legal in Commander (yet).",
        },
        {
          search: "is:spoiled",
          description:
            "Combos that contain at least one card that is not yet legal in Commander. (may have no results, if there are no newly previewed cards)",
        },
      ],
      bannedSnippets: [
        {
          search: "include:banned",
          description:
            "Include any combos that contain cards that are banned in Commander.",
        },
        {
          search: "is:banned",
          description:
            "Combos that contain at least one card that is banned in Commander.",
        },
      ],
      sortOrderSnippets: [
        {
          search: "results=1 sort:price order:descending",
          description:
            "Combos with exactly one result, sorted by most expensive to least expensive.",
        },
        {
          search: "ci:grixis sort:cards",
          description:
            "Combos with the grixis color identity sorted by the number of cards in them.",
        },
        {
          search: "steps<3 sort:colors order:descending",
          description:
            "Combos with fewer than 3 steps sorted by color identity, starting with the most colors and going to the fewest.",
        },
        {
          search: "decks>100 sort:created",
          description:
            "Combos that are in more than 100 decks, sorted by the date they were added to the site.",
        },
      ],
    };
  },
});
</script>

<style scoped>
code {
  @apply bg-gray-200 text-dark px-1;
}

ul {
  @apply list-disc list-inside ml-4 mb-4;
}
</style>
