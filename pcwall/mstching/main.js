!function(t,e,i){Hi.Push.r("mcToggleMstchingStart",function(){Hi.Activity.g("mstching");e("#mstching-wall-block .mstching-wall-controler.waiting .mstching-wall-fire-button.waiting:visible").trigger("click")}),Hi.Push.r("mcToggleMstchingStop",function(){Hi.Activity.g("mstching");e("#mstching-wall-block .mstching-wall-controler.matching .mstching-wall-fire-button.matching:visible").trigger("click")});var a="wall-id-"+(new Date).getTime()+"-"+Math.ceil(1e7*Math.random()),n=function(t,e){Hi.Push.r(e,function(t){var i=Hi.Activity.g("mstching");i[e].apply(i,[t,t.___from==a])})},r=function(){var t=Array.prototype.slice.call(arguments),e=t[0],a=t.length>0?t.slice(1):[];a.forEach(n.bind(i,e))};r(Hi,"mstchingOnStart","mstchingOnStop","mstchingOnToTheList","mstchingOnDelete");var s=function(t){return t},o={process:function(t){if(t){if("registed"==this.options.crowd)return s.call(this,t);if(this.options.includeNonGenderUser||Hi.Array.contains([1,2],t.gender))return Hi.Array.contains([1,2],t.gender)||(t.gender=this.options.defaultUserGender),s.call(this,t)}},classify:function(t){return"registed"==this.options.crowd?l.classify.call(this,t):1==t.gender?"male":"female"}},l={process:function(t){return t&&t.type?s.call(this,t):i},classify:function(t){return Hi.Array.contains(["left","right"],t.type)?"left"==t.type?"male":"female":t.type}},m=function(t,i){this.wall=t;this.policies=e.extend({gender:o,custom:l},i?i.policies||{}:{}),this.options=e.extend({type:"gender",maleText:"男",femaleText:"女",minUserCount:2,maxUserCount:5e5,interval:80,includeNonGenderUser:!1,defaultUserGender:1,flash:!0,dispalyType:"heart",imgPathGetter:function(){return this.imgPath?Hi.String.dealUrl(this.imgPath):"/images/wall/unknow.png"},postMatchedUsersPath:"/web/wallmstching/addResult.html",requestRemoveMatchedUsersPath:"/web/wallmstching/deleteResult.html"},i)};m.prototype.init=function(){var t=e.Deferred(),i=this;this.wallmstchingResultList=[];var a=function(){var t=e.Deferred(),i=function(){var t=e.Deferred();return Hi.Message.init("sign").always(t.resolve),t.promise()},a=function(){var t=e.Deferred();return Hi.Message.init("mst").always(t.resolve),t.promise()},n=function(){var t=e.Deferred();return Hi.Message.init("mstreg").always(t.resolve),t.promise()};return i().then(a).then(n).always(t.resolve),t.promise()},n=function(){var t=e.Deferred();return Hi.Load.moduleHtml("mstching").always(function(){t.resolve()}),t.promise()},r=function(){var t=e.Deferred();return e("#mstching-wall-block").on("click",".mstching-wall-controler.waiting .mstching-wall-fire-button.waiting",function(){Hi.Wall.checkState(),i.begin(),i.broadcast("mstchingOnStart")}).on("click",".mstching-wall-controler.matching .mstching-wall-fire-button.matching",function(){i.stop(),i.broadcast("mstchingOnStop")}),e("#mstching-wall-block").on("click",".mstching-wall-pair-remove",function(){var t=e(this).closest(".mstching-wall-pair");layer.confirm("请确认是否删除？",{btn:["确定","取消"],shade:[.1,"#fff"]},function(){var e=t.attr("data-pair-id");i.removeFromTheList(e,t),i.broadcast("mstchingOnDelete",{id:e})},function(){})}),i.updateSetting().done(function(){Hi.Note.r("newmstreg",i.updateUi.bind(i)),Hi.Note.r("newsign",i.updateUi.bind(i)),Hi.Note.r(Hi.Note.type.UPDATE_GLOBAL,function(t){"wallmstchingConfig"==t.noteType&&i.updateSetting()}),t.resolve()}),t.promise()};return a().then(n).then(r).always(t.resolve),t.promise()},m.prototype.in=function(){var t=this,i=e.Deferred();new Hi.DbUtil(flag,"mst").getMsg([],"next",1e3,function(t){return"Y"!=t.delete}).then(function(e){for(var a=[],n=0;n<e.length;n++){var r={id:e[n].data.id,createDate:e[n].data.createDate,leftWxUser:{id:e[n].data.lid,imgPath:e[n].data.limgPath,nickName:e[n].data.lnickName,funnName:e[n].data.lfullName,gender:e[n].data.lgender},rightWxUser:{id:e[n].data.rid,imgPath:e[n].data.rimgPath,nickName:e[n].data.rnickName,funnName:e[n].data.rfullName,gender:e[n].data.rgender}};a.push(r)}t.wallmstchingResultList=a,t.updateSetting(),i.resolve()});var a=this;return a.updateUi(),e("#mstching-wall-block").show(),e(document).bind("keyup.space",function(){e(e(".mstching-wall-controler").is(".matching")?".mstching-wall-fire-button.matching:visible":".mstching-wall-fire-button.waiting:visible").click()}),i.promise()},m.prototype.leave=function(){e("#mstching-wall-block").hide(),e(document).unbind("keyup.space")},m.prototype.updateSetting=function(){var t=e.Deferred(),i=this;return Hi.Db.get("global","wallmstchingConfig").then(function(a){var n=e.extend(a,{type:a.mstchType,maleText:a.leftName,femaleText:a.rightName,displayType:a.dispalyType});i.options=e.extend(i.options,n),i.options.flash="undefined"==typeof i.options.flash||"[object Null]"==Object.prototype.toString.call(i.options.flash)||i.options.flash,"gender"==i.options.type&&(i.options.maleText="男士",i.options.femaleText="女士"),e(".mstching-wall-list").empty(),i.matchedUsers&&0!=i.matchedUsers.length||(i.matchedUsers=[],i.wallmstchingResultList.forEach(function(t){"Y"!=t.deleteTag&&i.matchedUsers.push({id:t.id,male:t.leftWxUser,female:t.rightWxUser,time:Hi.String.getDate(t.createDate)})})),i.addToList(i.matchedUsers),i.updateUi(),t.resolve()}),t.promise()},m.prototype.broadcast=function(t,e){return e=e||{},e.___from=a,Hi.Push.s({system:{cmd:"globalNote",secondCmd:t},data:e}),e},m.prototype.mstchingOnStart=function(t,e){e||this.begin()},m.prototype.mstchingOnStop=function(t,e){this.__mstching_on_stop_is_from_me=e,e||this.stop()},m.prototype.mstchingOnToTheList=function(t,i){i||(e(".mstching-wall-controler").removeClass("matching").addClass("waiting"),e(".mstching-wall-fire-button.matching").attr("disabled",!1),this.matchedUsers=this.matchedUsers||[],this.matchedUsers.push(t),this.updateUi(),this.addResultToList(t.id,t.male,t.female,t.time))},m.prototype.mstchingOnDelete=function(t,e){e||this.removeFromTheList(t.id)},m.prototype.iteratorUsers=function(t,i){var a=this,n=e.Deferred(),r=e.indexedDB(flag).objectStore("registed"==this.options.crowd?"mstreg":"sign"),s=0;return r.each(function(e){var r=e.value.data;if(r=a.policies[a.options.type].process.call(a,r),"undefined"!=typeof r&&"null"!=typeof r){if(a.matchedUsers)for(var o=0;o<a.matchedUsers.length;o++){var l=a.matchedUsers[o];if(l.male.id==r.id||l.female.id==r.id)return}if(s++,"undefined"!=typeof t&&"null"!=typeof t&&s>=t)return!1;(i||function(){})(r),n.notify(r)}}).fail(n.reject.bind(n)).done(n.resolve.bind(n,s)),n.promise()},m.prototype.countClassifyUsers=function(t){var i=e.Deferred(),a={male:0,female:0},n=this;return this.iteratorUsers(t).progress(function(t){a[n.policies[n.options.type].classify.bind(n)(t)]++}).fail(i.reject.bind(i)).done(function(t){i.resolve(t,a.male,a.female)}),i.promise()},m.prototype.loadUsers=function(t){var i=e.Deferred(),a=[];return this.iteratorUsers(t).progress(a.push.bind(a)).fail(i.reject.bind(i)).done(i.resolve.bind(i,a)),i.promise()},m.prototype.requestRemoveMatchedUsers=function(t){var i=e.Deferred();return Hi.Dc.query({where:{flag:flag,id:t}}).post(this.options.requestRemoveMatchedUsersPath,function(t,e){return t?(i.reject.bind(i),void i.reject()):void i.resolve(e.resultCount)}),i.promise()},m.prototype.postMatchedUsers=function(t,i){var a=e.Deferred();return Hi.Dc.query({flag:flag,wallId:wallJson.id,userId:wallJson.userId,leftWxUserId:t.id,rightWxUserId:i.id}).post(this.options.postMatchedUsersPath,function(t,e){return t?(a.reject.bind(a),void a.reject()):void a.resolve(e.id,Hi.String.getDate(e.createDate))}),a.promise()},m.prototype.updateUi=function(){var t=e(".mstching-wall-animate-area.male .mstching-wall-animate-area-text"),i=e(".mstching-wall-animate-area.female .mstching-wall-animate-area-text"),a=this;this.countClassifyUsers(this.options.maxUserCount).done(function(e,n,r){i.html(a.options.femaleText+"<br />（"+r+"人）"),t.html(a.options.maleText+"<br />（"+n+"人）")});var n=this.matchedUsers||[];e("#mstching-wall-block")[n.length?"removeClass":"addClass"]("welcome")},m.prototype.classifyUsers=function(t){var i=e.Deferred(),a=g(t,this.policies[this.options.type].classify.bind(this));return u(i.resolve.bind(i,a.male,a.female))(),i.promise()},m.prototype.seatText=function(){var t=e.Deferred();return e(".mstching-wall-animate-area-text").animate({top:"-47px"},300,t.resolve.bind(t)),t.promise()},m.prototype.resetText=function(){var t=e.Deferred();return e(".mstching-wall-animate-area-text").animate({top:"0px"},300,t.resolve.bind(t)),t.promise()},m.prototype.checkData=function(t,i){t=t||[],i=i||[];var a,n=e.Deferred(),a=0==t.length||0==i.length?n.reject.bind(n,new Error("looks like the user not enough to match!")):n.resolve.bind(n,t,i);return u(a)(),n.promise()},m.prototype.onmatched=function(a){var n=this;if(e(".mstching-wall-fire-button.matching").attr("disabled",!0),this.__mstching_on_stop_is_from_me!==!1){if(this.options.flash===!0){var r=this.addResultToList(i,a.male,a.female);return void this.postMatchedUsers(a.male,a.female).always(function(){e(".mstching-wall-controler").removeClass("matching").addClass("waiting"),e(".mstching-wall-fire-button.matching").attr("disabled",!1)}).done(function(t,e){({id:t,time:e,male:a.male,female:a.female});n.broadcast("mstchingOnToTheList",{id:t,time:e,male:a.male,female:a.female}),n.matchedUsers=n.matchedUsers||[],n.matchedUsers.push(a),n.updateUi(),r.attr("data-pair-id",t),r.attr("data-pair-create-time",e)}).fail(function(t){n.braodcast("mstchingOnDelete",{id:i,male:a.male,female:a.female}),console.warn(t),r.remove(),layer.msg("系统发生了错误!",{time:5e3})})}e.when(this.postMatchedUsers(a.male,a.female),this.toTheWall(a.male,a.female)).always(function(){e(".mstching-wall-controler").removeClass("matching").addClass("waiting"),e(".mstching-wall-fire-button.matching").attr("disabled",!1)}).then(function(r,s){var o=r[0],l=r[1];n.broadcast("mstchingOnToTheList",{id:o,time:l,male:a.male,female:a.female}),n.matchedUsers=n.matchedUsers||[],n.matchedUsers.push(a),n.updateUi();var m=s[1];s=s[0];var c=a.male,h=a.female,d=e.Deferred(),f=t.setTimeout(function(){d.resolve(c,h,o,s,m),f=i},1e4);return e(s).add(e(m)).one("click",function(){"undefined"!=typeof f&&t.clearTimeout(f),d.resolve(o,c,h,l,s,m)}),d.promise()}).then(function(t,e,i,a,r,s){return n.toTheList(t,e,i,a,r,s)}).fail(function(t,r){n.braodcast("mstchingOnDelete",{id:i,male:a.male,female:a.female}),console.warn(t),e(r).remove(),layer.msg("系统发生了错误!",{time:5e3})}).done(function(){})}},m.prototype.begin=function(){Hi.Wall.unBindControl();var t=this;e(".mstching-wall-fire-button.waiting").attr("disabled",!0),this.seatText(),this.loadUsers(this.options.maxUserCount).then(function(e){return t.classifyUsers(e)}).then(function(e,i){return t.checkData(e,i)}).then(function(a,n){e(".mstching-wall-controler").addClass("matching"),e(".mstching-wall-fire-button.waiting").attr("disabled",!1);var r=new f(".mstching-wall-controler",i,i,{imgPathGetter:t.options.imgPathGetter}),s=e.Deferred(),o=t.matcher=new h(a,n,[],t.options.interval);return o.progress(r.show.bind(r)),o.always(function(){r.stop()}),o.then(s.resolve.bind(s),s.reject.bind(s)),s.promise()}).always(function(){Hi.Wall.bindControl(),t.resetText()}).done(function(e){e&&e.female&&e.male&&t.onmatched(e)}).fail(function(t){e(".mstching-wall-controler").removeClass("matching").addClass("waiting"),e(".mstching-wall-fire-button.matching").add(e(".mstching-wall-fire-button.waiting")).attr("disabled",!1),t&&(console.warn(t),layer.msg("人数不够，无法开始对对碰!",{time:5e3}))})},m.prototype.stop=function(){return!!this.matcher&&(this.matcher.stop(),!0)},m.prototype.abort=function(){return!!this.matcher&&(this.matcher.abort(),!0)},m.prototype.sortListByTime=function(){e(".mstching-wall-list .mstching-wall-pair").sort(function(t,i){return-(parseInt(e(t).attr("data-pair-create-time"))-parseInt(e(i).attr("data-pair-create-time")))}).appendTo(".mstching-wall-list")},m.prototype._make_pair_dom=function(t,i,a,n){var r=e(e("#mstching-wall-pair-template-"+this.options.displayType).html());return r.attr("data-pair-male-id",i.id).attr("data-pair-female-id",a.id),t&&r.attr("data-pair-id",t),n&&r.attr("data-pair-create-time",n),[].slice.call([i,a]).forEach(function(t){t.nickName=Hi.Wall.getSignUserName(t.id,t.nickName)}),r.find(".mstching-wall-pair-avatar-wrapper.male .mstching-wall-pair-avatar").attr("src",this.options.imgPathGetter.call(i)),r.find(".mstching-wall-pair-avatar-wrapper.male .mstching-wall-pair-name").html(i.nickName||""),r.find(".mstching-wall-pair-avatar-wrapper.female .mstching-wall-pair-avatar").attr("src",this.options.imgPathGetter.call(a)),r.find(".mstching-wall-pair-avatar-wrapper.female .mstching-wall-pair-name").html(a.nickName||""),r},m.prototype.toTheWall=function(a,n){var r=e.Deferred(),s=this._make_pair_dom(i,a,n,i),o=e('<div class="mstching-shining-show"><div class="rays mstching-wall" style="display: block;"></div></div>');o.prepend(s),e(document.body).append(o);var l=e('<div class="mstching-wall-mask" ></div>').appendTo(document.body).animate({opacity:1},300),m=e(document.body),c=m.innerWidth(),h=(m.innerHeight(),o.outerWidth()),d=o.outerHeight();return o.css({position:"absolute",left:c/2-h/2+"px",top:580-d/2+"px"}).addClass("to-show"),t.setTimeout(function(){r.resolve(o.get(0),l.get(0))},0),r.promise()},m.prototype.removeFromTheList=function(t,i){var a=e(i?i:".mstching-wall-pair[data-pair-id="+t+"]"),n=a.attr("data-pair-male-id"),r=a.attr("data-pair-female-id"),s=this;this.requestRemoveMatchedUsers(t).done(function(){layer.msg("删除成功",{time:2e3}),a.remove();for(var t=0;t<s.matchedUsers.length;t++){var e=s.matchedUsers[t];if(e.male.id==n||e.female.id==r){s.matchedUsers.splice(t,1);break}}s.updateUi()}).fail(function(t){layer.msg("删除失败",{time:2e3})})},m.prototype.addToList=function(t){t=[].concat(t||[]);var e=this;t.forEach(function(t){e.addResultToList(t.id,t.male,t.female,t.time)}),this.sortListByTime()},m.prototype.addResultToList=function(t,i,a,n){var r=this._make_pair_dom(t,i,a,n);return e(".mstching-wall-list").prepend(r),r},m.prototype.toTheList=function(t,i,a,n,r,s){var o=e(r),l=e(s);l.animate({opacity:0},300,function(){u(l.remove.bind(l))()});var m=o.find(".mstching-wall-pair");m.attr("data-pair-id",t),m.attr("data-pair-create-time",n);var c=m.clone();c.css("visibility","hidden"),e(".mstching-wall-list").prepend(c),o.find("rays").remove();var h=e.Deferred(),d=this;return o.css({top:o.offset().top+"px",left:o.offset().left+"px","-webkit-transform":"scale(1.4)"}).removeClass("to-show").addClass("to-list").animate({left:c.offset().left-o.outerWidth()/2+m.outerWidth()/2+"px",top:c.offset().top-o.outerHeight()/2+m.outerHeight()/2+"px"},1e3,function(){d.sortListByTime(),c.css("visibility","visible"),o.remove()}),h.promise()};var c=new m;Hi.Activity.r("mstching",c);var h=function(t,a,n,r){var s=e.Deferred();this.matching=!0,this.abort=!1,this.result=i,this.matchedUsers=n,h.RAF(this._raf.bind(this,s,t,a),r);var o=this,l=s.promise();return l.stop=function(){o.matching=!1},l.abort=function(){o.abort=!0},l};h.prototype._raf=function(t,e,i){if(!this.matching)return t.resolve(this.result),!1;if(this.abort)return t.reject(),!1;try{this.result=this.match(e,i)}catch(e){return console.warn(e),t.reject(),!1}t.notify(this.result.male,this.result.female)},h.prototype.match=function(t,e){this.malerandommer=this.malerandommer||new d(0,t.length-1),this.femalerandommer=this.femalerandommer||new d(0,e.length-1);var i=h.randomUser(t,this.malerandommer),a=h.randomUser(e,this.femalerandommer,v(this.matchedUsers||[],"id").concat(i.id));return{male:i,female:a}},h.randomUser=function(t,e,i,a){if(i=[].concat(i||[]),a="undefined"==typeof a?1:a,15==a)throw new Error("Looks like user count is not enough to match");var n=t[e.next()];return Hi.Array.contains(i,n.id)?(a+=1,h.randomUser(t,e,i,a)):n},h.RAF=function(e,i){t.setTimeout(function(){var t=e();t!==!1&&h.RAF(e,i)},i)};var d=function(t,e,i){if(e-t==-1)throw new Error("invalid random range:"+t+" - "+e);if(i="undefined"==typeof i?1:i,0==i)throw new Error("invalid random step:"+i);if(this._randomary=this._randomary||[],0==this._randomary.length)for(var a=t;a<=e;a+=i)this._randomary.push(a);this._randomary.sort(function(){return.5-Math.random()});var n=this;return{self:n,next:function(){return 0==n._randomary.length&&(n._randomary=new d(t,e,i).self._randomary),n._randomary.shift()}}},f=function(t,a,n,r){this.options=e.extend(f.defaults,r),this.$dom=e(t),this.$males=this.$dom.find(".mstching-wall-males"),this.$females=this.$dom.find(".mstching-wall-females"),this.males=a,this.females=n,this.pairs=[],this.maleRandommer=a?this.maleRandommer||new d(0,this.males.length-1):i,this.femaleRandommer=n?this.femaleRandommer||new d(0,this.females.length-1):i};f.defaults={imgPathGetter:function(){return this.imgpath},templates:{male:'<img class="mstching-wall-avatar animate" src="/images/wall/mstching/default-avatar-male.png" />',female:'<img class="mstching-wall-avatar animate" src="/images/wall/mstching/default-avatar-male.png" />'},defaultImgPath:"1439447188.6903.jpg",enterDuration:100,outDuration:250,keepTime:100,enterOffset:25,outOffset:5},f.prototype.start=function(){this.stoped=!1,this.next()},f.prototype.show=function(t,e){if(!t)throw new Error("male is null ");if(!e)throw new Error("female is null ");this.stoped=!1,this.next(t,e)},f.prototype.next=function(t,i){var a=e.Deferred();if(this.stoped)return this.$pre_male&&this.$pre_male.remove(),this.$pre_female&&this.$pre_female.remove(),this.stoped=!0,p(a.reject.bind(a))(),a.promise();var n=t&&i;t=t||this.males[this.maleRandommer.next()];var r=this.options.imgPathGetter.call(t);i=i||this.females[this.femaleRandommer.next()];var s=this.options.imgPathGetter.call(i),o=this.$pre_male=e(this.options.templates.male).attr("src",r),l=this.$pre_female=e(this.options.templates.female).attr("src",s);o.appendTo(this.$males),l.appendTo(this.$females);var m=this,c=this.enter(o,"right",this.options.enterOffset).then(function(t){m.keep(t).then(function(t){return m.out(t,"right",-m.options.outOffset)}).then(function(t){return m.remove(t)})}),h=this.enter(l,"left",this.options.enterOffset).then(function(t){m.keep(t).then(function(t){return m.out(t,"left",-m.options.outOffset)}).then(function(t){return m.remove(t)})});return e.when(c,h).done(n?a.resolve.bind(a,t,i):m.next.bind(m)),a.promise()},f.prototype.enter=function(t,i,a){var n=e(t),r=e.Deferred(),s={opacity:1};return s[i]=a,n.animate(s,this.options.enterDuration,r.resolve.bind(r,n,i,a)),r.promise()},f.prototype.keep=function(i){var a=e(i),n=e.Deferred();return t.setTimeout(function(t){return function(){n.resolve(t)}}(a),this.options.keepTime),n.promise()},f.prototype.out=function(t,i,a){var n=e(t),r=e.Deferred(),s={opacity:0};return s[i]=a,n.animate(s,this.options.outDuration,function(){r.resolve(n,i,a)}),r.promise()},f.prototype.remove=function(i){var a=e(i),n=e.Deferred();return t.setTimeout(function(t){return function(){t.remove()}}(a),0),n.resolve(a),n.promise()},f.prototype.stop=f.prototype.abort=function(){this.stoped=!0};var p=function(e,i,a){return t.setTimeout.bind(t,function(){e.apply(e,(a||[]).concat(Array.prototype.slice.call(arguments)))},i)},u=function(t,e){return p(t,0,e)},g=function(t,e){var i={};return t.forEach(function(t,a){var n=e.call(e,t,a),r=i[n]||(i[n]=[]);r.push(t)}),i},v=function(t,e){var i=[];return t.forEach(function(t){i.push(t[e])}),i}}(window,jQuery);