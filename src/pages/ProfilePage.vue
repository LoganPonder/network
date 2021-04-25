<template>
  <div class="row">
    <div class="col-md-8 d-flex flex-column">
      <div class="profile-card m-3 shadow rounded">
        <img class="profile-img" src="https://images.pexels.com/photos/192136/pexels-photo-192136.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="">
        <div class="profile-body p-3 mt-3">
          <img class="cover-img" :src="state.user.picture" alt="">
          <div class="profile-icons d-flex">
            <i class="fab fa-github mr-3"></i>
            <i class="fab fa-linkedin mr-3"></i>
            <i class="fas fa-file"></i>
          </div>
          <p class="text-muted mb-0 mt-4 pt-4 cohort">
            {{ state.account.class || 'Spring 2021' }}
          </p>
          <h1 class="mb-4">
            {{ state.account.name }}
          </h1>
          <p class="lead profile-text">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum repudiandae quas error harum? Corrupti in harum dolores, exercitationem repellendus autem, fugit consequatur accusantium libero quos natus ipsam corporis laboriosam expedita!
          </p>
        </div>
      </div>
      <div class="profile-posts">
        <Post v-for="post in state.myPosts" :key="post.id" :post="post" />
      </div>
    </div>
    <div class="col-md-4">
      <div class="col-md-4 px-0">
        <Ad v-for="ad in state.ads" :key="ad.tall" :ad="ad" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
import Notification from '../utils/Notification'
// import { logger } from '../utils/Logger'
import { useRoute } from 'vue-router'
import { accountService } from '../services/AccountService'
import { adsService } from '../services/AdsService'
export default {
  name: 'Profile',
  setup() {
    const route = useRoute()
    const state = reactive({
      newPost: {},
      myPosts: computed(() => AppState.myPosts),
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      activeProfile: computed(() => AppState.activeProfile),
      ads: computed(() => AppState.myAds)
    })

    onMounted(async() => {
      try {
        await accountService.getProfile(route.params.id)
        await accountService.getProfile(route.params.id)
        await adsService.getAds()
        await postsService.getPostsById(route.params.id)
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

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

.profile-card {
  background-color: $body-bg;
  max-height: 500px;
}
  .profile-body {
    position: relative;
  }

.profile-background-image {
  background-image: url('../assets/img/pexels-alexander-tiupa-192136.jpg')
}

.profile-icons {
  position: absolute;
  top: 1rem;
  right: 2rem;
  font-size: 2rem;
}

.profile-text {
  font-size: 1.4rem;
  max-width: 90%;
  text-align: left;
}

.profile-img {
  max-height: 35%;
  width: 100%;
  object-fit: cover;
  background-position: center;
  filter:contrast(.7)
}

.cohort {
  font-size: 1.3rem;
  font-style: bold;
}

.cover-img {
  max-width: 150px;
  position: absolute;
  top: -100px;
  left: 20px;
  border-radius: 50%;
  border: .5rem solid $body-bg;
}
</style>
