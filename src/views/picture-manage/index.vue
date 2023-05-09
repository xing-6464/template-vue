<template>
  <div class="picture-manage-container">
    <el-card class="header">
      <div class="header-container">
        <el-row :gutter="20" justify="space-between">
          <el-col :span="10">
            <!-- <el-input placeholder="请输入查询id">
            </el-input> -->
          </el-col>
          <el-col :span="10">
            <el-upload v-model:file-list="fileList" class="upload-demo"
              action="http://43.140.200.245:8001/rchart/insert/image2" name="file" :on-change="handleChange">
              <el-button type="primary">上传轮播图</el-button>
            </el-upload>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-card>
      <el-table :data="tableData" border style="width: 100%;">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="照片" align="center">
          <template v-slot="{ row }">
            <el-image class="image" :src="row.url" :preview-src-list="[row.photo]"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column label="操作" fixed="right">
          <template #default="{ row }">
            <el-upload v-model:file-list="putFile" class="upload-demo" style="display: inline-block; margin-right: 16px;"
              :action="`http://43.140.200.245:8001/rchart/update/${row.id}`" :name="row.id" :on-change="handleChanges">
              <el-button type="primary" size="small" @click="handleId(row.id)">修改轮播图</el-button>
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
import { ElMessageBox, ElMessage, type UploadFile } from 'element-plus';
import type { UploadProps, UploadUserFile } from 'element-plus'


// 相关数据
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(2)
const router = useRouter()
const selectInit = ref(
  {
    "name": "image1"
  }
)
const fileList = ref<UploadUserFile[]>([])
const putFile = ref<UploadUserFile[]>([])
const Pid = ref('')

async function getListData() {
  const res = await http.get(`rchart/findPage/${page.value}/${size.value}`, selectInit.value)
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

function deleteUser(row: any) {
  ElMessageBox.confirm(
    '确定要删除轮播图' + row.name + '吗？',
    {
      type: 'warning'
    }
  ).then(async () => {
    try {
      const res = await http.delete(`rchart/delete/${row.id}`)
      ElMessage.success('删除成功')
      getListData()
    } catch (e: any) {
      console.error(e)
    }
  })
}

const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  fileList.value = fileList.value.slice(-1)
  const formData = new FormData()
  formData.append('file', uploadFile.raw as Blob)

  http.post('rchart/insert/image2', formData).then(res => {
    console.log(res)
    ElMessage.success('轮播图添加成功')
    getListData()
  }).catch(e => {
    ElMessage.error('轮播图添加失败')
  })
}

function handleId(id: string) {
  Pid.value = id
}

const handleChanges: UploadProps['onChange'] = (uploadFile: UploadFile, uploadFiles) => {
  const formData = new FormData()
  formData.append('file', uploadFile.raw as Blob)
  http.put(`rchart/update/${Pid.value}`, formData).then((res) => {
    ElMessage.success('轮播图修改成功')
    getListData()
  }).catch(() => {
    ElMessage.error('轮播图修改失败')
  })
}

</script>

<style lang="scss" scoped>
.image {
  height: 120px;
}

.picture-manage-container {
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
