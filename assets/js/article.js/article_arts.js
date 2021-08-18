$(function() {
    initArtsDate()
    var layer = layui.layer;
    var form = layui.form;

    function initArtsDate() {
        $.ajax({
            method: "get",
            url: "/my/cate/list",
            success: function(res) {
                console.log(res);
                var htmlStr = template("renderTable", res)
                $(".layui-table tbody").empty().html(htmlStr)
            }
        })
    }

    var addIndex = null
    $(".btn_submit").on("click", function() {
        console.log("ok");
        addIndex = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['400px', '250px'],
            content: $("#dialog_tpl").html()
        });
    })

    $("body").on("submit", "#form_add", function(e) {
        e.preventDefault()
        console.log(111);
        $.ajax({
            method: "post",
            url: "/my/cate/add",
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.code !== 0) return layer.msg("添加作品失败！")
                layer.msg("添加作品成功！")
                initArtsDate()
                layer.close(addIndex);
            }
        })
    })


    //点击修改按钮修改分类信息
    var editIndex = null
    $(".layui-table tbody").on("click", ".btn_edit", function(e) {
        var id = $(this).attr("data-id")
        editIndex = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['400px', '250px'],
            content: $("#edit_tpl").html()
        });
        $.ajax({
            method: "get",
            url: "/my/cate/info?id=" + id,
            success: function(res) {
                console.log(res);
                form.val("form_edit1", res.data)
            }
        })
        $("body").on("submit", "#form_edit", function(e) {
            e.preventDefault()
            $.ajax({
                method: "put",
                url: "/my/cate/info",
                data: $(this).serialize(),
                success: function(res) {
                    console.log(res);
                    if (res.code !== 0) return layer.msg("修改分类失败！")
                    layer.msg("修改分类成功！")
                    initArtsDate()
                    layer.close(editIndex);
                }
            })
        })

    })



    //删除文章分类
    $(".layui-table tbody").on("click", ".btn_delete", function() {
        var id = $(this).attr("data-id")
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: "delete",
                url: "/my/cate/del?id=" + id,
                success: function(res) {
                    if (res.code !== 0) layer.msg("删除数据失败！")
                    layer.msg("删除数据成功！")
                    initArtsDate()
                    layer.close(index);
                }
            })
        });
    })
})