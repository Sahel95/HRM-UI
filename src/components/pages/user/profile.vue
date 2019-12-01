<template>
    <div id="page-wrapper">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12 col-md-12">

                    <h1 class="page-header">پروفایل</h1>
                    
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

                        <div class="col-md-6">
                            <label>نام کاربری :</label>
                            <span>{{member.username}}</span><br>

                            <label>نام و نام خانوداگی :</label>
                            <span>{{member.first_name + " " + member.last_name}}</span><br>

                            <label>شماره شناسنامه :</label>
                            <span>{{member.national_code}}</span><br>
                        </div>

                        <div class="col-md-6">
                            <label>تلفن :</label>
                            <span>{{member.mobile_number}}</span><br>

                            <label>ایمیل :</label>
                            <span>{{member.email}}</span><br>

                            <label>سِمَت :</label>
                            <span>{{member.position}}</span><br>
                        </div>



                        <!-- </div> -->
                      </div>


                       <div class="panel-footer">
                         <div class="row text-left">
                          <!-- <div class="col-md-12">
                           <button class="btn btn-success" >تغییر</button>
                         </div> -->
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
            member: []
        }
    },
    created(){
            this.$http.get(this.baseUrl + '/api/v1/member/detail/' ).then(function(response) {
                this.member=response.body.data
            }.bind(this), function(response){
                $('#message').html("<div class='alert alert-danger'>خطایی رخ داده است</div>");
            });
        }
    
}
</script>



export default {
  data() {
    return {
      members:[]
      }
    },
    created(){
        this.$http.get(this.baseUrl + '/member/detail/' ).then(function(response) {
            this.member=response.body.data
        }.bind(this), function(response){
            $('#message').html("<div class='alert alert-danger'>خطایی رخ داده است</div>");
        });
    }
  }