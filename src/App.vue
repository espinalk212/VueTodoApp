<template>
  <div id="app">
    <ListComponent />
  </div>
</template>

<script>
import ListComponent from './components/ListComponent.vue'

export default {
  name: 'App',
  components: {
    ListComponent
  }
}
</script>

<style>
.lightTheme {
  /* --primary-color: white; */
  /* --secondary-color: #42b983; */
  --primary-color: #42b983;
  --secondary-color: white;
  --tertiary-color: #304455;
}

.darkTheme {
  --primary-color: #304455;
  /* --secondary-color: white;
  --tertiary-color: #42b983; */
  --secondary-color: #42b983;
  --tertiary-color: white;

}

body {
  background-color: var(--primary-color);
  color: var(--secondary-color);
}

button {
  color: var(--primary-color);
  border-radius: 4px;
  border: 2px solid var(--tertiary-color);
  background-color: var(--secondary-color);
}

* {
  text-align: center;

}
</style>
