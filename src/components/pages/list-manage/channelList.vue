<template>
    <div id="page-wrapper">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">

                    <h1 class="page-header">لیست شبکه ها
                      <button class="btn btn-success pull-left" @click="save">ذخیره همه</button>
                    </h1>
                    <div class="row">
                      <div id="message" class="col-md-12" ></div>
                    </div>
                    <draggable :list="channelList" :options="{handle: '.panel-heading',  ghostClass:'ghost',animation:150}" :no-transition-on-drag="true" @start="drag=true" @end="endDrag">
                        <div v-for="(item ,index) in channelList" :key="index">
                          <div class="panel-group">
                           <div class="panel panel-default">
                             <div class="panel-heading" v-on:dblclick="collapse(index)">
                               <h4 class="panel-title">
                                 <button class="btn btn-xs btn-primary pull-left" data-toggle="collapse" :href="'#' + index">+ باز/بسته کشویی</button>
                                 {{channelList[index].name}}
                                 <!-- {{item}} {{index}} -->
                               </h4>
                             </div>
                             <div :id="index" class="panel-collapse collapse">
                               <div class="panel-body">
                                 <div class="form-group col-md-6 col-sm-12">
                                    <label>نام شبکه</label>
                                    <input type="text" class="form-control" v-model="channelList[index].name" >
                                  </div>
                                  <div class="form-group col-md-6 col-sm-12">
                                     <label>آی‌دی شبکه</label>
                                     <input type="text" class="form-control" v-model="channelList[index].channelno" >
                                  </div>
                                  <div class="form-group col-md-6 col-sm-12 no-padding">
                                    <div class="col-md-8">
                                     <label>تصویر اصلی</label>
                                     <input type="text" class="form-control" v-model="channelList[index].imageUrl" >
                                   </div>
                                   <div class="col-md-4">
                                     <img :src="baseStaticURL + channelList[index].imageUrl" class="img-fluid" />
                                   </div>
                                  </div>
                                  <div class="form-group col-md-6 col-sm-12 no-padding">
                                    <div class="col-md-8">
                                     <label>تصویر ثانویه</label>
                                     <input type="text" class="form-control" v-model="channelList[index].secondImageUrl" >
                                   </div>
                                   <div class="col-md-4">
                                     <img :src="baseStaticURL + channelList[index].secondImageUrl" class="img-fluid bg-primary" />
                                   </div>
                                  </div>


                               </div>
                               <div class="panel-footer">
                                 <div class="row">

                                 <div class="col-md-8">
                                  <span class="align-middle text-muted">تغییر ترتیب آیتم ها از طریق <kbd>کلیک و درگ</kbd> ممکن است</span>
                                 </div>
                                 <div class="col-md-4 text-left">
                                   <button class="btn btn-success btn-xs" @click="save">ذخیره همه</button>
                                   <button class="btn btn-warning btn-xs" @click="clone(index)">کپی</button>
                                   <button class="btn btn-danger btn-xs" @click="remove(index)">حذف</button>
                                 </div>


                                </div>
                               </div>
                             </div>
                           </div>
                          </div>
                        </div>
                    </draggable>

                    <div class="clearfix">
                      <button class="btn btn-success pull-left" @click="save">ذخیره همه</button>
                    </div>

                  </br>
                </div>


            </div>
        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  components: {
    draggable,
  },
  data() {
    return {
      baseStaticURL: false,
      channels: {},
channelList: []
      }
    },
    methods:{
      getContents: function(){
        this.$http.get(this.baseUrl + '/api/misc/filter/name/channels_list').then(function(data) {
            this.channels = JSON.parse(data.body.content)
            this.output = data.body
            this.output.content= []

            for(var key in this.channels){
              this.channelList.push({
                'chanenlid': key,
                'chnanelno': this.channels[key].channelno,
                'name': this.channels[key].name,
                'imageUrl': this.channels[key].imageUrl,
                'secondImageUrl': this.channels[key].secondImageUrl
              })
            }
          }.bind(this), function(data){
              this.$refs.message.className = "text-warning";
              this.$refs.message.innerText = "خطایی رخ داده است";
          });
      },
      save: function(){

        for(var i=0;i< this.channelList.length; i++){
            this.channels[this.channelList[i].chanenlid] = this.channelList[i]
        }
        this.$http.put(this.baseUrl + '/api/misc/channels_list', {'name':this.output.name,'content':JSON.stringify(this.channels)}).then(function(data) {
            $('#message').html("<div class='alert alert-success'>عملیات با موفقیت انجام شد</div>");
          }.bind(this), function(data){
            $('#message').html("<div class='alert alert-danger'>خطایی رخ داده است</div>");
          });
      },
      endDrag: function () {
  			// console.log(evt)
      },
      collapse: function (index) {
  			// console.log(evt)
        console.log(index)
        $('#'+ index).collapse('toggle')
      },
      remove: function(index){
        // this.layoutList.splice(index,2)
        $('#message').html("<div class='alert alert-success'>آیتم با موفقیت حذف شد !</div>");
      },
      clone: function(index){
        // var newItem = this.layoutList.slice(index,index+1)[0]
        console.log(newItem)
        // var newItem = {
        //    "title" : this.layoutList[index].title + "_copy" ,
        //    "viewType":this.layoutList[index].viewType,
        //    "viewOrder" : this.layoutList[index].viewOrder,
        //    "func" : this.layoutList[index].func,
        //    "id" : this.layoutList[index].id + "_copy",
        //    "more" : this.layoutList[index].more
        //   }
        // this.layoutList.splice(index+1,0,newItem)
        $('#message').html("<div class='alert alert-success'>کپی آیتم با موفقیت ایجاد شد !</div>");
      }
    },
    beforeUpdate(){
      // $('#moduleExtra').slideUp().delay(1000).slideDown();
    },
    created(){
      this.getContents()

      this.baseStaticURL = this.lenzStatic + "channels/"
    }
  }
</script>
