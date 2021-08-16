$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samepwd: function(value) {
            if (value === $(".oldpwd").val()) {
                return layer.msg("新旧密码一致，请重新输入")
            }
        },
        repwd: function(value) {
            if (value !== $(".newpwd").val()) {
                return layer.msg("两次输入不一致，请重新输入")
            }
        },
    })


    $("#form_user_psd").on("submit", function(e) {
        e.preventDefault(),
            $.ajax({
                method: "patch",
                url: "/my/updatepwd",
                data: $(this).serialize(),
                success: function(res) {
                    console.log(res);
                    if (res.code !== 0) return layer.msg("密码重置失败，请重新输入")
                    layer.msg("密码重置成功")
                    $("#form_user_psd")[0].reset()
                }
            })
    })
})