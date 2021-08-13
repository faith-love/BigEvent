$(function() {
    $.ajaxPrefilter(function(options) {
        options.url = 'http://www.liulongbin.top:3008' + options.url;

        //在调用数据时，以/my/开头的需要加上请求头
        if (options.url.indexOf("/my/") !== -1) {
            options.headers = {
                Authorization: localStorage.getItem("token") || ""
            }
        }
        //修补在登录页面直接输入域名访问用户数据 的bug,必须登录才可
        options.complete = function(res) {
            console.log("调用了complete函数，里面有个关键的属性res.responseJSON");
            console.log(res);
            if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
                //1.清除localStorage的
                localStorage.removeItem("token");
                //2.跳转页面
                location.href = '/login.html'
            }

        }
    })



})