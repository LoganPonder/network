<template>
  <div class="home flex-grow-1 d-flex">
    <!-- go back to here -->
    <div class="col-md-8 px-0 text-center">
      <div class="row flex-column mx-3 mt-4 mb-3">
        <h2>POSTS</h2>
        <Post v-for="post in state.posts" :key="post.id" :post="post" />
        <h2 class="mt-4">PROFILES</h2>
        <Profile v-for="profile in state.profiles" :key="profile.id" :profile="profile" />
      </div>
    </div>
    <div class="col-md-4 px-0">
      <Ad v-for="ad in state.ads" :key="ad.tall" :ad="ad" />
    </div>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
// import { postsService } from '../services/PostsService'
// import { profileService } from '../services/ProfileService'
import Notification from '../utils/Notification'
import { adsService } from '../services/AdsService'
export default {
  name: 'SearchPage',
  setup() {
    const state = reactive({
      posts: computed(() => AppState.postsResults),
      profiles: computed(() => AppState.profilesResults),
      ads: computed(() => AppState.myAds)
    })

    onMounted(async() => {
      try {
        // await postsService.getAll()
        // await profileService.getAll()
        await adsService.getAds()
        state.loading = false
      } catch (error) {
        Notification.toast('Error ' + error, 'success')
      }
    })

    return {
      state
    }
  }
}
</script>
