<template>
    <div id="page-wrapper">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12 col-md-12">

                    <h1 class="page-header">تغییر رمز عبور</h1>
                    
                    <div class="row">
                      <div id="message" class="col-md-12" ></div>
                    </div>

                    <div class="clearfix">
                    </div>

                    <div class="panel panel-success">
                       <div class="panel-heading">انتقال
                       </div>

                      <div class="panel-body"> 
                        <!-- <div class="row"> -->

 

                        <div class="col-md-5">
                            <label>رمز عبور فعلی</label>
                            <input class="form-control" v-model="current_password" type="password"/><br>
                        </div>

                        <div class="col-md-5">
                            <label>رمز عبور جدید</label>
                            <input class="form-control" v-model="new_password" type="password"/><br>
                        </div>

                        <div class="col-md-5">
                            <label> تکرار رمز عبور </label>
                            <input class="form-control" v-model="renter_password" type="password" /><br>
                        </div>

                        <!-- </div> -->
                      </div>


                       <div class="panel-footer">
                         <div class="row text-left">
                          <div class="col-md-12">
                           <button class="btn btn-success" @click="changePassword()">تغییر</button>
                         </div>
                        </div>
                       </div>
                     </div>

                  </br>

                    <div class="clearfix">
                    </div>

                  </br>
                </div>


            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            current_password: "",
            new_password:"",
            renter_password:""
        }
    },
    methods:{
        changePassword: function(){
            this.$http.post(this.baseUrl + '/member/change-password/' , {'current_password': this.current_password , 'new_password': this.new_password, 'renter_password':this.renter_password }).then(function(data) {
                $('#message').html("<div class='alert alert-success'>عملیات با موفقیت انجام شد</div>");
                // window.location.href="/game/subcamp/edit/" + data.body.item
            }.bind(this), function(data){
                $('#message').html("<div class='alert alert-danger'>خطایی رخ داده است</div>");
            });
        }
    }
}
</script>