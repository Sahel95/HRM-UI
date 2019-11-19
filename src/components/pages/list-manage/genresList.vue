<template>
    <div id="page-wrapper">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">

                    <h1 class="page-header">لیست ژانرها
                      <button class="btn btn-success pull-left" @click="save">ذخیره همه</button>
                    </h1>
                    <div class="row">
                      <div id="message" class="col-md-12" ></div>
                    </div>
                    <draggable :list="genresList" :options="{handle: '.panel-heading',  ghostClass:'ghost',animation:150}" :no-transition-on-drag="true" @start="drag=true" @end="endDrag">
                        <div v-for="(item ,index) in genresList" :key="index">
                          <div class="panel-group">
                           <div class="panel panel-default">
                             <div class="panel-heading" v-on:dblclick="collapse(index)">
                               <h4 class="panel-title">
                                 <button class="btn btn-xs btn-primary pull-left" data-toggle="collapse" :href="'#' + index">+ باز/بسته کشویی</button>
                                 {{genresList[index].name}}
                                 <!-- {{item}} {{index}} -->
                               </h4>
                             </div>
                             <div :id="index" class="panel-collapse collapse">
                               <div class="panel-body">
                                 <div class="form-group col-md-6 col-sm-12">
                                    <label>عنوان ژانر</label>
                                    <input type="text" class="form-control" v-model="genresList[index].name" >
                                  </div>
                                  <div class="form-group col-md-6 col-sm-12">
                                     <label>آی‌دی ژانر</label>
                                     <input type="text" class="form-control" v-model="genresList[index].id" >
                                  </div>
                                  <div class="form-group col-md-6 col-sm-12">
                                     <label>تصویر اصلی</label>
                                     <input type="text" class="form-control" v-model="genresList[index].iconImageUrl" ><br/>
                                     <label>تصویر پس زمینه</label>
                                     <input type="text" class="form-control" v-model="genresList[index].backgroundImageUrl" >
                                  </div>
                                  <div class="form-group col-md-6 col-sm-12">
                                     <label>پیشنمایش</label>
                                     <div class="card card-horizontal-genre">
                                       <a href="#">
                                         <div class="cover" v-bind:style="{'background-image': 'url(' + baseStaticURL + genresList[index].backgroundImageUrl + ')'}"></div>
                                         <div class="overlay" :class="gradiants[Math.floor(Math.random() * gradiants.length)]" ></div>
                                         <img class="icon" :src="baseStaticURL + genresList[index].iconImageUrl" />
                                         <h1 class="title">{{genresList[index].name}}</h1>
                                       </a>
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
      gradiants : ['gradient-pink' , 'gradient-blue' , 'gradient-full-red' , 'gradient-blue' , 'black-overlay'],
      genresList: []
      }
    },
    methods:{
      getContents: function(){
        this.$http.get(this.baseUrl + '/api/misc/filter/name/genre_list').then(function(data) {

            this.genresList = JSON.parse(data.body.content)
            this.output = data.body
            this.output.content= []

          }.bind(this), function(data){
              this.$refs.message.className = "text-warning";
              this.$refs.message.innerText = "خطایی رخ داده است";
          });
      },
      save: function(){
        this.$http.put(this.baseUrl + '/api/misc/genre_list', {'name':this.output.name,'content':JSON.stringify(this.genresList)}).then(function(data) {
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
      this.baseStaticURL = this.lenzStatic + "genre-icons/"
    }
  }
</script>
