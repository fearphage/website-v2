describe("Advanced Search Page", () => {
  it("can search card names in combo", () => {
    cy.visit("/advanced-search/");

    cy.get("#card-name-inputs input.input").should("have.length", 1);
    cy.get("#card-name-input-0").type("mesmeric");

    cy.get("#card-name-inputs .plus-button-0").click();
    cy.get("#card-name-inputs input.input").should("have.length", 2);

    cy.get("#card-name-inputs .select-1 select").select("=");
    cy.get("#card-name-input-1").type("basalt monolith");

    cy.get("#card-name-inputs .plus-button-0").click();

    cy.get("#card-name-input-1").type("emry");
    cy.get("#card-name-inputs .select-1 select").select(":-exclude");

    cy.get("#advanced-search-submit-button").click();

    cy.url().should(
      "include",
      "/search/?q=mesmeric%20-card%3Aemry%20card%3D%22basalt%20monolith%22"
    );
  });

  it("can search card amounts in combo", () => {
    cy.visit("/advanced-search/");

    cy.get("#card-amount-inputs input.input").should("have.length", 1);
    cy.get("#number-of-cards-input-0").type("3");

    cy.get("#card-amount-inputs .plus-button-0").click();
    cy.get("#card-amount-inputs input.input").should("have.length", 2);

    cy.get("#card-amount-inputs .select-1 select").select("<-number");
    cy.get("#number-of-cards-input-1").type("5");

    cy.get("#advanced-search-submit-button").click();

    cy.url().should("include", "/search/?q=cards%3D3%20cards%3C5");
  });

  it("can search color identity in combo", () => {
    cy.visit("/advanced-search/");

    cy.get("#color-identity-inputs input.input").should("have.length", 1);
    cy.get("#color-identity-input-0").type("wubr");

    cy.get("#color-identity-inputs .plus-button-0").click();
    cy.get("#color-identity-inputs input.input").should("have.length", 2);

    cy.get("#color-identity-inputs .select-1 select").select("=");
    cy.get("#color-identity-input-1").type("grixis");

    cy.get("#color-identity-inputs .plus-button-0").click();

    cy.get("#color-identity-input-1").type("2");
    cy.get("#color-identity-inputs .select-1 select").select(">-number");

    cy.get("#advanced-search-submit-button").click();

    cy.url().should(
      "include",
      "/search/?q=ci%3Awubr%20colors%3E2%20ci%3Dgrixis"
    );
  });

  it("can search prerequisites in combo", () => {
    cy.visit("/advanced-search/");

    cy.get("#prerequisite-inputs input.input").should("have.length", 1);
    cy.get("#prerequisite-input-0").type("mana");

    cy.get("#prerequisite-inputs button").click();
    cy.get("#prerequisite-inputs input.input").should("have.length", 2);

    cy.get("#prerequisite-input-1").type("untap all");
    cy.get("#prerequisite-inputs .select-1 select").select("=-exclude");

    cy.get("#advanced-search-submit-button").click();

    cy.url().should(
      "include",
      "/search/?q=pre%3Amana%20-pre%3D%22untap%20all%22"
    );
  });

  it("can search steps in combo", () => {
    cy.visit("/advanced-search/");

    cy.get("#step-inputs input.input").should("have.length", 1);
    cy.get("#step-input-0").type("mana");

    cy.get("#step-inputs button").click();
    cy.get("#step-inputs input.input").should("have.length", 2);

    cy.get("#step-input-1").type("untap all");
    cy.get("#step-inputs .select-1 select").select("=-exclude");

    cy.get("#advanced-search-submit-button").click();

    cy.url().should(
      "include",
      "/search/?q=step%3Amana%20-step%3D%22untap%20all%22"
    );
  });

  it("can search results in combo", () => {
    cy.visit("/advanced-search/");

    cy.get("#result-inputs input.input").should("have.length", 1);
    cy.get("#result-input-0").type("mana");

    cy.get("#result-inputs button").click();
    cy.get("#result-inputs input.input").should("have.length", 2);

    cy.get("#result-input-1").type("untap all");
    cy.get("#result-inputs .select-1 select").select("=-exclude");

    cy.get("#advanced-search-submit-button").click();

    cy.url().should(
      "include",
      "/search/?q=result%3Amana%20-result%3D%22untap%20all%22"
    );
  });

  it("can search by price", () => {
    cy.visit("/advanced-search/");

    cy.get("#price-inputs input.input").should("have.length", 1);
    cy.get("#price-input-0").type("3");

    cy.get("#price-inputs button").click();
    cy.get("#price-inputs input.input").should("have.length", 2);

    cy.get("#price-input-1").type("2");
    cy.get("#price-inputs .select-1 select").select("=-number");

    cy.get("#vendor input[type='radio']").last().check();

    cy.get("#advanced-search-submit-button").click();

    cy.url().should(
      "include",
      "/search/?q=price%3C3%20price%3D2%20vendor%3Atcgplayer"
    );
  });

  it("can search by popularity", () => {
    cy.visit("/advanced-search/");

    cy.get("#popularity-inputs input.input").should("have.length", 1);
    cy.get("#popularity-input-0").type("3");

    cy.get("#popularity-inputs button").click();
    cy.get("#popularity-inputs input.input").should("have.length", 2);

    cy.get("#popularity-input-1").type("2");
    cy.get("#popularity-inputs .select-1 select").select("=-number");

    cy.get("#advanced-search-submit-button").click();

    cy.url().should("include", "/search/?q=decks%3C3%20decks%3D2");
  });

  it("can search for previewed combos", () => {
    cy.visit("/advanced-search/");

    cy.get("#previewed-combos input[type='radio']").last().check();

    cy.get("#advanced-search-submit-button").click();

    cy.url().should("include", "/search/?q=is%3Apreviewed");
  });

  it("can search for banned combos", () => {
    cy.visit("/advanced-search/");

    cy.get("#banned-combos input[type='radio']").last().check();

    cy.get("#advanced-search-submit-button").click();

    cy.url().should("include", "/search/?q=is%3Abanned");
  });

  it("prevents searches when queries are empty", () => {
    cy.visit("/advanced-search/");

    cy.get("#advanced-search-submit-button").click();

    cy.contains(
      "#advanced-search-validation-error",
      "No search queries entered."
    );
  });

  it("prevents searches when invalid queries are used", () => {
    cy.visit("/advanced-search/");

    cy.get("#result-input-0").type(`mana ' " mana`);
    cy.get("#step-input-0").type("not a number");
    cy.get("#step-inputs .select-0 select").select("=-number");

    cy.get("#advanced-search-submit-button").click();

    cy.contains(
      "#advanced-search-validation-error",
      "Check for errors in your search terms before submitting."
    );
    cy.contains(
      "#result-inputs .input-wrapper-0 .input-error",
      "Contains both single and double quotes. A card name may only use one kind."
    );
    cy.contains(
      "#step-inputs .input-wrapper-0 .input-error",
      "Contains a non-integer. Use a full number instead."
    );
  });
});
