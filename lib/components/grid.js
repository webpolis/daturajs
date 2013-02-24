/**
 * Contains utilities to be used together with ngGrid.
 *
 * @class   grid
 * @author  Nicolas Iglesias <nico@webpolis.com.ar>
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
	/**
	* Convert model's fields types to be parseable by ngGrid module.
	*
	* @function	typeMap
	* @param	{Array}	fields	model's fields
	* @return	{Array}	fields	
	*/
        typeMap : function(fields){
            fields.forEach(function(f){
                switch(f.type){
                    case 'boolean':
                        var bb = _config.typeMap['boolean'].split(';')
                        f.cellTemplate = "<div>{{ row.entity[col.field] && '"+bb[0]+"' || '"+bb[1]+"' }}</div>";
                        f.sortCbk = 'boolean'
                        break;
                }
            })
            
            return fields;
        }
    }
}()