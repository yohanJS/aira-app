<template>
  <div class="container-fluid bg-light pt-5 pb-5 shadow-lg" id="generateReviewSection">
    <div class="row d-flex justify-content-center mb-4">
      <div class="col-xs-12 col-md-6">
        <h5 class="display-6 text-start">Write a better review</h5>
        <form class="p-2 text-start" @submit.prevent="generateWords">
          <div class="mb-3 pt-3">
            <label class="form-label">Enter a product or service:</label>
            <input class="form-control" type="text"
              v-model="productOrService">
            <button class="btn rounded-pill btn-grad text-dark fw-bold m-0 mt-3">
              <div v-if="!displaySpinnerWord">
                Generate words
              </div>
              <span v-if="displaySpinnerWord">
                <div class="spinner-border spinner-border-sm text-dark" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </span>
            </button>
          </div>
          <div class="mt-4">
            <div v-if="positiveWords.length > 0">
              <div class="word-bubbles">
                <span v-for="word in positiveWords" :key="word"
                  :class="['bubble', 'positive', { selected: selectedPositiveWords.includes(word) }]"
                  @click="toggleWord(word, 'positive')">{{ word }}</span>
              </div>
            </div>
            <div class="mt-3" v-if="negativeWords.length > 0">
              <div class="word-bubbles">
                <span v-for="word in negativeWords" :key="word"
                  :class="['bubble', 'negative', { selected: selectedNegativeWords.includes(word) }]"
                  @click="toggleWord(word, 'negative')">{{ word }}</span>
              </div>
            </div>
          </div>
        </form>
        <div class="col-xs-12 text-start mt-0 p-2">
          <button class="btn rounded-pill btn-grad text-dark fw-bold m-0 mt-3"
          v-if="positiveWords.length > 0 || negativeWords.length > 0" @click="generateReview">
            <div v-if="!displaySpinnerReview">
              Generate review
            </div>
            <span v-if="displaySpinnerReview">
              <div class="spinner-border spinner-border-sm text-dark" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </span>
          </button>
          <div class="box mt-3 shadow-lg" v-if="generatedReview">
            <p class="content">{{ generatedReview }}</p>
            <button class="copy-button" @click="copyText">Copy</button>
          </div>
        </div>
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
      displaySpinnerWord: false,
      displaySpinnerReview: false,
      positiveWords: [],
      negativeWords: [],
      selectedPositiveWords: [],
      selectedNegativeWords: [],
      generatedReview: null
    }
  },
  methods: {
    async generateWords() {
      try {
        var words = this.positiveWords.join(", ") + this.negativeWords.join(", ")
        this.displaySpinnerWord = true
        const localApiEndPoint = "https://localhost:7165/api/GenerateWords"
        const prdApiEndPoint = "https://www.bloggyapi.com/api/GenerateWords"
        const { data } = await axios.post(prdApiEndPoint, {
          productOrService: this.productOrService + " Previous words: " + words
        });
        this.displaySpinnerWord = false;
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
        this.displaySpinnerWord = false;
        this.words = 'Error! Could not reach the API. ' + error
      }
    },
    async generateReview() {
      try {
        this.displaySpinnerReview = true;
        const localApiEndPoint = "https://localhost:7165/api/GenerateReview"
        const prdApiEndPoint = "https://www.bloggyapi.com/api/GenerateReview"
        const positiveWordsString = this.selectedPositiveWords.join(' ');
        const negativeWordsString = this.selectedNegativeWords.join(' ');
        const payload = {
          model: "",
          messages: [
            {
              id: 0,
              role: "",
              content: "product or service: " + this.productOrService + ". Words: " + this.positiveWords + this.negativeWords
            }
          ]
        };
        const { data } = await axios.post(prdApiEndPoint, payload, {
        });
        this.displaySpinnerReview = false;
        this.generatedReview = data;
      } catch (error) {
        console.log(error);
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
    },
    copyText() {
      const textToCopy = this.generatedReview;
      navigator.clipboard.writeText(textToCopy).then(() => {
        alert('Copied to clipboard');
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
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
  color: #000;
}

.bubble.negative {
  background-color: #ffb3b3;
  color: #fff;
}

.bubble.selected {
  background-image: linear-gradient(to right, #A8E6CF 0%, #D0E1F9 100%);
  color: #000;
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

.box {
  padding: 20px;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.copy-button {
  top: 10px;
  right: 10px;
  padding: 5px 40px;
  background-color: #b3e5fc;
  color: #000;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

.copy-button:hover {
  background-color: #81d4fa;
}

.content {
  word-wrap: break-word;
  letter-spacing: 0.02rem;
}
</style>