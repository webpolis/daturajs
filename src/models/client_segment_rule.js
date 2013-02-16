/**
 * Client Segment Rule model.
 *
 * Auto-generated by modelGenerator.
 *
 * @author Nicolas Iglesias <nicolas@clevertech.biz>
 */
var inflector = require('inflector');

exports.model = {
	// access your variables by adding the $$ prefix
	name : 'client_segment_rule',
	// map your database columns here
	fields : [
		{name : 'id', label : 'id'.humanize(), type : 'integer', required : true, primaryKey : true},
		{name : 'account_code_list', label : 'account_code_list'.humanize(), type : 'string', required : false, max : 500},
		{name : 'approvers_list', label : 'approvers_list'.humanize(), type : 'string', required : false, max : 500},
		{name : 'operator', label : 'operator'.humanize(), type : 'string', required : false, max : 50},
		{name : 'line_amount', label : 'line_amount'.humanize(), type : 'float', required : false, max : 1245188},
		{name : 'is_active', label : 'is_active'.humanize(), type : 'boolean', required : false},
		{name : 'created_date', label : 'created_date'.humanize(), type : 'date', required : false},
		{name : 'created_by_id', label : 'created_by_id'.humanize(), type : 'integer', required : false},
		{name : 'client_id', label : 'client_id'.humanize(), type : 'integer', required : true},
		{name : 'accounting_segment_id', label : 'accounting_segment_id'.humanize(), type : 'integer', required : true},
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