<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <!-- 头部 -->
        <tree-tools
          @add="dialogVisible = true"
          :isRoot="true"
          :treeNode="company"
        />
        <!-- 树状 -->

        <el-tree :data="treeData" :props="defaultProps" default-expand-all>
          <!-- 作用域插槽 -->
          <!-- v-slot 获取组件内部slot提供的数据 -->
          <template v-slot="{ data }">
            <tree-tools
              @edit="showEdit"
              @add="showAddDept"
              @remove="loadDepts"
              :treeNode="data"
            ></tree-tools>
          </template>
        </el-tree>
      </el-card>
    </div>
    <!-- 添加部门弹层 -->
    <add-dept
      ref="addDept"
      :visible.sync="dialogVisible"
      :currentNode="currentNode"
      @add-dept="loadDepts"
    ></add-dept>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDeptsApi } from '@/api/departments'
import { tranListToTreeData } from '@/utils/index'
import AddDept from './components/add-dept.vue'
export default {
  components: {
    TreeTools,
    AddDept,
  },
  data() {
    return {
      company: { name: '传智教育', manager: '负责人' },
      treeData: [
        { name: '总裁办', children: [{ name: '董事会' }] },
        { name: '行政部' },
        { name: '人事部' },
      ],
      defaultProps: {
        label: 'name',
      },
      dialogVisible: false,
      currentNode: {},
    }
  },

  created() {
    this.loadDepts()
  },

  methods: {
    async loadDepts() {
      const res = await getDeptsApi()
      this.treeData = tranListToTreeData(res.depts, '')
    },
    showAddDept(val) {
      this.dialogVisible = true
      this.currentNode = val
    },
    showEdit(val) {
      this.dialogVisible = true
      this.$refs.addDept.getDeptById(val.id)
    },
  },
}
</script>

<style scoped lang="less"></style>
