<template>
    <div id="page-wrapper">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">

                    <h1 class="page-header">ویرایش کمپین {{item.name}}


                    </h1>
                    <div class="row">
                      <div id="message" class="col-md-12" ></div>
                    </div>

                    <div class="clearfix">
                    </div>

                    <div class="panel panel-success">
                       <div class="panel-heading">مشخصات کمپین
                       </div>
                       <div class="panel-body">
                         <div class="col-md-12">
                           <label>عنوان کمپین</label>
                           <input class="form-control" v-model="item.name" /><br>
                         </div>
                         <div class="col-md-12">
                           <label>توضیحات</label><br>
                           <textarea-autosize :min-height="100" :max-height="350" class="col-md-12 form-control" v-model="item.description"></textarea-autosize>
                         </div>

                       </div>
                       <div class="panel-footer">
                         <div class="row text-left">
                          <div class="col-md-12">
                            <button class="btn btn-success" @click="editCampaign()">ویرایش</button>
                            <!-- <button class="btn btn-danger" @click="removeCampaign()">حذف</button> -->
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
  data() {
    return {
      item: {
        'name':'',
        'description':''
        }
      }
    },
    methods:{
      editCampaign: function(){
        let campaignId = this.$route.params.id

        this.$http.post(this.baseUrl + '/api/game/campaign/' + campaignId + '/edit' , {'name': this.item.name , 'description': this.item.description }).then(function(data) {
            $('#message').html("<div class='alert alert-success'>عملیات با موفقیت انجام شد</div>");
          }.bind(this), function(data){
            $('#message').html("<div class='alert alert-danger'>خطایی رخ داده است</div>");
          });

      },
      collapse: function (index) {
        $('#'+ index).collapse('toggle')
      }
    },
    created(){

      let campaignId = this.$route.params.id


      this.$http.get(this.baseUrl + '/api/game/campaign/' + campaignId + '/edit').then(function(data) {
          this.item = data.body
        }.bind(this), function(data){
          $('#message').html("<div class='alert alert-danger'>خطایی رخ داده است</div>");
        });
    }
  }
</script>
