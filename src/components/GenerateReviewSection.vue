<template>
  <div class="container-fluid bg-light pt-5 pb-5">
    <div class="row d-flex justify-content-center mb-4">
      <div class="col-xs-12 col-md-6">
        <h5 class="display-6 m-0">Write a better review</h5>
        <form @submit.prevent="generateReview" class="p-4 text-start">
          <div class="mb-3 pt-3">
            <label class="form-label">Enter product or service <strong>(with period at the end)</strong></label>
            <input class="form-control" type="text" placeholder="'iPhone 13.', 'AC Fix.', 'restaurant.'" v-model="productOrService" :disabled="loading">  
            <p class="mt-3">{{ words }}</p>
            <div class="col-12 text-center" v-if="displaySpinnerMessage">
              <span>
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-grad {
  background-image: linear-gradient(to right, #AAFFA9 0%, #11FFBD 51%, #AAFFA9 100%);
  text-align: center;
  transition: 0.5s;
  background-size: 200% auto;
}

.btn-grad:hover {
  background-position: right center;
  color: #fff;
  text-decoration: none;
}

.word-bubbles {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.bubble {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 50px;
  background-color: #e0e0e0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.bubble.positive {
  background-color: #a4e6a6;
}

.bubble.negative {
  background-color: #ffb3b3;
}

.bubble.selected {
  background-image: linear-gradient(to right, #AAFFA9 0%, #11FFBD 51%, #AAFFA9 100%);
  color: #fff;
}

.bubble:hover {
  background-color: #c0c0c0;
}

.radio-buttons {
  display: flex;
  gap: 10px;
}

.radio-buttons label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.radio-buttons input[type="radio"] {
  margin-right: 5px;
}

.reviews {
  max-height: 400px;
  overflow-y: auto;
}
</style>

<script setup>
import axios from 'axios'
import { ref, watch } from 'vue'

const productOrService = ref('')
const words = ref('')
const loading = ref(false)
let displaySpinnerMessage = false

watch(productOrService, async (newProductOrService) => {
  if (newProductOrService.includes('.')) {
    loading.value = true
    words.value = 'Generating words..'
    try {
      displaySpinnerMessage = true
      const { data } = await axios.post("https://www.bloggyapi.com/api/GenerateWords", {
        productOrService: newProductOrService
      });
      words.value = data
      displaySpinnerMessage = false
      setTimeout(() => {
        window.location.href = "#";
      }, 5000);

    } catch (error) {
      words.value = 'Error! Could not reach the API. ' + error
    } finally {
      loading.value = false
    }
  }
})
</script>

