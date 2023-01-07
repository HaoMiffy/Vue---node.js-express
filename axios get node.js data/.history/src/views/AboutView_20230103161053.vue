<template>
  <div class="about">
    <p>{{usesrs.name}}</p>
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
