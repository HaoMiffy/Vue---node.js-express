<template>
  <div class="about">
    <table border="1px">
    <tr>
      <td>Name</td>
      <td>Age</td>
    </tr>
    <tr v-for="user in usesrs" :key="user.id">
      <td>{{ user.name }}</td>
      <td>{{ user.age }}</td>
    </tr>
  </table>
  </div>
</template>

<script>
import axios from 'axios'
export default{
  data() {
    return {
      usesrs: null,
    }
  },
  mounted() {
    this.getdata()
  },
  methods:{
    getdata() {
      axios.get("https://amobile.node-watch.com/deviceManagement/deviceType")
        .then((respond) => {
          console.log(respond)
          this.usesrs = respond.data.content
        })
    },
  }
}
</script>
