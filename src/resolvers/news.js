module.exports = {
  Mutation: {
    createNewsMonitor: async (_, {inputs}, {NewsMonitor}) => {
      try {
        const monitorFakeNews = await NewsMonitor.create(inputs);
        return monitorFakeNews;
      } catch (error) {
        throw new Error(error);
      }
    },
    updateNewsMonitor: async (_, {inputs}, {NewsMonitor}) => {
      try {
        const {_id} = inputs;
        const update = await NewsMonitor.findOneAndUpdate({_id}, inputs, {
          new: true,
        });

        return update;
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteNewsMonitor: async (_, {id}, {NewsMonitor}) => {
      try {
        const isNews = await NewsMonitor.findById({_id: id});
        if (!isNews) {
          throw new Error('No news was found');
        }
        await NewsMonitor.deleteOne({_id: id});

        return {};
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Query: {
    getNewsMonitor: async (_, {id}, {NewsMonitor}) => {
      try {
        const news = await NewsMonitor.findById({_id: id});
        if (!news) {
          throw new Error('News not found');
        }

        return news;
      } catch (error) {
        throw new Error(error);
      }
    },
    getNewsMonitors: async (_, {}, {NewsMonitor}) => {
      try {
        const newsMonitors = await NewsMonitor.find({});
        return newsMonitors;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
