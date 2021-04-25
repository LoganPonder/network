import { AppState } from '../AppState'
// import router from '../router'
import { api } from './AxiosService'

class PostsService {
  async getAll() {
    const res = await api.get('api/posts')
    AppState.posts = res.data.posts
  }

  async getPostsById(id) {
    const res = await api.get(`api/profile/${id}/posts`)
    AppState.myPosts = res.data.posts
  }
}

export const postsService = new PostsService()
