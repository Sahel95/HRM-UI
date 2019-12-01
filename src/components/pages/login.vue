<template>
  <div class="bg">
    <div class="container">
      <div class="row">
          <div class="col-md-4 col-md-offset-4">
              <div class="login-panel panel panel-default">
                  <div class="panel-heading">
                      <h3 class="panel-title">لطفا وارد شوید</h3>
                  </div>
                  <div class="panel-body">
                          <fieldset>
                              <div class="form-group">
                                  <input class="form-control" v-model="username" placeholder="نام کاربری" name="email" type="text" autofocus>
                              </div>
                              <div class="form-group">
                                  <input class="form-control" v-model="password" placeholder="رمزعبور" name="password" type="password" value="">
                              </div>
                              <div id="message" ref="message"></div>

                              <!-- Change this to a button or input when using this as a form -->
                              <a class="btn btn-lg btn-success btn-block" @click="login">ورود</a>
                          </fieldset>

                  </div>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username:'',
      password:''
    }
  },
  methods:{
    login: function () {
        // this.$validator.validateAll().then((result) => {
        //   if (result) {
        // var token = 'Basic ' + btoa(this.username + ':' + this.password)
        this.$http.post(this.baseUrl + '/api/v1/member/login/',
         {
          'username':this.username,
          'password':this.password
          }).then(response => {
          if (response.status == 200) {
            var token = 'Token ' + response.body.token
            window.localStorage.setItem('token', token )
            window.localStorage.setItem('isAuthenticated', true)
            window.localStorage.setItem('user', this.username)

            var ref = "/"
            if(this.$route.query.hasOwnProperty('ref')){
              ref = decodeURI(this.$route.query.ref)
            }
            window.location.href = ref

          }
          else{
            this.$refs.message.className = "text-danger";
            this.$refs.message.innerText = response.body.message;
            $('#message').fadeIn();
          }
        }).catch(function(error) {
          console.log(error)
          if (error.status == 401) {
            this.$refs.message.className = "text-danger";
            this.$refs.message.innerText = "نام کاربری یا رمز عبور اشتباه است";
          }
          else{
            this.$refs.message.className = "text-danger";
            this.$refs.message.innerText = "خطای سرور";
          }
          $('#message').fadeIn();
        })


        //   }
        // })
      }
  }
}
</script>

<style scoped>
.bg {
width: 100wh;
height:100vh;
color: #fff;
background: linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB);
background-size: 400% 400%;
-webkit-animation: Gradient 30s ease infinite;
-moz-animation: Gradient 30s ease infinite;
animation: Gradient 30s ease infinite;
}
#message{
  margin-bottom:10px;
  display:none;
}
@-webkit-keyframes Gradient {
0% {
  background-position: 0% 50%
}
50% {
  background-position: 100% 50%
}
100% {
  background-position: 0% 50%
}
}

@-moz-keyframes Gradient {
0% {
  background-position: 0% 50%
}
50% {
  background-position: 100% 50%
}
100% {
  background-position: 0% 50%
}
}

@keyframes Gradient {
0% {
  background-position: 0% 50%
}
50% {
  background-position: 100% 50%
}
100% {
  background-position: 0% 50%
}
}
</style>
