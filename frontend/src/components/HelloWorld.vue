<template>
  <div>
    <h1>MetaExploreX</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label>Choose your log file type!</label>
        <select v-model="fileType" class="form-control" required>
          <option disabled value="">Choose file type!</option>
          <option value="single">All MRs in a single file</option>
          <option value="multiple">All MRs in multiple files</option>
        </select>
      </div>
      <br>
      <label>How many MRs will be in the log file?</label>
      <input v-model="numMRs" type="number" placeholder="Enter the number of MRs" class="form-control" required :readonly="fileType === 'multiple'">
      <button type="submit" class="btn btn-primary pt-3" id="upload-button">Next</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileType: '',
      numMRs: '',
    };
  },
  methods: {
    submitForm() {
      if (this.fileType === '' || this.numMRs === '') {
        alert('Please fill out all the required fields.');
      } else {
        // Handle form submission, e.g., redirect to another page or make an API request
        // You can access fileType using this.fileType and numMRs using this.numMRs
      }
    },
  },
};
</script>
