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
        <el-table-column label="照片" align="center">
          <template v-slot="{ row }">
            <el-image class="avatar" :src="row.photo" :preview-src-list="[row.photo]"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名字"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column label="操作" fixed="right" width="400">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="onShowClick(row.id)">查看</el-button>
            <el-button type="info" size="small" @click="onEditClick(row.id)">修改</el-button>
            <el-upload v-model:file-list="petFile" class="upload-demo" style="display: inline-block; margin: 0 16px;"
              :action="`http://43.140.200.245:8001/rchart/update/${row.id}`" :name="row.id" :on-change="handleChange">
              <el-button size="small" @click="handleId(row.id)">更换图片</el-button>
            </el-upload>
            <el-button type="danger" size="small" @click="deleteUser(row)">删除</el-button>
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
import { ElMessageBox, ElMessage, type UploadUserFile, type UploadProps } from 'element-plus';

// 相关数据
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(2)
const router = useRouter()
const petFile = ref<UploadUserFile[]>()
const getId = ref('')


const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  const formData = new FormData()
  formData.append('file', uploadFile.raw as Blob)
  http.post(`pet/uploadImage/${getId.value}`, formData).then((res) => {
    ElMessage.success('图片修改成功')
    getListData()
  }).catch(() => {
    ElMessage.error('图片修改失败')
  })
}

async function getListData() {
  const res = await http.get(`pet/findPage/${page.value}/${size.value}`, { "type": "猫", "sex": 0 })
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

function onShowClick(id: string) {
  router.push(`/pet/info/${id}`)
}


function deleteUser(row: any) {
  ElMessageBox.confirm(
    '确定要删除宠物' + row.name + '吗？',
    {
      type: 'warning'
    }
  ).then(async () => {
    try {
      const res = await http.delete(`pet/delete/${row.id}`)
      ElMessage.success('删除成功')
      getListData()
    } catch (e: any) {
      console.error(e)
    }
  })
}

function handleId(id: string) {
  getId.value = id
}

function handleAddClick() {
  router.push('/pet/import')
}

function onEditClick(id: string) {
  http.get(`pet/find/${id}`).then(() => {
    router.push(`/pet/edit/${id}`)
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
