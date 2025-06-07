<template>
  <div class="container">
    <div class="section-header text-center mb-5">
      <div class="row justify-content-center align-items-center">
        <div
          class="title-wrapper d-flex align-items-center justify-content-center gap-3 nav-link"
        >
          <a class="title mb-0" href="/activities"
            >KEGIATAN MASJID <i class="bi bi-box-arrow-up-right"></i
          ></a>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-lg-9 col-md-10">
        <!-- Month Selector -->
        <div class="month-selector mb-4">
          <div class="col-2 d-flex justify-content-start">
            <button
              class="nav-btn-page"
              @click="previousMonth"
              :disabled="isFirstMonth"
              :class="{ disabled: isFirstMonth }"
            >
              <i class="bi bi-chevron-left"></i>
            </button>
          </div>
          <div class="col-8 d-flex justify-content-center">
            <h3 class="month-title">
              {{ months[selectedMonth] }} {{ selectedYear }}
            </h3>
          </div>
          <div class="col-2 d-flex justify-content-end">
            <button
              class="nav-btn-page"
              @click="nextMonth"
              :disabled="isLastMonth"
              :class="{ disabled: isLastMonth }"
            >
              <i class="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>

        <!-- Tab Navigation -->
        <ul class="nav nav-pills justify-content-center mb-4">
          <li class="nav-item">
            <button
              class="nav-link"
              :class="{ active: activeTab === 1 }"
              @click="setActiveTab(1)"
            >
              <i class="bi bi-calendar-event me-2"></i>AGENDA
            </button>
          </li>
          <li class="nav-item">
            <button
              class="nav-link"
              :class="{ active: activeTab === 2 }"
              @click="setActiveTab(2)"
            >
              <i class="bi bi-images me-2"></i>FLYER
            </button>
          </li>
        </ul>

        <!-- Loading State -->
        <div v-if="isLoading" class="loading-state text-center py-5">
          <div class="spinner"></div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="alert alert-danger">
          {{ error }}
        </div>

        <!-- Content -->
        <div v-else class="tab-content">
          <!-- Agenda Tab -->
          <div v-if="activeTab === 1" class="image-container">
            <div
              v-if="currentMonthActivities.length === 0"
              class="text-center py-4"
            >
              <p>Belum ada agenda untuk bulan ini</p>
            </div>
            <div v-else class="position-relative">
              <div
                v-for="(activity, index) in currentMonthActivities"
                :key="activity.id"
                :class="['agenda-item', { active: index === 0 }]"
                @click="openModal(activity.agenda)"
              >
                <img
                  v-if="activity.agenda"
                  :src="`${activity.agenda}`"
                  class="act-img img-fluid"
                  loading="lazy"
                  alt="Agenda"
                />
              </div>
            </div>
          </div>

          <!-- Flyer Tab -->
          <div v-else-if="activeTab === 2" class="image-container">
            <div v-if="paginatedFlyers.length === 0" class="text-center py-4">
              <p>Belum ada flyer untuk bulan ini</p>
            </div>
            <div v-else class="position-relative">
              <div class="flyer-navigation">
                <button
                  class="nav-btn-page prev"
                  @click="prevFlyer"
                  :disabled="currentFlyerIndex === 0"
                >
                  <i class="bi bi-chevron-left"></i>
                </button>

                <div
                 
                  @click="openModal(paginatedFlyers[currentFlyerIndex].img)"
                >
                  <img
                    :src="paginatedFlyers[currentFlyerIndex].img"
                    class="act-img img-fluid"
                    loading="lazy"
                    alt="Flyer"
                  />
                </div>

                <button
                  class="nav-btn-page next"
                  @click="nextFlyer"
                  :disabled="currentFlyerIndex >= paginatedFlyers.length - 1"
                >
                  <i class="bi bi-chevron-right"></i>
                </button>
              </div>

              <div class="flyer-counter text-center mt-3">
                {{ currentFlyerIndex + 1 }} / {{ paginatedFlyers.length }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="modal-background" @click="closeModal">
        <div class="modal-container" @click.stop>
          <img :src="selectedImage" class="modal-image" alt="Preview" />
          <button class="close-button" @click="closeModal">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

// State
const activeTab = ref(1);
const activities = ref([]);
const currentMonthActivities = ref([]);
const allFlyers = ref([]);
const error = ref(null);
const isLoading = ref(true);
const showModal = ref(false);
const selectedImage = ref("");
const currentFlyerIndex = ref(0);
const selectedMonth = ref(new Date().getMonth());
const selectedYear = ref(new Date().getFullYear());
const currentPage = ref(1);
const itemsPerPage = 6;

// Constants
const months = [
  "JANUARI",
  "FEBRUARI",
  "MARET",
  "APRIL",
  "MEI",
  "JUNI",
  "JULI",
  "AGUSTUS",
  "SEPTEMBER",
  "OKTOBER",
  "NOVEMBER",
  "DESEMBER",
];

const minYear = 2024;
const minMonth = 10; // November (0-based)
const maxYear = new Date().getFullYear();
const maxMonth = new Date().getMonth();

// Computed Properties
const isFirstMonth = computed(() => {
  return selectedMonth.value === minMonth && selectedYear.value === minYear;
});

const isLastMonth = computed(() => {
  return selectedMonth.value === maxMonth && selectedYear.value === maxYear;
});

const paginatedFlyers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return allFlyers.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(allFlyers.value.length / itemsPerPage);
});

