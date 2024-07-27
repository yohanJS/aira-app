<template>
  <div class="container-fluid bg-light pt-5 pb-5">
    <div class="row d-flex justify-content-center mb-4">
      <div class="col-xs-12 col-md-6">
        <h5 class="display-6 m-0">Write a better review</h5>
        <form class="p-4 text-start" @submit.prevent="generateWords">
          <div class="mb-3 pt-3">
            <label class="form-label">Enter product or service</label>
            <input class="form-control" type="text" placeholder="'iPhone 13', 'Pepsi', 'Restaurant Bahama Breeze.'"
              v-model="productOrService">
            <p class="mt-3">{{ words }}
              <span v-if="displaySpinnerMessage">
                <div class="spinner-border spinner-border-sm text-dark" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
              </span> 
            </p>
            <button class="btn rounded-pill btn-grad text-dark fw-bold m-0">Generate words</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      productOrService: null,
      displaySpinnerMessage: false,
      words: null
    }
  },
  methods: {
    async generateWords() {
      this.words = 'Generating words..'
      try {
        this.displaySpinnerMessage = true
        const localApiEndPoint = "https://localhost:7165/api/GenerateWords"
        //const prdApiEndPoint = "https://www.bloggyapi.com/api/GenerateWords"
        const { data } = await axios.post(localApiEndPoint, {
          productOrService: this.productOrService
        });
        this.words = data
        this.displaySpinnerMessage = false

      } catch (error) {
        this.words = 'Error! Could not reach the API. ' + error
      } finally {
        
      }
    }
  }
}

</script>

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