
$(function Layout() {
    function pinSidenav() {
        $('.sidenav-toggler').addClass('active');
        $('.sidenav-toggler').data('action', 'sidenav-unpin');
        $('body').removeClass('g-sidenav-hidden').addClass('g-sidenav-show g-sidenav-pinned');
        $('body').append('<div class="backdrop d-xl-none" data-action="sidenav-unpin" data-target='+$('#sidenav-main').data('target')+' />');
		
    }
    function unpinSidenav() {
        $('.sidenav-toggler').removeClass('active');
        $('.sidenav-toggler').data('action', 'sidenav-pin');
        $('body').removeClass('g-sidenav-pinned').addClass('g-sidenav-hidden');
        $('body').find('.backdrop').remove();

    }
    if($(window).width() > 1200) {
         if($('.sidenav-toggler').hasClass('active') != true){
            pinSidenav()
        }
    }

    $("body").on("click", "[data-action]", function(e) {
        e.preventDefault();
        var $this = $(this);
        var action = $this.data('action');
        var target = $this.data('target');
        switch (action) {
            case 'sidenav-pin':
                pinSidenav();
            break;

            case 'sidenav-unpin':
                unpinSidenav();
            break;

            case 'search-show':
                target = $this.data('target');
                $('body').removeClass('g-navbar-search-show').addClass('g-navbar-search-showing');

                setTimeout(function() {
                    $('body').removeClass('g-navbar-search-showing').addClass('g-navbar-search-show');
                }, 150);

                setTimeout(function() {
                    $('body').addClass('g-navbar-search-shown');
                }, 300)
            break;

            case 'search-close':
                target = $this.data('target');
                $('body').removeClass('g-navbar-search-shown');

                setTimeout(function() {
                    $('body').removeClass('g-navbar-search-show').addClass('g-navbar-search-hiding');
                }, 150);

                setTimeout(function() {
                    $('body').removeClass('g-navbar-search-hiding').addClass('g-navbar-search-hidden');
                }, 300);

                setTimeout(function() {
                    $('body').removeClass('g-navbar-search-hidden');
                }, 500);
            break;
        }
    })

    $('.sidenav').on('mouseenter', function() {
        if(! $('body').hasClass('g-sidenav-pinned')) {
            $('body').removeClass('g-sidenav-hide').removeClass('g-sidenav-hidden').addClass('g-sidenav-show');
        }
    })

    $('.sidenav').on('mouseleave', function() {
        if(! $('body').hasClass('g-sidenav-pinned')) {
            $('body').removeClass('g-sidenav-show').addClass('g-sidenav-hide');

            setTimeout(function() {
                $('body').removeClass('g-sidenav-hide').addClass('g-sidenav-hidden');
            }, 300);
        }
    })

    $(window).on('load resize', function() {
        if($('body').height() < 800) {
            $('body').css('min-height', '100vh');
            $('#footer-main').addClass('footer-auto-bottom')
        }
    })

});
if($('.headroom')[0]) {
    var headroom  = new Headroom(document.querySelector("#navbar-main"), {
        offset: 300,
        tolerance : {
            up : 30,
            down : 30
        },
    });
    headroom.init();
}
$('.navbar-nav').find('li > a', 'li > ul > li > a').each(function () {
  if (this.href == document.location.href || document.location.href.search(this.href) >= 0) {
      if ($(this).closest('div.collapse').closest('li.nav-item').children('a.has-dropdown').find('aria-controls') !== 'navbar-dashboards') {
           $('a.has-dropdown1').removeClass('active').attr("aria-expanded", !1);
           $("a.has-dropdown1").parent('li').find('div.collapse').removeClass('show').find('a.nav-link').removeClass('active');
      }
      $(this).closest('div.collapse').closest('li.nav-item').children('a.has-dropdown').addClass('active').attr("aria-expanded", !0);
      $(this).closest('div.collapse').addClass('show');
      $(this).addClass('active'); 
     
  }
});

$(function Navbar() {
	var $nav = $('.navbar-nav, .navbar-nav .nav');
	var $collapse = $('.navbar .collapse');
	var $dropdown = $('.navbar .dropdown');
	function accordion($this) {
		$this.closest($nav).find($collapse).not($this).collapse('hide');
	}

    function closeDropdown($this) {
        var $dropdownMenu = $this.find('.dropdown-menu');

        $dropdownMenu.addClass('close');

    	setTimeout(function() {
    		$dropdownMenu.removeClass('close');
    	}, 200);
	}
	$collapse.on({
		'show.bs.collapse': function() {
			accordion($(this));
		}
	})
	$dropdown.on({
		'hide.bs.dropdown': function() {
			closeDropdown($(this));
		}
	})

});
$(function NavbarCollapse() {
	var $nav = $('.navbar-nav'),
		$collapse = $('.navbar .navbar-custom-collapse');
		
	function hideNavbarCollapse($this) {
		$this.addClass('collapsing-out');
	}

	function hiddenNavbarCollapse($this) {
		$this.removeClass('collapsing-out');
	}
	if ($collapse.length) {
		$collapse.on({
			'hide.bs.collapse': function() {
				hideNavbarCollapse($collapse);
			}
		})
		$collapse.on({
			'hidden.bs.collapse': function() {
				hiddenNavbarCollapse($collapse);
			}
		})
	}

});

$(function ScrollTo() {
	var $scrollTo = $('.scroll-me, [data-scroll-to], .toc-entry a');
	function scrollTo($this) {
		var $el = $this.attr('href');
        var offset = $this.data('scroll-to-offset') ? $this.data('scroll-to-offset') : 0;
		var options = {
			scrollTop: $($el).offset().top - offset
		};

        $('html, body').stop(true, true).animate(options, 600);

        event.preventDefault();
	}
	if ($scrollTo.length) {
		$scrollTo.on('click', function(event) {
			scrollTo($(this));
		});
	}

});

