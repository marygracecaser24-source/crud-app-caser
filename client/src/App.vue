<script setup>
import { ref, onMounted } from 'vue'
const API = 'http://localhost:4000/api/items'
const items = ref([])
const form = ref({ name: '', description: ''})
const editId = ref(null)

async function load(){
  items.value = await fetch(API).then(r => r.json())
}

async function save () {
  if (editId.value) {
    await fetch(`${API}/${editId.value}`, {
      method: 'PUT', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(form.value) })
      editId.value = null
  } else {
    await fetch(API, {method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(form.value) })
  }
  form.value = { name: '', description: ''}; load()
}

function startEdit(items) {
  editId.value = items.id
form.value = { name: items.name, description: items.description }
}

async function remove(id) {
  await fetch(`${API}/${id}`, { method: 'DELETE' }); load()
}

onMounted(load)
</script>

<template>
  <main>
    <h1> Items</h1>
    <form @submit.prevent="save">
      <input v-model="form.name" placeholder="Name" required />
      <input v-model="form.description" placeholder="Description"/>
      <button type="submit">{{ editId ? 'Update' : 'Add' }}</button>
    </form>
    <ul>
      <li v-for="item in items" :key="item.id">
        <strong>{{ item.name }}</strong> - {{ item.description }}
        <button @click="startEdit(item)">Edit</button>
        <button @click="remove(item.id)">Delete</button>
      </li>
    </ul>
  </main>
</template>
