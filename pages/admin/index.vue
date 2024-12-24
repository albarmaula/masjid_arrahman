<script setup>
definePageMeta({
  middleware: ['auth']
});
</script>

<template>
  <div class="pages" id="admin">
    <Admin />
  </div>
</template>