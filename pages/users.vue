<script lang="ts" setup>
import { ref } from 'vue';

const users = ref([]);

const fetchUsers = async () => {
  try {
    const { data } = await useFetch('/api/users');
    users.value = data.value;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

fetchUsers();
</script>

<template>
  <div>
    <h1>User List</h1>
    <ul>
      <li v-for="user in users" :key="user.id">{{ user.email }}</li>
    </ul>
  </div>
</template>
