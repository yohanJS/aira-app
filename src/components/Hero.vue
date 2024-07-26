<template>
  <div class="container-fluid">
    <div class="row g-0">
      <div class="col-md-12 shadow-lg position-relative">
        <div class="row d-flex flex-column bg-color pt-5 align-items-center text-center text-white" style="top: 0; left: 0; height: 100vh; z-index: 1;">
          <div id="section" class="col-12 mt-5">

          </div>
          <div class="col-12 p-3">
            <h1 class="display-2 btn-text-color fw-size-400">Meet Aira, Your Intelligent Companion</h1>
          </div>
          <div class="row">
            <div class="col-12 mt-5">
              <p id="welcomeMsg" class="mt-4 pb-3 btn-text-color fw-size-600">
              Experience the future of AI assistance with our cutting-edge technology.
              </p>
              <button class="btn rounded-pill btn-dark text-light fw-bold m-0"  onclick="window.location.href='#freeQuoteBtn'">Explore AI</button>    
            </div>
          </div>
         </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-color {
  background-image: linear-gradient(to right, #AAFFA9 0%, #11FFBD  51%, #AAFFA9  100%);
}
.btn-color {
  background-color: #CFDD51;
}
.btn-text-color {
  color: #1C434D;
}
.glass-button {
  background-color: rgba(255, 255, 255, 0.1); /* Adjust the opacity (0.3) as needed */
  backdrop-filter: blur(10px); /* Adjust the blur value as needed */
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

<script setup>
import { ref, onMounted } from 'vue';

const isMobile = ref(false);
const isDesktop = ref(false);

onMounted(() => {
isMobile.value = window.innerWidth < 600;
});

window.addEventListener('resize', () => {
isMobile.value = window.innerWidth < 600;
let welcomeMsg = document.getElementById("welcomeMsg");

if (isMobile.value) {
  welcomeMsg.classList.remove("mt-4");
} else {
  welcomeMsg.classList.add("mt-4");
  freeQuoteBtn.classList.add("mr-r");
}
});
</script>
