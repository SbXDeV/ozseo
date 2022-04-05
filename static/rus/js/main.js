function trim(str) {
	var newstr = str.replace(/^\s*(.+?)\s*$/, "$1");
	if (newstr == " ") {
		return "";
	}
	return newstr;
}
function drop_spaces(str) {
	var newstr = trim(str);
	return newstr.replace(/(\s)+/g, "");
}
function is_email(email) {
	var template = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/;
	email = drop_spaces(email);
	if (template.test(email)) {
		return true;
	}
	return false;
}
//counter
function end_date() {
	var nd = new Date();
	var ed = new Date(ms);
	if(nd > ed) {
		ms += 4*86400*1000;
		setTimeout(end_date, 0);
	} else {
		date_new = ed;
		get_timer();
	}
}
function returnEndDate(d, h, m, s) {
	var myDate = new Date();
	myDate.setDate(myDate.getDate() + d);
	myDate.setHours(myDate.getHours() + h);
	myDate.setMinutes(myDate.getMinutes() + m);
	myDate.setSeconds(myDate.getSeconds() + s);
	return myDate;
}
function get_timer() {
	var date_t = new Date(date_new);	
	var date = new Date();	
	var timer = date_t - date;	
	if(date_t > date) {	
		var day = parseInt(timer/(60*60*1000*24)); if(day < 10) {day = '0' + day;} day = day.toString();
		var hour = parseInt(timer/(60*60*1000))%24; if(hour < 10) {hour = '0' + hour;} hour = hour.toString();
		var min = parseInt(timer/(1000*60))%60; if(min < 10) {min = '0' + min;} min = min.toString();
		var sec = parseInt(timer/1000)%60; if(sec < 10) { sec = '0' + sec; } sec = sec.toString();

		timerUpdate(day, hour, min, sec);
		setTimeout(get_timer, 1000);
	}
}
function timerUpdate(d, h, m, s) {
	$('.counter .day').text(d);
	$('.counter .hour').text(h);
	$('.counter .min').text(m);
	$('.counter .sec').text(s);
}


//map
var mapObj = [
	//{'id': 'addr', 'coords': [], 'name': ''},
	{'id': 'addr1', 'coords': [51.121536, 10.400847], 'name': 'Германия'},
	{'id': 'addr2', 'coords': [25.774806, -80.197726], 'name': 'Майами'},
	{'id': 'addr3', 'coords': [55.745199, 37.578352], 'name': 'г. Москва, ул. Смоленская, дом 7'},
	{'id': 'addr4', 'coords': [55.772279, 37.879144], 'name': 'г. Реутов, ул. Транспортная, дом 5'}
];
function mapInit() {
	var e, t = new ymaps.GeoObjectCollection;
	for(var n = 0; n < mapObj.length; n++) {
		t.add(
			new ymaps.Placemark(
				mapObj[n].coords, {
					hintContent: mapObj[n].name,
					markID: mapObj[n].id
				}, {
					//iconImageHref: 'images/marker.png',
					//iconImageSize: [39, 50],
					//iconImageOffset: [-16, -42],
					//openBalloonOnClick: false,
					hintHideTimeout: 0
				}
			)
		);
	}
	
	e = new ymaps.Map('contacts', { center: [25.774806, -80.197726], zoom: 10});
	e.geoObjects.add(t);
	e.controls.add(new ymaps.control.SmallZoomControl);
	e.setBounds(t.getBounds());
	e.setCenter([25.774806, -80.197726], 12);
	e.geoObjects.events.add('click', function(e) {
		var pid = e.get('target').properties.get('markID');
		$.ajax({
			type: "GET",
			data: "",
			url: "./data/ya-maps/" + pid + ".html",
			dataType: "text",
			success: function(data) {
				$('#modal-shop').html(data);
				$.fancybox('#modal-shop');
			},
			error: function() {
					alert('Ошибка! Повторите позже.');
			}
		});
	});
}

