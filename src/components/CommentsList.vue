<script setup>
import { onMounted, ref, computed } from "vue";
import { useFetch } from "../composables/useFetch";
import CommentsItem from "./CommentsItem.vue";

const comments = ref([]);

onMounted(async () => {
  comments.value = await useFetch({
    url: "comments",
  });
});

const sortedComments = computed(() => {
  return comments.value.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  );
});
</script>

<template>
  <ul v-if="sortedComments?.length" class="comments-list">
    <CommentsItem
      v-for="comment in sortedComments"
      :key="comment.id"
      :comment
      @reply="$emit('reply', $event)"
    />

    <span class="comments-list__count"
      >Кол-во комментариев: {{ sortedComments.length }}</span
    >
  </ul>
  <template v-else>
    <img class="loader" src="../assets/loader.svg" alt="загрузка" />
  </template>
</template>

<style scoped>
.comments-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.comments-list__count {
  max-width: max-content;
  padding: 4px;
  border-radius: 12px;
  align-self: flex-end;
  background-color: bisque;
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 56px;
  height: 56px;
}
</style>