$(function Checklist() {
	var $list = $('[data-toggle="checklist"]')
	function init($this) {
		var $checkboxes = $this.find('.checklist-entry input[type="checkbox"]');
		$checkboxes.each(function() {
			checkEntry($(this));
		});

	}
	function checkEntry($checkbox) {
		if($checkbox.is(':checked')) {
			$checkbox.closest('.checklist-item').addClass('checklist-item-checked');
		} else {
			$checkbox.closest('.checklist-item').removeClass('checklist-item-checked');
		}
	}
	if ($list.length) {
		$list.each(function() {
			init($(this));
		});

		$list.find('input[type="checkbox"]').on('change', function() {
			checkEntry($(this));
		});
	}

});
$(function FormControl() {
	var $input = $('.form-control');
	function init($this) {
		$this.on('focus blur', function(e) {
        $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus'));
    }).trigger('blur');
	}
	if ($input.length) {
		init($input);
	}

});
$(function Scrollbar() {
	var $scrollbar = $('.scrollbar-inner');
	function init() {
		$scrollbar.scrollbar().scrollLock()
	}
	if ($scrollbar.length) {
		init();
	}

});

$(function SortList() {
	var $lists = $('[data-toggle="list"]');
	var $listsSort = $('[data-sort]');
	function init($list) {
		new List($list.get(0), getOptions($list));
	}
	function getOptions($list) {
		var options = {
			valueNames: $list.data('list-values'),
			listClass: $list.data('list-class') ? $list.data('list-class') : 'list'
		}
		return options;
	}
	
	if ($lists.length) {
		$lists.each(function() {
			init($(this));
		});
	}

	$listsSort.on('click', function() {
		return;
	});

});

$(function Notify() {
	var $notifyBtn = $('[data-toggle="notify"]');
	function notify(placement, align, icon, type, animIn, animOut) {
		$.notify({
			icon: icon,
			title: ' Bootstrap Notify',
			message: 'Turning standard Bootstrap alerts into awesome notifications',
			url: ''
		}, {
			element: 'body',
			type: type,
			allow_dismiss: true,
			placement: {
				from: placement,
				align: align
			},
			offset: {
				x: 15,
				y: 15
			},
			spacing: 10,
			z_index: 1080,
			delay: 2500,
			timer: 25000,
			url_target: '_blank',
			mouse_over: false,
			animate: {
                enter: animIn,
                exit: animOut
			},
			template: '<div data-notify="container" class="alert alert-dismissible alert-{0} alert-notify" role="alert">' +
				'<span class="alert-icon" data-notify="icon"></span> ' +
                '<div class="alert-text"</div> ' +
				'<span class="alert-title" data-notify="title">{1}</span> ' +
				'<span data-notify="message">{2}</span>' +
                '</div>' +
                '<button type="button" class="close" data-notify="dismiss" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
				'</div>'
		});
	}
	if ($notifyBtn.length) {
		$notifyBtn.on('click', function(e) {
			e.preventDefault();

			var placement = $(this).attr('data-placement');
			var align = $(this).attr('data-align');
			var icon = $(this).attr('data-icon');
			var type = $(this).attr('data-type');
			var animIn = $(this).attr('data-animation-in');
			var animOut = $(this).attr('data-animation-out');

			notify(placement, align, icon, type, animIn, animOut);
		});
	}

});

$(function Tags() {
	var $tags = $('[data-toggle="tags"]');
	function init($this) {
		var options = {
			tagClass: 'badge badge-primary'
		};
		$this.tagsinput(options);
	}
	if ($tags.length) {
		$tags.each(function() {
			init($(this));
		});
	}

});
$.fn.modal.Constructor.prototype._enforceFocus = function() {};
$(".copy-text").click(function () {
	  var clipboard = new ClipboardJS(".copy-text");
 clipboard.on("success",function (e) {
 　　swal('复制成功','粘帖到订阅地址栏即可更新～～','success');
	 e.clearSelection();    
 });
 clipboard.on("error",function (e) {
 　　swal('复制成功','部分手机请长按复制 ～～','success');
 });

});
var checkedmsgGE = '<button type="button" class="btn btn-outline-default disabled" >您今日已签到</button>';
$(document).ready(function () {
	$("#checkin").click(function () {
		$.ajax({
			type: "POST",
			url: "/user/checkin",
			dataType: "json",
			success: function (data) {
				if (data.ret) {
					$("#checkin-msg").html(data.msg);
					document.getElementById("checkin").className='btn btn-outline-default disabled';
					document.getElementById("checkin").innerText='您今日已签到';
					swal({
                          title: "签到成功！", 
                          text: data.msg, 
                          type:"success"
                        });

				} else {
					swal('Oops...',data.msg,'warning');
				}
			},
			error: function (jqXHR) {
				swal('Oops...','发生错误：'+jqXHR.status,'error');
			}
		});
	});
});
$(document).ready(function () {
    $("#kill").click(function () {
        $.ajax({
            type: "POST",
            url: "kill",
            dataType: "json",
            data: {
                passwd: $('#passwd').val()
            },
            success: function (data) {
                if (data.ret) {
                    $("#result").modal();
                    $('#msg').html(data.msg);
                    window.setTimeout("location.href='/'", 2000);
                } else {
                    $("#result").modal();
                    $('#msg').html(data.msg);
                }
            },
            error: function (jqXHR) {
                $("#result").modal();
                $("#msg").html("发生错误了: " + jqXHR.status);
            }
        });
    });
});
$('#change_class').click(function () {
	$.ajax({
	type: "POST",
	url: "invite/change_class",
	dataType: "json",
	data: {
		ref_class: $("#ref_class").val()
	},
	success: data => {
		if (data.ret) {
			swal({
				title: data.msg,
				type:"success"
				});
			} else {
				swal({
				title: data.msg,
				type:"error"
				});
			}
			window.setTimeout("location.href=window.location.href", 1500);
			},
		error: function (jqXHR) {
			$("#result").modal();
			$("#msg").html("发生错误了: " + jqXHR.status);
		}
	});

});

