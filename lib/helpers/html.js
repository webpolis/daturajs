var dom = require('cheerio')
,inflector = require('inflector');

module.exports = function(){
    return {
        input : function(model, attr, opts){
            opts = typeof opts !== 'undefined' ? opts : {};
            attr = attr.trim();
            
            var type = opts.type ? opts.type : 'text';
            delete opts.type;
            
            var $ = dom.load('<input />');
            
            // set attributes
            $('input').attr('name', attr);
            $('input').attr('type', type.trim());
            
            // AngularJs support
            if(opts.angular){
                $('input').attr('ng-model', model.trim()+'.'+attr);
                delete opts.angular;
            }
            
            // render pending attributes
            for(var a in opts){
                $('input').attr(a,opts[a]);
            }
            
            return $.html();
        },
        label : function(attr, opts){
            opts = typeof opts !== 'undefined' ? opts : {};
            attr = attr.trim();
            
            var $ = dom.load('<label />');
            
            // set attributes
            if(opts['for']){
                $('label').attr('for', opts['for']);
                delete opts['for'];
            }
            
            $('label').text(attr);
            
            // render pending attributes
            for(var a in opts){
                $('label').attr(a,opts[a]);
            }
            
            return $.html();
        },
        tag: function(tag, html, opts) {
            var $ = dom.load('<'+tag+' />');
            $(tag).html(html);
            
            // render pending attributes
            for(var a in opts){
                $(tag).attr(a,opts[a]);
            }
            
            return $.html()
        },
        select : function(model, attr, opts){
            opts = typeof opts !== 'undefined' ? opts : {};
            attr = attr.trim();
            
            var $ = dom.load('<select />');
            
            // set attributes
            $('select').attr('name', attr);
            
            // AngularJs support
            if(opts.angular){
                $('select').attr('ng-model', model.trim()+'.'+attr);
                delete opts.angular;
            }
            
            // load data
            if(opts.data){
                for(var d in opts.data){
                    var opt = $('<option />');
                    opt.attr('value',opts.data[d].id);
                    opt.text(opts.dataLabel ? opts.data[d][opts.dataLabel] : opts.data[d].name);
                    
                    $('select').append(opt);
                }
                
                delete opts.data;
                delete opts.dataLabel;
            }
            
            // render pending attributes
            for(var a in opts){
                $('select').attr(a,opts[a]);
            }
            
            return $.html();
        },
    }
}()