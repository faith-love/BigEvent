$(function() {
    var layer = layui.layer

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
            // 纵横比
            aspectRatio: 1,
            // 指定预览区域
            preview: '.img-preview'
        }
        // 1.3 创建裁剪区域
    $image.cropper(options)


    //模拟点击file事件
    $(".btn_file").on("click", function() {
        $("#file").click();
    })

    //更换头像的设置change事件
    $("#file").on("change", function(e) {
        var fileList = e.target.files
        if (fileList.length <= 0) {
            return layer.msg("请选择图片!");
        }
        layer.msg("图片上传成功!");

        var file = fileList[0];
        var newImgUrl = URL.createObjectURL(file)

        $image.cropper('destroy').attr('src', newImgUrl).cropper(options)
    })

    // 为确定按钮，绑定点击事件
    $('.btn_decide').on('click', function() {
        // 1. 要拿到用户裁剪之后的头像
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
            // 2. 调用接口，把头像上传到服务器
        $.ajax({
            method: 'patch',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                console.log(res);
                if (res.code !== 0) {
                    return layer.msg('更换头像失败！')
                }
                layer.msg('更换头像成功！')
                window.parent.getUserInfo()
            }
        })
    })
})