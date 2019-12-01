'use strict';
var namxuatban = '';
namxuatban = jQuery('img.img-mb').attr('title').split('-')[1];
jQuery('span.namxuatban_remove').html(namxuatban.replace(/(.*?)\(([0-9]+)\)/gi, '$2'));
jQuery('span.trangthai_remove').html(jQuery('span.trangthai_remove').html().replace(/\[stt\/(.*?)]/gi, '<span class="statusit" name="status">$1</span>'));
jQuery('span.chatluong_remove').html(jQuery('span.chatluong_remove').html().replace(/\[hd\/(.+?)]/ig, '<span class="chatluonghd" name="status">$1</span>'));
/* Replace List */
for (var i = 0, msg = jQuery('[name=main-movie-list]').length; i < msg; i++) {
    var oldtext = jQuery('[name=main-movie-list]');
    var newtext = oldtext.html().replace(/(^|[\n ])([\w]+?:\/\/[^ ,\"\n\r\t<]*)/gi, '$2');
    newtext = newtext.replace(/\[stt\/(.*?)]/gi, '').replace(/\[\+\]/gi, '');
    newtext = newtext.replace(/\[hd\/(.+?)]/ig, '')
    newtext = newtext.replace(/\[info\](.*?)/gi, '<div class="movie-information">');
    newtext = newtext.replace(/\[\/info\]/gi, '</div>');
    newtext = newtext.replace(/\<id\>/gi, '<div class="playlist"><div class="movie-list">');
    newtext = newtext.replace(/\<\/id\>/gi, '</div></div></div>');
    newtext = newtext.replace(/\[nd\]/gi, '<span itemprop="description" class="noidung">');
    newtext = newtext.replace(/\[\/nd\]/gi, '</span>');
    newtext = newtext.replace(/\[ss\]/gi, '<div class="season-item">');
    newtext = newtext.replace(/\[\/ss\]/gi, '</div>');
    newtext = newtext.replace(/\[(.*?)\;(.*?)\*]/gi, '<a href="$2" class="active" title="$1">$1</a>');
    newtext = newtext.replace(/\[(.*?)\;(.*?)\]/gi, '<a href="$2" title="$1">$1</a>');
    newtext = newtext.replace(/\[(.*?)\|(.*?)\]/gi, '<div class="col-pll"><button name="videos" onclick="tap(\'$2\', \'VIP\');" class="episode" title="Tập $1">$1</button></div>');
    newtext = newtext.replace(/\[(.*?)\*(.*?)\]/gi, '<div class="col-pll"><button name="videos" onclick="tap(\'$2\', \'ALO\');" class="episode" title="Tập $1">$1</button></div>');
    newtext = newtext.replace(/\[banquyen\]/gi, '<button name="videos" onclick="tap(\'\', \'BANQUYEN\');" class="episode" id="BANQUYEN"></button>');
    newtext = newtext.replace(/\[chuyen@(.*?)\]/gi, '<meta http-equiv="refresh" content="5;url=$1"/>');
    newtext = newtext.replace(/\[br\/(.*?)]/gi, '<p class="newsv"># $1</p><div class="playlst">');
    oldtext.html(newtext)
}
/* Function Apiplayer */function apiplayer(link) {
	var apiplayer = '';
	if (link.match(/(www.facebook.com)/gi)) {
		apiplayer = '//api.vuiphim.net/play.php?link=';
	}  else if (link.match(/(youtube.com|youtu.be)/gi)) {
        apiplayer = '';
		link = link.replace(/(\/watch\?v=)/gi, '/embed/').replace(/(.be\/)/gi, 'be.com/embed/');
		link += "?autoplay=1&showinfo=0";
	}  else if (link.match(/(drive.google.com|docs.google.com)/gi)) {
        apiplayer = '';
		link = link.replace(/(\/view)/gi, '/preview');
	}  else if (link.match(/(drive.google.com|docs.google.com)/gi)) {
        apiplayer = '';
		link = link.replace(/(\/view)/gi, '/preview');
	}  else if (link.match(/(www.dailymotion.com)/gi)) {
		apiplayer = '';
		link = link.replace(/(\/video\/)/gi, '/embed/video/');
	}  else if (link.match(/(tv.zing.vn)/gi)) {
		apiplayer = 'https://tv.animehaynhat.com/tv.php?link=';
	}  else if (link.match(/(www.blogger.com|hydrax.net|fembed.com|letsupload.co|verystream.com)/gi)) {
		apiplayer = '';
	}  else if (link.match(/()/gi)) {
		apiplayer = '';
	} 
	return apiplayer+link;
}
/* Function Load Frame */
function tap(l, d) {
    checkScroll();
    if (d.match(/(VIP)/gi)) {
        jQuery('[name=include]').eq(0).html('<iframe scrolling="no" src="' + apiplayer(l) + '" width="100%" height="100%" allowfullscreen="true" frameborder="0" class="resizevideo"></iframe>')
    } else if (d.match(/(ALO)/gi)) {
        jQuery('[name=include]').eq(0).html('<iframe scrolling="no" src="' + l + '" width="100%" height="100%" allowfullscreen="true" frameborder="0" class="resizevideo"></iframe>')
    } else if (d.match(/(BANQUYEN)/gi)) {
        jQuery('.movie-list').remove();
        jQuery('[name=include]').eq(0).html('<style>.include,#include{padding-bottom:0}.box-info{display:none}</style><div class="banquyen">Phim đã bị gỡ bỏ do nội dung có chứa BẢN QUYỀN. <p style="color:yellow">Inbox Fanpage để có link xem</p></div>')
    }
}
/* Button Click */
jQuery(document).ready(function () {
    jQuery('.xemvideo').click(function () {
        jQuery('.movie-content-1.entry-content').css('width', '100%').css('float', 'none');
        jQuery('.lable-update').css('width', '14.5%');
        jQuery('.movie-list,.choose-episode,.playlist,.td-play').css('display', 'block');
        jQuery('.page-cover').css('position', 'absolute').css('top', '70px');
        jQuery('.detail-mod,.season-item,.noidung,.qc,.ads,.breadcrumb,.btn-watch-area').addClass('hidden');
        jQuery('.mvic-desc,.md-top,.desc').addClass('fullauto');
        jQuery('.mvic-info').addClass('phim-left');
        jQuery('.row').addClass('container');
        jQuery('.add-on,.jwplayer,.khungvideo,.tt-phim,.pw-comment').removeClass('hidden');
        jQuery('.phim-chinh').removeClass('infomovies');
        if (jQuery('.movie-list').eq(0).html().match(/(<button)/gi)) {
            jQuery('[name=videos]').eq(0).click()
        }
    });
    jQuery('button').click(function () {
        jQuery('.episode').removeClass('episode-hover');
        jQuery(this).addClass('episode-hover');
        checkScroll()
    })
});
/* Ligth On - Ligth Off */
var cookie_light = !1;
function _sangtoi() {
    checkScroll();
    cookie_light ? (jQuery('div.bat-den').fadeOut(), jQuery('._sangtoi').html('Tắt đèn'), jQuery('#scroller').removeClass('hidden'), jQuery('html,body').css({
        'overflow': 'auto'
    }), cookie_light = !1) : (jQuery('div.bat-den').show(), jQuery('._sangtoi').html('Bật đèn'), jQuery('#scroller').addClass('hidden'), jQuery('html,body').css({
        'overflow': 'hidden'
    }), cookie_light = !0);
    return !1
}
jQuery(document).ready(function () {
    jQuery('div.bat-den').click(function () {
        jQuery('.zindex').toggleClass('no-zindex');
        jQuery('div.bat-den').hide();
        jQuery('html,body').css({
            'overflow': 'auto'
        });
        jQuery('._sangtoi').html('Tắt đèn');
        jQuery('#scroller').removeClass('hidden');
        cookie_light = !1
    });
    jQuery('.zid').click(function () {
        jQuery('.zindex').toggleClass('no-zindex')
    })
});
'use strict';
var defaultnoimage = "//i.imgur.com/BLmL2RV.png";
var maxresults = 24;
var relatedTitles = new Array();
var relatedStt = new Array();
var relatedTitlesNum = 0;
var relatedUrls = new Array();
var thumburl = new Array();
function related_results_labels_thumbs(json) {
    for (var i = 0; i < json.feed.entry.length; i++) {
        var entry = json.feed.entry[i];
        relatedTitles[relatedTitlesNum] = entry.title.$t;
        relatedStt[relatedTitlesNum] = entry.content.$t;
        try {
            thumburl[relatedTitlesNum] = entry.media$thumbnail.url
        } catch (error) {
            s = entry.content.$t;
            a = s.indexOf("<img");
            b = s.indexOf("src=\"", a);
            c = s.indexOf("\"", b + 5);
            d = s.substr(b + 5, c - b - 5);
            if ((a != -1) && (b != -1) && (c != -1) && (d != "")) {
                thumburl[relatedTitlesNum] = d
            } else {
                if (typeof (defaultnoimage) !== 'undefined') {
                    thumburl[relatedTitlesNum] = defaultnoimage
                } else {
                    thumburl[relatedTitlesNum] = "//i.imgur.com/BLmL2RV.png"
                }
            }
        }
        if (relatedTitles[relatedTitlesNum].length > 35) {
            relatedTitles[relatedTitlesNum] = relatedTitles[relatedTitlesNum].substring(0, 150)
        }
        for (var k = 0; k < entry.link.length; k++) {
            if (entry.link[k].rel == 'alternate') {
                relatedUrls[relatedTitlesNum] = entry.link[k].href;
                relatedTitlesNum++
            }
        }
    }
}
function removeRelatedDuplicates_thumbs() {
    var tmp = new Array(0);
    var tmp2 = new Array(0);
    var tmp3 = new Array(0);
    var tmp4 = new Array(0);
    for (var i = 0; i < relatedUrls.length; i++) {
        if (!contains_thumbs(tmp, relatedUrls[i])) {
            tmp.length += 1;
            tmp2.length += 1;
            tmp3.length += 1;
            tmp4.length += 1;
            tmp[tmp.length - 1] = relatedUrls[i];
            tmp2[tmp2.length - 1] = relatedTitles[i];
            tmp3[tmp3.length - 1] = thumburl[i];
            tmp4[tmp4.length - 1] = relatedStt[i]
        }
    }
    relatedUrls = tmp;
    relatedTitles = tmp2;
    thumburl = tmp3;
    relatedStt = tmp4
}
function contains_thumbs(a, e) {
    for (var j = 0; j < a.length; j++) {
        if (a[j] == e) {
            return !0
        }
    }
    return !1
}
function printRelatedLabels_thumbs(current) {
    for (var i = 0; i < relatedUrls.length; i++) {
        if ((relatedUrls[i] == current) || (!relatedTitles[i])) {
            relatedUrls.splice(i, 1);
            relatedTitles.splice(i, 1);
            thumburl.splice(i, 1);
            relatedStt.splice(i, 1);
            i--
        }
    }
    var r = Math.floor((relatedTitles.length - 1) * Math.random());
    var i = 0;
    if (relatedTitles.length > 0) {
        document.write('<div class="phimlq">NHIỀU NGƯỜI CŨNG XEM</div>')
    }
    document.write('<div class="labelphimlq"/>');
    while (i < relatedTitles.length && i < 12 && i < maxresults) {
        document.write('<div class="lable-update"><div class="lable-about"><div class="lable-stt" onclick="window.location.replace(\'' + relatedUrls[r] + '\')") title="' + relatedTitles[r] + '"><div class="home-movie-content" name="main-movie-content">' + relatedStt[r] + '</div><div class="lable-img"><img onload="lzld(this)" class="img-lable" alt="' + relatedTitles[r] + '" data-src="' + thumburl[r].replace("/s72-c/", "/s320/") + '" src="//i.imgur.com/YdwUuUq.jpg"/><span class="icon-hover"></span></div><h3 class="lable-home" name="title">[' + relatedTitles[r] + ']</h3></div></div></div>');
        i++;
        if (r < relatedTitles.length - 1) {
            r++
        } else {
            r = 0
        }
    }
    document.write('</div>');
    relatedUrls.splice(0, relatedUrls.length);
    thumburl.splice(0, thumburl.length);
    relatedTitles.splice(0, relatedTitles.length);
    relatedStt.splice(0, relatedStt.length)
}
