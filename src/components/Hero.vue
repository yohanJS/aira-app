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
  <div class="container-fluid p-0 rounded-3">
    <div class="row g-0 bg-color d-flex justify-content-center min-vh-100">
      <div class="col-xs-12 align-self-center">
        <h1 class="display-2 mt-5 btn-text-color fw-size-400 m-0">
          Meet LuvoAI
        </h1>
        <p id="welcomeMsg" class="pb-3 mb-5 lead btn-text-color fw-size-600">
          Your AI review assistant
        </p>
      </div>
      <div class="col-12 col-md-6">
        <div class="mt-4 m-1 btn-color rounded shadow-lg pt-2 pb-1">
            <GenerateReviewSection />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-color {
  background-image: linear-gradient(to right, #AAFFA9 0%, #11FFBD 51%, #AAFFA9 100%);
}

.btn-color {
  background-color: #1C434D;
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
  overflow-y: auto;
}

.flex-grow-1 {
  flex-grow: 1;
  overflow-y: auto;
}

.row.g-0 {
  margin: 0;
}

h1, p {
  text-align: center;
}
</style>

