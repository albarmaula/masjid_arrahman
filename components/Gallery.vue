<template>
  <div class="container">
    <div class="section-header text-center mb-5">
      <div class="row justify-content-center align-items-center">
        <div
          class="title-wrapper d-flex align-items-center justify-content-center gap-3 nav-link"
        >
          <a class="title mb-0" href="/gallery"
            >GALERI MASJID <i class="bi bi-box-arrow-up-right"></i
          ></a>
        </div>
      </div>
    </div>
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-spinner">
      <div class="spinner"></div>
    </div>
    <!-- Gallery Grid -->
    <div v-else class="gallery-grid">
      <div
        v-for="(item, index) in paginatedItems"
        :key="index"
        class="gallery-item fade-in"
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

    <!-- Updated Pagination -->
    <div class="gallery-pagination">
      <button
        class="nav-btn-page"
        @click="goToPage(1)"
        :disabled="currentPage === 1"
        title="First Page"
      >
        <i class="bi bi-chevron-double-left"></i>
      </button>
      <button
        class="nav-btn-page"
        @click="currentPage--"
        :disabled="currentPage === 1"
        title="Previous Page"
      >
        <i class="bi bi-chevron-left"></i>
      </button>

      <div class="page-numbers">
        <template v-for="pageNum in displayedPageNumbers" :key="pageNum">
          <span v-if="pageNum === '...'" class="page-ellipsis">...</span>
          <button
            v-else
            class="page-number"
            :class="{ active: currentPage === pageNum }"
            @click="goToPage(pageNum)"
          >
            {{ pageNum }}
          </button>
        </template>
      </div>

      <button
        class="nav-btn-page"
        @click="currentPage++"
        :disabled="currentPage >= totalPages"
        title="Next Page"
      >
        <i class="bi bi-chevron-right"></i>
      </button>
      <button
        class="nav-btn-page"
        @click="goToPage(totalPages)"
        :disabled="currentPage >= totalPages"
        title="Last Page"
      >
        <i class="bi bi-chevron-double-right"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
const route = useRoute();

interface GalleryItem {
  id: number;
  imgUrl: string;
  caption: string;
  date: string;
  images: string[];
}
const galleryItems = ref<GalleryItem[]>([]);
const currentPage = ref(parseInt(localStorage.getItem("galleryPage") || "1"));
const itemsPerPage = 6;

const displayedPageNumbers = computed(() => {
  const delta = 2;
  const range: (number | string)[] = [];
  
  for (let i = 1; i <= totalPages.value; i++) {
    if (
      i === 1 || 
      i === totalPages.value ||
      (i >= currentPage.value - delta && i <= currentPage.value + delta)
    ) {
      range.push(i);
    } else if (range[range.length - 1] !== '...') {
      range.push('...');
    }
  }
  
  return range;
});

const goToPage = (page: number) => {
  currentPage.value = page;
  localStorage.setItem('galleryPage', page.toString());
};

watch(currentPage, (newPage) => {
  localStorage.setItem("galleryPage", newPage.toString());
});

const viewPhoto = (id, caption) => {
  const urlFriendlyCaption = formatUrlString(caption);
  // Simpan halaman saat ini sebelum navigasi
  localStorage.setItem("galleryPage", currentPage.value.toString());
  navigateTo(`/gallery/${id}/${urlFriendlyCaption}`);
};

const totalPages = computed(() =>
  Math.ceil(galleryItems.value.length / itemsPerPage)
);

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
      galleryItems.value = result.data.map((item) => ({
        id: item.id,
        imgUrl: item.images[0],
        caption: item.caption,
        date: formatDate(item.date),
        images: item.images,
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
    .replace(/[']/g, "")
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("id-ID", options);
};

watch(
  () => route.params.page,
  (newPage) => {
    const totalPages = Math.ceil(galleryItems.value.length / itemsPerPage);
    if (currentPage.value < 1 || currentPage.value > totalPages) {
      navigateTo("/gallery/page/1");
    }
  }
);

onMounted(fetchGalleryItems);
</script>
