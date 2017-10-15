var vm  = new Vue({
    el:'#container',
    data:{
        username:'',
        email:'',
        password:'',
        phoneNumber:'',
        one_title:'日志标题',
        one_content:'日志内容',
        one_date:'日志发表时间',
        new_title:'',
        new_content:'',

        save_update_title:'',
        save_update_date:'',

        articles:[

        ],

        albums:[

        ],

        photos:[

        ],

    },
    methods:{

        signUp:function () {
            this.$http.post("http://localhost:8080/user", {
                    email: this.email,
                    password: this.password,
                    phoneNumber: this.phoneNumber,
                    signUpDate: "",
                    userID: "",
                    userName: this.username

                }, {
                    headers: {
                        username: encodeURI(this.username)
                    }
                }
            ).then(function (response) {
                if (response.data.errorCode == 0) {
                    alert("注册成功！");
                    $(function () { $('#myModal1').modal('hide')});
                }
            }).catch(function (error) {
                console.log(error);
                alert("添加失败！");
            });

        },

        signIn:function () {
            this.$http.post("http://localhost:8080/user/login", {
                userName: this.username,
                password: this.password,
                email: "",
                phoneNumber: "",
                signUpDate: "",
                userID: ""
                }
            ).then(function (response) {
                if (response.data.errorCode == 0) {
                    alert("登录成功！");
                    document.getElementById("showUser").innerHTML=this.username;
                    $(function () { $('#myModal2').modal('hide')});
                }else if(response.data.errorCode==-1) {
                    alert("用户名不存在！")
                }else if(response.data.errorCode==2) {
                    alert("用户名和密码不匹配，密码输入错误！");
                }
            }).catch(function (error) {
                console.log(error);
                alert("登录失败！");
            });

        },

        getArticleInfoForCatalogue:function () {
            this.$http.get("http://localhost:8080/article/articleInfo")
                .then(function(response){
                    this.articles=response.data.data;
                }).catch(function(error){
                alert("获取日志信息失败，请刷新重试！")
            })
        },

        showArticleContent:function (event) {

            var re = "^\\d\\d\\d\\d-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01]) (00|[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9])$";
            if(event.target.text.match(re)){
                return;
            }

            //传递event对象，获取当前点击的元素对象
            var articleTitle = $.trim(event.target.text);
            var date = $.trim(event.target.nextElementSibling.text);
            this.$http.get("http://localhost:8080/article/articleContent", {
                params: {
                    date: date
                }
            }).then(function (response) {
                this.one_title = articleTitle;
                this.one_content = response.data.data.content;
                this.one_date = date;

                document.getElementById("myArticleContent").innerHTML = this.one_content;

            }).catch(function (error) {
                alert("获取博客失败，请刷新重试！")
            });

            $("#myArticlePanel").slideDown("slow");
            $(".logo-top-margin").animate({marginTop:'0'}, "slow");
            $(".logo-top-margin").animate({marginLeft:'0'}, "slow");

            setTimeout(function () {
                $(document.body).animate({scrollTop : 400},875);
            }, 500);

        },

        saveArticle:function () {

            if(this.new_title=="") {
                alert("请输入日志标题！");
                return;
            }

            var content= CKEDITOR.instances.editor1.getData();
            if(content=="") {
                alert("请输入日志内容！");
                return;
            }
            
            this.$http.post("http://localhost:8080/article/saveArticle", {
                    title:this.new_title,
                    content:content,
                    articleID:'',
                    date:''
                }
            ).then(function (response) {
               if(response.data.errorCode==0) {
                   alert("添加文章成功");
                   this.getArticleInfoForCatalogue();

                   $("#writeArticilePanel").slideUp("slow");
                   $("#menu-5").slideDown("slow");
                   $(document.body).animate({scrollTop : 0},875);

               }else{
                   alert("添加文章失败");
               }
            }).catch(function (error) {
                console.log(error);
                alert("添加文章失败！");
            });

        },

        updateArticle:function () {
            var date = $.trim(event.target.previousElementSibling.text);
            this.save_update_date = date;

            var articleTitle=$.trim(event.target.previousElementSibling.previousElementSibling.text);

            $("#myArticlePanel").slideUp("slow");
            $("#menu-5").slideUp("slow");
            $("#updateArticilePanel").slideDown("slow");

            this.$http.get("http://localhost:8080/article/articleContent", {
                params: {
                    date: date
                }
            }).then(function (response) {
                this.save_update_title = articleTitle;
                this.one_content = response.data.data.content;
                this.save_update_date = date;

                // this.new_title = this.one_title;
                CKEDITOR.instances.editor2.setData(this.one_content);

            }).catch(function (error) {
                alert("获取博客失败，请刷新重试！")
            });

        },

        confirmUpdateArticle:function () {

            var content = CKEDITOR.instances.editor2.getData();

            this.$http.post("http://localhost:8080/article/updateArticle",
                {
                    articleID:'',
                    content:content,
                    date:this.save_update_date,
                    title:this.save_update_title
                }
             ).then(function (response) {
                if(response.data.errorCode==0) {
                    alert("修改文章成功");
                    this.getArticleInfoForCatalogue();

                    $("#updateArticilePanel").slideUp("slow");
                    $("#menu-5").slideUp("slow");
                    $("#menu-5").slideDown("slow");
                    $(document.body).animate({scrollTop : 0},875);

                }else{
                    alert("修改文章失败");
                }
            }).catch(function (error) {
                console.log(error);
                alert("修改文章失败！");
            });


        },

        deleteArticle:function () {
            var deleteDate = $.trim(event.target.previousElementSibling.previousElementSibling.text);
            var deleted_title = $.trim(event.target.previousElementSibling.previousElementSibling.previousElementSibling.text);

            // var deleteDate = document.getElementById("deleteDate").text;
            // alert(deleteDate);
            // return;
            this.$http.get("http://localhost:8080/article/deteleArticle", {
                    params:{
                        date:deleteDate
                    }
                }
            ).then(function (response) {
                if(response.data.errorCode==0) {
                    alert("删除文章成功");
                    this.getArticleInfoForCatalogue();

                    // $(function () { $('#myModal3').modal('hide')});

                    if(this.one_title==deleted_title) {
                        $("#myArticlePanel").slideUp("slow");
                    }

                    $("#menu-5").slideUp("slow");
                    $("#menu-5").slideDown("slow");
                    $(document.body).animate({scrollTop : 0},875);

                }else{
                    alert("删除文章失败");
                    console.log(deleteDate)
                    console.log(response.data)
                }
            }).catch(function (error) {
                console.log(error);
                console.log(deleteDate)
                alert("删除文章失败！");
            });
        },

        getAllAlbums:function () {
            this.$http.get("http://localhost:8080/photo/getAllAlbums")
                .then(function (response) {
                    this.albums = response.data.data;
                    console.log(this.albums)
                }).catch(function (error) {
                alert("获取相册信息失败，请刷新重试！");
            })
        },

    },
});