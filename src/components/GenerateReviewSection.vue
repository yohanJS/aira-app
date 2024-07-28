<template>
  <div class="container-fluid bg-light pt-5 pb-5">
    <div class="row d-flex justify-content-center mb-4">
      <div class="col-xs-12 col-md-6">
        <h5 class="display-6 m-0">Write a better review</h5>
        <form class="p-4 text-start" @submit.prevent="generateWords">
          <div class="mb-3 pt-3">
            <label class="form-label">Enter product or service</label>
            <input class="form-control" type="text" placeholder="'iPhone 13', 'Pepsi', 'Restaurant Bahama Breeze.'" v-model="productOrService">
            <span v-if="displaySpinnerMessage">
              <div class="spinner-border spinner-border-sm text-dark" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </span>
            <button class="btn rounded-pill btn-grad text-dark fw-bold m-0 mt-3" v-if="!positiveWords.length || !negativeWords.length">Generate words</button>
          </div>
          <div class="mt-4">
            <div v-if="positiveWords.length > 0">
              <div class="word-bubbles">
                <span v-for="word in positiveWords" :key="word" :class="['bubble', 'positive', { selected: selectedPositiveWords.includes(word) }]" @click="toggleWord(word, 'positive')">{{ word }}</span>
              </div>
            </div>
            <div class="mt-3" v-if="negativeWords.length > 0">
              <div class="word-bubbles">
                <span v-for="word in negativeWords" :key="word" :class="['bubble', 'negative', { selected: selectedNegativeWords.includes(word) }]" @click="toggleWord(word, 'negative')">{{ word }}</span>
              </div>
            </div>
          </div>
          <button class="btn rounded-pill btn-grad text-dark fw-bold m-0 mt-4" v-if="positiveWords.length > 0 || negativeWords.length > 0">Generate review</button>
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
      positiveWords: [],
      negativeWords: [],
      selectedPositiveWords: [],
      selectedNegativeWords: []
    }
  },
  methods: {
    async generateWords() {
      this.words = 'Generating words..'
      try {
        this.displaySpinnerMessage = true
        const localApiEndPoint = "https://localhost:7165/api/GenerateWords"
        const prdApiEndPoint = "https://www.bloggyapi.com/api/GenerateWords"
        const { data } = await axios.post(prdApiEndPoint, {
          productOrService: this.productOrService
        });
        this.displaySpinnerMessage = false;
        const regex = /(Positive|Negative):\s*([a-z, ]+)/gi;
        const matches = data.match(regex);

        matches.forEach(match => {
          const [category, words] = match.split(':').map(part => part.trim());
          const wordArray = words.split(',').map(word => word.trim());

          if (category.toLowerCase() === 'positive') {
            this.positiveWords = wordArray;
          } else if (category.toLowerCase() === 'negative') {
            this.negativeWords = wordArray;
          }
        });
      } catch (error) {
        this.displaySpinnerMessage = false;
        this.words = 'Error! Could not reach the API. ' + error
      }
    },
    toggleWord(word, type) {
      if (type === 'positive') {
        const index = this.selectedPositiveWords.indexOf(word);
        if (index > -1) {
          this.selectedPositiveWords.splice(index, 1);
        } else {
          this.selectedPositiveWords.push(word);
        }
      } else if (type === 'negative') {
        const index = this.selectedNegativeWords.indexOf(word);
        if (index > -1) {
          this.selectedNegativeWords.splice(index, 1);
        } else {
          this.selectedNegativeWords.push(word);
        }
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
  background-image: linear-gradient(to right, #FAD0C4 0%, #FFD1FF 100%);
  color: #040404;
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