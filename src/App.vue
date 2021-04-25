<template>
  <div class="container-fluid">
    <div class="row main-page">
      <div class="col-md-2 user-login d-flex justify-content-center align-items-center shadow">
        <span class="navbar-text">
          <button
            class="btn btn-primary text-uppercase"
            @click="login"
            v-if="!user.isAuthenticated"
          >
            Login
          </button>
          <!-- go back to here -->
          <div class="dropdown" v-else>
            <router-link :to="{name: 'Profile', params: {id: account._id}}">
              <img :src="user.picture" alt="user photo" height="150" class="mb-4 login-avatar" />
            </router-link>
            <p class="text-left text-muted">{{ user.class || 'Spring 2021' }}</p>
            <p class="username mb-4">{{ user.name }}</p>

            <div class="icon-links">
              <div class="icon-links__item">
                <a href="https://github.com/" class="d-flex">
                  <i class="fab fa-github fa-2x mb-3 mr-2"></i>
                  <p class="icon-text">{{ user.github }} Github</p>
                </a>
              </div>
              <div class="icon-links__item d-flex">
                <i class="fas fa-file fa-2x mb-3 mr-2"></i>
                <p class="icon-text">{{ user.resume }} Resume</p>
              </div>
              <div class="icon-links__item d-flex">
                <i class="fab fa-linkedin fa-2x mr-2"></i>
                <p class="icon-text">{{ user.linkedin }} LinkedIn</p>
              </div>
            </div>
          </div>
        </span>
      </div>
      <div class="col-md-10 px-0">
        <header class="shadow">
          <Navbar />
        </header>
        <main>
          <router-view />
        </main>
        <footer>
          <div class="bg-dark text-light text-center p-4">
            Made with 💖 by CodeWorks
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { AuthService } from './services/AuthService'
import { AppState } from './AppState'
import { computed, reactive } from 'vue'
export default {
  name: 'App',
  setup() {
    const state = reactive({
      dropOpen: false
    })
    return {
      state,
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        await AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}

</script>
<style lang="scss">
@import "./assets/scss/main.scss";

// * {
//   outline: 1px solid red;
// }

.user-login {
  max-height: 100vh;
  background-color: $body-bg;
}

.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}

.main-page {
  min-height: 100vh;
  background-color: rgb(224, 224, 224);
}

main {
  flex-grow: 1;
}

.username {
  font-size: 2rem;
}

.login-avatar {
  border: 1px solid $success;
  border-radius: 50%;
}

a {
  color: $dark;
}

.icon-text {
  font-size: 1.2rem;
}

</style>
