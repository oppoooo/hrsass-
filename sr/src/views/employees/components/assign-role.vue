<template>
  <div>
    <el-dialog
      @open="onOpen"
      title="分配角色"
      :visible="visible"
      @close="close"
    >
      <!-- <el-checkbox-group v-model="roleIds">
        <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
          {{ item.name }}
        </el-checkbox>
      </el-checkbox-group> -->
      <!-- 分配角色 -->
      <el-checkbox-group v-model="checkList">
        <el-checkbox v-for="item in roles" :key="item.id" :label="item.id">
          {{ item.name }}
        </el-checkbox>
      </el-checkbox-group>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button type="primary" size="small">确定</el-button>
          <el-button size="small" @click="close">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getRolesApi, assignRoles } from '@/api/role'
import { getOtherInfo } from '@/api/user'
export default {
  data() {
    return {
      checkList: [],
      roles: []
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    // 用户的id 用来查询当前用户的角色信息
    employeesId: {
      type: String,
      default: null
    }
  },
  created() {},

  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    onOpen() {
      this.getRolesList()
      this.getEmployeesRoles()
    },
    // 获取角色列表
    async getRolesList() {
      const { rows } = await getRolesApi()
      this.roles = rows
    },
    // 获取员工角色
    async getEmployeesRoles() {
      const { roleIds } = await getOtherInfo(this.employeesId)
      this.checkList = roleIds
    },
    // 分配角色
    async assignRole () {
      if (!this.checkList.length) return this.$message.error('请选择角色')
      await assignRoles({
        id: this.employeesId,
        roleIds: this.checkList
      })
      this.$message.success('分配成功')
      this.close()
    }
  }
}
</script>

<style scoped></style>
