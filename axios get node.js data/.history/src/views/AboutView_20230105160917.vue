<template>
  <div class="about">
    <h1>{{ search }}</h1>
    <table border="1px">
    <tr>
      <td>Name</td>
      <td>Age</td>
      <td>Action</td>
      <td>ACTION</td>
    </tr>
    <tr v-for="user in usesrs" :key="user.id">
      <td>{{ user.name }}</td>
      <td>{{ user.age }}</td>
      <td><button @click="remove(user.id)">Delete</button></td>
      <td>
        <div>
          <label for="age">patch age</label>
          <input type="text" id="age" v-model="patch.age" />
        </div><button @click="edit(user.id)">Edit</button>
      </td>
    </tr>
  </table>
  <form @submit.prevent="a">
  <label for="name">Name</label>
  <input type="text" id="name" v-model="datas.name"/>
    <label for="age">Age</label>
  <input type="text" id="age" v-model="datas.age"/>
  <button>傳送</button>
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
        age:"",
      },
      patch: {
        age: ''
      }
    }
  },
  mounted() {
    this.getdata(),
    this.getsearch()
  },
  methods:{
        //,{headers:{"Access-Control-Allow-Origin":"http://api.komavideo.com"}}
    getdata() {
      axios.get("http://127.0.0.1:3000/json")
        .then((respond) => {
          console.log(respond)
          this.usesrs = respond.data.data
        })
    },
    //,{headers:{"Access-Control-Allow-Origin":"http://api.komavideo.com"}}
    getsearch(){
            axios.get("http://127.0.0.1:3000/search")
        .then((res) => {
          console.log(res)
          this.search = res.data
        })
    },
    a(){
      axios.post("http://127.0.0.1:3000/json",this.datas)
      .then(response => {
          console.log(response)
          console.log('post成功')
        })
        .catch(err => {
          console.log('post失敗')
          console.log(err)
        })
    },
    remove(id) {
      axios.delete("http://127.0.0.1:3000/json/" + id)
        .then((respond) => {
          console.log('delete成功')
          console.log(respond)
          this.getdata()
        })
        .catch(err => {
          console.log('delete失敗')
          console.log(err)
        })
    },
    edit(id){
      axios.patch('http://127.0.0.1:3000/json/'+id,this.patch)
        .then(response => {
          console.log(response)
          console.log('patch成功')
        })
        .catch(err => {
          console.log('patch失敗')
          console.log(err)
        })
    },
  }
}
</script>
