<template>
  <div class="examine-manage-container">
    <!-- <el-card class="header">
      <div class="header-container">
        <el-row :gutter="20" justify="space-between">
          <el-col :span="10">
          </el-col>
          <el-col :span="10">
            <div>
              <el-button @click="handleAddClick">创建</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card> -->
    <el-card>
      <template #header>
        宠物领养审批
      </template>
      <el-table :data="filterTableData" border style="width: 100%;">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column label="性别">
          <template #default="{ row }">
            {{ row.sex === 0 ? '男' : '女' }}
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="applyTime" label="申请时间"></el-table-column>
        <el-table-column prop="remark" label="申请说明"></el-table-column>
        <el-table-column label="审批" fixed="right">
          <template #default="{ row }">
            <el-button type="danger" size="small" @click="onPass(row)">通过</el-button>
            <el-button type="danger" size="small" @click="onNoPass(row)">不通过</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="page" :page-size="size" :page-sizes="[2, 5, 10, 20]"
        layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import http from '@/utils/request';
import { ElMessageBox, ElMessage } from 'element-plus';

// {
//                 "id": "1547128452442865664",
//                 "name": "张三",
//                 "sex": 1,
//                 "phone": "13201235122",
//                 "address": "中国",
//                 "pid": "001",
//                 "applyTime": "2022-07-13",
//                 "remark": "我想申请领养这只可爱的小猫！",
//                 "state": 2
//             }

// 相关数据
const tableData = ref<{
  [index: string]: string | number
}[]>([])
const total = ref(0)
const page = ref(1)
const size = ref(2)

const filterTableData = computed(() => {
  return tableData.value.filter(item => item.state === 0)
})

async function getListData() {
  const res = await http.get(`sys/findAdoptApply/${page.value}/${size.value}`)
  console.log(res)
  tableData.value = res.data.list
  total.value = res.data.total
}

getListData()

function handleSizeChange(currentSize: number) {
  size.value = currentSize
  getListData()
}

function handleCurrentChange(currentPage: number) {
  page.value = currentPage
  getListData()
}

function onPass(row: any) {
  http.put(`sys/approveAdoptApply/0`, {
    id: row.id,
  }).then(() => {
    ElMessage.success('审批成功')
    getListData()
  }).catch(() => {
    ElMessage.error('审批失败')
  })
}

function onNoPass(row: any) {
  http.put(`sys/approveAdoptApply/1`, {
    id: row.id,
  }).then(() => {
    ElMessage.success('审批成功')
    getListData()
  }).catch(() => {
    ElMessage.error('审批失败')
  })
}

</script>

<style lang="scss" scoped>
.pet-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }

  ::v-deep .avatar {
    width: 150px;
    // height: 100px;
    // border-radius: 50%;
  }

  ::v-deep .el-tag {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
