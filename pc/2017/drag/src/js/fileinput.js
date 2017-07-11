let filesList = $('#filesList').val().split(',') || []
let keys = []
filesList.forEach(function(item) {
  keys.push({ item })
})
$('#file-thumb').fileinput({
    uploadUrl: "http://time.huanqiu.com/admin/upload/content_edit",
    showCaption: false,
    language: 'zh',
    fileType: "any",
    overwriteInitial: false,
    initialPreviewAsData: true,
    initialPreview: filesList,
    initialPreviewConfig: keys
  })
  .on('fileuploaded', function(event, data) {
    console.log(event)
    const {
      code,
      msg,
      imgUrl,
      key
    } = data.jqXHR.responseJSON
    if (code === 200 && msg === 'success') {
      // 放入心的图片
      filesList.push(imgUrl)
      $('#filesList').val(filesList.toString())
      $('#file-thumb').fileinput('refresh', {
        initialPreview: filesList
      })
    }
    return this
  })
  .on('filesorted', function(e, param) {
    return this
  })
$('#file-thumb').on('filepredelete', function(event, key) {
  console.log('Key = ' + key);
})
$('#file-thumb').on('filedeleted', function(e, key) {
  console.log(e)
  console.log(key)
})
