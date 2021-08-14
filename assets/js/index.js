$(function() {
    // 获取用户基本信息
    getUserInfo()

    //退出登录
    $("#loginOut").on("click", function() {
        console.log(111);
        var layer = layui.layer;
        //弹出退出登录询问框 用layer.confirm
        layer.confirm('确定退出?', { icon: 3, title: '提示' }, function(index) {
            //1.清除localStorage的
            localStorage.removeItem("token");
            //2.跳转页面
            location.href = '/login.html'

            //layui自带的关闭询问框的代码块，无需更改
            layer.close(index);
        });

    })





})


//发送get请求获取用户基本信息（头像，使用记录...等
function getUserInfo() {
    $.ajax({
        method: "get",
        url: "/my/userinfo",
        //请求头headers对象
        // headers: {
        //     Authorization: localStorage.getItem("token") || ""
        // },
        success: function(res) {
            console.log(res);
            if (res.code !== 0) {
                return layui.layer.msg("获取用户数据失败")
            }
            //渲染头像
            renderAvatar(res.data)
        },
        // complete: function(res) {
        //     console.log("调用了complete函数，里面有个关键的属性res.responseJSON");
        //     console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         //1.清除localStorage的
        //         localStorage.removeItem("token");
        //         //2.跳转页面
        //         location.href = '/login.html'
        //     }

        // }
    })
}

//获取得到的后台数据，渲染头像

function renderAvatar(user) {
    //欢迎+用户名
    var name = user.nickname || user.username;
    $(".welcome").html("欢迎" + name);
    //渲染头像
    if (user.user_pic !== null) {
        $(".layui-nav-img").prop("src", user.user_pic).show();
        $(".text-avatar").hide();
    } else {
        var first = name[0].toUpperCase()
        $(".layui-nav-img").hide();
        $(".text-avatar").html(first).show()
    }
}