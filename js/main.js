(function($) {

	"use strict";

  	$(".main-menu a").click(function(){
		var id =  $(this).attr('class');
		id = id.split('-');
		$('a.active').removeClass('active');
    	$(this).addClass('active');
		$("#menu-container .content").slideUp('slow');
		$("#menu-container #menu-"+id[1]).slideDown('slow');
		$("#menu-container .homepage").slideUp('slow');
		return false;
	});


	$(".main-menu a.homebutton").click(function(){
		$("#menu-container .content").slideUp('slow');
		$("#menu-container .homepage").slideDown('slow');
		$(".logo-top-margin").animate({marginLeft:'45%'}, "slow");
		$(".logo-top-margin").animate({marginTop:'120px'}, "slow");
        $(document.body).animate({scrollTop : 0},875);
        return false;
	});

	$(".main-menu a.aboutbutton").click(function(){
        $("#menu-container .content").slideUp('slow');
		$("#menu-container .about-section").slideDown('slow');
		$(".logo-top-margin").animate({marginTop:'0'}, "slow");
		$(".logo-top-margin").animate({marginLeft:'0'}, "slow");
        $(document.body).animate({scrollTop : 0},875);
        return false;
	});

	$(".main-menu a.projectbutton").click(function(){
        $("#menu-container .content").slideUp('slow');
		$("#menu-container .gallery-section").slideDown('slow');
        $(".logo-top-margin").animate({marginTop:'0'}, "slow");
		$(".logo-top-margin").animate({marginLeft:'0'}, "slow");
        $(document.body).animate({scrollTop : 0},875);
        return false;
	});

	$(".main-menu a.contactbutton").click(function(){
		$("#menu-container .content").fadeOut();
		$("#menu-container .contact-section").slideDown('slow');
		$(".logo-top-margin").animate({marginTop:'0'}, "slow");
		$(".logo-top-margin").animate({marginLeft:'0'}, "slow");
        $(document.body).animate({scrollTop : 0},875);
        return false;
	});

    $(".main-menu a.articlebutton").click(function(){
        $("#menu-container .content").slideUp('slow');
        $("#menu-container .article-section").slideDown('slow');
        $(".logo-top-margin").animate({marginTop:'0'}, "slow");
        $(".logo-top-margin").animate({marginLeft:'0'}, "slow");
        $(document.body).animate({scrollTop : 0},875);
        return false;
    });

	$('.toggle-menu').click(function(){
        $('.show-menu').stop(true,true).slideToggle();
        return false;
    });

    $('.show-menu a').click(function() {
    	$('.show-menu').fadeOut('slow');
    });

    // $(document).ready(function(){
    //     $("#myArticle").click(function(){
    //         alert("执行了！");
    //         // $("#menu-5").slideUp("slow");
    //         $("#myArticlePanel").slideDown("slow");
    //         $(".logo-top-margin").animate({marginTop:'0'}, "slow");
    //         $(".logo-top-margin").animate({marginLeft:'0'}, "slow");
    //         $(document.body).animate({scrollTop : 250},875);
    //
    //     });
    // });

    $("#backToArticleCatalogue").click(function(){
        $("#myArticlePanel").slideUp("slow");
        // $("#menu-5").slideDown("slow");
        $(".logo-top-margin").animate({marginTop:'0'}, "slow");
        $(".logo-top-margin").animate({marginLeft:'0'}, "slow");

        //导航进度条回到顶部
        $(document.body).animate({scrollTop : 0},875);
    });

    $("#writeNewArticleBT").click(function(){
        $("#myArticlePanel").slideUp("slow");
        $("#menu-5").slideUp("slow");
        $("#writeArticilePanel").slideDown("slow");
        $(".logo-top-margin").animate({marginTop:'0'}, "slow");
        $(".logo-top-margin").animate({marginLeft:'0'}, "slow");

        //导航进度条回到顶部
        $(document.body).animate({scrollTop : 0},875);
    });


    $("#cancelAddArticleBT").click(function(){
        $("#writeArticilePanel").slideUp("slow");
        $("#menu-5").slideDown("slow");
        $(".logo-top-margin").animate({marginTop:'0'}, "slow");
        $(".logo-top-margin").animate({marginLeft:'0'}, "slow");

        //导航进度条回到顶部
        $(document.body).animate({scrollTop : 0},875);
    });

    $("#cancelUpdateArticleBT").click(function(){
        $("#updateArticilePanel").slideUp("slow");
        $("#menu-5").slideDown("slow");
        $(".logo-top-margin").animate({marginTop:'0'}, "slow");
        $(".logo-top-margin").animate({marginLeft:'0'}, "slow");

        //导航进度条回到顶部
        $(document.body).animate({scrollTop : 0},875);
    });

    $("#showPhotosInAlbumBT").click(function(){

        $("#menu-3").slideUp('slow');
        $("#showPhotosInAlbum").slideDown('slow');
        alert(666);
        $(".logo-top-margin").animate({marginTop:'0'}, "slow");
        $(".logo-top-margin").animate({marginLeft:'0'}, "slow");
    });




})(jQuery);