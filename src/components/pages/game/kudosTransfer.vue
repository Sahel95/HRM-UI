<template>
    <div id="page-wrapper">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12 col-md-12">

                    <h1 class="page-header">انتقال کودس</h1>
                    <div class="row">
                      <div id="message" class="col-md-12" ></div>
                    </div>

                    <div class="clearfix">
                    </div>

                    <div class="panel panel-success">
                       <div class="panel-heading">انتقال
                       </div>
                       <div class="panel-body">
                         <div class="col-md-4">
                           <label>انتقال به</label>
                           <select class="form-control" v-model="to_member">
                            <option v-for="(member, index) in members"
                              :key="index"
                              :value="member.id">{{member.first_name + ' ' + member.last_name}}
                            </option>
                          </select>
                         </div>                         
                         <div class="col-md-4">
                           <label>کودس</label>
                           <input class="form-control" v-model="value" type="number" /><br>
                         </div>

                         <div class="col-md-4">

                           <label>امتیاز</label><br>
                           <!-- <input type="checkbox" id="disabled" v-model="item.is_disabled">
                            <label for="disabled">غیرفعال</label><br> -->
                            <div>{{available_ponit}}</div>
                           <!-- <input type="radio" id="active" value=false v-model="item.is_disabled">
                            <label for="active">فعال</label>
                            <input type="radio" id="disable" value=true v-model="item.is_disabled">
                            <label for="disable">غیرفعال</label> -->
                         </div>
                         <div class="row">
                           <div class="col-md-8">
                             <label>توضیحات</label><br>
                             <textarea-autosize :min-height="100" :max-height="350" class="col-md-12 form-control" v-model="description"></textarea-autosize>
                           </div>
                           <!-- <div class="col-md-4">
                             <label>شروع کمپین</label><br>
                             <input type="date" v-model="item.start"/><br>
                             <label>پایان کمپین</label><br>
                             <input type="date" v-model="item.end"/>
                           </div> -->
                         </div>

                       </div>
                       <div class="panel-footer">
                         <div class="row text-left">
                          <div class="col-md-12">
                           <button class="btn btn-success" @click="kudosTransfer()">انتقال</button>
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

var today = new Date().toISOString().slice(0,10);
// today.toLocaleFormat('%d-%b-%Y');

export default {
  data() {
    return {
      members:[],
      to_member: [],
      description:' ',
      available_ponit:0,
      value:0,
      item: {
        'title':'',
        'content':'',
        'start': today,
        'end': today,
        'is_disabled': false,
        'camp_id':''
        }
      }
    },
    methods:{
      kudosTransfer: function(){
        // let campaignId = this.$route.params.id
        console.log(':::::::::::::::::::::',this.description)
        this.$http.post(this.baseUrl + '/kudos/kudos-transfer/' , {'to_member': this.to_member , 'value': Number(this.value), 'description':this.description }).then(function(data) {
            $('#message').html("<div class='alert alert-success'>عملیات با موفقیت انجام شد</div>");
            this.available_ponit=this.available_ponit-this.value
            // window.location.href="/game/subcamp/edit/" + data.body.item
          }.bind(this), function(data){
            $('#message').html("<div class='alert alert-danger'>موجودی شما کافی نیست</div>");
          });

      },
      collapse: function (index) {
        $('#'+ index).collapse('toggle')
      }
    },
    created(){

      this.$http.get(this.baseUrl + '/member/kudos-receptor/').then(function(response) {
          this.members = response.body.data
          console.log(':::::::::::::::::::::::::::::::',this.members)
        }.bind(this), function(data){
          $('#message').html("<div class='alert alert-danger'>خطایی رخ داده است</div>");
        });

      this.$http.get(this.baseUrl + '/kudos/member-available-point/').then(function(response) {
          this.available_ponit = response.body.data.available_point
          console.log(':::::::::::::::::::::::::::::::',this.available_ponit)
        }.bind(this), function(data){
          $('#message').html("<div class='alert alert-danger'>خطایی رخ داده است</div>");
        });
    }
  }
</script>
