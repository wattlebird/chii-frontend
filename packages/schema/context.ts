import axios from 'axios'

const bangumi_api_url = 'https://api.bgm.tv'

class ChiiAPI {
  async getLastDate() {
    return await axios.get(`/api/misc/lastdate`).then((data) => data.data)
  }

  async getRankedList(type: string) {
    return await axios
      .get(`/api/subjects/ranking`, {
        params: {
          type
        }
      })
      .then((data) => data.data)
  }

  async getAutoComplete(q: string) {
    return await axios
      .get(`/api/search/autocomplete`, {
        params: {
          q
        }
      })
      .then((data) => data.data)
  }

  async getRelatedTags(q: string) {
    return await axios
      .get(`/api/search/related`, {
        params: {
          q
        }
      })
      .then((data) => data.data)
  }

  async getRelatedSubjects(q: string) {
    return await axios
      .get(`/api/search`, {
        params: {
          q
        }
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
    return await axios.get(`${this.baseURL}/v0/subjects/${id}`).then((data) => data.data)
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
