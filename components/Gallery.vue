<template>
  <div>
    <br />
    <div class="container text-center">
      <h2 class="title pad-bt15">Galeri Masjid</h2>
      <div class="row g-4">
        <div
          class="col-md-4 col-sm-6 col-xs-12 galeri-item"
          v-for="(item, index) in paginatedItems"
          :key="index"
        >
          <figure>
            <img :src="item.imgUrl" alt="Kegiatan Masjid" class="gal-img" />
            <figcaption>
              <h2>{{ item.caption }}</h2>
              <p>{{ item.date }}</p>
              <button
                class="btn galeri-btn"
                @click="viewPhoto(item.id, item.caption)"
              >
                Lihat Foto
              </button>
            </figcaption>
          </figure>
        </div>
      </div>
      <br />
      <div class="pagination-controls mr-btn-15">
        <NuxtLink
          v-if="currentPage > 1"
          :to="`/gallery/page/${currentPage - 1}`"
          class="btn"
          id="btn-rounded"
        >
          &lt;
        </NuxtLink>
        <span class="mx-3" style="font-size: 20px; font-weight: 700;">{{ currentPage }}</span>
        <NuxtLink
          v-if="currentPage * itemsPerPage < galleryItems.length"
          :to="`/gallery/page/${currentPage + 1}`"
          class="btn"
          id="btn-rounded"
        >
          &gt;
        </NuxtLink>
      </div>
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

const fetchGalleryItems = async () => {
  try {
    const response = await fetch("/api/gallery");
    const result = await response.json();

    if (result.statusCode === 200 && Array.isArray(result.data)) {
      galleryItems.value = result.data.map(item => ({
        id: item.id, // Use actual ID from API response
        imgUrl: `data:image/jpeg;base64,${item.images[0]}`,
        caption: item.caption,
        date: formatDate(item.date),
      }));
    } else {
      console.error("Unexpected response format:", result);
    }
  } catch (error) {
    console.error("Error fetching gallery items:", error);
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