<template>
  <div>
    <br />
    <div class="container">
      <h2 class="title pad-bt15">Kegiatan Masjid</h2>
      <div class="row justify-content-center">
        <div class="wrap-item text-center col-lg-9 col-md-10">
          <!-- Month and Year Selector -->
          <div class="mb-3 d-flex justify-content-center align-items-center">
            <div class="col-md-4 col-sm-4 col-xs-12">
              <button
                v-if="!isFirstMonth"
                @click="previousMonth"
                id="btn-rounded"
                class="btn"
              >
                &lt;
              </button>
            </div>
            <div class="col-md-4 col-sm-4 col-xs-12">
              <h3 class="mx-3">
                {{ months[selectedMonth] }} {{ selectedYear }}
              </h3>
            </div>
            <div class="col-md-4 col-sm-4 col-xs-12">
              <button
                v-if="!isLastMonth"
                @click="nextMonth"
                id="btn-rounded"
                class="btn"
              >
                &gt;
              </button>
            </div>
          </div>
          <!-- Tab Panel -->
          <ul
            class="nav nav-tabs justify-content-center mb-3"
            id="kegiatanTabs"
          >
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
          <!-- Tab Content -->
          <div v-if="activeTab === 1">
            <div>
              <div class="carousel-inner">
                <div
                  v-for="(activity, index) in currentMonthActivities"
                  :key="activity.id"
                  :class="['carousel-item', { active: index === 0 }]"
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
          </div>
          <div v-if="activeTab === 2">
            <div class="row">
              <div
                v-for="flyer in paginatedFlyers"
                :key="flyer.id"
                class="carousel-inner"
              >
                <img
                  :src="'data:image/jpeg;base64,' + flyer.img"
                  class="act-img img-fluid"
                  :alt="flyer.description || 'Flyer Image'"
                />
                <!-- Pagination Controls Inside Image -->
                <button
                  v-if="currentPage > 1"
                  class="btn position-absolute start-0 top-50 translate-middle-y"
                  style="margin-left: 1rem;"
                  id="btn-rounded"
                  @click="previousPage"
                >
                  &lt;
                </button>
                <button
                  v-if="currentPage < totalPages"
                  class="btn position-absolute end-0 top-50 translate-middle-y"
                  style="margin-right: 1rem;"
                  id="btn-rounded"
                  @click="nextPage"
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
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

const fetchActivities = async () => {
  try {
    const response = await axios.get("/api/activities");
    activities.value = response.data.data;
    filterActivities();
  } catch (err) {
    error.value = "An error occurred while fetching activities";
    console.error("Error fetching activities:", err);
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

  // Extract all flyers for the current month activities
  allFlyers.value = currentMonthActivities.value.flatMap(
    (activity) => activity.flyers
  );
  currentPage.value = 1; // Reset to first page when activities are filtered
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
</script>