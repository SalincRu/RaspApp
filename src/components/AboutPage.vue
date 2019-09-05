<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">О программе</div>
      <div class="left">
        <v-ons-back-button>Назад</v-ons-back-button>
      </div>
    </v-ons-toolbar>

    <div>
      <h2 style="margin: 10px">Расписание СИК</h2>

      <v-ons-list style="margin-bottom: 10px;">
        <v-ons-list-item @click="openUrl('https://github.com/SalincRu/RaspApp')" modifier="chevron" tappable>
          <div class="left">
            <v-ons-icon size="25px" icon="mdi-github-circle"></v-ons-icon>
          </div>
          <div class="center">GitHub</div>
        </v-ons-list-item>
        <!-- <v-ons-list-item @click="openUrl('https://github.com/Psydk')" modifier="chevron" tappable>
          <div class="left">
            <v-ons-icon size="25px" icon="mdi-link"></v-ons-icon>
          </div>
          <div class="center">API расписания</div>
        </v-ons-list-item> -->
      </v-ons-list>

      <div class="content">
        <h3>Список изменений</h3>
        <div v-for="ver in changelog" :key="ver.version">
          <h4>{{ver.version}} - {{ver.date}}</h4>
          <ul>
            <li modifier="longdivider" v-for="change in ver.changes" :key="change">{{change}}</li>
          </ul>
        </div>
      </div>
    </div>
  </v-ons-page>
</template>

<style lang="scss">
ul {
  padding-left: 20px;
}
.content {
  padding: 5px 10px;
  background: white;
  margin-bottom: 10px;
}
</style>

<script>
import clog from "../changelog";

export default {
  data: () => ({
    changelog: clog,
    hostname: location.hostname
  }),
  methods: {
    openUrl(url) {
      window.open(url, "_blank");
    }
  }
};
</script>