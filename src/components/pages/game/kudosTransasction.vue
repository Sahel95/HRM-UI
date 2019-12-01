<template>
    <div id="page-wrapper">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">

                    <h1 class="page-header">گردش حساب
                      <!-- <a href="/game/camp/add" class="btn btn-success pull-left">+ کمپین جدید</a> -->

                    </h1>
                    <div class="col-md-12">
                      <div class="col-md-4">
                        <label>از تاریخ</label>
                        <input type="date" v-model="from_date"/>
                      </div>

                      <div class="col-md-4">
                        <label>تا تاریخ</label>
                        <input type="date" v-model="to_date"/>                        
                      </div>
                      
                      <div class="col-md-4">
                        <button class="btn btn-success" @click="getContents()">جستجو</button>
                      </div>
                      <!-- <label>پایان کمپین</label><br>
                      <input type="date" v-model="item.end"/> -->
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
                            <th>گیرنده</th>
                            <th>ساعت</th>
                            <th>روز</th>
                            <th>مقدار</th>
                            <th> امتیاز</th>
                            <th> کودس</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in list" :key="index" >
                            <td>{{ (page-1)*10+index+1 }}</td>
                            <td>{{item.from_member.first_name + ' ' + item.from_member.last_name}}</td>
                            <td>{{item.to_member.first_name + ' ' + item.to_member.last_name}}</td>
                            <td>{{item.time}}</td>
                            <td>{{item.date}}</td>
                            <td>{{item.value}}</td>
                            <td>{{ item.from_member_available_point }}</td>
                            <td>{{ item.to_member_kudos }}</td>
                            <!-- <td>{{item.kudos}}</td> -->
                            <!-- <td>
                              <a class="btn btn-primary" :href="'/game/camp/edit/' + item.id" >ویرایش</a>
                            </td> -->
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="clearfix">
                    </div>

                    </br>
                </div>
                <ul class="pagination">
                  <li><a class='disabled' @click="lastPage(); getContents();" >آخرین</a></li>
                  <li><a href="#" @click="nextPage(); getContents();" >بعدی</a></li>
                  <li><a href='#' v-if="page<=page_size-2">...</a></li>
                  <li><a href='#' v-if="page<page_size" @click="nextPage(); getContents();">{{page+1}}</a></li>
                  <!-- <li class="active"><a href="#">2</a></li> -->
                  <li><a href="#" @click="getContents();">{{page}}</a></li>
                  <li><a href='#' v-if="page>1" @click="prevPage(); getContents();">{{page-1}}</a></li>
                  <li><a href='#' v-if="page>=3">...</a></li>
                  <li><a href="#" @click="prevPage(); getContents();" >قبلی</a></li>
                  <li><a href="#" @click="firstPage(); getContents();" >اولین</a></li>
                </ul> 

            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      token: window.localStorage.getItem('token'),
      page: 1,
      row:1,
      page_size:0,
      from_date:'',
      to_date:''
      // test:[
      //   'current_page':
      //   'first_page':
      //   'last_page':
      //   'next_page':
      //   'prev_page':
      //   'page_size':
      // ]
      }
    },
    methods:{

      getContents: function(){

        var data = {
          'page': this.page
        }

        if (this.from_date)
          data['from_date']  = this.from_date

        if (this.to_date)
          data['to_date']  = this.to_date

        console.log(this.from_date)
        console.log(this.to_date)
        this.$http.get(this.baseUrl + '/api/v1/kudos/kudos-transaction/',
        {
          "params": data
        }).then(function(response) {

            this.list = response.body.data
            this.page_size=Math.ceil(response.body.page_size)

          }.bind(this), function(data){
              $('#message').html("<div class='alert alert-danger'>خطایی رخ داده است</div>");
          });
          },

      nextPage: function(){

          if (this.page < this.page_size){
            this.page+= 1
          }
          else{
            this.page=1
          }
      },
      prevPage: function(){
          if (this.page == 1){
            this.page = 1
          }
          else{
            this.page-=1
          }      
        },
      firstPage: function(){
            this.page = 1     
        },
      lastPage: function(){
            this.page = this.page_size
               
        },
      updateRow: function(index){
        this.row=index
      }
      // getKudosUser: function(){
      //   this.$http.get(this.baseUrl + '/kudos/current-kudos/',
      //   {
      //     "header":{
      //       'Authorization' : this.token
      //     }
      //   }).then(function(data) {

      //       this.list = data.body.data

      //     }.bind(this), function(data){
      //         $('#message').html("<div class='alert alert-danger'>خطایی رخ داده است</div>");
      //     });        
      // }
    },
    created(){
      this.getContents()
      // this.getKudosUser()
    }
  }
</script>

<style scoped>
input[type="date"]::-webkit-inner-spin-button
 {
    display: none;
    -webkit-appearance: none;
}
</style>
