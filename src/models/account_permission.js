/**
 * Account Permission model.
 *
 * Auto-generated by modelGenerator.
 *
 * @author Nicolas Iglesias <nico@webpolis.com.ar>
 */
var inflector = require('inflector');

exports.model = {
	// access your variables by adding the $$ prefix
	name : 'account_permission',
	// map your database columns here
	fields : [
		{name : 'id', label : 'id'.humanize(), type : 'integer', required : true, primaryKey : true},
		{name : 'account_id', label : 'account_id'.humanize(), type : 'integer', required : true},
		{name : 'department_id', label : 'department_id'.humanize(), type : 'integer', required : true},
	],
	// place your custom model methods below.
	methods : {
		$instanceMethod : function(){ console.log('Prefix your instance methods\' name with a dollar sign ($). Example: model.$instanceMethod()');},
		classMethod : function(){ console.log('This class method is accesed statically. Example: this.models.modelName.classMethod()');}
	},
	relations : {
		hasOne:[],
		hasMany:[],
		belongsTo:[],
	}
}