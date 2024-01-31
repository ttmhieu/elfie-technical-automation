class GoogleSearchPage {
  constructor(client) {
    this.client = client;
    this.searchInput = '[name="q"]';
  }

  async search(keyword) {
    await this.client.setValue(this.searchInput, keyword);
    await this.client.keys("Enter");
  }
}

export default GoogleSearchPage;
