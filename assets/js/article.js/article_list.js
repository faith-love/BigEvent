$(function() {
    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;
    var q = {
        pagenum: 1, //页码值，默认第一页
        pagesize: 2, //每页显示几条数据，默认为2条
        cate_id: '',
        state: ''
    }
    initTable()
    initCates()


    //定义时间筛选
    template.defaults.imports.formDate = function(date) {
        const dt = new Date(date)

        var y = padZero(dt.getFullYear())
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())
        return y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss

    }



    //补零函数
    function padZero(date) {
        return date > 10 ? date : "0" + date
    }




    //获取文章列表数据的方法
    function initTable() {
        $.ajax({
            method: "get",
            url: "/my/cate/list",
            data: q,
            success: function(res) {
                if (res.code !== 0) return layer.msg("文章列表获取失败！");
                layer.msg("文章列表获取成功！");
                var htmlSTr = template("tpl_art_list_tb", res);
                $(".layui-table tbody").empty().html(htmlSTr);
                //渲染底部跳转  
                renderPage(res.total)
            }
        })
    }

    //获取文章分类
    function initCates() {
        $.ajax({
            method: "get",
            url: "/my/cate/list",
            success: function(res) {
                if (res.code !== 0) return layer.msg("获取文章分类失败！")
                var htmlSTr = template("tpl_art_list_xl", res)
                $("[name=cate_id]").empty().html(htmlSTr)

                //通过layui.form重新渲染下拉选框的下拉选项
                form.render()
            }
        })
    };


    //筛选文章分类
    $("#layui-form").on("submit", function(e) {
        e.preventDefault()
        var cate_id = $("[name=cate_id]").val();
        var state = $("[name=state]").val()
        q.cate_id = cate_id;
        q.state = state;
        initTable()
    });


    function renderPage(total) {
        laypage.render({
            elem: 'pagebox', //添加分页容器，不用加 # 号

            count: total, //数据总数，从服务端得到
            limit: q.pagesize, //每页显示的条数
            curr: q.pagenum, //设置默认被选中的分页
            jump: function(obj, first) {
                //obj包含了当前分页的所有参数，比如：
                console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                q.pagenum = obj.curr;
                q.pagesize = obj.limit;
                if (!first) {
                    //do something
                    initTable()
                }


            },
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10]
        });
    }



    //删除按钮删除对应的数据
    $("tbody").on("click", ".btn_delete", function() {
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function(index) {
            //do something 
            $.ajax({
                method: "post",
                url: "" + id,
                success: function(res) {
                    if (res.code !== 0) return layer.msg("删除分类失败!")
                    layer.msg("删除分类成功!")
                    var btn_delete = $(".btn_delete")
                    if (btn_delete.length === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1;
                        initCates()
                    }
                }
            })
            layer.close(index);
        });
    })


})