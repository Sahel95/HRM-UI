<template>
    <div id="page-wrapper">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">پیشخوان</h1>
                    <!-- <div>{{ member.first_name + ' ' + member.last_name}}</div>
                    <div>{{member.kpi_rate}}</div>
                    <div>{{member.position}}</div> -->
                </div>
                

            </div>

            <div class="row">
              <div class="row">
                <div class="col-sm-4">
                  <div class="col-sm-8">
                    <div class="panel panel-success dashboard-panel">
                      <div class="panel-heading">کودس</div>
                      <div class="panel-body">{{member.kudos}}</div>
                    </div> 
                  </div> 
                  


                  <div class="col-sm-8">
                    <div class="panel panel-success dashboard-panel">
                      <div class="panel-heading">امتیاز</div>
                      <div class="panel-body">{{member.available_point}}</div>
                    </div> 
                  </div>
                </div>
                <div class="col-sm-8">
                  <div class="table-responsive">
                    <table class="table table-hover table-striped">
                      <thead>
                        <tr>
                          <th>ردیف</th>
                          <th>فرستنده</th>
                          <th>ساعت</th>
                          <th>روز</th>
                          <th>کودس دریافتی</th>
                          <th> کودس کنونی</th>
                          <th>توضیحات</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in list" :key="index" >
                          <td>{{index+1}}</td>
                          <td>{{item.from_member.first_name + ' ' + item.from_member.last_name}}</td>
                          <td>{{item.time.slice(0,8)}}</td>
                          <td>{{item.date}}</td>
                          <td>{{item.value}}</td>
                          <td>{{ item.to_member_kudos }}</td>
                          <td><button class="btn btn-success " data-toggle="modal" data-target="#myModal" >توضیحات</button></td>
                          <!-- <td>{{item.kudos}}</td> -->
                          <!-- <td>
                            <a class="btn btn-primary" :href="'/game/camp/edit/' + item.id" >ویرایش</a>
                          </td> -->
                        </tr>
                      </tbody>
                    </table>


                  </div>
                </div>
                <div id="myModal" class="modal fade" role="dialog">
                  <div class="modal-dialog modal-sm">

                    <!-- Modal content-->
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">توضیحات</h4>
                      </div>
                      <div class="modal-body">
                        <p>Some text in the modal.</p>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            <!-- <div class="panel panel-success">
              <div class="panel-heading">کودوس</div>
              <div class="panel-body">{{member.kudos}}</div>
            </div>  
            <div class="panel panel-success">
              <div class="panel-heading">امتیاز</div>
              <div class="panel-body">{{member.available_point}}</div>
            </div>    -->

            


        </div>
    </div>
</template>

<script>
export default {
  data(){
      return{
        member:[],
        page : 1,
        list:[]
      }
  },
  created(){
      this.$http.get(this.baseUrl + '/api/v1/member/detail/').then(function(response) {
          this.member = response.body.data
        }.bind(this), function(data){
          $('#message').html("<div class='alert alert-danger'>خطایی رخ داده است</div>");
        }); 
      this.$http.get(this.baseUrl + '/api/v1/kudos/dashboard-kudos-transaction/',
      {"params":{"page":this.page}}).then(function(response) {
          this.list = response.body.data
        }.bind(this), function(data){
          $('#message').html("<div class='alert alert-danger'>خطایی رخ داده است</div>");
        }); 

  },
  

}
</script>

<style scoped>


.dashboard-panel{
  text-align: center;
  
}
</style>