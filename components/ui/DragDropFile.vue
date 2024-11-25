<script lang="ts" setup>
import { ref } from "vue";

// Tipe untuk file dengan pratinjau
interface FileWithPreview {
  file: File;
  preview: string | null;
}

const files = ref<FileWithPreview[]>([]); // Array untuk menyimpan file dan pratinjau
const isDragging = ref<boolean>(false); // Status drag
const fileInput = ref<HTMLInputElement | null>(null); // Referensi ke input file

const onDragOver = (): void => {
  isDragging.value = true;
};

const onDragEnter = (): void => {
  isDragging.value = true;
};

const onDragLeave = (): void => {
  isDragging.value = false;
};

const onDrop = (event: DragEvent): void => {
  isDragging.value = false;
  const droppedFiles = Array.from(event.dataTransfer?.files || []); // Konversi ke array
  addFiles(droppedFiles);
};

const onClick = (): void => {
  fileInput.value?.click(); // Memicu klik pada input file
};

const onFileSelect = (event: Event): void => {
  const input = event.target as HTMLInputElement;
  const selectedFiles = Array.from(input.files || []); // Konversi ke array
  addFiles(selectedFiles);
};

const addFiles = (fileList: File[]): void => {
  fileList.forEach((file) => {
    // Validasi file gambar
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        files.value.push({ file, preview: e.target?.result as string });
      };
      reader.readAsDataURL(file); // Membuat pratinjau
    } else {
      files.value.push({ file, preview: null });
    }
  });
};

const removeFile = (index: number): void => {
  files.value.splice(index, 1);
};
</script>

<template>
  <div
    class="drop-area"
    @dragover.prevent="onDragOver"
    @dragenter.prevent="onDragEnter"
    @dragleave="onDragLeave"
    @drop.prevent="onDrop"
    @click="onClick"
    :class="{ 'is-dragging': isDragging }"
  >
    <p v-if="files.length === 0">
      Drag and drop files here, or click to select them
    </p>
    <div v-else class="file-list">
      <div v-for="(file, index) in files" :key="index" class="file-item">
        <img
          v-if="file.preview"
          :src="file.preview"
          alt="Thumbnail"
          class="thumbnail"
        />
        <p>{{ file.file.name }}</p>
        <button @click.stop="removeFile(index)">Remove</button>
      </div>
    </div>
    <input type="file" ref="fileInput" @change="onFileSelect" hidden multiple />
  </div>
</template>

<style scoped>
.drop-area {
  border: 1px dashed #ccc;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s;
}
.drop-area.is-dragging {
  background-color: #eaf7ff;
  border-color: #007bff;
}
.file-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 15px;
}
.file-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 120px;
}
.thumbnail {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 8px;
}
button {
  background-color: #ff4d4d;
  border: none;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #ff1a1a;
}
</style>
