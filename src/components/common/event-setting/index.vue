<template>
  <div>
    <el-dropdown @command="handleCommand">
      <el-button type="primary">
        添加事件<i class="el-icon-arrow-down"></i>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item in eventOptions" :key="item.key" :command="item">
            {{ item.name }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <div class="mt-10">
      <el-table :data="events">
        <el-table-column prop="name" label="事件名称"></el-table-column>
        <el-table-column prop="params" label="事件参数">
          <template #default="scope">
            <el-input v-model="scope.row.params" :disabled="!scope.row.required"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作">
          <template #default="scope">
            <el-button type="text" @click="handleDelete(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { ref, reactive, onMounted } from 'vue'
import event from '@/enum/event'
import { useStore } from 'vuex'
export default {
  name: 'event-setting',
  props: {
    config: {
      required: true,
      type: Object
    }
  },
  setup (props) {
    const store = useStore()
    const events = ref([])
    const eventOptions = reactive(event)
    const handleCommand = async (params) => {
      if (events.value.some(item => item.key === params.key)) {
        return
      }
      events.value.push(params)
      await store.dispatch('editor/updateItem', {
        id: props.config.id,
        path: 'events',
        value: events.value
      })
    }
    const handleDelete = async (index) => {
      events.value.splice(index, 1)
      await store.dispatch('editor/updateItem', {
        id: props.config.id,
        path: 'events',
        value: events.value
      })
    }
    onMounted(() => {
      events.value = props.config.events
    })
    return {
      events,
      eventOptions,
      handleCommand,
      handleDelete
    }
  }
}
</script>
