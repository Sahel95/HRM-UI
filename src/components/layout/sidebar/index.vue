<script>
export default {
  name: 'Sidebar'
}
</script>

<template>
    <div class="sidebar" role="navigation" style="margin-top: 0px;">
        <div class="sidebar-nav navbar-collapse">
            <ul class="nav" id="side-menu">
                <li><router-link to="/" exact> <i class="fa fa-dashboard fa-fw"></i> پیشخوان </router-link></li>
                
                
                <li><a data-toggle="collapse" href="#layoutsub"><i class="fa fa-user fa-fw"></i>کاربر<span class="pull-left">+</span></a>

                  <ul id="layoutsub" class="nav nav-second-level collapse">
                      <li>
                         <router-link to="/user/profile" >پروفایل</router-link>
                      </li>
                      <li>
                        <router-link to="/user/password/change" >تغییر رمز عبور</router-link>
                      </li>
                  </ul>
                </li>


                <!-- <li><a data-toggle="collapse" href="#layoutsub"><i class="fa fa-table fa-fw"></i> مدیریت صفحه‌ها<span class="pull-left">+</span></a>

                  <ul id="layoutsub" class="nav nav-second-level collapse">
                      <li>
                         <router-link to="/layout/vod" >صفحه اصلی ویدیوها</router-link>
                      </li>
                      <li>
                        <router-link to="/layout/aod" >صفحه اصلی موسیقی</router-link>
                      </li>
                  </ul>
                </li> -->
                <!-- <li><a data-toggle="collapse" href="#listsub"><i class="fa fa-bars fa-fw"></i> مدیریت لیست‌ها<span class="pull-left">+</span></a>

                  <ul id="listsub" class="nav nav-second-level collapse">
                      <li>
                         <router-link to="/list/channels">لیست شبکه‌ها</router-link>
                      </li>
                      <li>
                         <router-link to="/list/genres">لیست ژانر‌ها</router-link>
                      </li>

                  </ul>
                </li> -->

                
                <li><a data-toggle="collapse" href="#campaignlistsub"><i class="fa fa-bars fa-fw"></i>کودس<span class="pull-left">+</span></a>

                  <ul id="campaignlistsub" class="nav nav-second-level collapse">
                      <!-- <li>
                         <router-link to="/game/camp/add">اضافه کردن کمپین جدید</router-link>
                      </li> -->

                      <li>
                         <router-link to="/kudos/transfer">انتقال</router-link>
                      </li>

                      <li>
                         <router-link to="/kudos/transaction">گردش حساب</router-link>
                      </li>
                      
                      <!-- <li>
                         <router-link to="/game/subcamp/list">اعضای تیم</router-link>
                      </li> -->
                      <!-- <li>
                         <router-link to="/game/leaderboard">لیدربرد</router-link>
                      </li> -->

                  </ul>
                </li>
                <!-- <li><router-link to="/users" exact> <i class="fa fa-user fa-fw"></i> مدیریت کاربران</router-link></li>
                <li><router-link to="/systemStatus" exact> <i class="fa fa-dashboard fa-fw"></i> وضعیت سیستم </router-link></li> -->
            </ul>

        </div>
    </div>
</template>
