<template>
  <el-card>
    <template #header>
      图片批量添加
    </template>
    <el-upload v-model:file-list="fileList" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
      <el-icon>
        <Plus />
      </el-icon>
    </el-upload>

    <div style="display: flex; align-items: center; width: 100%; justify-content: center; margin: 40px 0;">
      <ElButton @click="onSubmit">上传</ElButton>
    </div>

    <el-dialog v-model="dialogVisible" v-if="fileList.length <= 5">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'

import type { UploadProps, UploadUserFile } from 'element-plus'
import http from '@/utils/request'
import { ElMessage } from 'element-plus';

const fileList = ref<UploadUserFile[]>([
])


const props = defineProps<{
  id: string
}>()
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

// function initData() {
//   http.get(`pet/find/${props.id}`).then((res) => {
//     const images = res.data.photos.map((item: any) => ({
//       name: item.id,
//       url: item.photo
//     }))
//     fileList.value.push(...images)
//   })
// }
// initData()

function onSubmit() {

  const formData = new FormData()

  console.log(fileList)
  formData.append('file', fileList.value.map((item) => {
    return item.raw as Blob
  }).join(''))

  http.post(`pet/uploadImages/${props.id}`, formData).then((res) => {
    console.log(res)
    ElMessage.success('上传成功')
  })
}
</script>