$(document).ready(function () {
    var e = document.querySelector("#tx_image");
	$('#tx_image').click(function () {
		e.addEventListener('change', function() {
			if (null != e.files && null != e.files[0]) {
			   $('#up_result').html(e.files[0]['name']);
				var formData = new FormData();
				formData.append('avatar', e.files[0]);
				console.log(formData.get('avatar'));
				$.ajax({
					url: 'upload/invite',
					type: 'POST',
					data: formData,
					dataType: 'json',
					cache: false,
					traditional: true,
					contentType: false,
					processData: false,
					success: function(res) {
						if (res.ret == 0) {
							$('#result').modal();
							$('#msg').html(res.msg);
							return;
						}
						console.log(res);
						document.getElementById('up_re').innerHTML = '<div class="bg-secondary"><input id="up_res" type="text" class="form-control" disabled required></div>';
						document.getElementById('up_res').value = res;
					}
				});
			}
		});
	});
});

function valiEmail(value){
  var pattern = /^[A-Za-z0-9\u4e00-\u9fa5+@\.\_\-]+$/gi;
	if (pattern.test(value)) {
    return true; 
  }else{
    return false;
  }
}   
$("#ref_acc_update").click(function () {
	if(!valiEmail($("#ref_acc").val())) {
  　　　swal('Oops...', "账号不合法,请检查后输入",'error');
            return false;
    }
    if($("#ref_acc").val()==null){
        swal('Oops...', "账号不能为空！",'error');
           return;
    }
	if($("#up_res").val()==null){
        swal('Oops...', "请先上传你的收款二维码",'error');
           return;
    }
    $.ajax({
        type: "POST",
        url: "invite/ref_acc",
        dataType: "json",
        data: {
            ref_accid: $("#dist_accid").val(),
			ref_acc: $("#ref_acc").val(),
			tx_image: $("#up_res").val()
		},
        success: data => {
            if (data.ret) {
                swal({
                       title: data.msg,
                       type:"success"
                       });
                } else {
                    swal({
                       title: data.msg,
                       type:"error"
                       });
                   }
				window.setTimeout("location.href=window.location.href", 1500);
                },
            error: function (jqXHR) {
			    $("#result").modal();
				$("#msg").html("发生错误了: " + jqXHR.status);
            }
    });

});

function validateRefmoney(value){
  var pattern = /^(0|[1-9][0-9]*)$/;
if (pattern.test(value)) {
    return true; 
  }else{
    return false;
  }
}   

$("#aff_check_in").click(function () {
	if(!validateRefmoney($("#check_in_val").val())) {
  　　　swal('Oops...', "金额输入不合法,请检查后输入",'error');
            return false;
    }
    if($("#check_in_val").val()==null || $("#check_in_val").val()=='0'){
        swal('Oops...', "金额输入不合法！",'error');
           return;
    }
    $.ajax({
        type: "POST",
        url: "invite/ref_money",
        dataType: "json",
        data: {
          ref_money: $("#check_in_val").val()
		},
        success: data => {
            if (data.ret) {
					swal({
                       title: data.msg,
                       type:"success"
                       });
                } else {
                    swal({
                       title: data.msg,
                       type:"error"
                       });
                   }
				window.setTimeout("location.href=window.location.href", 1500);
                },
            error: function (jqXHR) {
                $("#result").modal();
				$("#msg").html("发生错误了: " + jqXHR.status);
            }
    });

});
$("#aff_check_out").click(function () {
	if(!validateRefmoney($("#check_out_val").val())) {
  　　　swal('Oops...', "金额输入不合法,请检查后输入",'error');
            return false;
    }
    if($("#check_out_val").val()==null || $("#check_out_val").val()=='0'){
        swal('Oops...', "金额输入不合法！",'error');
           return;
    }
    $.ajax({
        type: "POST",
        url: "invite/tx_money",
        dataType: "json",
        data: {
          tx_money: $("#check_out_val").val()
		},
        success: data => {
            if (data.ret) {
					swal({
                       title: data.msg,
                       type:"success"
                       });
                } else {
                    swal({
                       title: data.msg,
                       type:"error"
                       });
                   }
				window.setTimeout("location.href=window.location.href", 1500);
                },
            error: function (jqXHR) {
                $("#result").modal();
				$("#msg").html("发生错误了: " + jqXHR.status);
            }
    });

});

$("#buy-invite").click(function () {
    $.ajax({
        type: "POST",
        url: "/user/buy_invite",
        dataType: "json",
        data: {
            num: $("#buy-invite-num").val(),
        },
        success: function (data) {
             if (data.ret) {
     			swal({
                   title: data.msg,
                   type:"success"
                });
				window.setTimeout("location.href='/user/invite'", 2000);
	        } else {
                swal({
                   title: data.msg,
                   type:"error"
                });
            }
	    },
        error: function (jqXHR) {
            $("#result").modal();
			$("#msg").html("发生错误了: " + jqXHR.status);
        }
    })
});

$("#custom-invite-confirm").click(function () {
    $.ajax({
        type: "POST",
        url: "/user/custom_invite",
        dataType: "json",
        data: {
            customcode: $("#custom-invite-link").val(),
        },
        success: function (data) {
             if (data.ret) {
     			 swal({
                   title: data.msg,
                   type:"success"
				});
				window.setTimeout("location.href='/user/invite'", 2000);
	        } else {
                 swal({
                   title: data.msg,
                   type:"error"
            });
            }
	    },
        error: function (jqXHR) {
            $("#result").modal();
			$("#msg").html("发生错误了: " + jqXHR.status);
        }
    })
});
$("#user_input").click(function () {
	$.ajax({
		type: "POST",
		url: "agentbuy",
		dataType: "json",
		data: {
			shopid: $("#shop_id").val(),
			userid: userid
		},
		success: function (data) {
			if (data.ret) {
				swal({
                   title: data.msg,
                   text: "赶快刷新下本页的客户记录查看吧~!", 
                   type:"success"
                   });
              window.setTimeout("location.href=window.location.href", 2000);
			} else {
				swal('Oops...',data.msg,'error');
			}
		},
		error: function (jqXHR) {
			$("#result").modal();
            $("#msg").html("发生错误了: " + jqXHR.status);
		}
	});
});

