<template>
    <div id="page-wrapper">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">

                    <h1 class="page-header">مدیریت کاربران
                      <button class="btn btn-success pull-left">+ کاربرجدید</button>

                    </h1>
                    <div class="row">
                      <div id="message" class="col-md-12" ></div>
                    </div>
                    <div class="table-responsive">
                      <table class="table table-hover table-striped">
                        <thead>
                          <tr>
                            <th>ردیف</th>
                            <th>نام کاربری</th>
                            <th>عملیات</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="user in users">
                            <td>{{user.id}}</td>
                            <td>{{user.username}}</td>
                            <td>
                              <button class="btn btn-primary">ویرایش</button>
                              <button class="btn btn-danger">حذف</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
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
  data() {
    return {
      users: []
      }
    },
    methods:{
      getContents: function(){
        this.$http.get(this.baseUrl + '/api/user').then(function(data) {

            this.users = data.body

          }.bind(this), function(data){
              $('#message').html("<div class='alert alert-danger'>خطایی رخ داده است</div>");
          });
      }
    },
    created(){
      this.getContents()
    }
  }
</script>
