<template>
  <div class="container-fluid p-0 bg-color">
    <div class="row g-0">
      <div class="col-md-12 shadow-lg position-relative">
        <div class="row d-flex flex-column pt-5 align-items-center text-center text-white" style="position: absolute; top: 0; left: 0; width: 100%; height: 100vh; z-index: 1;">
          <div id="section" class="col-12 mt-5">
       
          </div>
          <div class="col-12">
            <h1 class="display-1">Meet Aeero, Your Intelligent Companion</h1>
          </div>
          <div class="row">
            <div class="col-12 mt-5">
              <p id="welcomeMsg" class="mt-4 pb-3">
              Experience the future of AI assistance with our cutting-edge technology.
              </p>    
            </div>
          </div>
         </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-color {
  background-color: #0a323d;
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
.btn-border-color {
  border: 1px solid #CFDD51;
}
.text-color {
  color: #cfdd51;
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
