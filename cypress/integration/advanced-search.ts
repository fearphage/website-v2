describe("Advanced Search Page", () => {
  it("can search card names in combo", () => {
    cy.visit("/advanced-search");

    cy.get("#card-name-inputs input.input").should("have.length", 1);
    cy.get("#card-name-inputs input.input-0").type("mesmeric");

    cy.get("#card-name-inputs .plus-button-0").click();
    cy.get("#card-name-inputs input.input").should("have.length", 2);

    cy.get("#card-name-inputs select.select-1").select("=");
    cy.get("#card-name-inputs input.input-1").type("basalt monolith");

    cy.get("#card-name-inputs .plus-button-0").click();

    cy.get("#card-name-inputs input.input-1").type("2");
    cy.get("#card-name-inputs select.select-1").select(">-number");

    cy.get("#advanced-search-submit-button").click();

    cy.url().should(
      "include",
      "/search?q=mesmeric%20cards%3E2%20card%3D%22basalt%20monolith%22"
    );
  });

  it("can search color identity in combo", () => {
    cy.visit("/advanced-search");

    cy.get("#color-identity-inputs input.input").should("have.length", 1);
    cy.get("#color-identity-inputs input.input-0").type("wubr");

    cy.get("#color-identity-inputs .plus-button-0").click();
    cy.get("#color-identity-inputs input.input").should("have.length", 2);

    cy.get("#color-identity-inputs select.select-1").select("=");
    cy.get("#color-identity-inputs input.input-1").type("grixis");

    cy.get("#color-identity-inputs .plus-button-0").click();

    cy.get("#color-identity-inputs input.input-1").type("2");
    cy.get("#color-identity-inputs select.select-1").select(">-number");

    cy.get("#advanced-search-submit-button").click();

    cy.url().should("include", "/search?q=ci%3Awubr%20ci%3E2%20ci%3Dgrixis");
  });

  it("can search prerequisites in combo", () => {
    cy.visit("/advanced-search");

    cy.get("#prerequisite-inputs input.input").should("have.length", 1);
    cy.get("#prerequisite-inputs input.input-0").type("mana");

    cy.get("#prerequisite-inputs button").click();
    cy.get("#prerequisite-inputs input.input").should("have.length", 2);

    cy.get("#prerequisite-inputs input.input-1").type("untap all");
    cy.get("#prerequisite-inputs select.select-1").select("=-exclude");

    cy.get("#advanced-search-submit-button").click();

    cy.url().should(
      "include",
      "/search?q=pre%3Amana%20-pre%3D%22untap%20all%22"
    );
  });

  it("can search steps in combo", () => {
    cy.visit("/advanced-search");

    cy.get("#step-inputs input.input").should("have.length", 1);
    cy.get("#step-inputs input.input-0").type("mana");

    cy.get("#step-inputs button").click();
    cy.get("#step-inputs input.input").should("have.length", 2);

    cy.get("#step-inputs input.input-1").type("untap all");
    cy.get("#step-inputs select.select-1").select("=-exclude");

    cy.get("#advanced-search-submit-button").click();

    cy.url().should(
      "include",
      "/search?q=step%3Amana%20-step%3D%22untap%20all%22"
    );
  });

  it("can search results in combo", () => {
    cy.visit("/advanced-search");

    cy.get("#result-inputs input.input").should("have.length", 1);
    cy.get("#result-inputs input.input-0").type("mana");

    cy.get("#result-inputs button").click();
    cy.get("#result-inputs input.input").should("have.length", 2);

    cy.get("#result-inputs input.input-1").type("untap all");
    cy.get("#result-inputs select.select-1").select("=-exclude");

    cy.get("#advanced-search-submit-button").click();

    cy.url().should(
      "include",
      "/search?q=result%3Amana%20-result%3D%22untap%20all%22"
    );
  });
});
