!function(){var e=function(){this.wall=null,this.wallHoldscreenConfig=null,this.aniRender=null,this.screenArr=[],this.stop=!0},n=function(e){var n=$.Deferred(),r=$.indexedDB(flag).objectStore("sign","readonly").index("data.id");return r.get(e).then(function(e){n.resolve(e.data)},n.reject),n.promise()};e.prototype.init=function(e){var n=$.Deferred(),r=this;Hi.Note.r(Hi.Note.type.UPDATE_GLOBAL,function(e){"wallholdscreenConfig"==e.noteType&&r.refreshHoldscreen(e)});var t=function(){var e=$.Deferred();return Hi.Message.init("sign").always(e.resolve),e.promise()},o=function(){var e=$.Deferred();return $.get("/pcwall/holdscreen/template.htm",function(n){$("#allTemplate").append(n),e.resolve()},"html"),e.promise()},l=function(){var e=$.Deferred(),n=function(){var e=$.Deferred();return Hi.Db.get("global","wall").then(function(n){r.wall=n,e.resolve()},function(){console.error("wall获取错误"),e.reject()}),e.promise()},t=function(){var n=$.Deferred();return Hi.Db.get("global","wallholdscreenConfig").then(function(n){r.wallHoldscreenConfig=n,e.resolve()},function(){console.error("查询失败"),n.reject()}),n.promise()};return n().then(t).always(e.resolve),e.promise()};return t().then(o).then(l).then(function(){"Y"==r.wallHoldscreenConfig.openState&&"In"==r.wall.activeState&&(r.aniRender=template("holdscreenTemp"),r.stop=!1,r.playHoldScreen()),n.resolve()},function(){console.error("初始化查询失败")}),n.promise()},e.prototype.playHoldScreen=function(){var e=this;e.stop||setTimeout(function(){Hi.Dc.query({where:{flag:flag}}).post("/web/wallholdscreen/list.html",function(r,t){if(r)layer.msg(r),e.playHoldScreen();else{if(!t||!t.length)return void e.playHoldScreen();Hi.Recurse.data(t,function(r,t){var o={},l=JSON.parse(Hi.String.html.decode(r.content.replace(/"/g,'\\"')));o.id=parseInt(r.id),n(r.wxUserId).then(function(n){o.nickName=Hi.Wall.getSignUserName(n.id,n.nickName),o.imgPath=Hi.String.dealUrl(n.imgPath),o.text=l.text,o.img=Hi.String.dealUrl(l.img),o.time=l.time,e.screenArr.push(o),t()})}).done(function(){e.animate(e.screenArr.shift())})}})},1e3)},e.prototype.animate=function(e){function n(){var e=$.Deferred();return $("#holdscreen-wall").snabbt({fromOpacity:0,opacity:1,fromScale:[0,0],scale:[a,a],easing:"spring",springConstant:.3,springDeceleration:.8,complete:function(){e.resolve()}}),e.promise()}function r(){var e=$.Deferred();return Hi.Recurse.data(new Int8Array(i).toString().split(","),function(e,n){$("#holdscreen-wall .time").text(--i),setTimeout(n,1e3)}).done(function(){e.resolve()}),e.promise()}function t(){var n=$.Deferred();return $("#holdscreen-wall").snabbt({opacity:0,scale:[0,0],position:[0,-2e3,0],easing:"spring",springConstant:.5,springDeceleration:.8}).snabbt({position:[0,0,0],easing:"ease",duration:.1,complete:function(){Hi.Dc.query({where:{id:e.id,flag:flag}}).post("/web/wallholdscreen/hide.html",function(e,n){e&&layer.msg(e)}),n.resolve()}}),n.promise()}var o=this,l=$("body").height(),i=parseInt(e.time),a=1;$("#holdscreen-wall").html(o.aniRender(e)),l<820&&($("#holdscreen-wall").css("transform","scale(0.8)"),a=.8),"none"==$(".holdscreen-wall-mask").css("display")?$("#holdscreen-wall,.holdscreen-wall-mask").show():$("#holdscreen-wall").show(),n().then(r).then(t).always(function(){o.screenArr.length?o.animate(o.screenArr.shift()):($(".holdscreen-wall-mask").css("display","none"),o.playHoldScreen())})},e.prototype.refreshHoldscreen=function(e){var n=this;e.openState!=n.wallHoldscreenConfig.openState&&(n.wallHoldscreenConfig=e,"Y"==e.openState?(n.stop=!1,n.playHoldScreen()):n.stop=!0)};var r=new e;Hi.Activity.r("holdscreen",r)}(jQuery);