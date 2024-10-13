<script setup>
</script>

<template>
  <div class="about-container container-fluid p-4 shadow-lg rounded">
    <h2 class="fw-bold mb-4">About LuvoAI</h2>
    <p class="lead text-muted">
      <strong>LuvoAI</strong> is an AI-powered review assistant designed to help you enhance and refine your reviews. By offering suggestions and guiding you with relevant words or phrases, LuvoAI aims to improve the clarity, tone, and overall quality of your feedback. However, it's important to note that LuvoAI is not meant to write reviews for you—it simply assists in structuring and polishing your own thoughts.
    </p>
    <h3 class="mt-4 mb-3 fw-semibold">What LuvoAI Can Do:</h3>
    <ul class="list-unstyled ps-3">
      <li class="mb-2 d-flex align-items-start">
        <i class="bi bi-check-circle-fill text-success me-2"></i>
        <span>Provide helpful suggestions to enhance your review.</span>
      </li>
      <li class="mb-2 d-flex align-items-start">
        <i class="bi bi-check-circle-fill text-success me-2"></i>
        <span>Recommend key features or words to consider.</span>
      </li>
      <li class="mb-2 d-flex align-items-start">
        <i class="bi bi-check-circle-fill text-success me-2"></i>
        <span>Help you craft clearer, more engaging feedback.</span>
      </li>
    </ul>

    <h3 class="mt-4 mb-3 fw-semibold">What LuvoAI Cannot Do:</h3>
    <ul class="list-unstyled ps-3">
      <li class="mb-2 d-flex align-items-start">
        <i class="bi bi-x-circle-fill text-danger me-2"></i>
        <span>Generate reviews without your input or experience.</span>
      </li>
      <li class="mb-2 d-flex align-items-start">
        <i class="bi bi-x-circle-fill text-danger me-2"></i>
        <span>Write reviews on your behalf.</span>
      </li>
      <li class="mb-2 d-flex align-items-start">
        <i class="bi bi-x-circle-fill text-danger me-2"></i>
        <span>Be used to submit dishonest or misleading feedback.</span>
      </li>
    </ul>

    <p class="lead text-muted">
      <strong>LuvoAI</strong> is here to support your review process while ensuring that your feedback remains authentic and true to your own experience.
    </p>
  </div>
</template>

<style scoped>
.about-container {
  background-color: #ffffff;
  max-width: 700px;
  border-radius: 15px;
}

h2, h3 {
  color: #2c3e50;
  text-align: left; /* Ensure headings are left-aligned */
}

p, ul {
  color: #333;
  text-align: left; /* Left-align all paragraphs and lists */
}

i {
  margin-right: 10px;
}

@media (max-width: 768px) {
  .about-container {
    padding: 15px;
    margin: 10px auto;
  }

  h2 {
    font-size: 22px;
  }

  h3 {
    font-size: 18px;
  }
}
</style>
