const { DataSource } = require("apollo-datasource");

class News extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async createNewsMonitor({ inputs }) {
    try {
      const monitorFakeNews = await this.store.NewsMonitor.create(inputs);
      return monitorFakeNews;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateNewsMonitor({ inputs }) {
    try {
      const { _id } = inputs;
      const update = await this.store.NewsMonitor.findOneAndUpdate(
        { _id },
        inputs,
        {
          new: true,
        }
      );

      return update;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteNewsMonitor({ id }) {
    try {
      const isNews = await this.store.NewsMonitor.findById({ _id: id });
      if (!isNews) {
        throw new Error("No news was found");
      }
      await this.store.NewsMonitor.deleteOne({ _id: id });

      return {};
    } catch (error) {
      throw new Error(error);
    }
  }

  async getNewsMonitor({ id }) {
    try {
      const news = await this.store.NewsMonitor.findById({ _id: id });
      if (!news) {
        throw new Error("News not found");
      }

      return news;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getNewsMonitors() {
    try {
      const newsMonitors = await this.store.NewsMonitor.find({});
      return newsMonitors;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = News;
