<template>
  <div class="container-fluid bg-light pt-5 pb-5">
    <div class="row d-flex justify-content-center mb-4">
      <div class="col-xs-12 col-md-6">
        <h5 class="display-6">Write a better review</h5>
        <form @submit.prevent="generateReview" class="p-4 text-start">
          <div class="mb-3 pt-3">
            <label class="form-label">Pick your words</label>
            <div class="word-bubbles">
              <div
                v-for="word in words"
                :key="word.value"
                class="bubble"
                :class="{'selected': selectedWords.includes(word.value), 'positive': word.type === 'positive', 'negative': word.type === 'negative'}"
                @click="toggleWordSelection(word.value)"
              >
                {{ word.label }}
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Tone</label>
            <div class="radio-buttons">
              <label>
                <input type="radio" value="formal" v-model="form.tone"> Formal
              </label>
              <label>
                <input type="radio" value="informal" v-model="form.tone"> Informal
              </label>
              <label>
                <input type="radio" value="enthusiastic" v-model="form.tone"> Enthusiastic
              </label>
              <label>
                <input type="radio" value="neutral" v-model="form.tone"> Neutral
              </label>
            </div>
          </div>
          <button type="submit" class="btn rounded-pill btn-grad text-dark fw-bold m-0">Generate Review</button>
        </form>
      </div>
    </div>

    <div v-if="generatedReview" class="card mb-4">
      <div class="card-body">
        <h5 class="card-title">Generated Review</h5>
        <p class="card-text">{{ generatedReview }}</p>
        <button @click="copyReview" class="btn btn-secondary">Copy Review</button>
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

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        rating: '',
        tone: ''
      },
      generatedReview: '',
      words: [
        { value: 'amazing', label: 'Amazing', type: 'positive' },
        { value: 'awesome', label: 'Awesome', type: 'positive' },
        { value: 'fantastic', label: 'Fantastic', type: 'positive' },
        { value: 'great', label: 'Great', type: 'positive' },
        { value: 'excellent', label: 'Excellent', type: 'positive' },
        { value: 'bad', label: 'Bad', type: 'negative' },
        { value: 'poor', label: 'Poor', type: 'negative' },
        { value: 'terrible', label: 'Terrible', type: 'negative' },
        { value: 'disappointing', label: 'Disappointing', type: 'negative' },
        { value: 'awful', label: 'Awful', type: 'negative' }
      ],
      selectedWords: []
    };
  },
  methods: {
    toggleWordSelection(wordValue) {
      if (this.selectedWords.includes(wordValue)) {
        this.selectedWords = this.selectedWords.filter(word => word !== wordValue);
      } else {
        this.selectedWords.push(wordValue);
      }
    },
    generateReview() {
      const selectedWords = this.words.filter(word => this.selectedWords.includes(word.value));
      const positiveWords = selectedWords.filter(word => word.type === 'positive').map(word => word.label).join(', ');
      const negativeWords = selectedWords.filter(word => word.type === 'negative').map(word => word.label).join(', ');
      this.generatedReview = `Name: ${this.form.name}
      Email: ${this.form.email}
      Rating: ${this.form.rating}
      Positive Words: ${positiveWords}
      Negative Words: ${negativeWords}
      Tone: ${this.form.tone}
      Review: This product is ${positiveWords}. However, it could be ${negativeWords}. Overall, my experience was ${this.form.tone}.`;
    },
    copyReview() {
      navigator.clipboard.writeText(this.generatedReview).then(() => {
        alert('Review copied to clipboard');
      });
    }
  }
};
</script>
