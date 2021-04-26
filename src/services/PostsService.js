import { AppState } from '../AppState'
// import router from '../router'
import { api } from './AxiosService'

class PostsService {
  async getAll() {
    const res = await api.get('api/posts')
    AppState.posts = res.data.posts
  }

  async getPostsById(id) {
    const res = await api.get(`api/profiles/${id}/posts`)
    AppState.myPosts = res.data.posts
  }

  async createNewPost(newPost) {
    await api.post('api/posts', newPost)
  }

  async deletePost(id, creatorId) {
    await api.delete(`api/posts/${id}`)
    this.getAll()
    this.getPostsById(creatorId)
  }

  async likePost(id, creatorId) {
    await api.post(`api/posts/${id}/like`)
    this.getAll()
    this.getPostsById(creatorId)
  }

  async search(query) {
    const res = await api.get(`api/posts/?query=${query}`)
    AppState.postsResults = res.data.posts
  }
}

export const postsService = new PostsService()
