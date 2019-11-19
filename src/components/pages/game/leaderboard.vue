<template>
    <div id="page-wrapper">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">

                    <h1 class="page-header">لیدربرد
                      <a class="btn btn-success pull-left" href="/game/add">+ کمپین جد ید</a>
                    </h1>
                    <div class="row">
                      <div id="message" class="col-md-12" ></div>
                    </div>
                    <div class="table-responsive">
                      <table class="table table-hover table-striped">
                        <thead>
                          <tr>
                            <th>شماره</th>
                            <th>امتیاز</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in list">
                            <td>{{item.msisdn}}</td>
                            <td>{{item.score}}</td>
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
      list: []
      }
    },
    methods:{
      getContents: function(){
        this.$http.get(this.baseUrl + '/api/game/leaderboard').then(function(data) {

            this.list = data.body

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
