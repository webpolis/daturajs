/**
 * Track Change model.
 *
 * Auto-generated by modelGenerator.
 *
 * @author Nicolas Iglesias <nico@webpolis.com.ar>
 */
var inflector = require('inflector');

exports.model = {
	// access your variables by adding the $$ prefix
	name : 'track_change',
	// map your database columns here
	fields : [
		{name : 'id', label : 'id'.humanize(), type : 'integer', required : true, primaryKey : true},
		{name : 'record_id', label : 'record_id'.humanize(), type : 'integer', required : false},
		{name : 'details', label : 'details'.humanize(), type : 'text', required : false},
		{name : 'created_date', label : 'created_date'.humanize(), type : 'date', required : false},
		{name : 'user_id', label : 'user_id'.humanize(), type : 'integer', required : true},
		{name : 'record_type_id', label : 'record_type_id'.humanize(), type : 'integer', required : true},
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