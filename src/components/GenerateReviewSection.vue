<template>
  <div class="container my-5">
    <h2 class="text-center mb-4">Customer Reviews</h2>

    <div class="card mb-4">
      <div class="card-body">
        <h5 class="card-title">Leave a Review</h5>
        <form @submit.prevent="generateReview">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" id="name" v-model="form.name" required>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" v-model="form.email" required>
          </div>
          <div class="mb-3">
            <label for="rating" class="form-label">Rating</label>
            <select class="form-select" id="rating" v-model="form.rating" required>
              <option selected disabled value="">Choose...</option>
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Good</option>
              <option value="3">3 - Average</option>
              <option value="2">2 - Poor</option>
              <option value="1">1 - Terrible</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="positive-words" class="form-label">Positive Words</label>
            <select class="form-select" id="positive-words" v-model="form.positiveWords" multiple>
              <option value="amazing">Amazing</option>
              <option value="awesome">Awesome</option>
              <option value="fantastic">Fantastic</option>
              <option value="great">Great</option>
              <option value="excellent">Excellent</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="negative-words" class="form-label">Negative Words</label>
            <select class="form-select" id="negative-words" v-model="form.negativeWords" multiple>
              <option value="bad">Bad</option>
              <option value="poor">Poor</option>
              <option value="terrible">Terrible</option>
              <option value="disappointing">Disappointing</option>
              <option value="awful">Awful</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="tone" class="form-label">Tone</label>
            <select class="form-select" id="tone" v-model="form.tone" required>
              <option selected disabled value="">Choose...</option>
              <option value="formal">Formal</option>
              <option value="informal">Informal</option>
              <option value="enthusiastic">Enthusiastic</option>
              <option value="neutral">Neutral</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">Generate Review</button>
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
.reviews {
  max-height: 400px;
  overflow-y: auto;
}

.card {
  border-radius: 10px;
}

.card-body {
  padding: 20px;
}

.card-title {
  margin-bottom: 0;
}

.card-subtitle {
  margin-top: 5px;
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
        positiveWords: [],
        negativeWords: [],
        tone: ''
      },
      generatedReview: '',
      reviews: [
        { id: 1, name: 'John Doe', email: 'john@example.com', rating: 5, text: 'Excellent product!' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', rating: 4, text: 'Very good, will recommend!' }
      ]
    };
  },
  methods: {
    generateReview() {
      const positiveWords = this.form.positiveWords.join(', ');
      const negativeWords = this.form.negativeWords.join(', ');
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
