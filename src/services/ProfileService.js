import { AppState } from '../AppState'
import router from '../router'
// import router from '../router'
import { api } from './AxiosService'

class ProfileService {
  async setActiveProfile(id) {
    const res = await api.get(`api/profiles/${id}`)
    AppState.activeProfile = res.data
  }

  async search(query) {
    const res = await api.get(`api/profiles/?query=${query}`)
    AppState.profilesResults = res.data
    router.push({ name: 'SearchPage' })
  }
}

export const profileService = new ProfileService()
