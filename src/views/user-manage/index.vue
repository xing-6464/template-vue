<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div class="header-container">
        <el-row :gutter="20" justify="space-between">
          <el-col :span="6">
            <!-- <el-input placeholder="请输入查询id">
              <template #append>
                <el-button icon="Search" />
              </template>
            </el-input> -->
          </el-col>
          <el-col :span="16">
            <div>
              <el-button @click="handleAddClick">添加</el-button>
            </div>
          </el-col>
        </el-row>
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
        <el-table-column label="操作" fixed="right" width="360">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="onShowClick(row.id)">查看</el-button>
            <el-button v-if="row.role !== 'admin'" type="info" size="small" @click="onEditClick(row.id)">修改</el-button>
            <el-upload v-model:file-list="avatarFile" class="upload-demo" style="display: inline-block; margin: 0 16px;"
              :action="`http://43.140.200.245:8001/rchart/update/${row.id}`" :name="row.id" :on-change="handleChange">
              <el-button size="small" @click="handleId(row.id)">上传头像播图</el-button>
            </el-upload>
            <el-button v-if="row.role !== 'admin'" type="danger" size="small" @click="deleteUser(row)">删除</el-button>
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
import { ElMessageBox, ElMessage, type UploadProps, type UploadUserFile } from 'element-plus';

// 相关数据
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(2)
const router = useRouter()
const avatarFile = ref<UploadUserFile[]>()
const getId = ref('')


const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  const formData = new FormData()
  formData.append('file', uploadFile.raw as Blob)
  http.post(`sys/user/upload/${getId.value}`, formData).then((res) => {
    ElMessage.success('头像修改成功')
    getListData()
  }).catch(() => {
    ElMessage.error('头像修改失败')
  })
}


function handleId(id: string) {
  getId.value = id
}

// 获取数据方法
async function getListData() {
  const res = await http.get(`sys/user/findPage/${page.value}/${size.value}`)
  tableData.value = res.data.list
  total.value = res.data.total
}

function getTag(role: string) {
  return role === 'admin' ? '管理员' : role === 'user' ? '普通用户' : '志愿者'
}

function handleSizeChange(currentSize: number) {
  size.value = currentSize
  getListData()
}

function handleCurrentChange(currentPage: number) {
  page.value = currentPage
  getListData()
}

function onShowClick(id: string) {
  router.push(`/user/info/${id}`)
}

function deleteUser(row: any) {
  ElMessageBox.confirm(
    '确定要删除用户' + row.username + '吗？',
    {
      type: 'warning'
    }
  ).then(async () => {
    try {
      const res = await http.delete(`sys/user/delete/${row.id}`)
      ElMessage.success('删除成功')
      getListData()
    } catch (e: any) {
      console.error(e)
    }
    // if (res.success) {
    // }
  })
}

function onEditClick(id: string) {
  http.get(`sys/user/find/${id}`).then(() => {
    router.push(`/user/edit/${id}`)
  })
}

// 添加
function handleAddClick() {
  router.push('/user/import')
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
