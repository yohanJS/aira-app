<template>
<div class="container my-5">
  <h2 class="text-center mb-4">Customer Reviews</h2>

  <div class="card mb-4">
    <div class="card-body">
      <h5 class="card-title">Leave a Review</h5>
      <form>
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input type="text" class="form-control" id="name" required>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" class="form-control" id="email" required>
        </div>
        <div class="mb-3">
          <label for="rating" class="form-label">Rating</label>
          <select class="form-select" id="rating" required>
            <option selected disabled value="">Choose...</option>
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Good</option>
            <option value="3">3 - Average</option>
            <option value="2">2 - Poor</option>
            <option value="1">1 - Terrible</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="review" class="form-label">Review</label>
          <textarea class="form-control" id="review" rows="3" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>

  <div class="reviews">
    <div class="card mb-3" v-for="review in reviews" :key="review.id">
      <div class="card-body">
        <h5 class="card-title">{{ review.name }} <small class="text-muted">({{ review.rating }}/5)</small></h5>
        <h6 class="card-subtitle mb-2 text-muted">{{ review.email }}</h6>
        <p class="card-text">{{ review.text }}</p>
      </div>
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
      reviews: [
        { id: 1, name: 'John Doe', email: 'john@example.com', rating: 5, text: 'Excellent product!' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', rating: 4, text: 'Very good, will recommend!' }
      ]
    };
  },
  methods: {
    // Add methods for form submission and review handling
  }
};

</script>
