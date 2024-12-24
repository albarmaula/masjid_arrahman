<template>
    <div class="container">
      <h2 class="title pad-bt15">Galeri Masjid</h2>
      <!-- Loading State -->
      <div v-if="isLoading" class="loading-spinner">
        <div class="spinner"></div>
      </div>
      <!-- Gallery Grid -->
      <div v-else class="gallery-grid">
        <div
          v-for="(item, index) in paginatedItems"
          :key="index"
          class="gallery-item"
        >
          <div class="gallery-card">
            <img :src="item.imgUrl" :alt="item.caption" class="gallery-image" />
            <div class="gallery-overlay">
              <h3 class="gallery-caption">{{ item.caption }}</h3>
              <p class="gallery-date">{{ item.date }}</p>
              <button
                class="gallery-btn"
                @click="viewPhoto(item.id, item.caption)"
              >
                Lihat Foto
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="gallery-pagination">
        <NuxtLink
          v-if="currentPage > 1"
          :to="`/gallery/page/${currentPage - 1}`"
          class="nav-btn-page"
        >
        <i class="bi bi-chevron-left"></i>
        </NuxtLink>
        <span class="pagination-current">{{ currentPage }}</span>
        <NuxtLink
          v-if="currentPage * itemsPerPage < galleryItems.length"
          :to="`/gallery/page/${currentPage + 1}`"
          class="nav-btn-page"
        >
        <i class="bi bi-chevron-right"></i>
        </NuxtLink>
      </div>
    </div>
</template>

<script setup>
const route = useRoute();

const galleryItems = ref([]);
const itemsPerPage = 6;

const currentPage = computed(() => {
  return parseInt(route.params.page) || 1;
});

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return galleryItems.value.slice(start, end);
});

const isLoading = ref(true);

const fetchGalleryItems = async () => {
  try {
    isLoading.value = true;
    const response = await fetch("/api/gallery");
    const result = await response.json();

    if (result.statusCode === 200 && Array.isArray(result.data)) {
      galleryItems.value = result.data.map(item => ({
        id: item.id,
        imgUrl: `data:image/jpeg;base64,${item.images[0]}`,
        caption: item.caption,
        date: formatDate(item.date),
      }));
    } else {
      console.error("Unexpected response format:", result);
    }
  } catch (error) {
    console.error("Error fetching gallery items:", error);
  } finally {
    isLoading.value = false;
  }
};

// SEO Friendly URL
const formatUrlString = (str) => {
  return str
    .toLowerCase()
    .replace(/[']/g, '')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

const viewPhoto = (id, caption) => {
  const urlFriendlyCaption = formatUrlString(caption);
  navigateTo(`/gallery/${id}/${urlFriendlyCaption}`);
};

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("id-ID", options);
};

watch(() => route.params.page, (newPage) => {
  const totalPages = Math.ceil(galleryItems.value.length / itemsPerPage);
  if (currentPage.value < 1 || currentPage.value > totalPages) {
    navigateTo('/gallery/page/1');
  }
});

onMounted(fetchGalleryItems);
</script>