/**
 * jquery.emoticons.js 1.0
 * http://jquerywidget.com
 */
;(function (factory) {
    if (typeof define === "function" && (define.amd || define.cmd) && !jQuery) {
        // AMD或CMD
        define([ "jquery" ],factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function( root, jQuery ) {
            if ( jQuery === undefined ) {
                if ( typeof window !== 'undefined' ) {
                    jQuery = require('jquery');
                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        //Browser globals
        factory(jQuery);
    }
}(function ($) {
    $.emoticons = function(parameter,getApi) {
        if(typeof parameter == 'function'){ //重载
            getApi = parameter;
            parameter = {};
        }else{
            parameter = parameter || {};
            getApi = getApi||function(){};
        }
        var defaults = {
            'prefix':'widget',
            'publisherCls':'publisher',
            'triggerCls':'trigger',
            'activeCls':'active',
            'path':'/html/weui/emjoy/image/',
            'list':[
                {'title':'微笑','url':'1.gif'},
                {'title':'撇嘴','url':'2.gif'},
                {'title':'色','url':'3.gif'},
                {'title':'发呆','url':'4.gif'},
                {'title':'流泪','url':'5.gif'},
                {'title':'害羞','url':'6.gif'},
                {'title':'闭嘴','url':'7.gif'},
                {'title':'睡','url':'8.gif'},
                {'title':'大哭','url':'9.gif'},
                {'title':'尴尬','url':'10.gif'},
                {'title':'发怒','url':'11.gif'},
                {'title':'调皮','url':'12.gif'},
                {'title':'呲牙','url':'13.gif'},
                {'title':'惊讶','url':'14.gif'},
                {'title':'难过','url':'15.gif'},
                {'title':'冷汗','url':'16.gif'},
                {'title':'抓狂','url':'17.gif'},
                {'title':'吐','url':'18.gif'},
                {'title':'偷笑','url':'19.gif'},
                {'title':'可爱','url':'20.gif'},
                {'title':'白眼','url':'21.gif'},
                {'title':'傲慢','url':'22.gif'},
                {'title':'饥饿','url':'23.gif'},
                {'title':'困','url':'24.gif'},
                {'title':'惊恐','url':'25.gif'},
                {'title':'流汗','url':'26.gif'},
                {'title':'憨笑','url':'27.gif'},
                {'title':'大兵','url':'28.gif'},
                {'title':'奋斗','url':'29.gif'},
                {'title':'咒骂','url':'30.gif'},
                {'title':'疑问','url':'31.gif'},
                {'title':'虚','url':'32.gif'},
                {'title':'晕','url':'33.gif'},
                {'title':'折磨','url':'34.gif'},
                {'title':'衰','url':'35.gif'},
                {'title':'敲打','url':'36.gif'},
                {'title':'再见','url':'37.gif'},
                {'title':'擦汗','url':'38.gif'},
                {'title':'抠鼻','url':'39.gif'},
                {'title':'糗大了','url':'40.gif'},
                {'title':'坏笑','url':'41.gif'},
                {'title':'左哼哼','url':'42.gif'},
                {'title':'右哼哼','url':'43.gif'},
                {'title':'哈欠','url':'44.gif'},
                {'title':'鄙视','url':'45.gif'},
                {'title':'委屈','url':'46.gif'},
                {'title':'快哭了','url':'47.gif'},
                {'title':'阴险','url':'48.gif'},
                {'title':'亲','url':'49.gif'},
                {'title':'吓','url':'50.gif'},
                {'title':'可怜','url':'51.gif'},
                {'title':'拥抱','url':'52.gif'},
                {'title':'月亮','url':'53.gif'},
                {'title':'太阳','url':'54.gif'},
                {'title':'炸弹','url':'55.gif'},
                {'title':'骷髅','url':'56.gif'},
                {'title':'菜刀','url':'57.gif'},
                {'title':'猪头','url':'58.gif'},
                {'title':'西瓜','url':'59.gif'},
                {'title':'咖啡','url':'60.gif'},
                {'title':'米饭','url':'61.gif'},
                {'title':'爱心','url':'62.gif'},
                {'title':'强','url':'63.gif'},
                {'title':'弱','url':'64.gif'},
                {'title':'握手','url':'65.gif'},
                {'title':'胜利','url':'66.gif'},
                {'title':'抱拳','url':'67.gif'},
                {'title':'勾引','url':'68.gif'},
                {'title':'OK','url':'69.gif'},
                {'title':'NO','url':'70.gif'},
                {'title':'玫瑰','url':'71.gif'},
                {'title':'凋零','url':'72.gif'}

            ],
            'top':0,
            'left':0,
            'onShow':function(){},
            'onHide':function(){},
            'onSelect':function(){}
        };
        var options = $.extend({}, defaults, parameter);

        var _api = {};
        var $document = $(document);
        var $body = $('body');
        var $layer = $('<div class="'+options.prefix+'-layer">').appendTo($body);
        var $tool = $('<div class="'+options.prefix+'-tool"></div>').appendTo($layer);
        var $close = $('<a class="'+options.prefix+'-close" href="javascript:;" title="关闭">X</a>').appendTo($tool);
        var $panel = $('<div class="'+options.prefix+'-panel"></div>').appendTo($layer);
        var $list = $('<ul></ul>').appendTo($panel);
        var $trigger = null;
        var $textarea = null;
        var _hash = {};
        //结构处理
        $layer.css({
            'position':'absolute',
            'display':'none'
        });
        $.each(options.list,function(index,item){
            _hash[item.title] = options.path+item.url;
            $list.append('<li title="'+item.title+'"><img data-src="'+_hash[item.title]+'"/></li>');
        });
        //接口处理
        _api.getTextarea = function(){
            return $textarea;
        },
        _api.format = function(str){
            var list = str.match(/\[[\u4e00-\u9fa5]*\w*\]/g);
            var filter = /[\[\]]/g;
            var title;
            if(list){
                for(var i=0;i<list.length;i++){
                    title = list[i].replace(filter,'');
                    if(_hash[title]){
                        str = str.replace(list[i],' <img src="'+_hash[title]+'"/> ');
                    }
                }                
            }
            return str;
        };
        //关闭弹框
        var closeLayer = function(){
            if($trigger){
                $trigger.removeClass(options.activeCls);
            }
            $layer.hide();
            $trigger = null;
            $textarea = null;
            options.onHide();
        };
        //事件绑定
        $document.on('click','.'+options.triggerCls,function(){
            $trigger = $(this);
            var $publisher = $trigger.parents('.'+options.publisherCls);
            $textarea = $publisher.find('textarea');
            var offset = $trigger.offset();
            var height = $trigger.outerHeight();
            $trigger.addClass(options.activeCls);
            $layer.find('img').each(function(){
                var $this = $(this);
                $this.attr('src',$this.data('src'));
            });
            $layer.css({
                left: offset.left+options.left,
                top: offset.top+height+options.top
            }).show();
            options.onShow();
        });
        $document.on('click',function(e){
            var $target = $(e.target);
            if(!$target.is('.'+options.triggerCls)&&!$target.closest('.'+options.prefix+'-layer').length){
                closeLayer();
            }
        });
        $layer.on('click','.'+options.prefix+'-close',closeLayer);
        $layer.on('click','li',function(){
            var $this = $(this);
            var title = $this.attr('title');
            if($textarea){
                insertText($textarea[0],'['+title+']');
            }
            options.onSelect(_api);
        });
        //为了兼容insertText
        $document.on('select click keyup','.'+options.publisherCls+' textarea',function(){
            if (this.createTextRange){
                this.caretPos = document.selection.createRange().duplicate();
            }
        });
        //初始化
        getApi(_api);
        return this;
    };

    //插入文字
    function insertText(obj,str) {
        if(document.all && obj.createTextRange && obj.caretPos){ 
            var caretPos=obj.caretPos; 
            caretPos.text = caretPos.text.charAt(caretPos.text.length-1) == '' ? 
            str+'' : str; 
        }else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
            var startPos = obj.selectionStart,
                endPos = obj.selectionEnd,
                cursorPos = startPos,
                tmpStr = obj.value;
            obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
            cursorPos += str.length;
            obj.selectionStart = obj.selectionEnd = cursorPos;
        } else {
            obj.value += str;
        }
    }
}));