// Methods
const setActiveTab = (tab) => {
  activeTab.value = tab;
  currentFlyerIndex.value = 0;
  currentPage.value = 1;
};

const fetchActivities = async () => {
  try {
    isLoading.value = true;
    error.value = null;

    const response = await axios.get(`/api/activities`);
    const activitiesData = response.data.data || response.data;

    // Debug log untuk memeriksa format data
    console.log("Activities Data:", activitiesData);

    if (!Array.isArray(activitiesData)) {
      console.error("Invalid response format:", response.data);
      activities.value = [];
    } else {
      activities.value = activitiesData.map((activity) => ({
        ...activity,
        date: new Date(activity.date),
        // Pastikan flyers adalah array
        flyers: Array.isArray(activity.flyers) ? activity.flyers : [],
      }));
    }

    filterActivities();
  } catch (err) {
    console.error("Error details:", {
      message: err.message,
      response: err.response?.data,
      status: err.response?.status,
    });
    error.value = "Gagal memuat data kegiatan";
    activities.value = [];
  } finally {
    isLoading.value = false;
  }
};

const filterActivities = () => {
  // Ensure activities.value is an array before filtering
  if (!Array.isArray(activities.value)) {
    console.error("Activities is not an array:", activities.value);
    currentMonthActivities.value = [];
    allFlyers.value = [];
    return;
  }

  const currentDate = new Date(selectedYear.value, selectedMonth.value);

  currentMonthActivities.value = activities.value.filter((activity) => {
    if (!activity || !activity.date) return false;

    const activityDate = new Date(activity.date);
    return (
      activityDate.getMonth() === currentDate.getMonth() &&
      activityDate.getFullYear() === currentDate.getFullYear()
    );
  });

  allFlyers.value = currentMonthActivities.value.reduce((flyers, activity) => {
    if (activity.flyers && Array.isArray(activity.flyers)) {
      return [...flyers, ...activity.flyers];
    }
    return flyers;
  }, []);
};

const previousMonth = () => {
  if (selectedMonth.value === 0) {
    selectedYear.value--;
    selectedMonth.value = 11;
  } else {
    selectedMonth.value--;
  }
  filterActivities();
};

const nextMonth = () => {
  if (selectedMonth.value === 11) {
    selectedYear.value++;
    selectedMonth.value = 0;
  } else {
    selectedMonth.value++;
  }
  filterActivities();
};

const prevFlyer = () => {
  if (currentFlyerIndex.value > 0) {
    currentFlyerIndex.value--;
  }
};

const nextFlyer = () => {
  if (currentFlyerIndex.value < paginatedFlyers.value.length - 1) {
    currentFlyerIndex.value++;
  }
};

const openModal = (imageUrl) => {
  selectedImage.value = imageUrl;
  showModal.value = true;
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  showModal.value = false;
  document.body.style.overflow = "auto";
};

// Lifecycle
onMounted(() => {
  fetchActivities();
});
</script>
