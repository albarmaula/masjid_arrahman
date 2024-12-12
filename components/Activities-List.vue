<template>
  <div>
    <br />
    <div class="container text-center table-responsive-sm">
      <h1 class="title">Daftar Kegiatan</h1>
      <table class="table table-striped table-hover table-bordered">
        <thead class="thead-light">
          <tr>
            <th>ID</th>
            <th>Tanggal</th>
            <th>Agenda</th>
            <th>Flyers</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="activity in activities" :key="activity.id">
            <td>{{ activity.id }}</td>
            <td>{{ formatDate(activity.date) }}</td>
            <td>
              <div class="activity">
                <img
                  v-if="activity.agenda"
                  :src="'data:image/jpeg;base64,' + activity.agenda"
                  class="table-image"
                  alt="Agenda Image"
                />
              </div>
            </td>
            <td>
              <div class="activity">
                <img
                  v-for="flyer in activity.flyers"
                  :key="flyer.activity_id"
                  :src="'data:image/png;base64,' + flyer.img"
                  alt="Flyer"
                  class="table-image"
                />
              </div>
            </td>
            <td>
              <button
                class="btn btn-danger"
                @click="deleteActivity(activity.id)"
              >
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  name: "ActivitiesList",
  setup() {
    const activities = ref([]);

    const fetchActivities = async () => {
      try {
        const response = await $fetch("/api/activities");
        if (response.statusCode === 200) {
          activities.value = response.data;
        } else {
          console.error("Failed to fetch activities:", response.message);
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    const deleteActivity = async (id: number) => {
      if (confirm("Are you sure you want to delete this activity?")) {
        try {
          const response = await $fetch("/api/activities", {
            method: "DELETE",
            body: { id },
          });

          if (response.statusCode === 200) {
            alert(response.message);
            // Refresh activities after deletion
            fetchActivities();
          } else {
            console.error("Failed to delete activity:", response.message);
            alert(response.message || "Failed to delete activity.");
          }
        } catch (error) {
          console.error("Error deleting activity:", error);
          alert("An error occurred while deleting the activity.");
        }
      }
    };

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      const options = { year: 'numeric', month: 'long' };
      return date.toLocaleDateString('id-ID', options);
    };

    onMounted(() => {
      fetchActivities();
    });

    return { activities, deleteActivity, formatDate };
  },
});
</script>