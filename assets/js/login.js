$(function() {

    //点击切换a链接按钮
    $("#link-l").on("click", function() {
        $(".reg_box").hide()
        $(".login_box").show()
    })
    $("#link-r").on("click", function() {
        $(".reg_box").show()
        $(".login_box").hide()
    })

    //表单验证 lay-verify="required|..."

    //从layUi中回去form对象
    var form = layui.form;
    //从layUi中回去layer对象
    var layer = layui.layer;
    //利用form.verify自定义一个验证规则
    form.verify({
        //自定义密码表单验证
        pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            if ($(".pwd").val() !== value) return "两次密码不一致!"
        }
    })

    $("#reg_form").on("submit", function(e) {
        e.preventDefault();
        var data = {
            username: $(".usn").val(),
            password: $(".pwd").val(),
            repassword: $(".repwd").val()
        };
        //发起post请求
        $.post("/api/reg", data, function(res) {
            console.log(res);
            if (res.code != 0) return layer.msg(res.message);
            layer.msg("注册成功,请登录");
            $("#link-l").click();
        })

    })


    $("#login_form").on("submit", function(e) {
        e.preventDefault();
        console.log(111);
        //发起ajax请求
        $.ajax({
            method: "post",
            url: "/api/login",
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.code !== 0) return layer.msg("登陆失败");
                layer.msg("注册成功");
                localStorage.setItem("token", res.token)
                location.href = '/index.html'
            }
        })

    })


})