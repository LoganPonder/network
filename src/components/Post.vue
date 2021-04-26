<template>
  <div class="post--container my-3 p-4 text-left shadow rounded">
    <div class="post--header d-flex ml-4 align-items-center mb-3">
      <router-link :to="{name: 'Profile', params:{id: post.creator.id}}">
        <div class="post-avatar" @click="setActiveProfile(post.creator.id)">
          <img class="avatar-img shadow" :src="post.creator.picture" alt="">
        </div>
      </router-link>
      <div class="post--details">
        <p class="post-author">
          {{ post.creator.name }}
        </p>
        <p class="post-date text-muted">
          {{ post.creator.createdAt }}
          <i v-if="post.creator.graduated" class="fas fa-user-graduate"></i>
        </p>
      </div>
    </div>
    <div class="post--body lead ml-4 mb-3">
      {{ post.body }}
    </div>
    <!-- go back to here for image -->
    <img v-if="post.imgUrl" class="post-img" :src="post.imgUrl" alt="post-image">
    <div class="post--buttons d-flex justify-content-between pt-3">
      <button v-if="post.creator.id === state.account.id" class="btn btn-dark text-white rounded shadow ml-4" @click="deletePost(post.id, post.creator.id)">
        DELETE
      </button>
      <div class="like-button d-flex">
        <i class="far fa-thumbs-up fa-2x like" @click="likePost(post.id, post.creator.id)"></i>
        <p class="like-count">
          {{ post.likes.length }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { postsService } from '../services/PostsService'
import { computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import Notification from '../utils/Notification'
import { AppState } from '../AppState'
import { profileService } from '../services/ProfileService'

export default {
  name: 'Post',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  setup() {
    const route = useRoute()
    const state = reactive({
      account: computed(() => AppState.account)
    })
    return {
      state,
      route,
      async deletePost(id, creatorId) {
        try {
          await postsService.deletePost(id, creatorId)
          Notification.toast('Post Deleted', 'success')
        } catch (error) {
          Notification.toast('Error ' + error, 'error')
        }
      },
      async likePost(id, creatorId) {
        try {
          await postsService.likePost(id, creatorId)
        } catch (error) {
          Notification.toast('Error ' + error, 'error')
        }
      },
      async setActiveProfile(id, creatorId) {
        try {
          await profileService.setActiveProfile(id)
        } catch (error) {
          Notification.toast('Error ' + error, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";

.post--container {
  position: relative;
  background-color: $body-bg;
  overflow: hidden;
}

p {
  margin-bottom: 0;
}

.post--details {
  padding-left: 1rem;
  margin-bottom: 1rem;
}

.post--body {
  font-size: 1.4rem;
  max-width: 90%;
  text-align: left;
}

.post-img {
  max-width: 100%;
  width: auto;
  height: auto;
}

.post-author {
  font-size: 1.4rem;
  font-weight: bold;
}

.like {
  cursor: pointer;
}

.post-date {
  font-size: 1.1rem;
}

.avatar-img{
  border-radius: 50%;
  height: 6rem;
}
</style>
