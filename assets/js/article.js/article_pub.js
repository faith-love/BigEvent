$(function() {
    var layer = layui.layer;
    var form = layui.form;

    initEditor(); // 初始化富文本编辑器initEditor()3
    getPubList()

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)


    //发起ajax数据请求获取文章分类
    //定义一个方法
    function getPubList() {
        $.ajax({
            method: "get",
            url: "/my/cate/list",
            success: function(res) {
                console.log(res);
                if (res.code !== 0) return layer.msg("获取分类列表失败！")
                var htmlStr = template("tpl_pub_list", res)
                $("#pub_list").empty().html(htmlStr);
                //由于执行顺序问题，数据请求时的下拉选项需要重新渲染
                //调用render这个方法，重新渲染页面
                form.render()
            }
        })
    }




    //为file框绑定选择封面按钮
    $(".btn_choose_Img").on("click", function() {
        $("#file").click();
    })

    $("#file").on("change", function() {
        var files = $(this)[0].files
        if (files.length <= 0) return layer.msg("请选则上传图片！")

        var newImgURL = URL.createObjectURL(files[0])
            // 销毁旧的裁剪区域； 重新设置图片路径；重新初始化裁剪区域
        $image.cropper('destroy').attr('src', newImgURL).cropper(options)
        layer.msg("上传图片成功！")
    })


    var btn_state = "已发布";
    $(".btn_draft").on("click", function() {
        btn_state = "草稿"
    })




    //文章发布提交
    $("#pub_list_submit").on("submit", function(e) {
        e.preventDefault()

        //利用formDate获取全部表单数据
        var fd = new FormData($(this)[0]);
        fd.append("state", btn_state);
        //将裁剪后的图片，输出为文件
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append("cover_img", blob)
                    //发送post数据请求
                $.ajax({
                    method: "post",
                    url: "/my/article/add",
                    data: fd,
                    contentType: false,
                    processData: false,
                    success: function(res) {
                        console.log(res);
                        if (res.code !== 0) return layer.msg("添加文章失败！")
                        layer.msg("添加文章成功！")
                        window.parent.$(".article_list").click()
                    }
                })

            });




    })




})