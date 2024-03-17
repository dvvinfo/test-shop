<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useStore } from '@/stores/index'
const store = useStore()

interface RuleForm {
  userId: number
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const FormData = reactive<RuleForm>({
  userId: null as unknown as number
})
const balance = ref(null)

const rules = reactive<FormRules<RuleForm>>({
  userId: [{ required: true, message: 'Пожайлуста, введите id', trigger: 'blur' }]
})

onMounted(() => {})
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      store.fetchUser(FormData.userId)

      resetForm(formEl)
    } else {
      console.log('error submit!', fields)
    }
  })
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
const submitFormBalance = async () => {
  if (balance.value) {
    store.fetchBalance(balance.value)
    balance.value = null
  }
}
</script>

<template>
  <div class="wrapper">
    <el-form
      ref="ruleFormRef"
      style="width: 100%"
      :model="FormData"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
      @submit.prevent="submitForm(ruleFormRef)"
    >
      <el-form-item label="" prop="id">
        <el-input v-model="FormData.userId" placeholder="enter the user's id" />
      </el-form-item>
    </el-form>
    <div class=" ">
      <el-skeleton :rows="5" animated v-if="store.getLoading" />
      <div class="" v-if="store.getUser">
        <el-row>
          <el-col :span="24">
            <el-card style="max-width: 600px" class="card">
              <template #header>
                <div class="card-header">
                  <div class="card-img">
                    <el-avatar :size="80" class="card-avatar">
                      <img :src="store.getUser.avatar" />
                    </el-avatar>
                  </div>
                </div>
              </template>
              <div class="card-body">
                <h3 class="card-name">{{ store.getUser.name }}</h3>
                <p>
                  balance: <strong>{{ store.getUser.balance }}$</strong>
                </p>
              </div>
              <form @submit.prevent="submitFormBalance" class="form">
                <el-input v-model.number.trim="balance" placeholder="enter the balance" />
              </form>
              <template #footer>{{ store.getUser.role }}</template>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.wrapper {
  max-width: 600px;
  margin: 0 auto;
}
.card-img {
  display: flex;
  justify-content: center;
}
.card-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.card-name {
  margin: 0;
}
.form{
  margin-top: 10px;
}
</style>
