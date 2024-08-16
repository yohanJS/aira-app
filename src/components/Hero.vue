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
  <div class="container-fluid p-0 d-flex flex-column min-vh-100">
    <div class="row g-0 bg-color flex-grow-1 d-flex align-items-center justify-content-center">
      <div class="col-12 text-center">
        <h1 class="display-2 btn-text-color fw-size-400 mt-5">
          Meet Aira, Your Review Tool
        </h1>
      </div>
      <div class="col-md-12 text-center">
        <p id="welcomeMsg" class="mt-4 pb-3 btn-text-color fw-size-600">
          Revolutionize Your Reviews with AI
        </p>
      </div>
    </div>
    <!-- Placing GenerateReviewSection at the bottom -->
    <div class="row g-0">
      <div class="col-md-12">
        <GenerateReviewSection />
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
  backdrop-filter: blur(10px);
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

/* Ensure the GenerateReviewSection stays at the bottom */
.container-fluid {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.flex-grow-1 {
  flex-grow: 1;
}

.row.g-0 {
  margin: 0;
}

h1, p {
  text-align: center;
}
</style>

