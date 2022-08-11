<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-button type="primary">主要按钮</el-button>
        <el-tab-pane label="用户管理" name="first">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号" width="180">
            </el-table-column>
            <el-table-column prop="date" label="角色" width="180">
            </el-table-column>
            <el-table-column prop="name" label="描述" width="180">
            </el-table-column>
            <el-table-column prop="address" label="操作">
              <template>
                <el-button size="small" type="primary">分配权限</el-button>
                <el-button size="mini" type="success">编辑</el-button>
                <el-button size="mini" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first',
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
    }
  },

  created() {},

  methods: {},
}
</script>

<style scoped lang="less"></style>
