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

        articles:[

        ]

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
                console.log(response.body)
                this.one_title = articleTitle;
                this.one_content = response.data.data.content;
                this.one_date = date;

                document.getElementById("myArticleContent").innerHTML = this.one_content;

            }).catch(function (error) {
                alert("获取博客失败，请刷新重试！")
            });

            $("#myArticlePanel").slideUp("slow");
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
            alert(date);
        },

        deleteArticle:function () {
            var date = $.trim(event.target.previousElementSibling.previousElementSibling.text);
            this.$http.delete("http://localhost:8080/article/deteleArticle", {
                    body:{date:date}
                }
            ).then(function (response) {
                if(response.data.errorCode==0) {
                    alert("删除文章成功");
                    this.getArticleInfoForCatalogue();

                    $("#menu-5").slideUp("slow");
                    $("#menu-5").slideDown("slow");
                    $(document.body).animate({scrollTop : 0},875);

                }else{
                    alert("删除文章失败");
                    console.log(date)
                    console.log(response.data)
                }
            }).catch(function (error) {
                console.log(error);
                console.log(date)
                alert("删除文章失败！");
            });
        }

    },
});