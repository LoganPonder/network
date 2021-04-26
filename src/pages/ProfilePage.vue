<template>
  <div v-if="state.loading == true" class="m-4 lead">
    loading...
  </div>
  <div v-else class="row">
    <div class="col-md-8 d-flexrounded pl-4 pt-1">
      <div class="profile-card m-3 shadow rounded">
        <img class="profile-img rounded" src="https://images.pexels.com/photos/3560168/pexels-photo-3560168.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="">
        <div class="profile-body p-3 mt-3">
          <img class="cover-img" :src="state.activeProfile.picture" alt="">
          <div class="profile-icons d-flex">
            <a href="https://github.com/"><i class="fab fa-github mr-4"></i></a>
            <a href="https://www.linkedin.com"><i class="fab fa-linkedin mr-4"></i></a>
            <a href="https://github.com/"><i class="fas fa-file-upload"></i></a>
          </div>
          <p class="text-muted mb-0 mt-4 pt-4 cohort pl-4">
            {{ state.activeProfile.class || 'Spring 2021' }}
          </p>
          <h1 class="mb-4 pl-4">
            {{ state.activeProfile.name }}
          </h1>
          <p v-if="state.activeProfile.body" class="lead profile-text pl-4">
            {{ state.activeProfile.body }}
          </p>
          <p v-else class="lead profile-text pl-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident laboriosam assumenda id? Ducimus quibusdam exercitationem voluptatum omnis modi nulla accusantium, nostrum voluptates ab voluptatem, quidem minima numquam natus quis asperiores id corrupti laborum ex! Cumque adipisci provident rerum asperiores consequatur?
          </p>
        </div>
      </div>
      <div v-if="state.activeProfile.id == state.account.id" class="new-post-form m-3 p-3 rounded shadow">
        <div class="new-post-content d-flex py-2">
          <div class="new-post-avatar">
            <img :src="state.user.picture" alt="User Avatar">
          </div>
          <div class="new-post-form d-flex flex-column pt-4 px-4 w-100">
            <form class="w-100" @submit.prevent="createNewPost">
              <div class="form-group row flex-column">
                <label for="inputPassword" class="col-sm-2 col-form-label">Post:</label>
                <div class="col-sm-10">
                  <input type="text"
                         class="form-control"
                         id="inputPassword"
                         required
                         placeholder="Share what's happening..."
                         v-model="state.newPost.body"
                  >
                </div>
              </div>
              <div class="form-group row flex-column">
                <label for="imgUrl" class="col-sm-2 col-form-label">Image:</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="imgUrl" placeholder="Add image url..." v-model="state.newPost.imgUrl">
                </div>
              </div>
              <button class="btn btn-dark post-btn" type="submit">
                <i class="fas fa-paper-plane mr-2 fa-2x py-1"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div class="profile-posts">
        <Post v-for="post in state.myPosts" :key="post.id" :post="post" />
      </div>
    </div>
    <div class="col-md-4">
      <Ad v-for="ad in state.ads" :key="ad.tall" :ad="ad" />
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
      loading: true,
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
        // await accountService.getProfile(route.params.id)
        await adsService.getAds()
        await postsService.getPostsById(route.params.id)
        state.loading = false
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })

    return {
      state,
      async createNewPost() {
        try {
          await postsService.createNewPost(state.newPost)
          Notification.toast('Post Added', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

// * {
//   outline: 1px solid red;
// }

.profile-card {
  background-color: $body-bg;
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
  font-style: italic;
  line-height: 1.7;
}

.profile-img {
  max-height: 300px;
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

.new-post-form {
  background-color: $body-bg;
}

.post-btn {
  margin-left: 90%;
}

.new-post-avatar {
  img {
    max-height: 7rem;
    border-radius: 50%
  }
}
</style>
