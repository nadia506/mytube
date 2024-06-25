export default class Youtube {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  // async relatedVideos(videoId) {
  //   try {
  //     const videoResponse = await this.apiClient.videos({
  //       params: {
  //         part: "snippet",
  //         id: videoId,
  //       },
  //     });

  //     if (!videoResponse.data.items || videoResponse.data.items.length === 0) {
  //       return [];
  //     }

  //     const tags = videoResponse.data.items[0].snippet.tags;

  //     const relatedVideosResponse = await this.#searchByKeyword(tags.join(","));

  //     const relatedVideos = relatedVideosResponse.filter(
  //       (video) => video.id && video.id.videoId !== videoId
  //     );

  //     return relatedVideos;
  //   } catch (error) {
  //     console.error("Error fetching related videos:", error);
  //     return [];
  //   }
  // }

  async relatedVideos(id) {
    return this.apiClient
      .search({
        params: {
          part: "snippet",
          maxResults: 25,
          relatedToVideoId: id,
        },
      })
      .then((res) =>
        res.data.items.map((item) => ({ ...item, id: item.id.videoId }))
      );
  }

  async channelImageURL(id) {
    return this.apiClient
      .channels({ params: { part: "snippet", id } })
      .then((res) => res.data.items[0].snippet.thumbnails.default.url);
  }

  async #searchByKeyword(keyword) {
    return this.apiClient
      .search({
        params: {
          part: "snippet",
          maxResults: 25,
          q: keyword,
        },
      })
      .then((res) => res.data.items)
      .then((items) => items.map((item) => ({ ...item, id: item.id.videoId })));
  }

  async #mostPopular() {
    return this.apiClient
      .videos({
        params: {
          part: "snippet",
          maxResults: 25,
          chart: "mostPopular",
        },
      })

      .then((res) => res.data.items);
  }
}
