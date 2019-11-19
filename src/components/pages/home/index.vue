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

            <!-- <div class="panel panel-success">
              <div class="panel-heading">کودوس</div>
              <div class="panel-body">{{member.kudos}}</div>
            </div>  
            <div class="panel panel-success">
              <div class="panel-heading">امتیاز</div>
              <div class="panel-body">{{member.available_point}}</div>
            </div>    -->

            <div class="col-sm-3">
              <div class="thumbnail">
                <div class="caption text-center">
                  <!-- <div class="position-relative">
                    <img src="https://az818438.vo.msecnd.net/icons/slack.png" style="width:72px;height:72px;" />
                  </div> -->
                  <h4 id="thumbnail-label"><p href="" target="_blank">کودوس</p></h4>
                  <p>{{member.kudos}}</p>
                </div>
              </div>
            </div>   

            <div class="col-sm-3">
              <div class="thumbnail">
                <div class="caption text-center">
                  <!-- <div class="position-relative">
                    <img src="https://az818438.vo.msecnd.net/icons/slack.png" style="width:72px;height:72px;" />
                  </div> -->
                  <h4 id="thumbnail-label"><p href="" target="_blank">امتیاز</p></h4>
                  <p>{{member.available_point}}</p>
                </div>
              </div>
            </div>     
            
            <div class="row">
              <div id="message" class="col-md-12 col-xs-12" ></div>
            </div>
            <div class="table-responsive">
              <table class="table table-hover table-striped">
                <thead>
                  <tr>
                    <th>ردیف</th>
                    <th>فرستنده</th>
                    <th>ساعت</th>
                    <th>روز</th>
                    <th>مقدار</th>
                    <th> کودس</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in list" :key="index" >
                    <td>{{index+1}}</td>
                    <td>{{item.from_member.first_name + ' ' + item.from_member.last_name}}</td>
                    <td>{{item.time}}</td>
                    <td>{{item.date}}</td>
                    <td>{{item.value}}</td>
                    <td>{{ item.to_member_kudos }}</td>
                    <!-- <td>{{item.kudos}}</td> -->
                    <!-- <td>
                      <a class="btn btn-primary" :href="'/game/camp/edit/' + item.id" >ویرایش</a>
                    </td> -->
                  </tr>
                </tbody>
              </table>


            </div>


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
      this.$http.get(this.baseUrl + '/member/detail/').then(function(response) {
          this.member = response.body.data
        }.bind(this), function(data){
          $('#message').html("<div class='alert alert-danger'>خطایی رخ داده است</div>");
        }); 
      this.$http.get(this.baseUrl + '/kudos/dashboard-kudos-transaction/',
      {"params":{"page":this.page}}).then(function(response) {
          this.list = response.body.data
        }.bind(this), function(data){
          $('#message').html("<div class='alert alert-danger'>خطایی رخ داده است</div>");
        }); 

  },
  

}
</script>

<style scoped>


.thumbnail {
   box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
   transition: 0.3s;
   min-width: 40%;
   border-radius: 5px;
 }

 .thumbnail-description {
   min-height: 40px;
 }

 /* .thumbnail:hover {
   box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 1);
 }  */
</style>