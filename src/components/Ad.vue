<template>
  <div class="ad-container my-3">
    <img class="ad-image shadow rounded" :src="ad.tall" alt="Advertisment">
  </div>
</template>

<script>
export default {
  name: 'Ad',
  props: {
    ad: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>

<style scoped>
@import "../assets/scss/_variables.scss";

.ad-container {
  position: relative;
  display: grid;
  place-items: center;
}

a {
  position: absolute;
  transform: translate(-0%, -45%);
}
/* .ad-content {
  position: relative;
}

.ad-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-size: cover;
  background-position: center;

} */

</style>
