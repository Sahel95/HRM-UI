<template>

    <div id="page-wrapper">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">

                    <h1 class="page-header">طراحی ظاهر صفحه اصلی ویدیوها
                      <button class="btn btn-success pull-left" @click="save">ذخیره همه</button>
                    </h1>
                    <div class="row">
                      <div id="message" class="col-md-12" ></div>
                    </div>
                    <draggable :list="layoutList" :options="{handle: '.super-panel-heading',  ghostClass:'ghost',animation:150}" :no-transition-on-drag="true" @start="drag=true" @end="endDrag">
                        <div v-for="(item ,index) in layoutList" :key="item.id">
                          <div class="panel-group">
                           <div class="panel panel-default">
                             <div class="panel-heading super-panel-heading" v-on:dblclick="collapse(item.id)">
                               <h4 class="panel-title">
                                 <button class="btn btn-xs btn-primary pull-left" data-toggle="collapse" :href="'#' + item.id">+ باز/بسته کشویی</button>
                                 {{item.title}}
                               </h4>
                             </div>
                             <div :id="item.id" class="panel-collapse collapse">
                               <div class="panel-body">
                                 <div class="form-group col-md-6 col-sm-12">
                                    <label>عنوان</label>
                                    <input type="text" class="form-control" v-model="layoutList[index].title" >
                                  </div>
                                  <div class="form-group col-md-6 col-sm-12">
                                     <label>ویو تایپ (‌ViewType)</label>
                                     <!-- <input type="text" class="form-control" v-model="layoutList[index].viewType" > -->
                                     <select v-model="layoutList[index].viewType" class="form-control">
                                       <option v-for="module in viewTypes" :value="module.id">{{module.id}}-{{module.name}} [{{module.desc}}]</option>
                                     </select>
                                  </div>
                                  <div class="form-group col-md-6 col-sm-12">
                                     <label>آی دی بخش‌</label>
                                     <input type="text" class="form-control" v-model="layoutList[index].id" >
                                  </div>
                                  <div class="form-group col-md-6 col-sm-12">
                                     <label>ماژول</label>
                                      <select v-model="layoutList[index]['func']" class="form-control">
                                        <option v-for="module in VodModules" :value="module.id">{{module.title}}</option>
                                      </select>
                                  </div>
                                  <module-extra :layoutList="layoutList" :func="layoutList[index]['func']" :index="index"></module-extra>
                                  <div class="form-group col-md-6 col-sm-12">
                                       <label>نمایش دکمه 'نمایش همه' ؟</label><br>
                                       <label><input type="checkbox" v-model="layoutList[index].more">بله، این بخش دارای صفحه نمایش همه است</label>
                                  </div>
                                  <!-- {{layoutList[index]['func']}} -->

                                  <!-- <div class="col-md-12">
                                    <h3>عنوان:‌ {{VodModules[layoutList[index]['func']]['options'].title}}  نام تابع:‌ {{layoutList[index]['func']['options'].id}}</h3>

                                    <div v-for="option in VodModules[layoutList[index]['func']]['options'].options" class="form-group col-md-6 col-sm-12">
                                      <label>{{option.label}}</label><br/>
                                      <select v-if="option.type == 'dropdown'" v-model="layoutList[index]['extra'][option.id]" class="form-control">
                                        <option v-for="(key,value) in option.options" :value="key">{{value}}</option>
                                      </select>
                                      <input v-else-if="option.type=='text'" v-model="layoutList[index][option.id]" />
                                    </div>
                                  </div> -->

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
import ModuleExtra from './moduleextra'
export default {
  components: {
    draggable,
    ModuleExtra
  },

  data() {
    return {
      layoutList: [],
      output: []
      }
    },
    methods:{
      getContents: function(){
        this.$http.get(this.baseUrl + '/api/misc/filter/name/vod_home').then(function(data) {

            this.layoutList = JSON.parse(data.body.content)
            this.output = data.body
            this.output.content= []

          }.bind(this), function(data){
              this.$refs.message.className = "text-warning";
              this.$refs.message.innerText = "خطایی رخ داده است";
          });
      },
      save: function(){
        this.$http.put(this.baseUrl + '/api/misc/vod_home', {'name':this.output.name,'content':JSON.stringify(this.layoutList)}).then(function(data) {
            $('#message').html("<div class='alert alert-success'>عملیات با موفقیت انجام شد</div>");
          }.bind(this), function(data){
            $('#message').html("<div class='alert alert-danger'>خطایی رخ داده است</div>");
          });
      },
      endDrag: function () {
  			// console.log(evt)
        for(var i=0;i < this.layoutList.length ; i++){
          this.layoutList[i].viewOrder = i
        }
      },
      collapse: function (index) {
  			// console.log(evt)
        // console.log(index)
        $('#'+ index).collapse('toggle')
      },
      remove: function(index){
        this.layoutList.splice(index,2)
        $('#message').html("<div class='alert alert-success'>آیتم با موفقیت حذف شد !</div>");
      },
      clone: function(index){
        // var newItem = this.layoutList.slice(index,index+1)[0]
        // console.log(newItem)
        var newItem = {
           "title" : this.layoutList[index].title + "_copy" ,
           "viewType":this.layoutList[index].viewType,
           "viewOrder" : this.layoutList[index].viewOrder,
           "func" : this.layoutList[index].func,
           "id" : this.layoutList[index].id + "_copy",
           "more" : this.layoutList[index].more
          }
        this.layoutList.splice(index+1,0,newItem)
        $('#message').html("<div class='alert alert-success'>کپی آیتم با موفقیت ایجاد شد !</div>");
      }
    },
    beforeUpdate(){
      // $('#moduleExtra').slideUp();
    },
    updated(){
      // $('#moduleExtra').slideDown();
    },
    created(){
      // console.log(this.viewTypes[12])
      this.getContents()
    }
  }
</script>
