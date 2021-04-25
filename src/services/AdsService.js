import { AppState } from '../AppState'
// import router from '../router'
import { api } from './AxiosService'

class AdsService {
  async getAds() {
    const res = await api.get('api/ads')
    AppState.myAds = res.data
  }
}

export const adsService = new AdsService()
