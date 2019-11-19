<template>
  <div v-if="VodModules[func].hasOwnProperty('options')" id="moduleExtra" class="col-md-12">
    <div class="panel panel-info">
      <div class="panel-heading">تنظیمات اضافی تابع {{VodModules[func].title}} [{{VodModules[func].id}}]</div>
      <div class="panel-body" v-if="VodModules[func].hasOwnProperty('options')">
        <div v-for="option in VodModules[func].options" class="form-group col-md-6 col-sm-12">
          <label>{{option.label}}</label><br/>
          <select v-if="option.type == 'dropdown'" v-model="layoutList[index]['extra'][option['id']]" class="form-control">
            <option v-for="(key,value) in option.options" :value="value">{{key}}</option>
          </select>
          <input v-else-if="option.type =='text'" class="form-control" v-model="layoutList[index]['extra'][option.id]" />
        </div>
      </div>
    </div><br>
  </div>
</template>

<script>
export default {
  props: ['func','index','layoutList'],
  data() {
    return {
      // layoutList : this.$parent.layoutList
    }
  },
  methods:{

  },
  created(){
    // $('#moduleExtra').slideDown();
  },
  beforeDestroy(){
    // $('#moduleExtra').slideUp();
  },
  beforeUpdate(){
    // $('#moduleExtra').slideUp();
  },
  updated(){
    if(!this.VodModules[this.func].hasOwnProperty('options')){
      // $('#moduleExtra').slideUp();
      this.layoutList[this.index]['extra'] = {}
    }
    // else{
    //   // $('#moduleExtra').slideDown();
    // }
    console.log(this.func)
  }
}
</script>
