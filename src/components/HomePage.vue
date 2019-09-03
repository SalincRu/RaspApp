<template>
  <v-ons-page>
    <v-ons-pull-hook
      :action="updateRasp"
      :fixed-content="md()"
      :on-pull="md() && onPull || null"
      :height="md() ? 84 : 64"
      @changestate="state = $event.state"
    >
      <!-- Show this on iOS -->
      <v-ons-icon
        v-if="!md()"
        size="22px"
        class="pull-hook-spinner"
        :icon="state === 'action' ? 'mdi-refresh' : 'mdi-arrow-down-bold'"
        :rotate="state === 'preaction' && 180"
        :spin="state === 'action'"
      ></v-ons-icon>

      <!-- Show this on Material Design -->
      <div v-else class="pull-hook-progress">
        <v-ons-progress-circular
          :value="ratio * 100"
          :indeterminate="state === 'action'"
          :style="{ transform: `rotate(${ratio}turn)` }"
        ></v-ons-progress-circular>
      </div>
    </v-ons-pull-hook>
    <div>
      <div
        v-if="defaultGroup === null"
        style="text-align: center; margin: 15px 15px;"
      >Выберите группу как основную, для того чтобы отображать её расписание на данной странице</div>
      <div v-else>
        <h5 style="margin: 10px;">Группа {{defaultGroup}}</h5>
        <v-ons-list style="margin-bottom: 10px" v-for="rasp in groupData.rasp" :key="rasp.date">
          <v-ons-list-header>{{rasp.date}}</v-ons-list-header>
          <v-ons-list-item v-for="lesson in rasp.lessons" :key="lesson.num">
            <div class="center">
              <span class="list-item__title">{{lesson.num}} пара</span>
              <span class="list-item__subtitle">{{lesson.name}}</span>
            </div>
            <div class="right">{{lesson.cab}}</div>
          </v-ons-list-item>
        </v-ons-list>
        <div v-if="defaultGroup === null" style="padding: 0 10px 0 10px">
          <v-ons-button modifier="large" @click="setGroupAsDefault">Установить как основную группу</v-ons-button>
        </div>
        <div
          style="margin: 10px"
          class="last_update"
        >Последнее обновление: {{groupData.last_update}}</div>
      </div>
    </div>
  </v-ons-page>
</template>

<script>
export default {
  data: () => ({
    defaultGroup: null,
    groupData: null,
    state: "initial",
    ratio: 0
  }),
  methods: {
    md() {
      return this.$ons.platform.isAndroid();
    },
    onPull(ratio) {
      this.ratio = ratio;
    },
    updateRasp(done) {
      if (this.defaultGroup) {
        fetch("/api.php?method=rasp&type=group&group=" + this.defaultGroup)
          .then(request => request.json())
          .then(request => {
            //this.groupData = request;
            this.$store.commit("SET_LAST_RASP", request);
            done();
          })
          .catch(error => {
            this.$ons.notification.toast(
              "Не удалось загрузить расписание группы",
              {
                timeout: 2000
              }
            );
            done();
          });
      } else {
        done();
      }
    }
  },
  mounted() {
    this.defaultGroup = this.$store.getters.SETTINGS.group;
    if (this.defaultGroup != null) this.updateRasp(() => {});
    this.groupData = this.$store.getters.LAST_RASP;
    this.$store.watch(
      (state, getters) => getters.LAST_RASP,
      (newValue, oldValue) => {
        this.groupData = newValue;
      }
    );
    this.$store.watch(
      (state, getters) => getters.SETTINGS.group,
      (newValue, oldValue) => {
        this.defaultGroup = newValue;
        this.updateRasp(() => {});
      }
    );
  }
};
</script>

<style lang="scss">
.pull-hook-spinner {
  color: #666;
  transition: transform 0.25s ease-in-out;
}
.pull-hook-progress {
  background-color: white;
  width: 32px;
  height: 32px;
  margin: 30px auto 0;
  border-radius: 100%;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  display: inline-block;
  line-height: 0px;
  .progress-circular {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 4px;
    left: 4px;
  }
  .progress-circular__primary {
    transition: stroke-dashoffset 0s;
  }
}
</style>