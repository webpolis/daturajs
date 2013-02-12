/**
 * Subscription model.
 *
 * Auto-generated by modelGenerator.
 *
 * @author Nicolas Iglesias <nicolas@clevertech.biz>
 */
var inflector = require('inflector');

exports.model = {
	// access your variables by adding the $$ prefix
	name : 'subscription',
	// map your database columns here
	fields : [
		{name : 'id', label : 'id'.humanize(), type : 'integer', required : true, primaryKey : true},
		{name : 'subscription_code', label : 'subscription_code'.humanize(), type : 'string', required : true, max : 3},
		{name : 'subscription_label', label : 'subscription_label'.humanize(), type : 'string', required : true, max : 255},
	],
	// place your custom model methods below.
	methods : {
	},
	relations : {
		hasOne:[],
		hasMany:[],
		belongsTo:[
                    {model:'client', alias:'client', foreignKey:'subscription_id'}
                ],
	}
}