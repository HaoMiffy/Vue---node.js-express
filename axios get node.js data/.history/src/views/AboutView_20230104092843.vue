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
  <form @submit.prevent="a">
  <label for="name">Name</label>
  <input type="text" id="name" name="name" v-model="datas.name"/>
    <label for="age">Age</label>
  <input type="text" id="age" name="age" v-model="datas.age"/>
  <button type="submit">傳送</button>
  </form>
  </div>
</template>

<script>
import axios from 'axios'
export default{
  data() {
    return {
      usesrs: null,
      search:null,
      datas: {
        name: "",
        age: ""
      },
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
    },
    a(){
      axios.post("http://127.0.0.1:3000/json",this.datas, {headers:{
        "Access-Control-Allow-Origin":"http://api.komavideo.com"
      }})
      .then(response => {
          console.log(response)
          console.log('post成功')
        })
        .catch(err => {
          console.log('post失敗')
          console.log(err)
        })
    }
  }
}
</script>
