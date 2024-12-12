<template>
  <div>
    <br />
    <div class="container">
      <div class="card shadow-sm">
        <div class="card-header" id="card-header">
          <h3 class="title mb-0">Tambah Galeri</h3>
        </div>
        <div class="card-body">
          <form @submit.prevent="submitForm">
            <div class="mb-3">
              <label for="caption" class="form-label">Caption</label>
              <input
                type="text"
                id="caption"
                class="form-control"
                v-model="caption"
                required
              />
            </div>
            <div class="mb-3">
              <label for="date" class="form-label">Pilih Tanggal</label>
              <input
                type="date"
                id="date"
                class="form-control"
                v-model="date"
                required
              />
            </div>
            <div class="mb-3">
              <label for="galleryImg" class="form-label">Upload Gambar</label>
              <input
                type="file"
                id="galleryImg"
                class="form-control"
                @change="handleFileUpload"
                multiple
                required
              />
              <div v-if="galleryPreviews.length" class="mt-3">
                <div
                  v-for="(preview, index) in galleryPreviews"
                  :key="index"
                  class="mb-2"
                >
                  <img
                    :src="preview"
                    class="img-fluid rounded shadow-sm preview-image"
                    alt="Gallery Preview"
                  />
                </div>
              </div>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      caption: '',
      date: '',
      galleryFiles: [],
      galleryPreviews: []
    };
  },
  methods: {
    handleFileUpload(event) {
      this.galleryFiles = Array.from(event.target.files);
      this.galleryPreviews = this.galleryFiles.map(file => URL.createObjectURL(file));
    },
    async submitForm() {
      const formData = new FormData();
      formData.append('caption', this.caption);
      formData.append('date', this.date);
      this.galleryFiles.forEach((file, index) => {
        formData.append(`galleryImg[${index}]`, file);
      });

      try {
        const response = await fetch('/api/gallery', {
          method: 'POST',
          body: formData
        });

        const result = await response.json();
        if (response.ok) {
          alert(result.message);
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred while submitting the form.');
      }
    }
  }
};
</script>