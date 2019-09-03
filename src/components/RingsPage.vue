<template>
    <v-ons-page>
        <v-ons-list>
            <v-ons-list-item v-for="ring in rings" :key="ring.num">
                <span class="list-item__title">{{ring.num}} пара</span>
                <span class="list-item__subtitle">{{ring.time}} (перерыв {{ring.break}})</span>
            </v-ons-list-item>
        </v-ons-list>
    </v-ons-page>
</template>

<script>
export default {
    data: () => ({
        rings: [
            { num: 1, time: "08:30 - 10:05", break: "09:15 - 09:20" },
            { num: 2, time: "10:25 - 12:00", break: "11:10 - 11:15" },
            { num: 3, time: "12:30 - 14:05", break: "13:15 - 13:20" },
            { num: 4, time: "14:15 - 15:50", break: "15:00 - 15:05" },
            { num: 5, time: "16:00 - 17:35", break: "16:45 - 16:50" },
            { num: 6, time: "17:45 - 19:20", break: "18:30 - 18:35" },
            { num: 7, time: "19:25 - 21:00", break: "20:10 - 20:15" }
        ]
    })
}
</script>