$("#payA_1").on("click", function () {
	$.ajax({
		type: "POST",
		url: "/user/payment/purchase",
		dataType: "json",
		data: {
		    shopid: "0",
			coupon_code: "0",
			price: $("#price").val(),
			payment: payA_payment,
			type: payA_type,
			order_type: 0,
			mobile: isMobile
		},
		success: function (data) {
			if (data.ret) {
				pid = data.pid;
				if(data.method == "qr_code"){
					$("#ali_qrarea").html('<div class="text-center"><p>请使用APP扫描二维码支付</p><a id="qrcode" style="padding-top:10px;display:inline-block"></a><p>手机点击二维码可唤起支付</p></div>');
						$("#qr_code").modal();
                    new QRCode("qrcode", {
                        render: "canvas",
                        width: 200,
                        height: 200,
			        	text: data.url,
                        correctLevel: QRCode.CorrectLevel.Q
                    });
                    $('#qrcode').attr('href',data.url);
                    setTimeout(status(), 1000);
				}else{
					if(payA_type=="wxpay"){
						$("#result").modal();
						$("#msg").html("正在跳转到微信...");
					}else if(payA_type=="alipay"){
						$("#result").modal();
						$("#msg").html("正在跳转到支付宝...");
					}else{
						$("#result").modal();
						$("#msg").html("正在跳转到支付网关...");
					}
					window.setTimeout('location.href="'+data.url+'"', 1500);
				}
			} else {
				swal('Oops...',data.msg,'error');
			}
		},
		error: function (jqXHR) {
			$("#result").modal();
            $("#msg").html("发生错误了: " + jqXHR.status);
		}
	});
});
$("#payB_1").on("click", function () {
	$.ajax({
		type: "POST",
		url: "/user/payment/purchase",
		dataType: "json",
		data: {
		    shopid: "0",
			coupon_code: "0",
			price: $("#price").val(),
			payment: payB_payment,
			type: payB_type,
			order_type: 0,
			mobile: isMobile
		},
		success: function (data) {
			if (data.ret) {
				pid = data.pid;
				if(data.method == "qr_code"){
					$("#ali_qrarea").html('<div class="text-center"><p>请使用APP扫描二维码支付</p><a id="qrcode" style="padding-top:10px;display:inline-block"></a><p>手机点击二维码可唤起支付</p></div>');
						$("#qr_code").modal();
                    new QRCode("qrcode", {
                        render: "canvas",
                        width: 200,
                        height: 200,
			        	text: data.url,
                        correctLevel: QRCode.CorrectLevel.Q
                    });
                    $('#qrcode').attr('href',data.url);
                    setTimeout(status(), 1000);
				}else{
					if(payB_type=="wxpay"){
						$("#result").modal();
						$("#msg").html("正在跳转到微信...");
					}else if(payB_type=="alipay"){
						$("#result").modal();
						$("#msg").html("正在跳转到支付宝...");
					}else{
						$("#result").modal();
						$("#msg").html("正在跳转到支付网关...");
					}
					window.setTimeout('location.href="'+data.url+'"', 1500);
				}	
			} else {
				swal('Oops...',data.msg,'error');
			}
		},
		error: function (jqXHR) {
			$("#result").modal();
            $("#msg").html("发生错误了: " + jqXHR.status);
		}
	});
});
$("#payC_1").on("click", function () {
	$.ajax({
		type: "POST",
		url: "/user/payment/purchase",
		dataType: "json",
		data: {
		    shopid: "0",
			coupon_code: "0",
			price: $("#price").val(),
			payment: payC_payment,
			type: payC_type,
			order_type: 0,
			mobile: isMobile
		},
		success: function (data) {
			if (data.ret) {
				pid = data.pid;
				if(data.method == "qr_code"){
					$("#ali_qrarea").html('<div class="text-center"><p>请使用APP扫描二维码支付</p><a id="qrcode" style="padding-top:10px;display:inline-block"></a><p>手机点击二维码可唤起支付</p></div>');
						$("#qr_code").modal();
                    new QRCode("qrcode", {
                        render: "canvas",
                        width: 200,
                        height: 200,
			        	text: data.url,
                        correctLevel: QRCode.CorrectLevel.Q
                    });
                    $('#qrcode').attr('href',data.url);
                    setTimeout(status(), 1000);
				}else{
					if(payC_type=="wxpay"){
						$("#result").modal();
						$("#msg").html("正在跳转到微信...");
					}else if(payC_type=="alipay"){
						$("#result").modal();
						$("#msg").html("正在跳转到支付宝...");
					}else{
						$("#result").modal();
						$("#msg").html("正在跳转到支付网关...");
					}
					window.setTimeout('location.href="'+data.url+'"', 1500);
				}	
			} else {
				swal('Oops...',data.msg,'error');
			}
		},
		error: function (jqXHR) {
			$("#result").modal();
            $("#msg").html("发生错误了: " + jqXHR.status);
		}
	});
});
$(document).ready(function () {
    $("#hide-update").click(function () {
        $.ajax({
            type: "POST",
            url: "hide",
            dataType: "json",
            data: {
                hide: $$getValue('hide')
            },
            success: function (data) {
                $("#result").modal();
                $("#msg").html(data.msg);
                window.setTimeout("location.href='/user/donate'", 2000);
            },
            error: function (jqXHR) {
                $("#result").modal();
                $("#msg").html("发生错误了: " + jqXHR.status);
            }
        });
    });
});
$(document).ready(function () {
    $("#portreset").click(function () {
        $.ajax({
            type: "POST",
            url: "resetport",
            dataType: "json",
            data: {
            },
            success: function (data) {
                if (data.ret) {
                    $("#result").modal();
					$("#ajax-user-port").html(data.msg);
					$("#msg").html("设置成功，新端口是 "+data.msg);
					
                } else {
                    $("#result").modal();
					$("#msg").html(data.msg);
                }
            },
            error: function (jqXHR) {
                $("#result").modal();
				$("#msg").html("发生错误了: " + jqXHR.status);
            }
        });
    });
});
$(document).ready(function () {
    $("#portspecify").click(function () {
        $.ajax({
            type: "POST",
            url: "specifyport",
            dataType: "json",
            data: {
				port: $("#port-specify").val()
            },
            success: function (data) {
                if (data.ret) {
                    $("#result").modal();
					$("#ajax-user-port").html($("#port-specify").val());
					$("#msg").html(data.msg);
                } else {
                    $("#result").modal();
					$("#msg").html(data.msg);
                }
            },
            error: function (jqXHR) {
                $("#result").modal();
				$("#msg").html("发生错误了: " + jqXHR.status);
            }
        });
    });
});
$(document).ready(function () {
    $("#ssr-update").click(function () {
        $.ajax({
            type: "POST",
            url: "ssr",
            dataType: "json",
            data: {
                protocol: $("#protocol").val(),
                obfs: $("#obfs").val(),
                obfs_param: $("#obfs-param").val()
            },
            success: function(data) {
                if (data.ret) {
                    $("#result").modal();
                    $('#ajax-user-protocol').innerHTML = $("#protocol").val();
                    $('#ajax-user-obfs').innerHTML = $("#obfs").val();
                    $('#ajax-user-obfs-param').innerHTML = $("#obfs-param").val();
                    $("#msg").html(data.msg);
					window.setTimeout("location.href='/user/edit'", 2000);
                } else {
                    $("#result").modal();
                    $("#msg").html(data.msg);
                }
            },
            error: function(jqXHR) {
                $("#result").modal();
                $("#msg").html("发生错误了: " + jqXHR.status);
            }
        });
    });
});
$(document).ready(function () {
    let newsspwd = Math.random().toString(36).substr(2);
    $("#ss-pwd-update").click(function () {
        $.ajax({
            type: "POST",
            url: "sspwd",
            dataType: "json",
            data: {
                sspwd: newsspwd
            },
            success: function(data) {
                if (data.ret) {
                    $("#result").modal();
                    $('#ajax-user-passwd').innerHTML = newsspwd;
                    $("#msg").html("修改成功!");
					window.setTimeout("location.href='/user/edit'", 2000);
                } else {
                    $("#result").modal();
                    $("#msg").html("修改失败!");
                }
            },
            error: function(jqXHR) {
                $("#result").modal();
                $("#msg").html("发生错误了: " + jqXHR.status);
            }
        });
    });
});
$(document).ready(function () {
    $("#method-update").click(function () {
        $.ajax({
            type: "POST",
            url: "method",
            dataType: "json",
            data: {
                method: $$getValue('method')
            },
            success: function(data) {
                $('#ajax-user-method').innerHTML = $('#method').val();
                if (data.ret) {
                    $("#result").modal();
                    $("#msg").html('修改成功');
					window.setTimeout("location.href='/user/edit'", 2000);
                } else {
                    $("#result").modal();
                    $("#msg").html(data.msg);
                }
            },
            error: function(jqXHR) {
                $("#result").modal();
                $("#msg").html("发生错误了: " + jqXHR.status);
            }
        });
    });
});
$(document).ready(function () {
    $("#pwd-update").click(function () {
        $.ajax({
            type: "POST",
            url: "password",
            dataType: "json",
            data: {
                oldpwd: $("#oldpwd").val(),
                pwd: $("#pwd").val(),
                repwd: $("#repwd").val()
            },
            success: function(data) {
                $("#result").modal();
                $("#msg").html(data.msg);
				window.setTimeout("location.href='/user/profile'", 2000);
            },
            error: function(jqXHR) {
                $("#result").modal();
                $("#msg").html("发生错误了: " + jqXHR.status);
            }
        });
    });
});

