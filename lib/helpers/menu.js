var dom = require('cheerio');

module.exports = function(){
    var _setAttributes = function(attrs, el){
        Object.keys(attrs).forEach(function(attr){
            if(!/^(?:sub|root)CssClass$/g.test(attr)){
                    
            }
        })
    }
    
    return {
        vertical : function(menu, opts){
            var topMenu = dom.load('<ul />'), topItems = [];
            topMenu('ul').addClass(opts.rootCssClass)
            
            try{
                if(menu.length >0){
                    menu.forEach(function(m){
                        var mt = m.target ? m.target : '#';
                        var onclick = m.onclick ? m.onclick : null;
                        
                        var topItem = dom.load('<li />');
                        var topLink = dom.load('<a />');

                        topLink('a').text(m.label);
                        topLink('a').attr('href', mt);
                        topItem('li').append(topLink('a'))
                        var rid = Math.ceil(Math.random()*10000)
                        topLink('a').attr('ng-click', '_'+rid+'=!_'+rid)
                        topLink('a').attr('onclick','javascript:void('+onclick+')')
                        
                        if(m.childs instanceof Array){
                            topLink('a').attr('data-toggle','dropdown')
                            topLink('a').addClass('dropdown-toggle')
                            topItem('li').addClass('dropdown')
                            
                            var subMenu = dom.load('<ul />');
                            subMenu('ul').addClass(opts.subCssClass)
                            
                            m.childs.forEach(function(c){
                                var onclick = c.onclick ? c.onclick : null;
                                var ct = c.target ? c.target : '#';
                                var child = dom.load('<li />');
                                var childLink = dom.load('<a />');
                                childLink('a').attr('href',ct);
                                childLink('a').text(c.label)
                                childLink('a').attr('onclick','javascript:void('+onclick+')')
                                child('li').append(childLink('a'))
                                
                                subMenu('ul').append(child('li'))
                            });
                            
                            topItem('li').append(subMenu('ul'))
                        }
                        
                        topItems.push(topItem)
                    });
                }
            }catch(e){
                console.trace(e)
            }
            
            var o = '';
            topItems.forEach(function(top){
                o += top.html()
            })
            
            if(opts.id)
                topMenu('ul').attr('id',opts.id)
            
            return topMenu('ul').html(o);
        }
    }
}()