ymaps.ready(mapInit);

$(document).ready(function() {
	//counter
	ms = (new Date(2014, 7, 6)).getTime();
	end_date();
	
	//more
	$('.btn-more').click(function(e) {
		e.preventDefault();
		var id = $(this).attr('data-id');
		$('#' + id).slideDown(400);
		$(this).hide();
	});
	//tech
	$('.btn-tech').click(function(e) {
		e.preventDefault();
		$.fancybox('#modal-tech');
	});
	
	//call
	$(document).on('click', '.btn-call', function(e) {
		e.preventDefault();
		$('#modal-form h3').html('Заявка<br>на бесплатную<br>консультацию');
		$('#modal-form input[name=subject]').val('Заказать звонок');
		$.fancybox('#modal-form');
	});
	$(document).on('click', '.btn-call2', function(e) {
		e.preventDefault();
		$('#modal-form h3').html('Хотите стать дилером?<br>Заполните заявку');
		$('#modal-form input[name=subject]').val('Хотите стать дилером?');
		$.fancybox('#modal-form');
	});

	//form
	$('.sform').submit(function(e) {
		e.preventDefault();
		var f = $(this);
		$('input[type=text]', f).removeClass('ierror');

		var name = $('input[name=name]', f).val();
		var phone = $('input[name=phone]', f).val();
		var email = $('input[name=email]', f).val();
		var subject = $('input[name=subject]', f).val();

		var error = false;
		if(name == '') {
			$('input[name=name]', f).addClass('ierror');
			error = true;
		}
		if(phone == '') {
			$('input[name=phone]', f).addClass('ierror');
			error = true;
		}
		if(!is_email(email)) {
			$('input[name=email]', f).addClass('ierror');
			error = true;
		}
		if(error) {
			return false;
		}
			
		var query = 'act=sender';
			query += '&name=' + encodeURIComponent(name);
			query += '&phone=' + encodeURIComponent(phone);
			query += '&email=' + encodeURIComponent(email);
			query += '&subject=' + encodeURIComponent(subject);

		$.ajax({
			type: "POST",
			data: query,
			url: "./sender.php",
			dataType: "json",
			success: function(data) {
				if(data.result == 'ok') {
					$('input[type=text]', f).val('');
					//echo
					$('#modal-success .add-text').hide();
					if($(f).hasClass('flist')) {
						$.fancybox('#modal-formlist');
					} else {
						$.fancybox('#modal-success');
					}
					location.href = '#form-send';
				} else {
					alert('Ошибка! Повторите позже.');
				}
			}
		});
		return false;
	});

	//mask
	$('input[name=phone]').maskinp('+7 (999) 999-99-99');
	
	//fancybox
	$('.fancy').fancybox();
	
	//scroll
	$('#menu a, #g1-back-to-top').click(function(e) {
		if($(this).hasClass('noscroll')) { return false; }
		var anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $(anchor.attr('href')).offset().top - 47
		}, 1000);
		e.preventDefault();
	});
	$(window).scroll(function() {
		var hm = 119;
		if($('html').scrollTop() > hm || $('body').scrollTop() > hm) {
			$('#menu').addClass('fx');
		} else {
			$('#menu').removeClass('fx');
		}
	});
	
	//modal pages
	$('.btn-modalpage').click(function(e) {
		e.preventDefault();
		var page = $(this).attr('data-id');
		$.ajax({
			type: "GET",
			data: "",
			url: "./data/pages/" + page + ".html",
			dataType: "text",
			success: function(data) {
				$('#modal-page').html(data);
				$.fancybox('#modal-page');
			},
			error: function() {
					alert('Ошибка! Повторите позже.');
			}
		});
	});
	
	//map regions
	$('.j-map-item').click(function(e) {
		e.preventDefault();
		var r = $(this).attr('data-region');
		$.ajax({
			type: "GET",
			data: "",
			url: "./data/maps/" + r + ".html",
			dataType: "text",
			success: function(data) {
				$('#modal-shop').html(data);
				$.fancybox('#modal-shop');
			},
			error: function() {
					alert('Ошибка! Повторите позже.');
			}
		});
	});
	$('.j-map-item').mousemove(function(e) {
		e.preventDefault();
		var x = e.pageX;
		var y = e.pageY;
		$('#mtitle').css({top: y + 'px', left: (x + 15) + 'px'});
	});
	$('.j-map-item').hover(function(e) {
		e.preventDefault();
		//hover
		if($(this).hasClass('map-city-name')) {
			var t = $('tspan', this).text();
		} else {
			var t = $(this).attr('data-title');
		}
		$('#mtitle .tooltip-inner').text(t);
		$('#mtitle').toggleClass('in');
	}, function(e) {
		$('#mtitle').toggleClass('in');
	});
	
	//formlist
	$('.sform2').submit(function(e) {
		e.preventDefault();
		var f = $(this);
		$('input[type=text]', f).removeClass('ierror');

		//check
		var error = false;
		$('input[type=text]', f).each(function() {
			if($(this).attr('name') == 'email') {
				if(!is_email($(this).val())) {
					$(this).addClass('ierror');
					error = true;
				}
			} else {
				if($(this).val() == '') {
					$(this).addClass('ierror');
					error = true;
				}
			}
		});
		if(error) {
			return false;
		}
		
		var query = 'act=flist';
			query += '&firm=' + encodeURIComponent($('input[name=firm]', f).val());
			query += '&fname=' + encodeURIComponent($('input[name=fname]', f).val());
			query += '&phone=' + encodeURIComponent($('input[name=phone]', f).val());
			query += '&email=' + encodeURIComponent($('input[name=email]', f).val());
			//2
			query += '&olocal=' + encodeURIComponent($('input[name=olocal]', f).val());
			query += '&ofunc=' + encodeURIComponent($('input[name=ofunc]', f).val());
			query += '&ow=' + encodeURIComponent($('input[name=ow]', f).val());
			query += '&ot=' + encodeURIComponent($('input[name=ot]', f).val());
			query += '&otype=' + encodeURIComponent($('input[name=otype]', f).val());
			query += '&oterm=' + encodeURIComponent($('input[name=oterm]', f).val());
			//3
			query += '&kpmaterial=' + encodeURIComponent($('input[name=kpmaterial]', f).val());
			query += '&kpdekor=' + encodeURIComponent($('input[name=kpdekor]', f).val());
			query += '&kph=' + encodeURIComponent($('input[name=kph]', f).val());
			query += '&kpmontaj=' + encodeURIComponent($('input[name=kpmontaj]:checked', f).val());
			//4
			query += '&ksmaterial=' + encodeURIComponent($('input[name=ksmaterial]', f).val());
			query += '&ksdekor=' + encodeURIComponent($('input[name=ksdekor]', f).val());
			//5
			query += '&osglass=' + encodeURIComponent($('input[name=osglass]', f).val());
			query += '&oss=' + encodeURIComponent($('input[name=oss]', f).val());

		$.ajax({
			type: "POST",
			data: query,
			url: "./sender.php",
			dataType: "json",
			success: function(data) {
				if(data.result == 'ok') {
					$('input[type=text]', f).val('');
					//echo
					$('#modal-success .add-text').show();
					$.fancybox('#modal-success');
					location.href = '#formlist-send';
				} else {
					alert('Ошибка! Повторите позже.');
				}
			}
		});
		return false;
	});
	
	$('.system-section .mbtn').hover(function(e) {
		e.preventDefault();
		//hover
		var id = $(this).attr('data-id');
		$('.system-section .' + id).show();
	}, function(e) {
		var id = $(this).attr('data-id');
		$('.system-section .' + id).hide();
	});
});