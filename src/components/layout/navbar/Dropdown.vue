

<template>
    <li class="dropdown">
        <a class="dropdown-toggle" data-toggle="dropdown" href="#">
            <i :class="['fa fa-fw', icon]"></i>{{member.first_name + ' ' + member.last_name}}<i class="fa fa-caret-down"></i>
        </a>
        <ul :class="['dropdown-menu', dClass]">
            <slot></slot>
            <li v-if="hasLink">
                <a class="text-center" :href="link">
                    <strong>{{ action }}</strong>
                    <i class="fa fa-angle-right"></i>
                </a>
            </li>
        </ul>
    </li>
</template>


<script>
export default {
  name: 'Dropdown',
  props: ['icon', 'dClass', 'link', 'action', 'kudos'],
  data: function () {
    return {
      member : {
        last_name:'',
        first_name:''
  },
    }
  },
  computed: {
    hasLink: function () {
      return this.link != null
    }
  },
  mounted(){
      this.$http.get(this.baseUrl + '/member/detail/').then(function(response) {
          this.member = response.body.data
        }.bind(this), function(data){
          $('#message').html("<div class='alert alert-danger'>خطایی رخ داده است</div>");
        });     
  }
}
</script>