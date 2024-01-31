class SearchResultsPage {
  constructor(client) {
    this.client = client;
    this.firstResult = '//h3[text()="Elfie - Wikipedia"]';
  }

  async clickFirstResult() {
    await this.client.$(this.firstResult).click();
  }
}

export default new SearchResultsPage();
