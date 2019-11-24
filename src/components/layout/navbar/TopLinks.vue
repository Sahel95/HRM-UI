<template>
    <ul class="nav navbar-top-links navbar-left">
        <!-- <dropdown icon="fa-envelope" d-class="dropdown-messages"
            link="#"
            action="Ver as mensagens">

            <template v-for="n in 3">
                <message name="João" at="Ontem"> Hu3 </message>
                <li class="divider"></li>
            </template>

        </dropdown> -->

        <!-- <dropdown icon="fa-tasks" d-class="dropdown-tasks"
            link="#"
            action="Ver as tarefas">

            <template v-for="task in tasks">
                <task :name="task.name" :complete="task.complete" :type="task.type"/>
                <li class="divider"></li>
            </template>

        </dropdown> -->

        <dropdown icon="fa-user" d-class="dropdown-user" >

            <li><a href="#"><i class="fa fa-user fa-fw"></i><router-link to="/user/profile" >پروفایل کاربر</router-link></a></li>
            <!-- <li><a href="#"><i class="fa fa-gear fa-fw"></i> تنظیمات</a></li> -->
            <li class="divider"></li>
            <li><a href="#" @click="logout"><i class="fa fa-sign-out fa-fw"></i> خروج</a></li>

        </dropdown>
    </ul>
</template>

<script>

import Dropdown from './Dropdown'
import Message from './type/Message'
import Task from './type/Task'
import Vue from 'vue'

export default {
  name: 'TopLinks',
  components: { Dropdown, Message, Task },
  data: function () {
    return {
      tasks: [],
    }
  },
  methods:{
    logout: function () {
      Vue.localStorage.remove('isAuthenticated')
      Vue.localStorage.remove('token')
      Vue.localStorage.remove('user')
      window.location.href = '/login'

    }
  }
}
</script>
