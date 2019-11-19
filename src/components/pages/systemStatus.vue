<template>
    <div id="page-wrapper">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">وضعیت سیستم</h1>
                    <div v-if="!result" id="message">در حال دریافت اطلاعات ..</div>
                    <div v-else>
                      <ul class="list-group">
                        <li class="list-group-item justify-content-between">تست Authentication در EPG<span class="label label-success pull-left" v-if="result.epg_login == 1">موفق</span><span v-else class="label label-danger pull-left">ناموفق</span></li>
                        <li class="list-group-item justify-content-between">پینگ سرور EPG<span class="label label-success pull-left" v-if="result.epg_ping == 1">موفق</span><span v-else class="label label-danger pull-left">ناموفق</span></li>
                        <li class="list-group-item justify-content-between">سرور مونگو<span class="label label-success pull-left" v-if="result.mongo == 1">فعال</span><span v-else class="label label-danger pull-left">غیرفعال</span></li>
                        <li class="list-group-item justify-content-between">سرور MySQL<span class="label label-success pull-left" v-if="result.mysql == 1">فعال</span><span v-else class="label label-danger pull-left">غیرفعال</span></li>
                        <li class="list-group-item justify-content-between">سرور Redis<span class="label label-success pull-left" v-if="result.redis == 1">فعال</span><span v-else class="label label-danger pull-left">غیرفعال</span></li>
                      </ul>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
      return {
        result: {
          "epg_login": 1,
          "epg_ping": 1,
          "mongo": 1,
          "mysql": 1,
          "redis": 1
        }
      }
    },
    methods:{
      getContents: function () {
        this.$http.options.xhr = { withCredentials : true }
        this.$http.options.emulateJSON = true
          this.$http.get('http://lenz.aban.io:8898/status').then(function(data) {
            console.log(data.body)
            this.result = true
        })
      }
    },
    mounted(){
      this.getContents()
    }
}
</script>
