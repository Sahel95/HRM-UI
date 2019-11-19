<template>
    <div id="page-wrapper">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">

                    <h1 class="page-header">کودس اعضای تیم
                      <!-- <a href="/game/subcamp/add" class="btn btn-success pull-left">+ مجموعه جدید</a> -->

                    </h1>
                    <div class="row">
                      <div id="message" class="col-md-12" ></div>
                    </div>
                    <div class="table-responsive">
                      <table class="table table-hover table-striped">
                        <thead>
                          <tr>
                            <th>ردیف</th>
                            <th>نام و نام خانوادگی</th>
                            <th>کودس</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in list" :key="index">
                            <td>index</td>
                            <td>{{item.member.first_name + ' ' + item.member.last_name }}</td>
                            <td>{{item.member.kudos}}</td>
                            <td>
                              <!-- <a class="btn btn-primary" :href="'/game/subcamp/edit/' + item.id" >ویرایش</a> -->
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
      list: [],
      team_id: 1,
      token: window.localStorage.getItem('token'),
      }
    },
    methods:{
      getContents: function(){
        this.$http.get(this.baseUrl + '/kudos/members-kudos/',{
          "header":{
            'Authorization' : this.token
          },
          "params":{
            'team_id':this.team_id
          }
          })
          .then(function(response) {

            this.list = response.body.data
            console.log('::::::::::::::::::::::',this.list)

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