$(document).ready(function () {
    $("#wechat-update").click(function () {
        $.ajax({
            type: "POST",
            url: "wechat",
            dataType: "json",
            data: {
                wechat: $("#wechat").val(),
				imtype: $("#imtype").val()
            },
            success: function (data) {
                if (data.ret) {
                    $("#result").modal();
					$("#msg").html(data.msg);
					window.setTimeout("location.href='/user/profile'", 2000);
                } else {
                    $("#result").modal();
					$("#msg").html(data.msg);
                }
            },
            error: function (jqXHR) {
                $("#result").modal();
				$("#msg").html("发生错误了: " + jqXHR.status);
            }
        });
    });
});
$(document).ready(function () {
    $("#theme-update").click(function () {
        $.ajax({
            type: "POST",
            url: "theme",
            dataType: "json",
            data: {
                theme: $("#theme").val()
            },
            success: function (data) {
                if (data.ret) {
                    $("#result").modal();
					$("#msg").html(data.msg);
					window.setTimeout("location.href='/user/profile'", 2000);
                } else {
                    $("#result").modal();
					$("#msg").html(data.msg);
                }
            },
            error: function (jqXHR) {
                $("#result").modal();
				$("#msg").html("发生错误了: " + jqXHR.status);
            }
        });
    });
});
$(document).ready(function () {
    $("#mail-update").click(function () {
        $.ajax({
            type: "POST",
            url: "mail",
            dataType: "json",
            data: {
                mail: $("#mail").val()
            },
            success: function (data) {
                if (data.ret) {
                    $("#result").modal();
					$("#msg").html(data.msg);
					window.setTimeout("location.href='/user/profile'", 2000);
                } else {
                    $("#result").modal();
					$("#msg").html(data.msg);
                }
            },
            error: function (jqXHR) {
                $("#result").modal();
				$("#msg").html("发生错误了: " + jqXHR.status);
            }
        });
    });
});
$(document).ready(function () {
    $("#unblock").click(function () {
        $.ajax({
            type: "POST",
            url: "unblock",
            dataType: "json",
            data: {
            },
            success: function (data) {
                if (data.ret) {
                    $("#result").modal();
					$("#ajax-block").html("IP: "+data.msg+" 没有被封");
					$("#msg").html("发送解封命令解封 "+data.msg+" 成功");
					window.setTimeout("location.href='/user/profile'", 2000);
                } else {
                    $("#result").modal();
					$("#msg").html(data.msg);
                }
            },
            error: function (jqXHR) {
                $("#result").modal();
				$("#msg").html("发生错误了: " + jqXHR.status);
            }
        });
    });
});
$(document).ready(function(){
   $("#shop_refund").click(function(){
    $.ajax({
          type:"POST",
          url:"/user/shop_refund",
          dataType:"json",
          success:function(data){
             if(data.ret){
                 swal({
                   title: data.msg, 
                   type:"success"
                 });
                window.setTimeout("location.href=window.location.href", 2000);
             }else{
             	swal('Oops...',data.msg,'error');
             }
          },
          error: function (jqXHR) {
			$("#result").modal();
              $("#msg").html("发生错误了: " + jqXHR.status);
		}
      });        
   });
});
$("#coupon_get").click(function () {
	if(document.getElementById('check_yue').checked){
		var check_yue = "1";
	}else{
		var check_yue = "0";
	}
    $.ajax({
        type: "POST",
        url: "coupon_check",
        dataType: "json",
        data: {
			check_yue,
            coupon: $("#coupon").val(),
            shop
        },
        success: function(data) {
            if (data.ret) {
                $("#name").html("商品名称: "+data.name);
				$("#credit").html("优惠额度: "+data.credit+"%"); 
				$("#total").html("总金额: "+data.total+"元");
				$("#coupon_modal").modal('hide');
				$("#paycontent_modal").modal();
				document.getElementById('mode').value = 1;
				document.getElementById('couponcode').value = data.coupon;
				document.getElementById('coupontotal').value = data.total;
            } else {
				$("#coupon_modal").modal('hide');
                $("#result").modal();
				$("#msg").html(data.msg);
            }
        },
        error: function(jqXHR) {
		    $("#coupon_modal").modal('hide');
            $("#result").modal();
            $("#msg").html("发生错误了: " + jqXHR.status);
        }
    });
});
$("#payA").on("click", function () {
	if($("#mode").val() == 1){
		coupon_code = $("#couponcode").val();
		traffic = "0";
	}else{
	    shop = "-1";
	    coupon_code = "0";
	    traffic = $('#couponcode').val();
	}
	$.ajax({
		type: "POST",
		url: "/user/payment/purchase",
		dataType: "json",
		data: {
			shopid: shop,
			coupon_code: coupon_code,
			price: $("#coupontotal").val(),
			payment: payA_payment,
			traffic: traffic,
			type: payA_type,
			order_type: 1,
			mobile: isMobile
		},
		success: function (data) {
			if (data.ret) {
				pid = data.pid;
				$("#paycontent_modal").modal('hide');
				if(data.method == "qr_code"){
					$("#ali_qrarea").html('<div class="text-center"><p>请使用支付宝APP扫描二维码支付</p><a id="qrcode" style="padding-top:10px;display:inline-block"></a><p>手机点击二维码可唤起支付宝</p></div>');
						$("#qr_code").modal();
                    new QRCode("qrcode", {
                        render: "canvas",
                        width: 200,
                        height: 200,
			        	text: data.url,
                        correctLevel: QRCode.CorrectLevel.Q
                    });
                    $('#qrcode').attr('href',data.url);
                    setTimeout(status, 2000);
				}else{
					if(payA_type=="wxpay"){
						$("#result").modal();
						$("#msg").html("正在跳转到微信...");
					}else if(payA_type=="alipay"){
						$("#result").modal();
						$("#msg").html("正在跳转到支付宝...");
					}else{
						$("#result").modal();
						$("#msg").html("正在跳转到支付网关...");
					}
					window.setTimeout('location.href="'+data.url+'"', 1500);
				}
			} else {
			    $("#paycontent_modal").modal('hide');
				swal('Oops...',data.msg,'error');
			}
		},
		error: function (jqXHR) {
		    $("#paycontent_modal").modal('hide');
			$("#result").modal();
            $("#msg").html("发生错误了: " + jqXHR.status);
		}
	});
});
$("#payB").on("click", function () {
    if($("#mode").val() == 1){
		coupon_code = $("#couponcode").val();
		traffic = "0";
	}else{
		shop = "-1";
		coupon_code = "0";
		traffic = $('#couponcode').val();
	}
	$.ajax({
		type: "POST",
		url: "/user/payment/purchase",
		dataType: "json",
		data: {
			shopid: shop,
			coupon_code: coupon_code,
			price: $("#coupontotal").val(),
			payment: payB_payment,
			traffic: traffic,
			type: payB_type,
			order_type: 1,
			mobile: isMobile
		},
		success: function (data) {
			if (data.ret) {
				pid = data.pid;
				$("#paycontent_modal").modal('hide');
				if(data.method == "qr_code"){
					$("#ali_qrarea").html('<div class="text-center"><p>请使用微信扫描二维码支付</p><a id="qrcode" style="padding-top:10px;display:inline-block"></a><p>手机请截图后到微信扫码支付</p></div>');
						$("#qr_code").modal();
                    new QRCode("qrcode", {
                        render: "canvas",
                        width: 200,
                        height: 200,
			        	text: data.url,
                        correctLevel: QRCode.CorrectLevel.Q
                    });
                    $('#qrcode').attr('href',data.url);
                    setTimeout(status, 2000);
				}else{
					if(payB_type=="wxpay"){
						$("#result").modal();
						$("#msg").html("正在跳转到微信...");
					}else if(payB_type=="alipay"){
						$("#result").modal();
						$("#msg").html("正在跳转到支付宝...");
					}else{
						$("#result").modal();
						$("#msg").html("正在跳转到支付网关...");
					}
					window.setTimeout('location.href="'+data.url+'"', 1500);
				}	
			} else {
			    $("#paycontent_modal").modal('hide');
				swal('Oops...',data.msg,'error');
			}
		},
		error: function (jqXHR) {
		    $("#paycontent_modal").modal('hide');
			$("#result").modal();
            $("#msg").html("发生错误了: " + jqXHR.status);
		}
	});
});
$("#payC").on("click", function () {
    if($("#mode").val() == 1){
		coupon_code = $("#couponcode").val();
		traffic = "0";
	}else{
		shop = "-1";
		coupon_code = "0";
		traffic = $('#couponcode').val();
	}
	$.ajax({
		type: "POST",
		url: "/user/payment/purchase",
		dataType: "json",
		data: {
			shopid: shop,
			coupon_code: coupon_code,
			price: $("#coupontotal").val(),
			payment: payC_payment,
			traffic: traffic,
			type: payC_type,
			order_type: 1,
			mobile: isMobile
		},
		success: function (data) {
			if (data.ret) {
				pid = data.pid;
				$("#paycontent_modal").modal('hide');
				if(data.method == "qr_code"){
					$("#ali_qrarea").html('<div class="text-center"><p>请使用支付宝APP扫描二维码支付</p><a id="qrcode" style="padding-top:10px;display:inline-block"></a><p>手机点击二维码可唤起支付宝</p></div>');
						$("#qr_code").modal();
                    new QRCode("qrcode", {
                        render: "canvas",
                        width: 200,
                        height: 200,
			        	text: data.url,
                        correctLevel: QRCode.CorrectLevel.Q
                    });
                    $('#qrcode').attr('href',data.url);
                    setTimeout(status, 2000);
				}else{
					if(payC_type=="wxpay"){
						$("#result").modal();
						$("#msg").html("正在跳转到微信...");
					}else if(payC_type=="alipay"){
						$("#result").modal();
						$("#msg").html("正在跳转到支付宝...");
					}else{
						$("#result").modal();
						$("#msg").html("正在跳转到支付网关...");
					}
					window.setTimeout('location.href="'+data.url+'"', 1500);
				}	
			} else {
			    $("#paycontent_modal").modal('hide');
				swal('Oops...',data.msg,'error');
			}
		},
		error: function (jqXHR) {
		    $("#paycontent_modal").modal('hide');
			$("#result").modal();
            $("#msg").html("发生错误了: " + jqXHR.status);
		}
	});
});
$("#yue_pay").on("click", function () {
	if($("#mode").val() == 1){
		coupon_code = $("#couponcode").val();
		traffic = "0";
	}else{
	    shop = "0";
	    coupon_code = "0";
	    traffic = $('#couponcode').val();
	}
	$.ajax({
		type: "POST",
		url: "/user/payorder",
		dataType: "json",
		data: {
			shopid: shop,
			coupon_code: coupon_code,
			price: $("#coupontotal").val(),
			traffic: traffic
		},
		success: function (data) {
			if (data.ret) {
				$("#result").modal();
                $("#msg").html(data.msg);
              window.setTimeout('location.href="/user/code"', 2000);
			} else {
				swal('Oops...',data.msg,'error');
			}
		},
		error: function (jqXHR) {
			$("#result").modal();
            $("#msg").html("发生错误了: " + jqXHR.status);
		}
	});
});
$("#buy_traffice").on("click", function() {
	var traffic = $('#traffics').val();
	if(document.getElementById('check_yue2').checked){
		var check_yue2 = "1";
	}else{
		var check_yue2 = "0";
	}
	$.ajax({
		type: "POST",
		url: "buy_traffic",
		dataType: "json",
		data: {
			type: check_yue2,
			traffic: traffic,
			price: $('#traffic_price').val()
		},
		success: function (data) {
			if (data.ret) {
                $("#name").html("商品名称: 流量包"+traffic+"GB");
				$("#credit").html("优惠额度: 0%"); 
				$("#total").html("总金额: "+data.total+"元");
				$("#buy_traffic").modal('hide');
				$("#paycontent_modal").modal();
				document.getElementById('mode').value = 2;
				document.getElementById('couponcode').value = traffic;
				document.getElementById('coupontotal').value = data.total;
			} else {
				$('#buy_traffic').modal('hide');
				$("#result").modal();
				$("#msg").html(data.msg);
			}
		},
		error: function(jqXHR) {
		    $('#buy_traffic').modal('hide');
			$("#result").modal();
			$("#msg").html("发生错误了: " + jqXHR.status);
		}
	});
});


