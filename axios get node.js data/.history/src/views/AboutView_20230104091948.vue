<template>
  <div class="about">
    <h1>{{ search }}</h1>
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
  <label for="name">Name</label>
  <input type="text" id="name" name="name"/>
    <label for="age">Age</label>
  <input type="text" id="age" name="age"/>
  </div>
</template>

<script>
import axios from 'axios'
export default{
  data() {
    return {
      usesrs: null,
      search:null
    }
  },
  mounted() {
    this.getdata(),
    this.getsearch()
  },
  methods:{
    getdata() {
      axios.get("http://127.0.0.1:3000/json", {headers:{
        "Access-Control-Allow-Origin":"http://api.komavideo.com"
      }})
        .then((respond) => {
          console.log(respond)
          this.usesrs = respond.data.data
        })
    },
    getsearch(){
            axios.get("http://127.0.0.1:3000/search", {headers:{
        "Access-Control-Allow-Origin":"http://api.komavideo.com"
      }})
        .then((res) => {
          console.log(res)
          this.search = res.data
        })
    }
  }
}
</script>
