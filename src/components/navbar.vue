<template>
  <nav class="navbar navbar-expand-lg py-4">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <div class="nav-logo text-white d-flex align-items-center">
          <i class="fas fa-water fa-3x mr-2"></i>
          <p>WAVES</p>
        </div>
      </div>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item d-md-none">
          <router-link :to="{ name: 'Home' }" class="nav-link">
            Home
          </router-link>
        </li>
      </ul>
      <div class="input-group search-bar">
        <form class="d-flex" action="" @submit.prevent="search(state.query)">
          <input v-model="state.query"
                 type="text"
                 class="form-control shadow"
                 placeholder=""
                 aria-label=""
                 aria-describedby="basic-addon1"
          >
          <div class="input-group-append">
            <button class="btn btn-outline-success search-btn shadow" type="submit">
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
// import { AuthService } from '../services/AuthService'
// import { AppState } from '../AppState'
import { reactive } from 'vue'
import { postsService } from '../services/PostsService'
import { profileService } from '../services/ProfileService'
export default {
  name: 'Navbar',
  setup() {
    const state = reactive({
      query: ''
    })

    return {
      state,
      async search(query) {
        await postsService.search(query)
        await profileService.search(query)
        state.query = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

nav {
background: #0F2027;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #2C5364, #203A43, #0F2027);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #2C5364, #203A43, #0F2027); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

.nav-logo {

  p {
    font-size: 2.3rem;
  }
}

.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link{
  text-transform: uppercase;
  color: #fff;
}
.nav-item .nav-link.router-link-exact-active{
  color: #fff;
}

.search-btn {
  background-color: $dark;
  color: #fff;
}

.search-bar {
  max-width: 30%;
}
</style>