$("#buy_traf").on("click", function() {
	$('#buy_traffic').modal();

});

$('#shop_ref').on('click', function(){
   $("#shop_re").modal();
});

$(document).ready(function () {
	$("#code-update").click(function () {
		$.ajax({
			type: "POST",
			url: "code",
			dataType: "json",
			data: {
				code: $("#code").val()
			},
			success: function (data) {
				if (data.ret) {
					$("#result").modal();
					$("#msg").html(data.msg);
					window.setTimeout("location.href=window.location.href", 2000);
				} else {
					$("#result").modal();
					$("#msg").html(data.msg);
					window.setTimeout("location.href=window.location.href", 2000);
				}
			},
			error: function (jqXHR) {
				$("#result").modal();
				$("#msg").html("发生错误：" + jqXHR.status);
			}
		});
	});
});
$('#invite').click(function (){
    $.ajax({
        type: "POST",
        url: "/admin/invite",
        dataType: "json",
        data: {
            prefix: $$getValue('invite'),
            uid: $$getValue('uid'),
            num: $$getValue('num'),
        },
        success: data => {
            if (data.ret) {
                $("#result").modal();
                $("#msg").html(data.msg);
                window.setTimeout("location.href='/admin/invite'", 2000 );
            } else {
                $("#result").modal();
                $("#msg").html(data.msg);
            }
        },
        error: jqXHR => {
                $("#result").modal();
                $("#msg").html("发生错误了: " + jqXHR.status);
        }
    });
});
 $(document).ready(function () {
   function addclass_h () {
	  var class_h = $$.getElementById("class_h").value;
      if (class_h <= 0) {
          $("#result").modal();
          $("#msg").html("输入有误, 请检查后提交.");
          return;
      }  
      if ($$.getElementById('class_exprice').checked) {
		 var change_class=1;
      } else {
		 var change_class=0;
	  }
      $.ajax({
          type: "POST",
          url: "/admin/user/addclass",
          dataType: "json",
          data: {
              vip: $('#vip').val(),
              change_class,
			  class_h: $('#class_h').val()
          },
          success: data => {
              if (data.ret) {
                  $("#result").modal();
                  $('#msg').html(data.msg);
                window.setTimeout("location.href=window.location.href", 2000);
              } else {
                  $("#result").modal();
                  $('#msg').html(data.msg);
              }
          },
          error: jqXHR => {
              $("#result").modal();
              $('#msg').html("发生错误："+jqXHR.status);
          }
      });
    }
    $("#addclass_h").on('click',addclass_h);
  });
 $(document).ready(function () {
   function addTraffic () {
	  var user_traffic = $$.getElementById("user_traffic").value;
      if (user_traffic <= 0) {
          $("#result").modal();
          $("#msg").html("输入有误, 请检查后提交.");
          return;
      }  
      $.ajax({
          type: "POST",
          url: "/admin/user/addtraffic",
          dataType: "json",
          data: {
              vip: $('#vip_traffic').val(),
			  user_traffic: $('#user_traffic').val()
          },
          success: data => {
              if (data.ret) {
                  $("#result").modal();
                  $('#msg').html(data.msg);
                window.setTimeout("location.href=window.location.href", 2000);
              } else {
                  $("#result").modal();
                  $('#msg').html(data.msg);
              }
          },
          error: jqXHR => {
              $("#result").modal();
              $('#msg').html("发生错误："+jqXHR.status);
          }
      });
    }
    $("#addTraffic").on('click',addTraffic);
  });
 $(document).ready(function () {
   function addMoney () {
	  var user_money = $$.getElementById("user_money").value;
      if (user_money <= 0) {
          $("#result").modal();
          $("#msg").html("输入有误, 请检查后提交.");
          return;
      }
      $.ajax({
          type: "POST",
          url: "/admin/user/addmoney",
          dataType: "json",
          data: {
              vip: $('#vip_money').val(),
			  user_money: $('#user_money').val()
          },
          success: data => {
              if (data.ret) {
                  $("#result").modal();
                  $('#msg').html(data.msg);
                window.setTimeout("location.href=window.location.href", 2000);
              } else {
                  $("#result").modal();
                  $('#msg').html(data.msg);
              }
          },
          error: jqXHR => {
              $("#result").modal();
              $('#msg').html("发生错误："+jqXHR.status);
          }
      });
    }
    $("#addMoney").on('click',addMoney);
  });
