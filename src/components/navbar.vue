<template>
  <nav class="navbar navbar-expand-lg py-4">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <div class="nav-logo text-white d-flex align-items-center">
          <i class="fab fa-pagelines fa-3x mr-2"></i>
          <p>BRANCHES</p>
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
        <li class="nav-item">
          <router-link :to="{ name: 'Home' }" class="nav-link">
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'About' }" class="nav-link">
            About
          </router-link>
        </li>
      </ul>
      <div class="input-group search-bar">
        <input type="text" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1">
        <div class="input-group-append">
          <button class="btn btn-primary" type="button">
            Love it
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
// import { AuthService } from '../services/AuthService'
// import { AppState } from '../AppState'
// import { computed, reactive } from 'vue'
export default {
  name: 'Navbar'
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

nav {
background-image: linear-gradient(to bottom, #137547 0%, #17975cb7 100%);
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

.search-bar {
  max-width: 30%;
}
</style>
