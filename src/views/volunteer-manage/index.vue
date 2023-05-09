<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div class="header-container">
        <el-row :gutter="20" justify="space-between">
          <el-col :span="10">
            <!-- <el-input placeholder="请输入查询id">
            </el-input> -->
          </el-col>
          <el-col :span="10">
            <div>
              <el-button @click="handleAddClick">创建</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-card>
      <el-table :data="tableData" border style="width: 100%;">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="活动名称" prop="activityName">
        </el-table-column>
        <el-table-column prop="activityTime" label="活动时间"></el-table-column>
        <el-table-column prop="address" label="活动地址"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
        <el-table-column prop="remark" label="活动说明"></el-table-column>
        <el-table-column label="操作" fixed="right">
          <template #default="{ row }">
            <el-button type="info" size="small" @click="onEditClick(row.id)">修改</el-button>
            <el-button type="danger" size="small" @click="onDelete(row)">删除</el-button>
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
import { ref } from 'vue'
import http from '@/utils/request';
import { useRouter } from 'vue-router';
import { ElMessageBox, ElMessage } from 'element-plus';

// 相关数据
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(2)
const router = useRouter()
const selectInit = ref(
  {
    "activityName": "活动1",
    "activityTime": "2023-05-03"
  }
)

async function getListData() {
  const res = await http.get(`activity/findPage/${page.value}/${size.value}`, selectInit.value)
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

function onDelete(row: any) {
  ElMessageBox.confirm(
    '确定要删除活动' + row.activityName + '吗？',
    {
      type: 'warning'
    }
  ).then(async () => {
    try {
      const res = await http.delete(`activity/delete/${row.id}`)
      ElMessage.success('删除成功')
      getListData()
    } catch (e: any) {
      console.error(e)
    }
  })
}

function handleAddClick() {
  router.push('/volunteer/import')
}

function onEditClick(id: string) {
  http.get(`activity/find/${id}`).then(() => {
    router.push(`/volunteer/edit/${id}`)
  })
}
</script>

<style lang="scss" scoped>
.user-manage-container {
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
