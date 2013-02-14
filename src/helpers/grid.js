/**
 * Contains utilities to be used together with ngGrid.
 *
 * @class   grid
 * @author  Nicolas Iglesias <nicolas@clevertech.biz>
 */
module.exports = function(config){

    /**
    * @param   {Object}    Default values for type map.
    * @private
    */
    var _config = config || {
        typeMap: {
            'boolean':'Yes;No'
        }
    }
    
    return {
        typeMap : function(fields){
            fields.forEach(function(f){
                switch(f.type){
                    case 'boolean':
                        var bb = _config.typeMap['boolean'].split(';')
                        f.cellTemplate = "<div>{{ row.entity[col.field] && '"+bb[0]+"' || '"+bb[1]+"' }}</div>";
                        f.sortFn = function(a,b){
                            if (a == b) return 0;
                            if (a < b) return -1;
                            return 1;
                        }
                        break;
                }
            })
            
            return fields;
        }
    }
}()