<template>
  <div class="container">
    <!-- Header with logout -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="title">Admin</h2>
      <button @click="handleLogout" class="btn btn-danger">
        <i class="bi bi-box-arrow-left"></i> Logout
      </button>
    </div>

    <!-- Tab Navigation -->
    <ul class="nav nav-pills justify-content-center mb-4">
      <li class="nav-item">
        <button
          @click="switchTab('kegiatan')"
          :class="['nav-link', activeTab === 'kegiatan' ? 'active' : '']"
        >
          <i class="bi bi-calendar-event me-2"></i>KEGIATAN
        </button>
      </li>
      <li class="nav-item">
        <button
          @click="switchTab('gallery')"
          :class="['nav-link', activeTab === 'gallery' ? 'active' : '']"
        >
          <i class="bi bi-images me-2"></i>GALLERY
        </button>
      </li>
      <li class="nav-item">
        <button
          @click="switchTab('users')"
          :class="['nav-link', activeTab === 'users' ? 'active' : '']"
        >
          <i class="bi bi-people me-2"></i>USER
        </button>
      </li>
    </ul>

    <!-- Tab Content -->
    <div class="tab-content">
      <!-- Kegiatan Tab -->
      <div v-show="activeTab === 'kegiatan'" class="tab-pane fade show active">
        <div class="row">
          <div class="col-md-4 my-2">
            <div class="card shadow-sm">
              <div class="card-header" id="card-header">
                <h3 class="feature-title mb-0 text-white">Tambah Data</h3>
              </div>
              <Activities-Add />
            </div>
          </div>
          <div class="col-md-8 my-2">
            <div class="card shadow-sm">
              <div class="card-header" id="card-header">
                <h3 class="feature-title mb-0 text-white">Daftar</h3>
              </div>
              <Activities-List />
            </div>
          </div>
        </div>
      </div>
      <!-- Galeri Tab -->
      <div v-show="activeTab === 'gallery'" class="tab-pane fade show active">
        <div class="row">
          <div class="col-md-4 my-2">
            <div class="card shadow-sm">
              <div class="card-header" id="card-header">
                <h3 class="feature-title mb-0 text-white">Tambah Data</h3>
              </div>
              <Gallery-Add />
            </div>
          </div>
          <div class="col-md-8 my-2">
            <div class="card shadow-sm">
              <div class="card-header" id="card-header">
                <h3 class="feature-title mb-0 text-white">Daftar</h3>
              </div>
              <Gallery-List />
            </div>
          </div>
        </div>
      </div>
      <!-- User Tab -->
      <div v-show="activeTab === 'users'" class="tab-pane fade show active">
        <div class="row">
          <div class="col-md-4 my-2">
            <div class="card shadow-sm">
              <div class="card-header" id="card-header">
                <h3 class="feature-title mb-0 text-white">Tambah Data</h3>
              </div>
              <Users-Add />
            </div>
          </div>
          <div class="col-md-8 my-2">
            <div class="card shadow-sm">
              <div class="card-header" id="card-header">
                <h3 class="feature-title mb-0 text-white">Daftar</h3>
              </div>
              <Users-List />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "#app";

const route = useRoute();
const router = useRouter();
const activeTab = ref("kegiatan");

onMounted(() => {
  const tab = route.query.tab || "kegiatan";
  activeTab.value = tab;
});

watch(
  () => route.query.tab,
  (newTab) => {
    activeTab.value = newTab || "kegiatan";
  }
);

const switchTab = (tab) => {
  router.push({ query: { tab } });
};

const handleLogout = () => {
  const token = useCookie("admin_token");
  const user = useCookie("user");
  token.value = null;
  user.value = null;
  navigateTo("/login");
};
</script>
