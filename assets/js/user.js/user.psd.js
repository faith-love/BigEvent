$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function(value) {
            if (value === $(".oldPwd").val()) {
                return layer.msg("新旧密码一致，请重新输入")
            }
        },
        rePwd: function(value) {
            if (value === $(".newPwd").val()) {
                return layer.msg("两次输入不一致，请重新输入")
            }
        },
    })


    $(".btn_user_psd-xiugai").on("click", function(e) {
        e.preventDefault(),
            $.ajax({
                method: "post",
                url: "/my/updatepwd",
                data: $(this).serialize(),
                success: function(res) {
                    console.log(res);
                    if (res.status !== 0) return layer.msg("密码重置失败，请重新输入")
                    layer.msg("密码重置成功")

                    $(".form_user_psd")[0].reset()
                }
            })
    })
})