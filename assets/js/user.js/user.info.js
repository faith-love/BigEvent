$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function(value) { //value：表单的值、item：表单的DOM对象
            if (value.length > 6) {
                return layer.msg('昵称长度必须在1-6个字符之间');
            }
        }
    })
    getUserInfo()

    $("#btn_reset").on("click", function(e) {
        e.preventDefault();

        getUserInfo();
    })


    //初始化表单数据userinfo的初始化数据
    function getUserInfo() {
        $.ajax({
            method: "get",
            url: "/my/userinfo",
            success: function(res) {
                if (res.code !== 0) {
                    return layer.msg(res.message)
                }
                console.log(res);
                //给表单赋值
                form.val("form", res.data)
            }
        })
    }

    // 监听表单的提交事件
    $('#user_info_tj').on('submit', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
            // 发起 ajax 数据请求
        $.ajax({
            method: 'PUT',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.code !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                    // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        })
    })
})