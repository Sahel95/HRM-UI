<template>
    <div id="page-wrapper">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">

                    <h1 class="page-header">ویرایش کمپین {{item.title}}

                    <button class="btn btn-danger pull-left" @click="removeCampaign()">حذف کمپین</button>

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
                         <div class="col-md-4">
                           <label>عنوان مجموعه</label>
                           <input class="form-control" v-model="item.title" /><br>
                         </div>
                         <div class="col-md-4">
                           <label>کمپین</label>
                           <select class="form-control" v-model="item.camp_id">
                            <option v-for="campaign in campaigns" :value="campaign.id">{{campaign.name}}</option>
                          </select>
                         </div>
                         <div class="col-md-4">
                           <label>وضعیت کمپین</label><br>
                           <input type="checkbox" id="disabled" v-model="item.is_disabled">
                            <label for="disabled">غیرفعال</label><br>
                           <!-- <input type="radio" id="active" value=false v-model="item.is_disabled">
                            <label for="active">فعال</label>
                            <input type="radio" id="disable" value=true v-model="item.is_disabled">
                            <label for="disable">غیرفعال</label> -->
                         </div>
                         <div class="row">
                           <div class="col-md-8">
                             <label>محتوای کمپین</label><br>
                             <textarea-autosize :min-height="100" :max-height="350" class="col-md-12 form-control" v-model="item.content"></textarea-autosize>
                           </div>
                           <div class="col-md-4">
                             <label>شروع کمپین</label><br>
                             <input type="date" v-model="item.start"/><br>
                             <label>پایان کمپین</label><br>
                             <input type="date" v-model="item.end"/>
                           </div>
                         </div>

                       </div>
                       <div class="panel-footer">
                         <div class="row text-left">
                          <div class="col-md-12">
                           <button class="btn btn-success" @click="editSubCampaign()">ویرایش</button>
                         </div>
                        </div>
                       </div>
                     </div>

                  </br>
                  </br>
                  </br>

                    <div class="clearfix">
                    </div>

                    <div v-for="question in item.questions" :id="'question_'+question.id" :key="question.id">
                      <div class="panel-group">
                       <div class="panel panel-default">
                         <div class="panel-heading" v-on:dblclick="collapse(question.id)">
                           <h4 class="panel-title">
                             <button class="btn btn-xs btn-primary pull-left" data-toggle="collapse" :href="'#' + question.id">+ باز/بسته کشویی</button>
                             {{question.title}}
                             <!-- {{item}} {{index}} -->
                           </h4>
                         </div>
                         <div :id="question.id" class="panel-collapse collapse">
                           <div class="panel-body">
                             <div class="row">
                             <div class="form-group col-md-6 col-sm-12">
                                <label>عنوان سوال</label>
                                <input type="text" class="form-control" v-model="question.title" >
                                <br>
                                <label>محتوای کمپین</label><br>
                                <textarea-autosize :min-height="100" :max-height="350" class="form-control" v-model="question.content"></textarea-autosize>
                                <br>
                                <button class="btn btn-success"  @click="editQuestion(question)">ویرایش</button>

                             </div>
                             </div>
                             <hr/>
                             <div class="form-group col-md-12 col-sm-12">
                                <label>گزینه‌ها:</label><br/>
                                  <div class="col-md-6" v-for="answer in question.answers" ><div class="alert" :class="{'alert-success':(question.answer_id == answer.id),'alert-info':(question.answer_id != answer.id)}">{{answer.text}}</span>
                                      <button @click="setAnswer(question,answer)" class="btn pull-left btn-info btn-xs" v-if="question.answer_id != answer.id">
                                      <i class="fa fa-check"></i> جواب درست
                                    </button>
                                  </div>
                                </div>
                             </div>

                             <div class="form-group col-md-6 col-sm-12">
                                <label>عنوان گزینه</label>
                                <div class="form-group col-md-11 col-sm-10 no-padding">
                                  <input type="text" class="form-control addAnswer" >
                                </div>
                                <div class="form-group col-md-1 col-sm-2" >
                                  <button class="btn btn-success"  @click="addAnswer(question)">اضافه کردن</button>
                                </div>

                             </div>


                           </div>
                           <div class="panel-footer">
                             <div class="row">

                             <div class="col-md-8">

                             </div>
                             <div class="col-md-4 text-left">
                               <button class="btn btn-danger btn-xs" @click="removeQuestion(question.id)">حذف</button>
                             </div>


                            </div>
                           </div>
                         </div>
                       </div>
                      </div>
                    </div>


                      <div class="panel-group">
                       <div class="panel panel-default">
                         <div class="panel-heading">
                           <h4 class="panel-title">
                             سوال جدید :‌ {{new_question}}
                             <!-- {{item}} {{index}} -->
                           </h4>
                         </div>
                         <div id="addQuestion" class="panel-collapse">
                           <div class="panel-body">
                             <div class="form-group col-md-6 col-sm-12">
                                <label>عنوان سوال</label>
                                  <input type="text" class="form-control" v-model="new_question" >
                                <br>
                                <label>محتوای کمپین</label><br>
                                <textarea-autosize :min-height="100" :max-height="350" class="form-control" v-model="new_question_content"></textarea-autosize>
                                <br>
                                <button class="btn btn-success"  @click="addQuestion()">اضافه کردن</button>
                             </div>


                           </div>
                         </div>
                       </div>
                      </div>
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
      item: {},
      campaigns:[],
      new_question:"",
      new_question_content:""
      }
    },
    methods:{
      getContents: function(){
        let itemId = this.$route.params.id

        this.$http.get(this.baseUrl + '/api/game/campaign/list').then(function(data) {
            this.campaigns = data.body
          }.bind(this), function(data){
            $('#message').html("<div class='alert alert-danger'>خطایی رخ داده است</div>");
          });


        this.$http.get(this.baseUrl + '/api/game/' + itemId).then(function(data) {

            this.item = data.body

          }.bind(this), function(data){
              $('#message').html("<div class='alert alert-danger'>خطایی رخ داده است</div>");
          });
      },
      editSubCampaign: function(){
        this.$http.post(this.baseUrl + '/api/game/subcampaign/' + this.item.id + '/edit', this.item).then(function(data) {
            $('#message').html("<div class='alert alert-success'>عملیات با موفقیت انجام شد</div>");
            $('#' + question.id).find('.addAnswer').val('')
          }.bind(this), function(data){
            $('#message').html("<div class='alert alert-danger'>خطایی رخ داده است</div>");
          });
      },
      editQuestion: function(question){
        this.$http.post(this.baseUrl + '/api/game/question/' + question.id, {'title':question.title,'content':question.content}).then(function(data) {
            $('#message').html("<div class='alert alert-success'>عملیات با موفقیت انجام شد</div>");
            $('#' + question.id).find('.addAnswer').val('')
          }.bind(this), function(data){
            $('#message').html("<div class='alert alert-danger'>خطایی رخ داده است</div>");
          });
      },
      setAnswer: function(question,answer){
        this.$http.get(this.baseUrl + '/api/game/question/' + question.id + '/' + answer.id).then(function(data) {
            $('#message').html("<div class='alert alert-success'>عملیات با موفقیت انجام شد</div>");
            this.getContents()
          }.bind(this), function(data){
            $('#message').html("<div class='alert alert-danger'>خطایی رخ داده است</div>");
          });

      },
      addAnswer: function(question){

        var text = $('#' + question.id).find('.addAnswer').val()
        this.$http.post(this.baseUrl + '/api/game/question/' + question.id + '/add' , {'text': text}).then(function(data) {
            $('#message').html("<div class='alert alert-success'>عملیات با موفقیت انجام شد</div>");
            this.getContents()
          }.bind(this), function(data){
            $('#message').html("<div class='alert alert-danger'>خطایی رخ داده است</div>");
          });

      },
      addQuestion: function(question){
        let campaignId = this.$route.params.id

        this.$http.post(this.baseUrl + '/api/game/' + campaignId + '/add' , {'title': this.new_question , 'content':this.new_question_content}).then(function(data) {
            $('#message').html("<div class='alert alert-success'>عملیات با موفقیت انجام شد</div>");
            this.new_question = ""
            this.getContents()
          }.bind(this), function(data){
            $('#message').html("<div class='alert alert-danger'>خطایی رخ داده است</div>");
          });

      },
      removeCampaign: function(){
        let campaignId = this.$route.params.id

        this.$http.get(this.baseUrl + '/api/game/subcampaign/' + campaignId + '/remove').then(function(data) {
            $('#message').html("<div class='alert alert-success'>عملیات با موفقیت انجام شد</div>");
            window.location="/game/subcamp/list"
          }.bind(this), function(data){
            $('#message').html("<div class='alert alert-danger'>خطایی رخ داده است</div>");
          });

      },
      removeQuestion: function(qid){

        this.$http.get(this.baseUrl + '/api/game/question/' + qid + '/remove').then(function(data) {
            $('#message').html("<div class='alert alert-success'>عملیات با موفقیت انجام شد</div>");
            $('#question_'+qid).remove()
          }.bind(this), function(data){
            $('#message').html("<div class='alert alert-danger'>خطایی رخ داده است</div>");
          });

      },
      collapse: function (index) {
        $('#'+ index).collapse('toggle')
      }
    },
    created(){
      this.getContents()
    }
  }
</script>
