(function(a){a.fn.autofocus=function(){return!0!==this.first().autofocus?this.focus():this}})(jQuery);(function(d){d.fn.autogrow=function(b){return this.each(function(){new d.autogrow(this,b)})};d.autogrow=function(b,c){var a=this;a.textarea=$(b);a.options=c||{};a.shadow=null;a.interval=null;a.fontSize=a.textarea.css("fontSize");a.lineHeight=a.options.lineHeight||a.textarea.css("line-height");a.minHeight=a.options.minHeight||a.textarea.css("min-height");a.maxHeight=a.options.maxHeight||a.textarea.css("max-height");a.animateSpeed=a.options.animateSpeed||250;a.DEFAULT_TOLERANCE=0.45;a.DEFAULT_TOP_PADDING=
3;"string"===typeof a.expandTolerance?a.expandTolerance=parseInt(a.expandTolerance):"number"!=typeof a.expandTolerance&&(a.expandTolerance=-1);a.expandTolerance=!isNaN(a.options.expandTolerance)&&0<=a.options.expandTolerance?a.options.expandTolerance:a.DEFAULT_TOLERANCE;a.fontSize=parseFloat(a.fontSize,10);a.topPadding=parseInt(a.textarea.css("padding-top"));isNaN(a.topPadding)&&(a.topPadding=a.DEFAULT_TOP_PADDING);a.lineHeight=parseFloat(a.lineHeight,10);if(isNaN(a.lineHeight)||a.lineHeight<a.fontSize)a.lineHeight=
a.fontSize-0+a.topPadding;$.browser.msie&&0<a.lineHeight&&a.textarea.css("line-height",a.lineHeight+"px");a.textarea.height(parseFloat(a.lineHeight,10)*parseInt(a.textarea.attr("rows"),10));"auto"===a.minHeight&&(a.minHeight=0);a.minHeight&&(a.minHeight=parseFloat(a.minHeight,10));if(isNaN(a.minHeight)||0==a.minHeight)a.minHeight=Math.max(a.textarea.height(),a.lineHeight);"undefined"===typeof a.maxHeight&&(a.maxHeight=0);isNaN(a.maxHeight)&&(a.maxHeight=0);$.browser.msie&&(a.widthSet=!1);a.textarea.get(0).resetAutogrow=
function(){a.init()};a.init()};d.autogrow.fn=d.autogrow.prototype={autogrow:"1.2.3"};d.autogrow.fn.extend=d.autogrow.extend=d.extend;d.autogrow.fn.extend({init:function(){var b=this;b.textarea.css({overflow:"hidden",display:"block"});b.textarea.bind("focus",function(){b.checkExpand(!0);b.startExpand();return!0}).bind("blur",function(){b.stopExpand();return!0});b.checkExpand(!0)},startExpand:function(){var b=this;b.interval=window.setInterval(function(){b.checkExpand(!1)},400)},stopExpand:function(){clearInterval(this.interval)},
checkExpand:function(b){null==this.shadow?(this.shadow=$("<div></div>"),this.shadow.css({"font-size":this.textarea.css("font-size"),"font-family":this.textarea.css("font-family"),"padding-top":this.textarea.css("padding-top"),"padding-right":this.textarea.css("padding-right"),"padding-bottom":this.textarea.css("padding-bottom"),"padding-left":this.textarea.css("padding-left"),"line-height":this.lineHeight+"px","overflow-x":"hidden",position:"absolute",top:-1E4,left:-1E4,"background-color":"white",
border:"1px solid black"}),this.shadow.appendTo("body")):this.shadow.show();var c=this.shadow.width(),a=this.textarea.innerWidth();if(0<a&&(c!=a&&(this.shadow.width(a),"border-box"===this.textarea.css("box-sizing")&&this.shadow.width(this.textarea.width())),$.browser.msie&&!this.widthSet&&(this.textarea.width(this.textarea.width()+"px"),this.widthSet=!0),c=this.textarea.val().toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/^ /,"&nbsp;").replace(/  /g," &nbsp;")+
".",c=$.browser.msie?c.replace(/\n/g,"<BR/>"):c.replace(/\n/g,"<br/>"),c+=".",b||this.shadow.html()!=c))if(b=this.expandTolerance*this.lineHeight,this.shadow.html(c),0<this.maxHeight&&this.shadow.height()+b>this.maxHeight)this.textarea.css("overflow-y","auto"),this.textarea.height()<this.maxHeight&&this.textarea.animate({height:this.maxHeight+b+"px"},this.animateSpeed);else{"hidden"!==this.textarea.css("overflow-y")&&this.textarea.css("overflow-y","hidden");var c=this.textarea.height(),e=!1,a=Math.max(this.shadow.height(),
this.minHeight),a=Math.floor(a+b),a=Math.ceil(a/this.lineHeight)*this.lineHeight;$.browser.msie?Math.abs(c-a)>this.lineHeight/2&&(e=!0):c!=a&&(e=!0);e&&this.textarea.animate({height:a+"px"},this.animateSpeed,function(){d.browser&&(d.browser.msie&&d.browser.version<10)&&$(window).trigger("resize")})}this.shadow.hide()}})})(jQuery);!function(c){var h=function(a,b){this.element=c(a);this.format=e.parseFormat(b.format||this.element.data("date-format")||"mm/dd/yyyy");this.picker=c(e.template).appendTo("body").on({click:c.proxy(this.click,this)});this.isInput=this.element.is("input");this.component=this.element.is(".date")?this.element.find(".add-on"):!1;if(this.isInput)this.element.on({focus:c.proxy(this.show,this),keyup:c.proxy(this.update,this)});else if(this.component)this.component.on("click",c.proxy(this.show,this));else this.element.on("click",
c.proxy(this.show,this));this.minViewMode=b.minViewMode||this.element.data("date-minviewmode")||0;if("string"===typeof this.minViewMode)switch(this.minViewMode){case "months":this.minViewMode=1;break;case "years":this.minViewMode=2;break;default:this.minViewMode=0}this.viewMode=b.viewMode||this.element.data("date-viewmode")||0;if("string"===typeof this.viewMode)switch(this.viewMode){case "months":this.viewMode=1;break;case "years":this.viewMode=2;break;default:this.viewMode=0}this.startViewMode=this.viewMode;
this.weekStart=b.weekStart||this.element.data("date-weekstart")||0;this.weekEnd=0===this.weekStart?6:this.weekStart-1;this.onRender=b.onRender;this.fillDow();this.fillMonths();this.update();this.showMode()};h.prototype={constructor:h,show:function(a){this.picker.show();this.height=this.component?this.component.outerHeight():this.element.outerHeight();this.place();c(window).on("resize",c.proxy(this.place,this));a&&(a.stopPropagation(),a.preventDefault());var b=this;c(document).on("mousedown",function(a){c(a.target).closest(".datepicker").length==
0&&b.hide()});this.element.trigger({type:"show",date:this.date})},hide:function(){this.picker.hide();c(window).off("resize",this.place);this.viewMode=this.startViewMode;this.showMode();this.isInput||c(document).off("mousedown",this.hide);this.set();this.element.trigger({type:"hide",date:this.date})},set:function(){var a=e.formatDate(this.date,this.format);this.isInput?this.element.prop("value",a):(this.component&&this.element.find("input").prop("value",a),this.element.data("date",a))},setValue:function(a){this.date=
"string"===typeof a?e.parseDate(a,this.format):new Date(a);this.set();this.viewDate=new Date(this.date.getFullYear(),this.date.getMonth(),1,0,0,0,0);this.fill()},place:function(){var a=this.component?this.component.offset():this.element.offset();this.picker.css({top:a.top+this.height+5,left:a.left})},update:function(a){this.date=e.parseDate("string"===typeof a?a:this.isInput?this.element.prop("value"):this.element.data("date"),this.format);this.viewDate=new Date(this.date.getFullYear(),this.date.getMonth(),
1,0,0,0,0);this.fill()},fillDow:function(){for(var a=this.weekStart,b="<tr>";a<this.weekStart+7;)b+='<th class="dow">'+e.dates.daysMin[a++%7]+"</th>";this.picker.find(".datepicker-days thead").append(b+"</tr>")},fillMonths:function(){for(var a="",b=0;12>b;)a+='<span class="month">'+e.dates.monthsShort[b++]+"</span>";this.picker.find(".datepicker-months td").append(a)},fill:function(){var a=new Date(this.viewDate),b=a.getFullYear(),a=a.getMonth(),g=this.date.valueOf();this.picker.find(".datepicker-days th:eq(1)").text(e.dates.months[a]+
" "+b);var d=new Date(b,a-1,28,0,0,0,0),c=e.getDaysInMonth(d.getFullYear(),d.getMonth());d.setDate(c);d.setDate(c-(d.getDay()-this.weekStart+7)%7);c=new Date(d);c.setDate(c.getDate()+42);c=c.valueOf();html=[];for(var f;d.valueOf()<c;)d.getDay()===this.weekStart&&html.push("<tr>"),f=this.onRender(d),d.getMonth()<a?f+=" old":d.getMonth()>a&&(f+=" new"),d.valueOf()===g&&(f+=" active"),html.push('<td class="day '+f+'">'+d.getDate()+"</td>"),d.getDay()===this.weekEnd&&html.push("</tr>"),d.setDate(d.getDate()+
1);this.picker.find(".datepicker-days tbody").empty().append(html.join(""));a=this.date.getFullYear();g=this.picker.find(".datepicker-months").find("th:eq(1)").text(b).end().find("span").removeClass("active");a===b&&g.eq(this.date.getMonth()).addClass("active");html="";b=10*parseInt(b/10,10);g=this.picker.find(".datepicker-years").find("th:eq(1)").text(b+"-"+(b+9)).end().find("td");b-=1;for(d=-1;11>d;d++)html+='<span class="year'+(-1===d||10===d?" old":"")+(a===b?" active":"")+'">'+b+"</span>",b+=
1;g.html(html)},click:function(a){a.stopPropagation();a.preventDefault();var b=c(a.target).closest("span, td, th");if(1===b.length)switch(b[0].nodeName.toLowerCase()){case "th":switch(b[0].className){case "switch":this.showMode(1);break;case "prev":case "next":this.viewDate["set"+e.modes[this.viewMode].navFnc].call(this.viewDate,this.viewDate["get"+e.modes[this.viewMode].navFnc].call(this.viewDate)+e.modes[this.viewMode].navStep*("prev"===b[0].className?-1:1)),this.fill(),this.set()}break;case "span":b.is(".month")?
(a=b.parent().find("span").index(b),this.viewDate.setMonth(a)):(b=parseInt(b.text(),10)||0,this.viewDate.setFullYear(b));0!==this.viewMode&&(this.date=new Date(this.viewDate),this.element.trigger({type:"changeDate",date:this.date,viewMode:e.modes[this.viewMode].clsName}));this.showMode(-1);this.fill();this.set();break;case "td":if(b.is(".day")&&!b.is(".disabled")){var g=parseInt(b.text(),10)||1,a=this.viewDate.getMonth();b.is(".old")?a-=1:b.is(".new")&&(a+=1);b=this.viewDate.getFullYear();this.date=
new Date(b,a,g,0,0,0,0);this.viewDate=new Date(b,a,Math.min(28,g),0,0,0,0);this.fill();this.set();this.element.trigger({type:"changeDate",date:this.date,viewMode:e.modes[this.viewMode].clsName})}}},mousedown:function(a){a.stopPropagation();a.preventDefault()},showMode:function(a){a&&(this.viewMode=Math.max(this.minViewMode,Math.min(2,this.viewMode+a)));this.picker.find(">div").hide().filter(".datepicker-"+e.modes[this.viewMode].clsName).show()}};c.fn.datepickerBootstrap=function(a,b){return this.each(function(){var e=
c(this),d=e.data("datepicker"),j="object"===typeof a&&a;d||e.data("datepicker",d=new h(this,c.extend({},c.fn.datepickerBootstrap.defaults,j)));if("string"===typeof a)d[a](b)})};c.fn.datepickerBootstrap.defaults={onRender:function(){return""}};c.fn.datepickerBootstrap.Constructor=h;var e={modes:[{clsName:"days",navFnc:"Month",navStep:1},{clsName:"months",navFnc:"FullYear",navStep:1},{clsName:"years",navFnc:"FullYear",navStep:10}],dates:{days:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday Sunday".split(" "),
daysShort:"Sun Mon Tue Wed Thu Fri Sat Sun".split(" "),daysMin:"Su Mo Tu We Th Fr Sa Su".split(" "),months:"January February March April May June July August September October November December".split(" "),monthsShort:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ")},isLeapYear:function(a){return 0===a%4&&0!==a%100||0===a%400},getDaysInMonth:function(a,b){return[31,e.isLeapYear(a)?29:28,31,30,31,30,31,31,30,31,30,31][b]},parseFormat:function(a){var b=a.match(/[.\/\-\s].*?/),a=a.split(/\W+/);
if(!b||!a||0===a.length)throw Error("Invalid date format.");return{separator:b,parts:a}},parseDate:function(a,b){var c=a.split(b.separator),a=new Date,d;a.setHours(0);a.setMinutes(0);a.setSeconds(0);a.setMilliseconds(0);if(c.length===b.parts.length){for(var e=a.getFullYear(),f=a.getDate(),h=a.getMonth(),i=0,k=b.parts.length;i<k;i++)switch(d=parseInt(c[i],10)||1,b.parts[i]){case "dd":case "d":f=d;a.setDate(d);break;case "mm":case "m":h=d-1;a.setMonth(d-1);break;case "yy":e=2E3+d;a.setFullYear(2E3+
d);break;case "yyyy":e=d,a.setFullYear(d)}a=new Date(e,h,f,0,0,0)}return a},formatDate:function(a,b){var c={d:a.getDate(),m:a.getMonth()+1,yy:a.getFullYear().toString().substring(2),yyyy:a.getFullYear()};c.dd=(10>c.d?"0":"")+c.d;c.mm=(10>c.m?"0":"")+c.m;for(var a=[],d=0,e=b.parts.length;d<e;d++)a.push(c[b.parts[d]]);return a.join(b.separator)},headTemplate:'<thead><tr><th class="prev">&lsaquo;</th><th colspan="5" class="switch"></th><th class="next">&rsaquo;</th></tr></thead>',contTemplate:'<tbody><tr><td colspan="7"></td></tr></tbody>'};
e.template='<div class="datepicker dropdown-menu"><div class="datepicker-days"><table class=" table-condensed">'+e.headTemplate+'<tbody></tbody></table></div><div class="datepicker-months"><table class="table-condensed">'+e.headTemplate+e.contTemplate+'</table></div><div class="datepicker-years"><table class="table-condensed">'+e.headTemplate+e.contTemplate+"</table></div></div>"}(window.jQuery);(function(d,e){var c,b;d.uaMatch=function(a){var a=a.toLowerCase(),b=/(chrome)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||0>a.indexOf("compatible")&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[],a=/(ipad)/.exec(a)||/(iphone)/.exec(a)||/(android)/.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0",platform:a[0]||""}};c=d.uaMatch(e.navigator.userAgent);b={};c.browser&&(b[c.browser]=!0,b.version=c.version);c.platform&&
(b[c.platform]=!0);b.chrome?b.webkit=!0:b.webkit&&(b.safari=!0);d.browser=b})(jQuery,window);var jaaulde=window.jaaulde||{};jaaulde.utils=jaaulde.utils||{};
jaaulde.utils.cookies=function(){var f,h,d,e,b={expiresAt:null,path:"/",domain:null,secure:!1};f=function(a){var c,g;if("object"!==typeof a||null===a)c=b;else if(c={expiresAt:b.expiresAt,path:b.path,domain:b.domain,secure:b.secure},"object"===typeof a.expiresAt&&a.expiresAt instanceof Date?c.expiresAt=a.expiresAt:"number"===typeof a.hoursToLive&&0!==a.hoursToLive&&(g=new Date,g.setTime(g.getTime()+36E5*a.hoursToLive),c.expiresAt=g),"string"===typeof a.path&&""!==a.path&&(c.path=a.path),"string"===
typeof a.domain&&""!==a.domain&&(c.domain=a.domain),!0===a.secure)c.secure=a.secure;return c};h=function(a){a=f(a);return("object"===typeof a.expiresAt&&a.expiresAt instanceof Date?"; expires="+a.expiresAt.toGMTString():"")+"; path="+a.path+("string"===typeof a.domain?"; domain="+a.domain:"")+(!0===a.secure?"; secure":"")};d=function(){var a={},c,g,d,b,e=document.cookie.split(";"),f;for(c=0;c<e.length;c+=1){g=e[c].split("=");d=g[0].replace(/^\s*/,"").replace(/\s*$/,"");try{b=decodeURIComponent(g[1])}catch(h){b=
g[1]}if("object"===typeof JSON&&null!==JSON&&"function"===typeof JSON.parse)try{f=b,b=JSON.parse(b)}catch(i){b=f}a[d]=b}return a};e=function(){};e.prototype.get=function(a){var c,g,b=d();if("string"===typeof a)c="undefined"!==typeof b[a]?b[a]:null;else if("object"===typeof a&&null!==a)for(g in c={},a)c[a[g]]="undefined"!==typeof b[a[g]]?b[a[g]]:null;else c=b;return c};e.prototype.filter=function(a){var c,b={},e=d();"string"===typeof a&&(a=RegExp(a));for(c in e)c.match(a)&&(b[c]=e[c]);return b};e.prototype.set=
function(a,c,b){if("object"!==typeof b||null===b)b={};if("undefined"===typeof c||null===c)c="",b.hoursToLive=-8760;else if("string"!==typeof c)if("object"===typeof JSON&&null!==JSON&&"function"===typeof JSON.stringify)c=JSON.stringify(c);else throw Error("cookies.set() received non-string value and could not serialize.");b=h(b);document.cookie=a+"="+encodeURIComponent(c)+b};e.prototype.del=function(a,c){var b={},d;if("object"!==typeof c||null===c)c={};"boolean"===typeof a&&!0===a?b=this.get():"string"===
typeof a&&(b[a]=!0);for(d in b)"string"===typeof d&&""!==d&&this.set(d,null,c)};e.prototype.test=function(){var a=!1;this.set("cT","data");"data"===this.get("cT")&&(this.del("cT"),a=!0);return a};e.prototype.setOptions=function(a){"object"!==typeof a&&(a=null);b=f(a)};return new e}();
(function(){if(window.jQuery){var f=window.jQuery;f.cookies=jaaulde.utils.cookies;f.each({cookify:function(h){return this.each(function(){var d,e=["name","id"],b,a=f(this),c;for(d in e)if(!isNaN(d)&&(b=a.attr(e[d]),"string"===typeof b&&""!==b)){a.is(":checkbox, :radio")?a.attr("checked")&&(c=a.val()):c=a.is(":input")?a.val():a.html();if("string"!==typeof c||""===c)c=null;f.cookies.set(b,c,h);break}})},cookieFill:function(){return this.each(function(){var h,d,e=["name","id"],b,a=f(this);for(d=function(){h=
e.pop();return!!h};d();)if(b=a.attr(h),"string"===typeof b&&""!==b){d=f.cookies.get(b);null!==d&&(a.is(":checkbox, :radio")?a.val()===d?a.attr("checked","checked"):a.removeAttr("checked"):a.is(":input")?a.val(d):a.html(d));break}})},cookieBind:function(h){return this.each(function(){var d=f(this);d.cookieFill().change(function(){d.cookify(h)})})}},function(h){f.fn[h]=this})}})();(function(c){c(window.jQuery,window,document)})(function(c,i,q){c.widget("selectBox.selectBoxIt",{VERSION:"3.5.0",options:{showEffect:"none",showEffectOptions:{},showEffectSpeed:"medium",hideEffect:"none",hideEffectOptions:{},hideEffectSpeed:"medium",showFirstOption:!0,defaultText:"",defaultIcon:"",downArrowIcon:"",theme:"default",keydownOpen:!0,isMobile:function(){return/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/.test(navigator.userAgent||navigator.vendor||i.opera)},"native":!1,
aggressiveChange:!1,selectWhenHidden:!0,viewport:c(i),similarSearch:!1,copyAttributes:["title","rel"],copyClasses:"button",nativeMousedown:!1,customShowHideEvent:!1,autoWidth:!0,html:!0,populate:"",dynamicPositioning:!0},getThemes:function(){var a=c(this.element).attr("data-theme")||"c";return{bootstrap:{focus:"active",hover:"",enabled:"enabled",disabled:"disabled",arrow:"caret",button:"btn",list:"dropdown-menu",container:"bootstrap",open:"open"},jqueryui:{focus:"ui-state-focus",hover:"ui-state-hover",
enabled:"ui-state-enabled",disabled:"ui-state-disabled",arrow:"ui-icon ui-icon-triangle-1-s",button:"ui-widget ui-state-default",list:"ui-widget ui-widget-content",container:"jqueryui",open:"selectboxit-open"},jquerymobile:{focus:"ui-btn-down-"+a,hover:"ui-btn-hover-"+a,enabled:"ui-enabled",disabled:"ui-disabled",arrow:"ui-icon ui-icon-arrow-d ui-icon-shadow",button:"ui-btn ui-btn-icon-right ui-btn-corner-all ui-shadow ui-btn-up-"+a,list:"ui-btn ui-btn-icon-right ui-btn-corner-all ui-shadow ui-btn-up-"+
a,container:"jquerymobile",open:"selectboxit-open"},"default":{focus:"selectboxit-focus",hover:"selectboxit-hover",enabled:"selectboxit-enabled",disabled:"selectboxit-disabled",arrow:"selectboxit-default-arrow",button:"selectboxit-btn",list:"selectboxit-list",container:"selectboxit-container",open:"selectboxit-open"}}},_create:function(a){var b=this.options.populate;if(this.element.is("select"))return this.widgetProto=c.Widget.prototype,this.originalElem=this.element[0],this.selectBox=this.element,
this.options.populate&&(this.add&&!a)&&(c.isFunction(b)?this.add(b.call()):this.add(b)),this.selectItems=this.element.find("option"),this.firstSelectItem=this.selectItems.slice(0,1),this.documentHeight=c(q).height(),this.theme=this.getThemes()[this.options.theme]||this.getThemes()["default"],this.currentFocus=0,this.blur=!0,this.textArray=[],this.currentIndex=0,this.currentText="",this.flipped=!1,a||(this.selectBoxStyles=this.selectBox.attr("style")),this.element.hide(),this._createDropdownButton()._createUnorderedList()._copyAttributes()._replaceSelectBox()._addClasses(this.theme)._eventHandlers(),
this.originalElem.disabled&&this.disable&&this.disable(),this._ariaAccessibility&&this._ariaAccessibility(),this._mobile&&this._mobile(),this.options["native"]&&this._applyNativeSelect(),this.triggerEvent("create"),this},_createDropdownButton:function(){var a=this.originalElemId=this.originalElem.id||"",b=this.originalElemValue=this.originalElem.value||"",d=this.originalElemName=this.originalElem.name||"",e=this.options.copyClasses,h=this.selectBox.attr("class")||"";this.dropdownText=c("<span/>",
{id:a&&a+"SelectBoxItText","class":"selectboxit-text",unselectable:"on",text:this.firstSelectItem.text()}).attr("data-val",b);this.dropdownImageContainer=c("<span/>",{"class":"selectboxit-option-icon-container"});this.dropdownImage=c("<i/>",{id:a&&a+"SelectBoxItDefaultIcon","class":"selectboxit-default-icon",unselectable:"on"});this.dropdown=c("<span/>",{id:a&&a+"SelectBoxIt","class":"selectboxit "+("button"===e?h:"")+" "+(this.selectBox.prop("disabled")?this.theme.disabled:this.theme.enabled),name:d,
tabindex:this.selectBox.attr("tabindex")||"0",unselectable:"on"}).append(this.dropdownImageContainer.append(this.dropdownImage)).append(this.dropdownText);this.dropdownContainer=c("<span/>",{id:a&&a+"SelectBoxItContainer","class":"selectboxit-container "+("container"===e?h:"")}).append(this.dropdown);return this},_createUnorderedList:function(){var a=this,b,d,e,h,g,f,k,j="",l=a.originalElemId||"",l=c("<ul/>",{id:l&&l+"SelectBoxItOptions","class":"selectboxit-options",tabindex:-1}),o,p,m,n;a.options.showFirstOption||
(a.selectItems=a.selectBox.find("option").slice(1));a.selectItems.each(function(l){e=d="";b=c(this).prop("disabled");h=c(this).attr("data-icon")||"";f=(g=c(this).attr("data-iconurl")||"")?"selectboxit-option-icon-url":"";k=g?"style=\"background-image:url('"+g+"');\"":"";o=c(this).attr("data-selectedtext");m=(p=c(this).attr("data-text"))?p:c(this).text();n=c(this).parent();if(n.is("optgroup")){d="selectboxit-optgroup-option";c(this).index()===0&&(e='<span class="selectboxit-optgroup-header '+n.first().attr("class")+
'"data-disabled="true">'+n.first().attr("label")+"</span>")}j=j+(e+'<li id="'+l+'" data-val="'+this.value+'" data-disabled="'+b+'" class="'+d+" selectboxit-option "+(c(this).attr("class")||"")+'"><a class="selectboxit-option-anchor"><span class="selectboxit-option-icon-container"><i class="selectboxit-option-icon '+h+" "+(f||a.theme.container)+'"'+k+"></i></span>"+(a.options.html?m:a.htmlEscape(m))+"</a></li>");a.textArray[l]=b?"":m;if(this.selected){a._setText(a.dropdownText,o||m);a.currentFocus=
l}});if(a.options.defaultText||a.selectBox.attr("data-text")){var i=a.options.defaultText||a.selectBox.attr("data-text");a._setText(a.dropdownText,i);a.options.defaultText=i}l.append(j);a.list=l;a.dropdownContainer.append(a.list);a.listItems=a.list.find("li");a.listAnchors=a.list.find("a");a.listItems.first().addClass("selectboxit-option-first");a.listItems.last().addClass("selectboxit-option-last");a.list.find("li[data-disabled='true']").not(".optgroupHeader").addClass(a.theme.disabled);a.dropdownImage.addClass(a.selectBox.attr("data-icon")||
a.options.defaultIcon||a.listItems.eq(a.currentFocus).find("i").attr("class"));a.dropdownImage.attr("style",a.listItems.eq(a.currentFocus).find("i").attr("style"));return a},_replaceSelectBox:function(){var a=this.originalElem.id||"",b=this.selectBox.attr("size"),b=this.listSize=void 0===b?"auto":"0"===b?"auto":+b;this.selectBox.css("display","none").after(this.dropdownContainer);this.dropdown.height();this.downArrow=c("<i/>",{id:a&&a+"SelectBoxItArrow","class":"selectboxit-arrow",unselectable:"on"});
this.downArrowContainer=c("<span/>",{id:a&&a+"SelectBoxItArrowContainer","class":"selectboxit-arrow-container",unselectable:"on"}).append(this.downArrow);this.dropdown.append(this.downArrowContainer);this.listItems.removeClass("selectboxit-selected").eq(this.currentFocus).addClass("selectboxit-selected");this._realOuterWidth(this.dropdownImageContainer)||this.dropdownImageContainer.remove();this.options.autoWidth&&(this.dropdown.is(":visible")?this.dropdown.css({width:"auto"}).css({width:this.list.outerWidth(!0)+
this.downArrowContainer.outerWidth(!0)+this.dropdownImage.outerWidth(!0)}):this.dropdown.css({width:"auto"}).css({width:this._realOuterWidth(this.list)+this._realOuterWidth(this.downArrowContainer)+this._realOuterWidth(this.dropdownImage)}),this.list.css({"min-width":this.dropdown.width()}));this.dropdownText.css({"max-width":this.dropdownContainer.width()-(this.downArrowContainer.outerWidth(!0)+this.dropdownImage.outerWidth(!0))});"number"===c.type(b)&&(this.maxHeight=this.listAnchors.outerHeight(!0)*
b);return this},_scrollToView:function(a){var b=this.listItems.eq(this.currentFocus),d=this.list.scrollTop(),c=b.height(),b=b.position().top,h=Math.abs(b),g=this.list.height();"search"===a?g-b<c?this.list.scrollTop(d+(b-(g-c))):-1>b&&this.list.scrollTop(b-c):"up"===a?-1>b&&this.list.scrollTop(d-h):"down"===a&&g-b<c&&this.list.scrollTop(d+(h-g+c));return this},_callbackSupport:function(a){c.isFunction(a)&&a.call(this,this.dropdown);return this},_setText:function(a,b){this.options.html?a.html(b):a.text(b);
return this},open:function(a){var b=this,c=b.options.showEffect,e=b.options.showEffectSpeed,h=b.options.showEffectOptions,g=b.options["native"],f=b.options.isMobile();if(!b.listItems.length||b.dropdown.hasClass(b.theme.disabled))return b;if(!g&&!f&&!this.list.is(":visible")){b.triggerEvent("open");b._dynamicPositioning&&b.options.dynamicPositioning&&b._dynamicPositioning();if("none"===c)b.list.show();else if("show"===c||"slideDown"===c||"fadeIn"===c)b.list[c](e);else b.list.show(c,h,e);b.list.promise().done(function(){b._scrollToView("search")})}b._callbackSupport(a);
return b},close:function(a){var b=this.options.hideEffect,c=this.options.hideEffectSpeed,e=this.options.hideEffectOptions,h=this.options["native"],g=this.options.isMobile();if(!h&&!g&&this.list.is(":visible"))if(this.triggerEvent("close"),"none"===b)this.list.hide();else if("hide"===b||"slideUp"===b||"fadeOut"===b)this.list[b](c);else this.list.hide(b,e,c);this._callbackSupport(a);return this},toggle:function(){var a=this.list.is(":visible");a?this.close():a||this.open()},_keyMappings:{38:"up",40:"down",
13:"enter",8:"backspace",9:"tab",32:"space",27:"esc"},_keydownMethods:function(){var a=this,b=a.list.is(":visible")||!a.options.keydownOpen;return{down:function(){a.moveDown&&b&&a.moveDown()},up:function(){a.moveUp&&b&&a.moveUp()},enter:function(){var b=a.listItems.eq(a.currentFocus);a._update(b);"true"!==b.attr("data-preventclose")&&a.close();a.triggerEvent("enter")},tab:function(){a.triggerEvent("tab-blur");a.close()},backspace:function(){a.triggerEvent("backspace")},esc:function(){a.close()}}},
_eventHandlers:function(){var a=this,b=a.options.nativeMousedown,d=a.options.customShowHideEvent,e,h,g=a.focusClass,f=a.hoverClass,k=a.openClass;this.dropdown.on({"click.selectBoxIt":function(){a.dropdown.trigger("focus",!0);a.originalElem.disabled||(a.triggerEvent("click"),!b&&!d&&a.toggle())},"mousedown.selectBoxIt":function(){c(this).data("mdown",!0);a.triggerEvent("mousedown");b&&!d&&a.toggle()},"mouseup.selectBoxIt":function(){a.triggerEvent("mouseup")},"blur.selectBoxIt":function(){a.blur&&
(a.triggerEvent("blur"),a.close(),c(this).removeClass(g))},"focus.selectBoxIt":function(b,d){var e=c(this).data("mdown");c(this).removeData("mdown");!e&&!d&&setTimeout(function(){a.triggerEvent("tab-focus")},0);d||(c(this).hasClass(a.theme.disabled)||c(this).addClass(g),a.triggerEvent("focus"))},"keydown.selectBoxIt":function(b){var c=a._keyMappings[b.keyCode],d=a._keydownMethods()[c];d&&(d(),a.options.keydownOpen&&("up"===c||"down"===c)&&a.open());d&&"tab"!==c&&b.preventDefault()},"keypress.selectBoxIt":function(b){var c=
a._keyMappings[b.charCode||b.keyCode],d=String.fromCharCode(b.charCode||b.keyCode);a.search&&(!c||c&&"space"===c)&&a.search(d,!0,!0);"space"===c&&b.preventDefault()},"mouseenter.selectBoxIt":function(){a.triggerEvent("mouseenter")},"mouseleave.selectBoxIt":function(){a.triggerEvent("mouseleave")}});a.list.on({"mouseover.selectBoxIt":function(){a.blur=!1},"mouseout.selectBoxIt":function(){a.blur=!0},"focusin.selectBoxIt":function(){a.dropdown.trigger("focus",!0)}});a.list.on({"click.selectBoxIt":function(){a._update(c(this));
a.triggerEvent("option-click");"false"===c(this).attr("data-disabled")&&"true"!==c(this).attr("data-preventclose")&&a.close()},"focusin.selectBoxIt":function(){a.listItems.not(c(this)).removeAttr("data-active");c(this).attr("data-active","");var b=a.list.is(":hidden");(a.options.searchWhenHidden&&b||a.options.aggressiveChange||b&&a.options.selectWhenHidden)&&a._update(c(this));c(this).add(c(this).find(".selectboxit-option-anchor")).addClass(g)},"mouseup.selectBoxIt":function(){b&&!d&&(a._update(c(this)),
a.triggerEvent("option-mouseup"),"false"===c(this).attr("data-disabled")&&"true"!==c(this).attr("data-preventclose")&&a.close())},"mouseenter.selectBoxIt":function(){"false"===c(this).attr("data-disabled")&&(a.listItems.removeAttr("data-active"),c(this).addClass(g).attr("data-active",""),a.listItems.not(c(this)).add(a.listAnchors.not(c(this).find(".selectboxit-option-anchor"))).removeClass(g),c(this).add(c(this).find(".selectboxit-option-anchor")).addClass(g),a.currentFocus=+c(this).attr("id"))},
"mouseleave.selectBoxIt":function(){"false"===c(this).attr("data-disabled")&&(a.listItems.not(c(this)).removeClass(g).removeAttr("data-active"),c(this).add(c(this).find(".selectboxit-option-anchor")).addClass(g),a.currentFocus=+c(this).attr("id"))},"blur.selectBoxIt":function(){c(this).add(c(this).find(".selectboxit-option-anchor")).removeClass(g)}},".selectboxit-option");a.selectBox.on({"change.selectBoxIt, internal-change.selectBoxIt":function(b,c){var d,g;c||(d=a.list.find('li[data-val="'+a.originalElem.value+
'"]'),d.length&&(a.listItems.eq(a.currentFocus).removeClass(a.focusClass),a.currentFocus=+d.attr("id")));d=a.listItems.eq(a.currentFocus);g=d.attr("data-selectedtext");h=(e=d.attr("data-text"))?e:d.find("a").text();a._setText(a.dropdownText,g||h);a.dropdownText.attr("data-val",a.originalElem.value);d.find("i").attr("class")&&(a.dropdownImage.attr("class",d.find("i").attr("class")).addClass("selectboxit-default-icon"),a.dropdownImage.attr("style",d.find("i").attr("style")));a.triggerEvent("changed")},
"disable.selectBoxIt":function(){a.dropdown.addClass(a.theme.disabled)},"enable.selectBoxIt":function(){a.dropdown.removeClass(a.theme.disabled)},"open.selectBoxIt":function(){var b=a.list.find("li[data-val='"+a.dropdownText.attr("data-val")+"']");b.length||(b=0===a.currentFocus&&!a.options.showFirstOption&&a.listItems.eq(0).hasClass(a.theme.disabled)?a.listItems.not("[data-disabled=true]").first():a.listItems.first());a.currentFocus=+b.attr("id");b=a.listItems.eq(a.currentFocus);a.dropdown.addClass(k).removeClass(f).addClass(g);
a.listItems.removeClass(a.selectedClass).removeAttr("data-active").not(b).add(a.listAnchors.not(b.find(".selectboxit-option-anchor"))).removeClass(g);b.addClass(a.selectedClass).add(b.find(".selectboxit-option-anchor")).addClass(g)},"close.selectBoxIt":function(){a.dropdown.removeClass(k)},"blur.selectBoxIt":function(){a.dropdown.removeClass(g)},"mouseenter.selectBoxIt":function(){c(this).hasClass(a.theme.disabled)||a.dropdown.addClass(f)},"mouseleave.selectBoxIt":function(){a.dropdown.removeClass(f)}});
return a},_update:function(a){var b,c=this.options.defaultText||this.selectBox.attr("data-text"),e=this.listItems.eq(this.currentFocus);"false"===a.attr("data-disabled")&&(this.listItems.eq(this.currentFocus).attr("data-selectedtext"),(b=e.attr("data-text"))||e.text(),(c&&this.options.html?this.dropdownText.html()===c:this.dropdownText.text()===c)&&this.selectBox.val()===a.attr("data-val")?this.triggerEvent("change"):(this.selectBox.val(a.attr("data-val")),this.currentFocus=+a.attr("id"),this.originalElem.value!==
this.dropdownText.attr("data-val")&&this.triggerEvent("change")))},_addClasses:function(a){this.focusClass=a.focus;this.hoverClass=a.hover;var b=a.button,c=a.list,e=a.arrow,h=a.container;this.openClass=a.open;this.selectedClass="selectboxit-selected";this.downArrow.addClass(this.selectBox.attr("data-downarrow")||this.options.downArrowIcon||e);this.dropdownContainer.addClass(h);this.dropdown.addClass(b);this.list.addClass(c);return this},refresh:function(a){this._destroySelectBoxIt()._create(!0)._callbackSupport(a).triggerEvent("refresh");
return this},htmlEscape:function(a){return String(a).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},triggerEvent:function(a){this.selectBox.trigger(a,{selectbox:this.selectBox,selectboxOption:this.selectItems.eq(this.options.showFirstOption?this.currentFocus:0<=this.currentFocus-1?this.currentFocus:0),dropdown:this.dropdown,dropdownOption:this.listItems.eq(this.currentFocus)});return this},_copyAttributes:function(){this._addSelectBoxAttributes&&
this._addSelectBoxAttributes();return this},_realOuterWidth:function(a){if(a.is(":visible"))return a.outerWidth(!0);var a=a.clone(),b;a.css({visibility:"hidden",display:"block",position:"absolute"}).appendTo("body");b=a.outerWidth(!0);a.remove();return b}});var f=c.selectBox.selectBoxIt.prototype;f.add=function(a,b){var d=c.type(a),e=0,h,g=[],f=(h=this._isJSON(a))&&this._parseJSON(a);if(a&&("array"===d||h&&f.data&&"array"===c.type(f.data))||"object"===d&&a.data&&"array"===c.type(a.data)){this._isJSON(a)&&
(a=f);a.data&&(a=a.data);e;for(h=a.length;e<=h-1;e+=1)d=a[e],c.isPlainObject(d)?g.push(c("<option/>",d)):"string"===c.type(d)&&g.push(c("<option/>",{text:d,value:d}));this.selectBox.append(g)}else a&&"string"===d&&!this._isJSON(a)?this.selectBox.append(a):a&&"object"===d?this.selectBox.append(c("<option/>",a)):a&&(this._isJSON(a)&&c.isPlainObject(this._parseJSON(a)))&&this.selectBox.append(c("<option/>",this._parseJSON(a)));this.dropdown&&this.refresh();this._callbackSupport(b);return this};f._parseJSON=
function(a){return JSON&&JSON.parse&&JSON.parse(a)||c.parseJSON(a)};f._isJSON=function(a){try{return this._parseJSON(a),!0}catch(b){return!1}};f._ariaAccessibility=function(){var a=this;a.dropdown.attr({role:"combobox","aria-autocomplete":"list","aria-expanded":"false","aria-owns":a.list.attr("id"),"aria-activedescendant":a.listItems.eq(a.currentFocus).length?a.listItems.eq(a.currentFocus)[0].id:"","aria-label":c("label[for='"+a.originalElem.id+"']").text()||"","aria-live":"assertive"}).on({"disable.selectBoxIt":function(){a.dropdown.attr("aria-disabled",
"true")},"enable.selectBoxIt":function(){a.dropdown.attr("aria-disabled","false")}});a.list.attr({role:"listbox","aria-hidden":"true"});a.listItems.attr({role:"option"});a.selectBox.on({"change.selectBoxIt":function(){a.dropdownText.attr("aria-label",a.originalElem.value)},"open.selectBoxIt":function(){a.list.attr("aria-hidden","false");a.dropdown.attr("aria-expanded","true")},"close.selectBoxIt":function(){a.list.attr("aria-hidden","true");a.dropdown.attr("aria-expanded","false")}});return a};f._addSelectBoxAttributes=
function(){var a=this;a._addAttributes(a.selectBox.prop("attributes"),a.dropdown);a.selectItems.each(function(b){a._addAttributes(c(this).prop("attributes"),a.listItems.eq(b))});return a};f._addAttributes=function(a,b){var d=this.options.copyAttributes;a.length&&c.each(a,function(a,h){var g=h.name.toLowerCase(),f=h.value;"null"!==f&&(-1!==c.inArray(g,d)||-1!==g.indexOf("data"))&&b.attr(g,f)});return this};f.destroy=function(a){this._destroySelectBoxIt();this.widgetProto.destroy.call(this);this._callbackSupport(a);
return this};f._destroySelectBoxIt=function(){this.dropdown.off(".selectBoxIt");c.contains(this.dropdownContainer[0],this.originalElem)&&this.dropdownContainer.before(this.selectBox);this.dropdownContainer.remove();this.selectBox.removeAttr("style").attr("style",this.selectBoxStyles).show();this.triggerEvent("destroy");return this};f.disable=function(a){this.options.disabled||(this.close(),this.selectBox.attr("disabled","disabled"),this.dropdown.removeAttr("tabindex").removeClass(this.theme.enabled).addClass(this.theme.disabled),
this.setOption("disabled",!0),this.triggerEvent("disable"));this._callbackSupport(a);return this};f.disableOption=function(a,b){var d,e;"number"===c.type(a)&&(this.close(),d=this.selectBox.find("option").eq(a),this.triggerEvent("disable-option"),d.attr("disabled","disabled"),this.listItems.eq(a).attr("data-disabled","true").addClass(this.theme.disabled),this.currentFocus===a&&(d=this.listItems.eq(this.currentFocus).nextAll("li").not("[data-disabled='true']").first().length,e=this.listItems.eq(this.currentFocus).prevAll("li").not("[data-disabled='true']").first().length,
d?this.moveDown():e?this.moveUp():this.disable()));this._callbackSupport(b);return this};f._isDisabled=function(){this.originalElem.disabled&&this.disable();return this};f._dynamicPositioning=function(){if("number"===c.type(this.listSize))this.list.css("max-height",this.maxHeight||"none");else{var a=this.dropdown.offset().top,b=this.list.data("max-height")||this.list.outerHeight(),d=this.dropdown.outerHeight(),e=this.options.viewport,f=e.height(),e=c.isWindow(e.get(0))?e.scrollTop():e.offset().top,
g=!(a+d+b<=f+e);this.list.data("max-height")||this.list.data("max-height",this.list.outerHeight());g?this.dropdown.offset().top-e>=b?(this.list.css("max-height",b),this.list.css("top",this.dropdown.position().top-this.list.outerHeight())):(a=Math.abs(a+d+b-(f+e)),f=Math.abs(this.dropdown.offset().top-e-b),a<f?(this.list.css("max-height",b-a-d/2),this.list.css("top","auto")):(this.list.css("max-height",b-f-d/2),this.list.css("top",this.dropdown.position().top-this.list.outerHeight()))):(this.list.css("max-height",
b),this.list.css("top","auto"))}return this};f.enable=function(a){this.options.disabled&&(this.triggerEvent("enable"),this.selectBox.removeAttr("disabled"),this.dropdown.attr("tabindex",0).removeClass(this.theme.disabled).addClass(this.theme.enabled),this.setOption("disabled",!1),this._callbackSupport(a));return this};f.enableOption=function(a,b){var d;"number"===c.type(a)&&(d=this.selectBox.find("option").eq(a),this.triggerEvent("enable-option"),d.removeAttr("disabled"),this.listItems.eq(a).attr("data-disabled",
"false").removeClass(this.theme.disabled));this._callbackSupport(b);return this};f.moveDown=function(a){this.currentFocus+=1;var b="true"===this.listItems.eq(this.currentFocus).attr("data-disabled")?!0:!1,c=this.listItems.eq(this.currentFocus).nextAll("li").not("[data-disabled='true']").first().length;if(this.currentFocus===this.listItems.length)this.currentFocus-=1;else{if(b&&c){this.listItems.eq(this.currentFocus-1).blur();this.moveDown();return}b&&!c?this.currentFocus-=1:(this.listItems.eq(this.currentFocus-
1).blur().end().eq(this.currentFocus).focusin(),this._scrollToView("down"),this.triggerEvent("moveDown"))}this._callbackSupport(a);return this};f.moveUp=function(a){this.currentFocus-=1;var b="true"===this.listItems.eq(this.currentFocus).attr("data-disabled")?!0:!1,c=this.listItems.eq(this.currentFocus).prevAll("li").not("[data-disabled='true']").first().length;if(-1===this.currentFocus)this.currentFocus+=1;else{if(b&&c){this.listItems.eq(this.currentFocus+1).blur();this.moveUp();return}b&&!c?this.currentFocus+=
1:(this.listItems.eq(this.currentFocus+1).blur().end().eq(this.currentFocus).focusin(),this._scrollToView("up"),this.triggerEvent("moveUp"))}this._callbackSupport(a);return this};f._setCurrentSearchOption=function(a){if((this.options.aggressiveChange||this.options.selectWhenHidden||this.listItems.eq(a).is(":visible"))&&!0!==this.listItems.eq(a).data("disabled"))this.listItems.eq(this.currentFocus).blur(),this.currentFocus=this.currentIndex=a,this.listItems.eq(this.currentFocus).focusin(),this._scrollToView("search"),
this.triggerEvent("search");return this};f._searchAlgorithm=function(a,b){var c=!1,e,f,g,i,k=this.textArray,j=this.currentText;e=a;for(g=k.length;e<g;e+=1){i=k[e];for(f=0;f<g;f+=1)-1!==k[f].search(b)&&(c=!0,f=g);c||(j=this.currentText=this.currentText.charAt(this.currentText.length-1).replace(/[|()\[{.+*?$\\]/g,"\\$0"));b=RegExp(j,"gi");if(3>j.length){if(b=RegExp(j.charAt(0),"gi"),-1!==i.charAt(0).search(b)){this._setCurrentSearchOption(e);if(i.substring(0,j.length).toLowerCase()!==j.toLowerCase()||
this.options.similarSearch)this.currentIndex+=1;return!1}}else if(-1!==i.search(b))return this._setCurrentSearchOption(e),!1;if(i.toLowerCase()===this.currentText.toLowerCase())return this._setCurrentSearchOption(e),this.currentText="",!1}return!0};f.search=function(a,b,c){this.currentText=c?this.currentText+a.replace(/[|()\[{.+*?$\\]/g,"\\$0"):a.replace(/[|()\[{.+*?$\\]/g,"\\$0");this._searchAlgorithm(this.currentIndex,RegExp(this.currentText,"gi"))&&this._searchAlgorithm(0,this.currentText);this._callbackSupport(b);
return this};f._applyNativeSelect=function(){var a=this,b,c,e;a.dropdownContainer.append(a.selectBox);a.selectBox.css({display:"block",width:a.dropdown.outerWidth(),height:a.dropdown.outerHeight(),opacity:"0",position:"absolute",top:"0",left:"0",cursor:"pointer","z-index":"999999",margin:a.dropdown.css("margin"),padding:"0","-webkit-appearance":"menulist-button"}).on({"changed.selectBoxIt":function(){b=a.selectBox.find("option").filter(":selected");e=(c=b.attr("data-text"))?c:b.text();a._setText(a.dropdownText,
e);a.list.find('li[data-val="'+b.val()+'"]').find("i").attr("class")&&a.dropdownImage.attr("class",a.list.find('li[data-val="'+b.val()+'"]').find("i").attr("class")).addClass("selectboxit-default-icon")}})};f._mobile=function(){this.options.isMobile()&&this._applyNativeSelect();return this};f.remove=function(a,b){var d=c.type(a),e=0,f,g="";if("array"===d){e;for(f=a.length;e<=f-1;e+=1)d=a[e],"number"===c.type(d)&&(g=g.length?g+(", option:eq("+d+")"):g+("option:eq("+d+")"));this.selectBox.find(g).remove()}else"number"===
d?this.selectBox.find("option").eq(a).remove():this.selectBox.find("option").remove();this.dropdown&&this.refresh();this._callbackSupport(b);return this};f.selectOption=function(a,b){var d=c.type(a);"number"===d?this.selectBox.val(this.selectItems.eq(a).val()).change():"string"===d&&this.selectBox.val(a).change();this._callbackSupport(b);return this};f.setOption=function(a,b,d){var e=this.listItems.eq(0);"string"===c.type(a)&&(this.options[a]=b);"showFirstOption"===a&&!b?e.hide():"showFirstOption"===
a&&b?e.show():"defaultIcon"===a&&b?this.dropdownImage.attr("class",b+" selectboxit-arrow"):"downArrowIcon"===a&&b?this.downArrow.attr("class",b+" selectboxit-arrow"):"defaultText"===a&&this._setText(this.dropdownText,b);this._callbackSupport(d);return this};f.setOptions=function(a,b){var d=this.listItems.eq(0);c.isPlainObject(a)&&(this.options=c.extend({},this.options,a));this.options.showFirstOption?d.show():d.hide();this.options.defaultIcon&&this.dropdownImage.attr("class",this.options.defaultIcon+
" selectboxit-arrow");this.options.downArrowIcon&&this.downArrow.attr("class",this.options.downArrowIcon+" selectboxit-arrow");this.options.defaultText&&this._setText(this.dropdownText,this.options.defaultText);this._callbackSupport(b);return this};f.wait=function(a,b){this.widgetProto._delay.call(this,b,a);return this}});(function(c,e){var f=c(e);c.fn.lazyload=function(b){function a(){var b=0;g.each(function(){var a=c(this);if((!d.skip_invisible||a.is(":visible"))&&!c.abovethetop(this,d)&&!c.leftofbegin(this,d))if(!c.belowthefold(this,d)&&!c.rightoffold(this,d))a.trigger("appear"),b=0;else if(++b>d.failure_limit)return!1})}var g=this,d={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:e,data_attribute:"original",data_attribute_retina:"original2x",skip_invisible:!0,appear:null,load:null},i=1<e.devicePixelRatio;
b&&(void 0!==b.failurelimit&&(b.failure_limit=b.failurelimit,delete b.failurelimit),void 0!==b.effectspeed&&(b.effect_speed=b.effectspeed,delete b.effectspeed),c.extend(d,b));b=void 0===d.container||d.container===e?f:c(d.container);0===d.event.indexOf("scroll")&&b.bind(d.event,function(){return a()});this.each(function(){var b=this,a=c(b);b.loaded=!1;a.one("appear",function(){this.loaded||(d.appear&&d.appear.call(b,g.length,d),c("<img />").bind("load",function(){if(a.is("img"))a.hide(),a.attr("src",
a.data(d.data_attribute)),a[d.effect](d.effect_speed);else{var e=a.css("position"),f;"absolute"!==e&&("fixed"!==e&&"relative"!==e)&&a.css("position","relative");var h;i&&(h=a.data(d.data_attribute_retina));if(!i||!h)h=a.data(d.data_attribute);f=c("<div>").css({position:"absolute",top:0,left:0,height:a.height(),width:a.width(),backgroundImage:"url("+h+")",opacity:0});a.append(f);f.animate({opacity:1},d.effect_speed,function(){a.css("backgroundImage","url("+a.data(d.data_attribute)+")");f.remove()})}b.loaded=
!0;e=c.grep(g,function(a){return!a.loaded});g=c(e);d.load&&d.load.call(b,g.length,d)}).attr("src",a.data(d.data_attribute)))});0!==d.event.indexOf("scroll")&&a.bind(d.event,function(){b.loaded||a.trigger("appear")})});f.bind("resize",function(){a()});/iphone|ipod|ipad.*os 5/gi.test(navigator.appVersion)&&f.bind("pageshow",function(a){a.originalEvent&&a.originalEvent.persisted&&g.each(function(){c(this).trigger("appear")})});c(e).load(function(){a()});return this};c.belowthefold=function(b,a){return(void 0===
a.container||a.container===e?f.height()+f.scrollTop():c(a.container).offset().top+c(a.container).height())<=c(b).offset().top-a.threshold};c.rightoffold=function(b,a){return(void 0===a.container||a.container===e?f.width()+f.scrollLeft():c(a.container).offset().left+c(a.container).width())<=c(b).offset().left-a.threshold};c.abovethetop=function(b,a){return(void 0===a.container||a.container===e?f.scrollTop():c(a.container).offset().top)>=c(b).offset().top+a.threshold+c(b).height()};c.leftofbegin=function(b,
a){return(void 0===a.container||a.container===e?f.scrollLeft():c(a.container).offset().left)>=c(b).offset().left+a.threshold+c(b).width()};c.inviewport=function(b,a){return!c.rightoffold(b,a)&&!c.leftofbegin(b,a)&&!c.belowthefold(b,a)&&!c.abovethetop(b,a)};c.extend(c.expr[":"],{"below-the-fold":function(b){return c.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!c.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return c.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!c.rightoffold(b,
{threshold:0})},"in-viewport":function(b){return c.inviewport(b,{threshold:0})}})})(jQuery,window,document);(function(e){e(window.jQuery,window,document)})(function(e,n,m){function j(b,a,c,d){f.filter(":visible").addClass("hidden");f.filter(":nth-child("+(d+1)+")").removeClass("hidden");k(b,a,c)}function k(b,a){var c=i.find("li.active"),d=c.data("gaLbl");c.data("gaFired")&&(d+="/repeat");c.data("gaFired","true");jQuery.isFunction(a.gaMethod)&&a.gaMethod(d)}var h,i,l,f;e.widget("gd.wizardify",{namespace:"gd",VERSION:"1.0",options:{parentPage:m.location.href,callbacks:{onSlideLeft:e.noop(),onSlideRight:e.noop()},
gaMethod:null},_create:function(){var b=this,a=b.options,c=b.element;h=e(c);i=h.find(".steps");l=h.find(".wizard123Container");f=l.find(".wizard123Boxes");this._super();c.on({slideLeft:function(d,g){var e=g.toIndex;f.filter(":visible").addClass("hidden");f.filter(":nth-child("+(e+1)+")").removeClass("hidden");k(b,a,c);if(jQuery.isFunction(a.callbacks.onSlideLeft))a.callbacks.onSlideLeft()},slideRight:function(d,g){j(b,a,c,g.toIndex);if(jQuery.isFunction(a.callbacks.onSlideRight))a.callbacks.onSlideRight()},
"gotoNext skipThisEnableNext":function(){var d=i.find("li.active"),g=d.next();d.removeClass("active");g.addClass("enabled active");j(b,a,c,g.index())}});i.on("click","li.enabled",function(){var a=e(this),b=a.index(),c=f.filter(":visible").index();a.addClass("active");a.siblings(".active").removeClass("active");if(b==c)return!1;b>c?h.trigger("slideLeft",{toIndex:b}):h.trigger("slideRight",{toIndex:b})});return b},_init:function(){},_setOption:function(b,a){this._super("_setOption",b,a)},_destroy:function(){}})});/*-------------------------------------------------------------------------------------------------
  This plugin is based on the GAPJUMPER line example http://www.gapjumper.com/research/lines.html.
  Special thanks to its author!
  Author: Tiago do Bem 
  Date: March 2013
  URL: https://github.com/tbem/jquery.line
  The jQuery.line.js plugin is distributed under the GNU General Public License version 3 (GPLv3).
  -------------------------------------------------------------------------------------------------
*/ 

(function($) {

  var helpers = {
    createLine: function(x1, y1, x2, y2, options){
      
                  // Check if browser is Internet Exploder ;)
                  var isIE = navigator.userAgent.indexOf("MSIE") > -1;
                  if (x2 < x1){
                    var temp = x1;
                    x1 = x2;
                    x2 = temp;
                    temp = y1;
                    y1 = y2;
                    y2 = temp;
                  }
                  var line = document.createElement("div");
                  
                  
                  // Formula for the distance between two points
                  // http://www.mathopenref.com/coorddist.html
                  var length = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));

                  line.style.width = length + "px";
                  line.style.borderBottom = options.stroke + "px solid";
                  line.style.borderColor = options.color;
                  line.style.position = "absolute";
                  line.style.zIndex = options.zindex;

                  if(isIE){
                    line.style.top = (y2 > y1) ? y1 + "px" : y2 + "px";
                    line.style.left = x1 + "px";
                    var nCos = (x2-x1)/length;
                    var nSin = (y2-y1)/length;
                    line.style.filter = "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', M11=" + nCos + ", M12=" + -1*nSin + ", M21=" + nSin + ", M22=" + nCos + ")";
                  }else{
                    var angle = Math.atan((y2-y1)/(x2-x1));
                    line.style.top = y1 + 0.5*length*Math.sin(angle) + "px";
                    line.style.left = x1 - 0.5*length*(1 - Math.cos(angle)) + "px";
                    line.style.MozTransform = line.style.WebkitTransform = line.style.OTransform= "rotate(" + angle + "rad)";
                  }
                  return line;
                }
  }
  

  $.fn.line = function( x1, y1, x2, y2, options, callbacks) {
                return $(this).each(function(){
                  if($.isFunction(options)){
                      callback = options;
                      options = null;
                  }else{
                    callback = callbacks;
                  }
                  options = $.extend({}, $.fn.line.defaults, options);

                  $(this).append(helpers.createLine(x1,y1,x2,y2,options)).promise().done(function(){
                    if($.isFunction(callback)){
                      callback.call();
                    }
                  });

                
              });
  };
  $.fn.line.defaults = {  zindex : 10000,
                          color : '#000000',
                          stroke: "1",
                        };
})(jQuery);(function(b){b.fn.isChildOf=function(a){return"string"===typeof a?0<this.parents(a).length:0<=this.parents(a).index(a)}})(jQuery);(function(j){var e=function(b){return void 0!==b&&null!==b},x=j("head"),p={},r={callback:"C",url:location.href},f=function(b){var b=j.extend({},r,b),a=b.beforeSend,k=0;b.abort=function(){k=1};if(e(a)&&(!1===a(b,b)||k))return b;var f=b.success,g=b.complete,s=b.error,t=b.dataFilter,c=b.callbackParameter,m=b.callback,h=b.cache,n=b.pageCache,i=b.url,a=b.data,u=b.timeout,i=e(i)?i:"",a=e(a)?"string"==typeof a?a:j.param(a):"";e(c)&&(a+=(""==a?"":"&")+escape(c)+"=?");!h&&!n&&(a+=(""==a?"":"&")+"_"+(new Date).getTime()+
"=");c=i.split("?");""!=a&&(a=a.split("?"),(h=c.length-1)&&(c[h]+="&"+a.shift()),c=c.concat(a));a=c.length-2;0<a&&(c[a]+=m+c.pop());var o=c.join("?"),v=function(a){e(t)&&(a=t.apply(b,[a]));var d=b,a=[a,"success"];e(f)&&f.apply(d,a);d=b;a=[b,"success"];e(g)&&g.apply(d,a)},w=function(a){var d=b,c=[b,a];e(s)&&s.apply(d,c);d=b;a=[b,a];e(g)&&g.apply(d,a)},q=p[o];if(n&&e(q))return setTimeout(function(){e(q.s)?v(q.s):w("error")},0),b;setTimeout(function(){if(!k){var a=j("<iframe style='display:none' />").appendTo(x),
d=a[0],c=d.contentWindow||d.contentDocument,d=c.document,f,g,h=function(a,b){n&&!e(b)&&(p[o]="");f();w(e(b)?b:"error")},i=function(a){c[a]=void 0;try{delete c[a]}catch(b){}},l=m=="E"?"X":"E";if(!e(d)){d=c;c=d.getParentNode()}d.open();c[m]=function(a){k=1;n&&(p[o]={s:a});setTimeout(function(){f();v(a)},0)};c[l]=function(a){if(!a||a=="complete")k++||setTimeout(h,0)};b.abort=f=function(){clearTimeout(g);i(l);i(m);a.remove()};d.write(['<html><head><script src="',o,'" onload="',l,'()" onreadystatechange="',
l,'(this.readyState)"><\/script></head><body onload="',l,'()"></body></html>'].join(""));d.close();u>0&&(g=setTimeout(function(){!k&&h("","timeout")},u))}},0);return b};f.setup=function(b){j.extend(r,b)};j.jsonp=f})(jQuery);(function(d){function h(b){return"object"==typeof b?b:{top:b,left:b}}var l=d.scrollTo=function(b,c,a){d(window).scrollTo(b,c,a)};l.defaults={axis:"xy",duration:1.3<=parseFloat(d.fn.jquery)?0:1,limit:!0};l.window=function(){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){if(this.nodeName&&-1==d.inArray(this.nodeName.toLowerCase(),["iframe","#document","html","body"]))return this;var b=(this.contentWindow||this).document||this.ownerDocument||this;return/webkit/i.test(navigator.userAgent)||
"BackCompat"==b.compatMode?b.body:b.documentElement})};d.fn.scrollTo=function(b,c,a){"object"==typeof c&&(a=c,c=0);"function"==typeof a&&(a={onAfter:a});"max"==b&&(b=9E9);a=d.extend({},l.defaults,a);c=c||a.duration;a.queue=a.queue&&1<a.axis.length;a.queue&&(c/=2);a.offset=h(a.offset);a.over=h(a.over);return this._scrollable().each(function(){function n(e){i.animate(f,c,a.easing,e&&function(){e.call(this,b,a)})}if(b!=null){var j=this,i=d(j),e=b,m,f={},p=i.is("html,body");switch(typeof e){case "number":case "string":if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(e)){e=
h(e);break}e=d(e,this);if(!e.length)return;case "object":if(e.is||e.style)m=(e=d(e)).offset()}d.each(a.axis.split(""),function(b,d){var c=d=="x"?"Left":"Top",k=c.toLowerCase(),g="scroll"+c,h=j[g],o=l.max(j,d);if(m){f[g]=m[k]+(p?0:h-i.offset()[k]);if(a.margin){f[g]=f[g]-(parseInt(e.css("margin"+c))||0);f[g]=f[g]-(parseInt(e.css("border"+c+"Width"))||0)}f[g]=f[g]+(a.offset[k]||0);a.over[k]&&(f[g]=f[g]+e[d=="x"?"width":"height"]()*a.over[k])}else{c=e[k];f[g]=c.slice&&c.slice(-1)=="%"?parseFloat(c)/100*
o:c}a.limit&&/^\d+$/.test(f[g])&&(f[g]=f[g]<=0?0:Math.min(f[g],o));if(!b&&a.queue){h!=f[g]&&n(a.onAfterFirst);delete f[g]}});n(a.onAfter)}}).end()};l.max=function(b,c){var a="x"==c?"Width":"Height",h="scroll"+a;if(!d(b).is("html,body"))return b[h]-d(b)[a.toLowerCase()]();var a="client"+a,j=b.ownerDocument.documentElement,i=b.ownerDocument.body;return Math.max(j[h],i[h])-Math.min(j[a],i[a])}})(jQuery);(function(b){function m(e){b(e).contents().each(function(){if(3===this.nodeType&&this.data){var c,a,e,i,d=this.nodeValue,h=0;if(d&&!/^\s*$/.test(d)){d=d.replace(s,j+"$1").replace(t,"$1"+j).replace(u,j+"$1"+j);c=d.split(v);var d=d.replace(w,""),g=document.createDocumentFragment(),h=x.exec(d)[1].length;b.each(c,function(){a=this.length;if(!a)return!0;n.lastIndex=h+a;e=n.exec(d);var c=d.substr(h,a+e[1].length);if(c.length){var l=y.cloneNode(!1),b=z.cloneNode(!1),f=A.cloneNode(!1);l.appendChild(f);l.appendChild(b);
b.appendChild(document.createTextNode(c));f.appendChild(document.createTextNode(c));i=l}else i=null;null!==i&&g.appendChild(i);h=h+a+e[1].length});this.parentNode.replaceChild(g.cloneNode(!0),this)}return!0}c=b(this);if(1===this.nodeType&&(!c.hasClass(f)||!c.hasClass(f+"-original")||!c.hasClass(f+"-copy")))return m(this),!0})}function o(e){var c=p.exec(e),a;if(c&&"hsl"===c[1]){a=c[3];var b=c[4],f,d,h;a/=100;b/=100;0===a?b=h=a=255*b:(a=0.5>=b?b*(a+1):b+a-b*a,f=2*b-a,d=c[2]/360,b=k(f,a,d+1/3),h=k(f,
a,d),a=k(f,a,d-1/3));a=[b,h,a];c[2]=a[0];c[3]=a[1];c[4]=a[2]}return c?"#"+(16777216|c[2]<<16|c[3]<<8|c[4]).toString(16).substr(1):e}function q(b){return(b=p.exec(b))?void 0!==b[5]?b[5]:1:1}function k(b,c,a){0>a?a+=1:1<a&&(a-=1);return 255*(1>6*a?b+6*(c-b)*a:1>2*a?c:2>3*a?b+6*(c-b)*(2/3-a):b)}var B=/(-?\d+px|(?:hsl|rgb)a?\(.+?\)|#(?:[a-fA-F0-9]{3}){1,2}|0)/g,C=/(,)(?=(?:[^\)]|\([^\)]*\))*$)/,r=/^((?:rgb|hsl)a?|#)/,p=/(rgb|hsl)a?\(\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?(?:\s*,\s*([\.\d]+))?/,j="⁣",w=/\u2063/g,
s=/([\(\[\{])/g,t=/([\)\]\}%�\!\?\u2014])/g,u=/([\-\u2013])/g,v=/[\s\u2063]/,n=/(\s*)/g,x=/^(\s*)/,f="ui-text-shadow";b.fn.textshadow=function(e,c){"object"===typeof e&&!c&&(c=e,e=null);var a=c||{},j=!1===a.useStyle?!1:!0,i=a.numShadows||1;return a.destroy?this.each(function(){var a=b(this);a.find("."+f+"-copy").remove();a.find("."+f+"-original").unwrap().each(function(){b(this).replaceWith(this.childNodes)})}):this.each(function(){var a=b(this),c="."+f+"-copy",g;g=a.find(c);if(!g.length){m(this);
g=a.find(c)}if(j){var k=e;(!g.length||g[0].currentStyle)&&g.each(function(){for(var a=k||this.currentStyle["text-shadow"],c=b(this),d=this.parentNode,e=0;(!a||a==="none")&&d.nodeName!=="HTML";){a=d.currentStyle["text-shadow"];d=d.parentNode}if(!a||a==="none")return true;a=a.split(C);b.each(a,function(){if(this==",")return true;var a=this.match(B),b="inherit",d=1,g,h,i;if(r.test(a[0])){d=q(a[0]);b=o(a.shift())}else if(r.test(a[a.length-1])){d=q(a[a.length-1]);b=o(a.pop())}g=parseFloat(a[0]);h=parseFloat(a[1]);
a=a[2]!==void 0?parseFloat(a[2]):0;i=e==0?c:c.clone().prependTo(c.parent()).addClass(f+"-copy-"+(e+1)).removeClass(f+"-copy-1");i.css({color:b,left:g-a+"px",top:h-a+"px"});if(d<1||a>0)i[0].style.filter=[d<1?"progid:DXImageTransform.Microsoft.Alpha(opacity="+parseInt(d*100,10)+") ":"",a>0?"progid:DXImageTransform.Microsoft.Blur(pixelRadius="+a+")":""].join("");e++})})}else i>1&&g.filter(c+"-1").each(function(){for(var a=1,d=b(this.parentNode),e;a<i;){e=c+"-"+(a+1);if(!d.find(e).length){e=b(this.cloneNode(true)).addClass(e.substring(1)).removeClass(f+
"-copy-1");d.prepend(e)}a++}})})};var y=b('<span class="'+f+'" />')[0],z=b('<span class="'+f+'-original" />')[0],A=b('<span class="'+f+"-copy "+f+'-copy-1" />')[0]})(jQuery,this);(function(d){function g(b){b=b.tagName;return void 0!==b?h[b.toLowerCase()]:b}var h={a:"href",img:"src",form:"action",base:"href",script:"src",iframe:"src",link:"href"},i="source protocol authority userInfo user password host port relative path directory file query fragment".split(" "),j={anchor:"fragment"},k={strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/},
l=/(?:^|&|;)([^&=;]*)=?([^&;]*)/g,m=/(?:^|&|;)([^&=;]*)=?([^&;]*)/g;d.fn.url=function(b){var e="";this.length&&(e=d(this).attr(g(this[0]))||"");return d.url(e,b)};d.url=function(b,e){1===arguments.length&&!0===b&&(e=!0,b=void 0);for(var b=b||window.location.toString(),d=e||!1,f=decodeURI(b),d=k[d?"strict":"loose"].exec(f),c={attr:{},param:{},seg:{}},f=14;f--;)c.attr[i[f]]=d[f]||"";c.param.query={};c.param.fragment={};c.attr.query.replace(l,function(a,b,d){b&&(c.param.query[b]=d)});c.attr.fragment.replace(m,
function(a,b,d){b&&(c.param.fragment[b]=d)});c.seg.path=c.attr.path.replace(/^\/+|\/+$/g,"").split("/");c.seg.fragment=c.attr.fragment.replace(/^\/+|\/+$/g,"").split("/");c.attr.base=c.attr.host?c.attr.protocol+"://"+c.attr.host+(c.attr.port?":"+c.attr.port:""):"";return{data:c,attr:function(a){a=j[a]||a;return a!==void 0?this.data.attr[a]:this.data.attr},param:function(a){return a!==void 0?this.data.param.query[a]:this.data.param.query},fparam:function(a){return a!==void 0?this.data.param.fragment[a]:
this.data.param.fragment},segment:function(a){if(a===void 0)return this.data.seg.path;a=a<0?this.data.seg.path.length+a:a-1;return this.data.seg.path[a]},fsegment:function(a){if(a===void 0)return this.data.seg.fragment;a=a<0?this.data.seg.fragment.length+a:a-1;return this.data.seg.fragment[a]}}}})(jQuery);jQuery.fn.log=function(c){"function"===typeof console.log&&console.log("%s: %o",c,this);return this};
jQuery.fn.maxlength=function(c){this.filter("input,textarea").each(function(){var a=$(this),d=function(b,e){if(0<e&&b.value.length>e){var c=a.val().substr(0,e);a.val(c)}};a.attr("maxlength",c);a.keydown(function(b){var a=b.which,c=$(this).attr("maxlength");if(0<c&&(32<=a||13==a||10==a||8==a))if(this.value.length>=c&&(8!=a&&!(37<=a&&40>=a)&&!b.metaKey&&!b.ctrlKey)&&b.preventDefault(),d(this,c),86==a&&(b.metaKey||b.ctrlKey)){var f=this;setTimeout(function(){d(f,c)},10)}});a.bind("click blur focus change paste",
function(){var b=$(this).attr("maxlength");0<b&&this.value.length>b&&(b=a.val().substr(0,b),a.val(b))})});return this};$.extend({getUrlVars:function(){for(var c=[],a,d=window.location.href.slice(window.location.href.indexOf("?")+1).split("&"),b=0;b<d.length;b++)a=d[b].split("="),c.push(a[0]),c[a[0]]=a[1];return c},getUrlVar:function(c){return $.getUrlVars()[c]}});window.GD=window.GD||{};function id(a){return"string"==typeof a?(a=$("#"+a),0<a.size()?a.get(0):null):a}GD.runAfterBody=function(a,b){if(window.isBodyLoaded)try{a()}catch(c){Logger.error("Exception running function after body load with GD.runAfterBody: "+c)}else b=isNaN(b)?0:0>b?0:10<b?10:b-0,GD.runAfterBody.funcs.push({priority:b,afterBodyFunction:a})};GD.runAfterBody.sortPriorities=function(a,b){return b.priority-a.priority};GD.runAfterBody.funcs=[];
GD.runAfterBody.run=function(){window.isBodyLoaded=!0;GD.runAfterBody.funcs.sort(GD.runAfterBody.sortPriorities);for(var a=0;a<GD.runAfterBody.funcs.length;a+=1)GD.runAfterBody.runOneFunc(GD.runAfterBody.funcs[a].afterBodyFunction,a);delete GD.runAfterBody.funcs;delete GD.runAfterBody.runOneFunc;delete GD.runAfterBody.sortPriorities;delete GD.runAfterBody.run};
GD.runAfterBody.runOneFunc=function(a,b){try{a()}catch(c){Logger.error("Exception running function during loop "+b+" of GD.runAfterBody: "+c)}};GD.runOnFacebookLoad=function(a){if(window.isFacebookLoaded)try{a()}catch(b){Logger.error("Exception running function after Facebook load with GD.runOnFacebookLoad: "+b)}else GD.runOnFacebookLoad.funcs.push({afterFbFunction:a})};GD.runOnFacebookLoad.funcs=[];
GD.runOnFacebookLoad.run=function(){window.isFacebookLoaded=!0;for(var a=0;a<GD.runOnFacebookLoad.funcs.length;a+=1)GD.runOnFacebookLoad.runOneFunc(GD.runOnFacebookLoad.funcs[a].afterFbFunction,a);delete GD.runOnFacebookLoad.funcs;delete GD.runOnFacebookLoad.runOneFunc;delete GD.runOnFacebookLoad.run;Logger.info("GD.runOnFacebookLoad.run() completed.")};
GD.runOnFacebookLoad.runOneFunc=function(a,b){try{a()}catch(c){Logger.error("Exception running function during loop "+b+" of GD.runOnFacebookLoad: "+c)}};GD.runAfterLoad=function(a){GD.runAfterLoad.loaded?f():GD.runAfterLoad.funcs.push(a)};GD.runAfterLoad.funcs=[];GD.runAfterLoad.loaded=!1;
GD.runAfterLoad.run=function(){GD.wait(10).then(function(){for(var a=0;a<GD.runAfterLoad.funcs.length;a++)try{GD.runAfterLoad.funcs[a]()}catch(b){Logger.error("Exception running function during loop "+a+" of GD.runAfterLoad: "+b)}GD.runAfterLoad.loaded=!0;delete GD.runAfterLoad.funcs;delete GD.runAfterLoad.run})};window.addEventListener?window.addEventListener("load",GD.runAfterLoad.run,!1):window.attachEvent?window.attachEvent("onload",GD.runAfterLoad.run):window.onload=GD.runAfterLoad.run;
GD.Class=function(a){var b=a.hasOwnProperty("constructor")?a.constructor:function(){};a.constructor=b;b.prototype=a;return b};window.GD=window.GD||{};GD.dom=GD.dom||{};GD.dom.TRY="try {\n";GD.dom.CATCH="\n}\ncatch (e) {\nLogger.error(\"Exception during deferred script '{desc}' execution.  \" + e);\n}\n";GD.dom.getDocUrl=function(){return document.location.href};GD.dom.submitForm=function(a,b){var c=$(a);c.length&&(GD.dom.clearPage(null,b),c.submit());return!1};
GD.dom.clearPage=function(a,b){a||(a=".pageInsideContent");var c=$(a),d;1>c.length||(b=(b||"Loading...").trim(),d=$("#InterstitialDisplay"),d.find("p.message").html(b),$(document).prop("title",b+" | Glassdoor"),c.find("embed, object").css("visibility","hidden"),0<c.length&&(d=$("#InterstitialDisplay"),$("img",d),$("#ModalScreen, #GenericPopupOuterFrame").css("visibility","hidden"),c.css("visibility","hidden"),c.find("iframe").css("display","none"),$("#UserAlertDrawer").css("visibility","hidden"),
$("#UserAlertBar").css("visibility","hidden"),d=d.clone(!0).removeAttr("id"),c.after(d),d.show(),jQuery&&jQuery.scrollTo?jQuery.scrollTo({top:0,left:0,axis:"yx",easing:"easeInOutExpo",queue:!1}):window.scrollTo(0,1)))};GD.dom.clearWindowAndRedirect=function(a,b,c,d){if("string"===typeof a)try{GD.dom.clearPage(c,d)}catch(e){Logger.info("unable to clear the page for "+a)}finally{GD.wait().then(function(){GD.dom.loadUrl(a,b)})}};
GD.dom.clearPageAndRedirect=function(a,b,c){"string"===typeof a&&(GD.dom.clearPage(b,c),GD.wait().then(function(){GD.dom.loadUrl(a,"_top")}))};GD.dom.loadUrl=function(a,b){"string"!=typeof b&&(b="_self");"string"===typeof a&&(b?GD.dom.loadNewWindow(a,b):window.location.href=a);return!0};GD.dom.reloadPage=function(a,b){b&&GD.dom.clearPage();if(!a||0>a)a=1;GD.wait(a).then(function(){document.location.reload(!0)})};
GD.dom.loadNewWindow=function(a,b){if("string"!==typeof b||!b)b="_blank";var c=window.open(a,b);return c?(c.focus&&c.focus(),!1):!0};GD.dom.execDeferredScripts=function(a,b,c){a=b&&b.length&&b instanceof jQuery?b.find('script[type="'+a+'"]'):$('script[type="'+a+'"]');if(a.length){var d="";a.each(function(){var a=$(this),b=a.data("desc");b||(b="<unnamed>");d+="; "+GD.dom.TRY+a.text()+";"+GD.dom.CATCH.replace("{desc}",b);a.remove()});GD.dom.injectScript(d,"deferred")}"function"===typeof c&&c()};
GD.dom.loadScript=function(a,b){var c=document.createElement("script");c.src=a;c.async=c.defer=!0;"function"==typeof b&&(c.onload=c.onreadystatechange=function(){var a=c.readyState;if(!a||"loaded"==a||"complete"==a)c.onload=c.onreadystatechange=null,b()});document.getElementsByTagName("head")[0].appendChild(c)};GD.dom.injectScript=function(a,b){b||(b="exec");var c=$('<script data-type="'+b+'"><\/script>');c.text(a);$("head").append(c)};
GD.dom.getRadioValue=function(a){if(!a)return"";var b=a.length;if("undefined"==typeof b)return a.checked?a.value:"";for(var c=0;c<b;c++)if(a[c].checked)return a[c].value;return""};GD.dom.setRadioValue=function(a,b){if(a){var c=a.length;if("undefined"==typeof c)a.checked=a.value==b.toString();else for(var d=0;d<c;d++)a[d].checked=!1,a[d].value==b.toString()&&(a[d].checked=!0)}};
GD.dom.clearList=function(a){if((a=id(a))&&a.options&&a.options.length)for(var a=a.options,b=0;b<a.length;b++)a[b].selected=!1};GD.dom.addListTitles=function(a){if((a=id(a))&&a.options&&a.options.length)for(var a=a.options,b=0;b<a.length;b++){var c=a[b].text,c=c.replace(/^[\s\-]*/,"");a[b].title=c}};GD.dom._cachedScrollWidth=-1;
GD.dom.getScrollerWidth=function(){if(0>=GD.dom._cachedScrollWidth){var a=null,b=0,a=0;scrollingDiv=document.createElement("div");scrollingDiv.style.position="absolute";scrollingDiv.style.top="-1000px";scrollingDiv.style.left="-1000px";scrollingDiv.style.width="100px";scrollingDiv.style.height="50px";scrollingDiv.style.overflow="hidden";scrollingDiv.style.border="1px dotted blue";a=document.createElement("div");a.style.width="100%";a.style.height="200px";scrollingDiv.appendChild(a);document.body.appendChild(scrollingDiv);
b=a.offsetWidth;scrollingDiv.style.overflow="scroll";a=a.offsetWidth;b==a&&(a=scrollingDiv.clientWidth);document.body.removeChild(scrollingDiv);GD.dom._cachedScrollWidth=b-a}return GD.dom._cachedScrollWidth};GD.dom.getQueryString=function(a){for(var b={},c,d=location.search.slice(1),e=/([^&=]+)=([^&]*)/g;c=e.exec(d);)b[decodeURIComponent(c[1])]=decodeURIComponent(c[2]);return a in b?b[a+""]:null};window.GD=window.GD||{};GD.analytics=GD.analytics||{};GD.analytics.GWO_ACCOUNT="UA-2595786-5";GD.analytics.trackPageView=function(d,f){try{_gaq&&(window.googleId&&_gaq.push(["_setAccount",window.googleId]),_gaq.push(["_trackPageview",d]));var b=$(".pageInfo .webAnalyticsPageList",f);if(b.length){var c=b.html().trim();c&&(c+="<br/>");b.html(c+d)}Logger.info("Tracking: "+d)}catch(h){Logger.warn("Exception while tracking '"+d+'": '+h)}return!0};
GD.analytics.trackPartnerShare=function(d,f){GD.analytics.trackPageView("/partner/share/"+d,f)};GD.analytics.trackPartnerAuth=function(d,f){GD.analytics.trackPageView("/partner/auth/"+d+"/"+(f?"link":"delink"))};
GD.analytics.trackEvent=function(d,f,b,c,h){var a=d+": "+f;try{_gaq&&(window.googleId&&_gaq.push(["_setAccount",window.googleId]),_gaq.push(["_trackEvent",d,f,b,c]));var e=$(".pageInfo .webAnalyticsEventList",h);if(e.length){$("span.none",e).remove();var e=e.not("span.none"),g=e.html().trim();if(b||c)a+=" [",b&&(a+=b),c&&(b&&(a+=" "),a+="&times; "+c),a+="]";g&&(g+="<br/>");e.html(g+a);Logger.info("Event: "+a)}}catch(i){Logger.warn("Exception while tracking event '"+a+'": '+i)}return!0};
GD.analytics.trackGoal=function(d,f){try{_gaq&&(window.googleId&&_gaq.push(["_setAccount",window.googleId]),_gaq.push(["_trackPageview",d]));var b=$(".pageInfo .webAnalyticsGoalList",f);if(b.length){$("span.none",b).remove();var b=b.not("span.none"),c=b.html().trim();c&&(c+="<br/>");b.html(c+d);Logger.info("Goal! "+url)}}catch(h){Logger.warn("Exception while tracking '"+d+'": '+h)}};
GD.analytics.setTrackingVar=function(d,f,b,c,h){_gaq.push(["_setCustomVar",d,f,b,c]);GD.runAfterBody(function(){var a=$(".pageInfo .webAnalyticsCustomVars",h);if(a.length){var e=a.html().trim(),g;switch(c){case 1:g="visitor";break;case 2:g="session";break;case 3:g="page";break;default:g="UNKNOWN"}0<e.length&&(e+="<br/>");e+="("+d+") "+f+' = "'+b+'" ('+g+" scope)";a.html(e)}})};
GD.analytics.trackSocial=function(d,f,b,c,h){var a=d+": "+f;try{_gaq&&(window.googleId&&_gaq.push(["_setAccount",window.googleId]),"undefined"!==typeof c&&""!==c?_gaq.push(["_trackSocial",d,f,b,c]):_gaq.push(["_trackSocial",d,f,b]));var e=$(".pageInfo .webAnalyticsEventList",h);if(e.length){$("span.none",e).remove();var e=e.not("span.none"),g=e.html().trim();if(b||c)a+=" [",b&&(a+=b),c&&(b&&(a+=" "),a+="&times; "+c),a+="]";g&&(g+="<br/>");e.html(g+a);Logger.info("Event: "+a)}}catch(i){Logger.warn("Exception while tracking event '"+
a+'": '+i)}return!0};window.GD=window.GD||{};GD.srch=GD.srch||{};GD.jobs=GD.jobs||{};GD.srch.JOBS_REVEAL_TIME_MS=500;
GD.srch.initJobs=function(a){GD.site.init();$("#JobSearchRadiusSelect, #JobFreshnessSelect").on("change",function(c){GD.srch._trackJobEvent(c);GD.srch._jobsSrch(a)});$("#JobSearchFilters input[type='radio']").on("change",function(c){GD.srch._trackJobEvent(c);GD.srch._jobsSrch(a)});$(".jobScopePanel .reviewsPanel > div").each(function(){var a=$(this).attr("class").split("_");"NI"==a[0]&&$(this).html($(".I_"+a[1]).html())});$("#JobSearchRadiusSelect").gdSelect();$("#JobFreshnessSelect").gdSelect();
GD.site.initBoxShadowPagination()};GD.srch._jobsSrch=function(a){$("#AjaxSpinner").show();var c=$("#JobSearchRadiusSelect").val()||"",b=$("#JobFreshnessSelect").val()||"",d=$("#EmployerMinRatingSelect :checked").val()||"",e=$("#JobTypeRatingSelect :checked").val()||"";GD.srch._ajaxJobsSrch(a,c,b,d,e);googletag.pubads().refresh();GD.ads.reloadAll()};
GD.srch._ajaxJobsSrch=function(a,c,b,d,e){var f=GD.srch._jobsSeoPathUrl();jQuery.ajax({url:"undefined"===typeof c?f+("?fromAge="+b+"&minRating="+d):f+("?radius="+c+"&fromAge="+b+"&minRating="+d+"&jobType="+e),dataType:"html",success:function(b){b||Logger.error("No data returned for GD.jobs.displayFeaturedJobs");GD.jobs._processJobs(b,a)},error:function(a,b,c){Logger.inspect(c,"GD.jobs.displayFeaturedJobs error: "+b);GD.jobs._processJobs(null)}})};
GD.srch._jobsSeoPathUrl=function(){var a=$('meta[property="og:url"]').attr("content"),a=a.replace(/_IP[0-9]*/,""),c=a.lastIndexOf("/");return"/Job/ajax"+a.toString().substring(c)};GD.jobs._processJobs=function(a,c){if(a){var b=$(c);b.empty();b.html(a);b.slideDown(GD.srch.JOBS_REVEAL_TIME_MS);b=$("#SearchNoResults",b).length?"/search/jobsFiltered/noData":"/search/jobsFiltered";GD.analytics.trackPageView(b)}};
GD.srch._trackJobEvent=function(a){var c=a.currentTarget.id,a=a.currentTarget.value,b;0===c.indexOf("JobFreshness")?b="Freshness":0===c.indexOf("EmployerMinRating")?b="Company Rating":"JobSearchRadiusSelect"==c?b="Distance":"AllIndustriesId"==c?a=b="Industry":"AllExperienceLevelsId"==c?a=b="Experience":0===c.indexOf("JobType")&&(a=b="Type");b&&GD.analytics.trackEvent("jobSearchFilter",b,a)};window.GD=window.GD||{};GD.jobScope=GD.jobScope||{};GD.jobScope.PANEL_WIDTH=600;GD.jobScope.ANIMATE_SPEED=400;GD.jobScope.MAX_NEWS_ITEMS=2;GD.jobScope.googleSearchKey=null;GD.jobScope.facebookRequestedPerms=null;
GD.jobScope.init=function(a,b){GD.jobScope.googleSearchKey=a;GD.jobScope.facebookRequestedPerms=b;$(".jobScopePanel").each(function(){var a=$(this),b=GD.jobScope._getJobInfo(a);a.find(".panelHeader .jobScopeToggle").click(function(){GD.jobScope.toggle(a,b)});a.find(".jobScopeTabs ul").on("click",function(e){e=$(e.target);e.is("li")||(e=e.parents("li:first"));if(e.is(".fbSignInPrompt"))return GD.fb.facebookLogin(GD.jobScope.facebookRequestedPerms,"/profile/createSocialNetworkAccount.htm",GD.dom.getDocUrl()),
!1;e.attr("contentPanelId").trim();var f=a.find(".tabbed");f.is(":visible")?a.find(".jobScopeTabs li.selected").is(e)?(GD.jobScope.toggle(a,b,!1),GD.jobScope.highlightRow(e,!1)):(GD.jobScope._selectTab(a,e,!1),GD.jobScope.highlightRow(e,!0)):(GD.analytics.trackEvent("jobPanel","open",b.employerShortName),GD.jobScope.open(a,f,e,!1),GD.jobScope.highlightRow(e,!0));return!0})});$(".jobScopeLink").on("click",function(a){var a=$(a.currentTarget),b=a.attr("jobScopeId"),a=a.attr("jobScopeTab");if(b){var b=
$("#"+b),e=b.find(".tabbed").is(":visible");selectedTabType=$(".selected",b).attr("tabType");e&&a==selectedTabType?GD.jobScope.toggle(b):GD.jobScope.showTab(b,a)}})};GD.jobScope.highlightRow=function(a,b){!0===b?a.parents("div.jobScopeWrapper").addClass("active"):a.parents("div.jobScopeWrapper").removeClass("active")};GD.jobScope._logTabClick=function(a){(a=a.attr("loggingUrl"))&&jQuery.ajax({url:a,dataType:"json"})};
GD.jobScope._disableAutoOpen=function(){$("body").data("jobScopeAutoOpenEnabled")&&(jQuery.ajax({url:"/jobScope/panels/jobScopeDisableAutoOpen.htm",dataType:"json"}),$("body").data("jobScopeAutoOpenEnabled",!1))};
GD.jobScope.toggle=function(a,b){b||(b=GD.jobScope._getJobInfo(a));var c=$(".tabbed",a);c.is(":animated")||(c.is(":visible")?(GD.analytics.trackEvent("jobPanel","close",b.employerShortName),GD.jobScope._close(a)):(GD.analytics.trackEvent("jobPanel","open",b.employerShortName),GD.jobScope.open(a,c,null)));return!1};GD.jobScope.showTab=function(a,b){var c=$(".tabbed",a),d=c.is(":visible"),e=$(".jobScopeTabs li[tabType='"+b+"']",a);d?GD.jobScope._selectTab(a,e):GD.jobScope.open(a,c,e)};
GD.jobScope.open=function(a,b,c){var d=a.attr("panelDefaultBgColor");d||(d="white");a.is(".initialized")||GD.jobScope._initPanel(a,b);null===c&&((d=a.attr("selectedTab"))&&(c=$(".jobScopeTabs li[tabType='"+d+"']",a)),c||(c=$(".jobScopeTabs li:first",a)));c&&GD.jobScope._selectTab(a,c);a.toggleClass("jobScopePanelOpened");b.slideDown(GD.jobScope.ANIMATE_SPEED);b=$(".panelHeader .jobScopeTabs .hiddenWhenOpened",a);0<b.length?b.fadeOut(GD.jobScope.ANIMATE_SPEED/2,function(){GD.jobScope._showOpenedTabs(a)}):
GD.jobScope._showOpenedTabs(a);$(".panelHeader div.closeBox",a).fadeIn(GD.jobScope.ANIMATE_SPEED);a.is(".jobScopePanelLast")&&(b=a.parents(".featuredJobListings"),b.length&&b.animate({paddingBottom:"5px"},GD.jobScope.ANIMATE_SPEED))};GD.jobScope._showOpenedTabs=function(a){$(".panelHeader .jobScopeTabs li.hiddenWhenClosed",a).fadeIn(GD.jobScope.ANIMATE_SPEED)};
GD.jobScope._close=function(a){$panelContent=a.find(".tabbed").first();var b=a.attr("panelDefaultBgColor");if(!b||"transparent"===b)b="white";$panelContent.slideUp(GD.jobScope.ANIMATE_SPEED);a.animate({backgroundColor:b,borderTopColor:b,borderRightColor:b,borderBottomColor:b,borderLeftColor:b,paddingBottom:0},GD.jobScope.ANIMATE_SPEED);a.animate({marginBottom:0},GD.jobScope.ANIMATE_SPEED/2);a.is(".jobScopePanelLast")&&(b=a.parents(".featuredJobListings"),b.length&&b.animate({paddingBottom:0},GD.jobScope.ANIMATE_SPEED));
a.toggleClass("jobScopePanelOpened");a.parents(".jobScopeWrapper").removeClass("active");$(".jobScopeTabs li:visible",a).not(":first").children(".divider").css("border-left-width",1);$(".jobScopeTabs li",a).removeClass("selectedTabNext selected selectedTabPrev");var b=$(".panelHeader .jobScopeTabs li.hiddenWhenClosed,.panelHeader div.closeBox",a),c=$(".panelHeader .jobScopeTabs .fbSignInPrompt",a);0<c.length&&b.add('.panelHeader .jobScopeTabs li[tabType="CONNECTIONS"] .tabLinkConnected',a);b.fadeOut(GD.jobScope.ANIMATE_SPEED/
2,function(){GD.jobScope._showClosedTabs(a,c)})};GD.jobScope._showClosedTabs=function(a,b){b&&b.length&&b.fadeIn(GD.jobScope.ANIMATE_SPEED)};GD.jobScope._initPanel=function(a){closeBox=$(".panelHeader .closeBox",a);closeBox.on("click",GD.jobScope._clickAndCloseJobScopePanel);a.closeBox=closeBox;panelDefaultBgColor=a.css("border-top-color");a.attr("panelDefaultBgColor",panelDefaultBgColor);a.addClass("initialized")};
GD.jobScope._clickAndCloseJobScopePanel=function(){jobScopePanel=$(this).closest(".jobScopePanel");employerShortName=GD.jobScope._getJobInfo(jobScopePanel).employerShortName;GD.analytics.trackEvent("jobPanel","close",employerShortName);GD.jobScope._close(jobScopePanel)};
GD.jobScope._selectTab=function(a,b){var c=b.attr("contentPanelId").trim(),d=b.attr("tabType").trim(),e=!1,f=null;if(c&&d){var e=$(".tabContent",a),g=$(".jobScopeTabs li",a),f=$("#"+c);g.not(b);var c=b.next("li"),h=b.prev("li");g.removeClass("selectedTabNext").removeClass("selectedTabPrev");c.addClass("selectedTabNext");h.addClass("selectedTabPrev");g.removeClass("selected");b.addClass("selected");f.show();e.not(f).hide();e=GD.jobScope._populateTabContents(a,f,d)}GD.analytics.trackEvent("jobPanel",
"tabView",d);!e&&f&&GD.jobScope._logTabClick(f)};GD.jobScope._populateTabContents=function(a,b,c){var a=GD.jobScope._getJobInfo(a),d=!1;b.is(".alreadyLoaded")?$(".focus:first",b).focus():(b.is(".cloneable")&&GD.jobScope._cloneTabContents(b,c,a),b.is(".alreadyLoaded")||(d=GD.jobScope._loadTabContents(b,c,a,GD.jobScope.googleSearchKey)),b.addClass("alreadyLoaded"));return d};
GD.jobScope._cloneTabContents=function(a,b,c){var b=b.toLowerCase()+"Panel",d=null;a.is(".cloneableByEmployer")?c.employerId&&(d=$(".jobScopePanel[employerId="+c.employerId+"] .tabContent."+b+".cloneable.alreadyLoaded:first")):d=$(".jobScopePanel .tabContent."+b+".cloneable.alreadyLoaded:first");d.length&&(c=d.children().clone(!0),a.children().remove(),a.append(c),a.addClass("alreadyLoaded"),$(".focus:first",a).focus())};
GD.jobScope._loadTabContents=function(a,b,c,d){var e=a.attr("contentsUrl"),f=!1;if(e)GD.jobScope._loadAjaxTabContent(a,b,c,e),f=!0;else switch(b){case "WEBSEARCH":GD.jobScope._loadWebSearchContent(a,c);break;case "NEWS":0<c.employerId?GD.jobScope._loadNewsSourceData(a,c,d):GD.jobScope._loadNewsContent(a,c,d);break;default:GD.jobScope._removeLoading(a)}return f};
GD.jobScope._loadAjaxTabContent=function(a,b,c,d){jQuery.ajax({url:d,dataType:"html",error:function(d,f){GD.jobScope._loadAjaxTabContentComplete(a,b,c,null,f)},success:function(d,f){GD.jobScope._loadAjaxTabContentComplete(a,b,c,d,f)}})};
GD.jobScope._loadAjaxTabContentComplete=function(a,b,c,d){d&&(d=d.trim());if(d)switch(a.html(d+"<div class='clear'></div>"),$(".contentIconsCol .icons .icon[openTab]",a).each(function(){$(this).click(GD.jobScope._onOverviewIconClick)}),b){case "CONNECTIONS":GD.aug.augmentContextHelpNodes($(".contextHelpLink",a)),GD.runOnFacebookLoad(function(){GD.fb.initLoginButtons(GD.jobScope.facebookRequestedPerms,"/profile/createSocialNetworkAccount.htm",GD.dom.getDocUrl())})}else a.html("<div class='tabContentInside'><p class='ajaxError'>Sorry, this information is currently unavailable.  Please check back in a few minutes.</p></div>");
GD.jobScope._removeLoading(a)};GD.jobScope._onOverviewIconClick=function(a){var b=$(a.currentTarget),c=b.attr("openTab"),b=b.parents(".jobScopePanel:first");c&&GD.jobScope.showTab(b,c);a.preventDefault();a.stopPropagation();return!1};GD.jobScope._onTabContentsLoaded=function(a,b){$("a[target]",b);$("form[target]",b);$(".focus:first",b).focus()};
GD.jobScope._loadWebSearchContent=function(a,b){function c(){(new GoogleSearchControl(e,f,b,function(){GD.wait().then(function(){GD.jobScope._onTabContentsLoaded(d,a)})})).execute(g)}var d=a.parents(".jobScopePanel:first").attr("id"),e=$(".webResults",a),f=$(".webSrchForm input:first",a),g=['"'+b.employerName+'"','"'+b.employerShortName+'"'];"google"in window?google.search?c():GoogleSearchControl.loadGoogleSearch(c):Logger.error("google jsapi is not loaded")};
GD.jobScope._loadNewsSourceData=function(a,b,c){jQuery.ajax({url:"/jobScope/panels/jobScopeEmployerNewsSource.htm?employerId="+b.employerId,dataType:"json",error:function(d,e){GD.jobScope._onLoadNewsSourceComplete(a,b,c,null,e)},success:function(d,e){GD.jobScope._onLoadNewsSourceComplete(a,b,c,d,e)}})};
GD.jobScope._onLoadNewsSourceComplete=function(a,b,c,d){d&&d.newsSource?(b.newsSource=d.newsSource,b.newsSourceData=d.newsSourceData,b.googleKeywords=d.googleKeywords,b.rssAttribName=d.rssAttribName):(b.newsSource="GOOGLE",b.newsSourceData=b.employerShortName);GD.jobScope._loadNewsContent(a,b,c)};
GD.jobScope._loadNewsContent=function(a,b){var c=$(".contentHolder",a);GD.news.initNewsFeed(c,b.employerShortName,{newsSource:b.newsSource,newsSourceData:b.newsSourceData,googleKeywords:b.googleKeywords,rssAttribName:b.rssAttribName,maxItems:GD.jobScope.MAX_NEWS_ITEMS,onCompleteCallback:function(a,c){GD.jobScope._onNewsComplete(a,c,b)}})};
GD.jobScope._getJobInfo=function(a){var b={};if(a&&a.length){var c=a.attr("employerId");c?(c=Number(c),isNaN(c)&&(c=0)):c=0;b.jobScopeId=a.attr("id");b.employerId=c;a.attr("employerName")&&(b.employerName=a.attr("employerName"));a.attr("employerShortName")&&(b.employerShortName=a.attr("employerShortName"));a.attr("employerUrl")&&(b.employerUrl=a.attr("employerUrl"));a.attr("location")&&(b.location=a.attr("location"))}return b};
GD.jobScope._onNewsComplete=function(a,b,c){if(0<b)a.is(".tabContentInside")||a.parents(".tabContentInside:first"),"GOOGLE"===c.newsSource?(c=$("<div class='credit googleCredit minorText'>"),c.html("Provided by Google News"),a.append(c)):"PRESS_CENTER"===c.newsSource&&(c=$("<div class='credit pressCenterCredit minorText'>"),c.html("Provided by employer"),a.append(c));else{var b=$("#NewsSearchPanelTemplate").html(),d=RegExp("%JOB_SCOPE_ID%".escapeForRegex(),"g"),e=RegExp("%SEARCH_TERM%".escapeForRegex(),
"g"),f=RegExp("%URL_ENCODED_SEARCH_TERM%".escapeForRegex(),"g"),g='"'+c.employerShortName.replace('"',"")+'"',b=b.replace(d,c.jobScopeId),b=b.replace(e,c.employerShortName),b=b.replace(f,encodeURIComponent(g));a.empty().html(b);$(".focus:first",a).focus()}};GD.jobScope._removeLoading=function(a){a.find(".loading").remove()};
GD.jobScope._getNoResultsMessage=function(a){var b="<i class='warning'></i>Sorry, we could not find anything";a.employerShortName&&(b+=" matching <span class='nowrap'>\""+a.employerShortName+'"</span>');a.location&&(b+=" in <span class='nowrap'>"+a.location+"</span>");return"<p class='noResults'>"+(b+".")+"</p>"};
function GoogleSearchControl(a,b,c,d){this.jobInfo=c;this.container=$(a);this.searchField=$(b);this.onLoadCallback=d;this.webSearch=new google.search.WebSearch;this.webSearch.setResultSetSize(2);this.webSearch.setSearchCompleteCallback(this,this._searchComplete)}GoogleSearchControl.loadGoogleSearch=function(a){google.load("search","1",{callback:a})};
GoogleSearchControl.prototype._searchComplete=function(){var a=this.container,b=$("<div>");results=this.webSearch.results;if(results.length){for(loop=0;loop<results.length&&2>loop;loop++){var c=results[loop],d=$("<div class='data wideData'>");d.append(c.html.cloneNode(!0));c=$("<div class='resultItem'>");c.append(d);b.append(c)}var c=this.queryArray[this.currentQueryIndex],d=$("<div class='moreResults'>"),c="http://www.google.com/search?q="+encodeURIComponent(c),e=$("<a>More Google results</a>");
e.attr("href",c);e.attr("rel","nofollow");e.attr("target","_blank");d.append(e);b.append(d);a.empty();a.append(b.children());this.searchField.val(this.queryArray[this.currentQueryIndex]);if(jQuery.isFunction(this.onLoadCallback))this.onLoadCallback()}else if(this.currentQueryIndex+1>=this.queryArray.length){if(this.searchField.val(webSearchControl.queryArray[webSearchControl.currentQueryIndex]),jQuery.isFunction(this.onLoadCallback))this.onLoadCallback()}else this.currentQueryIndex+=1,this.webSearch.execute(this.queryArray[this.currentQueryIndex])};
GoogleSearchControl.prototype.execute=function(a){this.queryArray=a;this.currentQueryIndex=0;this.webSearch.execute(this.queryArray[this.currentQueryIndex])};var GDStorage=function(){this.ALERT_NAMESPACE="alert";this.JOB_ALERT_NAMESPACE="job";this.TIME_SHOWN_KEY="timeShown";this.PAGE_VIEWS="pageViews";this.PAGE_VIEWS_MAX="pageViewsMax";this.DEFAULT_TTL=12*GDStorage.prototype.MONTH_MILLIS;this._debugMode=!1};GDStorage.prototype.DAY_MILLIS=864E5;GDStorage.prototype.TWO_DAY_MILLIS=2*GDStorage.prototype.DAY_MILLIS;GDStorage.prototype.WEEKLY_MILLIS=7*GDStorage.prototype.DAY_MILLIS;GDStorage.prototype.BIWEEKLY_MILLIS=15*GDStorage.prototype.DAY_MILLIS;
GDStorage.prototype.MONTH_MILLIS=30*GDStorage.prototype.DAY_MILLIS;GDStorage.prototype.getVal=function(a){return this._debugMode?void 0:$.jStorage.get(a)};GDStorage.prototype.setVal=function(a,b,c){c||(c=this.DEFAULT_TTL);this._debugMode?Logger.info('DEBUG MODE: (not) writing "'+a+'" with value '+JSON.stringify(b)+" and ttl="+c):$.jStorage.set(a,b,{TTL:c})};
GDStorage.prototype.isAlertExpired=function(a,b,c,e){var g=this.ALERT_NAMESPACE+"-"+a,h=!0,d=this.getVal(g),f=(new Date).getTime();"undefined"==typeof c&&(c=!1);"undefined"==typeof e&&(e=!1);b||(b=this.MONTH_MILLIS);if(d){var e=d[this.TIME_SHOWN_KEY],i=d[this.PAGE_VIEWS];e&&f-e<b?(h=!1,Logger.info("Not showing "+a+".  It's been "+(f-e)+" of "+b+"ms.")):(d={},d[this.TIME_SHOWN_KEY]=f,c||(d[this.PAGE_VIEWS]=i?++i:1,this.setVal(g,d)),Logger.info("Showing "+a+".  It's been longer than "+b+"ms."))}else if(d=
{},d[this.TIME_SHOWN_KEY]=f,d[this.PAGE_VIEWS]=1,e&&(d[this.TIME_SHOWN_KEY]=1,d[this.PAGE_VIEWS]=0),!c)this.setVal(g,d),Logger.info('Setting the current date for "'+a+'"');return h};GDStorage.prototype.isJobAlertExpired=function(a,b,c){a=this.JOB_ALERT_NAMESPACE+"-"+a;return this.isAlertExpired(a,b,c)};GDStorage.prototype.getAlertViews=function(a){var a=this.getVal(this.ALERT_NAMESPACE+"-"+a),b=-1;a&&(b=a[this.PAGE_VIEWS]);return b};
GDStorage.prototype.trackAlertViews=function(a){var a=this.ALERT_NAMESPACE+"-"+a,b=this.getVal(a),c=(new Date).getTime();if(b){var e={};e[this.PAGE_VIEWS]=b[this.PAGE_VIEWS]+1;e[this.TIME_SHOWN_KEY]=c;e[this.PAGE_VIEWS_MAX]=b[this.PAGE_VIEWS_MAX];this.setVal(a,e)}};GDStorage.prototype.getAlertMaxViews=function(a){var a=this.getVal(this.ALERT_NAMESPACE+"-"+a),b=-1;a&&(b=a[this.PAGE_VIEWS_MAX],"undefined"==typeof b&&(b=-1));return b};
GDStorage.prototype.setAlertMaxViews=function(a,b){var c=this.getVal(this.ALERT_NAMESPACE+"-"+a);c&&(c[this.PAGE_VIEWS_MAX]=b)};GDStorage.prototype.getLastShown=function(a){var a=this.getVal(this.ALERT_NAMESPACE+"-"+a),b=null;a&&(b=a[this.TIME_SHOWN_KEY]);return b};GDStorage.prototype.setDebugMode=function(a){this._debugMode=a};window.GD=window.GD||{};GD.util=GD.util||{};var toType=function(a){return{}.toString.call(a).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()};GD.wait=function(a){if("number"!==typeof a||0>=a)a=1;return jQuery.Deferred(function(b){setTimeout(b.resolve,a)})};
var ObjectHandler={clone:function(a){var b={};if("object"===typeof a)for(var c in a)b[c]="object"==typeof a[c]&&a[c].__isArray?this.cloneArray(a[c]):"object"==typeof a[c]?this.clone(a[c]):a[c];return b},cloneArray:function(a){for(var b=[],c=0;c<=a.length;c++)"object"==typeof a[c]?b.push(this.getCloneOfObject(a[c])):b.push(a[c]);return b}};Array.prototype.__isArray=!0;
GD.counter=function(a){a||(a="default");GD.counter||(GD.counter={});GD.counter[a]="number"!==typeof GD.counter[a]?1:GD.counter[a]+1;return GD.counter[a]};GD.isNumber=function(a){return!isNaN(a)};GD.util.getReviewsURL=function(a,b){a=a.replace(/[\W]+/g,"-");return"/Reviews/"+a+"-Reviews-E"+b+".htm"};GD.util.getSalariesURL=function(a,b){a=a.replace(/[\W]+/g,"-");return"/Salaries/"+a+"-Salaries-E"+b+".htm"};
GD.util.durationInPast=function(a){var a=(new Date).getTime()-a.getTime(),a=Math.floor(a/1E3/3600),b=Math.floor(a/24),c="";1>a?c="in the last hour":12>a?(c=a+" hour",1!=a&&(c+="s"),c+=" ago"):c=1>b?"today":2>b?"yesterday":3>b?"the day before yesterday":6>b?b-1+" days ago":7>=b?"in the last week":14>=b?"in the last 2 weeks":31>=b?"in the last month":35>=b?"5 weeks ago":42>=b?"6 weeks ago":49>=b?"7 weeks ago":75>=b?"2 months ago":105>=b?"3 months ago":138>=b?"4 months ago":170>=b?"5 months ago":210>=
b?"6 months ago":"over 6 months ago";return c};GD.util.getAjaxUrlRespectingSecurity=function(a){var b=a,c=window.location;c&&"https:"==c.protocol&&(b=c.protocol+"//"+c.host+"/secure"+a);return b};GD.util.sendWLToken=function(a){a=MD5.calc(a);jQuery.ajax({url:"/util/ajax/bwl.htm",type:"POST",dataType:"json",data:{bwl:a,guid:GD.pageInfo.guid}})};GD.util.checkMatchingInputFields=function(a,b){var c=$("#"+a).val(),e=$("#"+b).val();return c==e?!0:!1};
GD.util.validateForm=function(a,b,c){var e=!0,g={required:"",email:"",identical:"",system:""};if(b){if("undefined"!==typeof b.required){var f;$(b.required).each(function(c,d){f=a.find("."+d);f.length?""===$.trim(f.val())?(e=!1,f.removeClass("validateError, validateOk").addClass("validateError"),g.required=b.requiredErr):f.removeClass("validateError, validateOk").addClass("validateOk"):(e=!1,g.system="Form Validation Error - Mandatory Fields. No related elements found.")})}if("undefined"!==typeof b.identical){var i=
"";$(b.identical).each(function(c,d){var h=a.find("."+d);if(h.length){var f=h.val();0===c?i=f:f!==i?(e=!1,h.removeClass("validateError, validateOk").addClass("validateError"),g.identical=b.identicalErr):h.removeClass("validateError, validateOk").addClass("validateOk")}else e=!1,g.system="Form Validation Error - Identical Fields. No related elements found."})}"undefined"!==typeof b.emailCheck&&$(b.emailCheck).each(function(b,c){var d=a.find("."+c);d.length?d.val().isValidEmail()?d.removeClass("validateError, validateOk").addClass("validateOk"):
(e=!1,d.removeClass("validateError, validateOk").addClass("validateError"),g.email="Please enter a valid email address."):(e=!1,g.system="Form Validation Error - Email Check. No related elements found.")})}var d={};d.success=e;d.error=g;d.allErrorMsgs=function(){var a=[];this.error.system&&a.push(this.error.system);this.error.required&&a.push(this.error.required);this.error.email&&a.push(this.error.email);this.error.identical&&a.push(this.error.identical);return a};d.firstErrorMsg=function(){return this.error.required?
this.error.required:this.allErrorMsgs()[0]};d.emailErrorMsg=function(){return this.error.email?this.error.email:this.error.required};c(d);return e};GD.util.convertOnes=function(a){var a=+a,b=" one two three four five six seven eight nine".split(" ");return 0===a?"zero":10>a?b[a]:"tenplus"};Object.numProps=function(a){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b};GD.util.convertDashDateToSlashDate=function(a){a=a.split("-");return a[1]+"/"+a[2]+"/"+a[0]};window.GD=window.GD||{};GD.util=GD.util||{};Array.prototype.contains=function(a){for(var b=this.length;b--;)if(this[b]===a)return!0;return!1};Array.prototype.chain=function(a){var b=this,d=0,a=a||100;GD.wait(a).then(function(){var c=b[d++],e=a;"function"===typeof c?c():"number"===typeof c&&(e=c);d<b.length&&GD.wait(e).then(arguments.callee)});return this};Array.prototype.shuffle=function(){for(var a=this.length,b=a;b--;){var d=parseInt(Math.random()*a,10),c=this[b];this[b]=this[d];this[d]=c}};window.GD=window.GD||{};GD.event=GD.event||{};GD.event.BACKSPACE=8;GD.event.TAB=9;GD.event.ENTER=13;GD.event.SHIFT=16;GD.event.CONTROL=17;GD.event.ALT=18;GD.event.ESCAPE=27;GD.event.SPACE=32;GD.event.PAGE_UP=33;GD.event.PAGE_DOWN=34;GD.event.END=35;GD.event.HOME=36;GD.event.ARROW_LEFT=37;GD.event.ARROW_UP=38;GD.event.ARROW_RIGHT=39;GD.event.ARROW_DOWN=40;GD.event.INSERT=45;GD.event.DELETE=46;
GD.event.fixEvent=function(a){a||(a=window.event);if(a){a.target?3===a.target.nodeType&&(a.target=a.target.parentNode):a.srcElement&&(a.target=a.srcElement);if(null===a.which&&(null!==a.charCode||null!==a.keyCode))a.which=null!==a.charCode?a.charCode:a.keyCode;"undefined"==typeof a.metaKey&&a.ctrlKey&&(a.metaKey=a.ctrlKey)}return a};
GD.event.stopEventPropagation=function(a){-1!=navigator.userAgent.toLowerCase().indexOf("msie")&&document.all?(window.event.cancelBubble=!0,window.event.returnValue=!1):a.stopPropagation();return!1};GD.event.isTextChangeKeystroke=function(a){if(99==a.which&&(a.ctrlKey||a.metaKey))return!1;switch(a.keyCode){case GD.event.TAB:case GD.event.ENTER:case GD.event.ESCAPE:case GD.event.ARROW_LEFT:case GD.event.ARROW_UP:case GD.event.ARROW_RIGHT:case GD.event.ARROW_DOWN:case GD.event.PAGE_UP:case GD.event.PAGE_DOWN:case GD.event.END:case GD.event.HOME:case GD.event.INSERT:return!1}return!0};
GD.event.Manager=GD.Class({constructor:function(){this.subscribers={}},checkType:function(a,c){if("string"!==typeof a)throw new TypeError("GD.event.Manager."+c+": type param must be a string.");},checkArgs:function(a,c,b,e){this.checkType(c,a);if("function"!==typeof b)throw new SyntaxError("GD.event.Manager."+a+": callback param must be a function.");if(!e)throw new SyntaxError("GD.event.Manager."+a+": context param must be an object.");},subscribe:function(a,c,b){this.checkArgs("subscribe",a,c,b);
this.subscribers[a]=this.subscribers[a]||[];this.subscribers[a].push({fn:c,context:b})},unsubscribe:function(a,c,b){this.checkArgs("unsubscribe",a,c,b);for(var e=(a=this.subscribers[a])?a.length:0,d=0;d<e;d++)a[d].fn===c&&a[d].context===b&&a.splice(d,1)},fire:function(a,c){this.checkType(a,"fire");for(var b=this.subscribers[a],e=b?b.length:0,d=0;d<e;d++)b[d].fn.call(b[d].context,c)}});window.GD=window.GD||{};GD.util=GD.util||{};"undefined"==typeof String.prototype.trim&&(String.prototype.trim=function(){a=this.replace(/^\s+/,"");return a.replace(/\s+$/,"")});String.prototype.equalsIgnoreCase=function(b){b=b.escapeForRegex();return this.match(RegExp(b,"i"))};String.prototype.startsWith=function(b){return this.indexOf(b)===0};String.prototype.contains=function(b){return this.indexOf(b)>=0};
"function"!==typeof String.prototype.endsWith&&(String.prototype.endsWith=function(b){return this.indexOf(b,this.length-b.length)!==-1});String.prototype.splice=function(b,d,c){return this.slice(0,b)+c+this.slice(b+Math.abs(d))};String.prototype.countWords=function(){var b=0,d;d=this.trim().replace(/\s/g," ");d=d.split(/[ ,\.\(\)\[\]]+/);for(index=0;index<d.length;index++)d[index].length>0&&b++;return b};
String.prototype.capitalize=function(){return this.replace(/\w+/g,function(b){return b.charAt(0).toUpperCase()+b.substr(1).toLowerCase()})};
String.prototype.toTitleCase=function(){return this.replace(/([\w&`'‘’"“.@:\/\{\(\[<>_]+-? *)/g,function(b,d,c,e){return c>0&&e.charAt(c-2)!==":"&&b.search(/^(a(nd?|s|t)?|b(ut|y)|en|for|i[fn]|o[fnr]|t(he|o)|vs?\.?|via)[ \-]/i)>-1?b.toLowerCase():e.substring(c-1,c+1).search(/['"_{(\[]/)>-1?b.charAt(0)+b.charAt(1).toUpperCase()+b.substr(2):b.substr(1).search(/[A-Z]+|&|[\w]+[._][\w]+/)>-1||e.substring(c-1,c+1).search(/[\])}]/)>-1?b:b.charAt(0).toUpperCase()+b.substr(1)})};
String.prototype.count=function(b){return(this.length-this.replace(RegExp(b,"g"),"").length)/b.length};String.prototype.toLocTitleCase=function(){if(this.count(",")==1){var b=this.split(",");return b[0].toTitleCase()+", "+b[1].toUpperCase()}return this.toTitleCase()};String.prototype.removeToken=function(b){if(!b)return this;var d=this.indexOf(b);return d==-1?this:this.substring(0,d)+this.substring(d+b.length).removeToken(b)};
String.prototype.encodeHTML=function(){var b=this.toString(),b=b.replace(/&/g,"&amp;"),b=b.replace(/</g,"&lt;"),b=b.replace(/>/g,"&gt;"),b=b.replace(/"/g,"&quot;");return b=b.replace(/'/g,"&apos;")};String.prototype.decodeHTML=function(){var b=this.toString(),b=b.replace(/&gt;/g,">"),b=b.replace(/&lt;/g,"<"),b=b.replace(/&amp;/g,"&"),b=b.replace(/&quot;/g,'"');return b=b.replace(/&apos;/g,"'")};
String.prototype.truncateToLength=function(b,d,c){var e=this.toString();if(e.length>b){if(d){for(;b>0;){d=e.charAt(b-1);if(/\s/.test(d))break;b--}for(;b>0&&!/\s/.test(e.charAt(b-1));)b--}e=e.substr(0,b).trim();c||(e=e+"&hellip;")}return e};String.prototype.truncateToWords=function(b,d,c){var e=this.toString(),f=e.split(" ");if(f.length>b){for(var e=0,g="";e<b;){c&&(f[e]=="-"||f[e].length==1)&&b++;g=g+f[e++];g=g+(e<b?" ":"")}d||(g=g+"&hellip;");return g}return e};
String.prototype.entityToPlainText={lt:"<",gt:">",amp:"&","#32":" ",nbsp:" ","#39":"'",apos:"'",quot:'"',cent:"¢",pound:"£",yen:"¥",copy:"©",reg:"®",ndash:"–",mdash:"—",lsquo:"‘",rsquo:"’",ldquo:"“",rdquo:"”",bull:"•",hellip:"…",euro:"€",trade:"™",infin:"∞"};String.prototype.entitiesToText=function(b){var d=this.toString();return d=d.replace(/&([\w#]{1}[\w]{1,5});/g,function(c,d){var f=String.prototype.entityToPlainText[d];f||(f=b?" ":c);return f})};
String.prototype.stripHtml=function(b){var d=b?"":"[\\r\\n\\s]*",b=b?"   ":"",c;c=this.replace(RegExp("<[/]?(p|div)[^>]*>"+d,"gim"),"\n");c=c.replace(RegExp("<li[^/>]*>"+d,"gim"),"\n"+b+"• ");c=c.replace(RegExp("<(\\?xml:|/)?[\\w]+[^>]*>","gim"),"");c=c.replace(RegExp("\\w{50,}","g"),"");c=c.replace(RegExp("<\!--"+d+".+"+d+"--\>","gm"),"\n");c=c.entitiesToText(true);return c.trim()};String.prototype.plainTextLength=function(b){var d=/[\s\t]{2,}/g,c;c=this.stripHtml(b);b||(c=c.replace(d," "));return c.length};
String.prototype.escapeForRegex=function(){return this.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")};String.prototype.addUrlParam=function(b,d){var c=this,d=encodeURIComponent(d),e=c.split("#"),c=e[0],e=e.length>1?e[1]:"",f=c.split("?");if(f.length>1){c=f[0];params=f[1]}else params="";params&&(params=params+"&");params=params+(b+"="+d);c=c+("?"+params);e&&(c=c+("#"+e));return c};String.prototype.isValidEmail=function(){return/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this)};
String.prototype.printf=function(){for(var b=arguments.length,d=this,c=0;c<b;c=c+1)d=d.replace(RegExp("\\{"+c+"\\}","g"),arguments[c]);return d.toString()};window.GD=window.GD||{};GD.util=GD.util||{};GD.util.openWindow=function(c,a){"string"!==typeof a?a="_blank":0>=a.length&&(a="_blank");window.open(c,a).focus();return!1};GD.util.openCenteredPercentWindow=function(c,a,b){if("number"==typeof b)return b/=100,GD.util.openCenteredWindow(c,a,screen.width*b,screen.height*b)};
GD.util.openCenteredWindow=function(c,a,b,d,e){b||(b=Math.floor(0.8*screen.width));d||(d=Math.floor(0.8*screen.height));e||(e="location=yes, menubar=yes, status=yes, toolbar=yes, scrollbars=yes, resizable=yes");b+=32;d+=96;wleft=(screen.width-b)/2;wtop=(screen.height-d)/2;0>wleft&&(b=screen.width,wleft=0);0>wtop&&(d=screen.height,wtop=0);c=window.open(c,a,"width="+b+", height="+d+", left="+wleft+", top="+wtop+e);c.resizeTo(b,d);c.moveTo(wleft,wtop);c.focus();return!1};
GD.util.openNewTab=function(c,a){var b=document.createElement("a"),d=document.createEvent("MouseEvents");b.href=c;d.initMouseEvent("click",!0,!0,window,0,0,0,0,0,a,!1,!1,!1,0,null);b.dispatchEvent(d)};GD.util.centerVertically=function(c){var a=$(window).height(),b=c.height(),a=Math.max(0,Math.round(a/2-b/2)),a=a-Math.round(0.1*a);c.css({position:"fixed",top:a})};GD.util.popToFullScreen=function(c){var a=$(window).height();c.height();c.css({position:"fixed",top:0,height:a}).addClass("fullScreen")};window.GD=window.GD||{};GD.ads=GD.ads||{};GD.ads.afsAdIds=GD.ads.afsAdIds||[];GD.ads.adSlotOpenTime=800;GD.ads.maxJobTitleLen=75;GD.ads.CORE_SEARCH_TERMS="job";GD.ads.TARGETING_COOKIE_NAME="ht";GD.ads.BIZO_REQUEST_URL="http://api.bizographics.com/v2/profile.json?api_key=8f97ff8af0f84ecda0969d0911f844fc";GD.ads.TRACK_DEFERRED_AD_LISTINGS_URL="/logExpandedAdSlotImpressions.htm";
GD.ads.reloadAll=function(){googletag.pubads().refresh();var a=$("div.gdGoogleAfs"),b=$("#AfsInfo"),c=b.data("searchTerms"),e=b.data("channel"),d=b.data("testMode"),b=b.data("pubId");a.each(function(){$(this).empty()});GD.ads.loadAllAfsAds(c,e,d,b)};GD.ads.addAfsSlot=function(a){GD.ads.afsAdIds.push(a)};GD.ads.hasAfsSlots=function(){return 0<GD.ads.afsAdIds.length};
GD.ads.loadAllAfsAds=function(a,b,c,e){if(3<GD.ads.afsAdIds.length)Logger.error("More than 3 AFS ads on a page is not currently supported.");else{for(var d=[],f=0;f<GD.ads.afsAdIds.length;f++){var g=GD.ads.afsAdIds[f],h=$("div#"+g),i={colorBackground:"#eeeeee",colorTitleLink:"#0066cc",colorDomainLink:"#007600",colorText:"#333333"};i.container=g;i.number=h.data("maxAds");if(g=h.data("colorBackground"))i.colorBackground=g;if(g=h.data("colorTitleLink"))i.colorTitleLink=g;if(g=h.data("colorDomainLink"))i.colorDomainLink=
g;if(g=h.data("colorText"))i.colorText=g;d.push(i)}GD.ads.loadAfs(a,c,e,b,d)}};GD.ads.loadAfs=function(a,b,c,e,d){0<d.length&&(a&&(a=GD.ads._processSearchTerms(a)),a={pubId:c,channel:e,query:a,adtest:b},1===d.length?new google.ads.search.Ads(a,d[0]):2===d.length?new google.ads.search.Ads(a,d[0],d[1]):3===d.length&&new google.ads.search.Ads(a,d[0],d[1],d[2]))};GD.ads._processSearchTerms=function(a){a=a.trim();a=a.replace(/"/g,'\\"');a=a.replace(/\s{2,}/g," ");a+=" "+GD.ads.CORE_SEARCH_TERMS;return a.trim()};
GD.ads.load=function(a,b,c,e){var d=GD.ads._getPageAdSlots(a);if(d&&d.length)try{for(var f="",g=0;g<d.length;g++){var h=$("div.adSlot-"+d[g]+"-holder",a);h.length&&($("div.adSlotData",h).remove(),$("div.loadingMsg",h).show(),f.length&&(f+=","),f+=d[g])}0<f.length&&GD.ads.loadAdSlot("/getAdSlotContentsAjax.htm",f,b,e,c,function(b,c){GD.ads._onAdSlotRequestSuccess(a,b,c)})}catch(i){Logger.warn("Exception in GD.ads.load():"+i)}};
GD.ads.loadAdSlot=function(a,b,c,e,d,f){a+="?slots="+encodeURIComponent(b);c&&0<c.length&&(a+="&segments="+encodeURIComponent(c));e&&0<e.length&&(a+="&"+e);d&&0<d.length&&(a+="&prguid="+d);jQuery.ajax({url:a,dataType:"html",success:function(a){f(b,a)},error:function(){GD.ads._onAdSlotRequestFailure(b)},timeout:6E4})};
GD.ads.refreshFeaturedJobsList=function(){for(var a=$("#FeaturedJobsList"),b=a.data("slots"),c=b.split(","),e,d=0;d<c.length;++d)if(e=c[d],-1!==e.indexOf("-lf-right")){b=e;break}c=a.data("segments");e=a.data("hostSiteParam");a=a.data("prguid");GD.ads.loadAdSlot("/getAdSlotFeaturedJobsListAjax.htm",b,c,e,a,GD.ads._onRefreshJobsListSuccess)};
GD.ads.expandFeaturedJobsList=function(a){1<a.length&&(a=$(a[1]),a.slideDown(GD.ads.adSlotOpenTime/2));(a=GD.ads.checkImpressionData())?GD.ads.trackImpressions(a):GD.wait(500).then(function(){var a=GD.ads.checkImpressionData();a&&GD.ads.trackImpressions(a)})};GD.ads.checkImpressionData=function(){var a=$("#DeferredAdImpressionJSON").data("deferredImpressions");return!$.isEmptyObject(a)&&""!==a?a:!1};
GD.ads.trackImpressions=function(a){var b={};b.adSlotImpression=JSON.stringify(a).replace(/&/g,"&amp;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;");jQuery.ajax({url:GD.ads.TRACK_DEFERRED_AD_LISTINGS_URL,type:"POST",data:b,dataType:"json"})};
GD.ads._getPageAdSlots=function(a){var b=[],c=/^adSlot\-([\w\-]+)\-holder/;$("div.featuredJobsAdSlot",a).each(function(){for(var a=$(this).attr("class").split(" "),d=0;d<a.length;d++){var f=a[d];f&&(f=c.exec(f))&&1<f.length&&b.push(f[1])}});return b};GD.ads._onRefreshJobsListSuccess=function(a,b){$("#FeaturedJobsList").replaceWith(b);var c=$("#FeaturedJobsListExpand");if(c.clientHeight)c.style.height=0;else{var e=$("div .measureExpandList");c.style.height=e.clientHeight+"px"}};
GD.ads._submitSearchForm=function(a){var b=!0;jQuery.isFunction(a[0].onsubmit)&&(b=a[0].onsubmit());var c=a.data("disambigOk");b&&a.submit();c&&GD.dom.clearPage();return!1};GD.ads._closeSearchForm=function(a){$(".moreFields",a).slideUp(200);return!1};
GD.ads._onAdSlotRequestSuccess=function(a,b,c){function e(a,b){return function(){GD.ads.expandFeaturedJobsList(a);b.off("mouseenter")}}if(b&&b.length){var b=b.split(","),d=$("<div />");d.html(c);for(var f=0;f<b.length;f++)if(null===a&&(a=$("body")),c=a.find("div.adSlot-"+b[f]+"-holder"),0<c.length){var g=d.find("div.adSlotData-"+b[f]),h=g.find("form.jobsSearch");g.outerHeight();h.length&&GD.ads._augmentSearchForm(h);if(0<g.length){c.hide();$("div.adSlotJobListings",c).remove();c.append(g);h=g.find("ul.featuredJobsList");
h.length&&"function"===typeof h.listview&&h.listview();var i=$(h[0]).not(".cf");i.on("mouseenter",e(h,i));$("div.loadingMsg",c).hide();c.slideDown(GD.ads.adSlotOpenTime);try{GD.shim.placeholder()}catch(j){}GD.link.initTargetedLinks("_job",g,!0);GD.lazyLoad(c,!0)}else c.css("display","none"),message="<p>Unable to find job opportunities at this time.</p>",c.html(message)}else Logger.error("Ad slot '"+b[f]+"' should be on the page somewhere.  It was not found.")}};
GD.ads._onAdSlotRequestFailure=function(a){if(a&&a.length)for(var a=a.split(","),b=0;b<=a.length;b++){var c=$("#"+a[b]+"-holder");0<c.length&&(c.css("display","none"),message="<p>Unable to find job opportunities at this time.</p>",c.html(message))}};
GD.ads._augmentSearchForm=function(a){GD.shim.placeholder($("input[placeholder]",a));GD.srch.initLocDisambig($("input.jobsSearchLocation",a),{locType:$("input.jobsSearchLocationType",a),locId:$("input.jobsSearchLocationId",a),disambigParent:a,top:56,left:0,width:280,doFormSubmit:function(){return GD.ads._submitSearchForm(a)}});$("input.jobsSearchKeyword",a).focus(function(){GD.ads._revealSearchForm(a)});$("div.buttons .gd-btn",a).click(function(b){GD.ads._submitSearchForm(a);b.preventDefault()});
$("div.buttons span.cancelLink",a).click(function(b){GD.ads._closeSearchForm(a);b.preventDefault()});$("input.jobsSearchKeyword, input.jobsSearchLocation",a).keypress(function(b){return GD.ads._onKeyPress(b,a)})};GD.ads._revealSearchForm=function(a){$(".moreFields",a).slideDown(200)};GD.ads._onKeyPress=function(a,b){return 13==a.keyCode?(GD.wait().then(function(){GD.ads._submitSearchForm(b)}),!1):!0};GD.ads.setAdTargetingAttr=function(a,b){googletag.pubads().setTargeting(a,b)};
GD.ads._htServices=["quantcast","bizo"];GD.ads._htData={};GD.ads.getTargetingSegments=function(a,b){GD.ads._loadTargetingCache()||(GD.ads._pendingServicesCount=0,a||(GD.ads._pendingServicesCount+=1),b||(GD.ads._pendingServicesCount+=1),a||GD.ads._fetchBizoTargeting(),b||GD.ads._fetchQuantcastTargeting())};
GD.ads.writeTargetingSegments=function(a){if(GD.ads._htData&&(GD.ads._htData.quantcast&&GD.ads._htData.quantcast.length||GD.ads._htData.bizo&&GD.ads._htData.bizo.length)){for(var a=$(a),b=a.html().trim(),c=0;c<GD.ads._htServices.length;c++){var e=GD.ads._htServices[c],d=GD.ads._htData[e];if(jQuery.isArray(d)&&d.length){b&&(b+=", ");b+=e+"=[";for(e=0;e<d.length;e++)0<e&&(b+=",<wbr>"),b+=d[e];b+="]"}}a.html(b)}};
GD.ads._fetchBizoTargeting=function(){jQuery.ajax({url:GD.ads.BIZO_REQUEST_URL,dataType:"jsonp",success:function(a){GD.ads._onBizoComplete(a)},error:function(){GD.ads._onBizoComplete(null)}})};GD.ads._onBizoComplete=function(a){GD.ads._htData.bizo=[];if(a&&a.bizographics){var a=a.bizographics,b;for(b in a)if(a.hasOwnProperty(b)){var c=a[b];if(c)if(jQuery.isArray(c))for(var e=0;e<c.length;e++){var d=c[e];d.code&&GD.ads._htData.bizo.push(d.code)}else c.code&&GD.ads._htData.bizo.push(c.code)}}GD.ads._checkAllFetchesComplete()};
GD.ads._fetchQuantcastTargeting=function(){jQuery.ajax({url:"http://pixel.quantserve.com/api/segments.json",data:{a:"p-77hG-A4X4ka9Q"},dataType:"jsonp",success:function(a){GD.ads._onQuantcastComplete(a)},error:function(){GD.ads._onQuantcastComplete(null)}})};GD.ads._onQuantcastComplete=function(a){GD.ads._htData.quantcast=[];if(a&&a.segments&&(a=a.segments,jQuery.isArray(a)&&0<a.length))for(var b=0;b<a.length;b++)GD.ads._htData.quantcast.push(a[b].id);GD.ads._checkAllFetchesComplete()};
GD.ads._checkAllFetchesComplete=function(){GD.ads._pendingServicesCount-=1;0>=GD.ads._pendingServicesCount&&(GD.ads._setTargetingCache(),GD.ads._setTargetSegments())};GD.ads._loadTargetingCache=function(){var a=!1,b=jQuery.cookies.get(GD.ads.TARGETING_COOKIE_NAME);if(b&&(b.quantcast||b.bizo))GD.ads._htData=b,GD.ads._setTargetSegments(),a=!0;return a};GD.ads._setTargetingCache=function(){var a=new Date,a=new Date(a.getTime()+864E5);jQuery.cookies.set(GD.ads.TARGETING_COOKIE_NAME,GD.ads._htData,{expiresAt:a})};
GD.ads._setTargetSegments=function(){if(GD.ads._htData)for(var a=0;a<GD.ads._htServices.length;a++){var b=GD.ads._htServices[a];GD.ads.setAdTargetingAttr(b,GD.ads._htData[b])}};window.GD=window.GD||{};GD.ads=GD.ads||{};GD.ads.hideUnusedAdSlots=function(){try{$(".adSlotContainer").each(function(){var a=$(this);10>a.height()&&a.css("display","none")})}catch(b){Logger.fatal("GD.aug.collapseAdSlots",b)}};window.GD=window.GD||{};GD.ajax=GD.ajax||{};GD.ajax.jsonUrls={};GD.ajax.jsonUrls.CITY_AUTOCOMPLETE="/findCityAjax.htm";GD.ajax.jsonUrls.ANY_LOCATION_AUTOCOMPLETE="/findAnyLocationAjax.htm";GD.ajax.jsonUrls.GRAPH_AUTOCOMPLETE={employer:"/findGraphEmployerAjax.htm",school:"/findGraphSchoolAjax.htm"};
GD.ajax.submitForm=function(a,c,b,d){if("string"!==typeof a&&"object"!==typeof a)throw"form passed to 'GD.ajax.submitForm' must be a form ID string or form object!";a=$(a);if("string"!==typeof c)throw"formHandlerUrl passed to 'GD.ajax.submitForm' must be a string!";if("function"!==typeof d)throw"callbackFunc passed to 'GD.ajax.submitForm' must be a function!";a=a.serialize();jQuery.ajax({url:c,data:a,dataType:b,error:function(a,b){d(b,null)},success:function(a,b){d(b,a)}})};
GD.ajax.formatACItem=function(a,c,b){var a=a.val(),d=b.label?b.label:b;a&&(d=GD.ajax._findAndBoldQueryString(a,d));return $("<li></li>").data("item.autocomplete",b).append("<a>"+d+"</a>").appendTo(c)};
GD.ajax.createEmployerAutoComplete=function(a,c,b){var d=GD.util.getAjaxUrlRespectingSecurity("/findEmployerAjax.htm?ac=true"),e=$(a),f=$(c);(a=e.attr("id"))||(a="EmployerEditField");0===e.length?Logger.warn("GD.ajax.createEmployerAutoComplete called with invalid employer edit field: "+a):(c={minLength:2,delay:100,source:d,create:function(){var b=e.data("uiAutocomplete");e.addClass("glassdoorAC");b.menu.element.addClass("employer-ac-results");b.menu.element.attr("id",a+"_ACPopup")},select:function(a,
c){if(c.item&&(e.val(c.item.label),f.val(c.item.id),jQuery.isFunction(b)))try{b(c.item.label,c.item.id)}catch(d){Logger.error("Error calling onSelect method for GD.ajax.createEmployerAutoComplete",d)}return!1},open:function(){e.addClass("ui-autocomplete-opened")},close:function(){e.removeClass("ui-autocomplete-opened")}},e.keydown(function(a){return GD.ajax._onACKeyPress(a,f)}),e.blur(function(){e.hasClass("ui-autocomplete-opened")||e.autocomplete("close").autocomplete("disable").autocomplete("enable")}),
e.autocomplete(c).data("uiAutocomplete")._renderItem=function(a,b){return GD.ajax.formatACItem(e,a,b)})};
GD.ajax.createJobSourceAutoComplete=function(a,c,b){var d=$(a),e=$(c);(a=d.attr("id"))||(a="JobSourceEditField");0===d.length?Logger.warn("GD.ajax.createJobSourceAutoComplete called with invalid jobSource edit field: "+a):("function"!==typeof b&&(b=null),c={minLength:2,delay:100,source:"/findJobSourceAjax.htm?ac=true",create:function(){var b=d.data("uiAutocomplete");d.addClass("glassdoorAC");b.menu.element.addClass("jobSource-ac-results");b.menu.element.attr("id",a+"_ACPopup")},select:function(a,
c){if(c.item&&(d.val(c.item.label).focus(),e.val(c.item.id),jQuery.isFunction(b)))try{b(c.item.label,c.item.id)}catch(h){Logger.error("Error calling onSelect method for GD.ajax.createJobSourceAutoComplete",h)}return!1},open:function(){d.addClass("ui-autocomplete-opened")},close:function(){d.removeClass("ui-autocomplete-opened")}},d.keydown(function(a){return GD.ajax._onACKeyPress(a,e)}),d.blur(function(){d.hasClass("ui-autocomplete-opened")||d.autocomplete("disable").autocomplete("close").autocomplete("enable")}),
d.autocomplete(c).data("uiAutocomplete")._renderItem=function(a,b){return GD.ajax.formatACItem(d,a,b)})};GD.ajax.createGraphEmployerAutoComplete=function(a,c,b){a=$(a);c=$(c);GD.ajax._createGraphAutoComplete("employer","GD.ajax.createGraphEmployerAutoComplete",a,c,b)};GD.ajax.createGraphSchoolAutoComplete=function(a,c,b){a=$(a);c=$(c);GD.ajax._createGraphAutoComplete("school","GD.ajax.createGraphSchoolAutoComplete",a,c,b)};
GD.ajax._createGraphAutoComplete=function(a,c,b,d,e){var f,g=a.toTitleCase(),h=GD.ajax.jsonUrls.GRAPH_AUTOCOMPLETE[a];0===b.length?Logger.warn(c+" called with invalid edit field: "+f):(f=b.attr("id"),f||(f="Graph"+g+"EditField-"+(new Date).getTime(),b.attr("id",f)),jQuery.isFunction(e)||(e=null),c={minLength:2,delay:100,source:h,create:function(){var c=b.data("uiAutocomplete");b.addClass("glassdoorAC");c.menu.element.addClass(a+"-ac-results graph-"+a+"-ac-results graph-ac-results");c.menu.element.attr("id",
f+"_ACPopup");return true},select:function(a,c){if(c.item){b.val(c.item.name).focus();d.val(c.item.id);e&&e(c.item.name,c.item.id,c.item)}return false},open:function(){var a=b.data("uiAutocomplete"),a=$(a.menu.element);b.addClass("ui-autocomplete-opened");GD.ajax._scrollToACMenu(a);return true},close:function(){b.removeClass("ui-autocomplete-opened");return true}},b.keydown(function(a){return GD.ajax._onACKeyPress(a,d)}),b.blur(function(){b.hasClass("ui-autocomplete-opened")||b.autocomplete("disable").autocomplete("close").autocomplete("enable")}),
b.autocomplete(c).data("uiAutocomplete")._renderItem=function(a,c){return GD.ajax._formatGraphACItem(b,a,c)})};GD.ajax._scrollToACMenu=function(a){GD.wait(50).then(function(){var c=$(window),b=c.scrollTop(),c=c.height(),d=a.offset(),e=a.outerHeight();e+40<c&&(b=d.top+e-(b+c)+10,0<b&&$.scrollTo("+="+b+"px",{duration:400}))})};
GD.ajax._formatGraphACItem=function(a,c,b){var d=a.val(),a=b.name;d&&(a=GD.ajax._findAndBoldQueryString(d,a));d=$("<li></li>");d.data("item.autocomplete",b);var e=$("<div class='desc'></div>");e.append($("<p class='graphName'></p>").html(a));a=$("<a></a>");b.avatarSqThumbUrl?a.append("<img src='"+b.avatarSqThumbUrl+"' />"):a.append("<img src='/static/img/spacer.gif' class='noAvatar generic' />");a.append(e);a.append("<div class='clear'></div>");d.append(a);return d.appendTo(c)};
GD.ajax.createLocationAutoComplete=function(a,c,b,d,e){var f=GD.util.getAjaxUrlRespectingSecurity(GD.ajax.jsonUrls.CITY_AUTOCOMPLETE),g=$(a),h=$(c),i=$(b),k=$(e),j=h.attr("id");j||(j="CityEditField-"+(new Date).getTime());if(0===h.length)Logger.warn("GD.ajax.createLocationAutoComplete called with invalid city edit field: "+c);else if(0===i.length)Logger.warn("GD.ajax.createLocationAutoComplete called with invalid city ID field: "+b);else{queryUrl=f;if(g.length){a=$("option:selected",g).val();"string"===
typeof a&&(a=parseInt(a,10),isNaN(a)&&(a=0));if(!a||0>=a)a=1;queryUrl+="?countryId="+a}a={minLength:2,delay:100,source:queryUrl,create:function(){var a=h.data("uiAutocomplete");h.addClass("glassdoorAC");a.menu.element.addClass("location-ac-results");a.menu.element.attr("id",j+"_ACPopup")},select:function(a,b){b.item&&(h.val(b.item.label).focus(),i.val(b.item.locationId));jQuery.isFunction(d)&&d(b.item.label,b.item.locationId);return!1},open:function(){h.addClass("ui-autocomplete-opened");return!0},
close:function(){h.removeClass("ui-autocomplete-opened");return!0}};g.length&&(g[0].updateCityField=function(a){var b=$("option:selected",g).val(),c=!0;if(!b||0>=b)c=!1;a&&(c?(a.autocomplete("enable"),k.show(),a.show()):(k.hide(),a.hide(),a.autocomplete("disable")))});g.change(function(){GD.ajax.createLocationAutoComplete.onCountryListChange(this.updateCityField,g,h,i,f);return true});g.keydown(function(a){GD.ajax.createLocationAutoComplete.onCountryListKeyDown(a,this.updateCityField,g,h,i,f);return true});
h.keydown(function(a){return GD.ajax._onACKeyPress(a,i)});h.blur(function(){h.hasClass("ui-autocomplete-opened")||h.autocomplete("disable").autocomplete("close").autocomplete("enable");h.val().length<1&&i.val("0")});h.autocomplete(a).data("uiAutocomplete")._renderItem=function(a,b){return GD.ajax.formatACItem(h,a,b)}}};
GD.ajax.createLocationAutoComplete.onCountryListKeyDown=function(a,c,b,d,e,f){a.keyCode!=GD.event.TAB&&GD.wait().then(function(){GD.ajax.createLocationAutoComplete.onCountryListChange(c,b,d,e,f)});return!0};GD.ajax.createLocationAutoComplete.onCountryListChange=function(a,c,b,d,e){jQuery.isFunction(a)&&a(b);b.val("");d.val("");a=$("option:selected",c).val();if(!a||0>=a)a=1;b.autocomplete("option","source",e+"?countryId="+a);return!0};
GD.ajax.createJobAutoComplete=function(a,c,b,d){var e=$(a),f=$(c);(a=e.attr("id"))||(a="JobTitleEditField");0===e.length?Logger.warn("GD.ajax.createEmployerAutoComplete called with invalid job title edit field: "+a):0===f.length?Logger.warn("GD.ajax.createEmployerAutoComplete called with invalid occupation ID field: "+c):(c={minLength:1,delay:100,create:function(){var b=e.data("uiAutocomplete");e.addClass("glassdoorAC");b.menu.element.addClass("job-title-ac-results");b.menu.element.attr("id",a+"_ACPopup");
return!0},source:function(a,c){GD.ajax.getMatchingItemsFromStaticList(a,c,b,10)},focus:function(a,b){e.val(b.item.label);return!1},select:function(a,b){b.item&&(e.val(b.item.label).focus(),f.val(b.item.value),jQuery.isFunction(d)&&d(b.item.label,b.item.value));return!1},open:function(){e.addClass("ui-autocomplete-opened")},close:function(){e.removeClass("ui-autocomplete-opened")}},e.autocomplete(c).data("uiAutocomplete")._renderItem=function(a,b){return GD.ajax.formatACItem(e,a,b)})};
GD.ajax.createEmployerAwardNameAutoComplete=function(a,c){var b=$(a),d;(a=b.attr("id"))||(a="AwardNameEditField");0===b.length?Logger.warn("GD.ajax.createEmployerAutoComplete called with invalid award name edit field: "+a):(d={minLength:2,delay:100,source:"/findEmployerAwardNameAjax.htm",create:function(){var c=b.data("uiAutocomplete");b.addClass("glassdoorAC");c.menu.element.addClass("award-name-ac-results");c.menu.element.attr("id",a+"_ACPopup")},open:function(){b.addClass("ui-autocomplete-opened")},
close:function(){b.removeClass("ui-autocomplete-opened")}},jQuery.isFunction(c)&&(d.select=function(a,b){c(b.item.label)}),b.autocomplete(d).data("uiAutocomplete")._renderItem=function(a,c){return GD.ajax.formatACItem(b,a,c)})};
GD.ajax.createEmployerAwardSourceAutoComplete=function(a,c){var b=$(a),d;(a=b.attr("id"))||(a="AwardSourceEditField");0===b.length?Logger.warn("GD.ajax.createEmployerAwardSourceAutoComplete called with invalid award source edit field: "+a):(d={minLength:2,delay:100,source:"/findEmployerAwardSourceAjax.htm",create:function(){var c=b.data("uiAutocomplete");b.addClass("glassdoorAC");c.menu.element.addClass("award-source-ac-results");c.menu.element.attr("id",a+"_ACPopup")},open:function(){b.addClass("ui-autocomplete-opened")},
close:function(){b.removeClass("ui-autocomplete-opened")}},jQuery.isFunction(c)&&(d.select=function(a,b){c(b.item.label)}),b.autocomplete(d).data("uiAutocomplete")._renderItem=function(a,c){return GD.ajax.formatACItem(b,a,c)})};
GD.ajax.createPartnerAutoComplete=function(a,c,b,d){var d="findPartnerAjax.htm?ac=true"+(d?"&ats="+d:""),e=$(a),f=$(c);(a=e.attr("id"))||(a="PartnerEditField");0===e.length?Logger.warn("GD.ajax.createPartnerAutoComplete called with invalid partner edit field: "+a):0===f.length?Logger.warn("GD.ajax.createPartnerAutoComplete called with invalid partner ID field: "+c):("function"!==typeof b&&(b=null),c={minLength:2,delay:100,source:d,create:function(){var b=e.data("uiAutocomplete");e.addClass("glassdoorAC");
b.menu.element.addClass("partner-ac-results");b.menu.element.attr("id",a+"_ACPopup")},select:function(a,c){c.item&&(e.val(c.item.label).focus(),f.val(c.item.id),jQuery.isFunction(b)&&b(c.item.label,c.item.id));return!1},open:function(){e.addClass("ui-autocomplete-opened")},close:function(){e.removeClass("ui-autocomplete-opened")}},e.keydown(function(a){return GD.ajax._onACKeyPress(a,f)}),e.autocomplete(c).data("uiAutocomplete")._renderItem=function(a,b){return GD.ajax.formatACItem(e,a,b)})};
GD.ajax.createImportConfigAutoComplete=function(a,c,b){var d=$(a),e=$(c);(a=d.attr("id"))||(a="ImportConfigEditField");0===d.length?Logger.warn("GD.ajax.createImportConfigAutoComplete called with invalid importConfig edit field: "+a):0===e.length?Logger.warn("GD.ajax.createImportConfigAutoComplete called with invalid importConfig ID field: "+c):("function"!==typeof b&&(b=null),c={minLength:2,delay:100,source:"findImportConfigAjax.htm?autocomplete=true&showDisabled=true",create:function(){var b=d.data("uiAutocomplete");
d.addClass("glassdoorAC");b.menu.element.addClass("importConfig-ac-results");b.menu.element.attr("id",a+"_ACPopup")},select:function(a,c){c.item&&(d.val(c.item.label).focus(),e.val(c.item.id),jQuery.isFunction(b)&&b(c.item.label,c.item.id));return!1},open:function(){d.addClass("ui-autocomplete-opened")},close:function(){d.removeClass("ui-autocomplete-opened")}},d.keydown(function(a){return GD.ajax._onACKeyPress(a,e)}),d.autocomplete(c).data("uiAutocomplete")._renderItem=function(a,b){return GD.ajax.formatACItem(d,
a,b)})};
GD.ajax.selectAutoComplete=function(a,c,b,d,e,f){var g=$(a),a=$("select",g),h=a.attr("id"),c=a.attr("name"),i;a.length&&(i=$("option",a));g.addClass("multipleAC cf");var k=[];i.each(function(){var a=$(this),a={id:a.val(),label:a.text(),selected:a.is(":selected")};k.push(a)});g.data("acItems",k);g.data("selectName",c);a.remove();var j=$("<input type='text' class='acEditField' />");h&&j.attr("id",h);g.empty();g.append(j);for(i=0;i<k.length;i++)a=k[i],a.selected&&GD.ajax.selectAutoComplete._addSelectedItem(g,j,
a,e,f,b);g.click(function(a){j.focus();a.stopPropagation()});j.keydown(function(a){GD.ajax.selectAutoComplete._onKeydown(a,g,j)});d={minLength:1,delay:100,create:function(){var a=j.data("uiAutocomplete");a.menu.element.addClass("multi-ac-results");a.menu.element.attr("id",h+"_ACPopup");return!0},source:d+(0<d.indexOf("?")?"&":"?")+"autocomplete=true",focus:function(a,b){j.val(b.item.label);return!1},select:function(a,c){c.item&&GD.ajax.selectAutoComplete._selectItem(g,j,c.item,e,f,b);j.val("");return!1}};
j.autocomplete(d).data("uiAutocomplete")._renderItem=function(a,b){return GD.ajax.formatACItem(j,a,b)}};GD.ajax.selectAutoComplete._onKeydown=function(a,c,b){c=!0;b=0<b.val().trim().length;if(a&&b)switch(13===a.which&&(c=!1),String.fromCharCode(a.which)){case "\t":c=!1;break;case "\n":case "\r":c=!1}c||(a.preventDefault(),a.stopPropagation())};GD.ajax.selectAutoComplete._selectItem=function(a,c,b,d,e,f){GD.ajax.selectAutoComplete._addSelectedItem(a,c,b,d,e,f);b.selected=!0};
GD.ajax.selectAutoComplete._addSelectedItem=function(a,c,b,d,e,f){var g="div ";e&&(g="span ");var e="<"+g+'class="selectedItem" title="%TITLE%"><span class="textPart"></span><img src=\'/static/img/spacer.gif\' class=\'closeBox\' /></'+g+">",h="<"+g+"class=\"selectedItem\" title=\"%TITLE%\"><a href='%URL%' target='_blank'><span class='textPart'></span></a><img src='/static/img/spacer.gif' class='closeBox' /></"+g+">",g=b.label,i=a.data("selectName");jQuery.isFunction(d)&&(d=d(a,b))&&(e=h.replace(/%URL%/,
d));d="ID "+b.id;d=d.replace('"',"");e=e.replace(/%TITLE%/,d);e=$(e);c.before(e);e.attr("value",b.id);$(".textPart",e).html(g);$("img",e).click(function(c){GD.ajax.selectAutoComplete._onCloseBoxClick(a,b,c,f);c.stopPropagation()});0===$('input[type="hidden"][value="'+b.id+'"]',a).length&&a.append('<input type="hidden" name="'+i+'" value="'+b.id+'" />');jQuery.isFunction(f)&&f(a,c,b)};
GD.ajax.selectAutoComplete._onCloseBoxClick=function(a,c,b,d){GD.ajax.selectAutoComplete._deselectItem(a,c.id);jQuery.isFunction(d)&&d()};GD.ajax.selectAutoComplete._deselectItem=function(a,c){var b=$('.selectedItem[value="'+c+'"]',a),d=a.data("acItems",d),e=!1;a.data("selectName");b.remove();$("input.acEditField",a).focus();for(b=0;b<d.length&&!e;b++){var f=d[b];f.id==c&&(f.selected=!1,e=!0)}d=$('input[type="hidden"][value="'+c+'"]',a);d.length&&d.remove()};
GD.ajax.getMatchingItemsFromStaticList=function(a,c,b,d){var e=[];if(a&&a.term)for(var a=a.term.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),a=RegExp(a,"i"),f=0;f<b.length&&e.length<d;f++)b[f].label&&a.test(b[f].label)?e.push(b[f]):a.test(b[f])&&e.push(b[f]);c(e)};GD.ajax._onACKeyPress=function(a,c,b){GD.event.isTextChangeKeystroke(a)&&(c&&c.length&&c.val(""),b&&b.length&&b.val(""));return!0};GD.ajax._boldString=function(a){return-1===a.indexOf("<")?"<b>"+a+"</b>":a};
GD.ajax._expandGeoAbbreviations=function(a){a=GD.ajax._abbreviationReplaceHelper(a,"ft","Fort");a=GD.ajax._abbreviationReplaceHelper(a,"mt","Mount");a=GD.ajax._abbreviationReplaceHelper(a,"pt","Point");a=GD.ajax._abbreviationReplaceHelper(a,"st","Saint");a=GD.ajax._abbreviationReplaceHelper(a,"intl","International");a=GD.ajax._abbreviationReplaceHelper(a,"n","North");a=GD.ajax._abbreviationReplaceHelper(a,"s","South");a=GD.ajax._abbreviationReplaceHelper(a,"e","East");a=GD.ajax._abbreviationReplaceHelper(a,
"w","West");a=GD.ajax._abbreviationReplaceHelper(a,"ne","Northeast");a=GD.ajax._abbreviationReplaceHelper(a,"nw","Northwest");a=GD.ajax._abbreviationReplaceHelper(a,"se","Southeast");return a=GD.ajax._abbreviationReplaceHelper(a,"sw","Southwest")};
GD.ajax._expandOccupationAbbreviations=function(a){a=GD.ajax._abbreviationReplaceHelper(a,"sr","Senior");a=GD.ajax._abbreviationReplaceHelper(a,"jr","Junior");a=GD.ajax._abbreviationReplaceHelper(a,"mgr","Manager");return a=GD.ajax._abbreviationReplaceHelper(a,"dir","Director")};GD.ajax._abbreviationReplaceHelper=function(a,c,b){a=GD.ajax._replaceStringSmartCase(a,c+"\\.",b);return a=GD.ajax._replaceStringSmartCase(a,c,b)};
GD.ajax._replaceStringSmartCase=function(a,c,b){if(a.length==c.length)return a;a=a.replace(RegExp("\\b"+c.toLowerCase()+"( |$|\\b)"),b+" ").trim();a=a.replace(RegExp("\\b"+c.toUpperCase()+"( |$|\\b)"),b+" ").trim();a=a.replace(RegExp("\\b"+c.capitalize()+"( |$|\\b)"),b+" ").trim();return a=a.replace(/ ,/,",")};
GD.ajax._cleanSearchString=function(a){a=GD.ajax._replaceStringSmartCase(a,"http","");a=GD.ajax._replaceStringSmartCase(a,"www\\.","");a=GD.ajax._replaceStringSmartCase(a,"intl","");a=GD.ajax._replaceStringSmartCase(a,"int'l","");a=GD.ajax._replaceStringSmartCase(a,"corp","");a=GD.ajax._replaceStringSmartCase(a,"corp.","");a=GD.ajax._replaceStringSmartCase(a,"corporation","");a=GD.ajax._replaceStringSmartCase(a,"inc","");a=GD.ajax._replaceStringSmartCase(a,"inc.","");a=GD.ajax._replaceStringSmartCase(a,
"incorporated","");a=GD.ajax._replaceStringSmartCase(a,"cos","");a=GD.ajax._replaceStringSmartCase(a,"cos.","");a=GD.ajax._replaceStringSmartCase(a,"svcs","");a=GD.ajax._replaceStringSmartCase(a,"mgmt","");a=GD.ajax._expandGeoAbbreviations(a);a=GD.ajax._expandOccupationAbbreviations(a);a=a.replace(/(\\b[A-Za-z][A-Za-z]{0,2})[ ]*&[ ]*([A-Za-z][A-Za-z]{0,2}\\b)/g,"$1$2");a=a.replace(/\&/g," ");a=a.replace(/[\&\'\!\|~\*]/g,"");a=a.replace(/\.[^c]/g,"");return a=a.replace(/[\?\^\-\:\;\(\)\+\/\\\[\]]/g,
" ")};GD.ajax._findAndBoldQueryString=function(a,c){for(var b=GD.ajax._cleanSearchString(a).trim().split(/\s+/),d="(<.+>)",e=!1,f=0;f<b.length;f+=1)0<b[f].length&&(e?e=!1:d+="|",d=d+"(\\b"+b[f]+")"),c=c.replace(RegExp(d,"ig"),GD.ajax._boldString);return c};GD.ajax.setDisambiguatedCity=function(a,c,b){var a=$(a),a=$("option:selected",a),c=$(c),b=$(b),d;d=a.length&&0>=a.val()?"":a.text();c.val(d);b.val(a.val())};
GD.ajax.updateWordCounter=function(a,c,b,d,e){if(c=id(c))a=id(a).value.countWords(),c.innerHTML=e&&0>=a?"&nbsp;":GD.i18n.fmtInt(a)+" words completed"};GD.ajax.updateCharCounter=function(a,c,b,d,e){id(c)&&(a=id(a).value.length,e&&0>=a?id(c).innerHTML="&nbsp;":id(c).innerHTML=a+" characters entered")};GD.ajax.keepAliveIntervalId=null;GD.ajax.keepAliveHoursSoFar=0;GD.ajax.keepAliveHoursMax=0;
GD.ajax.keepSessionAlive=function(a){a=parseInt(a,10);isNaN(a)?a=24:0>a&&(a=8765);if(GD.ajax.keepAliveIntervalId)try{window.clearInterval(GD.ajax.keepAliveIntervalId)}catch(c){}GD.ajax.keepAliveHoursSoFar=0;GD.ajax.keepAliveHoursMax=0;0<a&&(GD.ajax.keepAliveHoursMax=a,GD.ajax.keepAliveIntervalId=window.setInterval(GD.ajax._keepSessionAliveWorker,18E5))};
GD.ajax._keepSessionAliveWorker=function(){GD.ajax.keepAliveHoursSoFar+=1;if(GD.ajax.keepAliveHoursSoFar>=GD.ajax.keepAliveHoursMax)try{window.clearInterval(GD.ajax.keepAliveIntervalId)}catch(a){}else jQuery.ajax({url:"/extendSessionAjax.htm",dataType:"json"})};
GD.ajax.initEditInPlace=function(a,c,b,d,e){if("string"!==typeof a||0===a.length)throw"idPrefix must be specified as a non-empty string to GD.ajax.initEditInPlace";"boolean"!==typeof c&&(c=!1);"boolean"!==typeof b&&(b=!1);"function"!==typeof d&&(d=null);"function"!==typeof e&&(e=null);var f=$("#"+a+"View"),g=$("#"+a+"Wrapper"),h=$("#"+a+"ViewControls"),i=$("#"+a+"EditControls"),k=$("#"+a+"Edit");f[0].editor=k;g.length&&(f[0].wrapper=g);h.length&&(f[0].viewControls=h);d&&(f[0].onEditEnter=d);e&&(f[0].onEditCancel=
e);i.length&&(f[0].editControls=i,i.attr("prevDisplay",i.css("display")),i.css("display","none"));d=function(){GD.ajax.showEditInPlace(a);return false};c?f.dblclick(d):b&&f.click(d);k.keydown(function(a){if(a.keyCode===GD.event.TAB){a=true;f[0].onEditEnter&&(a=f[0].onEditEnter());a&&GD.ajax.finishEditInPlace(this)}});k.keyup(function(b){if(b.keyCode===GD.event.ESCAPE){b=true;f[0].onEditCancel&&(b=f[0].onEditCancel());b&&GD.ajax.finishEditInPlace(a,true);return false}return b.keyCode===GD.event.TAB?
false:true})};
GD.ajax.showEditInPlace=function(a){var c=$("#"+a+"View"),a=c[0].editor,b=c[0].wrapper,d=c[0].viewControls,e=c[0].editControls;if(!a)return!0;a[0].currentView&&GD.ajax.finishEditInPlace(a);a[0].currentView=c;a.keypress(function(a){return 13===a.keyCode?(a=!0,c[0].onEditEnter&&(a=c[0].onEditEnter()),a&&GD.ajax.finishEditInPlace(this,!1),!1):!0});"TEXTAREA"===a[0].nodeName&&(a.css("width",c.offsetWidth),a.css("height",c.offsetHeight));a.val(c.html());a.css("visibility","visible");a.css("display","inline");
b.length&&b.css("visibility","hidden");c.hide();d.length&&(d.attr("prevDisplay",d.css("display")),d.css("display","none"));e.length&&("none"!=e.attr("prevDisplay")?e.css("display",e.attr("prevDisplay")):e.css("display","block"),e.removeAttr("prevDisplay"));a.focus();return!1};
GD.ajax.finishEditInPlace=function(a,c){"boolean"!==typeof c&&(c=!1);"string"===typeof a&&(a="#"+a+"Edit");var a=$(a),b=a[0].currentView;if(b&&b.length){var d=b[0].wrapper,e=b[0].viewControls,f=b[0].editControls;c||b.html(a.val());a.css("visibility","hidden");a.css("display","none");d.length&&d.css("visibility","visible");f.length&&(f.attr("prevDisplay",f.css("display")),f.css("display","none"));e.length&&("none"!=e.attr("prevDisplay")?e.css("display",e.prevDisplay):e.css("display","block"),e.removeAttr("prevDisplay"));
b.show()}a.removeAttr("currentView")};GD.ajax.isEditInPlace=function(a){var c=!1,a=$("#"+a+"View"),b=a[0].editor;b&&b.length&&(b=b[0].currentView)&&b.length&&(c=a[0]===b[0]);return c};
GD.ajax.createJobTitleAutoComplete=function(a,c,b,d){var a=(a=$(a).val())&&0<a?GD.util.getAjaxUrlRespectingSecurity("/findJobTitleAjax.htm?employerId="+a):GD.util.getAjaxUrlRespectingSecurity("/findJobTitleAjax.htm"),e=$(c),f=$(b);(c=e.attr("id"))||(c="jobTitleEditField");0===e.length?Logger.warn("GD.ajax.createjobTitleAutoComplete called with invalid jobTitle edit field: "+c):(b={minLength:2,delay:100,source:a,create:function(){var a=e.data("uiAutocomplete");e.addClass("glassdoorAC");a.menu.element.addClass("employer-ac-results");
a.menu.element.attr("id",c+"_ACPopup")},select:function(a,b){if(b.item&&(e.val(b.item.label),f.val(b.item.id),jQuery.isFunction(d)))try{d(b.item.label,b.item.id)}catch(c){Logger.error("Error calling onSelect method for GD.ajax.createjobTitleAutoComplete",c)}return!1},open:function(){e.addClass("ui-autocomplete-opened")},close:function(){e.removeClass("ui-autocomplete-opened")}},e.keydown(function(a){return GD.ajax._onACKeyPress(a,f)}),e.blur(function(){e.hasClass("ui-autocomplete-opened")||e.autocomplete("close").autocomplete("disable").autocomplete("enable")}),
e.autocomplete(b).data("uiAutocomplete")._renderItem=function(a,b){return GD.ajax.formatACItem(e,a,b)})};window.GD=window.GD||{};GD.aug=GD.aug||{};GD.aug.augmentEmbedLinks=function(a){a=$(a);0===a.length&&(a=document);$(".embedWidgetLink",a).click(function(){GD.analytics.trackPartnerShare("embed");GD.shareContent.sharedContentPopup(0,$(this).attr("builderUrl"));return!1}).removeClass("embedWidgetLink")};
GD.aug.augmentButtons=function(){try{$("button.gd-button").each(function(){var a=$(this),b=a.attr("name");b&&a.attr("gdName",b).removeAttr("name")}),$("button.gd-button:not(.ui-state-disabled)").hover(function(){$(this).addClass("ui-state-hover")},function(){$(this).removeClass("ui-state-hover")}).mousedown(function(){var a=$(this);a.parents(".gd-buttonset-single:first").find(".gd-button.ui-state-active").removeClass("ui-state-active");a.is(".ui-state-active.gd-button-toggleable, .gd-buttonset-multi .ui-state-active")?
a.removeClass("ui-state-active"):a.addClass("ui-state-active")}).mouseup(function(){$(this).is(".gd-button-toggleable, .gd-buttonset-single .gd-button,  .gd-buttonset-multi .gd-button")||$(this).removeClass("ui-state-active")}).keydown(function(a){if(13==a.keyCode||32==a.keyCode)a=$(this),a.parents(".gd-buttonset-single:first").find(".gd-button.ui-state-active").removeClass("ui-state-active"),a.is(".ui-state-active.gd-button-toggleable, .gd-buttonset-multi .ui-state-active")?a.removeClass("ui-state-active"):
a.addClass("ui-state-active");return!0})}catch(a){Logger.fatal("GD.aug.augmentButtons",a)}};GD.aug.addHiddenButtonFieldsToForm=function(a){a=a?$(a):$("form");a.each(function(){var d=$(this);d.find("button.ui-state-active").each(function(){var b=$(this),e=b.attr("gdName"),b=b.attr("value"),c=d.find("input[type='hidden'][name='"+e+"']");e&&b?("NA"===b&&(b=0),c.length?c.val(b):(c=$("<input type='hidden'>"),c.attr("name",e).attr("value",b),a.append(c))):c&&c.remove()})})};GD.aug.CONTEXT_HELP_OK="contextHelpOK";
GD.aug.augmentContextHelpNodes=function(a){$nodes=a?$(a).not("."+GD.aug.CONTEXT_HELP_OK):$(".contextHelpLink").not("."+GD.aug.CONTEXT_HELP_OK);$nodes.each(function(){$(this).find("span[href]").each(function(){var a=$(this),b=a.attr("constrainTo"),e=a.attr("href").split("#")[1];if(e){var c=a.attr("helpWidth")||400,c=c-0;a.removeAttr("href").addClass("link");a.click(function(a){a=$(a.target);a.is(".contextHelpLink")||(a=a.closest(".contextHelpLink"));a.length&&GD.aug._contextHelpToggle(a,$("#"+e),c,
b)})}})});$nodes.addClass(GD.aug.CONTEXT_HELP_OK)};GD.aug._contextHelpToggle=function(a,d,b,e){try{!0===GD.dialog.contextHelpShown?GD.dialog.contextHelpShown=!1:GD.dlgManager.showHelp(a,d,b,e)}catch(c){Logger.fatal("GD.aug.contextHelpToggle",c)}};GD.aug.tagsMaxTagLength=50;GD.aug.maxInitialSuggestions=8;GD.aug.maxSuggestions=50;GD.aug.tagsEditAreaPostfix="_Edit";GD.aug.tagsEditFieldPostfix="_EditField";GD.aug.tagsFieldValuePostfix="_Value";GD.aug.tagsHelpAreaPostfix="_Help";
GD.aug.tagsSeeMoreLinkPostfix="_SeeMoreLink";GD.aug.tagsSeeMoreTagsPostfix="_SeeMoreTags";GD.aug.classNameTagEditor="tagEditor";GD.aug.classNameTagEditorEditArea="editArea";GD.aug.classNameTagEditorEditField="editField";GD.aug.classNameTagEditorHelpArea="helpArea";GD.aug.classNameTagEditorEnteredTag="enteredTag";GD.aug.classNameTagEditorEnteredTagHilited="enteredTagHilited";GD.aug.classNameTagEditorEnteredTagText="enteredTagText";GD.aug.classNameTagEditorEnteredTagClose="closeBox";
GD.aug.classNameTagEditorAutoComplete="tagEditorAC";GD.aug.augmentTagFields=function(){$("input.tagEditor").each(function(){GD.aug.augmentTagField($(this))})};
GD.aug.augmentTagField=function(a){var d=a.attr("id"),b=a.attr("name").trim(),e=a.val().trim(),c=a.attr("onchange"),f=a.data("suggestions"),g=a.data("existingTagsId"),h=a.data("existingTagsList"),i;g&&(g=g.trim(),0<g.length&&(i=$("#"+g).data("tags")));h&&(h=h.trim(),0<h.length&&(i+=","+h.trim()));"string"===typeof f&&(f=f.trim());a.attr("id",d+"_OldNode");"string"===typeof c?c=new Function(c):"function"!==typeof c&&(c=null,Logger.warn("GD.aug.augmentTagField: onchange must be function or string."));
b=GD.aug._createTagEditorNode(d,b,e,f,i,c);b.length&&(a.replaceWith(b),GD.aug._tagAutoComplete(d,i))};GD.aug.createTagField=function(a,d,b,e,c,f){var g=id(a);g?"input"!=g.nodeName.toLowerCase()?alert("tag field should be applied to an 'input' element.  You tried to apply it to a '"+g.nodeName.toLowerCase()+"' element."):((a=GD.aug._createTagEditorNode(d,b,e,c,f))&&g.appendChild(a),GD.aug._tagAddAutoComplete(d,f)):alert("GD.aug.addTagField called without valid container: '"+a+"'")};
GD.aug.addTags=function(a,d){var b=$("#"+a+GD.aug.tagsEditAreaPostfix),e=$("#"+a+GD.aug.tagsFieldValuePostfix);GD.aug._addTags(a,b,e,d)};
GD.aug.removeTags=function(a,d){if(!("string"!==typeof a||"string"!==typeof d)){var b=id(a+GD.aug.tagsEditAreaPostfix),d=d.trim();if(!(0>=d.length)){for(var e=$(b).find("span."+GD.aug.classNameTagEditorEnteredTagText),c=d.split(","),f=0;f<c.length;f++)for(var g=c[f],g=g.trim(),h=0;h<e.length;h++){var i=e.get(h);i.firstChild&&i.firstChild.nodeValue===g&&b.removeChild(i.parentNode)}GD.aug._removeTagValues(a,b,d)}}};
GD.aug.clearTags=function(a){var d=id(a+GD.aug.tagsFieldValuePostfix).value;GD.aug.removeTags(a,d)};
GD.aug._createTagEditorNode=function(a,d,b,e,c,f){if("string"!==typeof a)alert("GD.aug.addTagField called without valid tagEditorId.");else if(a=a.trim(),0>=a.length)alert("GD.aug.addTagField called with an empty tagEditorId.");else if("string"!==typeof d)alert("tag field name is required.");else return d=d.trim(),"string"!==typeof b&&(b=""),b=b.trim(),"string"!==typeof e&&(e=""),e=e.trim(),c=$("<div>"),c.attr("id",a),c.addClass(GD.aug.classNameTagEditor),c.click(function(b){GD.aug._onTagEditorClick(b,
a)}),GD.aug._addTagEditAreaNode(a,c,d,b,f),GD.aug._addTagHelpNode(a,c,e),c};GD.aug._addTags=function(a,d,b,e){if("string"===typeof e){var c=b.val(),f;c&&(c=c.trim(),0<c.length&&(f=c.split(",")));f||(f=[]);e=e.split(",");for(c=0;c<e.length;c+=1){var g=e[c].trim();0<g.length&&!f.contains(g)&&(f.push(g),g=GD.aug._createEnteredTagNode(a,g),d.children(":last").before(g))}f.sort();b.val(f.join());d&&GD.aug._callOnChangeHandler(d.onchange)}};
GD.aug._removeTagValues=function(a,d,b){if(id(a)&&b&&("string"===typeof b&&(b=b.trim(),b=0<b.length?b.split(","):[]),b.length&&!(0>=b.length))){if(a=id(a+GD.aug.tagsFieldValuePostfix)){for(var e=a.value.trim(),c=[],e=0<e.length?e.split(","):[],f=0;f<e.length;f++){for(var g=e[f],h=!0,i=0;i<b.length&&h;i+=1)b[i].toLowerCase()===g&&(h=!1);h&&c.push(g)}a.value=0<c.length?c.join():""}d&&GD.aug._callOnChangeHandler(d.onchange)}};
GD.aug._addTagEditAreaNode=function(a,d,b,e,c){try{var f=$("<div>");f.attr("id",a+GD.aug.tagsEditAreaPostfix);f.addClass(GD.aug.classNameTagEditorEditArea);f.addClass("cf");d.append(f);var g=$("<input>");g.attr("id",a+GD.aug.tagsEditFieldPostfix);g.addClass(GD.aug.classNameTagEditorEditField);g.attr("name","temp_edit_"+b);g.attr("type","text");g.attr("maxLength",GD.aug.tagsMaxTagLength);g.keypress(function(b){return GD.aug._onTagEditorKeyPress(b,a)}).keydown(function(b){return GD.aug._onTagEditorKeyPress(b,
a)});g.blur(function(){return GD.aug._onTagEditorBlur(a)});f.append(g);g.attr("addTagOnReturn",!0);g.attr("addTagOnFocusLoss",!0);var h=$("<input>");h.attr("id",a+GD.aug.tagsFieldValuePostfix);h.attr("name",b);h.attr("type","hidden");d.append(h);GD.aug._addTags(a,f,h,e);f.change(c)}catch(i){Logger.fatal("GD.aug._addTagEditAreaNode",i)}};
GD.aug._addTagHelpNode=function(a,d,b){try{var e=$("<div>");e.attr("id",a+GD.aug.tagsHelpAreaPostfix);e.addClass(GD.aug.classNameTagEditorHelpArea);e.addClass("minorText");b?"string"===typeof b&&(b=b.trim(),b=b.split(",")):b=[];var c="";if(0<b.length){for(var f=b.length>GD.aug.maxInitialSuggestions+1,g=Math.min(b.length,GD.aug.maxSuggestions),c=c+"<span class='suggestedTags'>Suggested Tags: ",h=0;h<g;h++){var i=b[h];if(f&&h==GD.aug.maxInitialSuggestions){var j;j="onclick=\"GD.aug._seeMore('"+a+"')\"";
c+="<span id='"+(a+GD.aug.tagsSeeMoreLinkPostfix)+"'>&nbsp;";c+="&nbsp; <a "+j+" class='link'><strong class='nowrap'>See more</strong></a></span>";c+="<span class='hidden' id='"+(a+GD.aug.tagsSeeMoreTagsPostfix)+"'>"}0<h&&(c+=", ");var k=i.replace("'","&#39;"),l='GD.aug.addTags("'+a+'", "'+k+'");',c=c+"<span class='nowrap'>",c=c+("<a onclick='"+l+"'>"),c=c+i,c=c+"</a>",c=c+"</span>"}f&&(c=c+(" &nbsp; <a "+("onclick=\"GD.aug._seeLess('"+a+"')\"")+" class='link'><strong class='nowrap'>See less</strong></a>")+
"</span>");c+="</span>"}e.html(c);d.append(e)}catch(m){Logger.fatal("GD.aug._addTagHelpNode",m)}};
GD.aug._createEnteredTagNode=function(a,d){try{var b=document.createElement("div");b.className=GD.aug.classNameTagEditorEnteredTag;var e=document.createElement("span");e.innerHTML=d;e.className=GD.aug.classNameTagEditorEnteredTagText;var c=document.createElement("div");c.className=GD.aug.classNameTagEditorEnteredTagClose;c.onmouseover=GD.aug._onCloseBoxMouseOver;c.onmouseout=GD.aug._onCloseBoxMouseOut;c.onclick=function(b){GD.aug._onCloseBoxClick(b,a,d)};b.appendChild(e);b.appendChild(c);return b}catch(f){Logger.fatal("GD.aug._createEnteredTagNode",
f)}};GD.aug._onCloseBoxMouseOver=function(a){try{if(a=GD.event.fixEvent(a),a.target){var d=a.target.parentNode;d.className==GD.aug.classNameTagEditorEnteredTag&&(d.className=GD.aug.classNameTagEditorEnteredTagHilited)}}catch(b){Logger.fatal("GD.aug._onCloseBoxMouseOver",b)}};
GD.aug._onCloseBoxMouseOut=function(a){try{if(a=GD.event.fixEvent(a),a.target){var d=a.target.parentNode;d.className==GD.aug.classNameTagEditorEnteredTagHilited&&(d.className=GD.aug.classNameTagEditorEnteredTag)}}catch(b){Logger.fatal("GD.aug._onCloseBoxMouseOut",b)}};GD.aug._onCloseBoxClick=function(a,d,b){try{GD.aug._onCloseBoxMouseOut(a),GD.aug.removeTags(d,b),$("#"+d+GD.aug.tagsEditFieldPostfix).focus()}catch(e){Logger.fatal("GD.aug._onCloseBoxClick",e)}};
GD.aug._onTagEditorClick=function(a,d){try{$("#"+d+GD.aug.tagsEditFieldPostfix).focus()}catch(b){Logger.fatal("GD.aug._onTagEditorClick",b)}};GD.aug._onTagEditorBlur=function(a){try{var d=$("#"+a+GD.aug.tagsEditFieldPostfix);if(d.attr("addTagOnFocusLoss")){var b=d.val().trim().toLowerCase();0<b.length&&(GD.aug.addTags(a,b),d.val(""))}}catch(e){Logger.fatal("GD.aug._onTagEditorBlur",e)}};
GD.aug._onTagEditorKeyPress=function(a,d){var b=!0,e=$("#"+d+GD.aug.tagsEditFieldPostfix);if(a&&e.length){var c=!1,f=e.val().trim().toLowerCase(),g=0<f.length;13===a.which&&g&&(c=e.attr("addTagOnReturn"),b=!1);if(a.ctrlKey||a.altKey)return!0;switch(String.fromCharCode(a.which)){case ",":b=!1;g&&(c=!0);break;case '"':b=!1;break;case " ":b=0>=e.val().trim().length?!1:!0;break;case "\t":g&&(c="true"==e.attr("addTagOnReturn"),b=!1);break;case "\n":case "\r":g&&(c="true"==e.attr("addTagOnReturn"),b=!1)}c&&
(GD.aug.addTags(d,f),e.val("").focus())}return b};
GD.aug._tagAutoComplete=function(a,d){var b=$("#"+a);$("#"+a+GD.aug.tagsEditAreaPostfix);d&&(d=d.trim(),0>=d.length&&(d=null));if(b&&d){var e,c=$("#"+a+GD.aug.tagsEditFieldPostfix);e=d.split(",");for(b=0;b<e.length;b++)e[b]=e[b].trim();c.autocomplete({minLength:1,delay:100,source:function(a,b){GD.ajax.getMatchingItemsFromStaticList(a,b,e,10)},open:function(){GD.aug._tagAutoComplete.onResultsShow(c)},select:function(b,d){GD.aug._tagAutoComplete.onItemSelect(a,c,d.item);b.preventDefault()},close:function(){GD.aug._tagAutoComplete.onResultsClose(c)}}).data("uiAutocomplete")._renderItem=
function(a,b){return GD.ajax.formatACItem(c,a,b)}}};GD.aug._tagAutoComplete.onItemSelect=function(a,d,b){GD.wait().then(function(){d.length&&b.label&&(GD.aug.addTags(a,b.label),d.val("").focus())});return!0};GD.aug._tagAutoComplete.onResultsShow=function(a){a.length&&(a.removeAttr("addTagOnReturn"),a.removeAttr("addTagOnFocusLoss"));return!0};GD.aug._tagAutoComplete.onResultsClose=function(a){a.length&&(a.focus(),a.attr("addTagOnReturn",!0),a.attr("addTagOnFocusLoss",!0));return!0};
GD.aug._seeMore=function(a){try{var d=id(a+GD.aug.tagsSeeMoreLinkPostfix),b=id(a+GD.aug.tagsSeeMoreTagsPostfix);d.style.display="none";b.style.display="inline"}catch(e){Logger.fatal("GD.aug._seeMore",e)}};GD.aug._seeLess=function(a){try{var d=id(a+GD.aug.tagsSeeMoreLinkPostfix),b=id(a+GD.aug.tagsSeeMoreTagsPostfix);d.style.display="inline";b.style.display="none"}catch(e){Logger.fatal("GD.aug._seeLess",e)}};
GD.aug._callOnChangeHandler=function(a){try{"string"===typeof a?eval(a):"function"===typeof a&&a()}catch(d){Logger.fatal("GD.aug._callOnChangeHandler",d)}};GD.aug.dnArrowImg="url(/static/img/icons/arrows/down.gif)";GD.aug.rtArrowImg="url(/static/img/icons/arrows/right.gif)";GD.aug.hiliteColor="#ffffcc";GD.aug.hiliteSeconds=1;
GD.aug.augmentCollapsibleGroups=function(a){var d=$("div.collapsibleGroup"),b=$("div[data-role=collapsible]",d),e=$.extend({selector:"h5"},a);b.each(function(){var a=$(this),b=$(e.selector+":first",a),a=a.children().not(b);b.addClass("toggle link");b.on("click",GD.aug._onClickToggleItem);a.wrapAll("<div class='collapsibleBody'>")});d.show();if(window.location.hash){var c=$(window.location.hash);c.length&&GD.wait(1E3).then(function(){GD.aug._doItemToggle(c,!0)})}};
GD.aug.closeAllToggleItems=function(){$("dl.toggleItems dt").each(function(){GD.aug._displayToggleItemBlock($(this),!1)})};GD.aug._onClickToggleItem=function(){GD.aug._doItemToggle($(this))};GD.aug._hiliteToggleItemBlock=function(a){a.next().css("background-color","#fff").animate({backgroundColor:GD.aug.hiliteColor},1E3*GD.aug.hiliteSeconds,null,function(){GD.wait(1E3*GD.aug.hiliteSeconds).then(function(){GD.aug._dehiliteToggleItemBlock(a)})})};
GD.aug._dehiliteToggleItemBlock=function(a){a.next().animate({backgroundColor:"transparent"},3E3)};GD.aug._doItemToggle=function(a,d){var b="none"==a.next().css("display");b||(d=!1);GD.aug._displayToggleItemBlock(a,b,d)};
GD.aug._displayToggleItemBlock=function(a,d,b){"boolean"!=typeof b&&(b=!1);var e=a.next(),c;e.css("background-color","transparent");b&&(c=function(){GD.aug._hiliteToggleItemBlock(a)});d?(e.css("display","none"),e.slideDown("normal",c),a.addClass("opened")):(e.slideUp("normal",c),a.removeClass("opened"))};GD.aug.dancingEllipsesInterval=400;
GD.aug.augmentDancingEllipses=function(){var a=$(document);a.data("dancingEllipses")||(GD.wait(GD.aug.dancingEllipsesInterval).then(GD.aug.processDancingEllipses),a.data("dancingEllipses",!0))};GD.aug.processDancingEllipses=function(){$(".dancingEllipses").each(function(){var a=$(this),d=a.html(),b=0,e="...";d&&(d.endsWith("...")?(b=3,e=""):e=".",0<b&&(d=d.substring(0,d.length-b)),a.html(d+e))});GD.wait(GD.aug.dancingEllipsesInterval).then(GD.aug.processDancingEllipses)};
GD.aug.addDynamicForIds=function(a){var d;d=a?$(a):null;$("label[data-for-id]",d).each(function(a,e){GD.aug._doDynamicForId($(e),d)})};GD.aug._doDynamicForId=function(a,d){var b=$(a),e=b.data("forId"),c='[data-for-id="'+e+'"]',c=$("select"+c+",input"+c+",textarea"+c,d),f=(new Date).getTime(),e=e+"-"+f;b.attr("for",e);c.attr("id",e)};GD.aug.noAutoComplete=function(a){a.each(function(a,b){$(b).attr("autocomplete","off")})};window.GD=window.GD||{};GD.btn=GD.btn||{};GD.btn.INIT_PLEASE="initPls";GD.btn.READY="ready";GD.btn.init=function(a){var b=$(a),b=0===b.length?$(".gd-btn."+GD.btn.INIT_PLEASE):b.filter("."+GD.btn.INIT_PLEASE);b.each(function(){GD.btn._initOne($(this));b.removeClass(GD.btn.INIT_PLEASE)})};GD.btn.isEnabled=function(a){return!$(a).is(".disabled")};
GD.btn.enable=function(a,b){var c=$(a);"boolean"!==typeof b&&(b=!0);c.each(function(){var a=$(this);a.is("a.gd-btn-link")?b?a.hasClass("disabled")&&(a.removeClass("disabled"),a.data("href")&&(a.attr("href",a.data("href")),a.removeData("href"))):a.hasClass("disabled")||(a.addClass("disabled"),a.attr("href")&&(a.data("href",a.attr("href")),a.removeAttr("href"))):a.is("button.gd-btn")&&(b?(a.removeClass("disabled"),a.removeProp("disabled"),"BUTTON"==a.get(0).tagName&&a.removeAttr("disabled")):(a.addClass("disabled"),
a.prop("disabled","disabled"),"BUTTON"==a.get(0).tagName&&a.attr("disabled","disabled")))})};GD.btn.label=function(a,b){var c=$(a),d=c;c.each(function(){var a=$(this);if(a.length)if(a=$("span",a),b)a.html(b.trim());else return d=a.html().trim(),!1});return d};GD.btn._initOne=function(a){a.on("click",function(b){GD.btn._onClick(a,b)});a.on("keypress",function(b){GD.btn._isButtonClickKey(b)&&(b.stopPropagation(),GD.btn._onClick(a,b))})};
GD.btn._onClick=function(a,b){if(GD.btn.isEnabled(a))if(GD.btn._handleOnClickCode(a,b)){if(GD.btn._handleOneClick(a),a.is("gd-btn-link")){var c=a.data("href");c||(c=a.attr("href"));c&&GD.dom.loadUrl(c,$anchor.attr("target"));b.preventDefault()}}else b.preventDefault()};GD.btn._getBtnFromEvent=function(a){a=$(a.target);return a.is(".gd-btn")?a:a.closest(".gd-btn")};GD.btn._isButtonClickKey=function(a){return a.which==GD.event.SPACE||a.which==GD.event.ENTER};
GD.btn._handleOneClick=function(a){if(a.data("oneClick")){GD.wait().then(function(){GD.btn.enable(a,!1)});var b=a.data("oneClickLabel");b&&GD.btn.label(a,b)}};GD.btn.undoOneClick=function(a){if(a.data("oneClick")){GD.wait().then(function(){GD.btn.enable(a,!0)});var b=a.data("originalLabel");b&&GD.btn.label(a,b)}};GD.btn._handleOnClickCode=function(a,b){var c=a.data("onclick"),d=!0;if(c)try{!1===(new Function("event",c)).call(a,b)&&(d=!1)}catch(e){}return d};
GD.btn._setupHiddenField=function(a,b){var c=a.data("name"),d=a.data("value");if(c&&d){var e=$("input[type='hidden'][name='"+c+"']",b);e.length?e.attr({name:c,value:d}):$("<input type='hidden'>").attr({name:c,value:d}).appendTo(b)}};window.GD=window.GD||{};GD.debug=GD.debug||{};GD.debug.showPageInfoPopup=function(){"require strict";var a=$("#DebugInfoPopup");if(a.length){var b=a.parent();b.fadeIn("normal",function(){b.scrollTo("#DebugInfoPopup")})}else a=$("#PageInfo").clone(),a.attr("id","PageInfoPopup").css({position:"static",display:"block"}),a.dialog({title:"Page Info",draggable:!0,width:978,height:180,position:"bottom"})};window.GD=window.GD||{};GD.effects=GD.effects||{};GD.effects.OVERLAY_Z_INDEX=2E3;GD.effects.DEFAULT_OCCLUDE_SPEED=200;GD.effects.DEFAULT_OCCLUDE_OPACITY=0.25;
GD.effects.showPopup=function(d,a){var b=$(d),e=$(a.popupPt),a=a||{};"boolean"!==typeof a.display&&(a.display=!0);if(b.length)if(a.display){var f={top:0,left:0},c=0,g=0;b.hide();b.removeClass("hidden");e.length&&(f=e.offset(),c=e.outerWidth(),g=e.outerHeight());b.parent().is("body")||$("body").append(b);"number"===typeof a.top?b.css({bottom:"auto",top:Math.floor(f.top+a.top)}):"number"===typeof a.bottom?(e=Math.floor(f.top+g),g=b.outerHeight(),b.css({bottom:"auto",top:e-a.bottom-g})):b.css({bottom:"auto",
top:Math.floor(f.top)});"number"===typeof a.left?b.css({right:"auto",left:Math.floor(f.left+a.left)}):"number"===typeof a.right?(f=Math.floor(f.left+c),c=b.outerWidth(),b.css({right:"auto",left:f-a.right-c})):b.css({right:"auto",left:Math.floor(f.left)});b.fadeIn(100);"number"===typeof a.zIndex&&b.css("zIndex",a.zIndex)}else b.fadeOut(100)};
GD.effects.occludePage=function(d,a,b,e,f){"number"!==typeof b&&(b=GD.effects.DEFAULT_OCCLUDE_SPEED);"number"!=typeof e&&(e=GD.effects.OVERLAY_Z_INDEX);"number"!=typeof f&&(f=GD.effects.DEFAULT_OCCLUDE_OPACITY);var c=$("#GDOverlay");c.length||(c=$("<div>").attr("id","GDOverlay"),c.appendTo("body").css({"z-index":e,opacity:0,top:0,left:0}));if("function"===typeof a)c.on("click",a);else c.off("click");GD.effects._hideTroublesomeElements();$(window).width();$(window).height();c.css("position","fixed");
if(0===c.css("opacity")||!c.is(":visible"))c.css("opacity",0),c.show();c.fadeTo(b,f,d)};GD.effects.revealPage=function(d,a){"undefined"==typeof a&&(a=GD.effects.DEFAULT_OCCLUDE_SPEED);var b=$("#GDOverlay");if(b.length&&"none"!==b.css("display")){var e=GD.effects._onRevealPageComplete;"function"==typeof d&&(e=function(){GD.effects._onRevealPageComplete(d)});b.fadeOut(a,e)}};
GD.effects.initLightbox=function(){$("a[rel=lightbox]").fancybox({transitionIn:"elastic",transitionOut:"elastic",opacity:!0,overlayColor:"#fff",overlayOpacity:0.75,title:"press [esc] to close"})};GD.effects._onRevealPageComplete=function(d){GD.effects._showTroublesomeElements();"function"===typeof d&&d()};
GD.effects._showTroublesomeElements=function(){var d=GD.effects._getTroublesomeElements();$(d).each(function(){var a=$(this),b=a.data("oldVisibility")||a.attr("data-old-visibility");b&&(a.css("visibility",b),a.removeData("oldVisibility"),a.attr("data-old-visibility",""))})};
GD.effects._hideTroublesomeElements=function(){var d=GD.effects._getTroublesomeElements();$(d).each(function(){var a=$(this),b=a.css("visibility")||"inherit";"OBJECT"==a[0].nodeName?a.attr("data-old-visibility",b):a.data("oldVisibility",b);a.css("visibility","hidden")})};GD.effects._getTroublesomeElements=function(){troubleElements="object,embed";if(jQuery.browser.webkit&&/Chrome/i.test(navigator.userAgent)||jQuery.browser.msie)troubleElements+=",iframe";return troubleElements};window.GD=window.GD||{};GD.jobs=GD.jobs||{};GD.jobs.JOB_SRCH_CRIT_AJAX="/member/edits/jobSearchCriteriaAjax_input.htm";GD.jobs.JOB_SRCH_CRIT_CNTXT={FEATURED_JOBS:"FEATURED_JOBS",GD_JOB_VIEW:"GD_JOB_VIEW",JOBS_TAB:"JOBS_TAB",NEW_FB_EMAIL:"NEW_FB_EMAIL",PROFILE_EDIT:"PROFILE_EDIT",PROFILE_HOME:"PROFILE_HOME"};
GD.jobs.initJobSrchCritDlg=function(a,c){if(a){var b=$(".jobSearchCriteriaDialog");if(1>b.length){b=$("<div>").addClass("jobSearchCriteriaDialog");b.data("jobSearchCriteriaContext",a);b.on("submit",function(a){GD.jobs._onJobSrchCritSubmit(b);a.preventDefault()});b.on("click",function(a){$(a.target).is(".closeDlg")&&(GD.jobs._closeJobSearchCriteriaDialog(b),a.preventDefault())});b.data("status","");var d=$("<div>").addClass("hidden").append(b);$(document.body).append(d)}$(".jobSearchCriteriaLink").on("click",
function(a){a.preventDefault();"processing"!=b.data("status")&&(b.data("status","processing"),GD.jobs._createJobSrchCritDialog(b))});c&&GD.jobs._createJobSrchCritDialog(b)}else Logger.warn("jobSearchCriteriaContext not defined")};
GD.jobs._createJobSrchCritDialog=function(a){var c=a.data("jobSearchCriteriaContext");$.ajax({url:GD.jobs.JOB_SRCH_CRIT_AJAX,data:{jobSearchCriteriaContext:c},success:function(b){a.html(b);GD.shim.placeholder($("#DefaultJobTitle",a));var b=$("input[name=defaultCity]",a),c=$("input[name=defaultCityId]",a);GD.ajax.createLocationAutoComplete(null,b,c);GD.jobs._showJobSrchCritDialog(a)},error:function(a,c,e){Logger.error(e)}})};
GD.jobs._showJobSrchCritDialog=function(a){var c=a.data("jobSearchCriteriaContext"),b={dialogBody:a.get(0),dialogWidth:590,occlude:!0,draggable:!1,closeable:!0,onClose:function(){GD.jobs._closeJobSearchCriteriaDialog(a)},wrapperClass:null,onLoadComplete:function(){$(this.dialogElement).css({position:"fixed",top:"100px"});GD.analytics.trackEvent("job-search-prefs","viewed-djs",c);$("input[name=defaultJobTitle]").focus();var b=a.find("input[name=autoCreateJobAlert]");if(b.length)b.on("change",function(){var a=
$(this);a.val(a.is(":checked"))})},extraData:null,modal:!0};GD.dlgManager.addCustomDialog(b)};
GD.jobs._onJobSrchCritSubmit=function(a){var c=$(".jobSearchCriteriaForm",a),b=c.attr("action"),d={};a.data("jobSearchCriteriaContext");var e=$("body").is(".loggedIn"),g=!1;$("input",c).each(function(){d[this.name]=this.value;"autoCreateJobAlert"==this.name&&"true"==this.value&&(a.data("autoCreateJobAlert","true"),g=!0)});d.jobAlertSource="JOB_FEED_DEFAULT_SRCH";var h=c.find("input[name=defaultJobTitle]"),c=c.find("input[name=defaultCity]"),i=c.data("implicitLocation"),f=GD.jobs.jobAlerts.makeJobClickGALabel("exp-"+
(c.val()==i?"imp":"exp"),h.val(),c.val());g&&GD.analytics.trackEvent("job-alert","defaultsearch-"+(e?"si":"so")+"-checked",f);$(".fieldError").remove();d.retrieveRecommendedAlerts=!0;d.responseType="json";$.ajax({url:b,data:d,success:function(b,c,e){d.retrieveRecommendedAlerts&&"json"==d.responseType&&-1!=e.getResponseHeader("content-type").indexOf("application/json")?(c={},c.keywords=d.defaultJobTitle,c.rawLocationName=d.defaultCity,c.source="JOB_FEED_DEFAULT_SRCH_RELATED",c.locationType="C",b.hasOwnProperty("userEmail")&&
(c.emailAddress=b.userEmail),d.defaultCityId&&(c.locationId=d.defaultCityId),b.hasOwnProperty("success")&&b.success?b.hasOwnProperty("recommendedJobTitles")&&b.recommendedJobTitles.length?GD.jobs.jobAlerts.fillMoreJobTitles(!0,b.recommendedJobTitles,c):GD.jobs._onJobSrchCritComplete(a,f):GD.jobs._onJobSrchCritCompleteWithError(a,f)):b.match(/fieldError|errorMessage/gi)?GD.jobs._onJobSrchCritErrors(b,a):GD.jobs._onJobSrchCritComplete(a,f)},error:function(){alert("Sorry - there was an error on our side - you may try again or close this dialog")}})};
GD.jobs._onJobSrchCritErrors=function(a,c){var b=$("<div>").html(a);$(".fieldError",b).each(function(){var a=$(this),b=a.parent()[0].className;$("."+b,c).prepend(a)})};
GD.jobs._onJobSrchCritComplete=function(a,c){var b=a.data("jobSearchCriteriaContext"),d=$("body").is(".loggedIn");GD.analytics.trackEvent("job-search-prefs","updated-djs",b);a.data("autoCreateJobAlert")&&"true"==a.data("autoCreateJobAlert")&&GD.analytics.trackEvent("job-alert","defaultsearch-"+(d?"si":"so")+"-created",c);GD.jobs._closeJobSearchCriteriaDialog(a);(b===GD.jobs.JOB_SRCH_CRIT_CNTXT.NEW_FB_EMAIL||b===GD.jobs.JOB_SRCH_CRIT_CNTXT.PROFILE_EDIT||b===GD.jobs.JOB_SRCH_CRIT_CNTXT.PROFILE_HOME)&&
GD.jobs._updateProfileOnJobSrchComplete();b===GD.jobs.JOB_SRCH_CRIT_CNTXT.JOBS_TAB&&GD.dom.loadUrl("/Jobs/jobs.htm");b===GD.jobs.JOB_SRCH_CRIT_CNTXT.FEATURED_JOBS&&GD.ads.refreshFeaturedJobsList()};GD.jobs._onJobSrchCritCompleteWithError=function(a){var c=a.data("jobSearchCriteriaContext");GD.analytics.trackEvent("job-search-prefs","error-djs",c);GD.jobs._closeJobSearchCriteriaDialog(a)};GD.jobs._closeJobSearchCriteriaDialog=function(a){a.data("status","");GD.dlgManager.closeAllDialogs()};
GD.jobs._updateProfileOnJobSrchComplete=function(){var a=$("#ProfileCompletePercentage");if(!(1>a.length)){var c=$(".jobSearchCriteria",a);c.hide(400);var b=$("span.completeVal",a).add("h1 span.completeVal"),d=$(".progressBar .pctComplete",a),a=$("p.titleBar",a),e=parseInt(b.text(),10),c=$(".pctValue",c).text(),c=parseInt(c.replace(/[^\d]/,""),10),e=e+c;b.html(e);d.animate({width:e+"%"},400);100==e&&a.hide(700)}};window.GD=window.GD||{};GD.jobs=GD.jobs||{};GD.jobs.jobAlerts=GD.jobs.jobAlerts||{};GD.jobs.jobAlerts.AJAX_URL="/job-alert/jobAlertAjax.htm";GD.jobs.jobAlerts.initialized=!1;GD.jobs.jobAlerts.isViaUserAlert=!1;GD.jobs.jobAlerts.pageSection="";GD.jobs.jobAlerts.paginationShown=!1;
GD.jobs.jobAlerts.initJobTrackedLink=function(a,c,b,d){var g=new GDStorage;$(window).on("jobAlertSuccess",function(){$(a).data("jaClk","0")});$(a).each(function(h,j){var e=$(j);$("body").is(".android");var l=$("body").is(".iphone"),k=$("body").is(".safari"),i=$("body").is(".tablet");if(k&&i||k&&l)e.on("mousemove click",function(f){"click"==f.type&&(f.stopImmediatePropagation(),f.preventDefault());"1"==e.data("jaClk")&&g.isJobAlertExpired("jobClick")&&!GD.jobs.jobAlerts.paginationShown?GD.jobs.jobAlerts.openJobTrackedLink($(a),
e,c,b,d,f):(GD.jobsLink.track(f,!0),(f=e.data("url"))||(f=e.attr("href")),GD.util.openNewTab(f,!0))});else e.off("click"),e.prop("onclick",null),e.on("click",function(f){f.stopImmediatePropagation();f.preventDefault();"1"==e.data("jaClk")&&g.isJobAlertExpired("jobClick")&&!GD.jobs.jobAlerts.paginationShown?GD.jobs.jobAlerts.openJobTrackedLink($(a),e,c,b,d,f):(GD.jobsLink.track(f,!0),(f=e.data("url"))||(f=e.attr("href")),f=window.open(f,"_blank"),f.focus&&f.focus())})})};
GD.jobs.jobAlerts.openJobTrackedLink=function(a,c,b,d,g,h){var b=$.trim(c.text()),d=$.trim(c.parents("."+d).find("."+g).text()),g=c.data("url"),j=c.data("offsiteTarget"),e="";switch(c.data("evA")){case "B-O":e="gdorg";break;case "B-S":e="jbs";break;case "E-S":e="es";break;default:e="other"}$("body").jobAlertSplash({name:"jobSrchJobClk",type:"splash",template:"jobAlertDlgScreenshot",gaLabel:"jobclick",source:"JOB_SRCH_JOBCLK",fakeSuccess:!0,jobData:{jobTitle:b,jobLoc:d,jobUrl:g,jobTarget:j,jobType:e,
jobClickEvent:h},callbacks:{onSuccess:function(){var b=$(".gdDialog .closeBox"),a=$(".gdDialog .notRightNow");b.add(a).trigger("normalClose")},onSuccessOthers:function(){a.data("jaClk","0")},onFail:function(){},onModalShow:function(){a.data("jaClk","0");$.ajax({url:"/job-alert/jobClkModalShown.htm"})}}})};GD.jobs.jobAlerts.makeJobClickGALabel=function(a,c,b){c&&(c=c.toLowerCase(),c=c.replace(" ","_"));b&&(b=b.toLowerCase(),b=b.replace(" ","_"));return a+"-"+c+"_"+b};
GD.jobs.jobAlerts.registerPage=function(a){"create"==a&&GD.jobs.jobAlerts._registerCreatePage();"edit"==a&&GD.jobs.jobAlerts._registerEditPage();"newuser"==a&&GD.jobs.jobAlerts._registerNewUserPage()};GD.jobs.jobAlerts._registerCreatePage=function(){};
GD.jobs.jobAlerts._registerEditPage=function(){$("#EditJobAlertForm").on("submit",function(){var a=$(this).find("input[name=emailFrequency]:checked").data("gaLabel");GD.analytics.trackEvent("job-alert","edit-alert","freq-"+a.toLowerCase());return!0});$("#CancelJobAlertForm textarea").click(function(){$("input[name=feedback]:eq(3)").attr("checked","checked")});$("#CancelJobAlertForm").on("submit",function(){var a=$("input[name=feedback]").val();return GD.analytics.trackEvent("job-alert","feedback",
a)?!0:!1})};GD.jobs.jobAlerts._registerNewUserPage=function(){$("#ChangePassword").on("submit",function(){return GD.analytics.trackEvent("job-alert","activated","newuser")?!0:!1})};
GD.jobs.jobAlerts.trackOneClickCreate=function(){switch(GD.dom.getQueryString("utm_campaign")){case "jobAlertAlert":GD.analytics.trackEvent("job-alert","related-email-created-jobAlertAlert",$("#SiteSrchTop input.keyword").val()+"|"+$("#SiteSrchTop input.loc").val());break;case "jobfeed-ol":GD.analytics.trackEvent("job-alert","related-email-created-jobFeed-ol",$("#SiteSrchTop input.keyword").val()+"|"+$("#SiteSrchTop input.loc").val());break;case "jobfeed-o":GD.analytics.trackEvent("job-alert","related-email-created-jobFeed-o",
$("#SiteSrchTop input.keyword").val()+"|"+$("#SiteSrchTop input.loc").val());break;case "setup-job-alert":GD.analytics.trackEvent("job-alert","setup-email-created",$("#SiteSrchTop input.keyword").val()+"|"+$("#SiteSrchTop input.loc").val())}};
GD.jobs.jobAlerts.trackOneClickError=function(a,c,b,d){var g="related-email-errors",h="";switch(GD.dom.getQueryString("utm_campaign")){case "jobAlertAlert":g+="-jobAlert";break;case "jobfeed-ol":g+="-jobFeed-ol";break;case "jobfeed-o":g+="-jobFeed-o";break;case "setup-job-alert":g="setup-email-errors"}a&&c?h="no-key-loc":a?h="no-key":c?h="no-loc":"JOB_ALERT_LOCATION_NOLASH"==d?h="no-loc-lash":b&&(h="Job alert already exists");GD.analytics.trackEvent("job-alert",g,h)};
GD.jobs.jobAlerts.getMoreJobTitles=function(a,c){$.ajax({data:{keywords:null,emailAddress:null,rawLocationName:null,locId:null,locType:"C"},type:"json",success:function(b){b.success&&b.hasOwnProperty("recommendedJobTitles")&&b.recommendedJobTitles.length&&isDialog&&GD.jobs.jobAlerts.fillMoreJobTitles(!0,b.recommendedJobTitles,c)}})};
GD.jobs.jobAlerts.fillMoreTitles=function(a,c,b){var d=$(".jobAlertRecommendedTitles").clone(!0).removeClass("hidden"),g=d.find(".jobTitleTiles"),h=d.find(".jaTileSrc"),j=$("<div/>").addClass("clear");b.isLoggedIn=$("body").is(".loggedIn");c.length&&($.each(c,function(a,c){if(5<a)return!1;var d=h.clone().removeClass("jaTileSrc hidden"),i=d.find(".jobTitle");i.text(c).data("jobTitle",c);d.on("click",function(){$(this);var a={};a.keywords=c;var e=a.rawLocationName=b.rawLocationName,e=e.replace(/\+/g,
" ");a.rawLocationName=e;a.emailAddress=b.emailAddress;a.source=b.source+"_RELATED";b.hasOwnProperty("locationId")&&(a.locationId=b.locationId);b.hasOwnProperty("locationType")&&(a.locationType=b.locationType);$.ajax({url:GD.jobs.jobAlerts.AJAX_URL,data:a,beforeSend:function(){i.text("Creating...")},complete:function(){i.text(i.data("jobTitle"));d.off("click").addClass("active");d.find("i.status").removeClass("plus").addClass("tick")},success:function(c){if(c.hasOwnProperty("success")&&c.success)b.source==
"JOB_SRCH_PAGIN"?GD.analytics.trackEvent("job-alert","pagin-related-created",a.keywords+"|"+a.rawLocationName):b.source=="SALARY_SRCH"?GD.analytics.trackEvent("job-alert","salary-related-created",a.keywords+"|"+a.rawLocationName):b.source=="SALARY_JOB_SUMMARY"?GD.analytics.trackEvent("job-alert","salarydetails-related-created",a.keywords+"|"+a.rawLocationName):b.source=="JOB_FEED_DEFAULT_SRCH"&&GD.analytics.trackEvent("job-alert","defaultsearch-related-created",a.keywords+"|"+a.rawLocationName);else{c=
c.hasOwnProperty("message")&&c.message?c.message:"Unidentified error";b.source=="JOB_SRCH_PAGIN"?GD.analytics.trackEvent("job-alert","pagin-related-errors",c):b.source=="SALARY_SRCH"?GD.analytics.trackEvent("job-alert","salary-related-errors",c):b.source=="SALARY_JOB_SUMMARY"?GD.analytics.trackEvent("job-alert","salarydetails-related-errors",c):b.source=="JOB_FEED_DEFAULT_SRCH"&&GD.analytics.trackEvent("job-alert","defaultsearch-related-errors",c)}},fail:function(){b.source=="JOB_SRCH_PAGIN"?GD.analytics.trackEvent("job-alert",
"pagin-related-errors","Unidentified error"):b.source=="SALARY_SRCH"?GD.analytics.trackEvent("job-alert","salary-related-errors","Unidentified error"):b.source=="SALARY_JOB_SUMMARY"?GD.analytics.trackEvent("job-alert","salarydetails-related-errors","Unidentified error"):b.source=="JOB_FEED_DEFAULT_SRCH"&&GD.analytics.trackEvent("job-alert","defaultsearch-related-errors","Unidentified error")}})});g.append(d)}),g.append(j),d.find(".closeBtn").on("click",function(a){a.preventDefault();GD.dlgManager.closeAllDialogs()}),
a?(a="/splash/job-alert","JOB_SRCH_PAGIN"==b.source?(a+="/pagin-"+(b.isLoggedIn?"si":"so")+"/one-click",GD.analytics.trackPageView(a),$(".dialogContent").children().remove(),$(".dialogContent").prepend(d),$(".dialogBody").find(".heading").html("").removeClass("linedHeading"),$(".dialogContent").removeClass("margTop10"),$(".dialogBody").find(".dialogFooter").remove()):"SALARY_SRCH"==b.source?(a+="/salary-"+(b.isLoggedIn?"si":"so")+"/one-click",GD.analytics.trackPageView(a),$(".dialogContent").children().remove(),
$(".dialogContent").prepend(d),$(".dialogBody").find(".heading").html("").removeClass("linedHeading"),$(".dialogContent").removeClass("margTop10"),$(".dialogBody").find(".dialogFooter").remove()):"JOB_FEED_DEFAULT_SRCH"==b.source&&(GD.analytics.trackEvent("job-search-prefs","viewed-one-click",null),a=$(".dialogFrame").children().eq(1),a.addClass("pad20"),a.children().remove(),d.addClass("narrow"),d.find(".jaMessage").html("Your job search preferences have been saved"),d.find("h3").html("Create alerts for related jobs with one click:"),
a.append(d))):(d.find(".closeBtn").hide(),$(".jobAlertInlineForm").children().remove(),$(".jobAlertInlineForm").append(d),$(".jobAlertInlineForm").addClass("hasRecommendedTitles"),"SALARY_JOB_SUMMARY"==b.source&&GD.analytics.trackEvent("job-alert","salarydetails-related-viewed",null)))};(function(d){d(window.jQuery,window,document)})(function(d,p,M){function z(a,b){var c=d("div."+b.template).clone(),f=c.find(".heading"),e=c.find(".subHeading"),h=c.find("form"),g=d("body").is(".loggedIn");c.removeClass("hidden");h.attr("id","CreateJobAlertForm");b.heading&&f.html(b.heading);b.subHeading&&e.html(b.subHeading);GD.dlgManager.addCustomDialog({dialogBody:c,dialogWidth:b.dlgWidth,occlude:!0,draggable:!1,closeable:!0,onClose:function(){u()},wrapperClass:"jobAlertDlg",extraData:null,modal:!0,
onLoadComplete:function(){var e=d(".jobAlertDlg");e.find(".jobAlertUserEmail").focus();g&&e.find(".jobAlertEmailWrapper").hide();if(b.template){"jobAlertDlgPlain"==b.template&&(e.find(".dialogFooter *").not("div.clear").hide(),a._initPopupListener(c));if("jobAlertDlgScreenshot"==b.template||"jobAlertDlgEditable"==b.template)b.splashScreen.showBailOutText||e.find(".bailOutWrapper").hide(),b.splashScreen.isEditable&&e.find(".jobAlertKeyWrapper span.link").show(),e.find(".jobAlertKeyWrapper span.phrase").html(N(a.jobAlertData)),
e.find(".jobAlertKeyWrapper input.jobAlertKeyword").val(a.jobAlertData.keywords),e.find(".jobAlertLocWrapper input").val(a.jobAlertData.rawLocationName),a._initPopupListener(e);"jobAlertDlgScreenshot"==b.template&&e.find(".dialogFooter *").not("div.clear").hide()}GD.shim.setPlaceholder(d(".jobAlertDlg .jobAlertUserEmail"),"Enter your email address");e.find(".notRightNow").on("click",function(a){a.preventDefault();a.stopPropagation();i(b.gaLabel,"bailout",b.gaLabelTemplate,b.pageSection);u()});e.find(".closeBox").on("click",
function(){i(b.gaLabel,"dismiss",b.gaLabelTemplate,b.pageSection)});b.gaLabel&&GD.analytics.trackPageView(O+b.gaLabel+"-"+(g?"si":"so"))}})}function v(a,b,c,f){a=d("div.jobAlertDlgPlain").clone();a.find(".heading");var b=a.find(".subHeading"),c=a.find(".ajaxResult"),e=c.find(".headline");a.find("form");d("body").is(".loggedIn");a.removeClass("hidden");b.remove();a.find(".formContents").remove();c.addClass("errBox tightBotMarg").show();e.html(f);GD.dlgManager.addCustomDialog({dialogBody:a,dialogWidth:P,
occlude:!0,draggable:!1,closeable:!0,onClose:function(){u()},wrapperClass:"jobAlertDlg",onLoadComplete:null,extraData:null,modal:!0})}function A(a,b,c,f,e,h){var g=d(".gdDialog .jobAlertDlg"),j=g.find(".subHeading"),q=g.find(".ajaxResult"),m=g.find(".notRightNow"),r=g.find(".bailout"),o=g.find(".closeBox"),B=q.find(".headline"),i=g.find("form"),Q=i.find(".formContents"),l=g.find(".screenshot"),n=g.find(".createJobAlert"),k=Boolean(g.length),p=d("body").is(".loggedIn");f&&k?c.oneClickTitles&&h.hasOwnProperty("recommendedJobAlerts")&&
h.recommendedJobAlerts instanceof Array&&h.recommendedJobAlerts.length?I(!0,h.recommendedJobAlerts,{keywords:h.keywords,emailAddress:h.emailAddress,rawLocationName:h.rawLocationName,locId:h.locationId,locType:"C",source:c.source},a,b,c):(j.add(Q).add(l).remove(),i.css("min-height","0px"),p?(B.addClass("alignCenter").html(c.okMsgs.siPopup),q.removeClass("errBox").addClass("successBox").slideDown()):(B.html(c.okMsgs.soPopup),q.removeClass("errBox").addClass("neutralBox").slideDown()),m.removeClass("hidden").show(),
m.find("span").text("Close"),g.find(".dialogFooter *").show(),n.remove(),o.add(r).add(m).off("click").on("click",function(a){a.preventDefault();u()})):!f&&k&&(B.html(e),q.addClass("errBox").removeClass("hidden").slideDown())}function u(){setTimeout(function(){GD.dlgManager.closeAllDialogs()},50)}function J(a){l||(l=new GDStorage);l.setVal("email",a)}function C(){l||(l=new GDStorage);return l.getVal("email")}function I(a,b,c,f,e,h){var f=d(".jobAlertRecommendedTitles").clone(!0).removeClass("hidden"),
g=f.find(".jobTitleTiles"),j=f.find(".jaTileSrc"),q=f.find(".jaMessage"),m=d("<div/>").addClass("clear"),e=d("body").is(".loggedIn");700>h.dlgWidth&&f.removeClass("wide").addClass("narrow");a||f.removeClass("wide narrow").addClass("formWide");b.length&&(q.addClass("tightTopMarg"),d.each(b,function(a,b){if(5<a)return!1;var e=j.clone().removeClass("jaTileSrc hidden"),f=e.find(".jobTitle");f.text(b).data("jobTitle",b);e.on("click",function(){d(this);var a={};a.keywords=b;var r=a.rawLocationName=c.rawLocationName,
r=r.replace(/\+/g," ");a.rawLocationName=r;a.emailAddress=c.emailAddress;a.source=c.source+"_RELATED";c.hasOwnProperty("locationId")&&(a.locationId=c.locationId);c.hasOwnProperty("locationType")&&(a.locationType=c.locationType);d.ajax({url:K,data:a,beforeSend:function(){f.text("Creating...")},complete:function(){f.text(f.data("jobTitle"));e.off("click").addClass("active");e.find("i.status").removeClass("plus").addClass("tick")},success:function(b){if(b.hasOwnProperty("success")&&b.success)y(h.gaLabel+
"-related-created",a.keywords+"|"+a.rawLocationName);else{b.hasOwnProperty("message");y(h.gaLabel+"-related-errors",a.keywords+"|"+a.rawLocationName)}},fail:function(){y(h.gaLabel+"-related-errors","Unidentified error")}})});g.append(e)}),g.append(m),f.find(".closeBtn").on("click",function(a){a.preventDefault();GD.dlgManager.closeAllDialogs()}),a?(a="/splash/job-alert","JOB_SRCH_PAGIN"==c.source?(GD.analytics.trackPageView(a+("/pagin-"+(e?"si":"so")+"/one-click")),d(".dialogContent").children().remove(),
d(".dialogContent").prepend(f),d(".dialogBody").find(".heading").html("").removeClass("linedHeading"),d(".dialogContent").removeClass("margTop10"),d(".dialogBody").find(".dialogFooter").remove()):"SALARY_SRCH"==c.source?(GD.analytics.trackPageView(a+("/salary-"+(e?"si":"so")+"/one-click")),d(".dialogContent").children().remove(),d(".dialogContent").prepend(f),d(".dialogBody").find(".heading").html("").removeClass("linedHeading"),d(".dialogContent").removeClass("margTop10"),d(".dialogBody").find(".dialogFooter").remove()):
"JOB_FEED_DEFAULT_SRCH"==c.source&&(GD.analytics.trackEvent("job-search-prefs","viewed-one-click",null),a=d(".dialogFrame").children().eq(1),a.addClass("pad20"),a.children().remove(),f.addClass("narrow"),f.find(".jaMessage").html("Your job search preferences have been saved"),f.find("h3").html("Create alerts for related jobs with one click:"),a.append(f))):(f.find(".closeBtn").hide(),d(".jobAlertInlineForm").children().remove(),d(".jobAlertInlineForm").append(f),d(".jobAlertInlineForm").addClass("hasRecommendedTitles"),
"SALARY_JOB_SUMMARY"==c.source&&y("salarydetails-related-viewed",null)))}function L(a,b,c,f){var e=a.options,a=d(b).find(".gotoEmail");f&&(a.removeClass("hidden").addClass("asTblCell").attr("href",f).show(),a.find("span").html("Goto "+c),a.on("click",function(){event.preventDefault();i(e.gaLabel,"email-click",e.gaLabelTemplate,c);GD.dom.loadUrl(f,"_blank")}))}function x(a){var b=a.element;d(p).on("jobAlertSuccess",function(){a.toggles.triggered||d(b).trigger("jaOtherCreated")}).on("jobAlertFail",
function(){a.toggles.triggered||d(b).trigger("jaOtherFail")})}function N(a){var b="",c=a.keywords,a=a.rawLocationName;c&&a?b="<strong>"+c+" jobs</strong> in <strong>"+a+"</strong>":c?b="<strong>"+c+"</strong> jobs":a&&(b="<strong>Jobs in "+a+"</strong>");return b}function n(a,b,c){b&&(b=b.toLowerCase(),b=b.replace(/ /g,"_"));c&&(c=c.toLowerCase(),c=c.replace(/ /g,"_"));return a+"-"+b+"_"+c}function y(a,b){return GD.analytics.trackEvent("job-alert",a,b)?!0:!1}function i(a,b,c,f){var e=d("body").is(".loggedIn"),
h=a+"-"+b;"<head>-<tail>"==c&&(h=a+"-"+b);"<head>-<si|so>-<tail>"==c&&(h=a+"-"+(e?"si":"so")+"-"+b);return GD.analytics.trackEvent("job-alert",h,f)?!0:!1}function w(a,b){var c=d(".jobAlertDlg"),f=c.find(".ajaxStatus"),e=c.find(".ajaxResult");jQuery.ajax({url:K,data:a,beforeSend:function(){b.element.trigger("jaBeforeSend");e.hide()},complete:function(){f.hide()},success:function(c){c&&c.success?b.element.trigger("jaCreated",c):b.element.trigger("jaFail",c);a.emailAddress&&J(a.emailAddress)},error:function(a,
c,d){b.element.trigger("jaFail",d)}});return b}function D(a,b,c){var f=!0,e=!1,h={required:"",email:"",identical:"",system:""},g;if(b){"undefined"!==typeof b.required&&d(b.required).each(function(c,e){g=a.find(e);g.length?d.trim(g.val())?g.removeClass("validateError, validateOk").addClass("validateOk"):(f=!1,g.removeClass("validateError, validateOk").addClass("validateError"),h.required=b.requiredErr):(f=!1,h.system="Form Validation Error - Mandatory Fields. No related elements found.")});if("undefined"!==
typeof b.atleastOne){var i=!1;d(b.atleastOne).each(function(c,e){g=a.find(e);g.length?d.trim(g.val())||i?(i|=1,g.removeClass("validateError validateOk").addClass("validateOk")):(i|=0,g.removeClass("validateError validateOk").addClass("validateError"),h.required=b.atleastOneErr):(f=!1,h.system="Form Validation Error - Atleastone Fields. No related elements found.")});f&=i}if("undefined"!==typeof b.identical){var q="";d(b.identical).each(function(c,d){var e=a.find(d);if(e.length){var g=e.val();0===
c?q=g:g!=q?(f=!1,e.removeClass("validateError, validateOk").addClass("validateError"),h.identical=b.identicalErr):e.removeClass("validateError, validateOk").addClass("validateOk")}else f=!1,h.system="Form Validation Error - Identical Fields. No related elements found."})}"undefined"!==typeof b.emailCheck&&d(b.emailCheck).each(function(b,c){var d=a.find(c);d.length?(f=d.val().isValidEmail())?d.removeClass("validateError, validateOk").addClass("validateOk"):(d.removeClass("validateError, validateOk").addClass("validateError"),
h.email="Please enter a valid email address.",""===d.val()&&(e=!0)):(f=!1,h.system="Form Validation Error - Email Check. No related elements found.")})}var m={};m.success=f;m.error=h;m.missingEmail=f?!1:e;m.allErrorMsgs=function(){var a=[];this.error.system&&a.push(this.error.system);this.error.required&&a.push(this.error.required);this.error.email&&a.push(this.error.email);this.error.identical&&a.push(this.error.identical);return a};m.firstErrorMsg=function(){return this.error.required?this.error.required:
this.allErrorMsgs()[0]};m.emailErrorMsg=function(){return this.error.email?this.error.email:this.error.required};c(m);return f}var K="/job-alert/jobAlertAjax.htm",P=500,O="/splash/job-alert/";d("body").is(".loggedIn");var l,s,k,E,F,t,G,H;d.widget("gd.jobAlert",{namespace:"gd",VERSION:"1.0",button:{},toggles:{isUsingImplicitLoc:!1},jobAlertData:{},formFields:{},srchParams:{key:null,loc:null,locId:null,locType:null,impKey:null,impLoc:null,impLocId:null,impLocType:null},options:{name:"jobAlert",type:null,
hook:null,template:"jobAlertDlgSrc",dlgWidth:500,parentPage:M.location.href,pageSection:GD.pageInfo&&GD.pageInfo.section?GD.pageInfo.section:"",$btn:null,btnLabel:"Create Job Alert",btnLabelTransient:"Creating",gaLabel:null,gaLabelTemplate:"<head>-<si|so>-<tail>",heading:null,subHeading:null,formFieldEmail:"[name=emailAddress]",formFieldKeyword:"[name=keywords]",formFieldLoc:"[name=rawLocationName]",formFieldLocId:"[name=locId]",formFieldLocType:"[name=locType]",formIsEditable:!0,useIPLocation:!1,
expImpPhrase:"exp-exp",mobile:!1,fakeSuccess:!1,jobData:{jobTitle:null,jobLoc:null,jobUrl:null,jobTarget:null,jobType:null,jobClickEvent:null},interceptor:{addJAParam:!1,openNewTab:!1,addCompletedAction:!1},localStorage:{enabled:!1,name:"",ttl:2592E6,storeEmail:!0},source:"NOT_SPECIFIED",oneClickTitles:!1,useSplash:!0,splashScreen:{showBailOutText:!0,fallbackToImplicit:!0,isEditable:!0},errFieldClass:"error",errMsgs:{email:"Please enter an email",emailKey:"Job Title & Email are required",emailLoc:"Location & Email are required",
key:"Job Title is required",keyLoc:"Job Title & Location are required",srchNoKeyLoc:"Please enter some search keywords to create a job alert!"},okMsgs:{siInline:'<div class="jobAlertExists successBox nonLoggedIn"><strong>Job alert created!</strong></div>',soInline:'<div class="jobAlertExists neutralBox nonLoggedIn alignLeft">Please check your email to activate the job alert!</div>',siPopup:"<strong>Job alert created!</strong>",soPopup:"<strong>One more step!</strong> Please check your email to activate the job alert."},
onClick:d.noop,callbacks:{beforeSend:d.noop,onSuccess:d.noop,onFail:d.noop,onSuccessOthers:d.noop,onFailOthers:d.noop,onModalShow:d.noop}},_create:function(){var a=this.options;this._super();this.button.lbl=a.btnLabel;this.button.lblTransient=a.btnLabelTransient;a.template&&"jobAlertDlgScreenshot"==a.template&&(a.dlgWidth=700);this._on({jaBeforeSend:function(){jQuery.isFunction(a.callbacks.beforeSend)&&a.callbacks.beforeSend()}});this._prepareImplicitExplicit();this._prepareFormFields();this._prepareData();
return this},_init:function(){},_initPopupListener:function(){var a=this,b=a.element,c=a.options,f=a.widgetName,e=d(".jobAlertDlg"),h=e.find(".ajaxStatus");e.find("#CompletedAction");var g=e.find(".bailout"),j=e.find(".notRightNow"),q=e.find(".closeBox"),m=d("body").is(".loggedIn");if(c.template&&("jobAlertDlgScreenshot"==c.template||"jobAlertDlgEditable"==c.template))e.find("input[name=keywords]").val(a.jobAlertData.keywords),e.find("input[name=rawLocationName]").val(a.jobAlertData.rawLocationName),
e.find("input[name=locationId]").val(a.jobAlertData.locationId),e.find("input[name=locationType]").val(a.jobAlertData.locationType),m||e.find("input[name=emailAddress]").val(C()),e.find("button.createJobAlert").on("click",function(b){b.preventDefault();var f=d(this),b=a.jobAlertData.keywords=e.find("input[name=keywords]").val(),g=a.jobAlertData.rawLocationName=e.find("input[name=rawLocationName]").val();a.jobAlertData.locationId=e.find("input[name=locationId]").val();a.jobAlertData.locationType=e.find("input[name=locationType]").val();
a.jobAlertData.emailAddress=e.find("input[name=emailAddress]").val();a.jobAlertData.source=c.source;"jobSrchJobClk"==c.name?(c.expImpPhrase=n("exp-exp",b,g),""===b&&""===g?c.expImpPhrase=n("imp-imp",b,g):""===b&&g?c.expImpPhrase=n("imp-exp",b,g):b&&""===g&&(c.expImpPhrase=n("exp-imp",b,g))):""===k&&g==t&&(c.expImpPhrase=n("exp-imp",b,g));var m=d(".jobAlertDlg #CreateJobAlertForm"),b={required:[".jobAlertUserEmail"],requiredErr:c.errMsgs.email,atleastOne:[".jobAlertKeyword",".jobAlertLocation"],atleastOneErr:"Please enter either a Job Title or a Location",
emailCheck:[".jobAlertUserEmail"]};i(c.gaLabel,"modal-click",c.gaLabelTemplate,c.pageSection);D(m,b,function(b){if(b.success){m.find("#CompletedAction").slideUp();if(c.name=="jobSrchJobClk"){GD.dom.loadUrl(c.jobData.jobUrl,"_blank");GD.jobsLink.track(c.jobData.jobClickEvent,true)}a._doAjax(a.jobAlertData);h.show();a.jobAlertData.emailAddress&&J(a.jobAlertData.emailAddress)}else{f.find("span").html(a.button.lbl);e.find(".ajaxResult .headline").html(b.firstErrorMsg());e.find(".ajaxResult").addClass("errBox margBot15");
e.find(".ajaxResult").slideDown("slow");b.missingEmail?i(c.gaLabel,"noemail",c.gaLabelTemplate,b.firstErrorMsg()):i(c.gaLabel,"errors",c.gaLabelTemplate,b.firstErrorMsg())}})});c.splashScreen.isEditable&&(e.find(".jobAlertKeyWrapper span.link").on("click",function(b){b.preventDefault();e.find(".jobAlertLocWrapper, .jobAlertKeyWrapper input").show();e.find(".jobAlertKeyWrapper span").hide();e.find(".formContents label").css("vertical-align","middle");e.find(".bailOutWrapper").css({position:"relative",
bottom:"0px"}).addClass("margTop20");i(c.gaLabel,"edit-fields",c.gaLabelTemplate,a.jobAlertData.keywords+"|"+a.jobAlertData.rawLocationName)}),e.find(".jobAlertKeyWrapper input").on("change",function(){e.find("input.jobAlertKey").val(d(this).val())}),e.find(".jobAlertLocWrapper .jobAlertLocation").on("change",function(){e.find("input.jobAlertLoc").val(d(this).val())}),GD.ajax.createLocationAutoComplete(null,e.find(".jobAlertLocWrapper .jobAlertLocation"),e.find("input.jobAlertLocId"),function(a){e.find("input.jobAlertLoc").val(a)},
null));if("jobAlertLinkInterceptor"==f)g.on("click",function(a){a.preventDefault();if(i(c.gaLabel,"bailout",c.gaLabelTemplate,c.pageSection)){u();GD.dom.loadUrl(d(b).attr("href"))}}),q.on("click",function(){GD.dom.loadUrl(d(b).attr("href"))});else if("jobSrchJobClk"==c.name)g.on("click",function(a){a.preventDefault();GD.dom.loadUrl(c.jobData.jobUrl,"_blank");GD.jobsLink.track(c.jobData.jobClickEvent,true);i(c.gaLabel,"bailout",c.gaLabelTemplate,c.pageSection);u()}),q.on("click",function(){GD.dom.loadUrl(c.jobData.jobUrl,
"_blank");GD.jobsLink.track(c.jobData.jobClickEvent,true)}),q.add(j).on("normalClose",function(){d(this).off("click").on("click",function(a){a.stopPropagation();u()})});else g.on("click",function(a){a.preventDefault();i(c.gaLabel,"bailout",c.gaLabelTemplate,c.pageSection);u()});c.callbacks.onModalShow()},_setOption:function(a,b){this._super("_setOption",a,b)},_destroy:function(){},_prepareImplicitExplicit:function(){s=d('#SiteSrchTop input[name="sc.keyword"]').val();k=d("#SiteSrchTop input.loc").val();
E=d("#SiteSrchTop input[name=locId]").val();F=d("#SiteSrchTop input[name=locT]").val();this.srchParams.key=s;this.srchParams.loc=k;this.srchParams.locId=E;this.srchParams.locType=F;t=d("#ImplicitLocName").val();G=d("#ImplicitLocId").val();H=d("#ImplicitLocType").val()},_prepareFormFields:function(){var a=this.options;this.formFields.email=a.formFieldEmail;this.formFields.key=a.formFieldKeyword;this.formFields.loc=a.formFieldLoc;this.formFields.locId=a.formFieldLocId;this.formFields.locType=a.formFieldLocType},
_prepareData:function(){var a=this.options,b=k,c=s;k?b=k:t&&(b=t,this.toggles.isUsingImplicitLoc=!0);"jobSrchJobClk"==a.name?(this.toggles.isUsingImplicitLoc=!1,""===s&&""===k?(c=a.jobData.jobTitle,b=a.jobData.jobLoc,a.expImpPhrase=n("imp-imp",c,b)):""===s&&k?(c=a.jobData.jobTitle,a.expImpPhrase=n("imp-exp",c,b)):s&&""===k&&(b=a.jobData.jobLoc,a.expImpPhrase=n("exp-imp",c,b))):(this.toggles.isUsingImplicitLoc=!1,a.expImpPhrase=n("exp-exp",c,b),""===s&&""===k?(b=t,a.expImpPhrase=n("exp-imp",c,b)):
""===s&&k?a.expImpPhrase=n("exp-exp",c,b):s&&""===k&&(b=t,a.expImpPhrase=n("exp-imp",c,b)));this.toggles.isUsingImplicitLoc?this._setJobAlertData(c,b,G,H):this._setJobAlertData(c,b,E,F)},_setJobAlertData:function(a,b,c,d){var e=this.options;this.jobAlertData.keywords=a;this.jobAlertData.rawLocationName=b;this.jobAlertData.locationId=c;this.jobAlertData.locationType=d;this.jobAlertData.source=e.source},_onSuccess:function(){var a=this.options;if(jQuery.isFunction(a.callbacks.onSuccess))a.callbacks.onSuccess()},
_onFail:function(){var a=this.options;if(jQuery.isFunction(a.callbacks.onFail))a.callbacks.onFail()},_onSuccessOthers:function(){var a=this.options;if(jQuery.isFunction(a.callbacks.onSuccessOthers))a.callbacks.onSuccessOthers()},_onFailOthers:function(){var a=this.options;if(jQuery.isFunction(a.callbacks.onFailOthers))a.callbacks.onFailOthers()}});d.widget("gd.jobAlertBtn",d.gd.jobAlert,{widgetEventPrefix:d.gd.jobAlert.prototype.widgetEventPrefix,toggles:{triggered:!1},_create:function(){var a=this,
b=a.options,c=a.element,f=d("body").is(".loggedIn");this._super();a.button.$obj=b.$btn?b.$btn:c;c.on("click",function(e){e.preventDefault();i(b.gaLabel,"click",b.gaLabelTemplate,b.pageSection);e=a._doValidateForSubmit();!0===e?f?(a.toggles.triggered=!0,a.jobAlertData.source=b.source,w(a.jobAlertData,a),d(c).find("span").html(a.button.lblTransient)):z(a,b,c):(v(a,b,c,e),i(b.gaLabel,"errors",b.gaLabelTemplate,e))});this._on({jaCreated:function(e,h){d(p).trigger("jobAlertSuccess");a._onSuccess();e.stopPropagation();
var g=d(".gdDialog .jobAlertDlg");Boolean(g.length)&&a._updatePopup(!0,null,h);f?d(c).after(b.okMsgs.siInline).slideDown():d(c).after(b.okMsgs.soInline).slideDown();i(b.gaLabel,"created",b.gaLabelTemplate,b.expImpPhrase);d(c).remove()},jaFail:function(e,h){d(p).trigger("jobAlertFail");a._onFail();e.stopPropagation();var g=d(".gdDialog .jobAlertDlg"),g=Boolean(g.length);d(c).find("span").html(a.button.lbl);f&&!g?v(a,b,c,h.message):g&&a._updatePopup(!1,h.message);i(b.gaLabel,"errors",b.gaLabelTemplate,
h.message)},jaOtherCreated:function(a){a.stopPropagation();f?d(c).after(b.okMsgs.siInline).slideDown():d(c).after(b.okMsgs.soInline).slideDown();d(c).remove()},jaOtherFail:function(a){a.stopPropagation()}})},_init:function(){x(this)},_initPopupListener:function(){this._super()},_updatePopup:function(a,b,c){A(this,this.element,this.options,a,b,c)},_doValidateForSubmit:function(){var a=this.options;d("body").is(".loggedIn");return this.srchParams.key||this.srchParams.loc?!0:a.errMsgs.srchNoKeyLoc},
_doAjax:function(a){this.jobAlertData=a;this.toggles.triggered=!0;w(a,this)}});d.widget("gd.jobAlertSplash",d.gd.jobAlert,{widgetEventPrefix:d.gd.jobAlert.prototype.widgetEventPrefix,toggles:{triggered:!1},_create:function(){var a=this,b=a.options,c=a.element,f=!0;this._super();a.jobAlertData.source=b.source;l||(l=new GDStorage);b.localStorage.enabled&&l&&(f=l.isJobAlertExpired(b.localStorage.name,b.localStorage.ttl,!0)?l.isJobAlertExpired(b.localStorage.name,b.localStorage.ttl):!1);f&&z(a,b,c);this._on({jaCreated:function(c,
f){d(p).trigger("jobAlertSuccess");a._onSuccess();c.stopPropagation();i(b.gaLabel,"created",b.gaLabelTemplate,b.expImpPhrase);a._updatePopup(!0,null,f)},jaFail:function(c,f){d(p).trigger("jobAlertFail");a._onFail();c.stopPropagation();i(b.gaLabel,"errors",b.gaLabelTemplate,f.message);a._updatePopup(b.fakeSuccess,f.message,f)},jaOtherCreated:function(){},jaOtherFail:function(){a._onFailOthers()}})},_init:function(){x(this)},_initPopupListener:function(){this._super()},_updatePopup:function(a,b,c){A(this,
this.element,this.options,a,b,c)},_doValidateForSubmit:function(){return!0},_doAjax:function(a){this.jobAlertData=a;this.toggles.triggered=!0;w(a,this)}});d.widget("gd.jobAlertMinForm",d.gd.jobAlert,{widgetEventPrefix:d.gd.jobAlert.prototype.widgetEventPrefix,toggles:{triggered:!1},_create:function(){var a=this,b=a.options,c=a.element,f=d("body").is(".loggedIn"),e=C(),h=!1;this._super();var g=a.button.$obj=d(c).find(".jobAlertButton"),j=d(c).find("form");e&&j.find("input[name=emailAddress]").val(e);
g.on("click",function(e){var f=d(this);a.jobAlertData.emailAddress=d.trim(j.find("input[name=emailAddress]").val());a.jobAlertData.source=b.source;e.preventDefault();i(b.gaLabel,"click",b.gaLabelTemplate,b.pageSection);var e={required:[a.formFields.email],requiredErr:b.errMsgs.email,emailCheck:[a.formFields.email]},g=function(a){a.success?(h=!0,j.find(b.formFieldEmail).removeClass(b.errFieldClass),j.find("#CompletedAction").slideUp()):(h=!1,f.find("span").html(b.btnLabel),j.find(b.formFieldEmail).val("").attr("placeholder",
a.firstErrorMsg()).addClass(b.errFieldClass),i(b.gaLabel,"noemail",b.gaLabelTemplate,b.pageSection))},o=a._doValidateForSubmit();!0===o?D(j,e,g):(v(a,b,c,o),i(b.gaLabel,"errors",b.gaLabelTemplate,o));h&&(a.toggles.triggered=!0,w(a.jobAlertData,a),d(c).find("button span").html(a.button.lblTransient))});this._on({jaCreated:function(e,g){d(p).trigger("jobAlertSuccess");e.stopPropagation();a._onSuccess();var h=d(c).siblings(".jobAlertConfirmWrapper"),j=h.find(".jobAlertExists");h.find(".gotoEmail");h.removeClass("hidden").addClass("asTbl");
f?j.removeClass("neutralBox nonLoggedIn").addClass("successBox strong").html("Job Alert Created"):g.gotoUrl&&L(a,d(c),g.gotoSite,g.gotoUrl);d(c).remove();i(b.gaLabel,"created",b.gaLabelTemplate,b.expImpPhrase)},jaFail:function(e,f){d(p).trigger("jobAlertFail");a._onFail();e.stopPropagation();var g=d(".gdDialog .jobAlertDlg"),g=Boolean(g.length);d(c).find("button span").html(a.button.lbl);g||v(a,b,c,f.message);i(b.gaLabel,"errors",b.gaLabelTemplate,f.message)},jaOtherCreated:function(b){b.stopPropagation();
d(c).remove();a._onSuccessOthers();a.destroy()},jaOtherFail:function(b){b.stopPropagation();a._onFailOthers()}})},_init:function(){x(this)},_doValidateForSubmit:function(){var a=this.options;d("body").is(".loggedIn");return this.srchParams.key||this.srchParams.loc?!0:a.errMsgs.srchNoKeyLoc}});d.widget("gd.jobAlertForm",d.gd.jobAlert,{widgetEventPrefix:d.gd.jobAlert.prototype.widgetEventPrefix,toggles:{triggered:!1},_create:function(){var a=this,b=a.options,c=a.element,f=d("body").is(".loggedIn"),
e=C(),h=!1;this._super();var g=a.button.$obj=d(c).find(".jobAlertButton"),j=d(c).find("form");e&&j.find("input[name=emailAddress]").val(e);g.on("click",function(e){var g=d(this),r,o;r=a.jobAlertData.keywords=d.trim(j.find("input[name=keywords]").val());o=a.jobAlertData.rawLocationName=d.trim(j.find("input[name=rawLocationName]").val());a.jobAlertData.locationId=j.find("input[name=locationId]").val();a.jobAlertData.locationType=j.find("input[name=locationType]").val();a.jobAlertData.emailAddress=d.trim(j.find("input[name=emailAddress]").val());
a.jobAlertData.source=b.source;e.preventDefault();b.expImpPhrase=n("exp-exp",r,o);o==t&&(b.expImpPhrase=n("exp-imp",r,o));e=d(c).find(".ajaxResult");r=e.find(".headline");e.slideUp();i(b.gaLabel,"click",b.gaLabelTemplate,b.pageSection);o=b.errMsgs.emailKey;f&&(o=b.errMsgs.key);o={required:[a.formFields.email,a.formFields.key],requiredErr:o,emailCheck:[a.formFields.email]};var l=function(a){if(a.success){h=true;j.find(b.formFieldEmail).removeClass(b.errFieldClass);j.find("#CompletedAction").slideUp()}else{h=
false;g.find("span").html(b.btnLabel);j.find(b.formFieldEmail).val("").attr("placeholder",a.firstErrorMsg()).addClass(b.errFieldClass);i(b.gaLabel,"noemail",b.gaLabelTemplate,b.pageSection)}},k=a._doValidateForSubmit();!0===k?D(j,o,l):(b.useSplash?v(a,b,c,k):(r.html(k),e.slideDown()),i(b.gaLabel,"errors",b.gaLabelTemplate,k));h&&(a.toggles.triggered=!0,w(a.jobAlertData,a),d(c).find("button span").html(a.button.lblTransient))});this._on({jaCreated:function(e,g){d(p).trigger("jobAlertSuccess");e.stopPropagation();
a._onSuccess();var h=d(c).siblings(".jobAlertConfirmWrapper"),j=d(c).find(".jobAlertExists"),k=d(c).find("form");h.find(".gotoEmail");h.removeClass("hidden").addClass("asTbl");k.remove();f?j.removeClass("neutralBox hidden").addClass("margTop10 successBox alignCenter").html(b.okMsgs.siPopup).slideDown():(j.removeClass("hidden").addClass("tightBotMarg").html(b.okMsgs.soPopup).slideDown(),g.gotoUrl&&L(a,d(c),g.gotoSite,g.gotoUrl));i(b.gaLabel,"created",b.gaLabelTemplate,b.expImpPhrase);b.oneClickTitles&&
(g.hasOwnProperty("recommendedJobAlerts")&&g.recommendedJobAlerts instanceof Array&&g.recommendedJobAlerts.length)&&I(!1,g.recommendedJobAlerts,{keywords:g.keywords,emailAddress:g.emailAddress,rawLocationName:g.rawLocationName,locId:g.locationId,locType:"C",source:b.source},a,c,b)},jaFail:function(e,f){d(p).trigger("jobAlertFail");e.stopPropagation();a._onFail();var g=d(".gdDialog .jobAlertDlg"),h=d(c).find(".ajaxResult"),j=h.find(".headline"),g=Boolean(g.length);d(c).find("button span").html(a.button.lbl);
!g&&b.useSplash?v(a,b,c,f.message):(j.html(f.message),h.slideDown());i(b.gaLabel,"errors",b.gaLabelTemplate,f.message)},jaOtherCreated:function(b){b.stopPropagation();d(c).remove();a._onSuccessOthers();a.destroy()},jaOtherFail:function(b){b.stopPropagation();a._onFailOthers()}})},_init:function(){x(this)},_doValidateForSubmit:function(){d("body").is(".loggedIn");return!0}});d.widget("gd.jobAlertLinkInterceptor",d.gd.jobAlert,{widgetEventPrefix:d.gd.jobAlert.prototype.widgetEventPrefix,toggles:{triggered:!1},
_create:function(){var a=this,b=a.options,c=a.element;d("body").is(".loggedIn");var f=!0;c.data("onclk",c.prop("onclick"));this._super();a.button.$obj=b.$btn?b.$btn:c;b.errMsgs.email="Please enter a valid email address";b.localStorage.enabled&&l&&(f=l.isJobAlertExpired(b.localStorage.name,b.localStorage.ttl,!0));f&&(c.off("click"),c.on("click",function(d){d.preventDefault();i(b.gaLabel,"click",b.gaLabelTemplate,b.pageSection);a.toggles.triggered=!0;a.jobAlertData.source=b.source;z(a,b,c);b.localStorage.enabled&&
l&&l.isJobAlertExpired(b.localStorage.name,b.localStorage.ttl)}));this._on({jaCreated:function(e){d(p).trigger("jobAlertSuccess");e.stopPropagation();if(b.interceptor.addJAParam){e=d(c).attr("href");e.indexOf("?")>0?d(c).attr("href",e+"&ja=0"):d(c).attr("href",e+"?ja=0")}if(b.interceptor.addCompletedAction){e=d(c).attr("href");e.indexOf("?")>0?d(c).attr("href",e+"&completedAction=JOB_ALERT_CREATED"):d(c).attr("href",e+"?completedAction=JOB_ALERT_CREATED")}i(b.gaLabel,"created",b.gaLabelTemplate,a.jobAlertData.keywords+
"|"+a.jobAlertData.rawLocationName)&&GD.dom.loadUrl(d(c).attr("href"))},jaFail:function(e,f){d(p).trigger("jobAlertFail");e.stopPropagation();A(a,c,b,false,f.message,f)},jaOtherCreated:function(e){e.stopPropagation();a.destroy();if(b.interceptor.addJAParam){e=d(c).attr("href");e.indexOf("?")>0?d(c).attr("href",e+"&ja=0"):d(c).attr("href",e+"?ja=0")}d(c).off("click").on("click",d(c).data("onclk"))},jaOtherFail:function(b){b.stopPropagation();a._onFailOthers()}})},_init:function(){x(this)},_prepareData:function(){var a=
this.element,b="",c=d(a).data("jobTitle"),f=d(a).data("jobLoc"),e=d(a).data("locId"),a=d(a).data("locType");f?b=f:t&&(b=t,this.toggles.isUsingImplicitLoc=!0);this.toggles.isUsingImplicitLoc?this._setJobAlertData(s,b,G,H):this._setJobAlertData(c,b,e,a)},_doAjax:function(a){this.jobAlertData=a;this.toggles.triggered=!0;w(a,this)}})});String.prototype.isValidEmail=function(){return/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this)};window.GD=window.GD||{};GD.jobs=GD.jobs||{};window.GD=window.GD||{};GD.jq=GD.jq||{};GD.jq.START_DEFAULT_TIME="00:00";GD.jq.END_DEFAULT_TIME="23:59";
GD.jq.initDateRange=function(a,b,c,e,d,f){var g=$(a),h=$(b),i=$(c),j=$(e),k=$(d),l=$(f),a={changeMonth:!0,changeYear:!0,contrainInput:!0,showAnim:"fadeIn",yearRange:"c-1:c+2",onSelect:function(a){GD.jq._onSelectDateRange(this,a,g,h)},onClose:function(a,b){b.input[0]==g[0]?GD.jq._onCloseDateRange(g,i,k,GD.jq.START_DEFAULT_TIME):GD.jq._onCloseDateRange(h,j,l,GD.jq.END_DEFAULT_TIME)}};i.change(function(){GD.jq._mergeDateData(g,i,k,GD.jq.START_DEFAULT_TIME)}).keydown(function(){GD.jq._mergeDateData(g,
i,k,GD.jq.START_DEFAULT_TIME)});j.change(function(){GD.jq._mergeDateData(h,j,l,GD.jq.END_DEFAULT_TIME)}).keydown(function(){GD.jq._mergeDateData(h,j,l,GD.jq.END_DEFAULT_TIME)});g.datepicker(a);h.datepicker(a)};GD.jq._onSelectDateRange=function(a,b,c,e){var d=a==c[0],a=$(a).data("datepicker"),b=$.datepicker.parseDate(a.settings.dateFormat||$.datepicker._defaults.dateFormat,b,a.settings);d?e.datepicker("option","minDate",b).trigger("change"):c.datepicker("option","maxDate",b).trigger("change")};
GD.jq._onCloseDateRange=function(a,b,c,e){GD.jq._mergeDateData(a,b,c,e);a.focus()};GD.jq._mergeDateData=function(a,b,c,e){if(a.length&&c.length){var a=a.val().trim(),d,f="";d=b.length?b.val().trim():e;a?(f=a,d||(d=e,b.val(d)),f+=" "+d):f="";c.val(f)}};(function(a){a(window.jQuery,window,document)})(function(a){a.widget("gd.gdSelect",a.selectBox.selectBoxIt,{namespace:"gd",VERSION:"1.1.0",options:{onchange:void 0,autoWidth:!1,copyClasses:"container"},_create:function(){var b=this;b._super();if(jQuery.isFunction(b.options.onchange))b.element.on("change",function(a){b.options.onchange(a)});return b}})});(function(a){a(window.jQuery,window,document)})(function(a){a.widget("gd.gdTabs",a.ui.tabs,{namespace:"gd",VERSION:"1.1.0",options:{active:0,type:"swap",heightStyle:"auto",hideOnLink:".pageInsideContent"},_create:function(){var b=this.options;this.type=b.type;this.$tabs=this.element.find("ul > li:has(a[href])");this.$links=this.$tabs.find("a[href]");if("swap"==this.type)this._super();else if("link"==this.type&&b.hideOnLink){var c=a(b.hideOnLink);if(c.length)this.$links.on("click",function(b){var d=
a(this).attr("href");GD.dom.clearWindowAndRedirect(d,void 0,c);b.preventDefault()})}},_getCreateEventData:function(){return"swap"==this.type?this._super():{}},enable:function(){"swap"==this.type?this._super():"link"==this.type&&alert("enable not implemented for gdTabs()")},disable:function(){"swap"==this.type?this._super():"link"==this.type&&alert("disable not implemented for gdTabs()")}})});window.GD=window.GD||{};GD.lazyLoad=function(a){if(!a||!a.length)a=$("body");GD.wait().then(function(){var b=a.find(".lazy:not(.hero)");b.show().lazyload({effect:"fadeIn",effect_speed:400,skip_invisible:!1});b=a.find(".lazy.hero");b.show().lazyload({effect:"fadeIn",effect_speed:2E3,skip_invisible:!1});$(window).trigger("scroll")})};window.GD=window.GD||{};GD.link=GD.link||{};
GD.link.initTargetedLinks=function(d,b,c,e,g){b=$(b);if(d)return 0===b.length&&(b=null),$("a[target="+d+"]",b).each(function(){var a=$(this),b=a.attr("href"),d=a.attr("target");$("body").is(".android");var h=$("body").is(".iphone"),f=$("body").is(".safari"),i=$("body").is(".tablet");a.data("url",b);a.data("offsiteTarget",d);if(f&&i||f&&h)a.on("mousemove click",function(b){c||GD.util.openNewTab(jobUrl,!0);"undefined"!=e&&e&&(c?GD.jobsLink.track(b):GD.jobsLink.track(b,!c))});else a.on("click",function(a){a.preventDefault();
g?a.stopImmediatePropagation():a.stopPropagation();c||window.open(b,"_blank");"undefined"!=e&&e&&(c?GD.jobsLink.track(a):GD.jobsLink.track(a,!c))});a.removeAttr("target")}),!1;Logger.error("GD.link.initTargetedLinks called without 'target' attribute.")};window.GD=window.GD||{};GD.mSel=GD.mSel||{};GD.mSel.SELECTED_TEXT="items selected";GD.mSel.SELECT_ALL_TEXT="Select All";GD.mSel.SELECT_NONE_TEXT="No items selected";
GD.mSel.init=function(a,d,b,c){"undefinded"==typeof c&&(c=null);var e=$(".mSelInput","#"+a),h=$(".mSelValues","#"+a),f=$(".mSelAllChk","#"+a),k=$(".mSelAll label","#"+a),m=$(".mSelList","#"+a),j=$(".mSelItem","#"+a),l=$(".mSelListItemChk","#"+a),n=$(".mSelItem label","#"+a),i=$(".mSelText","#"+a),g=$("#"+a+"_count");1<g.val()?i.val(g.val()+" "+d):1==g.val()&&i.val(m.find('input[checked="checked"]').val());m.find('input[checked="checked"]').each(function(){$(this).parent().addClass("mSelected")});
e.on("focus click",function(){h.toggle()});b=$("#"+b);b.find("input").on("focus",function(){!$(this).hasClass("mSelect")&&(!$(this).hasClass("mSelListItemChk")&&!$(this).hasClass("mSelAllChk"))&&h.hide()});b.find("radio").on("focus",function(){h.hide()});b.find("select").on("focus",function(){$(this).hasClass("mSelect")||h.hide()});b.find(".selectboxit").on("focus",function(){$(this).hasClass("mSelect")||h.hide()});f.on("change",function(){$(this).is(":checked")?$(this).parent().addClass("mSelected"):
$(this).parent().removeClass("mSelected");GD.mSel._toggleSelect($(this),l,j,g,i,d);GD.mSel._callOnChange(c,a)});k.on("click",function(){$(this).prev().is(":checked")?($(this).parent().removeClass("mSelected"),$(this).prev().prop("checked",""),GD.mSel._updateText($(this).prev(),!1,g,i,d,j)):($(this).prev().prop("checked","checked"),$(this).parent().addClass("mSelected"),GD.mSel._updateText($(this).prev(),!0,g,i,d,j));GD.mSel._toggleSelect($(this).prev(),l,j,g,i,d);GD.mSel._callOnChange(c,a)});n.on("click",
function(){$(this).prev().is(":checked")?($(this).parent().removeClass("mSelected"),$(this).prev().prop("checked",""),k.removeClass("mSelected"),f.prop("checked",""),f.parent().removeClass("mSelected"),GD.mSel._updateText($(this).prev(),!1,g,i,d,j)):($(this).prev().prop("checked","checked"),$(this).parent().addClass("mSelected"),GD.mSel._updateText($(this).prev(),!0,g,i,d,j));GD.mSel._callOnChange(c,a)});l.on("change",function(){$(this).is(":checked")?($(this).parent().addClass("mSelected"),GD.mSel._updateText($(this),
!0,g,i,d,j)):(k.removeClass("mSelected"),f.prop("checked",""),f.parent().removeClass("mSelected"),$(this).parent().removeClass("mSelected"),GD.mSel._updateText($(this),!1,g,i,d,j));GD.mSel._callOnChange(c,a)})};GD.mSel._callOnChange=function(a,d){if(null!==a&&"undefined"!==typeof a){for(var b=$("#"+d).data("name"),b=$('input[name="'+b+'"]:checked'),c="",e=0;e<b.length;e++)c+=b[e].value+"^";b=$("<div/>").text(c).html();a(b)}};
GD.mSel._toggleSelect=function(a,d,b,c,e,h){var f=b.length;a.is(":checked")?(d.prop("checked",!0),a.next().addClass("mSelected"),b.addClass("mSelected"),GD.mSel._updateText(a,!0,c,e,h,f)):(d.prop("checked",!1),a.next().removeClass("mSelected"),b.removeClass("mSelected"),GD.mSel._updateText(a,!1,c,e,h,f))};
GD.mSel._updateText=function(a,d,b,c,e,h){var f="No "+e;a.hasClass("mSelAllChk")?d?(b.val(h),c.val(GD.mSel.SELECT_ALL_TEXT)):(b.val(0),c.val(f)):(d?b.val(parseInt(b.val(),10)+1):b.val(parseInt(b.val(),10)-1),0===b.val()?c.val(f):1==b.val()?(a=a.parent().parent(),c.val($(".mSelected label",a).text().trim())):c.val(b.val()+" "+e))};window.GD=window.GD||{};GD.rollover=GD.rollover||{};GD.rollover.imgHolderClass=function(){this.hover=[];this.click=[];this.src=[];this.store=function(a,b,d){var c=this.src.length;null!==a&&0<a.length?(this.src[c]=new Image,this.src[c].src=a):this.src[c]=null;null!==d&&0<d.length?(this.hover[c]=new Image,this.hover[c].src=d):this.nover[c]=null;null!==b&&0<b.length?(this.click[c]=new Image,this.click[c].src=b):this.click[c]=null}};GD.rollover.imgHolder=new GD.rollover.imgHolderClass;
GD.rollover.preloader=function(a){for(i=0;i<a.length;i++)if(a[i].getAttribute("srchover")||a[i].getAttribute("srcclick")){GD.rollover._storeImgs(a[i]);var b="",b=a[i].getAttribute("srchover")?b+"A":b+"",b=a[i].getAttribute("srcclick")?b+"B":b+"";switch(b){case "A":GD.rollover.mouseover(a[i]);GD.rollover.mouseout(a[i]);break;case "B":GD.rollover.mousedown(a[i]);GD.rollover.mouseup2(a[i]);break;case "AB":GD.rollover.mouseover(a[i]);GD.rollover.mouseout(a[i]);GD.rollover.mousedown(a[i]);GD.rollover.mouseup(a[i]);
break;default:return}a[i].src&&a[i].setAttribute("oldsrc",a[i].src)}};GD.rollover.mouseup=function(a){var b;a.onmouseup?(a.oldmouseup=a.onmouseup,b=function(){this.src=this.getAttribute("srchover");this.oldmouseup()}):b=function(){this.src=this.getAttribute("srchover")};a.onmouseup=b};GD.rollover.mouseup2=function(a){var b;a.onmouseup?(a.oldmouseup=a.onmouseup,b=function(){this.src=this.getAttribute("oldsrc");this.oldmouseup()}):b=function(){this.src=this.getAttribute("oldsrc")};a.onmouseup=b};
GD.rollover.mousedown=function(a){a.onmousedown&&(a.oldmousedown=a.onmousedown);a.onmousedown=function(){this.src=this.getAttribute("srcclick")}};GD.rollover.mouseover=function(a){var b;a.onmouseover?(a.oldmouseover=a.onmouseover,b=function(){this.src=this.getAttribute("srchover");this.oldmouseover()}):b=function(){this.src=this.getAttribute("srchover")};a.onmouseover=b};
GD.rollover.mouseout=function(a){var b;a.onmouseout?(a.oldmouseout=a.onmouseout,b=function(){this.src=this.getAttribute("oldsrc");this.oldmouseout()}):b=function(){this.src=this.getAttribute("oldsrc")};a.onmouseout=b};GD.rollover._storeImgs=function(a){var b=a.getAttribute("src")?a.getAttribute("src"):"",d=a.getAttribute("srcclick")?a.getAttribute("srcclick"):"",a=a.getAttribute("srchover")?a.getAttribute("srchover"):"";GD.rollover.imgHolder.store(b,d,a)};
GD.rollover._preLoadImgs=function(){if(document.getElementsByTagName){var a=document.getElementsByTagName("IMG"),b=document.getElementsByTagName("INPUT");GD.rollover.preloader(a);GD.rollover.preloader(b)}};window.addEventListener?window.addEventListener("load",GD.rollover._preLoadImgs,!1):window.attachEvent?window.attachEvent("onload",GD.rollover._preLoadImgs):function(){var a=window.onload;window.onload=function(b){a();GD.rollover._preLoadImgs(b)}}();window.GD=window.GD||{};GD.srch=GD.srch||{};GD.srch.DISAMBIG_RESULTS_WINDOW_ID="AjaxLocationDisambigResults";GD.srch.TRUNC_NUM_RESULTS_TO_SHOW=5;GD.srch._showDisambigError=function(b,c,a){GD.srch._showLocDisambigPanel(b,c,a)};
GD.srch._populateSelectPanel=function(b,c,a,e){var d=$("<div class='locDisambigPanel'>"),i=$("<div class='locDisambigResults truncDisambig'>"),f,g=GD.srch.TRUNC_NUM_RESULTS_TO_SHOW;d.append("<i class='circledGreenCheck'></i>");d.append("<p class='header'>We found <strong>"+c.length+"</strong> results for <strong>"+a+"</strong></p>");c.length>GD.srch.TRUNC_NUM_RESULTS_TO_SHOW+1?f=$("<div class='locDisambigResults fullDisambig hidden'>"):c.length==GD.srch.TRUNC_NUM_RESULTS_TO_SHOW+1&&g++;for(a=0;a<
c.length;a++){var j=c[a],h;h=GD.srch._getSelectPanelItem(b,j,e);c.length>g&&f.append(h);a<g&&(h=GD.srch._getSelectPanelItem(b,j,e),i.append(h))}c.length>g&&(i.append("<p class='footer'><a onmousedown='return GD.srch._showFullDisambigList(true);'>More results</a></p>"),f.append("<p class='footer'><a onmousedown='return GD.srch._showFullDisambigList(false);'>Fewer results</a></p>"));d.append(i);f&&d.append(f);return d};
GD.srch._showLocDisambigPanel=function(b,c,a){GD.srch._closeLocDisambigPanel();a.disambigParent&&!a.disambigParent.length&&(a.disambigParent=null);GD.dlgManager.panelCreate({dialogId:GD.srch.DISAMBIG_RESULTS_WINDOW_ID,dlgParent:a.disambigParent,width:a.width,top:a.top,left:a.left,showClose:!0,onClose:function(){GD.srch._onLocDisambigPanelClose(b)}});GD.dlgManager.panelSetContents("#"+GD.srch.DISAMBIG_RESULTS_WINDOW_ID,c);GD.dlgManager.panelShow("#"+GD.srch.DISAMBIG_RESULTS_WINDOW_ID);a.scrollToPanel&&
jQuery.scrollTo($("#"+GD.srch.DISAMBIG_RESULTS_WINDOW_ID),{axis:"y",duration:200,offset:{left:0,top:10}})};GD.srch._closeLocDisambigPanel=function(){try{GD.dlgManager.panelClose("#"+GD.srch.DISAMBIG_RESULTS_WINDOW_ID)}catch(b){}return!1};GD.srch._removeLocDisambigPanel=function(){$("#"+GD.srch.DISAMBIG_RESULTS_WINDOW_ID).remove()};
GD.srch._showFullDisambigList=function(b){"boolean"!==typeof b&&(b=!0);b?($("#"+GD.srch.DISAMBIG_RESULTS_WINDOW_ID+" .truncDisambig").hide(),$("#"+GD.srch.DISAMBIG_RESULTS_WINDOW_ID+" .fullDisambig").show()):($("#"+GD.srch.DISAMBIG_RESULTS_WINDOW_ID+" .fullDisambig").hide(),$("#"+GD.srch.DISAMBIG_RESULTS_WINDOW_ID+" .truncDisambig").show());return!1};
GD.srch._getSelectPanelItem=function(b,c,a){var e=$("<p>"),d=$("<a></a>"),b=GD.srch._getLocSelectHandler(b,c.name,c.type,c.id,a);d.html(c.name);d.click(b);e.append(d);return e};
GD.srch._noMatchesError=function(b,c){var a=$("<div class='locDisambigNoResults'>"),e=b.val();a.append("<img src='/static/img/spacer.gif' class='warning' />");a.append("<p class='header'>No matches for <strong>"+e+"</strong></p>");a.append("<p>Please try a different location or see results for <a>all available locations</a>.</p>");$("a",a).on("click",function(){GD.srch._handleAllLocationsSelect(b,c)});return a};window.GD=window.GD||{};GD.srch=GD.srch||{};
GD.srch.initLocDisambig=function(b,a){b||(b=$(null));a.locType||(a.locType=$(null));a.locId||(a.locId=$(null));a.locStr||(a.locStr=$(null));var d=b.closest("form");"boolean"!==typeof a.scrollToPanel&&(a.scrollToPanel=!1);"boolean"!==typeof a.pickBestMatch&&(a.pickBestMatch=!1);a.width||(a.width=330);if(d.length){d.bind("submit",function(c){var f=b.val(),g=a.locType.val(),h=a.locId.val(),i=a.locStr.val();f&&(f=f.trim());if(f){(i||a.locType.length&&g&&a.locId.length&&h)&&d.data("disambigOk",true);if(!d.data("disambigOk")){GD.srch._doLocationDisambig(b,
d,a);c.preventDefault();c.stopPropagation()}}else d.data("disambigOk",true)});var c=GD.srch._getDisambigKeyDownFunc(a);b.keydown(c)}};GD.srch._getDisambigKeyDownFunc=function(b){return function(a){if(13===a.keyCode&&""!==b.locType.val()&&""!==b.locId.val()&&""!==b.locStr.val())return!0;if(33>a.keyCode||40<a.keyCode)b.locType.val(""),b.locId.val(""),b.locStr.val("");GD.srch._closeLocDisambigPanel();return!0}};
GD.srch._doLocationDisambig=function(b,a,d){var a=a.data("zipcodesOk"),c="";if(c=b.val())c=c.trim(),b.val(c);c||GD.srch._handleAllLocationsSelect(b,d);jQuery.ajax({url:"/util/ajax/findLocationsByFullText.htm",dataType:"json",data:{locationSearchString:c,allowPostalCodes:a},success:function(a){GD.srch._disambigLocationAjaxHandler(b,a.locations,c,d)},error:function(){GD.srch._disambigLocationAjaxHandler(null,null,c,d);disambigHandler=GD.srch._getDisambigHandler();disambigHandler()}});return!1};
GD.srch._disambigLocationAjaxHandler=function(b,a,d,c){if(a)if(1==a.length||0<a.length&&c.pickBestMatch)GD.srch._closeLocDisambigPanel(),a=a[0],GD.srch._setLocation(b,a.name,a.type,a.id,c),b.parents("form:first").data("disambigOk",!0),c.doFormSubmit();else{var e=null;0===a.length?c.pickBestMatch?GD.srch._handleAllLocationsSelect(b,c):e=GD.srch._noMatchesError(b,c):e=GD.srch._populateSelectPanel(b,a,d,c);e&&e.length&&GD.srch._showLocDisambigPanel(b,e,c)}else c.pickBestMatch?GD.srch._handleAllLocationsSelect(b,
c):GD.srch._showDisambigError(b,$("<p><strong>An error occurred in processing the location '"+d+"'.</strong></p><p>Please try again.  If the problem persists, please be assured that our engineers are scrambling to fix the problem.</p>"),c)};GD.srch._getLocSelectHandler=function(b,a,d,c,e){return function(){GD.srch._handleLocationSelect(b,a,d,c,e);return!1}};
GD.srch._handleLocationSelect=function(b,a,d,c,e){GD.srch._removeLocDisambigPanel();GD.srch._setLocation(b,a,d,c,e);b.parents("form:first").data("disambigOk",!0);"function"===typeof e.doFormSubmit&&e.doFormSubmit()};GD.srch._handleAllLocationsSelect=function(b,a){GD.srch._removeLocDisambigPanel();GD.srch._setLocation(b,"","","",a);b.parents("form:first").data("disambigOk",!0);"function"===typeof a.doFormSubmit&&a.doFormSubmit()};
GD.srch._setLocation=function(b,a,d,c,e){b&&b.val(a);e.locType&&e.locId&&(e.locType.val(d),e.locId.val(c));e.locStr&&(d&&c?e.locStr.val(d+","+c):e.locStr.val(""))};GD.srch._onLocDisambigPanelClose=function(b){b.focus().select()};window.GD=window.GD||{};GD.site=GD.site||{};GD.site.stickyBar=GD.site.stickyBar||{};GD.hdr=GD.hdr||{};GD.site.COOKIE_NAME_FORCE_UNCOMPRESSED="gdTesterOverride_forceUncompressed";GD.site.COOKIE_NAME_FORCE_MOBILE="gdTesterOverride_forceMobile";GD.site.modalWidth=450;GD.site.closeCompletedAction=function(){$("div.completedAction").slideUp("slow")};
GD.site.initFbSigninCTA=function(){var a=!1;GD.runOnFacebookLoad(function(){GD.fb.getFbLoginStatus(function(b){a||(a=!0,"connected"==b||"not_authorized"==b?GD.site.initFbFacepilePlugin():($(".fbRecommendedWhy").show(25),GD.site.initFbSigninCTALink()))},!0)});$("body").on("click",".closeDialog",function(a){$(a.target).closest(".dialogFrame").find(".closeBox .medx").trigger("click")})};
GD.site.initFbFacepilePlugin=function(){var a=$(".loginDlgBody .fb-facepile > span");0<a.length&&GD.site.hidePicsInFacepile(a);$("div.fbSigninCTAWrapper").addClass("facepileView");$("div.fbFacepilePluginWrapper").show(25)};GD.site.hidePicsInFacepile=function(a){var b=a.height();38<b&&(Logger.info("removing pics!!!"),a.height(b-24).css("overflow","hidden"))};
GD.site.initFbSigninCTALink=function(){$(".fbSigninCTA a.link").on("click keypress",function(a){a.stopPropagation?a.stopPropagation():a.cancelBubble=!0;var a=$(".fbSigninCTA div.fbSigninCTALink"),b=$(".fbSigninCTA ul.fbSigninCTAList");a.hide(25);b.show(25);return!1});$(".fbSigninCTA div.fbSigninCTALink").show(25)};
GD.site.initGdSigninOptionLink=function(a){var b=$("#CreateAccountForm");if("1"===a||!$("#actionErrorBlock").hasClass("hidden"))b.show(500);else $(".gdSigninOptionLink").on("click keypress",function(){b.is(":hidden")?b.show(500):b.hide(500)})};
GD.site.onHeaderTabClick=function(a){var b=$(a.target).closest("a"),d=b.data("searchUrl"),e=$("#SiteSrchTop form.siteSrchForm"),c=$("input.keyword",e).val();if(d&&c){var f="";c&&(f="sc.keyword="+encodeURIComponent(c).trim());0<f.length&&(f+="&");f+="clickSource=tab";b.closest("li").hasClass("jobs")&&(b=$(".locType",e).val(),e=$(".locId",e).val(),0<f.length&&(f+="&"),b&&(f+="&locT="+b.trim()),b&&(f+="&locId="+e.trim()));d.contains("?")?GD.dom.clearWindowAndRedirect(d+"&"+f,"_top"):GD.dom.clearWindowAndRedirect(d+
"?"+f,"_top");a.preventDefault()}};"undefined"==typeof GD.ssSorts&&(GD.ssSorts={});GD.ssSorts.advancedSalarySortsLimited=[{label:"Relevance (by Company)",key:"MV",ascending:!1},{label:"Relevance (by Job Title)",key:"JR",ascending:!1},{label:"# of Salaries",key:"MC",ascending:!1}];
GD.ssSorts.advancedSalarySorts=[{label:"Relevance (by Company)",key:"MV",ascending:!1},{label:"Relevance (by Job Title)",key:"JR",ascending:!1},{label:"# of Salaries",key:"MC",ascending:!1},{label:"Avg. Salary (high to low)",key:"AS",ascending:!1},{label:"Avg. Salary (low to high)",key:"AS",ascending:!0}];
GD.ssSorts.advancedEmployerSorts=[{label:"Relevance",key:"MV",ascending:!1},{label:"# of Reviews",key:"MC",ascending:!1},{label:"Overall Rating (high to low)",key:"OR",ascending:!1},{label:"Overall Rating (low to high)",key:"OR",ascending:!0},{label:"CEO Approval Rating (high to low)",key:"CR",ascending:!1},{label:"CEO Approval Rating (low to high)",key:"CR",ascending:!0}];
GD.ssSorts.advancedInterviewSorts=[{label:"Relevance",key:"MV",ascending:!1},{label:"Most Answers",key:"MC",ascending:!1},{label:"Date Posted + Helpful",key:"DH",ascending:!1},{label:"Date Posted (new to old)",key:"RD",ascending:!1},{label:"Date Posted (old to new)",key:"RD",ascending:!0}];GD.hdr._srchButtonLabel={SALARIES:"Search Salaries",REVIEWS:"Search Companies",INTERVIEWS:"Search Interviews",JOBS:"Search Jobs"};
GD.hdr._srchSiteSection={SALARIES:"SALARY",REVIEWS:"EMPLOYER",INTERVIEWS:"INTERVIEW",JOBS:"JOBS"};GD.hdr._srchOpts={};GD.hdr._inSubmit=!1;
GD.hdr.initSiteSearch=function(a,b,d){var e=$("body").is(".part");d&&!e&&GD.hdr.initLocAC();var c=$("form.siteSrchForm").not(".ready");$(c[0]).closest("#SiteSrchTop.banner");c.each(function(){var c=$(this);c.find(".advancedSearchLink").on("click",function(a){a.preventDefault();GD.hdr.toggleSiteSrchAdv()});if(e)c.find("select.std").on("change",function(){var a=$(this);GD.hdr._onSrchTypeChange(c,a.val(),d,e)});else c.find("select.std").gdSelect({onchange:function(a){a=$(a.target);GD.hdr._onSrchTypeChange(c,
a.val(),d,e)}});c.find("input[type=text]").on("keypress",function(a){return GD.hdr._onKeyPress(a,c)});var g=c.find("input.loc"),h=c.find("input.locType"),i=c.find("input.locId"),j=c.find("span.locPosPt"),k=g.outerHeight()+2,l=g.outerWidth()-2;GD.srch.initLocDisambig(g,{locType:h,locId:i,disambigParent:j,top:k,left:4,width:l,scrollToPanel:a==="Bottom",pickBestMatch:b||e,doFormSubmit:function(){return GD.hdr._onSubmitSiteSrch(c)}});c.find("button.gd-button").on("click",function(){GD.hdr._onSubmitSiteSrch(c)});
c.addClass("ready")})};GD.hdr.initAdvSiteSearch=function(a){GD.hdr._srchOpts=a};
GD.hdr._onSrchTypeChange=function(a,b,d,e){var c=$("option:selected",a),f=c.data("placeholder"),g=c.data("subtitle"),c=c.data("zipcodesOk");GD.shim.setPlaceholder($("input.keyword",a),f);a.data("zipcodesOk",c);f=$("input.keyword",a);c=$("input.loc",a);if(!e)if(b=="/Job/jobs.htm"){f.autocomplete("enable");d&&c.autocomplete("enable")}else{f.autocomplete("option","disabled","true");d&&c.autocomplete("option","disabled","true")}g&&$("#SiteSrchTop.banner p.subtitle").html(g);a.attr("action",b)};
GD.hdr._onSubmitSiteSrch=function(a){var b=true;jQuery.isFunction(a[0].onsubmit)&&(b=a[0].onsubmit());b&&a.submit();return false};GD.hdr._onKeyPress=function(a,b){if(a.keyCode==13){GD.wait().then(function(){GD.hdr._onSubmitSiteSrch(b)});return false}return true};
GD.hdr.initLocAC=function(){var a=$("form.siteSrchForm"),b=GD.util.getAjaxUrlRespectingSecurity(GD.ajax.jsonUrls.ANY_LOCATION_AUTOCOMPLETE),d=$("input.loc",a),e=$("input.locType",a),c=$("input.locId",a),f={minLength:2,delay:100,source:function(a,c){$.getJSON(b+"?maxLocationsToReturn=10",{term:a.term},function(a){c($.map(a,function(a){return{label:a.label,value:a.locationType+"_"+a.locationId}}))})},create:function(){var a=d.data("uiAutocomplete");d.addClass("glassdoorAC");a.menu.element.addClass("location-ac-results");
a.menu.element.attr("id","LocText_ACPopup")},focus:function(a,b){var d=b.item.value.split("_"),f=d[1];e.val(d[0]);c.val(f);return false},select:function(a,b){var f=b.item.value.split("_"),j=f[1];e.val(f[0]);c.val(j);d.val(b.item.label);return false},open:function(){$("#LocText_ACPopup",a).addClass("ui-autocomplete-opened locationTermAutoComplete");$(this).autocomplete("widget").css("z-index","100");return true},close:function(){d.removeClass("ui-autocomplete-opened")}};if(d.length>0)d.autocomplete(f).data("uiAutocomplete")._renderItem=
function(a,b){return GD.ajax.formatACItem(d,a,b)}};
GD.hdr.initSrchAC=function(a){if(!$("body").is(".part")){var b=$("form.siteSrchForm"),d=$("input.typedKey",b),e=$("input.keyword",b),a=a!=="JOBS";e.on("keydown",function(a){var b=$.ui.keyCode;(a.keyCode===b.UP||a.keyCode===b.DOWN)&&d.val()===""&&d.val(e.val())});$("select.url option:selected");a={disabled:a,create:function(){var a=e.data("uiAutocomplete");e.addClass("glassdoorAC");a.menu.element.attr("id","SrchKey_ACPopup")},open:function(){$("#SrchKey_ACPopup").addClass("ui-autocomplete-opened jobTermAutoComplete");$(this).autocomplete("widget").css("z-index",
"100");return true},source:function(a,d){jQuery.ajax({url:"findSearchTermAjax.htm",data:{siteSection:"jobs",countryId:2,term:a.term},dataType:"json",success:function(a){var c=[];$.each(a,function(a,b){c.push({value:b,label:b})});$("input.suggestCount",b).val(c.length);return d(c)},error:function(){}})},select:function(){$("input.suggestChosen",b).val("true");d.val()===""&&d.val(e.val())}};if(e.length>0)e.autocomplete(a).data("uiAutocomplete")._renderItem=function(a,b){return GD.ajax.formatACItem(e,
a,b)}}};GD.hdr.onSiteSrchAdvSubmit=function(){if(!GD.hdr._inSubmit){$("#SiteSrchAdvForm");GD.hdr._setSiteSrchAdvFormAction();GD.hdr.onSiteSrchAdvUserSubmit()&&GD.hdr.doSiteSrchAdvSubmit()}return false};GD.hdr.onSiteSrchAdvKeyPress=function(a){var b=true;if(GD.event.fixEvent(a).keyCode===13){GD.hdr._setSiteSrchAdvFormAction();if(GD.hdr.onSiteSrchAdvUserSubmit()){GD.hdr._inSubmit=true;GD.wait().then(GD.hdr.doSiteSrchAdvSubmit)}b=false}return b};
GD.hdr._setSiteSrchAdvFormAction=function(){var a=$("#SiteSrchAdvForm"),b=$("#SiteSrchAdvType",a);b.length&&a.length&&a.attr("action",b.val())};
GD.hdr.onSiteSrchAdvUserSubmit=function(){var a=$("#SiteSrchAdvCountry option:selected").val(),b=$("#SiteSrchAdvCity").val(),d=$("#SiteSrchAdvCityId").val();b&&(b=b.trim());if(b&&!d){if(a>0){GD.hdr.clearSiteSearchErrors();(d=$("#SiteSrchAdvNoCityIdWait"))&&d.length&&d.css("display","block");GD.hdr.siteSearchRequestMatchingCities(a,b)}else{$("#CountryNotSpecifiedError").show();GD.hdr.setSiteSrchAdvFieldPrompts()}return false}return true};
GD.hdr.doSiteSrchAdvSubmit=function(){GD.hdr.closeSiteSrchAdv();$("#SiteSrchAdvForm").submit();GD.dom.clearPage()};GD.hdr._onSiteSrchAdvTypeChange=function(){var a=$("#SiteSrchAdvType option:selected");if(a.length){var b=a.attr("siteSection");a.val();GD.hdr._setSiteSrchAdvSorts(GD.hdr._srchSiteSection[b],null);GD.hdr.showTagsField(b==="INTERVIEWS");a=$("#SiteSrchAdvForm .buttons .gd-btn");GD.btn.label(a,GD.hdr._srchButtonLabel[b])}};
GD.hdr._setSiteSrchAdvSorts=function(a,b){var d=$("#SiteSrchAdvSort"),e=$("#SiteSrchAdvIndustryRow");if(a=="JOBS"){d.empty();$("#SiteSrchAdvSortsRow").hide();$("#SiteSrchAdvSortJobsRow").show();e.hide();$("select option:first",e).attr("selected","selected")}else{var c;typeof b!=="string"&&(b=null);if(!b){var f=$("#SiteSrchAdvDefaultType"),g=$("#SiteSrchAdvDefaultSort");if(f&&g){f=f.html();a===f&&(b=g.html())}}if(GD.ssSorts)if(a=="SALARY"&&GD.hdr._srchOpts.hasSalaryAccess&&GD.ssSorts.advancedSalarySorts)c=
GD.ssSorts.advancedSalarySorts;else if(a=="SALARY"&&GD.ssSorts.advancedSalarySortsLimited)c=GD.ssSorts.advancedSalarySortsLimited;else if(a=="EMPLOYER"&&GD.ssSorts.advancedEmployerSorts)c=GD.ssSorts.advancedEmployerSorts;else if(a=="INTERVIEW"&&GD.ssSorts.advancedInterviewSorts)c=GD.ssSorts.advancedInterviewSorts;if(d.length&&c){d.empty();for(g=0;g<c.length;g++){var f=c[g].key+"-"+c[g].ascending.toString(),h=$("<option value='"+f+"'>");h.text(c[g].label);f==b&&h.attr("selected","selected");d.append(h)}}d.data("gd-gdSelect").refresh();
e.show();$("#SiteSrchAdvSortJobsRow").hide();$("#SiteSrchAdvSortsRow").show()}GD.hdr._onSiteSrchAdvSortChange()};GD.hdr._onSiteSrchAdvSortChange=function(){var a=$("#SiteSrchAdvSortType"),b=$("#SiteSrchAdvSortAscending"),d=$("#SiteSrchAdvSort option:selected").val();if(d){d=d.split("-");a.val(d[0]);b.val(d[1])}};GD.hdr._onSiteSrchAdvCountryChange=function(a){var b=$("#SiteSrchAdvCityRow");if(a===0){$("#SiteSrchAdvCity").val();$("#SiteSrchAdvCityId").val();b.hide()}else{b.show();GD.shim.placeholder(b.find(":input:visible"))}GD.hdr.clearSiteSearchErrors()};
GD.hdr.onSiteSrchAdvCityKeyPress=function(){GD.hdr.clearSiteSearchErrors()};
GD.hdr.resetSiteSrchAdv=function(a){GD.hdr.clearSiteSearchErrors();$("#SiteSrchAdvType").data("gd-gdSelect").selectOption($("#SrchSelectTop")[0].selectedIndex);$("#SiteSrchAdvJob").val("");$("#SiteSrchAdvCompany").val("");$("#SiteSrchAdvTags").val("");GD.hdr.setSiteSrchAdvFieldPrompts();$("#SiteSrchAdvIndustry").data("gd-gdSelect").selectOption(0);a||$("#SiteSrchAdvCountry").data("gd-gdSelect").selectOption(0);var b=$("#SiteSrchAdvCity");if(!a){b.val("");$("#SiteSrchAdvCityId").val("");$("#SiteSrchAdvCityRow").hide()}$("#SiteSrchAdvSort").data("gd-gdSelect").selectOption(0);
GD.hdr._onSiteSrchAdvTypeChange()};GD.hdr.clearSiteSearchErrors=function(){$("#CountryNotSpecifiedError").css("display","none");$("#LocAjaxError").css("display","none");$("#SiteSrchAdvNoCityIdWait").css("display","none");$("#SiteSrchAdvLocCityNotFound").css("display","none");$("#CityDisambig").css("display","none")};GD.hdr.setSiteSrchAdvFieldPrompts=function(){$("#SiteSrchAdvCity")};GD.hdr.showTagsField=function(a){var b=$("#SiteSrchAdvTagsRow");a?b.show():b.hide()};
GD.hdr._onSiteSrchAdvCityDisambigChange=function(){var a=id("SiteSrchAdvCityDisambigSelect"),a=a.options[a.selectedIndex],b=id("SiteSrchAdvCityId");if(a.value>0){var d=id("SiteSrchAdvCity");b.value=a.value;d.value=a.text}else b.value=""};GD.hdr.siteSearchRequestMatchingCities=function(a,b){jQuery.ajax({url:"findCityAjax.htm",data:{partialWordMode:true,maxCitiesToReturn:15,countryId:a,q:b},dataType:"text",success:function(a){GD.hdr.siteSrchLocHandler(a)},error:function(){GD.hdr.siteSrchLocHandler(null)}})};
GD.hdr.siteSrchLocHandler=function(a){GD.hdr.clearSiteSearchErrors();if(a){var a=a.split("\n"),b;if(a.length==1){var d=$("#SiteSrchAdvCity"),e=$("#SiteSrchAdvCityId");b=a[0].split("");d.val(b[0]);e.val(b[1]);GD.hdr.doSiteSrchAdvSubmit()}else if(a.length===0)$("#SiteSrchAdvLocCityNotFound").css("display","block");else{d=$("#SiteSrchAdvCityDisambigSelect");if(d.length){d[0].options.length=1;for(e=0;e<a.length;e++){var c=document.createElement("option");b=a[e].split("");c.text=b[0];c.value=b[1];d[0].options[d[0].options.length]=
c}d[0].selectedIndex=0;$("#CityDisambig").css("display","block")}}}else(a=$("LocAjaxError"))&&a.length&&a.css("display","block")};GD.hdr.removeCobrand=function(){var a=$("#CobrandBanner");a.css("border-bottom-width",0);a.animate({height:0},{duration:300,easing:"easeOutQuad",complete:function(){a.hide().remove()}});jQuery.post("/removeCobrand.htm");return false};GD.hdr.PAGE_SEARCH_BAR_HEIGHT_CLOSED=50;GD.hdr.SHOW_HIDE_SEARCH_FORM_SECONDS=0.2;GD.hdr.SHOW_HIDE_SEARCH_BAR_SECONDS=0.4;
GD.hdr.SHOW_HIDE_ADV_SEARCH_FORM_SECONDS=0.4;GD.hdr.toggleSiteSrchAdv=function(){var a=$("#SiteSrchAdv"),b=false;a.length&&(b=a.is(":visible"));b?GD.hdr.animateCloseSiteSrchAdv():a.length?GD.hdr._animOpenSiteSrchAdv():GD.hdr.loadSiteSrchAdv()};
GD.hdr.loadSiteSrchAdv=function(){var a=GD.util.getAjaxUrlRespectingSecurity("/parts/siteSearchAdvanced.htm");jQuery.ajax({url:a,data:GD.hdr._srchOpts,dataType:"text",success:function(a){GD.hdr._onLoadSiteSrchAdvComplete(a,null)},error:function(a){GD.hdr._onLoadSiteSrchAdvComplete(null,a.statusText)}})};
GD.hdr._onLoadSiteSrchAdvComplete=function(a,b){if(a){var d=$("<div>").html(a);$("body").append(d);d=$("#SiteSrchAdvForm");$("#SiteSrchAdvIndustry").gdSelect();$("#SiteSrchAdvType").gdSelect({onchange:GD.hdr._onSiteSrchAdvTypeChange});$("#SiteSrchAdvCityDisambigSelect").gdSelect({onchange:GD.hdr._onSiteSrchAdvCityDisambigChange});$("#SiteSrchAdvCountry").gdSelect({onchange:GD.hdr._onSiteSrchAdvCountryChange});$("#SiteSrchAdvSort").gdSelect({onchange:GD.hdr._onSiteSrchAdvSortChange});d.find(".submit").on("click",
function(a){a.preventDefault();GD.hdr.onSiteSrchAdvSubmit()});d.find(".link.reset").on("click",function(a){a.preventDefault();GD.hdr.resetSiteSrchAdv()});d.find(".link.cancel").on("click",function(a){a.preventDefault();GD.hdr.toggleSiteSrchAdv()});d.find("input[type=text]").on("keypress",function(a){return GD.hdr.onSiteSrchAdvKeyPress(a)});GD.shim.placeholder("#SiteSrchAdvTags");GD.shim.placeholder("#SiteSrchAdvCompany");GD.shim.placeholder("#SiteSrchAdvCity");GD.shim.placeholder("#SiteSrchAdvJob");
(d=$("#SiteSrchAdvDefaultSort").html())?GD.hdr._setSiteSrchAdvSorts(GD.hdr._srchOpts.primarySearchType,d):GD.hdr._setSiteSrchAdvSorts(GD.hdr._srchOpts.primarySearchType,"MV-false");GD.ajax.createLocationAutoComplete($("#SiteSrchAdvCountry"),$("#SiteSrchAdvCity"),$("#SiteSrchAdvCityId"),null,$("#SiteSrchAdvCityRow"))}else{var d=$("<div>").attr("id","SiteSrchAdv").addClass("error"),e=$("<p>").addClass("errorMessage"),c="Advanced site search is currently unavailable.  Please check back later.";b&&(c=
c+("<br/>("+b+")"));e.html(c);d.append(e);$("body").append(d)}GD.hdr._animOpenSiteSrchAdv()};GD.hdr._animOpenSiteSrchAdv=function(){GD.userAlert&&jQuery.isFunction(GD.userAlert.closeDrawer)&&GD.userAlert.closeDrawer();$("#SiteSrchTop").after($("#SiteSrchAdv"));GD.hdr._animShowSiteSrchAdvForm()};
GD.hdr.closeSiteSrchAdv=function(){var a=$("#SiteSrchAdv");a.length&&a.css({height:0,display:"none"});a=$("#SiteSrchTop");if(a.length){a[0].className="activeSearchBar";a.css("height",""+GD.hdr.PAGE_SEARCH_BAR_HEIGHT_CLOSED+"px")}};GD.hdr.animateCloseSiteSrchAdv=function(){$("#SiteSrchAdv").is(":visible")&&GD.hdr._animHideSiteSrchAdvForm()};GD.hdr._animHideSearchForm=function(){var a=$("#SiteSrchTop");$("form",a).hide();a.hide()};
GD.hdr._animShowSiteSrchAdvForm=function(){var a=$("#SiteSrchAdv");$("#SiteSrchAdvType").val($("#SrchSelectTop").val());GD.hdr._onSiteSrchAdvTypeChange();GD.hdr._animHideSearchForm();a.css({display:"none",height:"auto"}).show("blind");GD.hdr.onAnimateShowSiteSrchAdvComplete()};GD.hdr._animHideSiteSrchAdvForm=function(){var a=$("#SiteSrchTop"),b=$("#SiteSrchAdv");if(b.is(":visible")&&!a.is(".homeSearchBar")){b.hide();GD.hdr.animateShowSiteSearch()}};
GD.hdr.onAnimateShowSiteSrchAdvComplete=function(){var a=$("#SiteSrchAdvType");GD.shim.placeholder();a&&a.length&&a.focus();GD.hdr.resetSiteSrchAdv(true)};GD.hdr.animateShowSiteSearch=function(){var a=$("#SiteSrchTop"),b;a.height(GD.hdr.PAGE_SEARCH_BAR_HEIGHT_CLOSED);b=a.find("form");a.show();b.show()};GD.userAlert=GD.userAlert||{};GD.userAlert.drawerSpeed=600;GD.userAlert.tabSpeed=800;GD.userAlert.textSpeed=400;GD.userAlert.tabHeightOpen=19;GD.userAlert.tabHeightClose=18;GD.userAlert.tabEasing="easeInOutExpo";
GD.userAlert.openDrawer=function(a){typeof a!=="boolean"&&(a=false);GD.header&&jQuery.isFunction(GD.hdr._animHideSiteSrchAdvForm)&&GD.hdr._animHideSiteSrchAdvForm();a&&jQuery.scrollTo({top:0,left:0,axis:"yx",easing:"easeInOutExpo",queue:false});$("#UserAlertDrawer").prev().attr("id")!="UserAlertBar"&&$("#UserAlertBar").after($("#UserAlertDrawer"));$("#UserAlertDrawer").show("blind",null,GD.userAlert.drawerSpeed);$("#UserAlertBar .openDrawer").hide();$("#UserAlertBar .closeDrawer").show();return false};
GD.userAlert.closeDrawer=function(){if($("#UserAlertDrawer").is(":visible")){$("#UserAlertDrawer").hide("blind",{},GD.userAlert.drawerSpeed);$("#UserAlertBar .closeDrawer").hide();$("#UserAlertBar .openDrawer").show()}return false};GD.userAlert.closePopup=function(){$("#GenericPopupFrame").fadeOut(150,GD.userAlert._closePopupBackground);return false};GD.userAlert._closePopupBackground=function(){GD.wait().then(function(){$("#ModalScreen").fadeOut(400)})};
GD.userAlert.enable=function(){$(".closeDrawer").click(GD.userAlert.closeDrawer);$(".openDrawer").click(GD.userAlert.openDrawer)};GD.userAlert.ERR_EMAIL_INVALID="Please enter a valid email address";GD.userAlert.ERR_AJAX="Your request could not be completed.  Please try again.";
GD.userAlert.sendValidationEmail=function(){GD.userAlert._setValidationEmailErrorMessage(null);var a=$("#ResendActivationEmailAddress").val();if(a&&a.trim()){jQuery.ajax({url:"/unvalidatedAccount/sendValidationEmailJson.htm",data:{email:a},dataType:"json",success:function(a){GD.userAlert._sendValidationEmailComplete(a)},error:function(){GD.userAlert._sendValidationEmailComplete(null)}});$("#ResendActivationPlaceholder").css("display","none");$("#ResendActivationSpinner").css("display","inline")}else GD.userAlert._setValidationEmailErrorMessage(GD.userAlert.ERR_EMAIL_INVALID)};
GD.userAlert._sendValidationEmailComplete=function(a){if(a!==null)if(a.errorMessage)GD.userAlert._setValidationEmailErrorMessage(a.errorMessage);else{GD.aug.closeAllToggleItems();GD.userAlert._setValidationEmailErrorMessage(null);if(!a.email)a.email="your email address";$("#ActivateNeededBlock .emailAddress").html(a.email);$("#ResendActivationEmailAddress").val("");$("#ActivateNeededBlockInitial").css("display","none");$("#ActivateNeededBlockResent").css("display","block")}else GD.userAlert._setValidationEmailErrorMessage(GD.userAlert.ERR_AJAX);
$("#ResendActivationSpinner").css("display","none");$("#ResendActivationPlaceholder").css("display","inline")};GD.userAlert._setValidationEmailErrorMessage=function(a){var b=$("#SendActivationEmailForm .fieldError"),d=$("#SendActivationEmailForm p.stopIcon");if(a){d.html(a);b.css("display","block")}else{d.html("");b.css("display","none")}};GD.site.loginPopup=GD.site.loginPopup||{};
(function(){var a=document.location.port;a.length>0&&(a=":8443");GD.site.loginPopup.AJAX_ROOT="https://"+document.location.hostname+a})();GD.site.loginPopup.AJAX_GD_LOGIN_URL="/profile/ajax/loginAjax.htm";GD.site.loginPopup.AJAX_GD_SIGNUP_URL="/profile/ajax/joinNowAjax.htm";GD.site.loginPopup.AJAX_GD_FORGOT_PWD_URL="/profile/ajax/forgotPasswordAjax.htm";GD.site.loginPopup.AJAX_GD_SETUP_PWD_URL="/profile/ajax/setupPasswordAjax.htm";GD.site.loginPopup.AJAX_GD_CLR_SESSION_URL="/profile/ajax/setupPasswordAjax_input.htm";
GD.site.loginPopup.AJAX_FB_SIGNUP_URL="/profile/ajax/createSocialNetworkAccountAjax.htm";GD.site.loginPopup.doDomRefresh=!0;GD.site.loginPopup.autoClose=!0;GD.site.loginPopup.waitOnSignup=!1;GD.site.loginPopup.ajaxCallMade=!1;GD.site.loginPopup.userOriginHook="";
GD.site.loginPopup.tabs=function(a){var b=this;b.name=a.name;b.parentClass=a.parentClass;b.statusText=a.statusText;b.$spinner=a.div.find(".loginPopupSpinner");b.$status=a.div.find(".ajaxStatus span");b.$result=a.div.find("."+b.parentClass+" .ajaxResult");b.$resultMsg=b.$result.find("span");b.showStatus=function(){b.$status.html(b.statusText)};b.clearStatus=function(){b.$status.html("")};b.init=function(){a.initFn()};b.hasValidation=a.hasValidation;b.validateOpts=a.validateOpts;b.doFormValidate=function(){if(b.hasValidation){var d=
a.div.find("."+b.validateOpts.formName).parent(),e=b.$result,c=b.$resultMsg;e.slideUp("fast");c.html("");return GD.util.validateForm(d,b.validateOpts,function(a){if(!a.success){e.stop(true,true).slideDown("fast").removeClass("neutralBox").addClass("errBox");c.html($.trim(a.error.system+" "+a.error.required+" "+a.error.email+" "+a.error.identical))}})}return true}};
GD.site.loginPopup.initMiscComponents=function(a){GD.site.loginPopup.$closeAjaxResult=a.find(".ajaxResult .closeBox");GD.site.loginPopup.$closeAjaxResult.on("click",function(){$(this).parent().slideUp()})};
GD.site.loginPopup.initContainers=function(a,b,d){var e=null,c;if(d.hasOwnProperty("spinnerTxt"))e=d.spinnerTxt;c={name:"login",parentClass:"sign-in-tab",statusText:e?e:"Signing you in...",div:a,initFn:function(){var c=a.find(".loginDlgSignInBtn"),d=a.find("input.signin-email"),e=a.find("input.signin-password"),i=a.find("input.remember");c.on("click",function(){var a={};a.username=encodeURI($.trim(d.val()));a.password=e.val();a.rememberMe=i.attr("checked");GD.site.loginPopup._doGDLogin(a,b)});$(d).add(e).keypress(function(a){a.which==
13&&c.click()})},hasValidation:true,validateOpts:{formName:"signInForm",required:["signin-email","signin-password"],requiredErr:"Email and Password are mandatory."}};GD.site.loginPopup.SIGNIN_TAB=new GD.site.loginPopup.tabs(c);c={name:"signup",parentClass:"create-account-tab",statusText:e?e:"Registering...",div:a,initFn:function(){var c=a.find(".loginDlgSignUpBtn"),e=a.find("input.signup-email"),h=a.find("input.signup-password"),i=a.find("input.signup-vpassword");c.on("click",function(){var a;a={email:encodeURI($.trim(e.val())),
password:h.val(),passwordConfirm:i.val(),postLoginUrl:GD.dom.getDocUrl()};d.setupPasswd?GD.site.loginPopup._doGDSetupPasswd(a,b):GD.site.loginPopup._doGDSignup(a,b)});$(e).add(h).add(i).keypress(function(a){a.which===13&&c.click()})},hasValidation:true,validateOpts:{formName:"signUpForm",required:["signup-email","signup-password","signup-vpassword"],identical:["signup-password","signup-vpassword"],requiredErr:"Email and Password are mandatory.",identicalErr:"Passwords should match."}};GD.site.loginPopup.SIGNUP_TAB=
new GD.site.loginPopup.tabs(c);c={name:"fb",parentClass:"fb-sign-in-tab",statusText:e?e:"Signing you in...",div:a,initFn:function(){var c=a.find(".fbSigninBtnLink,.facebookLoginBtn,.facebookJoinNowBtn,.fbLoginBtnOK");c.off("click");c.data("userOriginHook",GD.site.loginPopup.userOriginHook);c.on("click",function(a){var c=$(a.target).closest("span.fbSigninBtnLink"),d=a="";c.attr("data-onloginurl")&&(a=c.attr("data-onloginurl"));c.attr("data-postloginurl")&&(d=c.attr("data-postloginurl"));if(GD.site.loginPopup.userOriginHook){c=
"userOriginHook="+GD.site.loginPopup.userOriginHook;if(a){a=a.indexOf("?")<0?a+"?":a+"&";a=a+c}if(d){d=d.indexOf("?")<0?d+"?":d+"&";d=d+c}}GD.site.loginPopup._doFBLogin(a,d,b)})},hasValidation:false,validateOpts:{formName:"signInForm",required:["signin-email"],requiredErr:"Email is mandatory.",emailCheck:["signin-email"]}};GD.site.loginPopup.FB_SIGNIN_TAB=new GD.site.loginPopup.tabs(c);c={name:"reset",parentClass:"sign-in-tab",statusText:e?e:"Please wait...",div:a,initFn:function(){var b=a.find(".loginDlgResetBtn"),
c=a.find("input.signin-email"),d=a.find(".back-to-signin");a.find(".forgot-password").on("click",function(){a.find(".block-signin").hide("slide",{direction:"left"},200,function(){a.find(".block-forgot").show("slide",{direction:"right"},300)})});d.on("click",function(){a.find(".block-forgot").hide("slide",{direction:"right"},200,function(){a.find(".block-signin").show("slide",{direction:"left"},300)})});b.on("click",function(){var a={};a.emailAddress=encodeURI($.trim(c.val()));a.doDomRefresh=false;
GD.site.loginPopup._doResetPass(a,null)})},hasValidation:true,validateOpts:{formName:"signInForm",required:["signin-email"],requiredErr:"Email is mandatory.",emailCheck:["signin-email"]}};GD.site.loginPopup.FORGOT_PASS_TAB=new GD.site.loginPopup.tabs(c)};
GD.site.loginPopup.createDialog=function(a){var b=$(".loginDlgSource").clone(),d=b.find(".heading"),e=b.find(".subHeading"),c=b.find("#FacebookPrivacyNote span");if(typeof a.doDomRefresh!=="boolean")a.doDomRefresh=false;if(typeof a.autoClose!=="boolean")a.autoClose=false;if(typeof a.waitOnSignup!=="boolean")a.waitOnSignup=false;GD.site.loginPopup.doDomRefresh=a.doDomRefresh;GD.site.loginPopup.autoClose=a.autoClose;GD.site.loginPopup.waitOnSignup=a.waitOnSignup;a.headingTxt?d.html(a.headingTxt):d.hide();
a.subHeadingTxt?e.html(a.subHeadingTxt):e.hide();a.fbBtnFooter&&c.html(a.fbBtnFooter);if(typeof a.userOriginHook!="undefined")GD.site.loginPopup.userOriginHook=a.userOriginHook;b.find(".create-account-tab").attr("id","gd-popup-create-account");b.find(".sign-in-tab").attr("id","gd-popup-sign-in");b.removeClass("hidden");GD.site.loginPopup.initContainers(b,a.onSuccess);GD.site.loginPopup.initMiscComponents(b);GD.site.loginPopup.showDialog(b,a.gaPageViewLabel,a.onClose)};
GD.site.loginPopup.createDlg=function(a){var b=$(".loginDlgSource").clone(true),d=b.find(".create-account-tab").find("h2"),e=b.find(".sign-in-tab").find("h2"),c=b.find("#FacebookPrivacyNote span"),f=b.find(".dialogFooter span.minor"),g={CAHeading:"Create an account to see all reviews &ndash; it's easy, free and private!",SIHeading:"Sign In to see all reviews",fbNote:"Everything you view and contribute on Glassdoor is private and will not appear on Facebook",footerText:"By creating your account, you are accepting our <a href='/about/terms.htm' class='link' target='_blank'>Terms of Use</a>.",
onSuccess:$.noop(),onLoad:function(){var a=b.closest(".gdDialog");GD.util.centerVertically(a)},onClose:null,autoClose:true,domRefresh:true,waitOnSignup:false,showFooter:true,initialTab:"CA",showFb:true,spinnerTxt:null,showUITab:true,gaViewLabel:"/splash/login/",width:GD.site.modalWidth,userOriginHook:"NOT_IDENTIFIED",setupPasswd:false},a=$.extend({},g,a);GD.site.loginPopup.doDomRefresh=a.domRefresh;GD.site.loginPopup.autoClose=a.autoClose;GD.site.loginPopup.waitOnSignup=a.waitOnSignup;a.hasOwnProperty("CAHeading")?
d.html(a.CAHeading):d.hide();a.hasOwnProperty("SIHeading")?e.html(a.SIHeading):e.hide();a.hasOwnProperty("footerText")?f.html(a.footerText):f.hide();a.hasOwnProperty("fbNote")&&c.html(a.fbNote);if(a.hasOwnProperty("userOriginHook"))GD.site.loginPopup.userOriginHook=a.userOriginHook;a.showFooter||b.find(".dialogFooter").hide();b.find(".create-account-tab").attr("id","gd-popup-create-account");b.find(".sign-in-tab").attr("id","gd-popup-sign-in");b.removeClass("hidden offScreen");GD.site.loginPopup.initContainers(b,
a.onSuccess,a);GD.site.loginPopup.initMiscComponents(b);GD.site.loginPopup.showDialog(b,a.gaViewLabel,a.onClose,a.singleTab,a)};
GD.site.loginPopup.showDialog=function(a,b,d,e,c){var f=0;c&&c.initialTab&&c.initialTab=="SI"&&(f=1);GD.dlgManager.addCustomDialog({dialogBody:a,dialogWidth:c&&c.width||GD.site.modalWidth,occlude:true,draggable:false,closeable:true,onClose:function(){jQuery.isFunction(d)&&GD.site.loginPopup.ajaxCallMade&&d();GD.site.loginPopup.closeDialog(a)},wrapperClass:"loginDlg",extraData:null,modal:true,onLoadComplete:function(){a.find(".signInTabs").gdTabs({heightStyle:"content",active:f,create:function(a,b){var c=
b.panel,d;d=c.find("input[placeholder]");GD.shim.removePlaceholders(c);GD.shim.placeholder(d)},activate:function(a,b){var c=b.newPanel,d;d=c.find("input[placeholder]");GD.shim.removePlaceholders(c);GD.shim.placeholder(d)}});a.find("label.linkify").on("click",function(){$cb=$(this).siblings("input:checkbox");$cb.attr("checked",!$cb.attr("checked"))});GD.site.loginPopup.SIGNIN_TAB.init();GD.site.loginPopup.SIGNUP_TAB.init();GD.site.loginPopup.FB_SIGNIN_TAB.init();GD.site.loginPopup.FORGOT_PASS_TAB.init();
if(typeof e!=="undefined"&&(e==="signin"||e==="signup")){a.find(".login-"+e).click();a.find("div.ui-tabs-panel").css("border-width","1px");a.find(e=="signin"?"li a.login-signup":"li a.login-signin").parent("li").hide()}b&&GD.analytics.trackPageView(b);if(typeof c!=="undefined"&&c.hasOwnProperty("onLoad")&&jQuery.isFunction(c.onLoad))c.onLoad();typeof c!=="undefined"&&c.hasOwnProperty("fbNoteOffset")&&a.find("#FacebookPrivacyNote").css("margin-left","13px");if(c&&c.hasOwnProperty("showUITab")&&!c.showUITab){a.find(".signInTabs ul.ui-tabs-nav").hide();
a.find("h2").addClass("margBot20 hangLt20 hangRt20 padHorz20 heading linedHeading");a.find(".gdSignInOption").addClass("tightTopPad")}c&&c.hasOwnProperty("showFb")&&(c.showFb||a.find(".signInTabs .fbSignInOption, .hr").hide());c&&c.setupPasswd&&$.ajax({url:GD.site.loginPopup.AJAX_ROOT+GD.site.loginPopup.AJAX_GD_CLR_SESSION_URL});GD.shim.placeholder()}})};GD.site.loginPopup.closeDialog=function(){setTimeout(function(){GD.dlgManager.closeAllDialogs()},600)};
GD.site.loginPopup._doFBLogin=function(a,b,d){function e(a){if(a)c.url=GD.site.loginPopup.AJAX_ROOT+a;GD.site.loginPopup._doAjaxLoginSignup(c,null,null,function(){jQuery.isFunction(d)&&d(false)},GD.site.loginPopup.FB_SIGNIN_TAB)}var c={url:GD.site.loginPopup.AJAX_ROOT+GD.site.loginPopup.AJAX_FB_SIGNUP_URL};try{FB.login(function(c){GD.fb._onFacebookLogin(c,a,b,false,e)},{scope:"email,user_location,friends_location,user_birthday,friends_birthday,user_education_history,friends_education_history,user_work_history,friends_work_history,publish_actions"})}catch(f){Logger.error("GD.site.loginPopup._doFBLogin: 'FB.getLoginStatus' threw message: "+
f)}};GD.site.loginPopup._doGDLogin=function(a,b){GD.site.loginPopup._doAjaxLoginSignup({url:GD.site.loginPopup.AJAX_ROOT+GD.site.loginPopup.AJAX_GD_LOGIN_URL,data:a},null,null,function(){jQuery.isFunction(b)&&b(false)},GD.site.loginPopup.SIGNIN_TAB)};GD.site.loginPopup._doGDSignup=function(a,b){GD.site.loginPopup._doAjaxLoginSignup({url:GD.site.loginPopup.AJAX_ROOT+GD.site.loginPopup.AJAX_GD_SIGNUP_URL,data:a},null,null,function(){jQuery.isFunction(b)&&b(true)},GD.site.loginPopup.SIGNUP_TAB)};
GD.site.loginPopup._doGDSetupPasswd=function(a,b){GD.site.loginPopup._doAjaxLoginSignup({url:GD.site.loginPopup.AJAX_ROOT+GD.site.loginPopup.AJAX_GD_SETUP_PWD_URL,data:a},null,null,function(){jQuery.isFunction(b)&&b(true)},GD.site.loginPopup.SIGNUP_TAB,true)};GD.site.loginPopup._doResetPass=function(a){GD.site.loginPopup._doAjaxLoginSignup({url:GD.site.loginPopup.AJAX_ROOT+GD.site.loginPopup.AJAX_GD_FORGOT_PWD_URL,data:a},null,null,null,GD.site.loginPopup.FORGOT_PASS_TAB)};
GD.site.loginPopup._doAjaxLoginSignup=function(a,b,d,e,c,f){var g=GD.site.loginPopup.doDomRefresh;if(a.hasOwnProperty("data")&&a.data.hasOwnProperty("doDomRefresh"))g=a.data.doDomRefresh;a=$.extend({},{dataType:"jsonp",traditional:true,type:"GET",beforeSend:function(){c.$spinner.show();c.$result.slideUp();c.$result.removeClass("neutralBox").addClass("errBox");c.showStatus();jQuery.isFunction(b)&&b()},complete:function(){c.$spinner.hide();c.clearStatus();jQuery.isFunction(d)&&d();GD.site.loginPopup.ajaxCallMade=
true},success:function(b){GD.site.loginPopup._onAjaxLoginSignupSuccess(c,b,e,g,a,f)},error:function(a){GD.site.loginPopup._onAjaxLoginSignupErr(c,a)}},a);if(typeof GD.site.loginPopup.userOriginHook!=="undefined"&&GD.site.loginPopup.userOriginHook!=="")a.hasOwnProperty("data")?a.data.userOriginHook=GD.site.loginPopup.userOriginHook:a.url=a.url+("&userOriginHook="+GD.site.loginPopup.userOriginHook);a.hasOwnProperty("data")?a.data.userOrigin="EMAIL":a.url=a.url+"&userOrigin=EMAIL";c.hasValidation?c.doFormValidate()&&
jQuery.ajax(a):jQuery.ajax(a)};
GD.site.loginPopup._onAjaxLoginSignupSuccess=function(a,b,d,e,c,f){e=typeof e!="undefined"?e:GD.site.loginPopup.doDomRefresh;a.$spinner.hide();c=true;f=="undefined"&&(f=false);if(b){if(b.result===null||typeof b.result==="undefined")c=false;if(c)switch(b.result){case "input":a.$result.removeClass("neutralBox").addClass("errBox");a.$result.slideDown();a.$resultMsg.html(b.message[0]);break;case "sendValidationEmail":if(GD.site.loginPopup.waitOnSignup){a.$result.removeClass("neutralBox").addClass("errBox").addClass("errBox");a.$result.slideDown();
a.$resultMsg.html("<b>One more step!</b> Please check your email to activate your account.");GD.site.loginPopup.userOriginHook=="JOBS_EASY_APPLY"&&GD.analytics.trackPageView("/splash/easy-apply/confirm-sign-up")}break;case "success":case "redirect":case "redirectAfterIncludeThem":case "member-home":case "matchGlassdoorAccount":case "linkAccountsPermissions":case "savedRequestDispatcher":if(a.name=="reset"){a.$result.removeClass("errBox").addClass("neutralBox");a.$result.slideDown();a.$resultMsg.html("Please check your email for the Reset Password link.")}else{if(a.name==
"signup"&&!f&&GD.site.loginPopup.userOriginHook!="EMPLOYER_SINGLE_JOB_POSTING"){a.$result.removeClass("neutralBox").addClass("errBox");a.$result.slideDown();a.$resultMsg.html("<b>One more step!</b> Please check your email to activate your account.");if(GD.site.loginPopup.waitOnSignup){$(".loginDlg .dialogContent").html('<div class="neutralBox margBot20"><b>One more step!</b> Please check your email to activate your account.</div>');$(".loginDlg .subHeading").hide();GD.site.loginPopup.userOriginHook==
"JOBS_EASY_APPLY"&&GD.analytics.trackPageView("/splash/easy-apply/confirm-sign-up")}}GD.site.loginPopup.autoClose&&GD.site.loginPopup.closeDialog()}jQuery.isFunction(d)&&d();e&&GD.dom.reloadPage(500,true)}else{a.$result.removeClass("neutralBox").addClass("errBox");a.$result.slideDown();b=b.message.length>0?b.message[0]:"Error. Please try again!";b=="authenticate.bad_password"&&(b="Invalid password. Please try again.");a.$resultMsg.html(b)}}else Logger.error("No response object returned")};
GD.site.loginPopup._onAjaxLoginSignupErr=function(a,b){Logger.inspect(b,"GD.site._doAjaxLoginSignup() error");a.$spinner.hide();a.$result.removeClass("neutralBox").addClass("errBox");a.$result.slideDown();a.$resultMsg.html("Error. Please try again!")};GD.site.initBoxShadowPagination=function(){var a=$(".pagingControls ul"),b=0;$("li",a).each(function(a,e){b=b+$(e).width()});a.width(b).addClass("shadowed")};
GD.site.stickyBar.init=function(a){var b,d={closeable:true,triggerOffset:10,minTriggerPx:$("#SiteSrchTop").offset().top+$("#SiteSrchTop").height()+this.triggerOffset,sayHiPixel:this.minTriggerPx,sayByePixel:null,sayHiElem:null,sayByeElem:null,onInit:null,onFail:null,deferredAdd:false,deferredContent:null,useGA:false,gaEvents:{barAppearSignedIn:"bar-si-appears",barAppearSignedOut:"bar-so-appears",barDismissSignedIn:"bar-si-dismiss",barDismissSignedOut:"bar-so-dismiss"},gaCategory:null,gaLabel:""},
a=$.extend({},d,a),e;a.deferredAdd||(b=$("#StickyBar"));if(typeof a.sayHiElem!=="undefined"&&a.sayHiElem!==null){d=true;a.sayHiElem=$(a.sayHiElem);e=a.sayHiElem.offset().top+a.sayHiElem.height()}else if(typeof a.sayHiPixel!=="undefined"&&a.sayHiPixel!==null&&a.sayHiPixel>0){d=false;e=a.sayHiPixel}else{d=false;e=a.minTriggerPx}var c=false,f=$("body").is(".loggedIn");if(typeof d!=="undefined"&&typeof b!=="undefined"){GD.socialSharing.UPPER_MARGIN=60;var g=$(".stickyBarBody",b),d=$(".closeBox",b);$(window).scroll(function(){if($(window).scrollTop()>
e+a.triggerOffset){b.slideDown("fast",function(){g.slideDown("fast")});!c&&(a.useGA&&typeof a.gaCategory!=="undefined"&&a.gaCategory!==null)&&(f?GD.analytics.trackEvent(a.gaCategory,a.gaEvents.barAppearSignedIn,a.gaLabel):GD.analytics.trackEvent(a.gaCategory,a.gaEvents.barAppearSignedOut,a.gaLabel));c=true}else g.slideUp("fast",function(){b.slideUp("fast")})});if(a.closeable)d.on("click",function(){b.remove();a.useGA&&(typeof a.gaCategory!=="undefined"&&a.gaCategory!==null)&&(f?GD.analytics.trackEvent(a.gaCategory,
a.gaEvents.barDismissSignedIn,a.gaLabel):GD.analytics.trackEvent(a.gaCategory,a.gaEvents.barDismissSignedOut,a.gaLabel))});if(jQuery.isFunction(a.onInit))a.onInit();b.on("hide",function(){GD.site.stickyBar._hide(b)});b.on("hideAndDestroy",function(){GD.site.stickyBar._hideAndDestroy(b)})}else{Logger.error("Either StickyBar is not ");if(jQuery.isFunction(a.onFail))a.onFail()}};GD.site.stickyBar._hide=function(a){$(".stickyBarBody",a).slideUp("slow",function(){a.slideUp("slow")})};
GD.site.stickyBar._hideAndDestroy=function(a){$(".stickyBarBody",a).slideUp("slow",function(){a.slideUp("slow",function(){a.remove()})})};window.GD=window.GD||{};GD.site=GD.site||{};GD.site.relocateFooterText=function(){var a=$("#AboutPage"),b=$("#AboutPageWrapper");a.length&&b.length&&(b.append(a),a.show())};window.GD=window.GD||{};GD.site=GD.site||{};GD.site.DROPDOWN_SPEED=150;
GD.site.initDropdown=function(e,c){function b(){if(0!==e.length){var f=e.offset(),j=$(window).width(),b=d.outerWidth(),l=f.top+(k?g:h);i||(i=$("#PageTop > nav").outerWidth());m&&j<Math.floor(f.left)+b+a?(f="auto",b+=a):(f=f.left-a,b="auto");c.css({top:l,left:f,right:b})}}var h=20,g=40,a=5,m=!0,k=$("body").is(".flex"),i=0,d=c.find("ul.selectboxit-options");e.on("tap click",function(a){$("body > div.hdrDropdown > ul").not(d).fadeOut(GD.site.DROPDOWN_SPEED);d.is(":visible")?d.fadeOut(GD.site.DROPDOWN_SPEED):
d.fadeIn(GD.site.DROPDOWN_SPEED);b();a.stopPropagation()});$(window).resize(function(){b()});$(document).click(function(){d.fadeOut(GD.site.DROPDOWN_SPEED)});c.find(".selectboxit-option a").on("click",function(a){a.preventDefault();d.fadeOut(GD.site.DROPDOWN_SPEED);var b=$(this),a=b.attr("href"),b=b.data("gaLbl");GD.analytics.trackEvent("navigation-clicks","nav-"+b,document.domain)&&GD.dom.loadUrl(a)})};
GD.site.initMainMenuDropdown=function(){var e=$("#PageTop > nav"),c=e.find(".actions > span.mainMenu.menuLink"),b;c.one("tap click",function(h){var g=e.find("> ul").clone(),a;g.addClass("selectboxit-options selectboxit-list hidden");g.find("li").removeClass("tab gradient").addClass("selectboxit-option");a=g.find("a");a.removeClass("gradient").addClass("selectboxit-option-anchor");a.each(function(){var a=$(this).find("span:first"),b=a.text();a.replaceWith(b)});a.find(".hideHH").remove();a=$("<div class='mainMenu hdrDropdown selectboxit-container'></div>");
a.append(g);$("body header:first").after(a);b=a;GD.site.initDropdown(c,b);c.trigger("click");h.stopPropagation()})};window.GD=window.GD||{};GD.site=GD.site||{};
GD.site.init=function(){var d=$("body").is(".flex");$(function(){try{GD.lazyLoad($("body"))}catch(a){Logger.trace("Exception in GD.site.init installing image lazy loading: "+a)}try{$(".sculptedLink").click(function(){var a=$(this).data("href");"#"!==a&&GD.dom.loadUrl(a)})}catch(b){Logger.trace("Exception in GD.site.init installing 'sculptedLink' handler: "+b)}$("[autofocus]:first").autofocus();GD.ads.hideUnusedAdSlots()});var b=$("#UserAlertBar.freeEmployerSignup"),c=new GDStorage;if(b.length&&b.find("div.freeEmployerSignupContents").length&&
c.isAlertExpired("freeEmployerSignup",3*c.MONTH_MILLIS)){var a=b.clone();a.css({minHeight:"auto",height:"50px"});b.remove();a.find("i.close").on("click",function(){a.slideUp();$.ajax({url:"/partners/account/banner_toggle.htm"})});$("#PageTop").before(a);GD.wait(1).then(function(){a.slideDown(200)})}try{GD.shim.placeholder()}catch(e){Logger.trace("Exception in GD.site.init installing placeholder shim: "+e)}try{$.browser.msie&&10>$.browser.version&&$(".text-shadowed").textshadow()}catch(f){Logger.trace("Exception in GD.site.init installing textshadows for IE: "+
f)}try{$("#PageTop > nav > ul > li.tab > a").click(GD.site.onHeaderTabClick)}catch(g){Logger.trace("Exception in GD.site.init installing GD.site.onHeaderTabClick: "+g)}d&&GD.site.initMainMenuDropdown();try{GD.site.initIpadBanner()}catch(h){Logger.trace("Exception in GD.site.init installing GD.site.initIpadBanner: "+h)}};window.GD=window.GD||{};GD.site=GD.site||{};
GD.site.initIpadBanner=function(){$(function(){function c(){GD.analytics.trackPageView("/appPromo/iPad");var a=$(".gdDialog"),b=a.find(".bailout"),c=a.find(".downloadAppBtn");a.addClass("rotatable");a.find(".dialogFrame > div").css("backgroundColor","#61a827");c.on("click",function(a){a.preventDefault();GD.analytics.trackEvent("appPromo-tablet","download-click","")&&(GD.dom.loadUrl($(this).data("href"),"_blank"),GD.dlgManager.closeAllDialogs())});b.on("click",function(){GD.dlgManager.closeAllDialogs();
GD.analytics.trackEvent("appPromo-tablet","bailout-click","")})}var a=new GDStorage,d=a.getAlertMaxViews("banner-ipad"),b=a.getAlertViews("banner-ipad"),e=$("body").is(".safari"),f=$("body").is(".tablet"),g=a.isAlertExpired("banner-ipad",a.DAY_MILLIS,!0,!0);if(e&&f&&(g||0>b||b<d))a.isAlertExpired("banner-ipad",a.DAY_MILLIS),a.setAlertMaxViews("banner-ipad",2),a.trackAlertViews("banner-ipad"),GD.dlgManager.addAjaxDialog("/banners/tablet.htm",{fullScreen:!0,onLoadComplete:c})})};window.GD=window.GD||{};GD.fixedOnScroll=GD.fixedOnScroll||{};GD.fixedOnScroll.FLOATING_CLASS="floating";GD.fixedOnScroll.FIXED_CLASS="fixed";GD.fixedOnScroll.BOUNCE_DIST=5;GD.fixedOnScroll.BOUNCE_TIME=80;
var fixedOnScroll=GD.Class({constructor:function(b,a){var c=this;this.el=b;"undefined"!==typeof $(this.el).offset()&&(this.upperMargin=a.hasOwnProperty("upperMargin")?a.upperMargin:20,this.hideWhenNarrow=a.hasOwnProperty("hideWhenNarrow")?a.hideWhenNarrow:!1,this.hideAtWidth=a.hasOwnProperty("hideAtWidth")?a.hideAtWidth:1220,this.leftOffset=a.hasOwnProperty("leftOffset")?a.leftOffset:0,this.hideWhenNarrow&&this.isNarrow()?$(this.el).remove():$(this.el).length&&($(window).resize(function(a){c._resize(a,
$(c.el))}),$(window).scroll(function(a){c._scroll(a,$(c.el))}),0<$(this.el).offset().top&&(this.idealViewportTopOffset=$(this.el).offset().top,$(window).resize(),$(window).scroll())))},_resize:function(){var b=$(window).width();if($(this.el).hasClass(GD.fixedOnScroll.FIXED_CLASS)){var a=$(this.el).parent().offset().left-this.leftOffset;$(this.el).css({left:a})}this.hideWhenNarrow&&(b>=this.hideAtWidth?($(this.el).hasClass("offScreen")&&$(this.el).addClass("hidden").removeClass("offScreen"),$(this.el).is(":hidden")&&
($(this.el).css({display:"none",opacity:1}),$(this.el).fadeIn(200))):$(this.el).is(":visible")&&$(this.el).fadeOut(200))},_scroll:function(){var b=$(window).scrollTop(),a=$(this.el).offset().top-b,c=$(this.el).offset().left;$(this.el).hasClass(GD.fixedOnScroll.FIXED_CLASS)?b<=this.idealViewportTopOffset-this.upperMargin&&this._float():a<this.upperMargin&&(this.idealViewportTopOffset=$(this.el).offset().top,this._fix(a,c))},_fix:function(b,a){$(this.el).removeClass(GD.fixedOnScroll.FLOATING_CLASS);
$(this.el).addClass(GD.fixedOnScroll.FIXED_CLASS);$(this.el).css({top:b,left:a});b<this.upperMargin&&this._bounceDownBtns(b)},_float:function(){$(this.el).removeClass(GD.fixedOnScroll.FIXED_CLASS);$(this.el).addClass(GD.fixedOnScroll.FLOATING_CLASS);$(this.el).css({position:"relative",top:"auto",left:"auto"})},_bounceDownBtns:function(b){var a=this;$(this.el).animate({top:b-GD.fixedOnScroll.BOUNCE_DIST},GD.fixedOnScroll.BOUNCE_TIME,"easeOutQuint",function(){a._bounceDownBtns2()})},_bounceDownBtns2:function(){$(this.el).animate({top:this.upperMargin},
GD.fixedOnScroll.BOUNCE_TIME,"easeInQuint")},isNarrow:function(){var b=!1;jQuery.browser.msie&&8>jQuery.browser.version?b=!0:$(window).width()<this.hideAtWidth&&(b=!0);return b}});GD.struts=GD.struts||{};GD.struts.FORM_ERRORS_ID="FormErrHdr";GD.struts.FORM_ERRORS_CLASS="formErrs";GD.struts.FORM_SUCCESS_CLASS="formSuccess";GD.struts.CLASS_ERROR="error";
GD.struts.showSuccess=function(b,e,f){try{var c=$(b),d=$(e);0===c.length&&d.length&&(c=d.closest("form"));0===c.length&&(c=$("#PageBodyContents form:first"));var a=c.find("div."+GD.struts.FORM_SUCCESS_CLASS),g=c.find("div."+GD.struts.FORM_ERRORS_CLASS);a.length?a.show():(a=$("<div></div>"),a.addClass(GD.struts.FORM_SUCCESS_CLASS).append("<div class='text tightVert'><p class='tightVert'></p></div>"),g.length?g.after(a):c.prepend(a));a.find("div.text p").html(f);GD.shim.recalcPlaceholders()}catch(h){Logger.error(h)}};
GD.struts.clearErrorMessages=function(b){b=$(b);0===b.length&&(b=$("body"));var e=b.find("div."+GD.struts.FORM_ERRORS_CLASS),f=b.find("div."+GD.struts.FORM_SUCCESS_CLASS);b.find(".fieldError,.error").removeClass("fieldError error");e.hide().find("ul").empty();f.hide().find("div.text p").empty();GD.shim.recalcPlaceholders()};
GD.struts.addError=function(b,e,f){try{var c=$(b),d=$(e);0===c.length&&d.length&&(c=d.closest("form"));0===c.length&&(c=$("#PageBodyContents form:first"));var a,g=c.data("formErrSelector");a=g?$(g):c.find("div."+GD.struts.FORM_ERRORS_CLASS);a.length?a.show():(a=$("<div></div>"),a.attr("id",GD.struts.FORM_ERRORS_ID).addClass(GD.struts.FORM_ERRORS_CLASS).append("<div class='icon'><i></i></div>").append("<div class='text'><h4>Please fix the following errors:</h4><ul></ul></div>"),c.prepend(a));a.find("ul:first").append("<li>"+
f+"</li>");if(d&&d.length){if(d.attr("id")){for(var h=d.attr("id"),l=d.attr("name"),k=$("label"),b=null,e=0;e<k.length;e++){var i=$(k[e]);if(i.attr("for")==h||i.data("forName")==l){b=i;break}}b&&b.addClass(GD.struts.CLASS_ERROR)}d.addClass(GD.struts.CLASS_ERROR);if(d.is("select")){var j=d.data("gdGdSelect");j&&j.dropdownContainer&&j.dropdownContainer.addClass(GD.struts.CLASS_ERROR)}}GD.shim.recalcPlaceholders()}catch(m){alert(m)}};
GD.struts.profanityValidation=function(b,e){for(var f=!1,c="asshole assholes asskisser bastard bitch blowjob boner bullshit buttface buttfuck buttfucker butthole clit cock cocksucker cunnilingus cunt cuntsucker damn dickface dickhead dicksucker dildo dildos dilldoe dilldos dipshit dumbass fagget faggit faggot fagot fagit fatass fuck fucker fuckface fuckhead fucking fuckup goddamn jackoff jizz motherfucker mutherfucker nigger nigga niggah penis piss pussy shit shitass shitface shithead shiting shitting slut slutty tit tits titty twat vagina whore".split(" "),d=
b.val().split(e),a=0;a<d.length;a++)for(var g=0;g<c.length;g++)d[a]===c[g]&&(f=!0);f&&GD.struts.addError(null,b[0],"Not so fast... please remove the bad language before submitting.");return f};window.GD=window.GD||{};GD.flipper=GD.flipper||{};GD.flipper.speed=800;GD.flipper.flipToIntl=function(a){var b=$("#"+a+"UsaBtn"),c=$("#"+a+"IntlBody"),d=$("#"+a+"IntlBtn");GD.flipper.checkNoDataPane(a,c);d.addClass("selected");b.removeClass("selected");$("#"+a+"UsaMap").css("display","none");$("#"+a+"IntlMap").css("display","block");$("#"+a+"UsaBody").css("display","none");c.css("display","block");GD.flipper.adjustButtons(a)};
GD.flipper.flipToUSA=function(a){var b=$("#"+a+"UsaBody"),c=$("#"+a+"UsaBtn"),d=$("#"+a+"IntlBtn");GD.flipper.checkNoDataPane(a,b);d.removeClass("selected");c.addClass("selected");$("#"+a+"UsaMap").css("display","block");$("#"+a+"IntlMap").css("display","none");b.css("display","block");$("#"+a+"IntlBody").css("display","none");GD.flipper.adjustButtons(a)};
GD.flipper.checkNoDataPane=function(a,b){var c=!1,d=$(b).find(".noData");d.length&&d.get(0).parentNode==b&&(c=!0);var d=$("#"+a+"LtFade"),e=$("#"+a+"RtFade"),f=$("#"+a+"RtHide"),g=$("#"+a+"SlideButtons");c?(d.addClass("hidden"),e.addClass("hidden"),f.addClass("hidden"),g.addClass("hidden")):(d.removeClass("hidden"),e.removeClass("hidden"),f.removeClass("hidden"),g.removeClass("hidden"))};
GD.flipper.scrollLeft=function(a){var b=GD.flipper.getSliderPane(a),c=b.offsetWidth,d=id(a+"Content").offsetWidth-2,e=0;if(b.style.left){var f=2*d-c,e=Number(String(b.style.left).replace(/px/,"")),e=e-d;e<f&&(e=f)}else e=-d;$(b).animate({left:e},GD.flipper.speed,"easeInOutExpo");GD.flipper.adjustButtons(a,b,c,d,-e)};
GD.flipper.scrollRight=function(a){var b=GD.flipper.getSliderPane(a),c=b.offsetWidth,d=id(a+"Content").offsetWidth-2,e;b.style.left?(e=Number(String(b.style.left).replace(/px/,"")),e+=d,0<e&&(e=0)):e=0;$(b).animate({left:e},GD.flipper.speed,"easeInOutExpo");GD.flipper.adjustButtons(a,b,c,d,-e)};GD.flipper.getSliderPane=function(a){var a=$("#"+a+"UsaBtn").hasClass("selected")?$("#"+a+"UsaBody"):$("#"+a+"IntlBody"),b=a.find(".slider");b.length&&(a=b.get(0));return a};
GD.flipper.adjustButtons=function(a,b,c,d,e){b||(b=GD.flipper.getSliderPane(a),c=b.offsetWidth,d=id(a+"Content").offsetWidth-2,e=b.style.left?-Number(String(b.style.left).replace(/px/,"")):0);c-=2*d;0>e&&(e=0);e>c&&(e=c);b=0>=e;e=e>=c;c=$("#"+a+"PrevBtn").parent();a=$("#"+a+"NextBtn").parent();b?c.addClass("disabled"):c.removeClass("disabled");e?a.addClass("disabled"):a.removeClass("disabled")};
GD.flipper.showPane=function(a,b,c){var d=$("#"+a+"Body"+b);if(d.hasClass("hidden")){var e=1==b?2:1,f=$("#"+a+"Body"+e),b=$("#"+a+"Label"+b),e=$("#"+a+"Label"+e);f.addClass("hidden");d.removeClass("hidden");b.addClass("disabled");e.removeClass("disabled");c&&(a=$("#"+a+"Title"),a.length&&a.html(c))}return!1};GD.shareContent=GD.shareContent||{};GD.shareContent.initEmbedLinks=function(){var a=$("span.embedPopupLink").not(".embedPopupLinkOK");a.click(GD.shareContent._onEmbedClick);a.addClass("embedPopupLinkOK")};
GD.shareContent._onEmbedClick=function(){var a=$(this);GD.analytics.trackPartnerShare("embed");GD.shareContent.sharedContentPopup(a,a.data("builderUrl"),a.data("pageUrl"),a.data("section"),a.data("linkType"));return!1};
GD.shareContent.sharedContentPopup=function(a,b,c,d,e){if(b){var e=window.screen.availWidth-10,f=window.screen.availHeight-50,a=0.8*f,f=0.6*((f-a)/2),e=(e-740)/2;"string"===typeof d&&0<d.length&&(b=-1!=b.indexOf("?")?b+"&":b+"?",b=b+"section="+d);c&&(b=-1!=b.indexOf("?")?b+"&":b+"?",b=b+"permalink="+encodeURIComponent(c));win=window.open(b,"sharePopup","top="+f+",left="+e+"height="+a+",width=740,location=0,toolbar=0,menubar=0,scrollbars=1",!1);"function"===typeof win.focus&&win.focus()}else GD.shareContent._showPermalinkPopup(c,
e);return!1};
GD.shareContent._showPermalinkPopup=function(a,b){GD.analytics.trackPartnerShare("permalink");var c,d;if("string"!==typeof b||!b.length)b="Page";c="Link To This "+b;d=$("<input type='text'>").val(a).click(GD.shareContent._onClickPermalinkPopup);d=$("<p>").append(d);c={dialogBody:$("<div id='PermalinkPopup'>").append("<h3><strong>"+c+"</strong></h3>").append("<p>Copy and paste this link into a web page or blog post.  Anyone clicking the link will see this page as if they were a Glassdoor member.</p>").append(d),dialogWidth:430,
occlude:!0,draggable:!0,closeable:!0,onClose:null,wrapperClass:"dataPopup",onLoadComplete:GD.shareContent._onClickPermalinkPopup,extraData:null,modal:!0};GD.dlgManager.addCustomDialog(c)};GD.shareContent._onClickPermalinkPopup=function(){var a=$("#PermalinkPopup input");a.select();a.focus()};GD.flagContent=GD.flagContent||{};GD.flagContent.$savedPopupContents=void 0;GD.flagContent.savedInputText="";
GD.flagContent.show=function(a,b,c){if(null===a)throw"flagContent.showPopup must have an id.";if(null===b)throw"flagContent.showPopup must have a type indicator.";GD.flagContent.close();var d=$("#FlagContentDlgTmpl").html();if("EMPLOYER_REVIEW"===b||"INTERVIEW_REVIEW"===b)d=d.printf("review","Review",a,b);else if("USER_QUESTION"===b)d=d.printf("question","Question",a,b);else if("USER_RESPONSE"===b)d="USER_QUESTION"===c?d.printf("answer","Answer",a,b):d.printf("comment","Comment",a,b);else if("COMPANY_PHOTO"===
b)d=d.printf("photo","Photo",a,b);else throw"flagContent.show called with invalid type indicator.";a=$("<div>").attr("id","FlagContentDlg").html(d);b=$("#FlagContentBtns").children().clone(!0);$("div.btns",a).append(b);GD.flagContent.setupTextArea(a.find("textarea"),"");b=a.find(".gd-btn.submit");c=a.find(".gd-btn.closeDlg");GD.btn.label(b,a.data("flagLabel"));b.on("click",function(){GD.flagContent.submit()});c.on("click",function(){GD.flagContent.close()});a.dialog({width:440,minHeight:0,dialogClass:"noCloseBox noScrollBars",
resizable:!1,close:function(){GD.flagContent.onCloseComplete()}});GD.btn.init();a.parent().find(".ui-dialog-title").css({display:"none"});GD.flagContent.$savedPopupContents=a.children().clone(!0)};GD.flagContent.setupTextArea=function(a,b){a.keyup(GD.flagContent.reasonChangeEvent).keypress(GD.flagContent.reasonChangeEvent).change(GD.flagContent.reasonChangeEvent).mouseup(GD.flagContent.reasonChangeEvent).val(b).focus()};
GD.flagContent.reasonChangeEvent=function(){var a=$("#FlagContentDlg"),b=$("textarea",a);b.length&&GD.btn.enable($(".gd-btn",a),0<b.val().length)};GD.flagContent.close=function(){var a=$("#FlagContentDlg");a.length&&a.dialog("close")};GD.flagContent.onCloseComplete=function(){var a=$("#FlagContentDlg");a.length&&(a.dialog("destroy"),a.remove())};
GD.flagContent.setPopupContent=function(a){var b=$("#FlagContentDlg");b.parent().find(".ui-dialog-titlebar");a instanceof jQuery?(b.children().remove(),b.append(a)):b.html(a)};GD.flagContent.showSuccess=function(){GD.marketo.registerEvent("FLAG_INAPPROPRIATE");var a=$("#FlagContentSuccess").children().clone(!0);GD.flagContent.setPopupContent(a);$(".gd-btn .gd-btn-1",a).focus()};
GD.flagContent.showFailure=function(){var a=$("#FlagContentFailure").children().clone(!0);GD.flagContent.setPopupContent(a);$(".gd-btn .gd-btn-1",a).focus()};GD.flagContent.restoreInput=function(){GD.flagContent.setPopupContent(GD.flagContent.$savedPopupContents);GD.flagContent.setupTextArea($("#FlagContentDlg textarea"),GD.flagContent.savedInputText);GD.flagContent.reasonChangeEvent();return!1};
GD.flagContent.submit=function(){var a=$("#FlagContentDlg"),b=$(".dlgContents",a),a=$("textarea",b),c=b.data("approvableId"),b=b.data("entityType");if(a.length){var d=a.val();0<d.length?(GD.flagContent.savedInputText=d,d=encodeURIComponent(d),a={async:!1,url:"flagApprovableAjax.htm?approvableId="+c+"&entityTypeStr="+b+"&comment="+d,dataType:"json",success:function(){GD.flagContent.showSuccess()},error:function(){GD.flagContent.showFailure()}},jQuery.ajax(a)):a.focus()}};
GD.compChart=GD.compChart||{};GD.compChart.augment=function(){$("tr.dataRow .toggle a, tr.dataRow .toggle i").click(GD.compChart.toggleRowClick)};
GD.compChart.toggleRowClick=function(a){var b=$(a.target).parents("span.toggle"),a=$(a.target).parents("tbody");b&&a&&(a=a.next(),a.length&&"TBODY"==a[0].tagName&&(b.is(".expanded")?(a.css("display","none"),b.removeClass("expanded"),b.addClass("contracted")):($.browser.msie&&8>$.browser.version?a.css("display","block"):a.css("display","table-row-group"),b.removeClass("contracted"),b.addClass("expanded"))));return!1};GD.socialNet=GD.socialNet||{};GD.socialNet.MAX_TWITTER_SEARCH_QUERY_LEN=140;
GD.socialNet.REFRESH_TIME=6E5;GD.socialNet.NO_DATA_REFRESH_TIME=3E4;GD.socialNet.firstTwitterRequest=!0;GD.socialNet.initSocialNetworkFeed=function(a,b,c,d){GD.socialNet.initTwitterFeed(a,b,d)};GD.socialNet.initTwitterFeed=function(a,b,c){var d="";if(a&&(-1<a.indexOf("http://")||-1<a.indexOf("https://")))a=a.split("/"),d=a[a.length-1];GD.socialNet.refreshTwitterFeed(d,b,c,0)};GD.socialNet.refreshTwitterFeed=function(a,b,c,d){d||(d=0);GD.socialNet.queryTheTwitters(a,b,c,d)};
GD.socialNet.queryTheTwitters=function(a,b,c,d){$.ajax({url:"/Overview/twitterFeedAjax.htm",data:"screenName="+a,dataType:"json",success:function(e,f){GD.socialNet.twitterResults(a,b,d,c,e,f)}})};
GD.socialNet.twitterResults=function(a,b,c,d,e){if(e){var f=$("#"+b+" .twitterService");f.is(":visible")?$(".waiting",f).fadeOut():$(".waiting",f).css("display","none");var g=GD.socialNet.REFRESH_TIME;if(0<e.length){var f=$(".tweets",f),h=$("<div>"),i=0===f.children().length,l=-1;f.prepend(h);h.css("display","none");for(var j=0;j<e.length;j++){var k=e[j];if(k.id>c){var m=$("<div class='tweet'><span class='name'></span><span class='separator'>: </span><span class='text'></span></div>");h.append(m);
$(".name",m).html(k.screenName);$(".text",m).html(k.text);l<k.id&&(l=k.id)}}0<l&&(h.slideDown("fast",function(){GD.socialNet.twitterTrim(b,!i)}),f.attr("max_id",l))}else GD.socialNet.firstTwitterRequest&&(f.is(":visible")?$(".noData",f).fadeIn():$(".noData",f).css("display","block"),g=GD.socialNet.NO_DATA_REFRESH_TIME);GD.socialNet.firstTwitterRequest=!1;GD.wait(g).then(function(){GD.socialNet.refreshTwitterFeed(a,b,d,e.max_id)})}};
GD.socialNet.twitterTrim=function(a,b){var c=$("#"+a+" .twitterService"),d=$(".tweets",c),e=$(".tweet",d);if(0<e.length){var c=d.offset().top+d.innerHeight(),c=c-(parseInt(d.css("padding-top"),10)+parseInt(d.css("padding-bottom"),10)),f=$(e[e.length-1]),d=f.offset().top;d>c?(c=f.parent(),f.remove(),0===c.children().length&&c.remove(),GD.socialNet.twitterTrim(a,b)):d+f.outerHeight()>c&&f.fadeOut(b?"fast":0,function(){var a=f.parent();f.remove();0===a.children().length&&a.remove()})}};
GD.socialNet.showFacebookFeed=function(a){$("#"+a+" .serviceTabs .tab i.pointer").hide();$("#"+a+" .fbServiceTab i.pointer").show();$("#"+a+" .service").hide();$("#"+a+" .facebookService").show();return!0};GD.socialNet.showTwitterFeed=function(a){$("#"+a+" .serviceTabs .tab i.pointer").hide();$("#"+a+" .twitServiceTab i.pointer").show();$("#"+a+" .service").hide();$("#"+a+" .twitterService").show();GD.socialNet.twitterTrim(a,!1);return!0};"undefined"==typeof GD.expText&&(GD.expText={});
GD.expText.initExpandingText=function(){var a=$("div.expTxt");a.removeClass("expTxt").addClass("expTxtRdy");$("span.more",a).click(GD.expText._onExpandingTextMore);$("span.less",a).click(GD.expText._onExpandingTextLess);a.each(function(){var a=$(this),c=a.attr("maxHeight");c?a.css({maxHeight:c-0,overflow:"hidden"}):a.css({overflow:"hidden"})})};
GD.expText._onExpandingTextMore=function(a){a=$(a.target).closest(".expTxtRdy");a.css("overflow","auto");$("span.ellipses",a).hide();$("span.more",a).hide();$("span.expanded",a).show();$("span.less",a).show();return false};GD.expText._onExpandingTextLess=function(a){a=$(a.target).closest(".expTxtRdy");a.css("overflow","hidden");a.scrollTo(0,0);$("span.less",a).hide();$("span.expanded",a).hide();$("span.ellipses",a).show();$("span.more",a).show();return false};
"undefined"===typeof GD.survey&&(GD.survey={});GD.survey.selectRatingControl=function(){$(".selectRatingControl").not("."+GD.survey.selectRatingControl.OK_CLASSNAME).each(function(){GD.survey.selectRatingControl.init($(this))})};GD.survey.selectRatingControl.OK_CLASSNAME="selectRatingControlOK";
GD.survey.selectRatingControl.init=function(a){if(a.not("."+GD.survey.selectRatingControl.OK_CLASSNAME)){a.addClass(GD.survey.selectRatingControl.OK_CLASSNAME);a.$radioGroup=$("input.radio",a);a.$itemGroup=$("li",a);a.$hoverText=$(".hoverText",a);a.$selectedText=$(".selectedText",a);a.$prompt=$(".prompt",a);a.on("touchstart mousedown keydown","li",function(b){b=$(b.target).find("label");b=$(b).attr("forId");a.find("#"+b)[0].checked=true;GD.survey.selectRatingControl.select(a)});if(!("ontouchstart"in
window)){a.on("mouseover","li",function(b){var b=$(b.target),c=b.find("label").text();a.$hoverText.text(c).show();a.$selectedText.hide();GD.survey.selectRatingControl.include(a,b)});a.on("mouseout","li",function(){a.$hoverText.text("").hide();a.$selectedText.show();GD.survey.selectRatingControl.include(a)});a.on("mouseover","ul",function(){a.$prompt.css("display","none")});a.on("mouseout","li",function(){a.$prompt.css("display","inline")})}GD.survey.selectRatingControl.select(a)}};
GD.survey.selectRatingControl.include=function(a,b){for(var c=a.$itemGroup,d=c.length,e=false,f,b=b||a.find("li.selected");d--;){f=$(c[d]);if(f.is(b)){e=true;f.addClass("active_"+d)}else f.removeClass("active_"+d);e?f.addClass("included"):f.removeClass("included")}};
GD.survey.selectRatingControl.select=function(a){for(var b=a.$itemGroup,c=a.$radioGroup,d=c.length,e;d--;){var f=$(c[d]),g=$(b[d]);if(f.prop("checked")){e=g;e.addClass("selected");f=g.find("label").text();a.$selectedText.text(f);a.$prompt.length>0&&a.$prompt.remove()}else g.removeClass("selected")}GD.survey.selectRatingControl.include(a,e)};
GD.survey.initFillReviewTag=function(){var a=$(".surveyTypeChoices"),b=$(".reviewJobStatus"),c=$(".salaryJobStatus"),d=$(".reviewFieldGroup"),e=$(".salaryFieldGroup"),f=$(".interviewFieldGroup"),g=$(".reviewFillWidget .bailout"),h=$(".reviewFillWidget .takeToSurveyStart"),i=$(".reviewFillWidget .lashedEmployer");a.find("input").on("change",function(){if($(this).val()=="REVIEW"){e.add(f).slideUp();d.slideDown()}else if($(this).val()=="SALARY"){d.add(f).slideUp();e.slideDown()}else{d.add(e).slideUp();
f.slideDown()}});b.find(".jobStatusChoices input").on("change",function(){$(this).val()=="true"?b.find(".jobEndingYear").slideUp():b.find(".jobEndingYear").slideDown()});c.find(".jobStatusChoices input").on("change",function(){$(this).val()=="true"?c.find(".jobEndingYear").slideUp():c.find(".jobEndingYear").slideDown()});i.on("click","li",function(){var a=$(this),b=a.closest(".lashedEmployer"),a=a.index()+1,d=b.data("employerId"),b=b.data("employerName");GD.dom.loadUrl("/survey/start_execute.htm?showSurvey=REVIEWS&contentOriginHook=NEW_USER_FLOW&employerId="+
d+"&employerName="+b+"&overallRating="+parseInt(a,10))});a=$(".employerName");i=$(".employerId");GD.ajax.createEmployerAutoComplete(a,i);a=$(".interviewEmployerName");i=$(".interviewEmployerId");GD.ajax.createEmployerAutoComplete(a,i);$("#SurveyChoiceReviewForm").on("submit",function(){var a=$(this),b=a.find(".formErrs"),d=$("input[name=surveyModeChoices]:checked").val(),c=$('input[name="salaryUIData.state.salaryReview.currentJob"]:checked').val(),e=$("#InterviewEmployerName").val(),f=$("input[name=interviewEmployerId]").val();
if(d=="SALARY"){GD.dom.loadUrl("/survey/salary/collectComp_input.htm?initiatedFromStartSurvey=false&contentOriginHook=NEW_USER_FLOW&specificEmployer=true&salaryUIData.state.salaryReview.currentJob="+c+"&salaryUIData.state.salaryReview.jobEndingYear=2013");return false}if(d=="INTERVIEW"){GD.dom.loadUrl("/survey/interview/collectQuestions_input.htm?initiatedFromStartSurvey=false&contentOriginHook=NEW_USER_FLOW&specificEmployer=true&employerId="+f+"&interviewEmployerName="+e);return false}if(a.find(".employerId").val()){b.slideUp();
return true}b.slideDown();a.find(".employerName").val()?b.html("Please select a valid employer from the list"):b.html("Please enter a valid employer");return false});g.on("click",function(a){var b=$(this).data("url");if(b){a.preventDefault();GD.dom.loadUrl(b)}});h.on("click",function(a){$(this);a.preventDefault();GD.dom.loadUrl("/survey/start_input.htm?contentOriginHook=NEW_USER_FLOW&showSurvey=SALARIES")})};GD.pricingPromo=GD.pricingPromo||{};GD.pricingPromo.pricingValues={};
GD.pricingPromo.openPricingModalFlow=function(a,b,c){GD.marketo.registerEvent(b+"1");$.ajax({url:"/partners/pricing/modal_input.htm",data:"employerId="+a+"&prospect="+(c?"true":"false"),success:function(d){var e=$(d);loadFunction=function(){e.find(".priceContinue").click(function(){GD.marketo.registerEvent(b+"2");GD.pricingPromo.viewPricingModal(a,c);$(".priceContinue").after('<i class="spinner floatRt margRt30 margTop20"></i>')});e.find("select").gdSelect()};GD.pricingPromo.showPopupDialog(e,loadFunction,
"pricingModal")}})};
GD.pricingPromo.viewPricingModal=function(a,b){$.ajax({url:"/partners/pricing/modal_execute.htm",data:"employerId="+a+"&"+$("#ActiveJobsInput").attr("name")+"="+$("#ActiveJobsInput").val()+"&prospect="+b,success:function(a){a=$(a);loadFunction=function(){GD.pricingPromo.calculatePackagePricing();$("#ProfileOnly").click(function(){$(this).removeClass("unselected").addClass("selected");$("#ProfileJobs").removeClass("selected").addClass("unselected")});$("#ProfileJobs").click(function(){$(this).removeClass("unselected").addClass("selected");$("#ProfileOnly").removeClass("selected").addClass("unselected")});
$("#PricingToSalesBtn").click(function(){GD.marketo.registerEvent("PRICING_TO_SALES")});GD.pricingPromo.pricingValues.priceRate=="ESSENTIALS"?GD.pricingPromo.showPricing(1):GD.pricingPromo.showPricing(2)};GD.pricingPromo.showPopupDialog(a,loadFunction,"pricingModal")}})};
GD.pricingPromo.calculatePackagePricing=function(){GD.pricingPromo.pricingValues.priceRate=$("#PriceRate").html();GD.pricingPromo.pricingValues.essentialsFee=$("#EssentialsFee").text();GD.pricingPromo.pricingValues.annualPlusMonthly=$("#ProfileJobsPriceMonthly").text();GD.pricingPromo.pricingValues.annualMonthly=$("#ProfileOnlyPriceMonthly").text()};
GD.pricingPromo.updateModalPrices=function(a){GD.pricingPromo.pricingValues.priceRate=="ESSENTIALS"&&a==2?$("#ProfileJobsPriceMonthly").text(GD.i18n.fmtCurrency(+GD.pricingPromo.pricingValues.annualPlusMonthly+ +GD.pricingPromo.pricingValues.essentialsFee,"USD",0)):$("#ProfileJobsPriceMonthly").text(GD.i18n.fmtCurrency(+GD.pricingPromo.pricingValues.annualPlusMonthly,"USD",0));$("#ProfileOnlyPriceMonthly").text(GD.i18n.fmtCurrency(+GD.pricingPromo.pricingValues.annualMonthly,"USD",0))};
GD.pricingPromo.showPricing=function(a){$(".pricingTerm").each(function(b,c){var d=$(c).data("yearlyPayments");if(d==a)$(c).removeClass("link").off("click.pricing");else $(c).addClass("link").on("click.pricing",function(){GD.pricingPromo.showPricing(d)})});GD.pricingPromo.updateModalPrices(a)};
GD.pricingPromo.showPopupDialog=function(a,b){GD.dlgManager.addCustomDialog({dialogBody:a,dialogWidth:700,occlude:true,draggable:false,closeable:true,onClose:function(){GD.dlgManager.closeAllDialogs()},onLoadComplete:b?b:function(){},extraData:null,modal:true})};window.GD=window.GD||{};GD.companyFollow=GD.companyFollow||{};
GD.companyFollow.initSuggestWidget=function(a,b){a=$(a);a.on("load",function(c,d){if(a.data("loaded")===void 0){a.data("loaded",true);GD.companyFollow._getSuggestedCompanies(a,b,d)}})};
GD.companyFollow._getSuggestedCompanies=function(a,b,c){var d=a.data("userValidationKey"),e=a.data("limit"),f={};f.suggestType=b;if(d)f.userValidationKey=d;if(e)f.limit=e;if(c){if(c.hasOwnProperty("jobTitle"))f.jobTitle=c.jobTitle;if(c.hasOwnProperty("rawLocationName"))f.rawLocationName=c.rawLocationName;if(c.hasOwnProperty("cityId"))f.cityId=c.cityId}$.ajax({dataType:"json",data:f,url:"/follow/suggestedCompaniesAjax.htm",complete:function(){},success:function(b){var b=b.suggestedCompanies,d,c,f,
j;a.empty();if(b.length){$(b).each(function(b,g){if(b>=e)return false;d=$("div.cfSuggestionCloneable:first").clone();d.removeClass("cfSuggestionCloneable hidden");c=d.find(".followBtn");f=d.find("h3.cfEmpName");if(g.companyLogoUri!==null&&g.companyLogoUri!==""){j=$("<img />").attr("src",g.companyLogoUri).addClass("cfSqLogo");d.find("i.defLogo").after(j);d.find("i.defLogo").remove()}f.text(g.companyName);c.data("empId",g.employerId);c.data("empName",g.companyName);c.data("following",g.followed);a.append(d)});
a.append('<div class="clear"></div>');GD.companyFollow._initFollowBtns(a)}else a.html("Sorry, no company suggestions available at this moment.").addClass("h4 tightVert padTop20 valignMiddle valignCenter")},error:function(){}})};
GD.companyFollow._initFollowBtns=function(a){var b=a.find(".followBtn"),c=a.data("userValidationKey");b.on("click",function(b){b.preventDefault();b.stopPropagation();var e=$(this),f=e.data("empId"),g=e.data("empName"),b=e.data("following"),f={eid:f,follow:!b,og:false};if(c)f.userValidationKey=c;GD.companyFollow._onFollowClick(f,e,b?function(b,d){if(d!==null){e.data("following",false);e.find("span").html("Follow");GD.analytics.trackEvent("company-follow",a.data("gaAction").replace("follow","unfollow"),
g);GD.ei.updateFollowBtnDisp(e)}}:function(b,d){if(d!==null){e.data("following",true);e.find("span").html("Following");GD.analytics.trackEvent("company-follow",a.data("gaAction"),g);GD.ei.updateFollowBtnDisp(e)}})});$.each(b,function(a,b){var c=$(b),g=!!c.data("following");c.prepend("<i/>");var h=c.find("i");if(g){h.removeClass("unfollowX").addClass("followCheck");c.on("mouseenter.showUnfollow",GD.ei._followHover).on("mouseleave.hideUnfollow",GD.ei._followUnhover);c.find("span").text(c.data("labelFollowing"))}else{h.removeClass("followCheck unfollowX");
c.off("mouseenter.showUnfollow").off("mouseleave.hideUnfollow");c.find("span").text(c.data("labelFollow"))}c.removeClass("unfollow")})};
GD.companyFollow._onFollowClick=function(a,b,c){jQuery.ajax({url:"/follow/companyAjax.htm",data:a,traditional:true,type:"GET",success:function(a){var b=true;if(!a||!a.success){b=false;a?Logger.inspect(a,"Response: "):Logger.error("No response object returned.")}jQuery.isFunction(c)&&c(b,a,a.errorMessage)},error:function(a){Logger.inspect(a,"GD.companyFollow._onFollowClick() error");jQuery.isFunction(c)&&c(false,null,a.errorMessage)}})};window.GD=window.GD||{};GD.jobsLink=GD.jobsLink||{};
GD.jobsLink.track=function(b,g){var c,b=GD.event.fixEvent(b),a=$(b.target);a.is("a")||(a=a.closest("a"));var d=a.data("url");d||(d=a.attr("href"));if(d){if(c=a.data("ctScr"))try{var f=document.createElement("a"),e=new Function(c);f.href=d;e.call(f);d=f.href;a.attr("href",d);a.data("url",d)}catch(j){}c=a.data("ctPn");var e=a.data("ctPid"),f=a.data("ctJid"),h=a.data("evA"),i=c;e&&(i=i+" ("+e+")");h&&GD.analytics.trackEvent("jobListing",h,i);e=a.data("ctT");h=a.data("ctV");e&&GD.jobsLink.trackClick(e,
c,h,f);if((c=!!a.data("offsiteTarget"))&&("undefined"==typeof g||!g))a=window.open(d,"_blank"),a.focus&&a.focus()}return!c};GD.jobsLink.trackClick=function(b,g,c,a){GD.analytics.trackPageView("/partner/jobs/"+b+"/"+g);GD.jobsLink.trackJobClickValue(c,a);return!0};
GD.jobsLink.trackJobClickValue=function(b){b&&(b=parseFloat(b),isNaN(b)||(b="http://www.googleadservices.com/pagead/conversion/1064892929/?value="+b+"&label=xA6ZCLv0igIQgfTj-wM&guid=ON&script=0&cachebuster="+(new Date).getTime(),b=$("<img>").attr("src",b).attr("width",1).attr("height",1).css("border",0).addClass("offScreen"),$("body").append(b)))};window.GD=window.GD||{};GD.socialSharing=GD.socialSharing||{};GD.socialSharing.LEFT_OFFSET=100;GD.socialSharing.TOP_OFFSET=2;GD.socialSharing.FLOATING_CLASS="floating";GD.socialSharing.FIXED_CLASS="fixed";GD.socialSharing.UPPER_MARGIN=20;GD.socialSharing.MIN_VISIBLE_WIDTH=1220;GD.socialSharing.BOUNCE_DIST=5;GD.socialSharing.BOUNCE_TIME=80;GD.socialSharing.isNarrowWindow=null;
GD.socialSharing.init=function(){var a=$("#SocialSharingBtns");GD.socialSharing.isNarrow()?a.remove():(GD.socialSharing.idealViewportTopOffset=a.offset().top,a.length&&($(window).resize(function(b){GD.socialSharing._resize(b,a)}),$(window).scroll(function(b){GD.socialSharing._scroll(b,a)}),$(window).resize(),$(window).scroll(),GD.socialSharing.initGPlusHandler(),GD.runOnFacebookLoad(function(){GD.socialSharing.initFBLikeButtonHandler()})))};GD.socialSharing.sendGAEvent=function(){};
GD.socialSharing.initFBLikeButtonHandler=function(){FB.Event.subscribe("edge.create",function(){GD.analytics.trackSocial("facebook","like")});FB.Event.subscribe("edge.remove",function(){GD.analytics.trackSocial("facebook","unlike")});FB.Event.subscribe("message.send",function(){GD.analytics.trackSocial("facebook","send")})};
GD.socialSharing.initGPlusHandler=function(){window.gPlusCallbackGA=function(a){a.state&&a.href?"on"==a.state?GD.analytics.trackSocial("gplus","plus"):GD.analytics.trackSocial("gplus","minus"):a||Logger.trace("googlePlusone - no response")}};
GD.socialSharing.isNarrow=function(){if("boolean"===typeof GD.socialSharing.isNarrowWindow)return GD.socialSharing.isNarrowWindow;GD.socialSharing.isNarrowWindow=!1;jQuery.browser.msie&&8>jQuery.browser.version?GD.socialSharing.isNarrowWindow=!0:$(window).width()<GD.socialSharing.MIN_VISIBLE_WIDTH&&(GD.socialSharing.isNarrowWindow=!0);return GD.socialSharing.isNarrowWindow};
GD.socialSharing._resize=function(a,b){var c=$(window).width();if(b.hasClass("fixed")){var d=b.parent().offset().left-GD.socialSharing.LEFT_OFFSET;b.css({left:d})}if(c>=GD.socialSharing.MIN_VISIBLE_WIDTH){if(b.hasClass("offScreen")&&(b.addClass("hidden"),b.removeClass("offScreen")),b.is(":hidden"))b.css({display:"none",opacity:1}),b.fadeIn(200,GD.socialSharing._onFadeInComplete)}else b.is(":visible")&&b.fadeOut(200)};
GD.socialSharing._onFadeInComplete=function(){if(jQuery.browser.msie){var a=$("#SocialSharingBtns"),a=$(".fbLikeButton iframe",a);a.length&&(a=a[0],a.src=a.src)}};
GD.socialSharing._scroll=function(a,b){var c=$(window).scrollTop(),d=b.offset().top-c,e=b.offset().left;b.hasClass(GD.socialSharing.FIXED_CLASS)?c<=GD.socialSharing.idealViewportTopOffset-GD.socialSharing.UPPER_MARGIN&&GD.socialSharing._floatSharingButtons(b,d,e):b.hasClass(GD.socialSharing.FLOATING_CLASS)&&d<GD.socialSharing.UPPER_MARGIN&&GD.socialSharing._fixSharingButtons(b,d,e)};
GD.socialSharing._fixSharingButtons=function(a,b,c){a.removeClass(GD.socialSharing.FLOATING_CLASS);a.addClass(GD.socialSharing.FIXED_CLASS);a.css({position:"fixed",top:b,left:c});b<GD.socialSharing.UPPER_MARGIN&&GD.socialSharing._bounceDownBtns(a,b)};GD.socialSharing._floatSharingButtons=function(a){a.removeClass(GD.socialSharing.FIXED_CLASS);a.addClass(GD.socialSharing.FLOATING_CLASS);a.css({position:"absolute",top:GD.socialSharing.TOP_OFFSET,left:-GD.socialSharing.LEFT_OFFSET})};
GD.socialSharing._bounceDownBtns=function(a,b){a.animate({top:b-GD.socialSharing.BOUNCE_DIST},GD.socialSharing.BOUNCE_TIME,"easeOutQuint",function(){GD.socialSharing._bounceDownBtns2(a)})};GD.socialSharing._bounceDownBtns2=function(a){a.animate({top:GD.socialSharing.UPPER_MARGIN},GD.socialSharing.BOUNCE_TIME,"easeInQuint")};window.GD=window.GD||{};GD.tagList=GD.tagList||{};GD.tagList.expand=function(a){var b=id("TagListCompressed_"+a),a=id("TagListExpanded_"+a);b&&a&&(b.style.display="none",a.style.display="inline");return!1};GD.tagList.collapse=function(a){var b=id("TagListCompressed_"+a),a=id("TagListExpanded_"+a);b&&a&&(b.style.display="inline",a.style.display="none");return!1};
GD.tagList.addTags=function(a,b){var d="none"!=$("#TagListExpanded_"+a).css("display"),c=$("#TagListThreshold_"+a),c=c.length?c.html():999,e=id("TagListCompressed_"+a);if(b.length&&0<b.length){var f=Math.min(b.length,c),g=GD.tagList.build(b,0,f-1);if(0<g.length){var h=id("TagListCompressedData_"+a);h&&(h.innerHTML=g)}if(f<b.length&&(g=GD.tagList.build(b,f,b.length-1),0<g.length&&(f=id("TagListExpandedData_"+a))))f.innerHTML=g;!d&&b.length>c&&(e.style.display="inline")}else e.style.display="none"};
GD.tagList.build=function(a,b,d){try{for(var c="";b<=d;b++){var e=a[b],f,g,h;if(e&&(e.tag?(f=e.tag,g=e.link):(f=e,g=null),(h=GD.tagList.buildTagLinkHtml(f,g))&&0<h.length))c+=h,b<d&&(c+=", ")}return c}catch(i){Logger.fatal("interviews.js / GD.tagList.build()",i)}};
GD.tagList.buildTagLinkHtml=function(a,b){try{var d="",c="";a&&(a.contains(" ")&&(c=" class='nowrap'"),b?d+="<a href='"+b+"'"+c+">":0<c.length&&(d+="<span"+c+">"),d+=a,b?d+="</a>":0<c.length&&(d+="</span>"));return d}catch(e){Logger.fatal("interviews.js / buildTagLink()",e)}};window.GD=window.GD||{};GD.dialog=GD.dialog||{};
GD.dlgManagerImpl=function(){function e(){document.onclick=function(a){var c=id(GD.dialog._contextHelpId),a=GD.event.fixEvent(a),c=0<=$(a.target).parents().index(c);a.target?c||(document.onclick=null,j("#"+GD.dialog._contextHelpId),GD.dialog.contextHelpShown=!1):alert("target is null");return!0}}function d(a){var c=a.dlgParent;"object"!==typeof a&&(a={});"string"!==typeof a.bgColor&&(a.bgColor="white");if((!a.content||!a.content.jquery)&&"string"!==typeof a.content)a.content="";if(!c||!c.length)c=
$("#PageContent"),c.length||(c=$("body:first"));"number"!==typeof a.width&&(a.width=200);"number"!==typeof a.top&&(a.top=1);"number"!==typeof a.left&&(a.left=1);"boolean"!==typeof a.showClose&&(a.showClose=!0);"boolean"!==typeof a.clickAwayClose&&(a.clickAwayClose=!1);if(c.length){var b=$("<div>"),c=c.offset();b.attr("clickAwayClose",a.clickAwayClose);b.attr("id",a.dialogId);b.addClass("gdPanel dropShadow");b.css({display:"none","background-color":a.bgColor,"z-index":1E4}).width(a.width);b.css({top:Math.floor(c.top+
a.top)+"px",left:Math.floor(c.left+a.left)+"px"});$("body:first").append(b);var c=$("<div class='gdPanelContents'>"),d="";a.showClose&&(d+="<a href='#' onclick='return GD.dlgManager.panelClose(\"#"+a.dialogId+"\");'><div class='closeBox medium'><i class='medx'></i></div></a>");d+="<div class='panelContents'></div>";a.showClose&&(d="<div class='gdPanelClosable'>"+d+"</div>");c.append(d);c.append(a.content);b.append(c);jQuery.isFunction(a.onClose)&&(b[0].onCloseCallback=a.onClose)}}function m(a){a=
$(a);a.length&&a.css("display","block")}function f(a){a=$(a);a.length&&a.hide();return!1}function j(a){a=$(a);if(a.length){f(a);if(jQuery.isFunction(a[0].onCloseCallback))a[0].onCloseCallback();a.remove()}return!1}function g(a,c,d,e,i,m){if("string"!==typeof d||"info"!==d&&"prompt"!==d&&"success"!==d&&"warning"!==d)d="error";"string"!==typeof a&&(a="");i="";"undefined"!=typeof m&&(i=m);m=c instanceof jQuery?c:"string"===typeof c?$(c):$("<p></p>");"boolean"!==typeof e&&(e=!0);var c=$("#GDPopupDialog"),
k,h,l,f;0===c.length?(c=$("<div></div>"),c.attr("id","GDPopupDialog"),c.addClass("dropShadow"),c.addClass(i),k=$("<div></div>"),k.attr("id","GDPopupDialogHeader"),l=document.createElement("div"),l.id="GDPopupDialogTitle",h=$("<div></div>"),h.attr("id","GDPopupDialogClose"),h.addClass("closeBox medium"),h.append('<i class="medx"></i>'),f=$("<div></div>"),f.attr("id","GDPopupDialogContent"),i=document.createElement("div"),i.id="GDPopupDialogMask",document.body.appendChild(i),$("body").append(c),c.append(k),
k.append(l),k.append(h),c.append(f),h.click(b.hideDialog),$(document).keyup(function(a){27==a.keyCode&&h.click()})):(k=$("#GDPopupDialogHeader"),l=id("GDPopupDialogTitle"),h=$("#GDPopupDialogClose"),f=$("#GDPopupDialogContent"),i=id("GDPopupDialogMask"),i.style.visibility="visible",c.css("visibility","visible"),$(document).keyup(function(a){27==a.keyCode&&h.click()}));c.css("opacity",0);c.css("filter","alpha(opacity=0)");c.data("alpha",0);var j=null!==window.innerWidth?window.innerWidth:document.documentElement&&
document.documentElement.clientWidth?document.documentElement.clientWidth:null!==document.body?document.body.clientWidth:null,g=null!==window.innerHeight?window.innerHeight:document.documentElement&&document.documentElement.clientHeight?document.documentElement.clientHeight:null!==document.body?document.body.clientHeight:null,n="undefined"!==typeof window.pageXOffset?window.pageXOffset:document.documentElement&&document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft?
document.body.scrollLeft:0,o="undefined"!==typeof window.pageYOffset?window.pageYOffset:document.documentElement&&document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop?document.body.scrollTop:0,p=c.outerWidth(),q=c.outerHeight(),g=Math.round(o+g/3-q/2),j=Math.round(n+j/2-p/2),g=String(g)+"px",j=String(j)+"px";c.css("top",g);c.css("left",j);k.addClass(d+"Header");a&&0<a.length?l.innerHTML=a:l.style.display="none";f.addClass(d);f.empty().append(m);a=id(GD.dialog.WRAPPER);
i.style.height=a.offsetHeight+"px";c.data("timer",setInterval(function(){b._fadeDialog(true)},GD.dialog.TIMER));e?h.css("visibility","visible"):h.css("visibility","hidden");GD.btn.init()}var b=this;this.CURRENT_Z_INDEX="undefined"!=typeof GD.effects&&"undefined"!=typeof GD.effects.OVERLAY_Z_INDEX?GD.effects.OVERLAY_Z_INDEX+10:100;b.activeDialogList=[];b.fetchComplete=!1;b.occlusionComplete=!1;b.ajaxData=null;b.ajaxTextStatus=null;GD.dialog.OVERLAY_OPACITY=0.8;GD.dialog.TIMER=5;GD.dialog.SPEED=10;
GD.dialog.WRAPPER="PageContent";GD.dialog.WIDTH_SM=500;GD.dialog.WIDTH_LG=700;GD.dialog._contextHelpId="GDContextHelpPanel";GD.dialog.contextHelpShown=!1;this.showHelp=function(a,c,b,f){if(!a.length&&(a=$("#PageContent"),!a)){$("body:first");return}if(c.length){"undefined"===typeof b&&(b=250);c=c.html().trim();GD.dialog.contextHelpShown&&(j("#"+GD.dialog._contextHelpId),document.onclick=null);f&&(f=$(f));var i=-5;if(f&&f.length){var g=f.offset().left,f=f.width(),k=g+f,h=a.offset(),l=b;l>f?i=-(h.left-
g)-5:h.left+l>k&&(i=k-l-5-h.left)}d({dialogId:GD.dialog._contextHelpId,content:c,dlgParent:a,width:b,top:17,left:i,bgColor:"#e3e3e3",showClose:!1,clickAwayClose:!0});GD.wait().then(e);m("#"+GD.dialog._contextHelpId);GD.dialog.contextHelpShown=!0;a=$(window).scrollTop()+$(window).height();b=$("#"+GD.dialog._contextHelpId);b=Math.ceil(b.offset().top)+b.outerHeight();b+10>a&&jQuery.scrollTo("+="+(b-a+10)+"px",500,{easing:"swing",axis:"y"});return!1}alert("Sorry, help cannot be displayed...")};this.panelCreate=
d;this.panelShow=m;this.panelHide=f;this.panelClose=j;this.panelSetContents=function(a,c){var b=$(a);b.length&&(b=$(".panelContents",b),"string"===typeof c?b.html(c):b.empty().append(c))};this.showPromptDialog=function(a,c,b,d){g(a,c,"prompt",b,null,d)};this.showDialog=g;this.hideDialog=function(){var a=$("#GDPopupDialog");clearInterval(a.data("timer"));a.data("timer",setInterval(function(){b._fadeDialog(!1)},GD.dialog.TIMER))};this.addCustomDialog=function(a){"number"!=typeof a.dialogWidth&&(a.dialogWidth=
-1);"boolean"!=typeof a.occlude&&(a.occlude=!0);"function"!=typeof a.onLoadComplete&&(a.onLoadComplete=null);"undefined"==typeof a.extraData&&(a.extraData=null);a=$.extend({dialogBody:null,dialogWidth:-1,zIndex:this.CURRENT_Z_INDEX,occlude:!0,draggable:!1,closeable:!0,onClose:null,wrapperClass:null,onLoadComplete:null,extraData:null},a);if(a.occlude){this.isAjaxDialog=!1;this.ajaxTextStatus=this.ajaxData=null;this.fetchComplete=!0;this.occlusionComplete=!1;var c=null;a.closeable&&(c=function(){b.occlusionComplete&&
($(".gdDialog .closeBox").length?$(".gdDialog .closeBox").trigger("click"):b.closeAllDialogs())});a.zIndex=this.CURRENT_Z_INDEX+1;this.activeDialogList.push(new GD.dialog(a));GD.effects.occludePage(this._onOcclusionComplete,c,null,this.CURRENT_Z_INDEX);this.CURRENT_Z_INDEX+=1}else this.activeDialogList.push(new GD.dialog(a)),this.getCurrentDialog().display();this.CURRENT_Z_INDEX+=1};this.addAjaxDialog=function(a,c){"number"!=typeof c.dialogWidth&&(c.dialogWidth=-1);"boolean"!=typeof c.occlude&&(c.occlude=
!0);"function"!=typeof c.onLoadComplete&&(c.onLoadComplete=null);var d=$.extend({dialogBody:null,dialogWidth:-1,zIndex:b.CURRENT_Z_INDEX+1,closeable:!0,onClose:function(){b.closeAllDialogs()},wrapperClass:this.wrapperClass,onLoadComplete:null,extraData:null},c);b.activeDialogList.push(new GD.dialog(d));b.isAjaxDialog=!0;b.ajaxData=null;b.ajaxTextStatus=null;b.fetchComplete=!1;b.occlusionComplete=!1;GD.effects.occludePage(b._onOcclusionComplete,null,null,b.CURRENT_Z_INDEX);b.CURRENT_Z_INDEX+=1;b._fetchAjaxDialog(a);
b.CURRENT_Z_INDEX+=1};this.getCurrentDialog=function(){return b.activeDialogList&&b.activeDialogList.length?b.activeDialogList[b.activeDialogList.length-1]:null};this.deleteCurrentDialog=function(){if(!(null===b.activeDialogList||0===b.activeDialogList.length)){var a=b.activeDialogList.pop();a&&a.dialogElement&&a.dialogElement.parentNode.removeChild(a.dialogElement)}};this.closeAllDialogs=function(a){b.deleteCurrentDialog();a||GD.effects.revealPage();return!1};this.lateCloseAllDialogs=function(a){setTimeout(function(){b.closeAllDialogs()},
a)};this._fetchAjaxDialog=function(a){jQuery.ajax({url:a,dataType:"html",error:function(a,d){b._onFetchAjaxDialogComplete(null,d)},success:function(a,d){b._onFetchAjaxDialogComplete(a,d)}})};this._onOcclusionComplete=function(){var a=b.getCurrentDialog(),c;b.occlusionComplete=!0;if(b.fetchComplete)if(b.isAjaxDialog&&!b.ajaxData)b._displayAjaxError(b.ajaxTextStatus);else if(b.isAjaxDialog&&(c=b.ajaxData),a.display(c),"function"==typeof a.onLoadComplete)a.onLoadComplete(a.getExtraData())};this._onFetchAjaxDialogComplete=
function(a,c){var d=b.getCurrentDialog();b.fetchComplete=!0;b.ajaxData=a;b.ajaxTextStatus=c;if(b.occlusionComplete)if(a){if(d.display(a),"function"==typeof d.onLoadComplete)d.onLoadComplete(d.getExtraData())}else b._displayAjaxError(c)};this._displayAjaxError=function(a){alert("There was a problem loading this dialog.  Please try again a little later. ('"+a+"')");GD.effects.revealPage(null)};this._fadeDialog=function(a){"boolean"!==typeof a&&(a=!0);var b=$("#GDPopupDialog"),a=a?b.data("alpha")+GD.dialog.SPEED:
b.data("alpha")-GD.dialog.SPEED;b.data("alpha",a);b.css("opacity",a/100);b.css("filter","alpha(opacity="+a+")");99<=a?(clearInterval(b.data("timer")),b.removeData("timer")):1>=a&&(b.css("visibility","hidden"),$("#GDPopupDialogMask").css("visibility","hidden"),clearInterval(b.data("timer")))}};
GD.dialog=function(e){"undefined"===typeof e.dialogBody&&(e.dialogBody="<div>dialog contents not specified</div>");"undefined"===typeof e.dialogWidth&&(e.dialogWidth=-1);"undefined"===typeof e.zIndex&&(e.zIndex=0);"boolean"!==typeof e.draggable&&(e.draggable=!1);"boolean"!==typeof e.closeable&&(e.closeable=!1);"function"!==typeof e.onClose&&(e.onClose=null);"function"!==typeof e.onLoadComplete&&(e.onLoadComplete=null);"undefined"===typeof e.extraData&&(e.extraData=null);this.width=e.dialogWidth;this.dialogContents=
this.dialogElement=null;this.zIndex=e.zIndex;this.draggable=e.draggable;this.closeable=e.closeable;this.fullScreen=e.fullScreen?e.fullScreen:!1;this.onClose=e.onClose;this.wrapperClass=e.wrapperClass;this.onLoadComplete=e.onLoadComplete;this.extraData=e.extraData;this.setContents=function(d){if(d&&d.jquery)this.contents=d;else if(typeof d==="string")this.contents=$(d);else if(d&&d.tagName)this.contents=$(d);else return;if(this.dialogContents&&typeof this.dialogContents==="object"){d=$(this.dialogContents);
d.children();d.children().remove();d.append(this.contents)}};this.display=function(d){if(typeof this.dialogContents==="undefined"||this.dialogContents===null){d&&this.setContents(d);var d=$("<div>").addClass("gdDialog").css("zIndex",this.zIndex),e=$("<div>").addClass("dialogFrame dropShadow");e.width(this.width>0?this.width:GD.dialog.WIDTH_LG);if(this.closeable){var f=$("<div>").addClass("closeBox medium");f.append('<i class="medx"></i>');var j=this.onClose;f.on("click",function(){typeof j==="function"&&
j();GD.dlgManager.closeAllDialogs()});f.css("zIndex",this.zIndex+1);e.append(f);$(document).keyup(function(a){a.keyCode==27&&f.click()})}var g=d,b=$("<div>").css("min-height","50px");e.append(b);if(this.wrapperClass){g=$("<div>").addClass(this.wrapperClass);d.append(g)}g.append(e);if(this.closeable){d.on("click",function(){$(this).find(".closeBox").trigger("click")});d.find(".dialogFrame").on("click",function(a){a.stopPropagation()})}d.hide();$("body").append(d);this.dialogContents=b.get(0);this.dialogElement=
d.get(0)}else d=$(this.dialogElement);e=$(this.dialogContents);e.children().remove();e.append(this.contents);this.fullScreen?GD.util.popToFullScreen(d):GD.util.centerVertically(d);d.show()};this.getExtraData=function(){return this.extraData};this.setContents(e.dialogBody)};"undefined"==typeof GD.dlgManager&&(GD.dlgManager=new GD.dlgManagerImpl);window.GD=window.GD||{};GD.coach=GD.coach||{};GD.coach.cheer=function(c,b,a,d,i,e){c=id(c);a=b[a];if("object"==typeof a){var f=b.$cheerPrefix,g=b.$cheerSuffix;"string"!=typeof f&&(f="");"string"!=typeof g&&(g="");var h="";d<i?"string"==typeof a.tooFew&&(h=f+a.tooFew+g):0<e&&d>e&&"string"==typeof a.tooMany&&(h=f+a.tooMany+g);c.innerHTML=h;a=!0;d<i?a=!1:0<e&&d>e&&(a=!1);a?"string"==typeof b.$validColor&&(c.style.color=b.$validColor):"string"==typeof b.$errorColor&&(c.style.color=b.$errorColor)}};window.GD=window.GD||{};GD.sendGrid=GD.sendGrid||{};GD.sendGrid.init=function(){$(".status").on("click",function(a){GD.sendGrid.ajax(a)});$("#EventTypeFilter").on("click",function(a){a&&"BOUNCE"!=a.target.value?$("#BounceTypeFieldDiv").hide():$("#BounceTypeFieldDiv").show()})};
GD.sendGrid.ajax=function(a){a.preventDefault();var a=$(a.target),c=a.data("email"),d=a.data("emailStatus"),e=a.data("userId"),b={};b.emailAddress=c;b.emailStatusEnum=d;b.userId=e;a.replaceWith("<strong>Processing</strong>");$.ajax({url:"/admin/email/unsubscribeAjax.htm",data:b,success:function(a){$("#Status_"+a.userId).replaceWith("Unsubscribed");$("#GdStatus_"+a.userId).replaceWith(a.emailStatusEnum)},error:function(a,b,c){Logger.error(c)}})};window.GD=window.GD||{};GD.fb=GD.fb||{};GD.fb.UPDATE_FB_AUTH_URL="/profile/ajax/updateFacebookAuthAjax.htm";GD.fb.getAuthState=function(){GD.fb.getFbLoginStatus(function(a,b){var c="",e=0,d="https://"+document.location.hostname;document.location.port&&"80"!=document.location.port&&(d+=":8443");d+=GD.fb.UPDATE_FB_AUTH_URL;"connected"===a&&(c=b.authResponse.accessToken,e=b.authResponse.userID);jQuery.ajax({url:d,data:{token:c,sourceId:e,status:a},dataType:"jsonp",success:function(){},error:function(){}})})};
GD.fb.initLinkSettings=function(a,b){var c=!1;$("div.fbSettings .linked span.link").on("click",function(){GD.fb.facebookDelink(a)});$("div.fbSettings .unlinked span.link").on("click",function(){GD.fb.facebookLink(a)});GD.fb.getFbLoginStatus(function(a){c||(c=!0,$("div.fbSettings .checking").hide(),b?"connected"===a?($("div.fbSettings .unlinked").hide(),$("div.fbSettings .linked").show()):(Logger.debug("Facebook login response is :"+(a?a:"null")),$("div.fbSettings .unlinked").show()):$("div.fbSettings .unlinked").show())})};
GD.fb.facebookLink=function(a){GD.fb.facebookLogin(a,"/profile/socialUserLink.htm",GD.dom.getDocUrl())};
GD.fb.onFacebookLink=function(a){var b=!1;a&&"connected"===a.status&&(b=!0);b&&(GD.analytics.trackPartnerAuth("facebook",!0),jQuery.ajax({url:"/profile/socialUserLinkAjax.htm",data:{token:a.authResponse.accessToken,socialUid:a.authResponse.userID,socialNetwork:"FACEBOOK"},dataType:"json",success:function(a){a.redirectURL?GD.dom.clearWindowAndRedirect(a.redirectURL):a.successful?($("div.fbSettings .unlinked").hide(),$("div.fbSettings .linked").show()):(a.errorMessage||(a.errorMessage="Something went wrong while authorizing you with Facebook.  Could you try again?"),
alert(a.errorMessage))},error:function(){alert("Something went wrong while authorizing you with Facebook.  Could you try again?")}}))};GD.fb.facebookDelink=function(){GD.analytics.trackPartnerAuth("facebook",!1);FB.api({method:"Auth.revokeAuthorization"},function(){GD.fb.onFacebookDelink()})};
GD.fb.onFacebookDelink=function(){jQuery.ajax({url:"/profile/delinkSocialUserAjax.htm",data:{socialNetwork:"FACEBOOK"},dataType:"json",success:function(a){a.loggedIn&&!a.redirectURL?($("div.fbSettings .linked").hide(),$("div.fbSettings .unlinked").show()):(a.redirectURL||(a.redirectUrl="/index.htm"),GD.dom.clearWindowAndRedirect(a.redirectURL))},error:function(){GD.dom.clearWindowAndRedirect("/index.htm")}})};
GD.fb.checkPublishStreamPermission=function(a){var b=!1,c=10,e=setInterval(function(){if(0<c){c-=1;try{FB.api("/me/permissions",function(c){Logger.inspect(c,"inviteHandler permissions check");!c||!c.data?Logger.inspect({error:"Error retrieving permissions from Facebook",data:c.data||c}):(b=1===c.data[0].publish_stream,clearInterval(e),a(b))})}catch(d){Logger.inspect(d,"Bad permissions fetch")}}else clearInterval(e),a(b)},500)};
GD.fb.initFBWallPostInviteHandler=function(a,b){var c=new GD.fb.TrackingHandler("/track/ajax/invitationTracking.htm","FB_WALL_INVITE",function(a){GD.graph._updateProfileOnInvite(a)});return new GD.fb.FBWallPostInviteHandler({fbAuthToken:a,fbInviteParams:["link","picture","name","description","caption"],selector:"span.fbInviteBtn",$context:b,inviteTracker:c})};
GD.fb.FBWallPostInviteHandler=GD.Class({constructor:function(a){var b=this;b.fbAuthToken=a.fbAuthToken;if(a.fbInviteParams){var c=$("[data-fb-link]:first");if(!(1>c.length)){b.fbInviteParams={};for(var e=a.fbInviteParams,d=e.length,f,g=0,h;g<d;g++)f=e[g],(h=c.attr("data-fb-"+f).trim())&&(h=h.trim()),b.fbInviteParams[f]=h;(a.$context?$(a.$context):$(a.selector)).bind("click keypress",function(c){c=$(c.target).closest(a.selector);1===c.length&&b.invite(c);return!1});b.inviteTracker=a.inviteTracker;
b.hasPermission=!1;GD.fb.checkPublishStreamPermission(function(a){a&&(b.hasPermission=!0)})}}},setFbInvited:function(a){a.closest(".fbInviteAction").addClass("fbInviteSent fbInvited")},setFbDailyLimit:function(a){a.closest(".fbInviteAction").addClass("fbInviteSent fbDailyLimit")},setFbError:function(a){a.closest(".fbInviteAction").addClass("fbInviteSent fbError")},success:function(a){Logger.inspect(a,"invite success");a=a.data.$btn;this.setFbInvited(a);this.inviteTracker.trackWallPostInvite(a.attr("data-to-sid"))},
error:function(a){Logger.inspect(a,"invite error");var b=a.data.$btn,c=a.error.message;-1!=c.indexOf("#200")?this.setFbInvited(b):-1!=c.indexOf("#341")?this.setFbDailyLimit(b):this.setFbError(b);Logger.logToServer("facebook wall post failed: "+a.error.message+" [fr="+b.attr("data-from-gid")+",to="+b.attr("data-to-gid")+"]",Logger.ERROR)},handleResponse:function(a){!a||a.error?this.error(a):this.success(a)},invite:function(a){!0!==this.hasPermission?this.promptToSendWallPost(a):this.sendWallPost(a)},
promptToSendWallPost:function(a){Logger.debug("sending publish_stream permissions.request for wall post invite");var b=this,c={method:"permissions.request",perms:"publish_stream",display:"popup"};try{FB.ui(c,function(d){d.perms===c.perms&&(b.hasPermission=!0,b.sendWallPost(a))})}catch(e){Logger.debug(e.message)}},sendWallPost:function(a){var b=this,c=a.attr("data-to-sid"),e=b.fbAuthToken,d=b.fbInviteParams;Logger.debug("sending invite to Facebook sid: "+c);var f={url:"/"+c+"/feed?access_token="+e,
method:"post",params:d,$btn:a,callback:function(a){a||(a={error:"empty response"});a.data=f;b.handleResponse(a)}};try{FB.api(f.url,f.method,f.params,f.callback)}catch(g){Logger.error(g.message)}}});
GD.fb.initFbSendDialog=function(a){function b(a){d&&d.close();d=window.open("","Send_Message",e);d.location=c+a;d.focus()}var c="https://www.facebook.com/dialog/send?app_id="+a+"&link=https://apps.facebook.com/glassdoor&name=Sent via Glassdoor - it's an inside look at jobs and companies&description=Get access to salaries, reviews and your inside connections&redirect_uri="+document.location.protocol+"//"+document.location.host+"/Connections/sendMessage/complete.htm&to=",e="height=400, width=900, left=100, top=100, scrollbars=yes",
d;$(".fbSendDialogLink").bind("click keypress",function(){b($(this).attr("data-to"));return!1});return b};
GD.fb.FeedDialog=GD.Class({constructor:function(a){this.feedTracker=a},bind:function(a,b){a.bind("click keypress",b)},promptToFeed:function(a,b){GD.effects.occludePage();GD.fb.fbRootReset();var c=this;FB.ui({method:"feed",link:a.data("fbFeedLink"),picture:a.data("fbFeedPicture"),name:a.data("fbFeedName"),caption:a.data("fbFeedCaption"),description:a.data("fbFeedDescription")},function(e){GD.effects.revealPage();c.handleFbResponse(e,a,"_PREVIEW");"function"==typeof b&&b(e)})},postToFeed:function(a,
b){var c=this,e={link:a.data("fbFeedLink"),picture:a.data("fbFeedPicture"),name:a.data("fbFeedName"),caption:a.data("fbFeedCaption"),description:a.data("fbFeedDescription")};FB.api("/me/feed","post",e,function(d){c.handleFbResponse(d,a,"_AUTO");"function"==typeof b&&b(d)})},handleEmptyResponse:function(){Logger.error("No response from Facebook - post probably cancelled.")},handleFbResponse:function(a,b,c){if(a){Logger.inspect(a);var e=b.data("eventType");"NEW_USER_WALL_POST"===e&&(e+=c);a.eventType=
e;a.sid=b.data("sid");var d;a.error?d="fb wallpost failed: c="+a.error.code+",m="+a.error.message+" [fr="+b.data("gid")+"]":a.error_code&&a.error_msg&&(d="fb wallpost failed: c="+a.error_code+",m="+a.error_msg+" [fr="+b.data("gid")+"]");d?this.handleFbError(d):this.handleFbSuccess(a)}else this.handleEmptyResponse()},handleFbError:function(a){Logger.error("GD.fb.FeedDialog: "+a);Logger.logToServer(a,LOGGER.ERROR)},handleFbSuccess:function(a){this.feedTracker.trackWallPostFeed(a.sid,a.eventType)}});
GD.fb.initFbFeedDialogLink=function(){var a=new GD.fb.TrackingHandler("/track/ajax/invitationTracking.htm"),b=new GD.fb.FeedDialog(a);b.bind($("a.fbFeedDialogLink"),function(){b.promptToFeed($(this));return!1});return b};GD.fb.initUserAlertConnections=function(){$("#UserAlertContinueBtn,#GenericPopupOuterFrame .closeBox,#UserAlertSocialNetworkLinked .closeBox").on("click keypress",function(){GD.userAlert.closePopup()})};window.GD=window.GD||{};GD.fb=GD.fb||{};GD.fb.INCLUDE_FRIENDS_AJAX_URL="/member/ajax/includeFriendsAjax.htm";GD.fb.INCLUDE_FRIENDS_TRACKING_AJAX_URL="/track/ajax/invitationTracking.htm";GD.fb.INCLUDE_FRIENDS_THROTTLING_AJAX_URL="/track/ajax/invitationThrottling.htm";GD.fb.INCLUDE_FRIENDS_COMPLETE_CHECK_PACING_MILLIS=500;GD.fb.MAX_FRIEND_LOAD_ATTEMPTS=40;GD.fb.NETWORK_ID_PREFIX="Network-";
GD.fb.initIncludeFriendsPage=function(a,b){var d=$("body").is(".mobile"),c=$("div#IncludeFriends"),e=c.data("maxNetworksShown"),f=new GD.fb.IncludeFriendsView(d,a),c=$("div.network",c);f.initNetworks(c);var c=new GD.fb.TrackingHandler(GD.fb.INCLUDE_FRIENDS_TRACKING_AJAX_URL,"FB_APP_REQUEST"),c=new GD.fb.FBAppRequestHandler(d,c),g=null;a&&f.updateProgressBar();b||(g=new GD.fb.InviteFriendsLoader(a,b,e,GD.fb.INCLUDE_FRIENDS_AJAX_URL,GD.fb.INCLUDE_FRIENDS_COMPLETE_CHECK_PACING_MILLIS,GD.fb.MAX_FRIEND_LOAD_ATTEMPTS));
var h=new GD.fb.IncludeFriendsController(d,c,g,f,a,b);$("#SkipPage .loaded a").on("click",function(a){h.onNextButton(a)});$("#IncludeFriends div.friendAddedBox img.closeBox").on("click",function(a){h.closePromoBox(a)})};
GD.fb.IncludeFriendsController=GD.Class({constructor:function(a,b,d,c,e,f){var g=this;g.isMobile=a;g.isAllFriendsLoaded=e;g.isFriendsLoaded=e;g.isFinishedLoading=f;g.requestHandler=b;g.friendsLoader=d;g.view=c;g.$includeFriends=$("div#IncludeFriends");g.$includeFriends.data("endGame",!1);b.bind("requestComplete",function(a){g.handleRequestComplete(a)});b.bind("requestCancel",function(){g.view.updateProgressBar()});c.bind("sendRequest",function(a){g.handleSendRequest(a)});e||(d.bind("friendsLoaded",
function(a){g.handleFriendsLoadedFromGlassdoor(a)}),GD.fb.getFriends(function(a,b){g.handleAllFriendsLoaded(a,b)},"id,name,installed,picture"));f||(d.bind("finishedLoading",function(){g.view.handleFinishedLoading()}),d.poll(f))},handleAllFriendsLoaded:function(a,b){if(!this.isAllFriendsLoaded&&a&&(this._getThrottlingList(a),this.view.initAllFriends(a),this.isAllFriendsLoaded=!0,this.isFriendsLoaded))this.onAllNetworksLoaded(!0);!this.isMobile&&a&&a.length?this._showActivitySharingDialog(a):b&&Logger.warn('handleAllFriendsLoaded got error: "'+
b+'". Probably because access token expired.')},handleFriendsLoadedFromGlassdoor:function(a){if(!this.isFriendsLoaded){var b=a&&0<a.invitableFriendsCount;if(!this.isAllFriendsLoaded&&(a.friends&&a.friends.length)&&(this.view.initAllFriends(a.friends,a.facepileFriends,a.friendsUsingGdCount),this.isAllFriendsLoaded=!0,this.isFriendsLoaded))this.onAllNetworksLoaded(!0);this.isFriendsLoaded=!0;if(b)this.view.initFriends(a,this.isAllFriendsLoaded);else this.onPageComplete(!0);this.onAllNetworksLoaded(b)}},
onAllNetworksLoaded:function(a){this.friendsLoader.setFinishedLoading();this.view.onAllNetworksComplete(a)},handleSendRequest:function(a){this.requestHandler.sendRequest(a,this.view)},handleRequestComplete:function(a){var b=this.$includeFriends.data("endGame"),d=!0;if(a&&(d=this.view.updateInvitedFriends(a))){var c=0;this.view.updateProgressBar(!0,!0);this.isMobile||(c=$("#"+GD.fb.NETWORK_ID_PREFIX+a.networkId),c=$("div.networkFriendsList div.notInvited",c),c=$("input:checked",c).length);if(0<c)this.view.doAppRequests(this.view.$currentInviteNetwork,
!1);else if(!b)this.view.onInvitesComplete()}if(a&&!d)this.onPageComplete(b);else if(b)this.onPageComplete(!a)},onNextButton:function(a){GD.analytics.trackEvent(this.view.SOCIAL_CLICKS_CATEGORY,"next-button");a.preventDefault();this.onPageComplete()},closePromoBox:function(a){var b=$(a.target).closest("div.promoBox");b.hide("blind",400,function(){b.remove()})},onPageComplete:function(a){var b=this.$includeFriends.data("facebookHosted"),d=this.$includeFriends.data("newUser"),c=this.$includeFriends.data("endGame"),
e;if(c)a&&(e=!d||f||b?this.$includeFriends.data("nextUrl"):this.$includeFriends.data("nextUrlWithoutInvitesOnGd"));else{var f=0<this.$includeFriends.data("invitedFriendsCount");a||f||!d?e=this.$includeFriends.data("nextUrl"):!c&&d&&!this.isMobile?(this.$includeFriends.data("endGame",!0),this.view.doAppRequests($("#Network-All"),!0,!0)):e=b?this.$includeFriends.data("nextUrl"):this.$includeFriends.data("nextUrlWithoutInvitesOnGd")}e&&(this.view.updateProgressBar(!1),GD.dom.loadUrl(e,"_top"))},_getThrottlingList:function(a){var b=
this;if(a.length){for(var d=GD.fb.INCLUDE_FRIENDS_THROTTLING_AJAX_URL,c="",e=0;e<a.length;++e)0<e&&(c+=","),c+=a[e].id;jQuery.ajax({type:"POST",url:d,data:{sourceIds:c},success:function(a){b._onThrottlingListComplete(a)},error:function(a,b,c){Logger.error("Request failed to URL ("+d+').  Error thrown is "'+c+'"')}})}},_onThrottlingListComplete:function(a){a&&(a.throttledSourceIds&&a.throttledSourceIds.length)&&this.view.setThrottledSourceIds(a.throttledSourceIds);return!0},_showActivitySharingDialog:function(a){if(this.$includeFriends.data("showActivitySharingDialog")){var b=
this.$includeFriends.data("friendsUsingGdCount");b&&GD.fb._showActivitySharingDialog(b,a)}}});
GD.fb.InviteFriendsLoader=GD.Class({constructor:function(a,b,d,c,e,f){this.ajaxUrl=c;this.attemptIntervalMs=e;this.maxAttempts=f;this.isFriendsLoaded=a;this.isFinishedLoading=b;this.maxNetworksShown=d},setFinishedLoading:function(){this.isFinishedLoading=!0;this.onFinishedLoading()},onFriendsLoaded:function(a){Logger.inspect(a,"GD.fb.InviteFriendsLoader.onFriendsLoaded() expected to be re-defined by the controller via 'bind'")},onFinishedLoading:function(){Logger.warn("GD.fb.InviteFriendsLoader.onFinishedLoading() expected to be re-defined by the controller via 'bind'")},
bind:function(a,b){if("function"!=typeof b)throw Error("FBAppRequestHandler#bind() expects function argument");switch(a){case "friendsLoaded":this.onFriendsLoaded=b;break;case "finishedLoading":this.onFinishedLoading=b;break;default:throw Error("InviteFriendsLoader#bind() unexpected method: '"+a+"'");}},poll:function(){var a=this;jQuery.ajax({url:a.ajaxUrl,dataType:"json",data:{friendsNeeded:!a.isFriendsLoaded,maxNetworks:a.maxNetworksShown},success:function(b){b||Logger.error("No data returned for GD.fb.InviteFriendsLoader.poll()");
a.process(b)},error:function(b,d,c){Logger.inspect(c,"GD.fb.InviteFriendsLoader.poll() error: "+d);a.process(null)}})},process:function(a){var b=this;a&&(a.friendsLoaded&&!b.isFriendsLoaded)&&(b.isFriendsLoaded=a.isFriendsLoaded,b.onFriendsLoaded(a));a&&(a.finishedLoading&&!b.isFinishedLoading)&&(b.isFinishedLoading=!0,b.onFinishedLoading());if(0>=b.maxAttempts){if(b.isFriendsLoaded||(b.isFriendsLoaded=!0,b.onFriendsLoaded()),!b.isFinishedLoading)b.isFinishedLoading=!0,b.onFinishedLoading()}else b.isFinishedLoading||
(b.maxAttempts-=1,GD.wait(b.attemptIntervalMs).then(function(){b.poll()}))}});
GD.fb.IncludeFriendsView=GD.Class({INCLUDE_BTN_ID_PREFIX:"IncludeBtn-",FRIEND_CHK_ID_PREFIX:"Friend-",FACEBOOK_FRIENDS_SUFFIX:"All",SOCIAL_CLICKS_CATEGORY:"social-clicks",MAX_NUMBER_OF_LOGO_FRIENDS:5,PROGRESS_FLOATING_GAP:30,PROGRESS_BAR_ANIMATION_TIME:600,HEADER_FLOATING_TIMEOUT:250,MAX_FACEPILE_FRIENDS:8,constructor:function(a,b){this.isMobile=a;this.isFriendsLoaded=b;this.$includeFriends=$("div#IncludeFriends");this.maxNetworksShown=this.$includeFriends.data("maxNetworksShown");this.batchMaximum=
this.$includeFriends.data("fbBatchMaximum");this.$includeFriends.data("invitedFriendsCount",0);this.$currentInviteNetwork=this.throttledSourceIds=null},initNetworks:function(a){var b=this;if(!b.isMobile)$(".toggle",a).not(".allUsers").on("click",function(){var a=$(this).closest("div.network"),a=$(".networkFriendsList",a);b.toggleFriendsList(a)});a=$(".listAction.gd-btn",a);a.each(function(){var a=$(this),c=a.closest("div.network").data("networkId");a.attr("id",b.INCLUDE_BTN_ID_PREFIX+c)});a.bind("click keypress",
function(a){b.doAppRequests($(this).closest("div.network"),!0);a.preventDefault()})},doAppRequests:function(a,b){this.$currentInviteNetwork=a;var d=a.attr("id").split("-")[1],c=$("div.networkFriendsList",a),c=$("div.notInvited",c),e=$("input:checked",c),f=e.length;if(1>f)alert("Please select some friends to invite from "+$(".title h3",a).text()+".");else{var g=GD.dom.getDocUrl(),c="new_user";~g.indexOf("utm_source=")&&(c=g.split("utm_source=")[1].split("&")[0]);g="ADD_NEXT_BATCH";if(b){this.isMobile||
GD.effects.occludePage(null,null,null,null,0.85);this.updateProgressBar(!0);var h=a.data("networkType"),j="include-them-",i=a.data("networkName");i||(i="<unknown>");switch(h){case "FACEBOOK_FRIENDS":j+="all";g="ADD_ALL_FRIENDS";break;case "GRAPH_EMPLOYER":j+="work";g="ADD_WORK_FRIENDS";break;case "GRAPH_SCHOOL":j+="school";g="ADD_SCHOOL_FRIENDS";break;default:j+="unknown-type"}GD.analytics.trackEvent(this.SOCIAL_CLICKS_CATEGORY,j,i)}i=0;h=[];for(j=[];i<f;){var k=$(e[i]).closest("div.friend"),l=k.data("sid");
if(this.throttledSourceIds&&0<=this.throttledSourceIds.indexOf(l))this._updateInvitedFriend(k);else if(j[j.length]=k.data("gid"),h[h.length]=l,h.length===this.batchMaximum)break;i+=1}i=this.$includeFriends.data("endGame");e=a.data("friendsCount");f=a.data("invitedFriendsCount");0<f?(i=a.data("fbTitle2"),i=i.replace("{invites}",GD.i18n.fmtNum(f)).replace("{potential}",GD.i18n.fmtNum(e))):i=i?a.data("fbTitleEndGame"):a.data("fbTitle");e=a.data("fbMessage");~e.indexOf(this.FACEBOOK_FRIENDS_COUNT_TEMPLATE)&&
(e=e.replace(this.FACEBOOK_FRIENDS_COUNT_TEMPLATE,this.$includeFriends.data("invitableFriendsCount")),a.data("fbMessage",e));Logger.info("GD.fb.IncludeFriendsController:doAppRequests: sending request to FB");this.onSendRequest({networkId:d,toGids:j,toSids:h,message:a.data("fbMessage"),title:i,entry:c,triggerButton:g})}},setThrottledSourceIds:function(a){this.throttledSourceIds=a},onSendRequest:function(){Logger.warn("friendsView.onSendRequest() expected to be re-defined by the controller")},bind:function(a,
b){if("function"!=typeof b)throw Error("IncludeFriendsView#bind() expects function argument");switch(a){case "sendRequest":this.onSendRequest=b;break;default:throw Error("IncludeFriendsView#bind() unexpected method: '"+a+"'");}},initFriends:function(a,b){if(a&&0<a.invitableFriendsCount){var d=a.networksWithFriends;this.$includeFriends.data("invitableFriendsCount",a.invitableFriendsCount);this.$includeFriends.data("friendsUsingGdCount",a.friendsUsingGdCount);if(!b){var c=$("#"+GD.fb.NETWORK_ID_PREFIX+
this.FACEBOOK_FRIENDS_SUFFIX);this.addAllFriendsLogo(a.facepileFriends,friendsUsingGdCount);this.finalizeNetworkActions(c,!0)}for(c=0;c<d.length;++c)this.addNetworkFriends(d[c],!1);this.finalizeNetworks()}},initAllFriends:function(a,b,d){var c=0;d||(d=0);if(b)c=a.length;else if(a){for(var b=[],e=[],c=0;c<a.length;c++)d=a[c],d.installed?b[b.length]=d:e.push(d);c=e.length;d=b.length;a=e}this.$includeFriends.data("invitableFriendsCount",c);this.$includeFriends.data("friendsUsingGdCount",d);if(0<d){if(!b){b=
[];for(e=0;e<a.length;e++)a[e].installed&&(b[b.length]=a[e])}this.addAllFriendsLogo(b,d)}b=$("#"+GD.fb.NETWORK_ID_PREFIX+this.FACEBOOK_FRIENDS_SUFFIX);this.finalizeNetworkActions(b,!0);b={};b.invitableFriendsCount=c;b.friends=a;this.addNetworkFriends(b,!0);0<c&&this.updateProgressBar(!1)},addNetworkFriends:function(a,b){if(!a.friends||0>a.friends.length)return Logger.error("error adding network friends"),!1;var d=b?this.FACEBOOK_FRIENDS_SUFFIX:a.sourceId,c=$("#"+GD.fb.NETWORK_ID_PREFIX+d),e=$(".toggle",
c),f=0,g=a&&0<a.invitableFriendsCount;networkName=$(".title h3",c).text().trim();g&&(c.data("friendsCount",a.invitableFriendsCount),f=GD.i18n.fmtNum(a.invitableFriendsCount),g=c.data("fbMessage"),g=g.replace(this.FACEBOOK_FRIENDS_COUNT,this.$includeFriends.data("invitableFriendsCount")),c.data("fbMessage",g));b||$(".count",e).html(f);1==a.friends.length&&$(".plural",e).hide();c=$(".networkFriendsList",c);this.addFriendsList(d,c,a.friends);e.removeClass("hidden")},addAllFriendsLogo:function(a,b){for(var d=
$("#"+GD.fb.NETWORK_ID_PREFIX+this.FACEBOOK_FRIENDS_SUFFIX),c=$("div.logo",d),e=Math.min(a.length,this.MAX_NUMBER_OF_LOGO_FRIENDS),f=0;f<e;f++){var g=a[f],h=GD.fb.getFriendAvatar(g);h&&(g.name&&h.attr("title",g.name),$(".tinyAvatars",c).append(h))}e=$(".toggle",d);c=$(".count",e);e=$(".message",e);!this.isMobile&&0<e.length&&(f=e.data("predicate"),g=1!==a.length?e.data("subject"):e.data("singular"),c.html(b).show().removeClass("hidden"),e.html(g+f));d.removeClass("emptyNetwork")},addFriendsList:function(a,
b,d){var c=b.closest("div.network"),e=$("#NetworkFriendsListTmpl .friendTmpl").clone(!0),f=null,g=!1;e.removeClass("friendTmpl");c.data("uninvitedFriendsCount",d.length);for(var c=0,h,j,i,k,l;c<d.length;++c)if(i=d[c],j=i.sourceId||i.id,k=this.FRIEND_CHK_ID_PREFIX+a+"-"+j,h=e.clone(),h.data({sid:j,gid:i.id}),h.attr("sid",j),(l=0===c%2)?(f=$("<div class='row'>"),g&&f.addClass("oddRow"),h.addClass("firstInRow")):g=!g,j=$("label",h),j.attr("for",k),$(":checkbox",h).attr("id",k),$("span",j).text(i.name),
f.append(h),!l)b.append(f),f.append("<div class='clear'></div>"),f=null;f&&(f.append("<div class='clear'></div>"),b.append(f))},toggleFriendsList:function(a){if(!a.is(":animated")){var b=a.is(":visible");a.closest(".network");b?a.hide("blind",null,"fast"):a.show("blind",null,"fast")}},handleFinishedLoading:function(){this.finishedLoading=!0},updateProgressBar:function(a,b){var d=$("#ProgressBarHeader"),c=$("div.progressBar",d),e=$(".contents",c),f=this.$includeFriends.data("friendsUsingGdCount"),
g=this.$includeFriends.data("invitedFriendsCount"),h=this.$includeFriends.data("invitableFriendsCount");if(0<h&&GD.isNumber(f)&&GD.isNumber(g)){h=f+h;g=100*((f+g)/h);g=99<g?100:0<g&&1>g?1:Math.floor(g);f=100*(f/h);0<f&&1>f&&(f=1);this.totalInvitedFriendsPercent=g-f;$("div.existingFriends",c).css("width",f+"%");f=$("#Network-All .action .listActionAll .btnLabel");this.isMobile&&(f=f.closest(".action").find(".ui-btn-text"));f.length&&(h=f.html(),h=h.replace(/\d+/,100-Math.floor(g)),f.html(h));0<this.totalInvitedFriendsPercent&&
(f=$("div.newFriends",c),f.show(),f.animate({width:this.totalInvitedFriendsPercent+"%"},this.PROGRESS_BAR_ANIMATION_TIME));$("p.msg",e).hide();0>=g?$("p.percent0",e).show():20>=g?(f=$("p.percentTo20",e),$("span.num",f).html(g),f.show()):99<g?$("p.percent100",e).show():(f=95<g?$("p.percentOver95",e):$("p.floatingPercentage",e),$("span",f).html(g),f.show());if(0===$("div.tick:visible:first",c).length){g=$(".tickTmpl",e);f=e.width();for(h=1;10>h;h++){var j=Math.floor(f*0.1*h),i=g.clone();i.css("left",
j);i.removeClass("hidden tickTmpl");e.prepend(i)}}c.is(":hidden")&&c.show();b||this.positionProgressBar(a,d)}},positionProgressBar:function(a,b,d){var c=this;if(!c.isMobile){if(!b||0===b.length)b=$("#ProgressBarHeader");if($("div.progressBar",b).is(":visible"))if(a){var e;d&&d.isChildOf("body")&&(e=d.offset());if(e&&0<=e.top&&0<=e.left){e=d.offset();var f=e.top-(b.height()+c.PROGRESS_FLOATING_GAP)+5,d=e.left+(d.width()-b.width())/2;if(c.headerTop!=f||c.headerLeft!=d)if(0<f){if(b.parent().is("div.headerHolder")?
($("body").append(b),b.css({zIndex:5E3,top:f,left:d})):b.css({top:f,left:d}),c.headerTop=f,c.headerLeft=d,c.floatingHeaderPositionTimeout)clearTimeout(c.floatingHeaderPositionTimeout),c.floatingHeaderPositionTimeout=null}else b.parent().is("body")&&(b.appendTo(".headerHolder",c.$includeFriends),b.css({zIndex:"auto",top:0,left:0})),c.headerTop=-99999,c.headerLeft=-99999}else{var g=null,d=$("body #fb-root div.fb_dialog iframe.FB_UI_Dialog");if(1<d.length)for(f=0;f<d.length;f++){var h=$(d[f]);e=h.offset();
if(0<=e.top&&0<=e.left){g=h;break}}else g=d;c.headerTop=-99999;c.headerLeft=-99999;if(!g||!g.length)g=null;c.floatingHeaderPositionTimeout=GD.wait(c.HEADER_FLOATING_TIMEOUT).then(function(){c.positionProgressBar(a,b,g)})}}else if(c.floatingHeaderPositionTimeout&&(clearInterval(c.floatingHeaderPositionTimeout),c.floatingHeaderPositionTimeout=null),d=$(".headerHolder",c.$includeFriends),!b.isChildOf(d))b.appendTo(d),b.css({zIndex:"auto",top:0,left:0})}},finalizeNetworks:function(){var a=this;$networksContainer=
$("#IncludeFriendsNetworks .networks",a.$includeFriends);var b=[];$("div.network",$networksContainer).each(function(){var c=$(this);if(0>=c.data("friendsCount")){var d=$(".title h3",c).text().trim();Logger.debug("Removing empty network: "+d);c.remove()}else c.hide(),b.push({network:c,count:c.data("friendsCount")}),a.finalizeNetworkActions(c)});if(0<b.length){b.sort(function(a,b){return b.count-a.count});0<b.length&&$(".networksSeparator").fadeIn(250);for(var d=0;d<b.length;d++){var c=b[d].network;
$networksContainer.append(c);c.fadeIn(250).removeClass("hidden")}}},finalizeNetworkActions:function(a,b){b&&(a.fadeIn(250).removeClass("hidden"),this.onAllNetworksComplete(0<this.$includeFriends.data("invitableFriendsCount")));$(".action .loading",a).hide();$(".action .notComplete",a).show()},onAllNetworksComplete:function(a){if(a){var b=$("#SkipPage .loaded");b.hide();$("#SkipPage .notLoaded").fadeOut(function(){b.fadeIn()})}},updateInvitedFriends:function(a){var b=this,a=a.toSids,d=$("#IncludeFriendsNetworks div.network",
b.$includeFriends),c=$("div.networkFriendsList",d),e=b.$includeFriends.data("invitedFriendsCount");b.$includeFriends.data("invitedFriendsCount",e+a.length);for(var e=0,f;e<a.length;++e)f=$("div.friend[sid="+a[e]+"]",c),f.length&&f.each(function(){b._updateInvitedFriend($(this))});var g=!1;d.each(function(){0<$(this).data("uninvitedFriendsCount")&&(g=!0)});if(!g)b.onInvitesComplete();return g},_updateInvitedFriend:function(a){a.removeClass("notInvited").addClass("invited");$(":checkbox",a).prop("disabled",
!0);a=a.closest("div.networkFriendsList").closest(".network");a.data("invitedFriendsCount",a.data("invitedFriendsCount")+1);var b=a.data("uninvitedFriendsCount")-1;a.data("uninvitedFriendsCount",b);0>=b&&this.showCompletedNetwork(a)},onInvitesComplete:function(){this.floatingHeaderPositionTimeout&&(clearInterval(this.floatingHeaderPositionTimeout),this.floatingHeaderPositionTimeout=null);this.updateProgressBar(!1);this.isMobile||GD.effects.revealPage();this.$currentInviteNetwork=null},showCompletedNetwork:function(a){var b=
$("div.action",a),a=$(".notComplete",b);a.is(":visible")&&!a.is(":animated")&&$(".notComplete",b).fadeOut(400,function(){$(".complete",b).fadeIn(400)})}});
GD.fb.FBAppRequestHandler=GD.Class({constructor:function(a,b){this.isMobile=a;this.tracker=b;this.$includeFriends=$("div#IncludeFriends")},onRequestComplete:function(){Logger.warn("GD.fb.FBAppRequestHandler.onRequestComplete(): expected to be re-defined by the controller via 'bind'")},onRequestCancel:function(){Logger.warn("GD.fb.FBAppRequestHandler.onRequestCancel(): expected to be re-defined by the controller via 'bind'")},bind:function(a,b){if("function"!=typeof b)throw Error("GD.fb.FBAppRequestHandler.bind() expects function argument");
switch(a){case "requestComplete":this.onRequestComplete=b;break;case "requestCancel":this.onRequestCancel=b;break;default:throw Error("FBAppRequestHandler#bind() unexpected method: '"+a+"'");}},sendRequest:function(a,b){var d=this;d.isMobile||GD.fb.fbRootReset();var c=!document.location.port||"80"==document.location.port?"dialog":"popup";d.isMobile&&(c=null);FB.ui({display:c,method:"apprequests",new_style_message:!0,message:a.message,title:a.title,to:""+a.toSids},function(c){c&&(c.networkId=a.networkId,
c.toGids=a.toGids,c.toSids=a.toSids,c.entry=a.entry,c.triggerButton=a.triggerButton);d.handleResponse(c,b)})},handleResponse:function(a,b){Logger.debug("server response recieved");a&&!a.error&&!a.error_code&&!a.error_msg?(this.tracker.trackAppRequest(a),this.onRequestComplete(a)):this.$includeFriends.data("endGame")?(this.onRequestCancel(a),this.onRequestComplete(a)):(a?this.error(a):Logger.debug("GD.fb.FBAppRequestHandler.handleResponse(): fbResponse is null -- probably cancelled"),b.onInvitesComplete())},
error:function(a){Logger.inspect(a,"GD.fb.FBAppRequestHandler.error(): app request error");a="fb apprequest failed: c="+a.error_code+",m="+a.error_msg+" [fr="+response.authResponse.userID+", to="+a.toSids+"]";Logger.error("GD.fb.FBAppRequestHandler.error(): "+a);Logger.logToServer(a,LOGGER.ERROR)}});GD.fb.SHOW_ACTIVITY_URL="/member/ajax/publishActivateOpenGraphAjax.htm";
GD.fb._showActivitySharingDialog=function(a,b){var d;d=$("#ActivitySharingDlg").clone();d.removeAttr("id").removeClass("hidden");var c=d.data("maxAvatars"),c=Math.min(c,a);$("span.numFriends",d).html(GD.i18n.fmtNum(a));GD.aug.addDynamicForIds(d);if(b&&b.length)for(var e=0,f=0;f<c&&e<b.length;e++){var g=b[e];if(g.installed){var h=GD.fb.getFriendAvatar(g);h&&(f==c-1&&h.addClass("last"),g.name&&h.attr("title",g.name),$(".avatars",d).append(h));f+=1}}d.find("button.gd-btn").on("click",function(){GD.fb._onCloseActivitySharingDialog(d);
GD.dlgManager.closeAllDialogs()});GD.dlgManager.addCustomDialog({dialogBody:d,dialogWidth:480,occlude:!0,draggable:!1,closeable:!1,onClose:function(){GD.fb._onCloseActivitySharingDialog(d)}})};GD.fb._onCloseActivitySharingDialog=function(a){a=$("input",a).prop("checked");GD.analytics.trackEvent("social-clicks",a?"og-continue-checked":"og-continue-unchecked");jQuery.ajax({url:GD.fb.SHOW_ACTIVITY_URL,data:{publishToFeed:a}})};window.GD=window.GD||{};GD.fb=GD.fb||{};
GD.fb.init=function(b,a){window.fbAsyncInit=function(){Logger.info("window.fbAsyncInit called.");FB.init({appId:b,oauth:!0,status:!0,cookie:!0,xfbml:!0,frictionlessRequests:!0,useCachedDialogs:!0,channelUrl:a});Logger.info("FB.init called.");window.fbAsyncInit=null};GD.dom.loadScript(document.location.protocol+"//connect.facebook.net/en_US/all.js",function(){GD.fb&&GD.fb.initAutoResize&&GD.fb.initAutoResize();GD&&(GD.runOnFacebookLoad&&jQuery.isFunction(GD.runOnFacebookLoad.run))&&GD.runOnFacebookLoad.run()})};
GD.fb.onInitialized=function(b){"function"==typeof window.fbAsyncInit?setTimeout(function(){GD.fb.onInitialized(b)},50):"function"===typeof b&&b()};GD.fb.LOGIN_TIMEOUT=1E4;
GD.fb.getFbLoginStatus=function(b,a){function c(a){clearTimeout(e);d||(a&&a.status?(Logger.info('FB.getLoginStatus returned "'+a.status+'"'),b(a.status,a)):(Logger.info("FB.getLoginStatus returned null"),b(null,a)))}Logger.info("GD.fb.getFbLoginStatus() enter");if("function"!==typeof b)Logger.fatal("GD.fb.getFbLoginStatus() required callback function param.");else{var d=!1,e=setTimeout(function(){d=!0;Logger.info("FB.getLoginStatus timed out");b(null)},GD.fb.LOGIN_TIMEOUT);GD.fb.onInitialized(function(){FB.getLoginStatus(c,
a)});Logger.info("GD.fb.getFbLoginStatus() exit")}};
GD.fb.getFriends=function(b,a,c,d){"function"!==typeof b&&Logger.error("GD.fb.getFriends should be called with a handler function.");a||(a="id,name");"number"!==typeof c&&(c=5E3);GD.fb.getFbLoginStatus(function(e,f){if("connected"==e){var g="/me/friends?fields="+a+"&limit="+c;f&&(f.authResponse&&f.authResponse.accessToken)&&(g+="&access_token="+f.authResponse.accessToken);d&&"number"===typeof d&&(g+="&offset="+d);FB.api(g,function(a){var c;a.error&&(c='Got FB error "'+a.error.message+'" for URL "'+
g);b(a.data,c)})}else b(null,"not connected")})};GD.fb.authLoginSubscribed=!1;GD.fb.FB_LOGIN_BTN_OK="fbLoginBtnOK";
GD.fb.initLoginButtons=function(b,a,c){GD.fb.authLoginSubscribed||(FB.Event.subscribe("auth.login",function(){GD.fb._onFacebookLogin(null,a,c)}),GD.fb.authLoginSubscribed=!0);$(".fbSigninBtnLink, .facebookLoginBtn, .facebookJoinNowBtn, .fbSignInPrompt").not("."+GD.fb.FB_LOGIN_BTN_OK).on("click",function(d){var e=$(d.target).closest("span.fbLoginBtnOK");e.length===0&&(e=$(d.target));if(d=e.data("userOriginHook")){d="userOriginHook="+d;if(a){a=a.indexOf("?")<0?a+"?":a+"&";a=a+d}if(c){c=c.indexOf("?")<
0?c+"?":c+"&";c=c+d}}GD.fb.facebookLogin(b,a,c)}).addClass(GD.fb.FB_LOGIN_BTN_OK)};GD.fb.facebookLogin=function(b,a,c){try{GD.fb._doFacebookLoginPopup(b,a,c)}catch(d){Logger.error("GD.fb.facebookLogin: 'FB.getLoginStatus' threw message: "+d)}};GD.fb._doFacebookLoginPopup=function(b,a,c){FB.login(function(b){GD.fb._onFacebookLogin(b,a,c)},{scope:b})};
GD.fb._onFacebookLogin=function(b,a,c,d,e){"undefined"===typeof d&&(d=!0);"undefined"===typeof e&&(e=null);var f=!1;b&&b.authResponse&&("connected"===b.status?f=!0:"not_authorized"===b.status&&(f=!0));f&&(GD.analytics.trackPartnerAuth("facebook",!0),a=0>a.indexOf("?")?a+"?":a+"&",a+="socialNetwork=FACEBOOK&token="+b.authResponse.accessToken+"&socialUid="+b.authResponse.userID+"&signedRequest="+b.authResponse.signedRequest+"&midTx=false&userOrigin=FACEBOOK_CONNECT",c&&(a+="&u="+encodeURIComponent(c)),
d?GD.dom.clearWindowAndRedirect(a):jQuery.isFunction(e)&&e(a))};
GD.fb.TrackingHandler=GD.Class({SOCIAL_INVITATION_CATEGORY:"social-invitation",constructor:function(b,a,c,d){this.trackingUrl=b;this.eventType=a;this.success="function"==typeof c?c:this.success;this.error="function"==typeof d?d:this.error},success:function(b){Logger.debug("GD.fb.TrackingHandler: tracking success: "+b)},error:function(b){Logger.debug("GD.fb.TrackingHandler: tracking error: "+b)},trackAppRequest:function(b){var a=b.request,c=b.toSids;if("string"==typeof a||"number"==typeof a)if("string"==
typeof c&&(c=c.split(",")),"[object Array]"!={}.toString.call(c))Logger.error("GD.fb.TrackingHandler: Expected 'toSids' field in FB response to be an array.");else{for(var a="invitationType="+this.eventType,d=0;d<c.length;++d)a+="&sourceId="+c[d];b.entry&&(a+="&entry="+b.entry);b.triggerButton&&(a+="&triggerButton="+b.triggerButton);GD.analytics.trackEvent(this.SOCIAL_INVITATION_CATEGORY,this.eventType,null,c.length);jQuery.ajax({url:this.trackingUrl,type:"POST",data:a,success:function(a){Logger.debug("GD.fb.TrackingHandler: trackAppRequest success: "+
a)},error:function(a,b,c){Logger.debug("GD.fb.TrackingHandler: trackAppRequest error: "+c)}})}else Logger.error("GD.fb.TrackingHandler: Expected 'data.request' field in FB response to be a string or number.")},trackWallPostInvite:function(b){var a=this;GD.analytics.trackEvent(a.SOCIAL_INVITATION_CATEGORY,a.eventType);jQuery.ajax({url:a.trackingUrl,type:"POST",dataType:"json",data:{invitationType:a.eventType,sourceId:b},success:function(c){c.sourceId=b;c.success?a.success(c):a.error(c)},error:function(c,
d,e){a.error({sourceId:b,textStatus:d,errorThrown:e})}})},trackWallPostFeed:function(b,a){GD.analytics.trackEvent(this.SOCIAL_INVITATION_CATEGORY,a);jQuery.ajax({url:this.trackingUrl,type:"POST",dataType:"json",data:{invitationType:a,sourceId:b},success:function(a){Logger.debug("GD.fb.TrackingHandler: trackWallPostFeed success: "+a)},error:function(a,b,e){Logger.debug("GD.fb.TrackingHandler: trackWallPostFeed error: "+e)}})}});
GD.fb.fbRootReset=function(){var b=$("#fb-root").get(0);b.style.position="absolute";b.scrollIntoView(!1);b.style.position="fixed"};GD.fb.getFriendAvatar=function(b){var a,c=b.avatarSqThumbUrl;if(!c)try{c=b.picture.data.url}catch(d){Logger.info("failed to retrive picture data for Facebook friend: "+b.id+", "+b.name)}"string"===typeof c&&(a=$("<img>").addClass("avatar").attr("src",c));return a};window.GD=window.GD||{};GD.marketo=GD.marketo||{};GD.marketo.registerEvent=function(a){if(window.Munchkin)try{mktoMunchkin("899-LOT-464"),mktoMunchkinFunction("clickLink",{href:a})}catch(b){Logger.warn("GD.marketo.registerEvent",b)}else GD.dom.loadScript("http://munchkin.marketo.net/munchkin.js",function(){GD.marketo.registerEvent(a)})};window.GD=window.GD||{};GD.graph=GD.graph||{};GD.graph.BASIC_INFO_UPDATE_URL="/Resume/ajax/editGraphUser.htm";GD.graph.EDU_INSERT_URL="/Resume/ajax/editEducation_insert.htm";GD.graph.EDU_UPDATE_URL="/Resume/ajax/editEducation_update.htm";GD.graph.EDU_DELETE_URL="/Resume/ajax/editEducation_delete.htm";GD.graph.JOB_INSERT_URL="/Resume/ajax/editWorkHistory_insert.htm";GD.graph.JOB_UPDATE_URL="/Resume/ajax/editWorkHistory_update.htm";GD.graph.JOB_DELETE_URL="/Resume/ajax/editWorkHistory_delete.htm";
GD.graph.initResume=function(){GD.site.init()};GD.graph.initConnections=function(){GD.site.init()};GD.graph.initBasicInfo=function(a){a&&(a=$(".basicInfo .basicInfoRecord"),$("input[name=locationName]",a),$("input[name=locationId]",a),GD.graph._initBasicInfoCitySelect(),a=$("div.basicInfo.historySection div.historyRecord"),GD.graph._initActionButtons(a))};GD.graph.initWorkHistory=function(a){a&&(GD.graph._initEmployerAutocomplete(),$records=$("div.workHistory div.historyList div.historyRecord"),GD.graph._initActionButtons($records))};
GD.graph.initEducation=function(a){a&&(GD.graph._initSchoolAutocomplete(),a=$("div.eduHistory div.historyList div.historyRecord"),GD.graph._initActionButtons(a))};GD.graph.unsavedRecordCount=0;
GD.graph._onFieldChange=function(a){var b=$(a.target).closest(".recordEditorTemplate"),c=!0;b.data("dirtyRecord")||("keydown"==a.type&&(c=GD.event.isTextChangeKeystroke(a.which)),c&&(b.data("dirtyRecord",!0),GD.graph.unsavedRecordCount+=1,1==GD.graph.unsavedRecordCount&&$(window).bind("beforeunload",function(){return"You have unsaved changes.  Are you sure you want to leave this page?"})));return!0};
GD.graph._onRecordClean=function(a){a.data("dirtyRecord")&&(a.data("dirtyRecord",!1),GD.graph.unsavedRecordCount-=1,0>=GD.graph.unsavedRecordCount&&(GD.graph.unsavedRecordCount=0,$(window).unbind("beforeunload")))};GD.graph.isBasicInfoAjaxActive=!1;GD.graph._editBasicInfoItem=function(a){var b=$("div.currentLocation",a),a=$("div.editLocation",a);b.hide();a.show();$("input[name=locationName]",a).select().focus()};
GD.graph._onBasicInfoCitySelect=function(a,b){var c=$(".basicInfo .basicInfoRecord");c.data("isChanged",!0);GD.wait(1).then(function(){GD.graph._clearLocationNameFieldError();GD.graph._commitBasicInfo(c,a,b)},1)};GD.graph._initBasicInfoCitySelect=function(){var a=$(".basicInfo .basicInfoRecord"),b=$("input[name=locationName]",a),a=$("input[name=locationId]",a);b.blur(function(){GD.wait(1).then(GD.graph._onBasicInfoLocationNameBlur)});GD.ajax.createLocationAutoComplete(null,b,a,GD.graph._onBasicInfoCitySelect)};
GD.graph._onBasicInfoLocationNameBlur=function(){var a=$(".basicInfo .basicInfoRecord"),b=$("input[name=locationName]",a),c=$("input[name=locationId]",a),d=b.val().trim(),c=c.val(),c=jQuery.isNumeric(c)?c-0:0;0<c?GD.graph._commitBasicInfo(a,d,c):(0===d.length&&GD.graph._clearLocationNameFieldError(),b.hasClass("ui-autocomplete-opened")||GD.graph._checkInvalidLocationName(a,d,c))};
GD.graph._checkInvalidLocationName=function(a,b,c){if(!$("div.currentLocation",a).is(":visible")){var d=$("input[name=locationName]",a);b&&0>=c&&(d.hasClass("ui-autocomplete-opened")||d.autocomplete("disable").autocomplete("enable"),a=$(".fieldError",a),a.is(":hidden")&&a.show("blind"))}};GD.graph._clearLocationNameFieldError=function(){var a=$(".basicInfo .basicInfoRecord .fieldError");a.is(":visible")&&a.hide("blind")};
GD.graph._commitBasicInfo=function(a,b,c){c?(GD.graph._clearLocationNameFieldError(),b={},GD.graph._getBasicInfoFields(a,b),GD.graph._saveBasicInfo(a,b)):GD.graph._checkInvalidLocationName(a,b,c)};GD.graph._deleteBasicInfoItem=function(a){GD.graph._saveBasicInfo(a,{locationName:"",locationId:0,locationType:""})};
GD.graph._saveBasicInfo=function(a,b){if(!GD.graph.isBasicInfoAjaxActive){var c=a.data("isChanged"),d=!b.locationId&&!b.locationName;if(c||d)GD.graph._setBasicInfoFields(a,b),GD.graph.isBasicInfoAjaxActive=!0,GD.graph._ajaxAction(GD.graph.BASIC_INFO_UPDATE_URL,b,a,GD.graph._onBasicInfoSaveComplete);a.data("isChanged",!1);c=$("div.currentLocation",a);d=$("div.editLocation",a);b.locationName?(d.hide(),c.show(),GD.graph._showActions(a,!0)):(c.hide(),d.show(),$("input[name=locationName]",d).focus(),GD.graph._showActions(a,
!1))}};GD.graph._onBasicInfoSaveComplete=function(a){GD.graph.isBasicInfoAjaxActive=!1;a||($(".basicInfo .basicInfoRecord").data("isChanged",!0),GD.wait(100).then(GD.graph._editBasicInfoItem))};
GD.graph._initWorkHistoryItem=function(a,b){var c={};GD.graph._getRelationshipId(b,c);GD.graph._getJobDataFields(b,c);GD.graph._getDateRangeFields(b,c);GD.graph._setJobDataFields(a,c);GD.graph._setDateRangeFields(a,c);var d=$("input[name=currentJob]",a);d.click(function(){GD.graph._handleCurrentJobCheck(a,d)});var c=$("input:text,textarea",a),e=$("select",a),f=$("input:checkbox",a);c.keydown(GD.graph._onFieldChange);e.change(GD.graph._onFieldChange);f.click(GD.graph._onFieldChange);GD.graph._handleCurrentJobCheck(a,
d);GD.ajax.createLocationAutoComplete(null,$("input[name=locationName]",a),$("input[name=locationId]",a))};
GD.graph._initEmployerAutocomplete=function(){var a=$("#EmployerNameEditField");GD.ajax.createGraphEmployerAutoComplete(a,null,GD.graph._onEmployerSelect);a.keydown(function(b){return GD.graph._isNameEntered(a)&&(b.which==GD.event.ENTER||b.which==GD.event.TAB)?(GD.graph._onEmployerSelect(a.val(),0),!1):!0});a.blur(function(){a.hasClass("ui-autocomplete-opened")||GD.graph._isNameEntered(a)&&GD.graph._onEmployerSelect(a.val(),0)})};
GD.graph._onEmployerSelect=function(a,b,c){var d=$("#EmployerNameEditField");d.autocomplete("close").autocomplete("disable").autocomplete("enable");d.val("");var e,f;f={employerName:a,employerId:b};e=GD.graph._createEmployerEditor(f,c);GD.wait().then(function(){GD.graph._ajaxAction(GD.graph.JOB_INSERT_URL,f,e,function(a,b){GD.graph._onRecordAdded(e,b)})});return!0};
GD.graph._createEmployerEditor=function(a,b){var c={},d=$("div.workHistory");a.employerName&&(c.name=a.employerName,c.id=a.employerId);b&&(c.avatar=b.avatarSqThumbUrl,c.relationshipId=b.relationshipId,c.profileCompletePercentage=b.profileCompletePercentage);c.avatarClass="";c.avatar||(c.avatar="/static/img/spacer.gif",c.avatarClass="genericAvatar");c=GD.graph._createNewItemEditor(d,c);d.removeClass("emptySection");return c};
GD.graph._getJobDataFields=function(a,b){var c=a.is(".recordEditorTemplate"),d;if(d=c?$("input[name=jobTitle]",a).val():$("span.jobTitle",a).text())if(d=d.trim())b.jobTitle=d;if(d=c?$("input[name=locationName]",a).val():$("span.locationName",a).text()){if(d=d.trim())b.locationName=d;b.locationId=0;if(d=$("input[name=locationId]",a).val())if((d=d.trim())&&jQuery.isNumeric(d))b.locationId=d-0,b.locationId&&(b.locationType="C")}if(d=c?$("textarea[name=itemDesc]",a).val():$("p.itemDesc",a).text())if(d=
d.trim())b.description=d;GD.graph._getDateRangeFields(a,b)};
GD.graph._setJobDataFields=function(a,b){var c=a.is(".recordEditorTemplate"),d=b.jobTitle,e=b.locationName,d=d?d.trim():"",e=e?e.trim():"";c?($("input[name=jobTitle]",a).val(b.jobTitle),$("input[name=locationName]",a).val(b.locationName),$("textarea[name=itemDesc]",a).val(b.description),d&&$("input[name=jobTitle]",a).val(d)):($("p.itemDesc",a).text(b.description),$(".position .jobTitle",a).html(d),$(".position span.locationName",a).text(e),d&&(b.hasDate||e)?$("span.jobTitleSeparator",a).show():$("span.jobTitleSeparator",
a).hide(),b.hasDate&&e?$("span.dateLocSeparator",a).show():$("span.dateLocSeparator",a).hide());$("input[name=locationId]",a).val(b.locationId);$("input[name=locationType]",a).val(b.locationType);GD.graph._setDateRangeFields(a,b)};
GD.graph._validateJobFields=function(a,b){var c=a.is(".recordEditorTemplate");b.valid=!0;if(c&&(b.locationName&&!b.locationId?(b.valid=!1,$("div.fieldErrorInvalidCity",a).show("blind",200)):$("div.fieldErrorInvalidCity",a).hide(),b.hasDate))if(c=!1,0<b.startMonth&&0>=b.startYear?(b.valid=!1,$("div.fieldErrorNoStartYear",a).show("blind",200),c=!0):$("div.fieldErrorNoStartYear",a).hide(),!b.isCurrent)if(0<=b.endMonth&&0>=b.endYear?(b.valid=!1,$("div.fieldErrorNoEndYear",a).show("blind",200),c=!0):$("div.fieldErrorNoEndYear",
a).hide(),!b.isCurrent&&!c&&0<b.startYear){var d=c=0,e=0;0<b.startMonth&&(c=b.startMonth-1);d=new Date(b.startYear,c);0<b.endYear&&(c=11,0<b.endMonth&&(c=b.endMonth-1),e=new Date(b.endYear,c));d.getTime()>e.getTime()?(b.valid=!1,$("div.fieldErrorReversedDates",a).show("blind",200)):$("div.fieldErrorReversedDates",a).hide()}b.valid&&$("div.fieldError",a).hide()};GD.graph.schoolTypeHS="HIGH_SCHOOL";GD.graph.schoolTypeCollege="COLLEGE";GD.graph.numShownConcentrations=3;
GD.graph._initEducationItem=function(a,b){var c={};GD.graph._getRelationshipId(b,c);GD.graph._getEduDataFields(b,c);GD.graph._getDateRangeFields(b,c);GD.graph._setEduDataFields(a,c);GD.graph._setDateRangeFields(a,c);GD.graph._handleSchoolTypeRadio(a);$("input:radio[name=schoolType]",a).change(function(){GD.graph._handleSchoolTypeRadio(a);return!0});var c=$("input:text",a),d=$("select",a),e=$("input:radio",a);c.keydown(GD.graph._onFieldChange);d.change(GD.graph._onFieldChange);e.change(GD.graph._onFieldChange)};
GD.graph._initSchoolAutocomplete=function(){var a=$("#SchoolNameEditField");GD.ajax.createGraphSchoolAutoComplete(a,null,GD.graph._onSchoolSelect);a.keydown(function(b){return GD.graph._isNameEntered(a)&&(b.which==GD.event.ENTER||b.which==GD.event.TAB)?(GD.graph._onSchoolSelect(a.val(),0),!1):!0});a.blur(function(){a.hasClass("ui-autocomplete-opened")||GD.graph._isNameEntered(a)&&GD.graph._onSchoolSelect(a.val(),0)})};
GD.graph._onSchoolSelect=function(a,b,c){var d=$("#SchoolNameEditField");d.autocomplete("close").autocomplete("disable").autocomplete("enable");d.val("");var e,f;f={schoolName:a,schoolId:b};e=GD.graph._createSchoolEditor(f,c);GD.wait().then(function(){GD.graph._ajaxAction(GD.graph.EDU_INSERT_URL,f,e,function(a,b){GD.graph._onRecordAdded(e,b)})});return!0};
GD.graph._createSchoolEditor=function(a,b){var c={},d=$("div.eduHistory");a.schoolName&&(c.name=a.schoolName,c.id=a.schoolId);b&&(c.avatar=b.avatarSqThumbUrl,c.relationshipId=b.relationshipId,c.profileCompletePercentage=b.profileCompletePercentage);c.avatarClass="";c.avatar||(c.avatar="/static/img/spacer.gif",c.avatarClass="genericAvatar");c=GD.graph._createNewItemEditor(d,c);d.removeClass("emptySection");return c};
GD.graph._getEduDataFields=function(a,b){var c=a.is(".recordEditorTemplate"),d;if(d=c?$("input:radio[name=schoolType]:checked",a).val():$("input:hidden[name=schoolType]",a).val())if(d=d.trim())b.type=d;if(b.type!=GD.graph.schoolTypeHS){if(d=c?$("input[name=degree]",a).val():$(".schoolDetails .degree",a).html())if(d=d.trim())b.degree=d;(c?$("input[name=concentration]",a):$(".schoolDetails .concentrationList .concentrationName",a)).each(function(){var a=$(this);if(d=a.is(":input")?a.val():a.html())if(d=
d.trim())b.concentration||(b.concentration=[]),b.concentration.push(d)});b.hasConcentrations=b.concentration&&0<b.concentration.length}GD.graph._getDateRangeFields(a,b)};
GD.graph._setEduDataFields=function(a,b){var c=a.is(".recordEditorTemplate"),d,e;c?($("input:radio[name=schoolType]",a).prop("checked",!1),e=b.type?b.type:GD.graph.schoolTypeCollege,$('input[value="'+e+'"]',a).prop("checked",!0).change()):(d=$("input:hidden[name=schoolType]",a),e=b.type?b.type:-1,d.val(e));if(b.type!=GD.graph.schoolTypeHS)if(c){if(d=$("input[name=degree]",a),b.degree?d.val(b.degree):d.val(""),b.hasConcentrations){d=$("input:text[name=concentration]",a);e="";for(c=0;c<b.concentration.length;c++)c<
d.length?$(d[c]).val(b.concentration[c]):e+='<input type="hidden" name="concentration" value="'+b.concentration[c]+'" />\n';$(".surplusConcentrations",a).html(e)}}else{d=$(".schoolDetails .degree",a);b.degree?d.html(b.degree):d.html("");if(b.hasConcentrations){e=[];d=Math.min(b.concentration.length,GD.graph.numShownConcentrations);for(c=0;c<d;c++)e.push("<span class='concentrationName'>"+b.concentration[c]+"</span>");c=e.join(", ");$(".concentrationList .shownConcentrations",a).html(c);c="";if(d<
b.concentration.length){e=[];for(c=GD.graph.numShownConcentrations;c<b.concentration.length;c++)e.push("<span class='concentrationName'>"+b.concentration[c]+"</span>");c=e.join("\n")}$(".concentrationList .hiddenConcentrations",a).html(c)}b.degree&&(b.hasDate||b.hasConcentrations)?$("span.dateDegreeSep",a).show():$("span.dateDegreeSep",a).hide();b.degree&&b.hasConcentrations?$("span.degreeConcentrationSep",a).show():$("span.degreeConcentrationSep",a).hide()}GD.graph._setDateRangeFields(a,b)};
GD.graph._validateEduFields=function(a,b){var c=a.is(".recordEditorTemplate");b.valid=!0;c&&b.hasDate&&(0<b.startYear&&0<b.endYear&&b.endYear<b.startYear?(b.valid=!1,$("div.fieldErrorReversedDates",a).show("blind",200)):$("div.fieldErrorReversedDates",a).hide());b.valid&&$("div.fieldError",a).hide()};
GD.graph._handleSchoolTypeRadio=function(a){var b=$("input:radio[name=schoolType]:checked",a),c=$("div.higherEdFields",a);b.val()==GD.graph.schoolTypeHS?"none"!=c.css("display")&&c.hide("blind",200):"none"==c.css("display")&&(a.is(":visible")?c.show("blind",200):c.show())};
GD.graph._getDateRangeFields=function(a,b){a.is(".recordEditorTemplate");b.hasDate=!1;b.startMonth=$("[name=startMonth]",a).val();b.startYear=$("[name=startYear]",a).val();b.endMonth=$("[name=endMonth]",a).val();b.endYear=$("[name=endYear]",a).val();if(0<b.startYear||0<b.startMonth||0<b.endYear||0<b.endMonth)b.hasDate=!0;b.isCurrent=!1;0>=b.endYear&&0>=b.endMonth&&(b.isCurrent=!0)};
GD.graph._makeDateFieldsNumeric=function(a){a.startMonth=jQuery.isNumeric(a.startMonth)?a.startMonth-0:0;a.startYear=jQuery.isNumeric(a.startYear)?a.startYear-0:0;a.endMonth=jQuery.isNumeric(a.endMonth)?a.endMonth-0:0;a.endYear=jQuery.isNumeric(a.endYear)?a.endYear-0:0};
GD.graph._setDateRangeFields=function(a,b){var c=a.is(".recordEditorTemplate"),d=a;d.is(".historyRecord")||(d=d.closest(".historyRecord"));b.isCurrent=!0;$("[name=startMonth]",a).val(b.startMonth);$("[name=startYear]",a).val(b.startYear);$("[name=endMonth]",a).val(b.endMonth);$("[name=endYear]",a).val(b.endYear);b.isCurrent=0>=b.endYear;if(c)d.is(".workItem")&&(c=$("input[name=currentJob]",a),c.prop("checked",b.isCurrent),GD.graph._handleCurrentJobCheck(a,c));else if(d.is(".eduItem")){c="";0<b.startYear&&
0<b.endYear?c=b.startYear==b.endYear?b.endYear:b.startYear+" &ndash; "+b.endYear:0<b.startYear?c=b.startYear+" &ndash;":0<b.endYear&&(c=b.endYear);var d=$(".schoolDetails .schoolYears",a),e=$(".dateConcentrationSep",a);d.html(c);c?e.show():e.hide()}else d.is(".workItem")&&(0<b.startYear?(0<b.startMonth?(c=new Date(b.startYear,b.startMonth-1),c=b.startYear==b.endYear&&0<=b.startMonth&&0<=b.endMonth&&b.startMonth!=b.endMonth?GD.i18n.fmtDate(c,GD.i18n.DATE_FMT_MON):GD.i18n.fmtDate(c,GD.i18n.DATE_FMT_MON_YR)):
c=String(b.startYear),c=c.toString(),d=b.isCurrent?"Present":0<b.endMonth?GD.i18n.fmtDate(new Date(b.endYear,b.endMonth-1),GD.i18n.DATE_FMT_MON_YR):String(b.endYear),d=d.toString(),$(".position .dateDesc",a).html(c==d?c:c+" &ndash; "+d),(c=$(".position .jobTitle",a).html())&&c.trim()?$("span.jobTitleSeparator",a).show():$("span.jobTitleSeparator",a).hide()):($("span.dateDesc",a).html(""),$("span.dateLocSeparator",a).hide()))};
GD.graph._handleCurrentJobCheck=function(a,b){var c=b.prop("checked"),d=$("span.jobNotCurrentFields",a),e=$("span.jobIsCurrentFields",a);c?($("select[name=endMonth]",d).val(-1),$("select[name=endYear]",d).val(-1),d.hide(),e.show()):(e.hide(),d.show())};GD.graph._isNameEntered=function(a){var b=a.val(),a=a.attr(GD.aug.ATTR_PLACEHOLDER);b&&(b=b.trim());b==a&&(b="");return!!b};
GD.graph._onRecordAdded=function(a,b){var c=a;c&&(c.is(".historyRecord")||(c=c.closest(".historyRecord")));if(b){b.relationshipId&&c.data("relationshipId",b.relationshipId);if(b.name){var d=$("h3.itemName",c);d.html()!=b.name&&d.html(b.name)}b.avatarSqThumbUrl&&(c=$("img.avatar",c),c.attr("src")!=b.avatarSqThumbUrl&&(c.attr("src",b.avatarSqThumbUrl),c.removeClass("genericAvatar")))}c=$(".focus:first",a);a.show("blind",400);c.focus().select()};
GD.graph._editItem=function(a){GD.graph._showActions(a,!1);if(a.is(".basicInfoRecord"))GD.graph._editBasicInfoItem(a);else{var b=$(".editableData",a);b.hide("blind",400,function(){GD.graph._initEditFields(a,b)})}};
GD.graph._deleteItem=function(a){var b=null;if(a.is(".basicInfoRecord"))b="your current location";else{var c=$("h3",a);c.length&&(b=c.html().trim());b||(b="this item")}if(confirm("Are you sure that you want to delete "+b+" from your profile?"))if(a.is(".basicInfoRecord"))GD.graph._deleteBasicInfoItem(a);else{var d,b={};GD.graph._getRelationshipId(a,b);a.is(".eduItem")?d=GD.graph.EDU_DELETE_URL:a.is(".workItem")&&(d=GD.graph.JOB_DELETE_URL);GD.graph._ajaxAction(d,b);a.hide("blind","fast",function(){var b=
a.closest(".historyList");a.remove();GD.graph._recalcLastItem(b)})}};GD.graph._initActionButtons=function(a){a.each(function(){var a=$(this),c=$(".actions span.edit",a),d=$(".actions span.delete",a);c.click(function(){GD.graph._editItem(a)});d.click(function(){GD.graph._deleteItem(a)})})};
GD.graph._initEditFields=function(a,b){var c=a.closest(".historySection"),d=$(".recordEditorTemplate:first",c),e;1>d.length||(e=d.clone(),d=$(".editArea",a),d.append(e),c.is(".workHistory")?GD.graph._initWorkHistoryItem(e,b):c.is(".eduHistory")?GD.graph._initEducationItem(e,b):Logger.error("GD.graph._initEditFields() -- case where section was not education or work."),GD.aug.addDynamicForIds(e),c=$(".saveBtn",e),c.on("click",function(b){GD.graph._saveEdit(a,e);b.preventDefault();return!1}),c=$(".cancelBtn",
e),c.on("click",function(b){GD.graph._closeEdit(a,e);b.preventDefault();return!1}),a.is(":visible")?e.show("blind",200):e.show(),$(".focus:first",e).focus().select())};
GD.graph._saveEdit=function(a,b){var c=$(".editableData",a),d={};GD.graph._getRelationshipId(a,d);a.is(".eduItem")?(url=GD.graph.EDU_UPDATE_URL,GD.graph._getEduDataFields(b,d),GD.graph._getDateRangeFields(b,d),GD.graph._setEduDataFields(c,d),GD.graph._setDateRangeFields(c,d),GD.graph._validateEduFields(b,d)):a.is(".workItem")&&(url=GD.graph.JOB_UPDATE_URL,GD.graph._getJobDataFields(b,d),GD.graph._getDateRangeFields(b,d),GD.graph._setJobDataFields(c,d),GD.graph._setDateRangeFields(c,d),GD.graph._validateJobFields(b,
d));d.valid&&(GD.graph._ajaxAction(url,d,a),GD.graph._closeEdit(a,b))};GD.graph._closeEdit=function(a,b){b.hide("blind",400,function(){GD.graph._showActions(a,!0);b.remove();$(".editableData",a).show("blind",400);$(".editArea",a).html("")});GD.graph._onRecordClean(b)};
GD.graph._createNewItemEditor=function(a,b){var c=$(".newItemEditorTemplate div.historyRecord.editableItem",a).clone();GD.graph._initActionButtons(c);if(c.length){var d=0;b.relationshipId&&(d=b.relationshipId);c.data("relationshipId",d);$("h3.itemName",c).html(b.name);$("img.avatar",c).attr("src",b.avatar).removeClass("genericAvatar").addClass(b.avatarClass);c.hide();$(".historyList",a).prepend(c);d=$(".editableData",c);d.hide();GD.graph._initEditFields(c,d);GD.graph._showActions(c,!1)}return c};
GD.graph._ajaxAction=function(a,b,c,d){c&&(c.is(".historyRecord")||(c=c.closest(".historyRecord")));c&&$("img.spinner",c).show();jQuery.ajax({url:a,data:b,traditional:!0,type:"POST",success:function(a){var f=!0;c&&$("img.spinner",c).hide();if(!a||!a.success)f=!1,a?Logger.inspect(a,"Response: "):Logger.error("No response object returned.");a&&a.profileCompletePercentage&&GD.graph._updateProfileComplete(a);a&&a.relationshipId&&(b.relationshipId=a.relationshipId,GD.graph._setRelationshipId(c,b.relationshipId));
jQuery.isFunction(d)&&d(f,a,a.errorMsg)},error:function(a){Logger.inspect(a,"GD.graph._ajaxAction() error");c&&$("img.spinner",c).hide();jQuery.isFunction(d)&&d(success,null,a.errorMessage)}})};GD.graph._showActions=function(a,b){b?$("div.actions",a).show():$("div.actions",a).hide()};GD.graph._getRelationshipId=function(a,b){var c=a.data("relationshipId");c&&(b.relationshipId=c)};GD.graph._setRelationshipId=function(a,b){a.data("relationshipId",b)};
GD.graph._getBasicInfoFields=function(a,b){var c;if(c=$("div.editLocation",a).is(":visible")?$("input[name=locationName]",a).val():$("div.currentLocation",a).text())if(c=c.trim())b.locationName=c;if(c=$("input[name=locationId]",a).val())if(c=c.trim())b.locationId=c;if(c=$("input[name=locationType]",a).val())if(c=c.trim())b.locationType=c};
GD.graph._setBasicInfoFields=function(a,b){$("input[name=locationName]",a).val(b.locationName);$("div.currentLocation",a).text(b.locationName);$("input[name=locationId]",a).val(b.locationId)};GD.graph._recalcLastItem=function(a){if(a.length){var b=$(".historyRecord:not(:last)",a);b.removeClass("lastItem");$(".historyRecord:last",a).addClass("lastItem");var c=a.closest("div.historySection"),b=$("div.historyRecord",a);0===b.length&&c.addClass("emptySection")}};
GD.graph._updateProfileComplete=function(a){var b=a.profileCompletePercentage;0>b?b=0:100<b&&(b=100);var c=$("div#ProfileCompletePercentage"),d=$("span.completeVal",c).add("h1 span.completeVal"),e=$(".progressBar .pctComplete",c),f=$("p.titleBar",c);d.html(b);e.animate({width:b+"%"},400);100>b?(f.is(":hidden")&&f.show(),c.is(":hidden")&&c.show(700)):f.hide(700);$("li.location",c)[a.locationComplete?"hide":"show"](200);$("li.workHistory",c)[a.workHistoryComplete?"hide":"show"](200);$("li.jobSearchCriteria",
c)[a.jobSearchCriteriaComplete?"hide":"show"](200);$("li.likedApp",c)[a.likedApp?"hide":"show"](200)};GD.graph._updateProfileOnInvite=function(a){a.minimumInvitationsSentCountReached&&$("ul.profileSteps li.invitation").hide(200);var a=a.profileCompletePercentage,b=$("#ProfileCompletePercentage"),c=$("span.completeVal",b).add("h1 span.completeVal"),d=$(".progressBar .pctComplete",b),b=$("p.titleBar",b);c.html(a);d.animate({width:a+"%"},400);100==a&&b.hide(700)};
GD.graph._updateProfileOnLikedApp=function(a){var a=a.profileCompletePercentage,b=$("#ProfileCompletePercentage"),c=$("span.completeVal",b).add("h1 span.completeVal"),d=$(".progressBar .pctComplete",b),b=$("p.titleBar",b);c.html(a);d.animate({width:a+"%"},400);100==a&&b.hide(700)};GD.graph.JOB_SEARCH_CRITERIA_AJAX="/member/edits/jobSearchCriteriaAjax_input.htm";
GD.graph.JOB_SEARCH_CRITERIA_CONTEXT={FEATURED_JOBS:"FEATURED_JOBS",GD_JOB_VIEW:"GD_JOB_VIEW",JOBS_TAB:"JOBS_TAB",NEW_FB_EMAIL:"NEW_FB_EMAIL",PROFILE_EDIT:"PROFILE_EDIT",PROFILE_HOME:"PROFILE_HOME"};
GD.graph.initJobSearchCriteriaDialog=function(a,b){if(a){var c=$(".jobSearchCriteriaDialog");if(1>c.length){c=$("<div>").addClass("jobSearchCriteriaDialog");c.data("jobSearchCriteriaContext",a);c.on("submit",function(a){GD.graph.onJobSearchCriteriaSubmit(c);a.preventDefault()});c.on("click",function(a){$(a.target).is(".closeDlg")&&(GD.graph.closeJobSearchCriteriaDialog(c),a.preventDefault())});c.data("status","");var d=$("<div>").addClass("hidden").append(c);$(document.body).append(d)}$(".jobSearchCriteriaLink").on("click",
function(a){a.preventDefault();"processing"!=c.data("status")&&(c.data("status","processing"),GD.graph.createJobSearchCriteriaDialog(c))});b&&GD.graph.createJobSearchCriteriaDialog(c)}else Logger.warn("jobSearchCriteriaContext not defined")};
GD.graph.createJobSearchCriteriaDialog=function(a){var b=a.data("jobSearchCriteriaContext");$.ajax({url:GD.graph.JOB_SEARCH_CRITERIA_AJAX,data:{jobSearchCriteriaContext:b},success:function(b){a.html(b);GD.shim.placeholder($("#DefaultJobTitle",a));var b=$("input[name=defaultCity]",a),d=$("input[name=defaultCityId]",a);GD.ajax.createLocationAutoComplete(null,b,d);GD.graph.showJobSearchCriteriaDialog(a)},error:function(a,b,e){Logger.error(e)}})};
GD.graph.showJobSearchCriteriaDialog=function(a){var b=a.data("jobSearchCriteriaContext"),c={dialogBody:a.get(0),dialogWidth:590,occlude:!0,draggable:!1,closeable:!0,onClose:function(){GD.graph.closeJobSearchCriteriaDialog(a)},wrapperClass:null,onLoadComplete:function(){$(this.dialogElement).css({position:"fixed",top:"100px"});GD.analytics.trackEvent("job-search-prefs","viewed-djs",b);$("input[name=defaultJobTitle]").focus()},extraData:null,modal:!0};GD.dlgManager.addCustomDialog(c)};
GD.graph.onJobSearchCriteriaSubmit=function(a){var b=$(".jobSearchCriteriaForm",a),c=b.attr("action"),d={};$("input",b).each(function(){d[this.name]=this.value});$(".fieldError").remove();$.ajax({url:c,data:d,success:function(b){if(b.match(/fieldError|errorMessage/gi))GD.graph.processJobSearchCriteriaErrors(b,a);else GD.graph.onJobSearchCriteriaComplete(a)},error:function(){alert("Sorry - there was an error on our side - you may try again or close this dialog")}})};
GD.graph.processJobSearchCriteriaErrors=function(a,b){var c=$("<div>").html(a);$(".fieldError",c).each(function(){var a=$(this),c=a.parent()[0].className;$("."+c,b).prepend(a)})};
GD.graph.onJobSearchCriteriaComplete=function(a){var b=a.data("jobSearchCriteriaContext");GD.analytics.trackEvent("job-search-prefs","updated-djs",b);GD.graph.closeJobSearchCriteriaDialog(a);(b===GD.graph.JOB_SEARCH_CRITERIA_CONTEXT.NEW_FB_EMAIL||b===GD.graph.JOB_SEARCH_CRITERIA_CONTEXT.PROFILE_EDIT||b===GD.graph.JOB_SEARCH_CRITERIA_CONTEXT.PROFILE_HOME)&&GD.graph.__updateProfileOnJobSearchComplete();b===GD.graph.JOB_SEARCH_CRITERIA_CONTEXT.JOBS_TAB&&GD.dom.loadUrl("/Jobs/jobs.htm");b===GD.graph.JOB_SEARCH_CRITERIA_CONTEXT.FEATURED_JOBS&&
GD.ads.refreshFeaturedJobsList()};GD.graph.closeJobSearchCriteriaDialog=function(a){a.data("status","");GD.dlgManager.closeAllDialogs()};
GD.graph.__updateProfileOnJobSearchComplete=function(){var a=$("#ProfileCompletePercentage");if(!(1>a.length)){var b=$(".jobSearchCriteria",a);b.hide(400);var c=$("span.completeVal",a).add("h1 span.completeVal"),d=$(".progressBar .pctComplete",a),a=$("p.titleBar",a),e=parseInt(c.text(),10),b=$(".pctValue",b).text(),b=parseInt(b.replace(/[^\d]/,""),10),e=e+b;c.html(e);d.animate({width:e+"%"},400);100==e&&a.hide(700)}};GD.graph.GRAPH_LOADING_AJAX_URL="/profile/graphLoadingStatusAjax.htm";
GD.graph.LOAD_MSG_PACING_MILLIS=3E3;GD.graph.GRAPH_LOADING_CHECK_MILLIS=500;GD.graph.numTriesRemaining=60;GD.graph.isDisplayingMessages=!1;GD.graph.initGraphLoadingPage=function(a,b){GD.graph.pollGraphLoading(a,b)};GD.graph.pollGraphLoading=function(a,b){GD.graph._doLoadingAjax(GD.graph.GRAPH_LOADING_AJAX_URL,GD.graph._processGraphLoadingPollResults,a,b)};
GD.graph._showGraphLoadingMsg=function(a){var b=$("#GraphLoading .loadingMsg h2"),c=b.filter("h2:visible"),d=$(b.get(a));c.length?c.fadeOut(400,function(){d.fadeIn(400)}):d.fadeIn(400);a+=1;a>=b.length&&(a=0);GD.wait(GD.graph.LOAD_MSG_PACING_MILLIS).then(function(){GD.graph._showGraphLoadingMsg(a)})};
GD.graph._processGraphLoadingPollResults=function(a,b,c){0>=GD.graph.numTriesRemaining||a&&a.completelyLoaded?(a=null,c&&(a="_top"),GD.dom.loadUrl(b,a)):(GD.graph.numTriesRemaining-=1,GD.graph.isDisplayingMessages||(GD.wait(GD.graph.LOAD_MSG_PACING_MILLIS).then(function(){GD.graph._showGraphLoadingMsg(0)}),GD.graph.isDisplayingMessages=!0),GD.wait(GD.graph.GRAPH_LOADING_CHECK_MILLIS).then(function(){GD.graph.pollGraphLoading(b,c)}))};
GD.graph._doLoadingAjax=function(a,b,c,d){jQuery.ajax({url:a,dataType:"json",success:function(a){a||Logger.error("No data returned for GD.graph._doLoadingAjax");jQuery.isFunction(b)&&b(a,c,d)},error:function(a,f,g){Logger.inspect(g,"GD.graph._doLoadingAjax() error: "+f);jQuery.isFunction(b)&&b(null,c,d)}})};
GD.graph.initProfileSocialSharing=function(){var a=$(".profileSteps .likedApp"),b=new GD.graph.LikedAppHandler(a);GD.graph.initGPlusHandler(b);GD.runOnFacebookLoad(function(){GD.graph.initFBLikeButtonHandler(b)});$("#ProfileSocialSharingLink").on("click keypress",function(){$(".profileSocialSharingBtns").toggle("slow");return!1});jQuery().url&&(a=$.url().param("showSocial"),void 0!==a&&$("#ProfileSocialSharingLink").click())};
GD.graph.LikedAppHandler=GD.Class({constructor:function(a){this.updatePath="/Resume/ajax/graphUserSetDataAjax.htm";this.$node=a},save:function(a,b){var c=this;jQuery.ajax({type:"POST",url:GD.util.getAjaxUrlRespectingSecurity(c.updatePath),data:{name:a,val:!!b},dataType:"json",success:function(d){d.liked=b;d.name=a;d.success?c.success(d):c.error(d)},error:function(d,e,f){data.liked=b;data.name=a;data.textStatus=e;data.errorThrown=f;c.error(data)}})},hide:function(){this.$node.hide("slow")},error:function(a){Logger.info(a,
"likedApp.save - error")},success:function(a){Logger.info(a,"likedApp.save - success");a.likedCanvasApp&&a.likedGooglePlus?(GD.graph._updateProfileOnLikedApp(a),this.hide()):a.liked&&("GPLUS_LIKED"===a.name&&$(".gPlusButton",this.$node).hide(),"FB_LIKED"===a.name&&$(".fbLikeButton",this.$node).hide())}});GD.graph.initGPlusHandler=function(a){window.gPlusCallback=function(b){b.state&&b.href?"on"==b.state?a.save("GPLUS_LIKED",!0):a.save("GPLUS_LIKED",!1):b||Logger.trace("googlePlusone - no response")}};
GD.graph.initFBLikeButtonHandler=function(a){FB.Event.subscribe("edge.create",function(){a.save("FB_LIKED",!0)});FB.Event.subscribe("edge.remove",function(){a.save("FB_LIKED",!1)})};GD.graph.FEATURED_JOBS_AJAX="/member/ajax/featuredJobsAjax.htm";GD.graph.featuredJobsOpenTime=500;
GD.graph._displayFeaturedJobs=function(a,b){jQuery.ajax({url:a,dataType:"html",success:function(a){a||Logger.error("No data returned for GD.graph.displayFeaturedJobs");jQuery.isFunction(b)&&b(a)},error:function(a,d,e){Logger.inspect(e,"GD.graph.displayFeaturedJobs error: "+d);jQuery.isFunction(b)&&b(null)}})};GD.graph._processFeaturedJobs=function(a){if(a){var b=$("#MemberHome div.jobs");b.hide();b.html(a);b.slideDown(GD.graph.featuredJobsOpenTime)}};
GD.graph.getFeaturedJobs=function(){GD.graph._displayFeaturedJobs(GD.graph.FEATURED_JOBS_AJAX,GD.graph._processFeaturedJobs)};GD.graph.SALARY_RANKINGS_AJAX="/survey/salary/ajax/salaryRankingsAjax.htm";GD.graph.showSalaryRankings=function(a){var b=GD.graph.createSalaryRankingsDialog();$.ajax({url:GD.graph.SALARY_RANKINGS_AJAX,data:{salaryReviewId:a},success:function(a){GD.graph.onSalaryRankingsAjaxSuccess(a,b)},error:function(a,d,e){GD.graph.onSalaryRankingsAjaxError(e,b)}})};
GD.graph.createSalaryRankingsDialog=function(){var a={dialogBody:GD.graph.getSalaryRankingsDialogBody().get(0),dialogWidth:590,occlude:!0,draggable:!1,closeable:!0,onClose:null,wrapperClass:"salaryRankingsDialog",onLoadComplete:function(){GD.analytics.trackPageView("/splash/salaryreport");$(this.dialogElement).css({position:"fixed",top:"20%"})},extraData:null};GD.dlgManager.addCustomDialog(a)};
GD.graph.getSalaryRankingsDialogBody=function(){var a=$(".salaryRankingsDialogBody"),b=$("button.continue",a),c=$("button.retry",a);b.on("click",function(b){b.preventDefault();GD.graph.closeSalaryRankingsDialog(a)});c.on("click",function(a){a.preventDefault();GD.dom.reloadPage()});return a};GD.graph.closeSalaryRankingsDialog=function(){GD.dlgManager.closeAllDialogs()};GD.graph.showSalaryRankingsResults=function(a){$(".loading",a).hide();$(".results",a).show()};
GD.graph.onSalaryRankingsAjaxSuccess=function(a,b){GD.graph.showSalaryRankingsResults(b);var c=a.salaryRankings;if("ERROR"===(a.status||"").toUpperCase())GD.graph.onSalaryRankingsErrorStatus(b);else if(!c||1>c.length)GD.graph.onSalaryRankingsNoData(b);else GD.graph.onSalaryRankingsData(b,c)};GD.graph.onSalaryRankingsAjaxError=function(a,b){GD.graph.showSalaryRankingsResults(b);GD.graph.onSalaryRankingsErrorStatus(b)};GD.graph.onSalaryRankingsErrorStatus=function(a){$(".retry",a).show()};
GD.graph.onSalaryRankingsNoData=function(a){$(".continue",a).show();$(".no-data",a).show()};
GD.graph.onSalaryRankingsData=function(a,b){var c=$(".salaryRankings",a),d=$(".salaryRankingsGraph",a),e=$(".salaryRankingTemplate",c),f=$(".subheading",c),g,i,j,h;$(".continue",a).show();c.show();j=b.length;for(h=0;h<j;++h)g=b[h],c=Math.floor(g.rank,2)+"%",i=g.title,$clone=e.clone(),$clone.show(),$(".title",$clone).html(i),0===h&&(g=f.data("example"),g=g.replace(/{{value}}/,c).replace(/{{title}}/,i),f.append(g)),d.append($clone),function(a,b){var c=$(".bar",a),d=$(".value",a);d.hide();setTimeout(function(){$(".pct",
d).html(b);d.fadeIn(1E3)},500);c.animate({width:b},{duration:1500,easing:"linear"})}($clone,c)};window.GD=window.GD||{};GD.browse=GD.browse||{};GD.flip=GD.flip||{};GD.browse.initCompanies=function(){GD.site.init()};GD.browse.initSalaries=function(){GD.site.init()};GD.browse.initInterviews=function(){GD.site.init()};GD.flip.ANIM_MS=800;GD.flip.RESET_MS=3E3;GD.flip.INACTIVE_SECS=8;GD.flip.FLIP_PAUSE_SECS=8;
GD.flip.init=function(a){var b=$("div.flipper:first",a);b.bind("mouseenter",function(){GD.flip._vivify(a,!1)});b.bind("mouseleave",function(){GD.flip._vivify(a,!0)});$(".flipperBtns .prev",a).bind("click",function(b){GD.flip._scrollRight(a);b.preventDefault()});$(".flipperBtns .next",a).bind("click",function(b){GD.flip._scrollLeft(a);b.preventDefault()});GD.flip._adjustHeight(b);GD.flip._vivify(a)};
GD.flip._vivify=function(a,b){try{var d=$("div.flipper:first",a);"boolean"!==typeof b&&(b=!0);d.data("vivified",b);d.data("autoScrolling",!1);if(b){var c=GD.flip._isAtStart(d),e=GD.flip._isAtEnd(d);(!c||!e)&&d.data("inactiveTimerId",setTimeout(function(){GD.flip._activateVivification(a)},1E3*GD.flip.INACTIVE_SECS))}else GD.flip._clearTimeouts(d)}catch(g){Logger.fatal("GD.flip._vivify",g)}};
GD.flip._scrollLeft=function(a,b,d){try{var c=$("div.flipper:first",a),e=GD.flip._getSliderPane(c),g=e.innerWidth(),h=c.innerWidth();b||(GD.flip._clearTimeouts(c),c.data("vivified")&&GD.flip._vivify(c,!0));e.is(":animated")&&e.stop(!0,!0);var f;e.css("left")?(c=2*h-g,f=parseInt(e.css("left"),10),f-=h,f<c&&(f=c)):f=-h;c=null;b&&d&&(c=function(){GD.flip._setNextVivifiedScrollTimeout(a)});e.animate({left:f},GD.flip.ANIM_MS,"easeInOutExpo",c);GD.flip._adjustButtons(a,e,g,h,-f)}catch(i){Logger.fatal("GD.flip._scrollLeft",
i)}};
GD.flip._scrollRight=function(a,b,d){try{var c=$("div.flipper:first",c),e=GD.flip._getSliderPane(c),g=e.innerWidth(),h=c.innerWidth();b||(GD.flip._clearTimeouts(c),c.data("vivified")&&GD.flip._vivify(c,!0));e.is(":animated")&&e.stop(!0,!0);var f;e.css("left")?(f=parseInt(e.css("left"),10),f+=h,0<f&&(f=0)):f=0;c=null;b&&d&&(c=function(){GD.flip._setNextVivifiedScrollTimeout(a)});e.animate({left:f},GD.flip.ANIM_MS,"easeInOutExpo",c);GD.flip._adjustButtons(a,e,g,h,-f)}catch(i){Logger.fatal("GD.flip._scrollRight",i)}};
GD.flip._getSliderPane=function(a){return $(".slidingWindow",a)};GD.flip._adjustButtons=function(a,b,d,c,e){try{var g=$("div.flipper:first",a),h=GD.flip._isAtStart(g,b,e),f=GD.flip._isAtEnd(g,b,d,c,e),i=$(".flipperBtns .prev",a).parent(),j=$(".flipperBtns .next",a).parent();h?i.addClass("disabled"):i.removeClass("disabled");f?j.addClass("disabled"):j.removeClass("disabled")}catch(k){Logger.fatal("GD.flip._adjustButtons",k)}};
GD.flip._isAtStart=function(a,b,d){try{return b||(b=GD.flip._getSliderPane(a),d=b.css("left")?-parseInt(b.css("left"),10):0),0>d&&(d=0),0>=d}catch(c){Logger.fatal("GD.flip._isAtStart",c)}};GD.flip._isAtEnd=function(a,b,d,c,e){try{return b||(b=GD.flip._getSliderPane(a),d=b.innerWidth(),c=a.innerWidth(),e=b.css("left")?-parseInt(b.css("left"),10):0),a=d-2*c,0>e&&(e=0),e+10>a&&(e=a),e>=a}catch(g){Logger.fatal("GD.flip._isAtEnd",g)}};
GD.flip._adjustHeight=function(a){try{var b=GD.flip._getSliderPane(a).outerHeight();a.css({height:b,minHeight:b})}catch(d){Logger.fatal("GD.flip._adjustHeight",d)}};GD.flip._activateVivification=function(a){try{var b=$("div.flipper:first",a);b.data("autoScrolling",!0);GD.flip._vivifiedScroll(a,!1);b.data("activeTimerId",setTimeout(function(){GD.flip._vivifiedScroll(a,!0)},1E3*GD.flip.FLIP_PAUSE_SECS))}catch(d){Logger.fatal("GD.flip._activateVivification",d)}};
GD.flip._vivifiedScroll=function(a,b){try{var d=$("div.flipper:first",a);if(d.data("autoScrolling"))if(GD.flip._isAtEnd(d)){var c=GD.flip._getSliderPane(d),e=c.innerWidth(),g=d.innerWidth(),d=null;b&&(d=function(){GD.flip._setNextVivifiedScrollTimeout(a)});c.animate({left:0},GD.flip.RESET_MS,"easeInOutExpo",d);GD.flip._adjustButtons(a,c,e,g,0)}else GD.flip._scrollLeft(a,!0,b)}catch(h){Logger.fatal("GD.flip._vivifiedScroll",h)}};
GD.flip._setNextVivifiedScrollTimeout=function(a){$("div.flipper:first",a).data("activeTimerId",setTimeout(function(){GD.flip._vivifiedScroll(a,!0)},1E3*GD.flip.FLIP_PAUSE_SECS))};GD.flip._clearTimeouts=function(a){a.data("inactiveTimerId")&&(clearTimeout(a.data("inactiveTimerId")),a.removeData("inactiveTimerId"),a.data("autoScrolling",!1));a.data("activeTimerId")&&(clearTimeout(a.data("activeTimerId")),a.removeData("activeTimerId"),a.data("autoScrolling",!1))};/*
 * Copyright (c) 2007-2013, GlassDoor. All rights reserved.
 *
 * This software is an unpublished work subject to a confidentiality agreement
 * and protected by copyright and trade secret law. Unauthorized copying,
 * redistribution or other use of this work is prohibited. All copies must
 * retain this copyright notice. Any use or exploitation of this work without
 * authorization could subject the perpetrator to criminal and civil liability.
 *
 * The information in this software is subject to change without notice
 * and should not be construed as a commitment by glassdoor.com.
 *
 * The above copyright notice does not indicate actual or intended publication
 * of this source code.
 *
 * $Rev:: 86515           $: (current file revision)
 * $Date:: 2013-10-22 01:29:46 -0700 (Tue, 22 Oct 2013) $: (date of last file modification)
 * $Author:: vikram               $: (person who last modified this file)
 */

/*---------------------------------------------------------------------------------------------------------
 * This file contains code used by Glassdoor application for the employerInfo section of the site.
 *---------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------
 * Construct the container object.
 *---------------------------------------------------------------------------------------------------------*/

window.GD = window.GD || {};
GD.ei = GD.ei || {};


/*---------------------------------------------------------------------------------------------------------
 * Static values.
 *---------------------------------------------------------------------------------------------------------*/

GD.ei.awardFadeSpeed = 100;  /* cross-fade speed in milliseconds */
GD.ei.awardRevealSpeed = 500;  /* reveal speed in milliseconds */
GD.ei.awardHideSpeed = 500;  /* reveal speed in milliseconds */

GD.ei.OK = 'ok';

GD.ei.loggedIn = null;

// vars for related companies sectionjj
GD.ei.totalRelCompanies = 0;
GD.ei.relCompaniesPos = 0; // position of leftmost

GD.ei.POST_BTN_LABEL = "Post Response";
GD.ei.POSTING_BTN_LABEL = "Posting...";
GD.ei.VALIDATION_ERROR = "Sorry, there was a problem trying to save your response. Please try again.";
GD.ei.AJAX_ERROR = "Sorry, there was a problem with your request. Please try again.";
GD.ei.RESPONSE_INVALID_ERROR = "Please enter a valid response.";
GD.ei.POST_SUCCESS = "Your response has been posted!";


/*---------------------------------------------------------------------------------------------------------
 * EI Global Init
 *---------------------------------------------------------------------------------------------------------*/

GD.ei.init = function($page) {
	/*
	 * Site-wide initialization
	 */
	GD.site.init();

	GD.ei.isLoggedIn = $('body').is('.loggedIn');

	var $followBtn = $page.find('button.follow');

	GD.ei.initFollow( $followBtn );

	$page.find('div.eiSubNav')
		.gdTabs({
			type:  'link',
			hideOnLink: ''
			});

	GD.ei.totalRelCompanies = $('span[id^="RelCompany"]').length;

	$('#RelCompanyRt').click( function() {
		GD.ei.goRightRelated();
	});

	$('#RelCompanyLt').click( function() {
		GD.ei.goLeftRelated();
	});

	// Set the bottom ad so it become fixed when it's scrolled past
	var bottomAd = null;
	if($(".bottomAd").length > 0) {
		bottomAd = new fixedOnScroll($(".bottomAd").first(), {});
	}

	GD.ei.initFEABanner();
};

GD.ei.initFollow = function($followBtn) {
	$followBtn.click(function(event) {
	GD.ei._onFollowBtn(event);
	});

	$followBtn.prepend('<i id="FollowTag" />');

	GD.ei.updateFollowBtnDisp( $followBtn ); // pass in true Boolean state
};

GD.ei.updateFollowBtnDisp = function( $followBtn ) {
	
	var isFollowing = !!$followBtn.data('following'),
		$iTag = $followBtn.find('i');

	if (isFollowing) {
		$iTag.removeClass('unfollowX').addClass('followCheck');
		$followBtn.on('mouseenter.showUnfollow', GD.ei._followHover).on('mouseleave.hideUnfollow', GD.ei._followUnhover);
		$followBtn.find('span').text( $followBtn.data('labelFollowing'));
	} else {
		$iTag.removeClass('followCheck unfollowX');
		$followBtn.off('mouseenter.showUnfollow').off('mouseleave.hideUnfollow');
		$followBtn.find('span').text( $followBtn.data('labelFollow'));
	}
	
	$followBtn.removeClass('unfollow');
};

GD.ei._onFollowBtn = function(event) {
	
	var $btn = $(event.target);
	$btn = $btn.closest('.gd-btn');

	var empId = $btn.data('empId'),
		empName = $btn.data('empName'),
		isLoggedIn = $('body').is('.loggedIn');

	/*
	 * The user isn't logged in so show a dialog to get the user to login.
	 */
	var  isFollowing = $btn.data('following');
	
	isFollowing = !isFollowing;
	
	var successFn = function(empId, data, textStatus) {
		if (data.success) {
			$btn.data('following', isFollowing);
			GD.ei.updateFollowBtnDisp( $btn );
			GD.ei._trackFollowBtn(empName, isFollowing);
		}
	};

	if (isLoggedIn) {
		GD.ajax.follow(empId, isFollowing, false, successFn);
	} else {
		/*
		 * Pass the callback which will get wrapped up within the sign-in method in GD.site.js
		 */
		GD.site.loginPopup.createDlg({
			CAHeading  : 'Create an account to get updates from ' + empName,
			SIHeading  : 'Sign In to get updates from ' + empName,
			onSuccess  : function(isNewUser) {
				GD.ajax.follow(empId, true, false, successFn);
				$('body').addClass('loggedIn');
				GD.ei.isLoggedIn = true;
				GD.ei._trackFollowBtn(empName, true, isNewUser ? 'signup' : 'signin');
			},
			gaViewLabel  : '/splash/login/ei-follow',
			userOriginHook : 'CONTENT_COMPANY_FOLLOW_INFOSITE'
		});
	}
};

GD.ei._followHover = function() {
	if ( !!$(this).data('following') ) { // true Boolean check
		$(this).find('i').removeClass('followCheck').addClass('unfollowX');
		$(this).find('span').text( $(this).data('labelUnfollow') );
		$(this).addClass('unfollow');
	}
};

GD.ei._followUnhover = function() {
	if ( !!$(this).data('following') ) { // true Boolean check
		$(this).find('i').removeClass('unfollowX').addClass('followCheck');
		$(this).find('span').text( $(this).data('labelFollowing') );
		$(this).removeClass('unfollow');
	}
};

GD.ei._trackFollowBtn = function(empName, isFollowing, eventSuffix) {
	var  eventAction = 'follow-company';

	if (!isFollowing) {
		eventAction = 'un' + eventAction;
	}

	if (eventSuffix) {
		eventAction += '-' + eventSuffix;
	}

	GD.analytics.trackEvent('social-clicks', eventAction, empName);
};


/*---------------------------------------------------------------------------------------------------------
 * EI Overview
 *---------------------------------------------------------------------------------------------------------*/

GD.ei.initOverview = function() {
var  $page = $('#PageBodyContents');
var  followBtn = $("button.follow");
var  empName = followBtn.data('empName');

GD.ei.init($page);

$('.employerSuppliedContent a, #OverviewFinancialInfo a').attr('target', '_blank')
			.attr('rel', 'nofollow');

var modLink = decodeURIComponent( $('#StockInfoLinks').find('a:first').attr('href') );
modLink = modLink.toLowerCase().replace(/(,\s*|\s+)/gi, "-").replace(/\.\//g, '\/');

$('#StockInfoLinks').find('a:first').attr('href', modLink);

GD.ei._checkHashTag();
GD.aug.augmentContextHelpNodes();

$('#ExpandDesc').click(function() {
GD.ei.expandDescription();
});

$('#ExpandMission').click(function() {
GD.ei.expandMission();
});

if(!GD.ei.isLoggedIn) {
$('.addAward').click(function() {
GD.site.loginPopup.createDlg({
	CAHeading  : 'Create an account to add an award for ' + empName,
	SIHeading  : 'Sign In to add an award for ' + empName,
	gaViewLabel  : '/splash/login/oi-add-award',
	userOriginHook : 'CONTENT_ADD_AWARD'
});
});
}

GD.ei._tabsInit();

GD.ei.initPreviewBanner();

GD.ei.initFutureAdOrderBanner();
};

GD.ei._tabsInit = function(activeTab) {
var  $tabs = $('#OverviewTabs');

var  opts = {
	activate: function(event, ui) {
		var $tab = ui.newTab;

		if( $tab.data('gaCategory') && $tab.data('gaEvent') && $tab.data('gaLabel') ) {
		GD.analytics.trackEvent($tab.data('gaCategory'), $tab.data('gaEvent'), $tab.data('gaLabel'));
		}

		if ($tab.data('postedByStr')) {
		$("#OverviewPostedBy span.aside").text($tab.data('postedByStr'));
		}
		},
	active:  activeTab || 0
	};

$tabs.gdTabs(opts);
};

GD.ei._checkHashTag = function() {
var   hashTag = window.location.hash;

if (hashTag && hashTag.contains('-')) {
hashTag = hashTag.split('-');

if (hashTag.length) {
var  hashType = hashTag[0].substr(1);

if ((hashType === 'section') && (hashTag.length > 1)) {
	var  sectionId = hashTag[1];

	GD.ei.showOverviewSection(sectionId, true);
}
}
}
else {
hashTag = hashTag.toLowerCase();

if ((hashTag === '#awards') && $('#ShowMoreAwards').length) {
GD.ei.showMoreAwards(true);
}
}
};

GD.ei.showOverviewSection = function(sectionId, forceScroll) {
	var  $sectionTabs = $('#WhyWorkForUsTabBar li span[class!=divider]');
	var  $sectionBodies = $('#WhyWorkForUs .overviewSectionBody');
	var  $selectedTab = $('#WhyWorkForUsTab-' + sectionId);
	var  $selectedBody = $('#WhyWorkForUs-' + sectionId);

	if ($selectedTab.length && $selectedBody.length) {
		$sectionTabs.addClass('link');
		$selectedTab.removeClass('link');

		$sectionBodies.hide();
		$selectedBody.show();

		if (forceScroll) {
			GD.wait()
				.then(function() {
						jQuery.scrollTo($('#WhyWorkForUs'),
							{
							axis:  'y',
							duration: 200
							});
					});
		}

		// make sure lazy loaded images show up
		$(window).trigger('resize');
	}

	return false;
};

GD.ei.initPreviewBanner = function() {
var $banner = $('.previewEepBanner'),
marketoTag = 'CHECK_PRICING_OVERVIEW';

if (!$banner.length) {
return;
}

$banner.css({
minHeight: 'auto',
height:  '50px'
});

// bind the button
$banner.find('.pricingPromoLink').off('click.triggerModal')
.on('click.triggerModal', function() {
var empId = $('#EmployerId').val(),
	isProspect = $('#IsProspect').val();
GD.pricingPromo.openPricingModalFlow(empId, marketoTag, isProspect);
});

$('#PageTop').before($banner);

GD.wait().then( function() {
$banner.slideDown(200);
});
};


GD.ei.initFutureAdOrderBanner = function() {
var $banner = $('.previewFutureAdOrderBanner');

if (!$banner.length) {
return;
}

$banner.css({
minHeight: 'auto',
height:  '50px'
});

$('#PageTop').before($banner);

GD.wait().then( function() {
$banner.slideDown(200);
});
};


GD.ei.onNewsComplete = function(newsContainer, entryCount) {
if (entryCount > 0) {
$('#OverviewNews').slideDown(400);
}
};

GD.ei.expandDescription = function() {
$('#EmpDescription').html(GD.ei.fullDesc);
};

GD.ei.expandMission = function() {
$('#EmpMission').html('<b>Mission:</b> ' + GD.ei.fullMission);
};


/*---------------------------------------------------------------------------------------------------------
 * EI Reviews
 *---------------------------------------------------------------------------------------------------------*/

GD.ei.initReviews = function(isNonMember) {
	var $page = $('#PageBodyContents');
	var $isReviewCommentPage = $("#EmployerReview").length > 0;
	var $hasReviewHighlights = $(".reviewHighlights").length > 0;

	GD.ei.init($page);
	GD.ei._initReviewsFilter($page, isNonMember);
	GD.ei._initLockedReviewClicks($page);
	GD.ei._initAutosizingTextAreas();

	if($hasReviewHighlights) {
		GD.ei._initReviewHighlights();
	}

	if($isReviewCommentPage) {
		GD.ei._initGAEventTracking();
		GD.ei._initExpandReviews();
	}

	GD.aug.augmentContextHelpNodes();

	// Give them a popup modal if they are not an employer rep and want to respond to a review
	$("#EI").on('click', '.reviewFooter .userCommentsAndFlags .unsignedCommentLink', function() {
		GD.ei.initFEAModal();
	});

	GD.ei._initToggles();

	if (!GD.ei.isLoggedIn) {
		var  isReviewDetailsPage = $("#ReviewList").length === 0;

		GD.ei._initFlagReviews("review", (isReviewDetailsPage ? "rd" : "ri") + "-flag-review", 'CONTENT_FLAG_REVIEW');
		GD.ei._initHelpfulReview("review", (isReviewDetailsPage ? "rd" : "ri") + "-helpful-review", 'CONTENT_HELPFUL_REVIEW');
	}
};

/*---------------------------------------------------------------------------------------------------------
 * EI Salaries
 *---------------------------------------------------------------------------------------------------------*/

GD.ei.initSalaries = function(isNonMember) {
var  $page = $('#PageBodyContents');

GD.ei.init($page);
GD.ei._initToggles();

var  onChangeFunc;

if (isNonMember) {
onChangeFunc = GD.ei.submitEmployerInfoFilter;
}

$('#FilterLocation').gdSelect({ onchange: onChangeFunc });
$('#FilterExp').gdSelect({ onchange: onChangeFunc });

var modalOptions = {
CAHeading  : "Create an account to see all salaries - it's easy, free and private",
SIHeading  : 'Sign In to see all salaries',
gaViewLabel  : '/splash/login/si-cta',
initialTab  : 'CA'
};

$('.CTALinks .signUp').click(function(e) {
e.preventDefault();
$.extend(modalOptions, {userOriginHook : 'GIVETOGET_SNEAK_PEEK'});
GD.site.loginPopup.createDlg(modalOptions);
});

$('.lockedSalaryLinks .signUp').click(function(e) {
e.preventDefault();

var  isSalaryDetailsPage = ($("#SalaryJobSummary").length !== 0);
var  gaViewLabelPrefix = isSalaryDetailsPage ? "sd" : "si";

$.extend(modalOptions,
	{
	gaViewLabel: '/splash/login/' + gaViewLabelPrefix + '-locked-review',
	userOriginHook: 'GIVETOGET_LOCKED_CONTENT'
	});
GD.site.loginPopup.createDlg(modalOptions);
});

$('.CTALinks .signIn').click(function(e) {
e.preventDefault();
$.extend(modalOptions,
	{
	initialTab:  'SI',
	userOriginHook: 'GIVETOGET_SNEAK_PEEK'
	});
GD.site.loginPopup.createDlg(modalOptions);
});
};


/*---------------------------------------------------------------------------------------------------------
 * EI Interviews
 *---------------------------------------------------------------------------------------------------------*/

GD.ei.initInterviews = function(isNonMember) {
var  $page = $('#PageBodyContents');

GD.ei.init($page);

GD.ei._initReviewsFilter($page, isNonMember);
GD.ei._initLockedReviewClicks($page);
GD.ei._initToggles();

GD.aug.augmentContextHelpNodes();

// Give them a popup modal if they are not an employer rep and want to respond to a review
$('.unsignedCommentLink').click( function() {
GD.ei.initFEAModal();
});

if (!GD.ei.isLoggedIn) {
GD.ei._initInterviewModalTriggers();
}

GD.ei._initPostTagBtns($page);

GD.aug.augmentTagFields();
};

GD.ei._initPostTagBtns = function($page) {
var  $tagForms = $page.find('div.tagsForm');

$tagForms.find('button.postTagsBtn')
.click(function(event) {
	var  $btn = $(this);
	var  $tagForm = $btn.closest('div.tagsForm');
	var  questionId = $tagForm.data('question-id');

	if (questionId) {
	GD.ei.addTagsToQuestion(questionId);
	}
	});

$tagForms.find('button.cancelTagsBtn')
.click(function(event) {
	var  $btn = $(this);
	var  $tagForm = $btn.closest('div.tagsForm');
	var  questionId = $tagForm.data('question-id');

	if (questionId) {
	GD.ei.cancelAddTag(questionId, 'QuestionTagEditor_' + questionId);
	}
	});
};

GD.ei._initInterviewModalTriggers = function() {
GD.ei._initLockedInterviewClicks();

var  isInterviewQuestionPage = $("#EIInterviewQuestion").length !== 0;
var  isInterviewDetailsPage = !isInterviewQuestionPage && ($("#ReviewFilter").length === 0);

var gaLabelPrefix = "ii";
var gaLabelSuffix = "interview";
var reviewType = "interview";

if(isInterviewDetailsPage) {
gaLabelPrefix = "id";
} else if(isInterviewQuestionPage) {
gaLabelPrefix = "iq";
gaLabelSuffix = "question";
reviewType = "interview question";
}

GD.ei._initFlagReviews(reviewType, gaLabelPrefix + "-flag-" + gaLabelSuffix, 'CONTENT_FLAG_INTERVIEW');
GD.ei._initHelpfulReview(reviewType, gaLabelPrefix + "-helpful-" + gaLabelSuffix, 'CONTENT_HELPFUL_INTERVIEW');

var modalOptions = {
CAHeading  : "Create an account to see all interviews - it's easy, free and private!",
SIHeading  : 'Sign In to see all interviews',
gaViewLabel  : '/splash/login/iq-comment'
};

$('.CTALinks .signUp').click(function(e) {
e.preventDefault();
$.extend(modalOptions, {userOriginHook : 'GIVETOGET_SNEAK_PEEK'});
GD.site.loginPopup.createDlg(modalOptions);
});

$('.CTALinks .signIn').click(function(e) {
e.preventDefault();
$.extend(modalOptions,
	{
	initialTab:  'SI',
	userOriginHook: 'GIVETOGET_SNEAK_PEEK'
	});
GD.site.loginPopup.createDlg(modalOptions);
});

if(isInterviewQuestionPage) {
	/* This overrides the click handler that was attached to answer feedback in _initHelpfulReview above */
	$(".userCommentActions .helpfulQuery .link").unbind("click");
	$('.userCommentActions .helpfulQuery .link').click(function(e) {
		e.preventDefault();

		var modalOptions = {
			CAHeading  : 'Create an account to give feedback to this interview answer',
			SIHeading  : 'Sign In to give feedback to this interview answer',
			gaViewLabel  : '/splash/login/iq-helpful-answer',
			userOriginHook : 'CONTENT_HELPFUL_INTERVIEW'
		};

		GD.site.loginPopup.createDlg(modalOptions);
	});

	/* This overrides the click handler that was attached to answer flags in _initFlagReviews above */
	$(".userCommentActions .flagContent .link").unbind("click");
	$('.userCommentActions .flagContent .link').click(function(e) {
		e.preventDefault();

		var modalOptions = {
			CAHeading  : 'Create an account to flag this interview answer as inappropriate',
			SIHeading  : 'Sign In to flag this interview answer as inappropriate',
			gaViewLabel  : '/splash/login/iq-flag-answer',
			userOriginHook : 'CONTENT_FLAG_INTERVIEW'
		};

		GD.site.loginPopup.createDlg(modalOptions);
	});

$('.addTagsToggle').click(function(e) {
e.preventDefault();

var modalOptions = {
	CAHeading  : 'Create an account to add tags to this interview question',
	SIHeading  : 'Sign In to add tags to this interview question',
	gaViewLabel  : '/splash/login/iq-add-tag',
	userOriginHook : 'CONTENT_ADD_TAG'
};

GD.site.loginPopup.createDlg(modalOptions);
});

$('#ReviewComments .signUpLink').click(function(e) {
e.preventDefault();

var modalOptions = {
	CAHeading  : 'Create an account to comment on this interview question',
	SIHeading  : 'Sign In to comment on this interview question',
	gaViewLabel  : '/splash/login/iq-comment',
	userOriginHook : 'CONTENT_ADD_COMMENT'
};

GD.site.loginPopup.createDlg(modalOptions);
});
}
};

/*
 * Interview Pie chart and donut chart for
 *
 * Interview Experience and Interview Difficulty
 *
 * TODO: Remove the direct call to highcharts once Regina is done with creating chart-level wrapper code.
 * After 6.10B
 *
 */
GD.ei.initInterviewCharts = function() {

	Highcharts.setOptions({
		colors: ['#f5d973', '#f5eac9', '#c5e8eb']
	});

	var colors = Highcharts.getOptions().colors,
		$diffContainer = $('#DifficultyChart'),
		categories = [],
		name = 'Interview Difficulty',
		difficultyVal = ($diffContainer.data('value'))?$diffContainer.data('value'):0.0,
		diffVal = (parseFloat(difficultyVal)).toFixed(1),
		diffTxt = $diffContainer.data('difficultyTxt'),
		data = [{
			y: (diffVal * 20).toFixed(2),
			color: colors[0],
			drilldown: {
				name: $diffContainer.data('difficulty'),
				categories: [diffVal],
				data: [(diffVal*20)],
				color: colors[0]
			}
		}, {
			y: ( (5-diffVal) * 20).toFixed(2),
			color: '#ffffff',
			drilldown: {
				name: '',
				categories: [' '],
				data: [(5-diffVal)*20],
				color: '#ffffff'
			}
		}];

	// Build the data arrays
	var versionsData = [];
	for (var i = 0; i < data.length; i++) {

		// add version data
		for (var j = 0; j < data[i].drilldown.data.length; j++) {
			var brightness = 0.2 - (j / data[i].drilldown.data.length) / 5 ;
			versionsData.push({
				name: data[i].drilldown.categories[j],
				y: data[i].drilldown.data[j],
				color: Highcharts.Color(data[i].color).get()
			});
		}
	}

	// Create the chart
	var diffChart = new Highcharts.Chart({
		chart: {
			type: 'pie',
			renderTo: 'DifficultyChart',
		},
		title: {
			text: ''
		},
		yAxis: {
			title: {
				text: ''
			}
		},
		plotOptions: {
			pie: {
				innerSize: 65,
				shadow: true,
				dataLabels: {
					distance: -18,
					color: 'black',
					y: -2
				}
			}
		},
		tooltip: { enabled: false },
		series: [ {
			name: 'Outer',
			data: versionsData,
			dataLabels: {
				enabled: true,
				style: {
					fontSize: '14px'
				},
				color: '#818181'
			}
		}],
		exporting: false,
		credits: false
	});

	$('.difficultyTxt').html(diffTxt);

	Highcharts.setOptions({
		colors: ['#f5d973', '#f5eac9', '#c5e8eb']
	});

	// Radialize the colors
	Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function(color) {
		return {
			radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
			stops: [
					[0,color],
					[1,Highcharts.Color(color).get('rgb')] // darken
					]
		};
	});

	var $expContainer = $('#ExperienceChart'),
		posVal = $expContainer.data('posValue'),
		neutVal = $expContainer.data('neutValue'),
		negVal = $expContainer.data('negValue');

	// Build the chart
	var expChart = new Highcharts.Chart({

		chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				renderTo: 'ExperienceChart',
				margin: [0, 0, 0, 0],
				spacingTop: 0,
				spacingBottom: 0,
				spacingLeft: 0,
				spacingRight: 0
		},
		title: {
			text: ''
		},
		tooltip: {
			enabled: false
		},
		plotOptions: {
			pie: {
				allowPointSelect: false,
				cursor: 'pointer',
				dataLabels: {
					enabled: false,
					color: '#000000',
					connectorColor: '#000000',
					formatter: function() {
						return '<b>'+ this.point.name +'</b>: '+ this.percentage +' %';
					}
				}
			}
		},
		series: [{
			type: 'pie',
			name: '',
			data: [
				   ['Positive', parseInt(posVal, 10)],
				   ['Neutral', parseInt(neutVal, 10)],
				   ['Negative', parseInt(negVal, 10)]
				  ],
			pointPadding: 0,
			groupPadding: 0
		}],
		exporting: false,
		credits: false
	});
};


/*---------------------------------------------------------------------------------------------------------
 * EI Jobs
 *---------------------------------------------------------------------------------------------------------*/

GD.ei.initJobs = function() {
var  $page = $('#PageBodyContents');

GD.ei.init($page);

GD.srch.initLocDisambig($('#FilterLocation'),
	{
		locStr:   $('#FilterLocationString'),
		disambigParent: $('#FilterLocationDisambigPP'),
		top:   25,
		left:   0,
		pickBestMatch: true,
		doFormSubmit: GD.ei._doJobsFilterFormSubmit
	});

GD.link.initTargetedLinks('_job', null, true);

var  opts;

opts = {
onchange: function(event) {
		GD.dom.submitForm('#JobsRadiusFilterForm');
		event.preventDefault();
	}
};

$('#JobSearchRadiusSelect').gdSelect(opts);
};

/*
 * Perform submission behavior when the user submits the filter.
 *
 * @return  true to continue submitting the form, and false otherwise.
 */
GD.ei._doJobsFilterFormSubmit = function() {
GD.dom.clearPage();

$('#JobsFilterForm')[0].submit();
return false;
};


/*---------------------------------------------------------------------------------------------------------
 * EI Photos
 * NOTE: This is only used when there is no photo data. Otherwise GD.photos.initPhotoPage() is called.
 *---------------------------------------------------------------------------------------------------------*/

GD.ei.initPhotos = function() {
var  $page = $('#PageBodyContents');

GD.ei.init($page);

if(!GD.ei.isLoggedIn) {
GD.ei._initFlagReviews("photo", "pi-flag-photo");
GD.ei._initHelpfulReview("photo", "pi-helpful-photo");
}
};


/*---------------------------------------------------------------------------------------------------------
 * EI Connections
 *---------------------------------------------------------------------------------------------------------*/

GD.ei.initConnections = function(hasData, facebookAppId) {
var  $page = $('#PageBodyContents');

GD.ei.init($page);

if (hasData) {
GD.runOnFacebookLoad(function() {
	GD.fb.initFbSendDialog(facebookAppId);
	});
}
};


/*---------------------------------------------------------------------------------------------------------
 * Employer Interviews Helpful Bar
 *---------------------------------------------------------------------------------------------------------*/

GD.ei.initInterviewsHelpfulBar = function (employerId) {

var  HELPFUL_AJAX_URL = '/track/ajax/expressionOfInterestAjax.htm?';
var  PREFIX = 'INTERVIEW_';
var  expressionOfInterestEnum;

var  $popupBar = GD.popupBar('.interviewsHelpfulBar',
		{
		onShow: function() {
			/*
			 * track 'next' button click in Google Analytics.
			 *
			 * event-category = "content-interest"
			 * event-action = "show-interview-bar"
			 * event-label = not defined
			 * event-non-interaction = true (meaning, dont count it for bounce rates)
			 */
			GD.analytics.trackEvent('content-interest',
					'show-interview-bar', null,
					1, true);
			}
		});

var  $buttons = $('.helpfulBtn, .closeBox', $popupBar);

function handleError(expressionOfInterestEnum, employerId, error) {

var message = "Bad request to " + HELPFUL_AJAX_URL + "; params[expressionOfInterestEnum=" +
	expressionOfInterestEnum + "&employerId=" + employerId +"]";

if (typeof error === 'string') {
message += "; error: " + error;
}

Logger.logToServer(message);
}

$buttons.on('click', function (event) {
/*
   * chrome forces us to use currentTarget because we're looking for the button, not the span inside it.
   */
var $btn = $(event.currentTarget);

if ($btn.is('.helpful') || $btn.is('.notHelpful')) {

expressionOfInterestEnum = PREFIX + ($btn.is('.helpful') ? 'HELPFUL' : 'NOTHELPFUL');
}
else if ($btn.is('.closeBox')) {

expressionOfInterestEnum = PREFIX + 'BANNER_CLOSE';
}
else {

/*
	* currentTarget should have explicit className for helpful, not-helpful or closeBox.
	* If neither is the case, do nothing.
	*/
return false;
}

$.ajax({
	url:  HELPFUL_AJAX_URL,
	method:  'post',
	data:  {
		expressionOfInterestEnum: expressionOfInterestEnum,
		employerId:     employerId
		},
	success: function (data) {
		if (data.status.toUpperCase() !== 'SUCCESS') {
		handleError(expressionOfInterestEnum, employerId);
		}
		},
	error:  function (error) {
		handleError(expressionOfInterestEnum, employerId, error.statusText);
		},
	complete: function () {
		$buttons.off('click');
		GD.ei._closePopupBar($popupBar, 1800);
	}
});
});
};


/*---------------------------------------------------------------------------------------------------------
 * Employer Overview Edit
 *---------------------------------------------------------------------------------------------------------*/

GD.ei.gotoEditEmployerInfo = function(employerId, editEIUrl) {
var  redirectUrl = location.pathname;

if (editEIUrl.contains('?')) {
editEIUrl += '&';
}
else {
editEIUrl += '?';
}

var  editUrl = editEIUrl + "employerId=" + employerId + "&redirectURL=" +
	encodeURIComponent(redirectUrl) + "&minimal=true";

GD.dom.clearWindowAndRedirect(editUrl);

return false;
};

GD.ei.editEmployerInfoInit = function() {
GD.site.init();

GD.ajax.createLocationAutoComplete($('#CompanyCountryField'), $('#CompanyCityField'),
		$('#CompanyCityIdField'));

GD.ajax.createEmployerAutoComplete('#CompanyCompetitorNameField1', '#CompanyCompetitorIdField1');
GD.ajax.createEmployerAutoComplete('#CompanyCompetitorNameField2', '#CompanyCompetitorIdField2');
GD.ajax.createEmployerAutoComplete('#CompanyCompetitorNameField3', '#CompanyCompetitorIdField3');

$('select').gdSelect();

$('#CompanyStatusField').change( function() {
if ( $(this).val() == 'ACQUIRED' ) {
$('#CompanyStatusText').removeClass('hidden')
	.find('label').text('by');
}
else if ( $(this).val() == 'OPERATING_SUBSIDIARY' ) {
$('#CompanyStatusText').removeClass('hidden')
		.find('label')
		.text('of');
}
else {
$('#CompanyStatusText').addClass('hidden');
$('#StatusText').val('');
}
});
};

GD.ei.editEmployerCompleteClose = function() {
var  $completeAlert = $('#CompanyEditsReceivedAlert');

$completeAlert.hide('blind', null, 200,
	function() {
		$completeAlert.remove();
	});
return false;
};


/*---------------------------------------------------------------------------------------------------------
 * Employer Filter
 *---------------------------------------------------------------------------------------------------------*/

GD.ei.submitEmployerInfoFilter = function(event) {
var  $form = $(event.target).closest('form');
var  $jobTitle = $form.find('#FilterJobTitle');

$form.submit();

GD.dom.clearPage();
};


/*---------------------------------------------------------------------------------------------------------
 * Toggle awards display
 *---------------------------------------------------------------------------------------------------------*/

GD.ei.showMoreAwards = function(instant) {
var  lessAwards = $('.awardsShortList');
var  lessAwardsToggle = $('#ShowLessAwards');
var  moreAwards = $('.awardsScroller');
var  moreAwardsToggle = $('#ShowMoreAwards');
var  startHeight = lessAwards.height();
var  endHeight = moreAwards.height();
var  maxHeight = moreAwards.css('max-height').replace(/[^0-9]+/g,'');

lessAwards.stop(true, true);
moreAwards.stop(true, true);

endHeight = Math.min(endHeight, maxHeight);

moreAwards.css('overflow-y', 'hidden');
moreAwards.height(startHeight);

lessAwards.fadeOut((instant ? 0 : GD.ei.awardFadeSpeed),
	function() {
	moreAwards.fadeIn((instant ? 0 : GD.ei.awardFadeSpeed),
		function() {
			moreAwardsToggle.hide();
			lessAwardsToggle.show();

			var  options = {
					height: endHeight
				};

			moreAwards.animate(options, (instant ? 0 : GD.ei.awardHideSpeed),
				'easeInOutQuint',
				function() {
					moreAwards.css('overflow-y', 'auto');
					});
			});
	});
return false;
};

GD.ei.showLessAwards = function() {
var  lessAwards = $('.awardsShortList');
var  lessAwardsToggle = $('#ShowLessAwards');
var  moreAwards = $('.awardsScroller');
var  moreAwardsToggle = $('#ShowMoreAwards');
var  endHeight = lessAwards.height();

lessAwards.stop(true, true);
moreAwards.stop(true, true);

moreAwardsToggle.show();
lessAwardsToggle.hide();

var  options = {
height: endHeight
};

moreAwards.css('overflow-y', 'hidden');
moreAwards.animate(options, GD.ei.awardRevealSpeed, 'easeInOutQuint', GD.ei.onAwardsHidden);

return false;
};

GD.ei.onAwardsHidden = function() {
var  lessAwards = $('.awardsShortList');
var  moreAwards = $('.awardsScroller');

moreAwards.fadeOut(GD.ei.awardFadeSpeed,
	function() {
	lessAwards.fadeIn(GD.ei.awardFadeSpeed,
		function() {
			moreAwards.css({
				height: ''
				});
			});
	});

return false;
};



/*---------------------------------------------------------------------------------------------------------
 * Add Award Dialog support
 *---------------------------------------------------------------------------------------------------------*/

GD.ei.showAddEmployerAwardDialogBox = function(employerId) {
	var  urlAddAward = '/award/addEmployerAwardPopup_input.htm' +'?employerId=' + employerId;

	var opts = {
		dialogWidth: 575,
		onLoadComplete: function() {
			GD.ei.onShowAddEmployerAwardDialogBox(true);
		}
	};

	GD.dlgManager.addAjaxDialog(urlAddAward, opts);
	return false;
};

/*
 * Function called after the 'Add Employer Award' dialog has been shown.
 *
 * @param trackAnalytics true if an analytics event should occur for the dialog.
 */
GD.ei.onShowAddEmployerAwardDialogBox = function(trackAnalytics) {
	if (trackAnalytics) {
		GD.analytics.trackPageView('/employerInfo/popup/addAward');
	}

	GD.ajax.createEmployerAwardNameAutoComplete('#AwardName');
	GD.ajax.createEmployerAwardSourceAutoComplete('#AwardSource');

	GD.shim.setPlaceholder($('#AwardSource'), 'e.g. Fortune');
	GD.shim.setPlaceholder($('#AwardName'), 'e.g. 100 Best Companies to Work For');
	GD.shim.setPlaceholder($('#ExternalWebsite'), 'e.g. http://www.fortune.com/bestcompanies');
};

GD.ei.submitAwardDialog = function() {
	var  $shareReviewForm = $('#AddEmployerAwardForm');
	var  formAction = $shareReviewForm.attr('action');

	GD.ajax.submitForm($shareReviewForm, formAction, 'html', GD.ei.processAddAwardDialogResult);
	return false;
};

GD.ei.processAddAwardDialogResult = function(textStatus, data) {
	/*
	 * result would be defined in all cases except run time exception
	 */
	if (data) {
		if (data.trim().length === 0) {
			GD.ei.onAwardDialogCommError();
		} else {
			/*
			 * Validation error
			 */
			GD.dlgManager.getCurrentDialog().setContents(data);
			GD.ei.onShowAddEmployerAwardDialogBox(false);
		}
	} else {
		GD.ei.onAwardDialogCommError();
	}
};

GD.ei.onAwardDialogCommError = function() {
$('#AddEmployerAwardPopup').hide();
$('#AddEmployerAwardErrorPopup').show();

return false;
};

GD.ei.retryAwardDialog = function() {
GD.btn.enable('#AddEmployerAwardFormButton');

/*
  * Delete struts validation errors.
  */
$('#AddEmployerAwardPopup .fieldError').remove();
$('#AddEmployerAwardPopup .errorHeader').hide();

$('#AddEmployerAwardErrorPopup').hide();
$('#AddEmployerAwardPopup').show();

return false;
};


GD.ei.submitJobDetailsFilter = function() {
var  jobDetailsFilterForm = id('SalaryJobSummaryFilterForm');

if (jobDetailsFilterForm && jobDetailsFilterForm.submit) {
jobDetailsFilterForm.submit();
}

return false;
};

GD.ei.submitSalaryBasicFilter = function() {
var  salaryBasicFilterForm = id('SalaryFilterForm');

if (salaryBasicFilterForm && salaryBasicFilterForm.submit) {
salaryBasicFilterForm.submit();
GD.dom.clearPage();
}

return false;
};

GD.ei.submitEISortChange = function(selectList) {
if (selectList && selectList.options) {
var  optionURL = selectList.options[selectList.selectedIndex].value;

if (optionURL) {
GD.dom.clearWindowAndRedirect(optionURL);
}
}
};


/*---------------------------------------------------------------------------------------------------------
Employer over all rating rollup details ajax functions
---------------------------------------------------------------------------------------------------------*/

/**
 * Makes call to server to get get the list of rating details.
 */
GD.ei.getEmployerOverallRatingDetails = function(employerId, locationId, locationType, jobTitle, startDate, endDate) {
var  container = $('#CompanyRatingDetailsContainer');
var  containerContents = container.html().trim();
var  requestURL;
var  dataSource;

if (containerContents.length > 0) {
return;
}

if (isNaN(employerId)) {
return;
}

/*
  * Put in a spinner until data loads...
  */
container.html("<img src='/static/img/spinners/round-gray-16.gif' " +
	"width='16' height='16' alt='please wait...' class='spinner' />");

requestURL = '/Reviews/findEmployerOverallRollupDetailsAjax.htm?employerId=' + employerId;

if ((locationId.trim().length !== 0) && (locationType.trim().length !== 0)) {
requestURL += '&locationId=' + locationId + '&locationType=' + locationType;
}

if (jobTitle.trim().length !== 0) {
/*
   * IE doesn't unescape stuff that is sent to JavaScript, so do it here to be safe.
   */
jobTitle = jobTitle.decodeHTML();
requestURL += '&jobTitle=' + encodeURIComponent(jobTitle);
}

if (startDate !== null && startDate.trim().length !== 0) {
requestURL += '&startDate=' + encodeURIComponent(startDate);
}

if (endDate !== null && endDate.trim().length !== 0) {
requestURL += '&endDate=' + encodeURIComponent(endDate);
}

var  options;

options = {
	url:  requestURL,
	dataType: 'json',
	success: function(data, textStatus) {
		GD.ei.ratingDetailsResponseHandler(data);
		},
	error:  function(XMLHttpRequest, textStatus, errorThrown) {
		GD.ei.ratingDetailsResponseHandler(null);
		}
};

jQuery.ajax(options);
};

GD.ei.ratingDetailsResponseHandler = function(data) {
var  innerHTML;

if (data === null) {
innerHTML = '<p><strong>' +
	'An error occurred in retrieving the details for this company.</strong></p>' +
	'<p>Please try again. If the problem persists, please be assured that our engineers are ' +
	'scrambling to fix the problem.</p>';
}
else {
var  results = data.resultSet;

innerHTML = '<table>';

for (var loop = 0; loop < results.length; loop++) {
var  thisRating = results[loop];

// only show ratings if greater than zero
// added for new employer survey
if (thisRating.value > 0) {
	innerHTML += '<tr>';
	innerHTML += '<th style="border: 1px solid red;">' + thisRating.question + '</th>';
	innerHTML += '<td style="border: 1px solid red;">' + thisRating.value + '</td>';
	innerHTML += '</tr>';
}
}

innerHTML += '</table>';
}

var  container = $('#CompanyRatingDetailsContainer');

container.html(innerHTML);
};


/*********************************************************************************
 * HELPFUL / NOT HELPFUL REVIEW RELATED FUNCTIONS
 *********************************************************************************/

/**
 * Mark a review as either helpful or not helpful.
 *
 * @param respondableId the id for the entity being marked as helpful
 * @param
 * @param isHelpful  true if the review is helpful, false if the review is not helpful
 */
GD.ei.markHelpfulReview = function( respondableId, type, isHelpful ) {

if ((respondableId === null)) {
throw 'GD.ei.markHelpfulReview must have an id.';
}

if ((type === null)) {
throw 'GD.ei.markHelpfulReview must have a type indicator.';
}


if ((isHelpful === null)) {
throw 'GD.ei.markHelpfulReview must have a helpful indicator.';
}

var  url;

if (type == 'EMPLOYER_REVIEW') {
url = "/Reviews/markHelpfulReviewAjax.htm";
}
else if (type == 'INTERVIEW_REVIEW') {
url = "/Interview/markHelpfulReviewAjax.htm";
}
else if (type == 'USER_QUESTION') {
url = "/Interview/markHelpfulQuestionAjax.htm";
}
else if (type == 'USER_RESPONSE') {
url = "/employerInfoAndSearch/markHelpfulResponseAjax.htm";
}
else if (type == 'COMPANY_PHOTO') {
url = "/Photos/markHelpfulPhotoAjax.htm";
}

var  options;

options = {
url:  url,
data:  'respondableId=' + respondableId +
	"&helpful=" + isHelpful,
dataType: 'json',
error:  function(XMLHttpRequest, textStatus, errorThrown) {
	GD.ei.markHelpfulReviewCallback(textStatus, null);
	},
success: function(data, textStatus) {
	GD.ei.markHelpfulReviewCallback(textStatus, data);
	}
};

jQuery.ajax(options);

return false;
};

/**
 * Callback for marking a review as helpful
 *
 * The following are dependencies on divs that must exist on the page that uses this javascript
 * - helpful_XX_YY (where XX is the type and YY is the entity id):
 *  a div that will contain the links to mark a review as helpful or to show the "Thanks" message
 * - helpfulSummary_XX_YY (where XX is the type and YY is the entity id):
 *  div that contains the helpful count and the helpful total. if no votes were previously tracked
 *  for an entity this block is not displayed so on the callback we need to display it to show the counts
 * - helpfulCount_XX_YY (where XX is the type and YY is the entity id):
 *  div that contains the number of helpful votes
 * - helpfulTotal_XX_YY (where XX is the type and YY is the entity id):
 *  div that contains the total number of votes (both helpful and not helpful)
 *
 * @param status The status of the request.
 * @param data  The data returned from the ajax request, or null if an error occurred.
 */
GD.ei.markHelpfulReviewCallback = function(status, data) {
if (data && data.respondableId && data.type && data.responseResult && data.responseResultMessage) {
var  messageBlock = $('#helpful_' + data.type + '_' + data.respondableId);

if (messageBlock.length) {
var responseMsg = data.responseResultMessage;

// Remove beginning and ending quotation marks
var  regStr = new RegExp('^"|"$|.$','gi');

responseMsg = responseMsg.replace(regStr, '');

/*
	* Remove final periods
	*/
regStr = new RegExp('.$');
responseMsg = responseMsg.replace(regStr, '');

messageBlock.html(responseMsg);
}

messageBlock = $('#helpfulSummary_' + data.type + '_' + data.respondableId);

var  countBlock = id( 'helpfulCount_' + data.type + '_' + data.respondableId );
var  totalBlock = id( 'helpfulTotal_' + data.type + '_' + data.respondableId );

if (messageBlock.length && countBlock && totalBlock && data.responseResult == 'SUCCESS') {
/*
	* Note that the following code uses a JS trick. Subtracting zero from a string converts
	* that string to a number. Note that addition to a string doesn't do that... it concatenates
	* the number to the string.
	*/
if (data.helpful) {
	countBlock.innerHTML = (countBlock.innerHTML - 0) + 1;
}

totalBlock.innerHTML = (totalBlock.innerHTML - 0) + 1;


if (messageBlock.hasClass('hidden')) {
	messageBlock.removeClass('hidden');
}
else {
	var  tagName = messageBlock[0].tagName;

	if (tagName == 'SPAN') {
	messageBlock.css('display', 'inline');
	}
	else {
	messageBlock.css('display', 'block');
	}
}
}
}
else {
throw 'GD.ei.markHelpfulReviewCallback - missing response.';
}
};


/*---------------------------------------------------------------------------------------------------------
 * Employer Info INTERVIEWS javascript
 *---------------------------------------------------------------------------------------------------------*/

GD.ei.onInterviewReviewSearchButtonClick = function() {
GD.dom.clearPage();

return true;
};

GD.ei.showAllInterviewTopJobs = function() {
var  topJobsShort = $('#TopJobsListShort');
var  topJobsLong = $('#TopJobsListLong');

topJobsShort.toggleClass('hidden');
topJobsLong.toggleClass('hidden');

return false;
};

GD.ei.toggleAddTagModule = function(questionId) {
var  addTagsForm = $('#AddTagsForm_' + questionId);
var  toggleAnchor = $('#AddTagsToggle_' + questionId);

if (addTagsForm.length) {
var  isShown = (addTagsForm.css('display') != 'none');

if (isShown) {
/*
	* Hide it.
	*/
addTagsForm.css('display', 'none');

if (toggleAnchor.length) {
	toggleAnchor.css('background', 'url(/static/img/icons/arrows/right.gif) no-repeat left 2px transparent');
	toggleAnchor.css('padding-right', '13px');
}
}
else {
/*
	* Show it.
	*/
addTagsForm.css('display', 'block');

if (toggleAnchor.length) {
	toggleAnchor.css('background', 'url(/static/img/icons/arrows/down.gif) no-repeat left 2px transparent');
	toggleAnchor.css('padding-right', '13px');
}

/*
	* Set focus to the edit field in the tag editor
	*/
addTagsForm.find("input[type='text']").focus();
}
}

return false;
};

GD.ei.cancelAddTag = function(questionId, tagEditorId) {
GD.ei.toggleAddTagModule(questionId);
GD.aug.clearTags(tagEditorId);
};


/**
 * Add tags to a question
 * - QuestionTagEditor_XX_Value (where XX is the questionId): input field where new tags are retrieved from
 * - TagError_XX (where XX is the questionId): div where errors are displayed
 *
 * @param questionId
 */
GD.ei.addTagsToQuestion = function(questionId) {
try {
if ((questionId === null)) {
throw 'must have a question id.';
}

var  tagInput = id( 'QuestionTagEditor_' + questionId + '_Value');

if ((tagInput === null)) {
throw 'must have tag editor input field.';
}

var  newTags;
var  errorBlock;

newTags = tagInput.value;

if (newTags === null || newTags.length === 0) {
// The user did not enter any tags. Show an error.
errorBlock = id( 'TagError_' + questionId );
errorBlock.innerHTML = 'You must enter a value for this field.';
errorBlock.style.display = 'block';
return;
}
else {
errorBlock = id( 'TagError_' + questionId );
errorBlock.innerHTML = '';
errorBlock.style.display = 'none';
}

options = {
'url':  '/Interview/addTagsToQuestion.htm',
'data':  {
	questionId:  questionId,
	newTags:  newTags
	},
'dataType': 'json',
'error': function(XMLHttpRequest, textStatus, errorThrown) {
		GD.ei.addTagsToQuestionCallback(textStatus, null,
				'QuestionTagEditor_' + questionId);
	},
'success': function(data, textStatus) {
		GD.ei.addTagsToQuestionCallback(textStatus, data,
				'QuestionTagEditor_' + questionId);
	}
};

jQuery.ajax(options);

/*
   * Close the tag editor.
   */
GD.ei.toggleAddTagModule();
}
catch (e) {
Logger.fatal('GD.ei.addTagsToQuestion', e);
}
};

/**
 * Callback for adding tags to a question
 *
 * The following are dependencies on divs that must exist on the page that uses this javascript
 * - TagError_XX (where XX is the questionId): div where errors are displayed
 * - QuestionTags_ (where XX is the questionId): div where all tags (existing and newly added) are displayed
 *
 * @param status The status of the request.
 * @param data  The data returned from the ajax request, or null if an error occurred.
 */
GD.ei.addTagsToQuestionCallback = function(textStatus, data, tagEditorId) {

var  expandableTagsThreshold = 9;

try {
if (data && data.questionId) {
if (data.tagsWithLinks) {
	var  tagBlock = id('QuestionTags_' + data.questionId);

	GD.tagList.addTags(data.questionId, data.tagsWithLinks);

	tagBlock.style.display = 'block';

	if (tagEditorId) {
	/*
	 * Clear the contents of the tag editor.
	 */
	GD.aug.clearTags(tagEditorId);
	}
}
else {
	throw 'missing error or tags.';
}
}
else {
var  errorBlock = id( 'TagError_' + data.questionId );

errorBlock.innerHTML = data.error;
errorBlock.style.display = 'block';
}
}
catch (e) {
Logger.fatal('interviews.js / GD.ei.addTagsToQuestionCallback()', e);
}
};


/*---------------------------------------------------------------------------------------------------------
 * Employer Info COMMENTS
 *---------------------------------------------------------------------------------------------------------*/

GD.ei.checkForCommentsError = function() {
var  postCommentForm = $('form#PostCommentForm');
var  errors = $('.fieldError', postCommentForm);

if (errors.length > 0) {
var  scrollSettings = {
		easing:  'easeInOutCubic'
		};
jQuery.scrollTo(postCommentForm, 400, scrollSettings);
}
};


/*---------------------------------------------------------------------------------------------------------
 * Init Toggleable areas
 *---------------------------------------------------------------------------------------------------------*/

/*
 * Used in
 * -- reviews page in filters and employee reviews More/Less
 * -- individual review page, with comments
 * -- salaries, job summary page
 */
GD.ei._initToggles = function(){
$('.toggleable .toggleOn').not('.'+GD.ei.OK)
	.addClass(GD.ei.OK)
	.on('click',
		GD.ei._toggleOn);

$('.toggleable .toggleOff').not('.'+GD.ei.OK)
	.addClass(GD.ei.OK)
	.on('click',
		GD.ei._toggleOff);
};

GD.ei._toggleOn = function(event) {
var  $btn = $(this);
var  $toggleable = $btn.closest('.toggleable');
var  $otherBtn = $toggleable.find('.toggleOff');
var  $toggleBody = $toggleable.find('.toggleBody');

$btn.hide();
$otherBtn.show();
$toggleBody.show();

event.preventDefault();
};

GD.ei._toggleOff = function(event) {
var  $btn = $(this);
var  $otherBtn = $btn.siblings('.toggleOn');
var  $toggleable = $btn.closest('.toggleable');
var  $toggleBody = $toggleable.find('.toggleBody');

$btn.hide();
$otherBtn.show();
$toggleBody.hide();

event.preventDefault();
};


/*---------------------------------------------------------------------------------------------------------
 * Employer Info Review - Interview Filter
 *---------------------------------------------------------------------------------------------------------*/

GD.ei._initReviewsFilter = function ($page, isNonMember) {
	var  onChangeFunc;

	if (isNonMember) {
		onChangeFunc = GD.ei.submitEmployerInfoFilter;
	}

	$page.find('.reviewFilter.filterBox select.loc')
	.gdSelect({ onchange: onChangeFunc, autoWidth: false });
};


/*---------------------------------------------------------------------------------------------------------
 * Employer Info Review - Clicking on blurred/locked reviews
 *---------------------------------------------------------------------------------------------------------*/

GD.ei._initLockedReviewClicks = function($page) {
	/* Blurry text will now trigger the sign in modal */
	var  $clickAreas = $page.find('.lockedReview .description > p');
	var  isNonValidatedUser = $('body').is('.unvalidated');
	var  isExpiredUser = GD.ei.isLoggedIn && !isNonValidatedUser;

	if (isNonValidatedUser) {
		/* Users who are not validated should only click on the resend validation button */
		$('a.lockedReview').on('click', function(e){
			e.preventDefault();
		});

	} else if(isExpiredUser) {
		// Users who are not logged in and validated will only see locked reviews if their membership has expired
		// Don't let them click on a paragraph
		$clickAreas.on('click', function(e){
			e.preventDefault();
		}).css('cursor','default');

	} else {
		$clickAreas = $clickAreas.not('.firstLockedReview .description > p.sneakPeekItemPromoBox');
		$clickAreas.on('click', function(e){
			e.preventDefault();

			var  modalOptions = {
				gaViewLabel: '/splash/login/ri-locked-review',
				userOriginHook: 'GIVETOGET_BLUR'
			};

			GD.site.loginPopup.createDlg(modalOptions);
		});

		// Add the review summary text to the list of modal triggers
		$('.lockedReview h2.summary').on('click', function(e) {
			e.preventDefault();

			var modalOptions = {
				gaViewLabel  : '/splash/login/ri-locked-review',
				userOriginHook : 'GIVETOGET_LOCKED_CONTENT'
			};

			GD.site.loginPopup.createDlg(modalOptions);
		});

		// Add the "Sign up with email" link in the first CTA to the list of modal triggers
		$(".fbSigninCTAWrapper .emailSignUp a").on('click', function(e) {
			e.preventDefault();

			var modalOptions = {
				gaViewLabel  : '/splash/login/ri-locked-review',
				userOriginHook : 'GIVETOGET_LOCKED_CONTENT'
			};

			GD.site.loginPopup.createDlg(modalOptions);
		});

		// Add the "Sign up in seconds ..." link to the list of modal triggers
		$(".reviewFooter .helpfulQuery a").on('click', function(e){
			e.preventDefault();

			var modalOptions = {
				gaViewLabel  : '/splash/login/ri-locked-review',
				userOriginHook : 'CONTENT_HELPFUL_REVIEW'
			};

			GD.site.loginPopup.createDlg(modalOptions);
		});
	}
};


/*---------------------------------------------------------------------------------------------------------
 * Employer Info Review - Clicking on blurred/locked reviews
 *---------------------------------------------------------------------------------------------------------*/

GD.ei._initLockedInterviewClicks = function() {

/* Blurry text will now trigger the sign in modal */
var $clickAreas = $(".lockedInterviewReview a.signUpLink");

$clickAreas.on('click', function(e){
e.preventDefault();

var modalOptions = {
	CAHeading  : "Create an account to see all interviews - it's easy, free and private!",
	SIHeading  : 'Sign In to see all interviews',
	gaViewLabel  : '/splash/login/ii-locked-review',
	userOriginHook : 'GIVETOGET_LOCKED_CONTENT'
};

GD.site.loginPopup.createDlg(modalOptions);
});
};

GD.ei._initAutosizingTextAreas = function() {
var minHeight = 48;

$("textarea").keypress(function(event){
var h = $(this);
h.height(minHeight).height(h[0].scrollHeight);
});
};


/*---------------------------------------------------------------------------------------------------------
 * Employer Review Highlights - When clicked, load reviews via AJAX
 *---------------------------------------------------------------------------------------------------------*/

GD.ei._initReviewHighlights = function() {
	var totalRecordCount = Number($("#MainCol .counts").first().find('.notranslate').text().replace(",",""));
	GD.analytics.trackEvent("review-highlights", "highlights-impression", "", totalRecordCount);

	$(".reviewHighlightsList").find("span.link").each(function() {
		var term = $(this).text();
		var termId = $(this).data("term-id");

		$(this).on("click", function() {
			$(this).closest('ul').find('li span').addClass("link");
			$(this).removeClass("link");

			var termType = $(this).closest('li').hasClass('pro') ? 'pro' : 'con';

			GD.ei.ajaxReviewHighlightPageLoad(term, termId, termType, 1);
		});
	});
};

GD.ei.ajaxReviewHighlightPageLoad = function(term, termId, termType, pageNumber, precall) {
	var ajaxPath = '/Reviews/employerReviewHighlightsAjax.htm';
	var reviewsContainer  = $("#EmployerReviews").length > 0 ? $("#EmployerReviews") : $("#ReviewList");
	var nonMemberPagingNav = $("#MainCol > #FooterPageNav");
	var clickedTerm = true;

	if(nonMemberPagingNav.length > 0) { nonMemberPagingNav.fadeOut(); }
	reviewsContainer.stop().fadeTo("slow", 0, function() {
		reviewsContainer.before("<div class='spinner margVert10' style='text-align: center'><p><img height='24' width='24' src='/static/img/spinners/round-gray-24.gif' /></p></div>");

		if(typeof precall === 'function') {
			// precalls are only passed if the user clicked on an element in the pager
			clickedTerm = false;
			precall();
		}

		$.ajax({
			url:  ajaxPath,
			method: 'GET',
			data: {
				'reviewHighlightTermId' : termId,
				'pageNumber': pageNumber
			},
			success: function (response) {
				reviewsContainer.parent().find(".spinner").remove();
				var spaceSwapRegexStr = "[ \\/\\-\\.\\'\\\\]";

				// Case insensitive search/replace from: http://stackoverflow.com/a/280805/839847
				if(term.indexOf('-') == -1) {
					term = (term + '').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\><\|\:])/g, "\\$1");
					term = term.replace(" ", spaceSwapRegexStr);
				}

				var regex = new RegExp( '(' + term + ')', 'gi' );
				response = response.replace( regex, "<span class='highlightTerm'>$1</span>" );

				reviewsContainer.html(response).fadeTo("slow", 1);

				// Only active highlights in the appropriate (pros or cons, not both) paragraph
				$(".description ." + termType).addClass('highlightsActive');

				// Update the # of reviews above the filter
				var updatedTotalRecordCount = Number(reviewsContainer.find(".pagedResultNavBar .pagingRange .totalRecordCount").text().replace(",",""));
				var displayTerm = term.replace(spaceSwapRegexStr, " ");
				var newCountsHTML = '<tt class="notranslate">' + updatedTotalRecordCount + '</tt> Reviews Mentioning "<span class="capitalize">' + displayTerm + '</span>"';
				$("#MainCol .counts").fadeTo("slow", 0, function() {
					$(this).html(newCountsHTML).fadeTo("slow", 1);
				});

				// Replace the filter sorts with a 'return to all reviews' link
				if($("#MainCol .sorts").text().indexOf("all Reviews") == -1) {
					$("#MainCol .sorts")
					.fadeTo("slow", 0, function() {
						$(this).html('<div class="floatRt"><a href="#">Return to all Reviews</a></div>')
						.fadeTo("slow", 1)
						.click(function(e) {
							e.preventDefault();

							var currentTerm = $(".reviewHighlightsList").first().find("span:not(.link)");
							var currentTermType = currentTerm.closest("li").hasClass('pro') ? "pro" : "con";
							var updatedTotalRecordCount = Number(reviewsContainer.find(".pagedResultNavBar .pagingRange .totalRecordCount").text());
							GD.analytics.trackEvent("review-highlights", "undo-highlight-click-" + currentTermType, currentTerm.text(), updatedTotalRecordCount);
							setTimeout(function(){ location.reload(); }, 100); // Slight delay to make sure GA records event
						});
					});
				}

				// Handle clicks on pager elements within ajax content
				$(".pagingControls ul li > span.link").on("click", function() {
					var pageNum = $(this).text();
					GD.analytics.trackEvent("review-highlights", "highlight-pagination", displayTerm, updatedTotalRecordCount);
					GD.ei.ajaxReviewHighlightPageLoad(term, termId, termType, pageNum, GD.ei.scrollToReviewFilter);
				});

				if(clickedTerm) {
					GD.analytics.trackEvent("review-highlights", "highlights-click-" + termType, displayTerm, updatedTotalRecordCount);
				}

				GD.analytics.trackEvent("review-highlights", "highlights-impression", "", updatedTotalRecordCount);
			},
			error:  function (error) {
				reviewsContainer.html(GD.ei.AJAX_ERROR);
			}
		});
	});
};

GD.ei.scrollToReviewFilter = function() {
	var x = $(".counts:first").offset().top;
	jQuery('html,body').animate({scrollTop: x}, 400);
};

/*-----------------------------------------------------------------------------------------------------------
 * Employer Review Comments - Track click events on various links
 *-----------------------------------------------------------------------------------------------------------*/
GD.ei._initGAEventTracking = function() {
	$('.counts .viewMostRecent a').on('click', function(e){
		GD.analytics.trackEvent('Internal Linking', 'Go to Review Infosite', 'Src: View Most Recent link');
	});

	$('.eiFilter > button').on('click', function(e){
		GD.analytics.trackEvent('Internal Linking', 'Go to Review Infosite', 'Src: Search');
	});

	$('.sorts .sortByDate').on('click', function(e){
		GD.analytics.trackEvent('Internal Linking', 'Go to Review Infosite', 'Src: View Reviews by Date');
	});

	$('.sorts .sortByRating').on('click', function(e){
		GD.analytics.trackEvent('Internal Linking', 'Go to Review Infosite', 'Src: View Reviews by Rating');
	});

	$('#MainCol').on('click', '.reviewBody h2.summary a', function(e){
		GD.analytics.trackEvent('Internal Linking', 'Go to Review Comments Page', 'Src: View Individual Review');
	});

	$('a.viewFullReview').on('click', function(e){
		GD.analytics.trackEvent('Internal Linking', 'Go to Review Infosite', 'Src: Individual Review More Link');
	});

	$('.newerReviews h3 a').on('click', function(e){
		GD.analytics.trackEvent('Internal Linking', 'Go to Review Infosite', 'Src: View Most Recent button');
	});
};


/*-----------------------------------------------------------------------------------------------------------
 * Employer Review Comments - Display complete reviews when the user clicks 'more' link on truncated reviews
 *-----------------------------------------------------------------------------------------------------------*/
GD.ei._initExpandReviews = function() {

var FULL_REVIEW_URL = '/Reviews/employerReviewCommentsAjax.htm';

$(".viewFullReview").on('click', function(event) {
event.preventDefault();

var reviewId = $(this).data("review-id");
var elementToReplace = $(this).closest(".review");

$.ajax({
url:  FULL_REVIEW_URL + "?reviewId=" + reviewId,
method:  'GET',
success: function (response) {
	elementToReplace.fadeOut(function() {
		$(this).removeClass().html(response).fadeIn();
	});
	},
error:  function (error) {
	elementToReplace.html(GD.ei.AJAX_ERROR);
	}
});
});
};


/*---------------------------------------------------------------------------------------------------------
 * Employer Info Links - Was this review helpful and flag review
 *---------------------------------------------------------------------------------------------------------*/

GD.ei._initFlagReviews = function(reviewType, gaLabel, userOriginHook) {

	if(userOriginHook === 'undefined') {
		userOriginHook = 'NOT_IDENTIFIED';
	}

	$('#EI').on('click', '.reviewFooter .flagContent .link', function(e) {
		e.preventDefault();

		var modalOptions = {
			CAHeading  : 'Create an account to flag this ' + reviewType + ' as inappropriate',
			SIHeading  : 'Sign In to flag this ' + reviewType + ' as inappropriate',
			gaViewLabel  : '/splash/login/' + gaLabel,
			userOriginHook : userOriginHook
		};

		GD.site.loginPopup.createDlg(modalOptions);
	});
};

GD.ei._initHelpfulReview = function(reviewType, gaLabel, userOriginHook) {

	if(userOriginHook === 'undefined') {
		userOriginHook = 'NOT_IDENTIFIED';
	}

	$('#EI').on('click', '.reviewFooter .helpfulQuery .link', function(e) {
		e.preventDefault();

		var modalOptions = {
			CAHeading  : 'Create an account to give feedback to this ' + reviewType,
			SIHeading  : 'Sign In to give feedback to this ' + reviewType,
			gaViewLabel  : '/splash/login/' + gaLabel,
			userOriginHook : userOriginHook
		};

		GD.site.loginPopup.createDlg(modalOptions);
	});
};

/*---------------------------------------------------------------------------------------------------------
 * Employer Info Review - Inline Posting and Editing of Employer Response
 *---------------------------------------------------------------------------------------------------------*/

GD.ei.initEmpResponse = function() {

var POST_AJAX_URL_REVIEW = '/Reviews/postReviewCommentsAjax.htm',
POST_AJAX_URL_INTERVIEW = '/Interview/postReviewCommentsAjax.htm',
POST_AJAX_URL = '';

$('#EI').on('click', '.reviewFooter .userCommentsAndFlags .commentLink',
	function (event) {
		event.preventDefault();

		var  $this = $(event.currentTarget);
		var  $parent;
		var  $parentDiv = $this.parent('.respond');

		if ($this.hasClass('intRvw')) {
		$parent = $this.closest('.interview');
		POST_AJAX_URL = POST_AJAX_URL_INTERVIEW;
		}
		else if ($this.hasClass('empRvw')) {
		$parent = $this.closest('.employerReview');
		POST_AJAX_URL = POST_AJAX_URL_REVIEW;
		}

		var $post = $parent.find('button.post');
		var $cancel = $parent.find('button.cancel');

		var $response = $parent.find('.empResponse');

		if	($response.is(':visible')){
			$response.hide('blind');
			$parentDiv.add($this).removeClass('active');
		} else {
			$response.show('blind');
			$response.find('.ajaxResponse').hide();
			$parentDiv.add($this).addClass('active');
		}

		$post.on('click', function(event){
		if (POST_AJAX_URL == POST_AJAX_URL_REVIEW){
		GD.marketo.registerEvent('RESPOND_TO_REVIEW');
		}
		initPostEmpResp(event, $parent, $parentDiv, false);
		event.preventDefault();
		});

		$cancel.off('click');
		$cancel.on('click',
		function(event) {
			$response.hide('blind');
			$parentDiv.css('background-color', 'white');
			event.preventDefault();
		});

		return false;
	});

$('.commentEditDel .edit').on('click',
		function(event) {
		event.preventDefault();

		var  $this = $(event.currentTarget);
		var  $parent;
		var  responseId = $this.data('responseId');

		if ($this.hasClass('intRvw')) {
		$parent = $this.closest('.interviewReview');
		POST_AJAX_URL = POST_AJAX_URL_INTERVIEW;
		}
		else if ($this.hasClass('empRvw')) {
		$parent = $this.closest('.employerReview');
		POST_AJAX_URL = POST_AJAX_URL_REVIEW;
		}

		var  $comment;
		var  $response;
		var  $ajaxResponse;
		var  $cancel;

		if ($parent.length){

		var $post = $parent.find('button.post');

		$cancel = $parent.find('button.cancel');

		$comment = $parent.find('.empRepComment');
		$response = $parent.find('.empResponse');
		$ajaxResponse = $response.find('.ajaxResponse');
		$ajaxResponse.hide();

		$post.on('click', function(event) {
			initPostEmpResp(event, $parent, null, true);
			event.preventDefault();
		});
		}
		else {
		/*
			* Review Detail Page
			*/
		$comment = $this.closest('.empRepComment');
		$response = $comment.siblings('.empResponse');
		$cancel = $parent.find('button.cancel');
		}

		if ($response.find('input.isEdit').length) {
		$response.find('input.isEdit').val('true');
		}
		else {
		$response.find('form').append('<input type="hidden" name="edit" class="isEdit" value="true" />');
		}

		if ($response.find('input.responseId').length) {
		$response.find('input.responseId').val(responseId);
		}
		else {
		$response.find('form').append('<input type="hidden" name="userResponseId" class="responseId" value="' + responseId + '" />');
		}

		$comment.hide('blind');
		$response.css('margin-top','15px');
		$response.show('blind');

		$cancel.off('click');

		$cancel.on('click', function(event) {
		$comment.show('blind');
		$response.hide('blind');
		event.preventDefault();
		});
		});

$('.commentEditDel .delete').on('click',
		function(event) {
		event.preventDefault();

		var $this = $(event.currentTarget);
		var $parent, $empRepComment;

		if($this.hasClass('intRvw')) {
			$parent = $this.closest('.interviewReview');
		}
		else if ($this.hasClass('empRvw')) {
			$parent = $this.closest('.employerReview');
		}

		if ($parent.length) {
			$empRepComment = $parent.find('.empRepComment');
		}
		else {
			$empRepComment = $this.closest('.empRepComment');
		}

		var  deleteURL = $this.data('deleteUrl');

		if ($this.data('responseId')) {
			deleteURL += '&userResponseId=' + $this.data('responseId');

			GD.ei.showDeleteContentConfirm(deleteURL, 'response', true,
					true, null,
					function(response) {
					if (response){
					if (response.success) {
						$empRepComment.remove();
					}
					}
					GD.dlgManager.hideDialog();
					$('#empReview_' + $parent.attr('id').split('_').pop() ).find('.respond').css('background-color', 'white')
					.show();
					return true;
					});
		}

		return false;
		});

function initPostEmpResp(event, $parent, $parentDiv, isEdit) {
var  $btn = $(event.currentTarget).closest('.gd-btn');
var  $form = $btn.closest('form');
var  id = $form.find('.respondableId').val();

$form.attr('id', 'EmpResponse_'+id);

var elemHolder = {
	$btn   : $btn,
	$parent   : $parent,
	ok    : function(msg) {
		GD.struts.showSuccess($form, null, msg);
		GD.btn.label($btn, GD.ei.POST_BTN_LABEL);
		GD.wait(1000)
		.then( function() {
			elemHolder.showResponse();
		});
		},
	showResponse : function() {
		elemHolder.$parent.find('.empResponse').hide('blind');
		elemHolder.$parent.find('.empRepComment .commentText').text( $form.find('.responseText').val() );
		elemHolder.$parent.find('.empRepComment').show('blind');

		var jobPhrase = elemHolder.$parent.find('.empResponse h4 strong').html();
		elemHolder.$parent.find('.empRepComment .author strong').html( jobPhrase );

		if( $parentDiv ) {
		$parentDiv.hide();
		}
		},
	fail   : function(msg) {
		GD.struts.addError($form, null, msg);
		GD.btn.label(elemHolder.$btn, GD.ei.POST_BTN_LABEL);
		},
	updateResponseId: function(responseId) {
		/*
		 * Update Edit and Delete with the newly created responseId which AJAX call sends back
		 */
		if(!isEdit){
		var $editClick = elemHolder.$parent.find('.commentEditDel .edit');
		var $delClick = elemHolder.$parent.find('.commentEditDel .delete');

		$editClick.data('responseId', responseId);
		$delClick.data('responseId', responseId);
		}
		}
};

var validateOptions = {
		formName:  'EmpResponse_'+id,
		required:  ['responseText'],
		requiredErr: GD.ei.RESPONSE_INVALID_ERROR
		};

GD.struts.clearErrorMessages($form);

var  callback = function (response) {
		if (response.success) {
		GD.btn.label($btn, GD.ei.POSTING_BTN_LABEL);

		$.ajax({
			url:  POST_AJAX_URL,
			method:  'POST',
			data:  $form.serialize().stripHtml(),
			success: function (response) {
				GD.ei.afterPostEmpRepResponse(response, elemHolder, '');
			},
			error:  function (error) {
				GD.ei.afterPostEmpRepResponse(null, elemHolder,
						GD.ei.VALIDATION_ERROR);
			},
			complete: function () {
				//To-do: Fill after backend work
			}
		});
		}
		else {
		var  allMsgs = response.allErrorMsgs();

		if (allMsgs && allMsgs.length) {
		for (var loop = 0; loop < allMsgs.length; loop++) {
		GD.struts.addError($form, null, allMsgs[loop]);
		}
		}
		}
	};

GD.util.validateForm($form, validateOptions, callback);

event.preventDefault();
}
};

GD.ei.initFEAModal = function() {
var $popupDiv = $('.feaSignupSource').clone()
.removeClass('hidden');

// create the popup itself
var opts = {
dialogBody: $popupDiv,
dialogWidth: 450,
occlude: true,
draggable: false,
closeable: true,
onClose: function () {
GD.dlgManager.closeAllDialogs();
},
wrapperClass: 'previewDialog',
onLoadComplete: null,
extraData: null,
modal: true
};

GD.dlgManager.addCustomDialog(opts);
};

GD.ei.afterPostEmpRepResponse = function(response, elemHolder, msg) {
if (response) {
if (response.success) {
elemHolder.ok(GD.ei.POST_SUCCESS);

if (response.hasOwnProperty('userResponseId')) {
	elemHolder.updateResponseId(response.userResponseId);
}
}
else{
elemHolder.fail(GD.ei.VALIDATION_ERROR);
}
}
else {
elemHolder.fail(msg);
}
};

GD.ei.showDeleteContentConfirm = function(deleteURL, reviewType, showPsNote, isAjax, callBeforeFn, callAfterFn) {

var  $messageContainer = $('#DeleteConfirmContainer');

if(typeof showPsNote === 'undefined') showPsNote = true;

if(typeof callBeforeFn === 'undefined') callBeforeFn = null;

GD.site.closeCompletedAction();

if ($messageContainer.length) {
var  $message = $messageContainer.children().clone();
var  $btnWrapper = $message.filter('div.buttons');

var  $psNote  = $message.filter('.psnote');

$btnWrapper.data('deleteUrl', deleteURL);
$btnWrapper.attr('data-delete-url', deleteURL);

if(!showPsNote) {
$psNote.hide();
}

$delButton = $message.find('.deleteButton');
$delButton.data('deleteUrl', deleteURL);

var ajaxOption = {
	url:  deleteURL,
	method:  'GET',
	success: function (response) {
		callAfterFn(response);
		},
	error:  function (error) {
		callAfterFn(null);
		}
	};

$delButton.on('click', function(event){

event.preventDefault();
event.stopPropagation();

$(this).find('span').html('Deleting...');

var deleteUrl = $(this).data('deleteUrl');

if (deleteUrl) {

	if( jQuery.isFunction(callBeforeFn) ) {

	if(callBeforeFn()){

	if(isAjax) {

	$.ajax(ajaxOption);

	} else {

	GD.dom.loadUrl(deleteUrl);
	}

	return;
	}

	}

	if(isAjax) {

	$.ajax(ajaxOption);

	} else {

	GD.dom.loadUrl(deleteUrl);
	}

}

return;
});

$cancel = $message.find('.cancelButton');
$cancel.off('click').on('click', function (event) {

event.preventDefault();
event.stopPropagation();

GD.dlgManager.hideDialog();

return false;
});

GD.dlgManager.showPromptDialog('Are you sure you want to delete your ' + reviewType + '?', $message, true);
}

return false;
};

// Related Companies side section
GD.ei.goRightRelated = function() {
if ( GD.ei.totalRelCompanies > 4 && GD.ei.relCompaniesPos + 4 < GD.ei.totalRelCompanies) {
GD.ei.relCompaniesPos++;

var $relCompanyLogos = $('span[id^="RelCompany"]');
$relCompanyLogos.addClass('hidden');
$relCompanyLogos.each( function(i,v) {
if ( i >= GD.ei.relCompaniesPos && i < GD.ei.relCompaniesPos + 4 ) {
	$(v).removeClass('hidden');
	if (i == GD.ei.relCompaniesPos + 3) {
	$(v).find('.sqLogo').removeClass('margRt20');
	}
	else {
	$(v).find('.sqLogo').addClass('margRt20');
	}
}
});

$('#RelCompanyLt').removeClass('ltArrowInactive')
	.addClass('ltArrowActive');
if ( GD.ei.relCompaniesPos + 4 == GD.ei.totalRelCompanies) {
$('#RelCompanyRt').removeClass('rtArrowActive')
		.addClass('rtArrowInactive');
}
}
};

GD.ei.goLeftRelated = function() {
if ( GD.ei.totalRelCompanies > 4 && GD.ei.relCompaniesPos > 0 ) {
GD.ei.relCompaniesPos--;

var $relCompanyLogos = $('span[id^="RelCompany"]');
$relCompanyLogos.addClass('hidden');
$relCompanyLogos.each( function(i,v) {
if ( i >= GD.ei.relCompaniesPos && i < GD.ei.relCompaniesPos + 4 ) {
	$(v).removeClass('hidden');
	if (i == GD.ei.relCompaniesPos + 3) {
	$(v).find('.sqLogo').removeClass('margRt20');
	}
	else {
	$(v).find('.sqLogo').addClass('margRt20');
	}
}
});

$('#RelCompanyRt').removeClass('rtArrowInactive')
	.addClass('rtArrowActive');
if (GD.ei.relCompaniesPos === 0) {
$('#RelCompanyLt').removeClass('ltArrowActive')
	.addClass('ltArrowInactive');
}
}
};


GD.ei.initFEABanner = function() {
var  $banner = $('#FEAPromoBanner');
var  storage = new GDStorage();

/*
  * Check to see if the alert is present, has contents, and the alert hasn't triggered in the last 3 months
  */
if ($banner.length && storage.isAlertExpired('freeEmployerOverviewSignup', 3 * storage.MONTH_MILLIS, true)) { // NOTE: read-only call
$banner.find('i.medx')
.on('click', function() {
	GD.ei.hideFEABanner($banner);
	storage.isAlertExpired('freeEmployerOverviewSignup', 3 * storage.MONTH_MILLIS); // this actually marks the storage alert as read
});

GD.wait(1)
.then(function() {
	$banner.slideDown(200);
});
}
};

GD.ei.hideFEABanner = function($freeEmpBanner) {
$freeEmpBanner.slideUp();

/*$.ajax({
	url:  '/partners/account/banner_toggle.htm'
}); */
};
window.GD=window.GD||{};GD.help=GD.help||{};window.GD=window.GD||{};GD.home=GD.home||{};GD.empSayingTabs=GD.empSayingTabs||{};GD.home.initNonMember=function(a){GD.site.init();GD.runOnFacebookLoad(function(){GD.fb.initLoginButtons(a,"/profile/createSocialNetworkAccount.htm",GD.dom.getDocUrl());GD.fb.getFbLoginStatus(GD.home.onFbStatus)});GD.empSayingTabs.init()};GD.home.initMember=function(a){GD.site.init();a&&GD.runOnFacebookLoad(function(){GD.fb.initLoginButtons("${facebookRequestedPerms}","/profile/createSocialNetworkAccount.htm",GD.dom.getDocUrl())})};
GD.home.onFbStatus=function(a){Logger.info("Facebook status: "+a);switch(a){case "connected":case "not_authorized":$("div.insideConn").show()}};
GD.home.initResumeUpload=function(){$("#NewResumeUpload").on("change",function(){$(this).val()&&($(".filePickingArea, .bailout").addClass("hidden"),$(".filePickedArea, .continueBtnWrapper").removeClass("hidden"),$("#SelectResumeFileName").html($(this).val().replace("C:\\fakepath\\","")))});$("#ReplacePickedResume").on("click",function(){$(".filePickingArea").removeClass("hidden");$(".filePickedArea").addClass("hidden");$("#NewResumeUpload").val("");$("#SelectResumeFileName").html("");$("#SelectResume").click()});
$("#SelectResume").on("click",function(a){a.preventDefault();$("#NewResumeUpload").trigger("click");$(".userResumeBox").data("gaLbl");GD.analytics.trackEvent("resume-upload","upload-button","Home::Member")})};window.GD=window.GD||{};GD.edu=GD.edu||{};GD.edu.onDegreeProgramSrchSubmit=function(){GD.dom.clearPage();return!0};GD.edu.onCategoryChange=function(a){var b=$("#AreaOfStudySelect").val(),d=$("#ConcentrationsSelect"),c=0!==b;if(c&&d.length&&(a||(a=-1),a=GD.edu.loadConcentrations(d,b,a),!a||0===a.length))c=!1;d.css("display",c?"block":"none");return!0};
GD.edu.loadConcentrations=function(a,b,d){if(!GD.edu.concentrationsMap)return null;a=$(a);a.empty();a.append("<option value='0'>- Select a Concentration -</option>");if(b=GD.edu.concentrationsMap[b])for(var c=0;c<b.length;c++){var e="<option value='"+b[c].id+"'";b[c].id===d&&(e+=" selected='selected'");e=e+">"+b[c].label+"</option>";a.append(e)}return b};window.GD=window.GD||{};GD.feedback=GD.feedback||{};GD.feedback.baseLineHeight=16;GD.feedback.feedbackURL="/search/feedbackRSIAjax.htm";GD.feedback.jobsFeedbackURL="/search/feedbackAjax.htm";GD.feedback.showThanksSeconds=2;GD.feedback.standardAnimationDuration=200;
GD.feedback.initFeedback=function(){var a=$(".searchFeedbackRequest"),b=a.find("span.link");0<=$('input[name="searchType"]').val().indexOf("Jobs")&&(GD.feedback.feedbackURL=GD.feedback.jobsFeedbackURL);b.click(GD.feedback.clickYesOrNo);a.each(function(){var a=$(this);a.attr("defaultHeight",GD.feedback.baseLineHeight);a.css("min-height",GD.feedback.baseLineHeight)});b=a.find(".gd-btn");a=a.find("a.cancelBtn");b.click(GD.feedback.sendFeedback);a.click(GD.feedback.cancelFeedback)};
GD.feedback.clickYesOrNo=function(a){var b=$(a.target),a=b.parents(".searchFeedbackRequest:first"),b=b.hasClass("helpful");GD.feedback.expandForm(a,b)};GD.feedback.expandForm=function(a,b){a.find(".requestPart:visible").fadeOut(GD.feedback.standardAnimationDuration,function(){GD.feedback.showForm(a,b)})};
GD.feedback.showForm=function(a,b){var c=b?".helpfulForm":".notHelpfulForm";$(c).height();a.animate({},{duration:GD.feedback.standardAnimationDuration,complete:function(){$(c,a).fadeIn(GD.feedback.standardAnimationDuration,function(){$(c+" textarea",a).focus()})}})};GD.feedback.shrinkForm=function(a){a.find(".requestPart:visible");a.animate({},{duration:GD.feedback.standardAnimationDuration,complete:function(){GD.feedback.showFeedbackPrompt(a)}})};
GD.feedback.sendFeedback=function(a){var b=$(a.target),c=b.parents(".searchFeedbackRequest:first"),d=b.closest("form"),b=c.find("form.searchDataForm").serialize().trim(),d=d.serialize().trim(),d=d+("&url="+window.location.href);d.length&&b.length&&(d+="&");GD.feedback.sendAjaxFeedback(d+b);GD.feedback.thankFeedback(c);a.preventDefault()};GD.feedback.sendQuickFeedback=function(a){a=$("form.searchDataForm",a).serialize().trim();a.length&&(a+="&");GD.feedback.sendAjaxFeedback(a+"helpful=true")};
GD.feedback.cancelFeedback=function(a){var b=$(a.target).parents(".searchFeedbackRequest:first");b.find(".formWrapper").fadeOut(GD.feedback.standardAnimationDuration,function(){GD.feedback.shrinkForm(b)});a.preventDefault()};GD.feedback.sendAjaxFeedback=function(a){jQuery.ajax({url:GD.feedback.feedbackURL,data:a,dataType:"json"})};GD.feedback.showFeedbackPrompt=function(a){$(".request",a).fadeIn(GD.feedback.standardAnimationDuration)};
GD.feedback.thankFeedback=function(a){$(".requestPart:visible",a).fadeOut(GD.feedback.standardAnimationDuration,function(){var b=a.height(),c=a.attr("defaultHeight");b==c?GD.feedback.showThankFeedback(a):a.animate({height:c},{duration:GD.feedback.standardAnimationDuration,complete:function(){GD.feedback.showThankFeedback(a)}})})};GD.feedback.showThankFeedback=function(a){$(".requestThanks",a).fadeIn(GD.feedback.standardAnimationDuration,function(){GD.wait(1E3*GD.feedback.showThanksSeconds).then(function(){GD.feedback.hideThankFeedbackAgain(a)})})};
GD.feedback.hideThankFeedbackAgain=function(a){var b=$(".requestThanks",a);a.css("height",a.height());a.css("min-height",0);b.fadeOut(GD.feedback.standardAnimationDuration,function(){b.hide();a.css({padding:0,height:a.innerHeight()});a.animate({height:0},{duration:GD.feedback.standardAnimationDuration,complete:function(){GD.feedback.removeFeedbackRequest(a)}})})};GD.feedback.removeFeedbackRequest=function(a){a.css("border-bottom-width",0)};window.GD=window.GD||{};GD.srch=GD.srch||{};GD.srch.initCompanies=function(){GD.site.init();new fixedOnScroll($(".bottomAd").first(),{})};GD.srch.initInterviews=function(){GD.site.init();new fixedOnScroll($(".bottomAd").first(),{})};GD.srch.initSalaries=function(){GD.site.init();new fixedOnScroll($(".bottomAd").first(),{})};GD.srch.submitSearchLocationFilter=function(){var a=$("#LocationFilterForm");a&&(a.submit(),GD.dom.clearPage());return!1};
GD.srch.submitJobsSearchLocationFilter=function(){var a=$("#JobsSearchFilterForm");a.length&&(GD.dom.clearPage(),a.submit());return!1};GD.srch.submitSearchSortChange=function(a){a&&a.options&&(a=a.options[a.selectedIndex].value)&&GD.dom.clearWindowAndRedirect(a)};window.GD=window.GD||{};GD.profile=GD.profile||{};GD.profile.onMembershipLevelClick=function(a,d){var b=$("#TrialAccountDesc"),c=b.is(":visible");a?(c&&b.hide("blind"),$("#CreateAccountFormButtonLabel").html(d?"Create My Account":"Next")):(c||b.show("blind"),$("#CreateAccountFormButtonLabel").html("Create My Account"));return!0};
GD.profile.showUnsubscribeAllConfirm=function(){var a=$("#UnsubscribeAllContainer");a.length&&(a=a.children().clone(!0),GD.dlgManager.showPromptDialog("Unsubscribe from all emails?",a,!1));return!1};
GD.profile.initUnsubscribeAll=function(){$("span.unsubscribeAll").on("click",function(){GD.profile.showUnsubscribeAllConfirm()});$("#UnsubscribeOk").on("click",function(a){a.preventDefault();$('.yesNoList input[value="false"]').click();$('.freqList input[value="NEVER"]').click();$("#SaveChangesButton").click();GD.dlgManager.hideDialog();return!1});$("#UnsubscribeCancel").on("click",function(a){a.preventDefault();GD.dlgManager.hideDialog();return!1})};window.GD=window.GD||{};GD.welcome=GD.welcome||{};GD.welcome.init=function(){GD.welcome.initWizard();GD.aug.augmentCollapsibleGroups()};
GD.welcome.initWizard=function(){var b=$(".wizard123"),d=b.find("input[name=defaultCity]"),c=b.find("input[name=defaultCityId]"),e=b.find("input[name=autoCreateJobAlert]");b.wizardify({gaMethod:function(a){GD.analytics.trackPageView(a)}});$("#SkipJobInterests, #SkipFollow, #ContinueFollow").on("click",function(){b.trigger("skipThisEnableNext");var a=$(this);"SkipJobInterests"==a.attr("id")?($("#FollowCompanies .suggestedCompaniesWidget").trigger("load"),GD.analytics.trackEvent("new-user-flow","job-interest-bailout",
"")):"SkipFollow"==a.attr("id")&&GD.analytics.trackEvent("new-user-flow","company-follow-bailout","")});if(e.length)e.on("change",function(){var a=$(this);a.val(a.is(":checked"))});$("#JobInterestsForm").on("submit",function(a){a.preventDefault();a.stopPropagation();$("#ContinueJobInterest").find("span").html("Saving...");GD.welcome._onJobInterestSubmit($(this));return!1});GD.ajax.createLocationAutoComplete(null,d,c);$("input[name=defaultJobTitle]").focus()};
GD.welcome._onJobInterestSubmit=function(b){var d=b.attr("action"),c=b.find(".errBox"),e=$(".wizard123"),a={};b.find("input[name=defaultJobTitle]");b.find("input[name=defaultCity]");a.retrieveRecommendedAlerts=!0;a.responseType="json";$("input",b).each(function(){a[this.name]=this.value});if(""===a.defaultJobTitle||""===a.defaultCity||"-1"==a.defaultCityId||"0"==a.defaultCityId)return c.slideDown(),!1;c.slideUp();$.ajax({url:d,data:a,success:function(b,d,f){"json"==a.responseType&&-1!=f.getResponseHeader("content-type").indexOf("application/json")?
b.hasOwnProperty("success")&&b.success?($("#FollowCompanies .suggestedCompaniesWidget").trigger("load",{jobTitle:a.defaultJobTitle,rawLocationName:a.defaultCity,cityId:a.defaultCityId}),e.trigger("gotoNext"),GD.analytics.trackEvent("job-alert","new-user-flow-created","")):c.find(".headline").html("Error saving your preferences. Please try again.").slideDown():c.find(".headline").html("Error saving your preferences. Please try again.").slideDown()},error:function(){}})};
GD.welcome.initLines=function(){var b=$(".wizard123 .steps li:first-child").offset().left,d=$(".wizard123 .steps li:first-child").offset().top,c=$(".wizard123 .steps li:last-child").offset().left,e=$(".wizard123 .steps li:last-child").offset().top;$(".wizard123 .steps").line(b,d,c,e,{color:"#c8cacc"})};window.GD=window.GD||{};GD.ajax=GD.ajax||{};GD.ajax.follow=function(c,a,f,b,e){a={url:"/follow/companyAjax.htm",data:{eid:c,follow:!!a,og:!!f},success:function(a,d){jQuery.isFunction(b)&&b(c,a,d)},async:!0};"function"===typeof e&&(a.error=function(a,d,b){e(c,a,d,b)});jQuery.ajax(a)};window.GD=window.GD||{};
(function(c,f){var j={fields:"",enableOnChange:"",warnOnNav:!0,navOkayFields:""};GD.ChangeTracker=function(a){function i(a){a.filter(":text,textarea").on("keypress.changeTracker",function(a){b.onKeypress(a)});a.on("change.changeTracker",function(){b.setChanged(!0)})}var b=this,g=!1,d,h,e,a=a||{},a=c.extend({},j,a);"string"===typeof a.fields?d=c(a.fields):a.fields instanceof jQuery?d=a.fields:Logger.warn("GD.ChangeTracker: 'fields' option should be string or jQuery object.");"string"===typeof a.enableOnChange?
h=c(a.enableOnChange):a.enableOnChange instanceof jQuery?h=a.enableOnChange:Logger.warn("GD.ChangeTracker: 'enableOnChange' option should be string or jQuery object.");"string"===typeof a.navOkayFields?e=c(a.navOkayFields):a.navOkayFields instanceof jQuery?e=a.navOkayFields:Logger.warn("GD.ChangeTracker: 'navOkayFields' option should be string or jQuery object.");i(d);a.warnOnNav&&GD.runAfterBody(function(){c(f).on("beforeunload.changeTracker",function(){return b.getUnloadMsg()})});a.warnOnNav&&e.length&&
e.click(function(){c(f).off("beforeunload.changeTracker")});b.isChanged=function(){return g};b.setChanged=function(a){"boolean"!==typeof a&&(a=!0);if(a&&g!==a&&(g=a))h.each(function(){var a=c(this);a.is(".gd-btn")?GD.btn.enable(a):a.is("input,select")&&a.removeAttr("disabled")}),c(f).trigger("changed")};b.trackFields=function(a){a instanceof jQuery?(d.add(a),i(a)):Logger.warn("GD.ChangeTracker.trackFields should be passed a jQuery object.")};b.onKeypress=function(a){b.isChanged()||GD.event.isTextChangeKeystroke(a)&&
b.setChanged(!0)};b.getUnloadMsg=function(a){"boolean"!==typeof a&&(a=!1);if(b.isChanged())return a?"You have made changes on this page.\n\nDo you want to undo these changes?\n ":"You have made changes on this page.\n\nDo you want to go to another page\nwithout saving your changes?\n "}}})(window.jQuery,window,document);window.GD=window.GD||{};GD.empSayingTabs=GD.empSayingTabs||{};GD.empSayingTabs.init=function(b){$("#EmpSayingTabs").gdTabs({activate:function(b,c){var a=c.newTab;a.data("gaCategory")&&(a.data("gaEvent")&&a.data("gaLabel"))&&GD.analytics.trackEvent(a.data("gaCategory"),a.data("gaEvent"),a.data("gaLabel"))},active:b||0})};window.GD=window.GD||{};GD.industrySelect=GD.industrySelect||{};GD.industrySelect.init=function(a,b,d){try{var c,e;$.each(b,function(b,g){c="#SectorSelectControl"+b;e="#IndustrySelectControl"+b;GD.industrySelect.loadSectors(c,a);isNaN(d[b])&&(d[b]=0);GD.industrySelect.loadIndustries(c,e,a);GD.industrySelect.selectSavedValues(c,e,g,d[b])})}catch(g){Logger.fatal("industrySelect.js / GD.industrySelect.init()",g)}};
GD.industrySelect.loadSectors=function(a,b){var d=$(a);d.empty();b&&d.append("<option value='-1'>- Sector -</option>");for(var c=0;c<sectorList.length;c++)d.append("<option value='"+sectorList[c].id+"'>"+sectorList[c].name+"</option>\n")};
GD.industrySelect.loadIndustries=function(a,b,d){var a=$(a),b=$(b),c,e;c=$("option:selected",a);0===c.length&&($("option:first",a).attr("selected","selected"),c=$("option:selected",a));c=c.val();b.empty();if(0<c){var g;d&&b.append("<option value='-1'>- Industry -</option>");for(d=0;d<sectorList.length;d++){var f=sectorList[d];if(f.id==c){d=f.children;for(f=0;f<d.length;f++)e=d[f].name,g=d[f].id,e=e.trim(),e="<option value='"+g+"' title='"+e+"'>"+e+"</option>\n",b.append(e);break}}}else b.append("<option value='-1' title='Please select Sector first'>Please select Sector first</option>\n");
b.width(a.width());a=b.data("gd-gdSelect");0>=c?(b.attr("disabled","disabled"),"undefined"!==typeof a&&a&&a.disable().refresh()):(b.removeAttr("disabled"),"undefined"!==typeof a&&a&&a.enable().refresh())};GD.industrySelect.selectSavedValues=function(a,b,d,c,e){if(!isNaN(d)){var g=$(a),f=$(b);g.val(d);$("option:selected",g).length&&(GD.industrySelect.loadIndustries(a,b,e),f.length&&!isNaN(c)&&f.val(c))}};
GD.industrySelect._makeNonBreakingSpaces=function(a){for(;" "===a.charAt(0);)a=a.substr(0,0)+" "+a.substr(1);return a};window.GD=window.GD||{};GD.news=GD.news||{};GD.news.recursionCounter=0;GD.news.whenGoogleLoader=function(a){"function"===typeof a&&(GD.news.whenGoogleLoader._funcs?(GD.news.whenGoogleLoader._funcs.push(a),GD.news.whenGoogleLoader._poll()):GD.news.whenGoogleLoader._runOne(a))};GD.news.whenGoogleLoader._funcs=[];
GD.news.whenGoogleLoader._poll=function(){if("google"in window&&"function"===typeof google.load){if(GD.news.whenGoogleLoader._funcs){var a=GD.news.whenGoogleLoader._funcs;Logger.info("Google Loader found.  Running "+GD.news.whenGoogleLoader._funcs.length+" functions.");GD.news.whenGoogleLoader._funcs=null;GD.news.whenGoogleLoader._run(a)}}else Logger.info("GD.news.whenGoogleLoader waiting for Google Loader"),setTimeout(function(){GD.news.whenGoogleLoader._poll()},500)};
GD.news.whenGoogleLoader._run=function(a){for(var c=0;c<a.length;c+=1)GD.news.whenGoogleLoader._runOne(a[c]);GD.news.whenGoogleLoader._run=null};GD.news.whenGoogleLoader._runOne=function(a){try{a()}catch(c){Logger.error("Error in GD.news.whenGoogleLoader._runOne: "+c)}};
GD.news.initNewsFeed=function(a,c,b){GD.news.whenGoogleLoader(function(){switch(b.newsSource){case "FINS_GOOGLE":GD.news.getGenericRssFeed(a,c,b);break;case "PRESS_CENTER":GD.news.getPressCenterFeed(a,c,b);break;case "GOOGLE":GD.news.getGoogleNewsFeed(a,c,b);break;default:GD.news.getGoogleNewsFeed(a,c,b)}})};
GD.news.getGenericRssFeed=function(a,c,b){a=$(a);a.empty().append("<div class='rssNewsItems'>");a=$(".rssNewsItems",a);(new GD.news.RssReader(a)).show(b.newsSourceData,{employerName:c,maxPosts:b.maxItems,maxAgeDays:30,showFeedTitle:!1,dateClass:"minorText",moreNewsLinkText:b.moreNewsLinkText},b)};
GD.news.getPressCenterFeed=function(a,c,b){a=$(a);a.empty().append("<div class='rssNewsItems'>");a=$(".rssNewsItems",a);a=new GD.news.RssReader(a);c={employerName:c,maxPosts:b.maxItems,showFeedTitle:!1,dateClass:"minorText",rssAttribName:b.rssAttribName,moreNewsLinkText:b.moreNewsLinkText};b.googleKeywords&&(c.googleKeywords=b.googleKeywords);a.show(b.newsSourceData,c,b)};
GD.news.getGoogleNewsFeed=function(a,c,b,d){var e=b.googleKeywords,e=e?'"'+e.replace('"',"")+'"':'"'+c.replace('"',"")+'"',a=$(a);jQuery.ajax({url:"http://ajax.googleapis.com/ajax/services/search/news",data:{v:"1.0",key:b.googleSearchKey,q:e,rsz:"small"},dataType:"jsonp",success:function(l){GD.news.onGoogleNewsResponse(c,a,l,e,b,d)},error:function(){GD.news.onGoogleNewsResponse(c,a,null,e,b,d)}})};
GD.news.onGoogleNewsResponse=function(a,c,b,d,e,l){var m,a=!0,f;b&&b.responseData&&(m=b.responseData.results);if(c&&m&&m.length){var o=!1,i=999;l?(a=!1,i=l.fillCount):e.maxItems&&(i=e.maxItems);0>i&&(i=1);l?(b=$(".rssItems",c),b.length||(b=$("<div class='rssItems'></div>"),c.append(b))):(b=$("<div class='results newsSearchResults'>"),c.empty(),c.append(b));if(a){for(f=0;f<m.length&&f<i&&!o;f++)m[f].image&&(o=!0);o&&b.addClass("newsSearchResultsWithPhotos")}var k;for(f=0;f<m.length&&f<i;f++){var h=
m[f],n=$("<div class='storyCol'>"),g=null;k=$("<div class='entry'>");b.append(k);o&&a&&(g=$("<div class='photoCol'>"),k.append(g));k.append(n);if(h.image&&a){var j=$("<a>"),p=$("<img>");p.attr("src",h.image.url).attr("width",h.image.tbWidth).attr("height",h.image.tbHeight);j.attr("href",h.image.originalContextUrl).attr("rel","nofollow").attr("target","_blank");j.append(p);g.append(j)}g=$("<div class='title'>");j=$("<a>"+h.title+"</a>");j.attr("href",h.unescapedUrl).attr("rel","nofollow").attr("target",
"_blank");g.append(j);n.append(g);h.content&&(g=$("<p class='content'>"),j=$("<a>Read More</a>"),j.attr("href",h.unescapedUrl).attr("rel","nofollow").attr("target","_blank"),g.html(h.content+" &ndash; "),g.append(j),n.append(g));j=null;h.publishedDate&&(j=new Date(Date.parse(h.publishedDate)));if(h.publisher||j)g=$("<p class='storyInfo'>"),h.publisher&&(g.html("From: "+h.publisher+" (via Google News)"),j&&g.html(g.html()+" &ndash; ")),j&&(h=$("<span class='date'>"),j=GD.util.durationInPast(j),h.html(j),
g.append(h)),n.append(g);k.append("<div class='clear'>")}l&&e.newsSourceAttrib&&(a=$(e.newsSourceAttrib),f="Provided by ",l.initialSourceAttrib&&(f+=l.initialSourceAttrib+" and "),a.html(f+"Google"));k&&k.addClass("lastEntry");k=$("<p class='moreResults'>");a=$("<a>");f="http://news.google.com/news?q="+encodeURIComponent(d);a.html("<strong>More news matching "+d+"</strong>");a.attr("href",f).attr("rel","nofollow").attr("target","_blank");k.append(a);b.append(k)}if(l){if(l.onComplete)l.onComplete(m.length)}else if(jQuery.isFunction(e.onCompleteCallback))e.onCompleteCallback(c,
m.length,e)};GD.news.monthNames="January February March April May June July August September October November December".split(" ");GD.news.RssReader=function(a){this.rssFeedContainer=$(a)};GD.news.RssReader.prototype.defaultSettings={maxPosts:4,noDataHideSelector:null,showFeedTitle:!0,showAuthor:!0,showDate:!0,showSnippet:!0,showMoreLink:!0,dateClass:"",moreNewsLinkText:null,onCompleteCallback:null};
GD.news.RssReader.prototype.show=function(a,c,b){function d(){(new google.feeds.Feed(a)).load(function(a){e.render(a,c.maxAgeDays,b)})}0===a.indexOf("feed://")&&(a="http"+a.substr(4));var e=this;e.options={};e.options=jQuery.extend(e.options,e.defaultSettings,c);e.options.url=a;GD.news.whenGoogleLoader(function(){GD.news._loadGoogleFeeds(d)})};GD.news._loadGoogleFeeds=function(a){google.load("feeds","1",{callback:a})};
GD.news.RssReader.prototype.render=function(a,c,b){var d=this,e=0,l=!1;b||(b={});if(a.feed&&a.feed.entries&&0<a.feed.entries.length){if(d.rssFeedContainer&&d.rssFeedContainer.length){d.rssFeedContainer.empty();var m=$("<div class='rssItems'>");d.rssFeedContainer.append(m);if(d.options.showFeedTitle){var f=$("<h2>"),o=$("<a>");m.append(f);o.attr("href",a.feed.link).html(a.feed.title);f.append(o);m.append(f)}f=Math.min(a.feed.entries.length,d.options.maxPosts);for(o=0;o<f;o++){var i=a.feed.entries[o],
k=Date.parse(i.publishedDate),h=$("<div class='entry'>"),n=$("<p class='title'>"),g=$("<a>"),j=!0;if(i.title&&i.contentSnippet&&i.link){if(k&&(k=new Date(k),c)){var p=Math.abs((new Date).getTime()-k.getTime());Math.ceil(p/864E5)>c&&(j=!1)}j&&(g.attr("href",i.link).attr("rel","nofollow").attr("target","_blank").html(i.title),n.append(g),h.append(n),i.author&&d.options.showAuthor&&(n=$("<div class='author'>"),n.html("Posted by "+i.author),h.append(n)),i.contentSnippet&&d.options.showSnippet&&(n=$("<p class='snippet'>"),
g=$("<span class='snippetText'></span>"),h.append(n),n.append(g),g.html(i.contentSnippet),i.link&&(g=$("<a>"),n.append("<span class='separator'> &ndash; </span>"),n.append(g),g.attr("href",i.link).attr("rel","nofollow").attr("target","_blank").html("Read More"))),k&&d.options.showDate&&(i=$("<div class='date "+d.options.dateClass+"'>"),k=GD.i18n.fmtDate(k),i.html(k),h.append(i)),m.append(h),e++)}}e<d.options.maxPosts&&b.googleKeywords?(a={fillCount:d.options.maxPosts-e,initialSourceAttrib:0<e?b.rssAttribName:
null,onComplete:function(a){d._onRssNewsComplete(e+a,b)}},GD.news.getGoogleNewsFeed(d.rssFeedContainer,d.options.employerName,b,a),l=!0):(b.newsSourceAttrib&&b.rssAttribName&&$(b.newsSourceAttrib).html("Provided by "+b.rssAttribName),a.feed.link&&(c=$("<p class='moreResults'>"),f=$("<a>"),o=d.options.moreNewsLinkText?d.options.moreNewsLinkText:d.options.employerName?"More "+d.options.employerName+" News":"More News",f.attr("href",a.feed.link).attr("rel","nofollow").attr("target","_blank"),f.html("<strong>"+
o+"</strong>"),c.append(f),m.append(c)))}}else b.googleKeywords&&(a={fillCount:d.options.maxPosts,initialSourceAttrib:null,onComplete:function(a){d._onRssNewsComplete(a,b)}},GD.news.getGoogleNewsFeed(d.rssFeedContainer,d.options.employerName,b,a),l=!0);l||d._onRssNewsComplete(e,b)};
GD.news.RssReader.prototype._onRssNewsComplete=function(a,c){if(this.options&&jQuery.isFunction(this.options.onCompleteCallback))this.options.onCompleteCallback(this.rssFeedContainer,a,this.options);if(c&&jQuery.isFunction(c.onCompleteCallback))c.onCompleteCallback(this.rssFeedContainer,a,c)};window.GD=window.GD||{};GD.photos=GD.photos||{};GD.photos.isFirstPage=!0;GD.photos.isLastPage=!0;GD.photos.firstRecordIndexOnPage=0;GD.photos.pagePhotoIds=[];GD.photos.firstPhotoId=0;GD.photos.lastPhotoId=0;GD.photos.currentPhotoId=0;GD.photos.currentPhotoIndex=-1;GD.photos.currentPhotoFromHash=!1;GD.photos.prevPageUrl="";GD.photos.nextPageUrl="";GD.photos.isExpectingAjaxResponse=!1;GD.photos.employerId="";GD.photos.location="";GD.photos.isInitialPagePhoto=!0;GD.photos.ARROW_LEFT=37;
GD.photos.ARROW_UP=38;GD.photos.ARROW_RIGHT=39;GD.photos.ARROW_DOWN=40;GD.photos.photoViewAnalyticsURL="/employerInfo/Photos/employer-photo-view";GD.photos.photoViewTrackURL="/Photos/track/view.htm";GD.photos.navClickCount=0;
GD.photos.initPhotoPage=function(a,b,c){var d=$("#PageBodyContents");GD.ei.init(d);$("#FilterLocation").on("change",GD.ei.submitEmployerInfoFilter);GD.ei.isLoggedIn||(GD.ei._initFlagReviews("photo","pi-flag-photo"),GD.ei._initHelpfulReview("photo","pi-helpful-photo"));GD.photos.employerId=a;GD.photos.location=b;0>=GD.photos.pagePhotoIds.length||0>=GD.photos.firstPhotoId||0>=GD.photos.lastPhotoId?Logger.error("Photo browse page variables not set properly before calling GD.photos.initPhotoPage()."):
(a=GD.photos._checkHashTag(),GD.photos.currentPhotoFromHash?GD.photos._getHashPhoto(a):c||(0<a?GD.photos._selectPhoto(a,!0):GD.photos._selectPhoto(GD.photos.pagePhotoIds[0],!0)),$("#PhotosDataHeader .thumbs .frame a").click(GD.photos._onThumbClick).keydown(GD.photos._onThumbKeyDown),c||($("#LocalNavPrev").click(GD.photos._onLocalNavClick).keydown(GD.photos._onLocalNavKeyDown),$("#LocalNavNext").click(GD.photos._onLocalNavClick).keydown(GD.photos._onLocalNavKeyDown),$("#PhotosDataHeader .pageNav a.prevPage, #PhotosDataHeader .pageNav a.nextPage").click(GD.photos._gotoPage),
GD.wait(10).then(GD.photos._preloadPhoto)))};
GD.photos.initPhotoCaptionsPage=function(){GD.site.init();$(".captionText").focus();$("#Revert").click(function(){var a=window.location.href.split("employerId=")[1];a?(a=a.split("&")[0],window.location.href="/survey/photos/choose_input.htm?employerId="+a):window.location.href="/survey/photos/choose_input.htm"});var a=$("#Save, #Revert"),a={fields:$("#AddCaptionForm textarea, #AddCaptionForm :text"),enableOnChange:a,navOkayFields:a};GD.photos.changeTracker=new GD.ChangeTracker(a)};
GD.photos.onThumbError=function(a){a=$(a);a.attr("src","/static/img/icons/broken/broken-50.png");a.attr("width","50");a.attr("height","50")};
GD.photos._checkHashTag=function(){var a=window.location.hash,b=0;a&&(a.startsWith("#")&&0<=a.indexOf("-"))&&(a=a.split("-"),1<a.length&&(a=a[1],"last"==a?b=GD.photos.pagePhotoIds[GD.photos.pagePhotoIds.length-1]:(a=parseInt(a,10),isNaN(a)||(b=a,GD.photos.currentPhotoFromHash=!0))));if(GD.photos.currentPhotoFromHash)for(a=0;a<GD.photos.pagePhotoIds.length;a++)if(GD.photos.pagePhotoIds[a]==b){GD.photos.currentPhotoFromHash=!1;break}return b};
GD.photos._selectPhoto=function(a,b){GD.photos.isExpectingAjaxResponse=!1;if(a!=GD.photos.currentPhotoId){for(var c=0;c<GD.photos.pagePhotoIds.length;c++)if(GD.photos.pagePhotoIds[c]==a){GD.photos.currentPhotoIndex=c;break}c=GD.i18n.fmtNum(GD.photos.firstRecordIndexOnPage+GD.photos.currentPhotoIndex+1,0);$("#PhotoContainer .nav .count .currItemIndex").html(c);$("#PhotoContainer .nav .count").show();$("#PhotosDataHeader .thumbs .frame").removeClass("currPhoto");$("#PhotoThumbnailFrame_"+a).addClass("currPhoto");
b&&$("#PhotoThumbnailFrame_"+a+" a").focus();$("#PhotosList .photo").addClass("hidden");$("#Photo_"+a).removeClass("hidden transparent");GD.photos._loadPhoto(a);GD.photos.currentPhotoId=a;GD.photos._updateLocalNavBtns()}};
GD.photos._loadPhoto=function(a){var b=$("#Photo_"+a+" img.companyPhoto"),c=b.attr("src"),d=b.attr("photoUrl");!b.attr("photoComplete")&&(d&&c!=d)&&($("#PhotosListSpinner").show(),b.load(function(){$("#PhotosListSpinner").hide();b.attr("photoComplete","true")}).error(function(){$("#PhotosListSpinner").hide();b.attr("photoComplete","true");GD.photos._brokenImage(b)}),b.attr("src",d));GD.photos._trackPhoto(a)};
GD.photos._trackPhoto=function(a){GD.analytics.trackPageView(GD.photos.photoViewAnalyticsURL);GD.photos.isInitialPagePhoto||jQuery.ajax({url:GD.photos.photoViewTrackURL,data:{photoId:a,employerId:GD.photos.employerId,location:GD.photos.location},dataType:"json"});GD.photos.isInitialPagePhoto=!1};
GD.photos._preloadPhoto=function(){function a(a){return function(){GD.wait(10).then(GD.photos._preloadPhoto);a.attr("photoComplete","true")}}function b(a){return function(){GD.photos._brokenImage(a);a.attr("photoComplete","true");GD.wait(10).then(GD.photos._preloadPhoto)}}for(var c=0;c<GD.photos.pagePhotoIds.length;c++){var d=$("#Photo_"+GD.photos.pagePhotoIds[c]+" img.companyPhoto"),f=d.attr("src"),e=d.attr("photoUrl");if(!d.attr("photoComplete")&&e&&f!=e){d.one("load",a(d));d.one("error",b(d));
Logger.info("Preloading photo id="+GD.photos.pagePhotoIds[c]);d.attr("src",e);break}}};GD.photos._brokenImage=function(a){a.attr("src","/static/img/icons/broken/broken-200.png");a.attr("width","200");a.attr("height","200")};
GD.photos._getHashPhoto=function(a){a="/GD/Photos/getPhotoMetadataAjax.htm?photoId="+a;$("#PhotosDataHeader .thumbs .frame").removeClass("currPhoto");$("#PhotosList .photo").addClass("hidden");$("#Photo_0").removeClass("hidden");$("#PhotosListSpinner").show();$("#PhotoContainer .nav .count").hide();a={url:a,dataType:"json",success:function(a){GD.photos._onHashPhotoResp(a)},error:function(){GD.photos._onHashPhotoResp(null)}};GD.photos.isExpectingAjaxResponse=!0;jQuery.ajax(a)};
GD.photos._onHashPhotoResp=function(a){if(a&&GD.photos.isExpectingAjaxResponse){var b=$("#Photo_0 .empShortName").html(),b=b+" &ndash; ";a.location&&(b+=a.location+" &ndash; ");b+="Posted ";a.employerPhoto?b+="by <strong>employer</strong>":a.credit&&(b+="by <strong>"+a.credit+"</strong>");b+=" on "+a.createDate;$("#Photo_0 .photoData").html(b);$("#Photo_0 .caption").html(a.caption);$("#Photo_0 img").attr({height:a.mediumHeight,width:a.mediumWidth});$("#Photo_0 img.companyPhoto").attr("photoUrl",a.srcMedium);
GD.photos._loadPhoto(0);GD.photos.currentPhotoId=-1;GD.photos._updateLocalNavBtns()}else selectPhoto(GD.photos.pagePhotoIds[0]);GD.photos.isExpectingAjaxResponse=!1};
GD.photos._nextPhoto=function(a){var b=!0;-1==GD.photos.currentPhotoIndex?GD.photos.currentPhotoIndex=0:GD.photos.currentPhotoIndex<GD.photos.pagePhotoIds.length-1?GD.photos.currentPhotoIndex++:GD.photos.nextPageUrl?GD.photos._loadNextPage(GD.photos.nextPageUrl,!1):1==GD.photos.pagePhotoIds.length?b=!1:GD.photos.currentPhotoIndex=0;b&&GD.photos._selectPhoto(GD.photos.pagePhotoIds[GD.photos.currentPhotoIndex],a);GD.photos._updateLocalNavBtns()};
GD.photos._prevPhoto=function(a){var b=!0;-1==GD.photos.currentPhotoIndex?GD.photos.currentPhotoIndex=GD.photos.pagePhotoIds.length-1:0<GD.photos.currentPhotoIndex?GD.photos.currentPhotoIndex--:GD.photos.prevPageUrl?GD.photos._loadNextPage(GD.photos.prevPageUrl,!0):1==GD.photos.pagePhotoIds.length?b=!1:GD.photos.currentPhotoIndex=GD.photos.pagePhotoIds.length-1;b&&GD.photos._selectPhoto(GD.photos.pagePhotoIds[GD.photos.currentPhotoIndex],a);GD.photos._updateLocalNavBtns()};
GD.photos._updateLocalNavBtns=function(){};GD.photos._loadNextPageCounter=0;GD.photos._loadNextPage=function(a,b){b&&(a+="#Photo-last");var c=function(){GD.photos._loadNextPageCounter+=1;2<=GD.photos._loadNextPageCounter&&($("#PhotosThumbsSpinner").show(),GD.dom.loadUrl(a))},d={opacity:0};$("#PhotosListSpinner").show().css("z-index","5");$("#PhotosDataHeader .thumbSliderContainer").animate(d,"fast",c);$("#PhotosList").animate(d,"fast",c)};
GD.photos._onThumbClick=function(a){var b=$(a.currentTarget).attr("photoId");a.preventDefault();GD.photos._selectPhoto(b);GD.photos._refreshAdsOnBrowse()};
GD.photos._onThumbKeyDown=function(a){if(10==a.which||13==a.which||32==a.which){var b=$(a.currentTarget).attr("photoId");GD.photos._selectPhoto(b);a.preventDefault()}else{b=!0;switch(a.which){case GD.photos.ARROW_LEFT:GD.photos._prevPhoto(!0);break;case GD.photos.ARROW_RIGHT:GD.photos._nextPhoto(!0);break;case GD.photos.ARROW_UP:GD.photos._selectPhoto(GD.photos.pagePhotoIds[0],!0);break;case GD.photos.ARROW_DOWN:GD.photos._selectPhoto(GD.photos.pagePhotoIds[GD.photos.pagePhotoIds.length-1],!0);break;
default:b=!1}b&&a.preventDefault()}};GD.photos._onLocalNavClick=function(a){var b=$(a.currentTarget).attr("id");a.preventDefault();"LocalNavPrev"==b?GD.photos._prevPhoto(!1):GD.photos._nextPhoto(!1);GD.photos._refreshAdsOnBrowse()};GD.photos._refreshAdsOnBrowse=function(){GD.photos.navClickCount++;5==GD.photos.navClickCount&&(googletag.pubads().refresh(),GD.photos.navClickCount=0)};GD.photos._onLocalNavKeyDown=function(a){if(10==a.which||13==a.which||32==a.which)$(a.currentTarget).click(),a.preventDefault()};
GD.photos._gotoPage=function(a){var b=$(a.currentTarget).attr("href");GD.photos._loadNextPage(b,!1);a.preventDefault()};window.GD=window.GD||{};GD.bar=GD.bar||{};
(function(d,f){function g(c,a,b){var h=c.height();e&&(clearTimeout(e),e=null);d(f).off("scroll.popupBar");c.css({height:0}).show().animate({height:h},{queue:!1,duration:a,easing:"easeOutQuint"});"function"===typeof b&&b()}var i={showOnScroll:!0,showInMillis:1E4,onShow:void 0,openDuration:600,closeDuration:600},e;GD.popupBar=function(c,a){var b,a=a||{},a=d.extend({},i,a);"string"===typeof c?b=d(c):c instanceof jQuery&&(b=c);b&&b.length?(b.find(".closeBox").on("click",function(){var c=b;c.animate({height:0},
{queue:!1,duration:a.closeDuration,easing:"easeOutQuint",complete:function(){c.hide()}})}),d(f).on("scroll.popupBar",function(){5<d(f).scrollTop()&&g(b,a.openDuration,a.onShow)}),e=setTimeout(function(){g(b,a.openDuration,a.onShow)},a.showInMillis)):Logger.error("GD.popupBar 'bar' object not found.")}})(window.jQuery,window,document);GD.bar.initDeepLinklSocialSharingBar=function(){GD.popupBar("#DeepLinkSocialSharingBar")};window.GD=window.GD||{};GD.videos=GD.videos||{};GD.videos.TYPE_YT_VIDEO_RECORDS="YT_VIDEO_RECORDS";GD.videos.TYPE_YT_VIDEO_LIST="YT_VIDEO_LIST";GD.videos.VIDEO_STATE_UNSTARTED=-1;GD.videos.VIDEO_STATE_ENDED=0;GD.videos.VIDEO_STATE_PLAYING=1;GD.videos.VIDEO_STATE_PAUSED=2;GD.videos.VIDEO_STATE_BUFFERING=3;GD.videos.VIDEO_STATE_VIDEO_CUED=5;GD.videos.videoViewTrackURL="/employerInfo/Videos/employer-video-view";GD.videos.VIDEO_PLAYER_PLACEHOLDER_ID_POSTFIX="-player";
GD.videos.VIDEO_PLAYER_ID_POSTFIX="-ytPLayer";GD.videos.VIDEO_DEFAULT_WIDTH=280;GD.videos.VIDEO_DEFAULT_HEIGHT=225;
GD.videos.initVideoModule=function(b,a){if("string"===typeof a.ytVideoIdList&&(-1<a.ytVideoIdList.indexOf(".com")||-1<a.ytVideoIdList.indexOf(".be"))){var c="",d=a.ytVideoIdList.split(",");$.each(d,function(a,b){0<a&&(c+=",");c+=b.split("v=").pop()});a.ytVideoIdList=c}var e=$(b),d="";"string"===typeof a.ytUrl&&-1<a.ytUrl.indexOf("www.")&&(d=a.ytUrl.split("/"),d=d[d.length-1]);a.width||(a.width=GD.videos.VIDEO_DEFAULT_WIDTH);a.height||(a.height=GD.videos.VIDEO_DEFAULT_HEIGHT);e.length&&(b=e[0]);"boolean"!==
typeof a.showHD&&(a.showHD=!1);if(!a.maxTitleLength||0>a.maxTitleLength)a.maxTitleLength=0;e.data("videoWidth",a.width);e.data("videoHeight",a.height);e.data("isSecure",a.isSecure);e.data("showHD",a.showHD);e.data("maxTitleLength",a.maxTitleLength);e.data("useTitleQuotes",a.useTitleQuotes);e.data("useTitleSeparatorPrefix",a.useTitleSeparatorPrefix);a.titleContainerSelector&&e.data("titleContainerSelector",a.titleContainerSelector);if(b)if(d.trim())b.ytUsername=d,b.videoList||jQuery.ajax({url:(a.isSecure?
"https":"http")+"://gdata.youtube.com/feeds/api/users/"+d+"/uploads",data:{v:"2",alt:"jsonc"},dataType:"jsonp",success:function(a){GD.videos.onYouTubeResponse(e,a)},error:function(){GD.videos.onYouTubeResponse(e,null)}});else if(a.ytVideoIdList){var f=a.ytVideoIdList.split(",");$.each(f,function(a,b){b.indexOf(".com")>-1?f[a]=b.split("v=").pop():b.indexOf(".be")>-1&&(f[a]=b.split("/").pop())});b.recordType=GD.videos.TYPE_YT_VIDEO_LIST;b.videoData={};b.videoData.items=f;b.videoData.itemsPerPage=f.length;
b.videoData.totalItems=f.length;b.videoData.startIndex=1;GD.videos.getRandomStartIndex(b);GD.videos.onVideosListReady(e)}else GD.videos.displayError(e,"No videos to display for "+a.employerName+".");else GD.videos.displayError(e,"Video module error.")};
GD.videos.onYouTubeResponse=function(b,a){var c=$(".vidContainer",b),d=b[0];c.length&&a&&a.data?(c=a.data,d.recordType=GD.videos.TYPE_YT_VIDEO_RECORDS,d.videoData=c,GD.videos.getRandomStartIndex(d),GD.videos.onVideosListReady(b)):a&&a.error&&a.error.message?GD.videos.displayError(b,"YouTube user '"+d.ytUsername+"': "+a.error.message):GD.videos.displayError(b,"Got an error for '"+options.url+"' &ndash; no items.")};
GD.videos.onVideosListReady=function(b){var a=b[0];$(".vidControl .max",b).html(a.videoData.totalItems);GD.videos.createVideoPlayer(b);$(".vidNav .prev",b).on("click",function(){GD.videos.showPreviousVideo(b)});$(".vidNav .next",b).on("click",function(){GD.videos.showNextVideo(b)});GD.videos.checkNav(b)};GD.videos.displayError=function(b,a){var c=$(".vidContainer",b),d=$("<p class='errorMessage'>");d.html(a);c.empty().append(d)};
GD.videos.getRandomStartIndex=function(b){var a=b.videoData,c=a.items.length,d=a.startIndex+Math.floor(Math.random()*c);1>d?d=1:d>=a.startIndex+c&&(d=a.startIndex+c-1);b.currentVideoIndex=d};GD.videos.showPreviousVideo=function(b){var a=b[0];1<a.currentVideoIndex&&(a.currentVideoIndex<=a.videoData.startIndex?GD.videos.loadAndShowVideo(b,a.videoData.startIndex-a.videoData.itemsPerPage,a.currentVideoIndex-1):GD.videos.showVideo(b,a.currentVideoIndex-1))};
GD.videos.showNextVideo=function(b){var a=b[0];if(a.currentVideoIndex<a.videoData.totalItems){var c=a.videoData.startIndex+a.videoData.items.length-1;a.currentVideoIndex>=c?GD.videos.loadAndShowVideo(b,a.currentVideoIndex+1,c+1):GD.videos.showVideo(b,a.currentVideoIndex+1)}};
GD.videos.loadAndShowVideo=function(b,a,c){var d=b[0],e=(b.data("isSecure")?"https":"http")+"://gdata.youtube.com/feeds/api/users/"+d.ytUsername+"/uploads";1>a?a=1:a>d.videoData.totalItems&&(a=d.videoData.totalItems-d.videoData.itemsPerPage+1);jQuery.ajax({url:e,data:{v:"2",alt:"jsonc","start-index":a},dataType:"jsonp",success:function(a){GD.videos.onLoadAndShowVideoComplete(b,a,c)},error:function(){GD.videos.onLoadAndShowVideoComplete(b,null)}})};
GD.videos.onLoadAndShowVideoComplete=function(b,a,c){if(b.length){var d=$(".vidContainer",b),e=b[0];d.length&&a&&a.data?(e.videoData=a.data,GD.videos.showVideo(b,c)):a&&a.error&&a.error.message?GD.videos.displayError(b,"YouTube user '"+e.ytUsername+"': "+a.error.message):GD.videos.displayError(b,"Got an error for '"+options.url+"' &ndash; no items.")}};
GD.videos.showVideo=function(b,a){var c=b.attr("id")+GD.videos.VIDEO_PLAYER_ID_POSTFIX,d=GD.videos.getVideoId(b[0],a),c=id(c),e=null;b.data("showHD")&&(e="large");c&&c.cueVideoById(d,null,e);GD.videos.showVideoInfo(b,a)};
GD.videos.createVideoPlayer=function(b){if("undefined"===typeof window.swfobject)GD.dom.loadScript(window.location.protocol+"//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js",function(){GD.videos.createVideoPlayer(b)});else{var a=b.attr("id"),c=a+GD.videos.VIDEO_PLAYER_ID_POSTFIX,d=b[0],e=b.data("videoWidth"),f=b.data("videoHeight"),h=b.data("showHD"),g=GD.videos.getVideoId(d,d.currentVideoIndex),g=(b.data("isSecure")?"https":"http")+"://www.youtube.com/v/"+g,g=g+("?rel=0&fs=1&enablejsapi=1&version=3&iv_load_policy=3&showinfo=0&playerapiid="+
c);h&&(g+="&hd=1");swfobject.embedSWF(g,a+GD.videos.VIDEO_PLAYER_PLACEHOLDER_ID_POSTFIX,e,f,"8",null,null,{allowScriptAccess:"always",rel:"0",allowFullScreen:"true",wmode:"transparent"},{id:c},function(b){GD.videos.onFlashInjection(b,a)});GD.videos.showVideoInfo(b,d.currentVideoIndex)}};
GD.videos.showVideoInfo=function(b,a){var c=b[0],d=c.videoData.items[a-c.videoData.startIndex].title;d&&(d=d.trim());c.currentVideoIndex=a;$(".vidControl .curr",b).html(a);d?GD.videos.showVideoTitle(b,d):(GD.videos.showVideoTitle(b,""),c.recordType==GD.videos.TYPE_YT_VIDEO_LIST&&GD.videos.getVideoTitle(b,a));GD.videos.checkNav(b)};
GD.videos.getVideoTitle=function(b,a){var c=GD.videos.getVideoId(b[0],a),d=b.data("isSecure")?"https":"http";jQuery.ajax({url:d+"://gdata.youtube.com/feeds/api/videos/"+c,data:{alt:"json"},dataType:"jsonp",success:function(c){GD.videos.onGetVideoTitle(b,a,c)},error:function(){GD.videos.onGetVideoTitle(b,a,null)}})};
GD.videos.onGetVideoTitle=function(b,a,c){if(c){var d=null;try{d=c.entry.title.$t}catch(e){}GD.videos.setVideoTitle(b[0],a,d);d&&(a=b.data("maxTitleLength"))&&0<a&&(d=d.truncateToLength(a,!0));GD.videos.showVideoTitle(b,d)}};
GD.videos.showVideoTitle=function(b,a){var c=b.data("titleContainerSelector"),d=b.data("useTitleQuotes"),e=b.data("useTitleSeparatorPrefix"),f="",h="",g="";c?(c=$(c),a&&e&&(f=" &ndash; ")):c=$(".vidTitle",b);if(a){var e=b.data("maxTitleLength"),i=a;e&&0<e&&(a=a.truncateToLength(e,!0));d&&(h="&ldquo;",g="&rdquo;");c.html(f+h+a+g).show();a.length!=i.length?c.attr("title",i):c.removeAttr("title")}else c.html("&nbsp;")};
GD.videos.getVideoId=function(b,a){var c=b.videoData.items,d=null;0<a&&a-b.videoData.startIndex<c.length&&(c=c[a-b.videoData.startIndex])&&("string"===typeof c?d=c.trim():c.id&&(d=c.id.trim()));return d};GD.videos.setVideoTitle=function(b,a,c){var d=b.videoData.items;if(0<a&&a-b.videoData.startIndex<d.length)if("string"==typeof d[a-b.videoData.startIndex]){var e={};e.id=d[a-b.videoData.startIndex];e.title=c;d[a-b.videoData.startIndex]=e}else d[a-b.videoData.startIndex].title=c};
GD.videos.onFlashInjection=function(b,a){b.success||$("#"+a).hide()};GD.videos.checkNav=function(b){var a=b[0],c=a.videoData,a=a.currentVideoIndex;1<c.totalItems&&$(".vidControl").show();1==a?$(".vidNav .prev",b).removeClass("link"):$(".vidNav .prev",b).addClass("link");a>=c.totalItems?$(".vidNav .next",b).removeClass("link"):$(".vidNav .next",b).addClass("link")};
GD.videos.onStateChange=function(b,a){switch(b){case GD.videos.VIDEO_STATE_PLAYING:var c=id(a),d=GD.videos.videoViewTrackURL;if(c&&(c=c.getVideoUrl()))(c=c.match(/[&\?]v=([\w]+)[^\w]*/))&&1<c.length&&(d+="/"+c[1]);GD.analytics.trackPageView(d)}};function onYouTubePlayerReady(b){var a=id(b);a&&a.addEventListener("onStateChange","(function(state) { return GD.videos.onStateChange(state, '"+b+"');})")};(function(l){window.MD5=new l(jQuery,window,document)})(function(){function l(f,e){var d=f[0],a=f[1],b=f[2],c=f[3],d=g(d,a,b,c,e[0],7,-680876936),c=g(c,d,a,b,e[1],12,-389564586),b=g(b,c,d,a,e[2],17,606105819),a=g(a,b,c,d,e[3],22,-1044525330),d=g(d,a,b,c,e[4],7,-176418897),c=g(c,d,a,b,e[5],12,1200080426),b=g(b,c,d,a,e[6],17,-1473231341),a=g(a,b,c,d,e[7],22,-45705983),d=g(d,a,b,c,e[8],7,1770035416),c=g(c,d,a,b,e[9],12,-1958414417),b=g(b,c,d,a,e[10],17,-42063),a=g(a,b,c,d,e[11],22,-1990404162),d=g(d,
a,b,c,e[12],7,1804603682),c=g(c,d,a,b,e[13],12,-40341101),b=g(b,c,d,a,e[14],17,-1502002290),a=g(a,b,c,d,e[15],22,1236535329),d=i(d,a,b,c,e[1],5,-165796510),c=i(c,d,a,b,e[6],9,-1069501632),b=i(b,c,d,a,e[11],14,643717713),a=i(a,b,c,d,e[0],20,-373897302),d=i(d,a,b,c,e[5],5,-701558691),c=i(c,d,a,b,e[10],9,38016083),b=i(b,c,d,a,e[15],14,-660478335),a=i(a,b,c,d,e[4],20,-405537848),d=i(d,a,b,c,e[9],5,568446438),c=i(c,d,a,b,e[14],9,-1019803690),b=i(b,c,d,a,e[3],14,-187363961),a=i(a,b,c,d,e[8],20,1163531501),
d=i(d,a,b,c,e[13],5,-1444681467),c=i(c,d,a,b,e[2],9,-51403784),b=i(b,c,d,a,e[7],14,1735328473),a=i(a,b,c,d,e[12],20,-1926607734),d=h(a^b^c,d,a,e[5],4,-378558),c=h(d^a^b,c,d,e[8],11,-2022574463),b=h(c^d^a,b,c,e[11],16,1839030562),a=h(b^c^d,a,b,e[14],23,-35309556),d=h(a^b^c,d,a,e[1],4,-1530992060),c=h(d^a^b,c,d,e[4],11,1272893353),b=h(c^d^a,b,c,e[7],16,-155497632),a=h(b^c^d,a,b,e[10],23,-1094730640),d=h(a^b^c,d,a,e[13],4,681279174),c=h(d^a^b,c,d,e[0],11,-358537222),b=h(c^d^a,b,c,e[3],16,-722521979),
a=h(b^c^d,a,b,e[6],23,76029189),d=h(a^b^c,d,a,e[9],4,-640364487),c=h(d^a^b,c,d,e[12],11,-421815835),b=h(c^d^a,b,c,e[15],16,530742520),a=h(b^c^d,a,b,e[2],23,-995338651),d=j(d,a,b,c,e[0],6,-198630844),c=j(c,d,a,b,e[7],10,1126891415),b=j(b,c,d,a,e[14],15,-1416354905),a=j(a,b,c,d,e[5],21,-57434055),d=j(d,a,b,c,e[12],6,1700485571),c=j(c,d,a,b,e[3],10,-1894986606),b=j(b,c,d,a,e[10],15,-1051523),a=j(a,b,c,d,e[1],21,-2054922799),d=j(d,a,b,c,e[8],6,1873313359),c=j(c,d,a,b,e[15],10,-30611744),b=j(b,c,d,a,e[6],
15,-1560198380),a=j(a,b,c,d,e[13],21,1309151649),d=j(d,a,b,c,e[4],6,-145523070),c=j(c,d,a,b,e[11],10,-1120210379),b=j(b,c,d,a,e[2],15,718787259),a=j(a,b,c,d,e[9],21,-343485551);f[0]=k(d,f[0]);f[1]=k(a,f[1]);f[2]=k(b,f[2]);f[3]=k(c,f[3])}function h(f,e,d,a,b,c){e=k(k(e,f),k(a,c));return k(e<<b|e>>>32-b,d)}function g(f,e,d,a,b,c,g){return h(e&d|~e&a,f,e,b,c,g)}function i(f,e,d,a,b,c,g){return h(e&a|d&~a,f,e,b,c,g)}function j(f,e,d,a,b,c,g){return h(d^(e|~a),f,e,b,c,g)}function m(f){if("string"!==typeof f)return null;
var e=f,d=e.length,a,f=[1732584193,-271733879,-1732584194,271733878];for(a=64;a<=e.length;a+=64){for(var b=f,c=e.substring(a-64,a),g=[],h=0;64>h;h+=4)g[h>>2]=c.charCodeAt(h)+(c.charCodeAt(h+1)<<8)+(c.charCodeAt(h+2)<<16)+(c.charCodeAt(h+3)<<24);l(b,g)}e=e.substring(a-64);b=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(a=0;a<e.length;a++)b[a>>2]|=e.charCodeAt(a)<<(a%4<<3);b[a>>2]|=128<<(a%4<<3);if(55<a){l(f,b);for(a=0;16>a;a++)b[a]=0}b[14]=8*d;l(f,b);for(e=0;e<f.length;e++){d=f;a=e;b=f[e];c="";for(g=0;4>g;g++)c+=
n[b>>8*g+4&15]+n[b>>8*g&15];d[a]=c}return f.join("")}var n="0123456789abcdef".split(""),k=function(f,e){return f+e&4294967295};"5d41402abc4b2a76b9719d911017c592"!=m("hello")&&(k=function(f,e){var d=(f&65535)+(e&65535);return(f>>16)+(e>>16)+(d>>16)<<16|d&65535});this.calc=m});window.Modernizr=function(r,h,s){function C(a,b){for(var e in a){var c=a[e];if(!~(""+c).indexOf("-")&&D[c]!==s)return"pfx"==b?c:!0}return!1}function E(a,b,e){var c=a.charAt(0).toUpperCase()+a.slice(1),n=(a+" "+F.join(c+" ")+c).split(" ");if("string"===typeof b||"undefined"===typeof b)b=C(n,b);else{n=(a+" "+G.join(c+" ")+c).split(" ");a:{var a=n,k;for(k in a)if(c=b[a[k]],c!==s){b=!1===e?a[k]:"function"===typeof c?c.bind(e||b):c;break a}b=!1}}return b}var d={},l=h.documentElement,j=h.createElement("modernizr"),
D=j.style,j=h.createElement("input"),H=["","-webkit-","-moz-","-o-","-ms-"],F=["Webkit","Moz","O","ms"],G=["webkit","moz","o","ms"],f={},i={},t=[],u=t.slice,g,I=function(a,b,e,c){var n,k,d,j,f=h.createElement("div"),i=h.body,g=i||h.createElement("body");if(parseInt(e,10))for(;e--;)d=h.createElement("div"),d.id=c?c[e]:"modernizr"+(e+1),f.appendChild(d);return n=['&#173;<style id="smodernizr">',a,"</style>"].join(""),f.id="modernizr",(i?f:g).innerHTML+=n,g.appendChild(f),i||(g.style.background="",g.style.overflow=
"hidden",j=l.style.overflow,l.style.overflow="hidden",l.appendChild(g)),k=b(f,a),i?f.parentNode.removeChild(f):(g.parentNode.removeChild(g),l.style.overflow=j),!!k},v={}.hasOwnProperty,q;"undefined"!==typeof v&&"undefined"!==typeof v.call?q=function(a,b){return v.call(a,b)}:q=function(a,b){return b in a&&"undefined"===typeof a.constructor.prototype[b]};Function.prototype.bind||(Function.prototype.bind=function(a){var b=this;if("function"!=typeof b)throw new TypeError;var e=u.call(arguments,1),c=function(){if(this instanceof
c){var d=function(){};d.prototype=b.prototype;var d=new d,k=b.apply(d,e.concat(u.call(arguments)));return Object(k)===k?k:d}return b.apply(a,e.concat(u.call(arguments)))};return c});f.touch=function(){var a;return"ontouchstart"in r||r.DocumentTouch&&h instanceof DocumentTouch?a=!0:I(["@media (",H.join("touch-enabled),("),"modernizr){#modernizr{top:9px;position:absolute}}"].join(""),function(b){a=9===b.offsetTop}),a};f.geolocation=function(){return"geolocation"in navigator};f.csstransforms=function(){return!!E("transform")};
for(var m in f)q(f,m)&&(g=m.toLowerCase(),d[g]=f[m](),t.push((d[g]?"":"no-")+g));if(!d.input){g="autocomplete autofocus list placeholder max min multiple pattern required step".split(" ");m=0;for(f=g.length;m<f;m++)i[g[m]]=g[m]in j;j=(i.list&&(i.list=!!h.createElement("datalist")&&!!r.HTMLDataListElement),i);d.input=j}d.addTest=function(a,b){if("object"==typeof a)for(var e in a)q(a,e)&&d.addTest(e,a[e]);else{a=a.toLowerCase();if(d[a]!==s)return d;b="function"==typeof b?b():b;l.className+=" ok-"+(b?
"":"no-")+a;d[a]=b}return d};D.cssText="";var j=j=null,J=function(){var a=p.elements;return"string"==typeof a?a.split(" "):a},x=function(a){var b=K[a[L]];return b||(b={},w++,a[L]=w,K[w]=b),b},M=function(a,b,e){b||(b=h);if(o)return b.createElement(a);e||(e=x(b));var c;return e.cache[a]?c=e.cache[a].cloneNode():N.test(a)?c=(e.cache[a]=e.createElem(a)).cloneNode():c=e.createElem(a),c.canHaveChildren&&!O.test(a)?e.frag.appendChild(c):c},j=function(a){a||(a=h);var b=x(a);if(p.shivCSS&&!y&&!b.hasCSS){var e,
c=a;e=c.createElement("p");c=c.getElementsByTagName("head")[0]||c.documentElement;e=(e.innerHTML="x<style>article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}</style>",c.insertBefore(e.lastChild,c.firstChild));b.hasCSS=!!e}if(!o){var d=a;b.cache||(b.cache={},b.createElem=d.createElement,b.createFrag=d.createDocumentFragment,b.frag=b.createFrag());d.createElement=function(a){return p.shivMethods?M(a,d,b):b.createElem(a)};d.createDocumentFragment=
Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+J().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(p,b.frag)}return a},i=this.html5||{},O=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,N=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,y,L="_html5shiv",w=0,K={},o;try{var z=h.createElement("a");z.innerHTML="<xyz></xyz>";
y="hidden"in z;var A;if(!(A=1==z.childNodes.length)){h.createElement("a");var B=h.createDocumentFragment();A="undefined"==typeof B.cloneNode||"undefined"==typeof B.createDocumentFragment||"undefined"==typeof B.createElement}o=A}catch(P){o=y=!0}var p={elements:i.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:!1!==i.shivCSS,supportsUnknownElements:o,shivMethods:!1!==i.shivMethods,
type:"default",shivDocument:j,createElement:M,createDocumentFragment:function(a,b){a||(a=h);if(o)return a.createDocumentFragment();for(var b=b||x(a),d=b.frag.cloneNode(),c=0,f=J(),g=f.length;c<g;c++)d.createElement(f[c]);return d}};this.html5=p;j(h);return d._version="2.6.2",d._prefixes=H,d._domPrefixes=G,d._cssomPrefixes=F,d.testProp=function(a){return C([a])},d.testAllProps=E,d.testStyles=I,l.className=l.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(" ok-js ok-"+t.join(" ok-")),d}(this,this.document);(function(k){window.Logger=new k(jQuery,window,document)})(function(k){function h(a,d){"string"!==typeof a&&(a=""+a);d&&(a+=" [",a=d.message?a+d.message:a+d,a+="]");return a}var a=this,f={a:0,i:10,d:20,w:30,e:40,f:50,"0":100},g=k.extend({},{clientLevel:"ALL",serverLevel:"ERROR"}),i,j,e=!0;a.version=4;a.ALL="a";a.INFO="i";a.DEBUG="d";a.WARNING="w";a.ERROR="e";a.FATAL="f";a.NONE="0";a.setLoggerEnabled=function(a){var d=e;e=a;return d};a.setLoggingLevel=function(b){var d=g.clientLevel;g.clientLevel=
b==a.ALL||b==a.INFO||b==a.DEBUG||b==a.WARNING||b==a.ERROR||b==a.FATAL?b:a.NONE;i=f[g.clientLevel];return d};a.setServerLoggingLevel=function(b){var d=g.serverLevel;g.serverLevel=b==a.ALL||b==a.INFO||b==a.DEBUG||b==a.WARNING||b==a.ERROR||b==a.FATAL?b:a.NONE;j=f[g.serverLevel];return d};a.info=function(b,d){try{var c;e&&i<=f[a.INFO]&&(c=h(b,d),console&&"function"===typeof console.info?console.info(c):console&&console.log("INFO: "+c));e&&j<=f[a.INFO]&&(c=c||h(b,d),a.logToServer(c,a.INFO))}catch(g){}};
a.debug=function(b,d){try{var c;e&&i<=f[a.DEBUG]&&(c=h(b,d),console&&"function"===typeof console.info?console.info(c):console&&console.log("DEBUG: "+c));e&&j<=f[a.DEBUG]&&(c=c||h(b,d),a.logToServer(c,a.DEBUG))}catch(g){}};a.warn=function(b,d){try{var c;e&&i<=f[a.WARNING]&&(c=h(b,d),console&&"function"===typeof console.warn?console.warn(c):console&&console.log("WARN: "+c));e&&j<=f[a.WARNING]&&(c=c||h(b,d),a.logToServer(c,a.WARNING))}catch(g){}};a.error=function(b,d){try{var c;e&&i<=f[a.ERROR]&&(c=
h(b,d),console&&"function"===typeof console.error?console.error(c):console&&console.log("ERROR: "+c));e&&j<=f[a.ERROR]&&(c=c||h(b,d),a.logToServer(c,a.ERROR))}catch(g){}};a.fatal=function(b,d){try{var c;e&&i<=f[a.FATAL]&&(c=h(b,d),console&&"function"===typeof console.error?console.error("FATAL: ",c):console&&console.log("FATAL: "+c));e&&j<=f[a.FATAL]&&(c=c||h(b,d),a.logToServer(c,a.FATAL))}catch(g){}};a.inspect=function(b,d){try{var c;e&&i<=f[a.DEBUG]&&(d&&a.debug("Inspect: "+d),navigator.userAgent.match(/iPhone/i)||
-1<navigator.userAgent.toLowerCase().indexOf("android")?JSON&&JSON.stringify?(c=JSON.stringify(b),a.info(c)):(a.info("JSON && JSON.stringify missing"),console.log(b)):console&&"function"===typeof console.dir&&console.dir(b));e&&i<=f[a.DEBUG]&&(d&&a.logToServer("Inspect: "+d,a.DEBUG),JSON&&JSON.stringify&&(c=JSON.stringify(b),a.logToServer(c,a.DEBUG)))}catch(g){}};a.logToServer=function(b,d,c){b&&(d||(d=a.INFO),jQuery.ajax({url:"/util/ajax/lgr.htm",type:"POST",dataType:"json",data:{m:"[JS-LOG] "+b,
l:d},async:!c}))};a.trace=function(b){try{e&&(b&&a.info("Trace: "+b),console&&"function"===typeof console.trace&&console.trace())}catch(d){}};a.timer=function(a){try{e&&console&&"function"===typeof console.time&&console.time(a)}catch(d){}};a.timerEnd=function(a){try{e&&console&&"function"===typeof console.timeEnd&&console.timeEnd(a)}catch(d){}};a.profile=function(a){try{e&&console&&"function"===typeof console.profile&&console.profile(a)}catch(d){}};a.profileEnd=function(){try{e&&console&&"function"===
typeof console.profileEnd&&console.profileEnd()}catch(a){}};a.windowError=function(b,d,c){a.fatal("Error on line "+c+" of document "+d+": "+b);return!0};a.setLoggingLevel(a[g.clientLevel]);a.setServerLoggingLevel(a[g.serverLevel])});Logger.setLoggerEnabled(!1);(function(){function A(){var a="{}";if("userDataBehavior"==i){d.load("jStorage");try{a=d.getAttribute("jStorage")}catch(b){}try{p=d.getAttribute("jStorage_update")}catch(c){}g.jStorage=a}B();v();C()}function s(){var a;clearTimeout(D);D=setTimeout(function(){if("localStorage"==i||"globalStorage"==i)a=g.jStorage_update;else if("userDataBehavior"==i){d.load("jStorage");try{a=d.getAttribute("jStorage_update")}catch(b){}}if(a&&a!=p){p=a;var j=k.parse(k.stringify(c.__jstorage_meta.CRC32)),n;A();n=k.parse(k.stringify(c.__jstorage_meta.CRC32));
var e,w=[],f=[];for(e in j)j.hasOwnProperty(e)&&(n[e]?j[e]!=n[e]&&"2."==String(j[e]).substr(0,2)&&w.push(e):f.push(e));for(e in n)n.hasOwnProperty(e)&&(j[e]||w.push(e));q(w,"updated");q(f,"deleted")}},25)}function q(a,b){a=[].concat(a||[]);if("flushed"==b){var a=[],c;for(c in h)h.hasOwnProperty(c)&&a.push(c);b="deleted"}c=0;for(var n=a.length;c<n;c++)if(h[a[c]])for(var e=0,d=h[a[c]].length;e<d;e++)h[a[c]][e](a[c],b)}function t(){var a=(+new Date).toString();"localStorage"==i||"globalStorage"==i?g.jStorage_update=
a:"userDataBehavior"==i&&(d.setAttribute("jStorage_update",a),d.save("jStorage"));s()}function B(){if(g.jStorage)try{c=k.parse(String(g.jStorage))}catch(a){g.jStorage="{}"}else g.jStorage="{}";x=g.jStorage?String(g.jStorage).length:0;c.__jstorage_meta||(c.__jstorage_meta={});c.__jstorage_meta.CRC32||(c.__jstorage_meta.CRC32={})}function u(){if(c.__jstorage_meta.PubSub){for(var a=+new Date-2E3,b=0,j=c.__jstorage_meta.PubSub.length;b<j;b++)if(c.__jstorage_meta.PubSub[b][0]<=a){c.__jstorage_meta.PubSub.splice(b,
c.__jstorage_meta.PubSub.length-b);break}c.__jstorage_meta.PubSub.length||delete c.__jstorage_meta.PubSub}try{g.jStorage=k.stringify(c),d&&(d.setAttribute("jStorage",g.jStorage),d.save("jStorage")),x=g.jStorage?String(g.jStorage).length:0}catch(n){}}function o(a){if(!a||"string"!=typeof a&&"number"!=typeof a)throw new TypeError("Key name must be string or numeric");if("__jstorage_meta"==a)throw new TypeError("Reserved key name");return!0}function v(){var a,b,j,d,e=Infinity,g=!1,f=[];clearTimeout(E);
if(c.__jstorage_meta&&"object"==typeof c.__jstorage_meta.TTL){a=+new Date;j=c.__jstorage_meta.TTL;d=c.__jstorage_meta.CRC32;for(b in j)j.hasOwnProperty(b)&&(j[b]<=a?(delete j[b],delete d[b],delete c[b],g=!0,f.push(b)):j[b]<e&&(e=j[b]));Infinity!=e&&(E=setTimeout(v,e-a));g&&(u(),t(),q(f,"deleted"))}}function C(){var a;if(c.__jstorage_meta.PubSub){var b,j=y;for(a=c.__jstorage_meta.PubSub.length-1;0<=a;a--)if(b=c.__jstorage_meta.PubSub[a],b[0]>y){var j=b[0],d=b[1];b=b[2];if(r[d])for(var e=0,g=r[d].length;e<
g;e++)r[d][e](d,k.parse(k.stringify(b)))}y=j}}var m=window.jQuery||window.$||(window.$={}),k={parse:window.JSON&&(window.JSON.parse||window.JSON.decode)||String.prototype.evalJSON&&function(a){return String(a).evalJSON()}||m.parseJSON||m.evalJSON,stringify:Object.toJSON||window.JSON&&(window.JSON.stringify||window.JSON.encode)||m.toJSON};if(!k.parse||!k.stringify)throw Error("No JSON support found, include //cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.js to page");var c={__jstorage_meta:{CRC32:{}}},
g={jStorage:"{}"},d=null,x=0,i=!1,h={},D=!1,p=0,r={},y=+new Date,E,z={isXML:function(a){return(a=(a?a.ownerDocument||a:0).documentElement)?"HTML"!==a.nodeName:!1},encode:function(a){if(!this.isXML(a))return!1;try{return(new XMLSerializer).serializeToString(a)}catch(b){try{return a.xml}catch(c){}}return!1},decode:function(a){var b="DOMParser"in window&&(new DOMParser).parseFromString||window.ActiveXObject&&function(a){var b=new ActiveXObject("Microsoft.XMLDOM");b.async="false";b.loadXML(a);return b};
if(!b)return!1;a=b.call("DOMParser"in window&&new DOMParser||window,a,"text/xml");return this.isXML(a)?a:!1}};m.jStorage={version:"0.4.0",set:function(a,b,d){o(a);d=d||{};if("undefined"==typeof b)return this.deleteKey(a),b;if(z.isXML(b))b={_is_xml:!0,xml:z.encode(b)};else{if("function"==typeof b)return;b&&"object"==typeof b&&(b=k.parse(k.stringify(b)))}c[a]=b;for(var g=c.__jstorage_meta.CRC32,e=k.stringify(b),i=e.length,f=NaN^i,h=0,l;4<=i;)l=e.charCodeAt(h)&255|(e.charCodeAt(++h)&255)<<8|(e.charCodeAt(++h)&
255)<<16|(e.charCodeAt(++h)&255)<<24,l=1540483477*(l&65535)+((1540483477*(l>>>16)&65535)<<16),l^=l>>>24,l=1540483477*(l&65535)+((1540483477*(l>>>16)&65535)<<16),f=1540483477*(f&65535)+((1540483477*(f>>>16)&65535)<<16)^l,i-=4,++h;switch(i){case 3:f^=(e.charCodeAt(h+2)&255)<<16;case 2:f^=(e.charCodeAt(h+1)&255)<<8;case 1:f^=e.charCodeAt(h)&255,f=1540483477*(f&65535)+((1540483477*(f>>>16)&65535)<<16)}f^=f>>>13;f=1540483477*(f&65535)+((1540483477*(f>>>16)&65535)<<16);g[a]="2."+((f^f>>>15)>>>0);this.setTTL(a,
d.TTL||0);q(a,"updated");return b},get:function(a,b){o(a);return a in c?c[a]&&"object"==typeof c[a]&&c[a]._is_xml?z.decode(c[a].xml):c[a]:"undefined"==typeof b?null:b},deleteKey:function(a){o(a);return a in c?(delete c[a],"object"==typeof c.__jstorage_meta.TTL&&a in c.__jstorage_meta.TTL&&delete c.__jstorage_meta.TTL[a],delete c.__jstorage_meta.CRC32[a],u(),t(),q(a,"deleted"),!0):!1},setTTL:function(a,b){var d=+new Date;o(a);b=Number(b)||0;return a in c?(c.__jstorage_meta.TTL||(c.__jstorage_meta.TTL=
{}),0<b?c.__jstorage_meta.TTL[a]=d+b:delete c.__jstorage_meta.TTL[a],u(),v(),t(),!0):!1},getTTL:function(a){var b=+new Date;o(a);return a in c&&c.__jstorage_meta.TTL&&c.__jstorage_meta.TTL[a]?c.__jstorage_meta.TTL[a]-b||0:0},flush:function(){c={__jstorage_meta:{CRC32:{}}};u();t();q(null,"flushed");return!0},storageObj:function(){function a(){}a.prototype=c;return new a},index:function(){var a=[],b;for(b in c)c.hasOwnProperty(b)&&"__jstorage_meta"!=b&&a.push(b);return a},storageSize:function(){return x},
currentBackend:function(){return i},storageAvailable:function(){return!!i},listenKeyChange:function(a,b){o(a);h[a]||(h[a]=[]);h[a].push(b)},stopListening:function(a,b){o(a);if(h[a])if(b)for(var c=h[a].length-1;0<=c;c--)h[a][c]==b&&h[a].splice(c,1);else delete h[a]},subscribe:function(a,b){a=(a||"").toString();if(!a)throw new TypeError("Channel not defined");r[a]||(r[a]=[]);r[a].push(b)},publish:function(a,b){a=(a||"").toString();if(!a)throw new TypeError("Channel not defined");c.__jstorage_meta||
(c.__jstorage_meta={});c.__jstorage_meta.PubSub||(c.__jstorage_meta.PubSub=[]);c.__jstorage_meta.PubSub.unshift([+new Date,a,b]);u();t()},reInit:function(){A()}};a:{m=!1;if("localStorage"in window)try{window.localStorage.setItem("_tmptest","tmpval"),m=!0,window.localStorage.removeItem("_tmptest")}catch(F){}if(m)try{window.localStorage&&(g=window.localStorage,i="localStorage",p=g.jStorage_update)}catch(G){}else if("globalStorage"in window)try{window.globalStorage&&(g=window.globalStorage[window.location.hostname],
i="globalStorage",p=g.jStorage_update)}catch(H){}else if(d=document.createElement("link"),d.addBehavior){d.style.behavior="url(#default#userData)";document.getElementsByTagName("head")[0].appendChild(d);try{d.load("jStorage")}catch(I){d.setAttribute("jStorage","{}"),d.save("jStorage"),d.load("jStorage")}m="{}";try{m=d.getAttribute("jStorage")}catch(J){}try{p=d.getAttribute("jStorage_update")}catch(K){}g.jStorage=m;i="userDataBehavior"}else{d=null;break a}B();v();"localStorage"==i||"globalStorage"==
i?"addEventListener"in window?window.addEventListener("storage",s,!1):document.attachEvent("onstorage",s):"userDataBehavior"==i&&setInterval(s,1E3);C();"addEventListener"in window&&window.addEventListener("pageshow",function(a){a.persisted&&s()},!1)}})();window.GD=window.GD||{};GD.shim=GD.shim||{};GD.shim.placeholderColor="#8f8f8f";GD.shim.placeholderErrorColor="#a83938";GD.shim.PLACEHOLDER="placeholder";GD.shim.placeholder=function(a,b){var c={color:b?GD.shim.placeholderErrorColor:GD.shim.placeholderColor};a&&a.length&&(c.sel=a);!GD.shim._phSupported()&&(jQuery&&jQuery.placeholder&&jQuery.placeholder.shim)&&jQuery.placeholder.shim(c)};
GD.shim.removePlaceholders=function(a){!GD.shim._phSupported()&&(jQuery&&jQuery.placeholder&&jQuery.placeholder.shim)&&jQuery.placeholder.unshim(a)};GD.shim.setPlaceholder=function(a,b){a&&a.length&&(b?(a.attr(GD.shim.PLACEHOLDER,b),!GD.shim._phSupported()&&(jQuery&&jQuery.placeholder&&jQuery.placeholder.set)&&jQuery.placeholder.set(a,b)):(a.removeAttr(GD.shim.PLACEHOLDER),!GD.shim._phSupported()&&(jQuery&&jQuery.placeholder&&jQuery.placeholder.clear)&&jQuery.placeholder.clear(a)))};
GD.shim.recalcPlaceholders=function(){GD.shim._phSupported()||$(window).trigger("resize")};GD.shim._phSupported=function(){var a=GD.shim._phSupported;"boolean"!==typeof a._supported&&(a._supported=!!(GD.shim.PLACEHOLDER in $('<input type="text">')[0]));return a._supported};window.GD=window.GD||{};
GD.i18n||function(h){GD.i18n=new h(jQuery,window,document)}(function(h){function e(a,c,b,d,g){var f;a:if(f=a,"number"!==typeof f){if("string"===typeof val&&(f=f.parseInt(),!isNaN(f)))break a;f=void 0}if("number"!==typeof f)return a;c=k(c);a=d?d:"n";"number"===typeof c&&(a+=c);var e;g&&(e=Globalize.culture().numberFormat.currency.symbol,Globalize.culture().numberFormat.currency.symbol=g||"");f=Globalize.format(f,a);g&&(Globalize.culture().numberFormat.currency.symbol=e);return b?f:c=f.replace(l,"$1$2").replace(m,
"$1")}function k(a){"number"!==typeof a||0>a?a=void 0:9<a&&(a=9);return a}var b=this,i,l,m,n,j,d,o=[],p={AUD:2,BIF:0,BRL:2,BYR:0,CAD:2,CLF:0,CLP:0,DJF:0,EUR:2,GBP:2,GNF:0,INR:2,ISK:0,JPY:0,KMF:0,KPW:0,KRW:0,MGA:0,PYG:0,RWF:0,VUV:0,BHD:3,IQD:3,JOD:3,KWD:3,LYD:3,OMR:3,TND:3,USD:2},q={AUD:"A$",BOB:"Bs.",BRL:"B$",CAD:"CA$",CRC:"₡",EUR:"€",GBP:"£",ILS:"₪",ISK:"kr",INR:"₹",JPY:"¥",KPW:"₩",KRW:"₩",NZD:"NZ$",PKR:"₨",RUB:"ႈ႑ၳ",THB:"฿",USD:"$",VEF:"Bs."};b.DATE_FMT_ABBR="M";b.DATE_FMT_SHORT="d";b.DATE_FMT_MON_YR=
"MMM yyyy";b.DATE_FMT_MON="MMM";b.getLocale=function(){return i};b.getDigitGroupSeparator=function(){return n};b.getDecimalMark=function(){return j};b.setLocale=function(a){var c=i;i=a;Logger.info("JavaScript locale set: "+a);Globalize?(Globalize.culture(i),n=Globalize.culture().numberFormat[","],j=Globalize.culture().numberFormat["."],l=RegExp("(\\"+j+"\\d*?)0*\\s*(%?)$"),m=RegExp("\\"+j+"\\s*([%]?)$"),d=Globalize.culture().calendars.standard.patterns.M,d=d.replace("MMMM","MMM"),d=d.replace("dd",
"d"),"MMM d"==d&&(d+=","),d+=" yyyy",o=[d,"MMM yyyy","MMM"]):Logger&&Logger.warn("Globalize not loaded when GD.i18n is being initialized.");return c};b.fmtInt=function(a){return e(a,0)};b.fmtNum=function(a,c){return e(a,c)};b.fmtFixed=function(a,c){return e(a,c,!0)};b.fmtPercent=function(a,c){return e(a,c,!1,"p")};b.fmtCurrency=function(a,c,b,d){if(!c)return e(a,b,!0);var g=q[c];g&&("$"==g&&d&&(g="US$"),"$"!=g&&(d=!1));b=k(b);"number"!==typeof b&&(b=p[c],"number"!==typeof b&&(b=2));a=e(a,b,!0,"c",
g);d&&(a=a+" "+c);return a};b.fmtDate=function(a,c){var e=d;if(c===b.DATE_FMT_SHORT||c===b.DATE_FMT_MON_YR||c===b.DATE_FMT_MON)e=c;return Globalize.format(a,e)};b.parseInt=function(a,b){return Globalize.parseInt(a,b)};b.parseFloat=function(a,b){return"undefined"===typeof a||null===a?Number.NaN:Globalize.parseFloat(a,b)};b.parseDate=function(a){var b=Globalize.parseDate(a,o);b||(a=a.replace(/[\/,\-\s]+/g," "),b=Globalize.parseDate(a));return b};b.deGroup=function(a){return b.parseFloat(a)};b.ttFunc=
function(a){return function(){return a}};h(function(){var a=h("body").data("locale");a||(Logger&&Logger.warn("Locale not found on body tag."),a="en-US");b.setLocale(a)})});sl_tr_start=GD.i18n.ttFunc("trStart");sl_tr_end=GD.i18n.ttFunc("trEnd");sl_notr_start=GD.i18n.ttFunc("notrStart");sl_notr_end=GD.i18n.ttFunc("notrEnd");(function(W){var i,L,M,N,O,p,z,E,A,P,F,w,u,G,s,B,H,I,Q,J,t,C,K,x;i=function(a){return new i.prototype.init(a)};"undefined"!==typeof require&&"undefined"!==typeof exports&&"undefined"!==typeof module?module.exports=i:W.Globalize=i;i.cultures={};i.prototype={constructor:i,init:function(a){this.cultures=i.cultures;this.cultureSelector=a;return this}};i.prototype.init.prototype=i.prototype;i.cultures["default"]={name:"en",englishName:"English",nativeName:"English",isRTL:!1,language:"en",numberFormat:{pattern:["-n"],
decimals:2,",":",",".":".",groupSizes:[3],"+":"+","-":"-",NaN:"NaN",negativeInfinity:"-Infinity",positiveInfinity:"Infinity",percent:{pattern:["-n %","n %"],decimals:2,groupSizes:[3],",":",",".":".",symbol:"%"},currency:{pattern:["($n)","$n"],decimals:2,groupSizes:[3],",":",",".":".",symbol:"$"}},calendars:{standard:{name:"Gregorian_USEnglish","/":"/",":":":",firstDay:0,days:{names:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),namesAbbr:"Sun Mon Tue Wed Thu Fri Sat".split(" "),
namesShort:"Su Mo Tu We Th Fr Sa".split(" ")},months:{names:"January February March April May June July August September October November December ".split(" "),namesAbbr:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec ".split(" ")},AM:["AM","am","AM"],PM:["PM","pm","PM"],eras:[{name:"A.D.",start:null,offset:0}],twoDigitYearMax:2029,patterns:{d:"M/d/yyyy",D:"dddd, MMMM dd, yyyy",t:"h:mm tt",T:"h:mm:ss tt",f:"dddd, MMMM dd, yyyy h:mm tt",F:"dddd, MMMM dd, yyyy h:mm:ss tt",M:"MMMM dd",Y:"yyyy MMMM",
S:"yyyy'-'MM'-'dd'T'HH':'mm':'ss"}}},messages:{}};i.cultures["default"].calendar=i.cultures["default"].calendars.standard;i.cultures.en=i.cultures["default"];i.cultureSelector="en";L=/^0x[a-f0-9]+$/i;M=/^[+\-]?infinity$/i;N=/^[+\-]?\d*\.?\d*(e[+\-]?\d+)?$/;O=/^\s+|\s+$/g;p=function(a,b){if(a.indexOf)return a.indexOf(b);for(var c=0,d=a.length;c<d;c++)if(a[c]===b)return c;return-1};z=function(a,b){return a.substr(a.length-b.length)===b};E=function(){var a,b,c,d,f,g=arguments[0]||{},e=1,h=arguments.length,
i=!1;"boolean"===typeof g&&(i=g,g=arguments[1]||{},e=2);for("object"!==typeof g&&!P(g)&&(g={});e<h;e++)if(null!=(a=arguments[e]))for(b in a)c=g[b],d=a[b],g!==d&&(i&&d&&(F(d)||(f=A(d)))?(f?(f=!1,c=c&&A(c)?c:[]):c=c&&F(c)?c:{},g[b]=E(i,c,d)):void 0!==d&&(g[b]=d));return g};A=Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)};P=function(a){return"[object Function]"===Object.prototype.toString.call(a)};F=function(a){return"[object Object]"===Object.prototype.toString.call(a)};
w=function(a,b){return 0===a.indexOf(b)};u=function(a){return(a+"").replace(O,"")};G=function(a){return isNaN(a)?NaN:Math[0>a?"ceil":"floor"](a)};s=function(a,b,c){var d;for(d=a.length;d<b;d+=1)a=c?"0"+a:a+"0";return a};B=function(a,b){for(var c=0,d=!1,f=0,g=a.length;f<g;f++){var e=a.charAt(f);switch(e){case "'":d?b.push("'"):c++;d=!1;break;case "\\":d&&b.push("\\");d=!d;break;default:b.push(e),d=!1}}return c};H=function(a,b){var b=b||"F",c;c=a.patterns;var d=b.length;if(1===d){c=c[b];if(!c)throw"Invalid date format string '"+
b+"'.";b=c}else 2===d&&"%"===b.charAt(0)&&(b=b.charAt(1));return b};I=function(a,b,c){function d(a,b){var c;c=a+"";return 1<b&&c.length<b?(c=n[b-2]+c,c.substr(c.length-b,b)):c}function f(){if(y||o)return y;y=r.test(b);o=!0;return y}function g(a,b){if(k)return k[b];switch(b){case 0:return a.getFullYear();case 1:return a.getMonth();case 2:return a.getDate();default:throw"Invalid part value "+b;}}var e=c.calendar,h=e.convert;if(!b||!b.length||"i"===b){if(c&&c.name.length)if(h)c=I(a,e.patterns.F,c);else{var c=
new Date(a.getTime()),i=t(a,e.eras);c.setFullYear(C(a,e,i));c=c.toLocaleString()}else c=a.toString();return c}var i=e.eras,l="s"===b,b=H(e,b),c=[],j,n=["0","00","000"],y,o,r=/([^d]|^)(d|dd)([^d]|$)/g,p=0,m=J(),k;for(!l&&h&&(k=h.fromGregorian(a));;){j=m.lastIndex;h=m.exec(b);j=b.slice(j,h?h.index:b.length);p+=B(j,c);if(!h)break;if(p%2)c.push(h[0]);else switch(j=h[0],h=j.length,j){case "ddd":case "dddd":c.push((3===h?e.days.namesAbbr:e.days.names)[a.getDay()]);break;case "d":case "dd":y=!0;c.push(d(g(a,
2),h));break;case "MMM":case "MMMM":j=g(a,1);c.push(e.monthsGenitive&&f()?e.monthsGenitive[3===h?"namesAbbr":"names"][j]:e.months[3===h?"namesAbbr":"names"][j]);break;case "M":case "MM":c.push(d(g(a,1)+1,h));break;case "y":case "yy":case "yyyy":j=k?k[0]:C(a,e,t(a,i),l);4>h&&(j%=100);c.push(d(j,h));break;case "h":case "hh":j=a.getHours()%12;0===j&&(j=12);c.push(d(j,h));break;case "H":case "HH":c.push(d(a.getHours(),h));break;case "m":case "mm":c.push(d(a.getMinutes(),h));break;case "s":case "ss":c.push(d(a.getSeconds(),
h));break;case "t":case "tt":j=12>a.getHours()?e.AM?e.AM[0]:" ":e.PM?e.PM[0]:" ";c.push(1===h?j.charAt(0):j);break;case "f":case "ff":case "fff":c.push(d(a.getMilliseconds(),3).substr(0,h));break;case "z":case "zz":j=a.getTimezoneOffset()/60;c.push((0>=j?"+":"-")+d(Math.floor(Math.abs(j)),h));break;case "zzz":j=a.getTimezoneOffset()/60;c.push((0>=j?"+":"-")+d(Math.floor(Math.abs(j)),2)+":"+d(Math.abs(a.getTimezoneOffset()%60),2));break;case "g":case "gg":e.eras&&c.push(e.eras[t(a,i)].name);break;
case "/":c.push(e["/"]);break;default:throw"Invalid date format pattern '"+j+"'.";}}return c.join("")};var R;R=function(a,b,c){var d=c.groupSizes,f=d[0],g=1,e=Math.pow(10,b),h=Math.round(a*e)/e;isFinite(h)||(h=a);e="";e=(h+"").split(/e/i);h=1<e.length?parseInt(e[1],10):0;a=e[0];e=a.split(".");a=e[0];e=1<e.length?e[1]:"";0<h?(e=s(e,h,!1),a+=e.slice(0,h),e=e.substr(h)):0>h&&(h=-h,a=s(a,h+1,!0),e=a.slice(-h,a.length)+e,a=a.slice(0,-h));e=0<b?c["."]+(e.length>b?e.slice(0,b):s(e,b)):"";b=a.length-1;c=
c[","];for(h="";0<=b;){if(0===f||f>b)return a.slice(0,b+1)+(h.length?c+h+e:e);h=a.slice(b-f+1,b+1)+(h.length?c+h:"");b-=f;g<d.length&&(f=d[g],g++)}return a.slice(0,b+1)+c+h+e};Q=function(a,b,c){if(!isFinite(a))return Infinity===a?c.numberFormat.positiveInfinity:-Infinity===a?c.numberFormat.negativeInfinity:c.numberFormat.NaN;if(!b||"i"===b)return c.name.length?a.toLocaleString():a.toString();var b=b||"D",c=c.numberFormat,d=Math.abs(a),f=-1;1<b.length&&(f=parseInt(b.slice(1),10));var g=b.charAt(0).toUpperCase(),
e;switch(g){case "D":b="n";d=G(d);-1!==f&&(d=s(""+d,f,!0));0>a&&(d="-"+d);break;case "N":e=c;case "C":e=e||c.currency;case "P":e=e||c.percent;b=0>a?e.pattern[0]:e.pattern[1]||"n";-1===f&&(f=e.decimals);d=R(d*("P"===g?100:1),f,e);break;default:throw"Bad number format specifier: "+g;}a=/n|\$|-|%/g;for(e="";;){f=a.lastIndex;g=a.exec(b);e+=b.slice(f,g?g.index:b.length);if(!g)break;switch(g[0]){case "n":e+=d;break;case "$":e+=c.currency.symbol;break;case "-":/[1-9]/.test(d)&&(e+=c["-"]);break;case "%":e+=
c.percent.symbol}}return e};J=function(){return/\/|dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|y|hh|h|HH|H|mm|m|ss|s|tt|t|fff|ff|f|zzz|zz|z|gg|g/g};t=function(a,b){if(!b)return 0;for(var c,d=a.getTime(),f=0,g=b.length;f<g;f++)if(c=b[f].start,null===c||d>=c)return f;return 0};C=function(a,b,c,d){a=a.getFullYear();!d&&b.eras&&(a-=b.eras[c].offset);return a};var S,T,U,V,n,D,o;S=function(a,b){if(100>b){var c=new Date,d=t(c),c=C(c,a,d),d=a.twoDigitYearMax,d="string"===typeof d?(new Date).getFullYear()%100+parseInt(d,
10):d,b=b+(c-c%100);b>d&&(b-=100)}return b};T=function(a,b,c){var d=a.days,f=a._upperDays;f||(a._upperDays=f=[o(d.names),o(d.namesAbbr),o(d.namesShort)]);b=D(b);c?(a=p(f[1],b),-1===a&&(a=p(f[2],b))):a=p(f[0],b);return a};U=function(a,b,c){var d=a.months,f=a.monthsGenitive||a.months,g=a._upperMonths,e=a._upperMonthsGen;g||(a._upperMonths=g=[o(d.names),o(d.namesAbbr)],a._upperMonthsGen=e=[o(f.names),o(f.namesAbbr)]);b=D(b);a=p(c?g[1]:g[0],b);0>a&&(a=p(c?e[1]:e[0],b));return a};V=function(a,b){var c=
a._parseRegExp;if(c){var d=c[b];if(d)return d}else a._parseRegExp=c={};for(var d=H(a,b).replace(/([\^\$\.\*\+\?\|\[\]\(\)\{\}])/g,"\\\\$1"),f=["^"],g=[],e=0,h=0,i=J(),l;null!==(l=i.exec(d));){var j=d.slice(e,l.index),e=i.lastIndex,h=h+B(j,f);if(h%2)f.push(l[0]);else{var j=l[0],n=j.length;switch(j){case "dddd":case "ddd":case "MMMM":case "MMM":case "gg":case "g":j="(\\D+)";break;case "tt":case "t":j="(\\D*)";break;case "yyyy":case "fff":case "ff":case "f":j="(\\d{"+n+"})";break;case "dd":case "d":case "MM":case "M":case "yy":case "y":case "HH":case "H":case "hh":case "h":case "mm":case "m":case "ss":case "s":j=
"(\\d\\d?)";break;case "zzz":j="([+-]?\\d\\d?:\\d{2})";break;case "zz":case "z":j="([+-]?\\d\\d?)";break;case "/":j="(\\/)";break;default:throw"Invalid date format pattern '"+j+"'.";}j&&f.push(j);g.push(l[0])}}B(d.slice(e),f);f.push("$");d={regExp:f.join("").replace(/\s+/g,"\\s+"),groups:g};return c[b]=d};n=function(a,b,c){return a<b||a>c};D=function(a){return a.split(" ").join(" ").toUpperCase()};o=function(a){for(var b=[],c=0,d=a.length;c<d;c++)b[c]=D(a[c]);return b};K=function(a,b,c){var a=u(a),
c=c.calendar,b=V(c,b),d=RegExp(b.regExp).exec(a);if(null===d)return null;var f=b.groups,g=b=a=null,e=null,h=null,i=0,l,j=0,o=0,p=0;l=null;for(var s=!1,r=0,t=f.length;r<t;r++){var m=d[r+1];if(m){var k=f[r],v=k.length,q=parseInt(m,10);switch(k){case "dd":case "d":e=q;if(n(e,1,31))return null;break;case "MMM":case "MMMM":g=U(c,m,3===v);if(n(g,0,11))return null;break;case "M":case "MM":g=q-1;if(n(g,0,11))return null;break;case "y":case "yy":case "yyyy":b=4>v?S(c,q):q;if(n(b,0,9999))return null;break;
case "h":case "hh":i=q;12===i&&(i=0);if(n(i,0,11))return null;break;case "H":case "HH":i=q;if(n(i,0,23))return null;break;case "m":case "mm":j=q;if(n(j,0,59))return null;break;case "s":case "ss":o=q;if(n(o,0,59))return null;break;case "tt":case "t":s=c.PM&&(m===c.PM[0]||m===c.PM[1]||m===c.PM[2]);if(!s&&(!c.AM||m!==c.AM[0]&&m!==c.AM[1]&&m!==c.AM[2]))return null;break;case "f":case "ff":case "fff":p=q*Math.pow(10,3-v);if(n(p,0,999))return null;break;case "ddd":case "dddd":h=T(c,m,3===v);if(n(h,0,6))return null;
break;case "zzz":k=m.split(/:/);if(2!==k.length)return null;l=parseInt(k[0],10);if(n(l,-12,13))return null;k=parseInt(k[1],10);if(n(k,0,59))return null;l=60*l+(w(m,"-")?-k:k);break;case "z":case "zz":l=q;if(n(l,-12,13))return null;l*=60;break;case "g":case "gg":if(!m||!c.eras)return null;m=u(m.toLowerCase());k=0;for(v=c.eras.length;k<v;k++)if(m===c.eras[k].name.toLowerCase()){a=k;break}if(null===a)return null}}}d=new Date;f=(r=c.convert)?r.fromGregorian(d)[0]:d.getFullYear();null===b?b=f:c.eras&&
(b+=c.eras[a||0].offset);null===g&&(g=0);null===e&&(e=1);if(r){if(d=r.toGregorian(b,g,e),null===d)return null}else if(d.setFullYear(b,g,e),d.getDate()!==e||null!==h&&d.getDay()!==h)return null;s&&12>i&&(i+=12);d.setHours(i,j,o,p);null!==l&&(c=d.getMinutes()-(l+d.getTimezoneOffset()),d.setHours(d.getHours()+parseInt(c/60,10),c%60));return d};x=function(a,b,c){var d=b["-"],b=b["+"],f;switch(c){case "n -":d=" "+d,b=" "+b;case "n-":z(a,d)?f=["-",a.substr(0,a.length-d.length)]:z(a,b)&&(f=["+",a.substr(0,
a.length-b.length)]);break;case "- n":d+=" ",b+=" ";case "-n":w(a,d)?f=["-",a.substr(d.length)]:w(a,b)&&(f=["+",a.substr(b.length)]);break;case "(n)":w(a,"(")&&z(a,")")&&(f=["-",a.substr(1,a.length-2)])}return f||["",a]};i.prototype.findClosestCulture=function(a){return i.findClosestCulture.call(this,a)};i.prototype.format=function(a,b,c){return i.format.call(this,a,b,c)};i.prototype.localize=function(a,b){return i.localize.call(this,a,b)};i.prototype.parseInt=function(a,b,c){return i.parseInt.call(this,
a,b,c)};i.prototype.parseFloat=function(a,b,c){return i.parseFloat.call(this,a,b,c)};i.prototype.culture=function(a){return i.culture.call(this,a)};i.addCultureInfo=function(a,b,c){var d={},f=!1;"string"!==typeof a?(c=a,a=this.culture().name,d=this.cultures[a]):"string"!==typeof b?(c=b,f=null==this.cultures[a],d=this.cultures[a]||this.cultures["default"]):(f=!0,d=this.cultures[b]);this.cultures[a]=E(!0,{},d,c);f&&(this.cultures[a].calendar=this.cultures[a].calendars.standard)};i.findClosestCulture=
function(a){var b;if(!a)return this.findClosestCulture(this.cultureSelector)||this.cultures["default"];"string"===typeof a&&(a=a.split(","));if(A(a)){var c,d=this.cultures,f=a,g,e=f.length,h=[];for(g=0;g<e;g++)a=u(f[g]),a=a.split(";"),c=u(a[0]),1===a.length?a=1:(a=u(a[1]),0===a.indexOf("q=")?(a=a.substr(2),a=parseFloat(a),a=isNaN(a)?0:a):a=1),h.push({lang:c,pri:a});h.sort(function(a,b){return a.pri<b.pri?1:a.pri>b.pri?-1:0});for(g=0;g<e;g++)if(c=h[g].lang,b=d[c])return b;for(g=0;g<e;g++){c=h[g].lang;
do{f=c.lastIndexOf("-");if(-1===f)break;c=c.substr(0,f);if(b=d[c])return b}while(1)}for(g=0;g<e;g++){c=h[g].lang;for(var i in d)if(f=d[i],f.language==c)return f}}else if("object"===typeof a)return a;return b||null};i.format=function(a,b,c){c=this.findClosestCulture(c);a instanceof Date?a=I(a,b,c):"number"===typeof a&&(a=Q(a,b,c));return a};i.localize=function(a,b){return this.findClosestCulture(b).messages[a]||this.cultures["default"].messages[a]};i.parseDate=function(a,b,c){var c=this.findClosestCulture(c),
d,f;if(b){if("string"===typeof b&&(b=[b]),b.length){f=0;for(var g=b.length;f<g;f++){var e=b[f];if(e&&(d=K(a,e,c)))break}}}else for(f in b=c.calendar.patterns,b)if(d=K(a,b[f],c))break;return d||null};i.parseInt=function(a,b,c){return G(i.parseFloat(a,b,c))};i.parseFloat=function(a,b,c){"number"!==typeof b&&(c=b,b=10);var d=this.findClosestCulture(c),c=NaN,f=d.numberFormat;-1<a.indexOf(d.numberFormat.currency.symbol)&&(a=a.replace(d.numberFormat.currency.symbol,""),a=a.replace(d.numberFormat.currency["."],
d.numberFormat["."]));-1<a.indexOf(d.numberFormat.percent.symbol)&&(a=a.replace(d.numberFormat.percent.symbol,""));a=a.replace(/ /g,"");if(M.test(a))c=parseFloat(a);else if(!b&&L.test(a))c=parseInt(a,16);else{d=x(a,f,f.pattern[0]);b=d[0];d=d[1];""===b&&"(n)"!==f.pattern[0]&&(d=x(a,f,"(n)"),b=d[0],d=d[1]);""===b&&"-n"!==f.pattern[0]&&(d=x(a,f,"-n"),b=d[0],d=d[1]);var b=b||"+",g,a=d.indexOf("e");0>a&&(a=d.indexOf("E"));0>a?(g=d,a=null):(g=d.substr(0,a),a=d.substr(a+1));var e=f["."],h=g.indexOf(e);0>
h?(d=g,g=null):(d=g.substr(0,h),g=g.substr(h+e.length));e=f[","];d=d.split(e).join("");h=e.replace(/\u00A0/g," ");e!==h&&(d=d.split(h).join(""));b+=d;null!==g&&(b+="."+g);null!==a&&(f=x(a,f,"-n"),b+="e"+(f[0]||"+")+f[1]);N.test(b)&&(c=parseFloat(b))}return c};i.culture=function(a){"undefined"!==typeof a&&(this.cultureSelector=a);return this.findClosestCulture(a)||this.cultures["default"]}})(this);(function(a){("undefined"!==typeof require&&"undefined"!==typeof exports&&"undefined"!==typeof module?require("globalize"):a.Globalize).addCultureInfo("de-DE","default",{name:"de-DE",englishName:"German (Germany)",nativeName:"Deutsch (Deutschland)",language:"de",numberFormat:{",":".",".":",",NaN:"n. def.",negativeInfinity:"-unendlich",positiveInfinity:"+unendlich",percent:{pattern:["-n%","n%"],",":".",".":","},currency:{pattern:["-n $","n $"],",":".",".":",",symbol:"€"}},calendars:{standard:{"/":".",
firstDay:1,days:{names:"Sonntag Montag Dienstag Mittwoch Donnerstag Freitag Samstag".split(" "),namesAbbr:"So Mo Di Mi Do Fr Sa".split(" "),namesShort:"So Mo Di Mi Do Fr Sa".split(" ")},months:{names:"Januar Februar März April Mai Juni Juli August September Oktober November Dezember ".split(" "),namesAbbr:"Jan Feb Mrz Apr Mai Jun Jul Aug Sep Okt Nov Dez ".split(" ")},AM:null,PM:null,eras:[{name:"n. Chr.",start:null,offset:0}],patterns:{d:"dd.MM.yyyy",D:"dddd, d. MMMM yyyy",t:"HH:mm",T:"HH:mm:ss",
f:"dddd, d. MMMM yyyy HH:mm",F:"dddd, d. MMMM yyyy HH:mm:ss",M:"dd MMMM",Y:"MMMM yyyy"}}}})})(this);(function(a){("undefined"!==typeof require&&"undefined"!==typeof exports&&"undefined"!==typeof module?require("globalize"):a.Globalize).addCultureInfo("en-AU","default",{name:"en-AU",englishName:"English (Australia)",nativeName:"English (Australia)",numberFormat:{currency:{pattern:["-$n","$n"]}},calendars:{standard:{firstDay:1,patterns:{d:"d/MM/yyyy",D:"dddd, d MMMM yyyy",f:"dddd, d MMMM yyyy h:mm tt",F:"dddd, d MMMM yyyy h:mm:ss tt",M:"dd MMMM",Y:"MMMM yyyy"}}}})})(this);(function(a){("undefined"!==typeof require&&"undefined"!==typeof exports&&"undefined"!==typeof module?require("globalize"):a.Globalize).addCultureInfo("en-CA","default",{name:"en-CA",englishName:"English (Canada)",nativeName:"English (Canada)",numberFormat:{currency:{pattern:["-$n","$n"]}},calendars:{standard:{patterns:{d:"dd/MM/yyyy",D:"MMMM-dd-yy",f:"MMMM-dd-yy h:mm tt",F:"MMMM-dd-yy h:mm:ss tt"}}}})})(this);(function(a){("undefined"!==typeof require&&"undefined"!==typeof exports&&"undefined"!==typeof module?require("globalize"):a.Globalize).addCultureInfo("en-GB","default",{name:"en-GB",englishName:"English (United Kingdom)",nativeName:"English (United Kingdom)",numberFormat:{currency:{pattern:["-$n","$n"],symbol:"£"}},calendars:{standard:{firstDay:1,patterns:{d:"dd/MM/yyyy",D:"dd MMMM yyyy",t:"HH:mm",T:"HH:mm:ss",f:"dd MMMM yyyy HH:mm",F:"dd MMMM yyyy HH:mm:ss",M:"dd MMMM",Y:"MMMM yyyy"}}}})})(this);(function(a){("undefined"!==typeof require&&"undefined"!==typeof exports&&"undefined"!==typeof module?require("globalize"):a.Globalize).addCultureInfo("en-IN","default",{name:"en-IN",englishName:"English (India)",nativeName:"English (India)",numberFormat:{groupSizes:[3,2],percent:{groupSizes:[3,2]},currency:{pattern:["$ -n","$ n"],groupSizes:[3,2],symbol:"Rs."}},calendars:{standard:{"/":"-",firstDay:1,patterns:{d:"dd-MM-yyyy",D:"dd MMMM yyyy",t:"HH:mm",T:"HH:mm:ss",f:"dd MMMM yyyy HH:mm",F:"dd MMMM yyyy HH:mm:ss",
M:"dd MMMM"}}}})})(this);(function(a){("undefined"!==typeof require&&"undefined"!==typeof exports&&"undefined"!==typeof module?require("globalize"):a.Globalize).addCultureInfo("en-US","default",{name:"en-US",englishName:"English (United States)"})})(this);(function(a){("undefined"!==typeof require&&"undefined"!==typeof exports&&"undefined"!==typeof module?require("globalize"):a.Globalize).addCultureInfo("es","default",{name:"es",englishName:"Spanish",nativeName:"español",language:"es",numberFormat:{",":".",".":",",NaN:"NeuN",negativeInfinity:"-Infinito",positiveInfinity:"Infinito",percent:{",":".",".":","},currency:{pattern:["-n $","n $"],",":".",".":",",symbol:"€"}},calendars:{standard:{firstDay:1,days:{names:"domingo lunes martes miércoles jueves viernes sábado".split(" "),
namesAbbr:"dom lun mar mié jue vie sáb".split(" "),namesShort:"do lu ma mi ju vi sá".split(" ")},months:{names:"enero febrero marzo abril mayo junio julio agosto septiembre octubre noviembre diciembre ".split(" "),namesAbbr:"ene feb mar abr may jun jul ago sep oct nov dic ".split(" ")},AM:null,PM:null,eras:[{name:"d.C.",start:null,offset:0}],patterns:{d:"dd/MM/yyyy",D:"dddd, dd' de 'MMMM' de 'yyyy",t:"H:mm",T:"H:mm:ss",f:"dddd, dd' de 'MMMM' de 'yyyy H:mm",F:"dddd, dd' de 'MMMM' de 'yyyy H:mm:ss",
M:"dd MMMM",Y:"MMMM' de 'yyyy"}}}})})(this);(function(a){("undefined"!==typeof require&&"undefined"!==typeof exports&&"undefined"!==typeof module?require("globalize"):a.Globalize).addCultureInfo("fr","default",{name:"fr",englishName:"French",nativeName:"français",language:"fr",numberFormat:{",":" ",".":",",NaN:"Non Numérique",negativeInfinity:"-Infini",positiveInfinity:"+Infini",percent:{",":" ",".":","},currency:{pattern:["-n $","n $"],",":" ",".":",",symbol:"€"}},calendars:{standard:{firstDay:1,days:{names:"dimanche lundi mardi mercredi jeudi vendredi samedi".split(" "),
namesAbbr:"dim. lun. mar. mer. jeu. ven. sam.".split(" "),namesShort:"di lu ma me je ve sa".split(" ")},months:{names:"janvier février mars avril mai juin juillet août septembre octobre novembre décembre ".split(" "),namesAbbr:"janv. févr. mars avr. mai juin juil. août sept. oct. nov. déc. ".split(" ")},AM:null,PM:null,eras:[{name:"ap. J.-C.",start:null,offset:0}],patterns:{d:"dd/MM/yyyy",D:"dddd d MMMM yyyy",t:"HH:mm",T:"HH:mm:ss",f:"dddd d MMMM yyyy HH:mm",F:"dddd d MMMM yyyy HH:mm:ss",M:"d MMMM",
Y:"MMMM yyyy"}}}})})(this);(function(a){("undefined"!==typeof require&&"undefined"!==typeof exports&&"undefined"!==typeof module?require("globalize"):a.Globalize).addCultureInfo("pt-BR","default",{name:"pt-BR",englishName:"Portuguese (Brazil)",nativeName:"Português (Brasil)",language:"pt",numberFormat:{",":".",".":",",NaN:"NaN (Não é um número)",negativeInfinity:"-Infinito",positiveInfinity:"+Infinito",percent:{pattern:["-n%","n%"],",":".",".":","},currency:{pattern:["-$ n","$ n"],",":".",".":",",symbol:"R$"}},calendars:{standard:{days:{names:"domingo segunda-feira terça-feira quarta-feira quinta-feira sexta-feira sábado".split(" "),
namesAbbr:"dom seg ter qua qui sex sáb".split(" "),namesShort:"DSTQQSS".split("")},months:{names:"janeiro fevereiro março abril maio junho julho agosto setembro outubro novembro dezembro ".split(" "),namesAbbr:"jan fev mar abr mai jun jul ago set out nov dez ".split(" ")},AM:null,PM:null,eras:[{name:"d.C.",start:null,offset:0}],patterns:{d:"dd/MM/yyyy",D:"dddd, d' de 'MMMM' de 'yyyy",t:"HH:mm",T:"HH:mm:ss",f:"dddd, d' de 'MMMM' de 'yyyy HH:mm",F:"dddd, d' de 'MMMM' de 'yyyy HH:mm:ss",M:"dd' de 'MMMM",
Y:"MMMM' de 'yyyy"}}}})})(this);