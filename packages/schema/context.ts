import axios from 'axios'

const bangumi_api_url = 'https://api.bgm.tv'

class ChiiAPI {
  async getLastDate() {
    return await axios.get(`/api/misc/lastdate`).then((data) => data.data)
  }

  async getSubjectCount(type: string, ranked: boolean) {
    return await axios
      .get(`/api/subjects/count`, {
        params: {
          type,
          ranked
        }
      })
      .then((data) => data.data)
  }

  async getRankedList(type: string, from: number, step: number, bysci: boolean) {
    return await axios
      .get(`/api/subjects/ranked`, {
        params: {
          type,
          from,
          step,
          bysci
        }
      })
      .then((data) => data.data)
  }

  async getTags() {
    return await axios.get(`/api/tags`).then((data) => data.data)
  }

  async searchSubjectByTags(tags: string[], minVoters: number, minFavs: number) {
    return await axios
      .post(`/api/tags/search`, {
        tags,
        minVoters,
        minFavs
      })
      .then((data) => data.data)
  }

  async searchRelatedTags(tags: string[]) {
    return await axios
      .post(`/api/tags/related`, {
        tags
      })
      .then((data) => data.data)
  }

  async getSubject(id: number) {
    return await axios.get(`/api/subjects/${id}`).then((data) => data.data)
  }
}

class BangumiAPI {
  baseURL: string
  constructor() {
    // global client options
    this.baseURL = bangumi_api_url
  }

  async getSubject(id: number) {
    return await axios.get(`${this.baseURL}/subject/${id}`).then((data) => data.data)
  }
}

export interface IContext {
  chiiAPI: ChiiAPI
  bangumiAPI: BangumiAPI
}

export const context: IContext = {
  chiiAPI: new ChiiAPI(),
  bangumiAPI: new BangumiAPI()
}
