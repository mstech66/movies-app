import React from "react";

<reference types="cypress" />;
describe("Counter App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  

  it("displays netflix roulette logo an add movie button and search box and list of movies and genres", () => {
    cy.get("#appNameTitle").contains("netflixroulette");
    cy.get("#addBtn").should("exist");
    cy.get("#searchForm").should("exist");
    cy.get("#genreSelectUl").should("exist");
    cy.get("[data-testid='sortSelect']").should("exist");
  });

  it("click on movie and it opens the movie details page", () => {
    cy.get("[data-testid='962']").click();
    cy.get("#title").scrollIntoView();
    cy.get("#title").contains("The Gold Rush");
    cy.get("#runtime").contains("1h 35min");
    cy.get("#overview").contains(
      "A lone prospector ventures into Alaska looking for gold. He gets mixed up with some burly characters and falls in love with the beautiful Georgia. He tries to win her heart with his singular charm."
    );
    cy.get("#vote_average").contains("7.8");
    cy.get("#genres").contains("Adventure, Comedy, Drama");
    cy.get("#release_date").contains("1925");
  });

  it("clicking on the netflixroulette logo brings back to home screen", () => {
    cy.get("#appNameTitle").click();
    cy.get("#title").should("not.exist");
    cy.get("#runtime").should("not.exist");
  });

  it("able to change genre and the list updates as genre is changed", () => {
    cy.get("#genreSelectUl").should("exist");
    cy.get("[data-testid='btn-Horror']").click();
    cy.wait(2000);
    cy.get("p[class^='MovieTile_genre']").each($element => {
      cy.wrap($element).contains("Horror");
    });
    cy.get("[data-testid='btn-All']").click();
  });

  function isSorted(list) {
    return list.every((item, index, array) => {
        if (index === 0) {
            return true;
        } else {
            // check if previous item is lesser than current item
            return array[index - 1] <= item;
        }
    });
}

  it("able to change sort and the list updates as sort is changed", () => {
    cy.get("[data-testid='sortSelect']").should("exist");
    cy.get("[data-testid='sortSelect']").select("title");
    cy.wait(2000);
    let movieTitles = [];
    cy.get("h3[class^='MovieTile_title']").each($element => {
      movieTitles.push($element.text());
    });
    expect(isSorted(movieTitles)).to.be.true;
    cy.get("[data-testid='sortSelect']").select("release_date");
  });
});

//*[@class = 'es-app-launcher-links'] | //div[@class = 'es-app-launcher']
