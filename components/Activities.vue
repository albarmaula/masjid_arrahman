<template>
  <div class="container">
    <h2 class="title pad-bt15">Kegiatan Masjid</h2>
    <div class="row justify-content-center">
      <div class="wrap-item text-center col-lg-9 col-md-10">
        <!-- Month and Year Selector -->
        <div class="mb-3 month-selector">
          <button
            v-if="!isFirstMonth"
            @click="previousMonth"
            class="nav-btn-page"
            :class="{ disabled: isFirstMonth }"
          >
            <i class="bi bi-chevron-left"></i>
          </button>
          <h3 class="month-title">
            {{ months[selectedMonth] }} {{ selectedYear }}
          </h3>
          <button
            v-if="!isLastMonth"
            @click="nextMonth"
            class="nav-btn-page"
            :class="{ disabled: isLastMonth }"
          >
            <i class="bi bi-chevron-right"></i>
          </button>
        </div>

        <!-- Tab Panel -->
        <ul class="nav nav-tabs justify-content-center mb-3" id="kegiatanTabs">
          <li class="nav-tabs-item">
            <button
              class="nav-tabs-link"
              :class="{ active: activeTab === 1 }"
              @click="setActiveTab(1)"
            >
              AGENDA
            </button>
          </li>
          <li class="nav-tabs-item">
            <button
              class="nav-tabs-link"
              :class="{ active: activeTab === 2 }"
              @click="setActiveTab(2)"
            >
              FLYER
            </button>
          </li>
        </ul>

        <!-- Loading State -->
      <div v-if="isLoading" class="loading-spinner">
        <div class="spinner"></div>
      </div>
        <!-- Tab Content -->
        <div v-if="activeTab === 1" class="image-container">
          <div class="carousel-inner position-relative">
            <div
              v-for="(activity, index) in currentMonthActivities"
              :key="activity.id"
              :class="['carousel-item', { active: index === 0 }]"
              @click="openModal(activity.agenda)"
            >
              <img
                v-if="activity.agenda"
                :src="'data:image/jpeg;base64,' + activity.agenda"
                class="act-img img-fluid"
                alt="Agenda Image"
              />
            </div>
          </div>
        </div>

        <div v-if="activeTab === 2" class="image-container">
          <div class="carousel-inner position-relative">
            <div
              v-for="flyer in paginatedFlyers"
              :key="flyer.id"
              @click="openModal(flyer.img)"
            >
              <img
                :src="'data:image/jpeg;base64,' + flyer.img"
                class="act-img img-fluid"
                :alt="flyer.description || 'Flyer Image'"
              />
            </div>
            <button
              v-if="currentPage > 1"
              class="nav-btn prev"
              :class="{ disabled: currentPage === 1 }"
              @click.stop="previousPage"
            >
              <i class="bi bi-chevron-left"></i>
            </button>
            <button
              v-if="currentPage < totalPages"
              class="nav-btn next"
              :class="{ disabled: currentPage === totalPages }"
              @click.stop="nextPage"
            >
              <i class="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Image Modal -->
  <div v-if="showModal" class="modal-background" @click.self="closeModal">
    <button class="close-button" @click="closeModal">&times;</button>
    <div class="modal-container">
      <img
        :src="'data:image/jpeg;base64,' + selectedImage"
        class="modal-image"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

const activeTab = ref(1);
const activities = ref([]);
const currentMonthActivities = ref([]);
const allFlyers = ref([]);
const error = ref(null);

const selectedMonth = ref(new Date().getMonth());
const selectedYear = ref(new Date().getFullYear());

const months = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const minYear = 2024;
const minMonth = 10; // November (0-based index)
const maxYear = new Date().getFullYear();
const maxMonth = new Date().getMonth();

const isFirstMonth = computed(() => {
  return selectedMonth.value === minMonth && selectedYear.value === minYear;
});

const isLastMonth = computed(() => {
  return selectedMonth.value === maxMonth && selectedYear.value === maxYear;
});

const setActiveTab = (tab) => {
  activeTab.value = tab;
};

const isLoading = ref(true);

const fetchActivities = async () => {
  try {
    const response = await axios.get("/api/activities");
    activities.value = response.data.data;
    filterActivities();
  } catch (err) {
    error.value = "An error occurred while fetching activities";
    console.error("Error fetching activities:", err);
  } finally {
    isLoading.value = false;
  }
};

const filterActivities = () => {
  currentMonthActivities.value = activities.value.filter((activity) => {
    const activityDate = new Date(activity.date);
    return (
      activityDate.getMonth() === selectedMonth.value &&
      activityDate.getFullYear() === selectedYear.value
    );
  });

  allFlyers.value = currentMonthActivities.value.flatMap(
    (activity) => activity.flyers
  );
  currentPage.value = 1;
};

const previousMonth = () => {
  if (selectedMonth.value === 0) {
    selectedMonth.value = 11;
    selectedYear.value--;
  } else {
    selectedMonth.value--;
  }
  filterActivities();
};

const nextMonth = () => {
  if (selectedMonth.value === 11) {
    selectedMonth.value = 0;
    selectedYear.value++;
  } else {
    selectedMonth.value++;
  }
  filterActivities();
};

// Pagination
const currentPage = ref(1);
const flyersPerPage = 1;

const paginatedFlyers = computed(() => {
  const start = (currentPage.value - 1) * flyersPerPage;
  const end = start + flyersPerPage;
  return allFlyers.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(allFlyers.value.length / flyersPerPage);
});

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

onMounted(fetchActivities);

const showModal = ref(false);
const selectedImage = ref(null);

const openModal = (image) => {
  selectedImage.value = image;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedImage.value = null;
};
</script>
