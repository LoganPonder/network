<template>
  <div class="post--container my-3 p-4 text-left shadow rounded">
    <div class="post--header d-flex ml-4 align-items-center mb-3">
      <div class="post-avatar">
        <img class="avatar-img shadow" :src="post.creator.picture" alt="">
      </div>
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
    <div class="post--body lead ml-4">
      {{ post.body }}
    </div>
    <div class="post--buttons d-flex justify-content-between pt-3">
      <button class="btn btn-dark text-white rounded shadow ml-4">
        DELETE
      </button>
      <i class="far fa-thumbs-up fa-2x"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Post',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.post--container {
  position: relative;
  background-color: $body-bg;
  width: 80%;
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

.post-author {
  font-size: 1.4rem;
  font-weight: bold;
}

.post-date {
  font-size: 1.1rem;
}

.avatar-img{
  border-radius: 50%;
  height: 6rem;
}
</style>
