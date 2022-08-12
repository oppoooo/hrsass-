<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <span slot="left-tag">共166条记录</span>
        <template slot="right">
          <el-button size="small" type="warning">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary">新增员工</el-button>
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="empoyees">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="员工">
            <template slot-scope="{ row }">
              <img
                style="
                  border-radius: 50%;
                  width: 100px;
                  height: 100px;
                  padding: 10px;
                "
                v-imgError="require('@/assets/common/head.jpg')"
                :src="row.staffPhoto"
                alt=""
              />
            </template>
          </el-table-column>

          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            :formatter="formatFormOfEmployment"
            prop="formOfEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry" />
          <el-table-column label="账户状态" sortable="" prop="enableState" />
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            :page-size="pages.size"
            :current-page="pages.page"
            :total="total"
            layout="prev, pager, next"
            @current-change="changeChange"
          />
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getEmployeesInfoApi } from '@/api/employees'
import employee from '@/constant/employees'
export default {
  name: 'employee',
  data() {
    return {
      empoyees: [],
      total: 0,
      pages: {
        page: 1,
        size: 10,
      },
    }
  },

  created() {
    this.getEmployeesInfoList()
  },

  methods: {
    async getEmployeesInfoList() {
      const { rows, total } = await getEmployeesInfoApi(this.pages)
      this.empoyees = rows
      this.total = total
      console.log(rows, this.empoyees)
    },
    changeChange(val) {
      this.pages.page = val
      this.getEmployeesInfoList()
    },
    formatFormOfEmployment(row, column, cellValue, index) {
      // if (cellValue === 1) return '正式'
      // if (cellValue === 2) return '非正式'
      // return '未知'
      const findItem = employee.hireType.find((item) => item.id === cellValue)
      // console.log(findItem)
      return findItem ? findItem.value : '未知'
    },
  },
}
</script>

<style scoped lang="less"></style>