$(document).ready(function () {
   function send_email (page = -1) {
      if ($$.getElementById('class_email').checked) {
		 var change_expire=1;
      } else {
		 var change_expire=0;
	  }
      if ($$.getElementById('overdue_no').checked) {
		 var overdue=1;
      } else {
		 var overdue=0;
	  }
	  if (page === -1) {
          sedPage = 1;
      } else {
          sedPage = page;
	  }
     $("#sendemail_modal").modal();
      $.ajax({
          type: "POST",
          url: "/admin/user/sendemail",
          dataType: "json",
          data: {
              change_expire,
			  overdue,
			  page: sedPage
          },
          success: data => {
              if (data.ret = 1) {
                  $("#sendemail_modal").modal('hide');
                  $("#result").modal();
                  $('#msg').html(data.msg);
                  window.setTimeout("location.href=window.location.href", 2000);
              } else if (data.ret = 2) {
                  $("#sendemail_modal").modal('hide');
                  submit(data.msg+' 页已发送');
              } else {
                  $("#sendemail_modal").modal('hide');
                  $("#result").modal();
                  $('#msg').html(data.msg);
              }
          },
          error: jqXHR => {
              $("#result").modal();
              $('#msg').html("发生错误："+jqXHR.status);
          }
      });
    }
     $("#send_email").click(function () {
            send_email();
     });
});
$(document).ready(function () {
   function check_nodes () {
      if ($$.getElementById('check_node_all').checked) {
		 var type=1;
      } else {
		 var type=0;
	  }
     $("#check_nodes_modal").modal();
      $.ajax({
          type: "POST",
          url: "/admin/node/check_nodes_gfw",
          dataType: "json",
          data: {
              check_ip: $('#check_ip').val(),
			  check_port: $('#check_port').val(),
			  type
          },
          success: data => {
              if (data['res']['ret'] == 1) {
			    var html='';
                  $("#check_nodes_modal").modal('hide');
                  $("#result").modal();
                  $('#msg').html(data['res']['msg']);
                for(var i=0;i<data['nodes'].length;i++) {
                var ls = data['nodes'][i];
                html += "<tr><td>#" + ls.id + "</td><td>" + ls.name + "</td><td>" + ls.ip + "</td><td>" + ls.port + "</td><td>" + ls.result + "</td></tr>";
                }
               $("#result").modal('hide');
               $("#checkResult").html(html);
              } else {
                $("#check_nodes_modal").modal('hide');
                $("#result").modal();
                $('#msg').html(data['res']['msg']);
              }
          },
          error: jqXHR => {
              $("#result").modal();
              $('#msg').html("发生错误："+jqXHR.status);
          }
      });
    }
     $("#check_nodes").click(function () {
            check_nodes();
     });
  });