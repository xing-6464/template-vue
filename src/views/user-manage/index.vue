<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-input></el-input>
      </div>
    </el-card>
    <el-card>
      <el-table :data="tableData" border style="width: 100%;">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="头像" align="center">
          <template v-slot="{ row }">
            <el-image class="avatar" :src="row.photo" :preview-src-list="[row.photo]"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="birthDate" label="生日"></el-table-column>
        <el-table-column label="角色">
          <template #default="{ row }">
            <div>
              <el-tag>{{ getTag(row.role) }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="200">
          <template #default>
            <el-button type="primary" size="small">查看</el-button>
            <el-button type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="page" :page-size="size" :page-sizes="[2, 5, 10, 20]" layout="total, sizes, prev, next, jumper"
        :total="total"></el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import http from '@/utils/request';

// 相关数据
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(2)

// 获取数据方法
async function getListData() {
  const res = await http.get(`user/findPage/${page.value}/${size.value}`)
  console.log(res)
  tableData.value = res.data.list
  total.value = res.data.total
}

function getTag(role: string) {
  return role === 'admin' ? '管理员' : role === 'user' ? '普通用户' : '志愿者'
}

function handleSizeChange() {

}

function handleCurrentChange() {

}
getListData()
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }

  ::v-deep .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
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
