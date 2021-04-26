<template>
  <div class="home flex-grow-1 d-flex">
    <!-- go back to here -->
    <div class="col-md-8 pl-4">
      <div class="row flex-column mx-3 mt-1">
        <Post v-for="post in state.posts" :key="post.id" :post="post" />
      </div>
    </div>
    <div class="col-sm-4 px-0">
      <Ad v-for="ad in state.ads" :key="ad.tall" :ad="ad" />
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, computed } from 'vue'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
import { adsService } from '../services/AdsService'
import Notification from '../utils/Notification'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      posts: computed(() => AppState.posts),
      ads: computed(() => AppState.myAds),
      account: computed(() => AppState.account)
    })
    onMounted(async() => {
      try {
        await postsService.getAll()
        await adsService.getAds()
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      state
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
