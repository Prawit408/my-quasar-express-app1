<template>
  <q-page padding>
    <div class="text-h4 q-mb-md">
      Advanced Full-Stack Demo (Quasar + Express)
    </div>

    <q-card flat bordered class="q-mb-md bg-grey-1">
      <q-card-section>
        <div class="text-h6">Data from Backend API</div>
        
        <q-spinner v-if="loading" color="primary" size="3em" />

        <q-list v-else bordered separator class="q-mt-sm bg-white">
          <q-item>
            <q-item-section>
              <q-item-label class="text-weight-bold">Advanced Git</q-item-label>
              <q-item-label caption>{{ apiData.git?.detail }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label class="text-weight-bold">Advanced Docker</q-item-label>
              <q-item-label caption>{{ apiData.docker?.detail }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <q-btn 
          v-if="!loading" 
          color="primary" 
          class="q-mt-md" 
          @click="fetchData"
          icon="refresh"
          label="Refresh Data" 
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// กำหนดตัวแปรสำหรับเก็บข้อมูลและสถานะการโหลด
const apiData = ref({ git: {}, docker: {} });
const loading = ref(true);

// ฟังก์ชันดึงข้อมูลจาก API [cite: 1328]
const fetchData = async () => {
  loading.value = true;
  try {
    // ดึงค่า URL จาก Environment Variable (VITE_API_URL) [cite: 1328, 1329]
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const response = await axios.get(`${apiUrl}/api/demo`);
    apiData.value = response.data;
  } catch (error) {
    console.error('API Error:', error);
  } finally {
    loading.value = false;
  }
};

// เรียกฟังก์ชันเมื่อ Component ถูก Mount [cite: 1328]
onMounted(fetchData);
</script>