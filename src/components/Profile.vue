<template>
  <div class="profile-container my-3 rounded shadow">
    <div class="profile-content d-flex p-4 align-items-center">
      <img :src="profile.picture" alt="profile-img" class="mr-4">
      <div class="profile-name">
        <h3>{{ profile.name }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
// import { reactive } from '@vue/reactivity'
export default {
  name: 'Profile',
  props: {
    profile: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

// * {
//   outline: 1px solid red;
// }

.profile-content {

  background-color: $body-bg;

  img {
    max-width: 7rem;
    border-radius: 50%;
  }
}

</style>
