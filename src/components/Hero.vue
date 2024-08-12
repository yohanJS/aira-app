<script>
import GenerateReviewSection from './GenerateReviewSection.vue'
export default {
  components: {
    GenerateReviewSection
  },
  data() {
    return {
      isMobile: false,
      displayApp: false
    };
  },
  mounted() {
    this.isMobile = window.innerWidth < 600;
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    hideShowHeroSection() {
      this.displayApp = !this.displayApp;
    },
    handleResize() {
      this.isMobile = window.innerWidth < 600;
    }
  }
};
</script>

<template>
  <div class="container-fluid p-0">
    <div class="row g-0 bg-color min-vh-100 d-flex">
      <div class="col-12 align-content-center">
        <h1 class="display-2 btn-text-color fw-size-400 mt-5">Meet Aira, Your Review Tool</h1>
      </div>
      <div class="col-md-12">
        <p id="welcomeMsg" class="mt-4 pb-3 btn-text-color fw-size-600">
          Revolutionize Your Reviews with AI
        </p>
        <!-- <button class="btn rounded-pill btn-dark text-light fw-bold m-0"
              onclick="window.location.href='#generateReviewSection'">Explore AI</button> -->
      </div>
      <div class="col-md-12 bg-light text-dark pt-3">
        <GenerateReviewSection></GenerateReviewSection>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-color {
  background-image: linear-gradient(to right, #AAFFA9 0%, #11FFBD 51%, #AAFFA9 100%);
}

.btn-color {
  background-color: #CFDD51;
}

.btn-text-color {
  color: #1C434D;
}

.glass-button {
  background-color: rgba(255, 255, 255, 0.1);
  /* Adjust the opacity (0.3) as needed */
  backdrop-filter: blur(10px);
  /* Adjust the blur value as needed */
}

.fw-size-400 {
  font-weight: 400;
}

.fw-size-600 {
  font-weight: 600;
}

.mr-r {
  margin-right: 20px;
}
</style>
