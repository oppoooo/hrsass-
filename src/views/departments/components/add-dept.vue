<template>
  <div>
    <template>
      <el-dialog :title="dialog" :visible="visible" width="50%">
        <el-form
          v-loading="loading"
          :model="formData"
          :rules="formRules"
          ref="form"
          label-width="100px"
        >
          <el-form-item label="部门名称" prop="name">
            <el-input
              v-model="formData.name"
              placeholder="输入部门名称"
            ></el-input>
          </el-form-item>

          <el-form-item label="部门编码" prop="code">
            <el-input
              v-model="formData.code"
              placeholder="输入部门编码"
            ></el-input>
          </el-form-item>

          <el-form-item label="部门负责人" prop="manager">
            <el-select
              v-model="formData.manager"
              style="width: 100%"
              placeholder="请选择部门负责人"
            >
              <el-option
                v-for="item in employees"
                :key="item.id"
                :label="item.username"
                :value="item.username"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="部门介绍" prop="introduce">
            <el-input
              v-model="formData.introduce"
              type="textarea"
              placeholder="输入部门介绍"
            ></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="onClose">取 消</el-button>
          <el-button @click="onSave" type="primary">确 定</el-button>
        </span>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import {
  getDeptsApi,
  addDeptsApi,
  getDeptByIdApi,
  editDeptsApi,
} from '@/api/departments'
import { getEmployeesApi } from '@/api/employees'
export default {
  data() {
    const checkDeptName = async (rule, value, callback) => {
      if (this.formData.id) {
        // 编辑
        const { depts } = await getDeptsApi()
        const filtersDepts = depts.filter(
          (item) =>
            item.pid === this.formData.pid && item.id !== this.formData.id,
        )
        const isRepeat = filtersDepts.some((item) => item.name === value)
        isRepeat ? callback(new Error('部门重复')) : callback()
      } else {
        if (!this.currentNode.children) return callback()
        // 判断value 是否和添加统计部门重复
        const isRepeat = this.currentNode.children.some(
          (item) => item.name === value,
        )
        // 如果重复了callback(new Error('部门重复'))
        // 没重复callback()
        isRepeat ? callback(new Error('部门重复')) : callback()
      }
    }
    // 部门编码是否重复
    const checkDeptCode = async (rule, value, cb) => {
      const { depts } = await getDeptsApi()
      let isRepeat
      if (this.formData.id) {
        isRepeat = depts
          .filter((item) => item.id !== this.formData.id)
          .some((item) => item.code === value)
      } else {
        isRepeat = depts.some((item) => item.code === value)
      }
      isRepeat ? cb(new Error('部门重复')) : cb()
    }
    return {
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: '',
      },
      formRules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          {
            validator: checkDeptName,
            trigger: 'blur',
          },
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          {
            validator: checkDeptCode,
            trigger: 'blur',
          },
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'change' },
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          {
            trigger: 'blur',
            min: 1,
            max: 300,
            message: '部门介绍要求1-50个字符',
          },
        ],
      },
      employees: [],
      loading: false,
    }
  },
  computed: {
    dialog() {
      return this.formData.id ? '编辑部门' : '添加部门'
    },
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    currentNode: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.getEmployeesApi()
  },
  // 部门负责人
  methods: {
    async getEmployeesApi() {
      const res = await getEmployeesApi()
      this.employees = res
    },
    onClose() {
      this.$emit('update:visible', false)
      this.$refs.form.resetFields()
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: '',
      }
    },
    // 点击添加确定
    async onSave() {
      await this.$refs.form.validate()
      try {
        if (this.formData.id) {
          // 编辑
          this.loading = true
          await editDeptsApi(this.formData)
          this.$message.success('编辑成功')
          this.onClose()
          this.$emit('add-dept')
          console.log('编辑')
          this.loading = false
        } else {
          this.formData.pid = this.currentNode.id
          console.log(this.formData)

          await addDeptsApi(this.formData)
          this.$emit('add-dept')
          this.onClose()
          this.$message.success('新增部门成功')
        }
      } catch (error) {
        this.$message.error('新增部门失败')
      }
    },
    async getDeptById(id) {
      this.formData = await getDeptByIdApi(id)
    },
  },
}
</script>

<style scoped></style>
