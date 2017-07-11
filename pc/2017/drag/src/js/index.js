let filesList = $('#filesList').val().split(',') || []
let keys = []
filesList.forEach(function (item) {
  keys.push({ item })
})
$('#file-thumb').fileinput({
  uploadUrl: 'http://time.huanqiu.com/admin/upload/content_edit',
  // uploadUrl: 'http://localhost:3000',
  // uploadAsync: false,
  showCaption: false,
  showUpload: false,
  language: 'zh',
  fileType: 'image',
  overwriteInitial: false,
  initialPreviewAsData: true,
  initialPreview: filesList,
  initialPreviewConfig: keys
})
// 上传功能
.on('fileuploaded', function (event, data, previewId, index) {
  const {
    code,
    msg,
    initialPreview
  } = data.jqXHR.responseJSON
  if (code === 200 && msg === 'success') {
    // 放入心的图片
    filesList.push(initialPreview)
    $('#filesList').val(filesList.toString())
  }
  return this
})
// 排序功能
.on('filesorted', function (e, param) {
  const {
    newIndex,
    oldIndex
  } = param
  let temp = filesList.splice(oldIndex, 1)
  filesList.splice(newIndex, 0, temp)
  $('#filesList').val(filesList.toString())
  return this
})
// 删除功能
$('.file-preview-thumbnails').on('click', '.kv-file-remove', function () {
  const $parent = $(this).parents('.file-preview-frame')
  $parent.remove()
  const imgUrl = $parent.find('.file-preview-image').attr('src')
  filesList.forEach((item, index) => {
    if (item === imgUrl) {
      filesList.splice(index, 1)
      $('#filesList').val(filesList.toString())
    }
  })
  return this
})
