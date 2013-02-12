/**
 * Client model.
 *
 * Auto-generated by modelGenerator.
 *
 * @author Nicolas Iglesias <nicolas@clevertech.biz>
 */
var inflector = require('inflector');

exports.model = {
	// access your variables by adding the $$ prefix
	name : 'client',
	// map your database columns here
	fields : [
		{name : 'id', label : 'id'.humanize(), type : 'integer', required : true, primaryKey : true},
		{name : 'client_name', label : 'client_name'.humanize(), type : 'string', required : false, max : 250},
		{name : 'address', label : 'address'.humanize(), type : 'string', required : false, max : 250},
		{name : 'address2', label : 'address2'.humanize(), type : 'string', required : false, max : 250},
		{name : 'city', label : 'city'.humanize(), type : 'string', required : false, max : 100},
		{name : 'postal_code', label : 'postal_code'.humanize(), type : 'string', required : false, max : 50},
		{name : 'phone', label : 'phone'.humanize(), type : 'string', required : false, max : 50},
		{name : 'fax', label : 'fax'.humanize(), type : 'string', required : false, max : 50},
		{name : 'cfdsn', label : 'cfdsn'.humanize(), type : 'string', required : false, max : 100},
		{name : 'server_address', label : 'server_address'.humanize(), type : 'string', required : false, max : 1024},
		{name : 'server_port', label : 'server_port'.humanize(), type : 'integer', required : false},
		{name : 'server_type', label : 'server_type'.humanize(), type : 'string', required : false, max : 50},
		{name : 'dbname', label : 'dbname'.humanize(), type : 'string', required : false, max : 100},
		{name : 'dblogin', label : 'dblogin'.humanize(), type : 'string', required : false, max : 100},
		{name : 'dbpassword', label : 'dbpassword'.humanize(), type : 'string', required : false, max : 150},
		{name : 'accounts_payable_code', label : 'accounts_payable_code'.humanize(), type : 'string', required : false, max : 150},
		{name : 'is_active', label : 'is_active'.humanize(), type : 'boolean', required : false},
		{name : 'is_deleted', label : 'is_deleted'.humanize(), type : 'boolean', required : false},
		{name : 'is_setup_displayed', label : 'is_setup_displayed'.humanize(), type : 'boolean', required : false},
		{name : 'client_code', label : 'client_code'.humanize(), type : 'string', required : false, max : 50},
		{name : 'client_folder', label : 'client_folder'.humanize(), type : 'string', required : false, max : 50},
		{name : 'created_date', label : 'created_date'.humanize(), type : 'date', required : false},
		{name : 'created_by_id', label : 'created_by_id'.humanize(), type : 'integer', required : false},
		{name : 'modified_date', label : 'modified_date'.humanize(), type : 'date', required : false},
		{name : 'modified_by_id', label : 'modified_by_id'.humanize(), type : 'integer', required : false},
		{name : 'last_sync_date', label : 'last_sync_date'.humanize(), type : 'date', required : false},
		{name : 'billing_address', label : 'billing_address'.humanize(), type : 'string', required : false, max : 250},
		{name : 'billing_address2', label : 'billing_address2'.humanize(), type : 'string', required : false, max : 250},
		{name : 'billing_city', label : 'billing_city'.humanize(), type : 'string', required : false, max : 250},
		{name : 'billing_state_id', label : 'billing_state_id'.humanize(), type : 'integer', required : false},
		{name : 'card_holder_name', label : 'card_holder_name'.humanize(), type : 'string', required : false, max : 250},
		{name : 'credit_card_expiration', label : 'credit_card_expiration'.humanize(), type : 'string', required : false, max : 50},
		{name : 'credit_card_number', label : 'credit_card_number'.humanize(), type : 'string', required : false, max : 250},
		{name : 'mile_rate', label : 'mile_rate'.humanize(), type : 'float', required : true, max : 1179650},
		{name : 'subscription_id', label : 'subscription_id'.humanize(), type : 'integer', required : false},
		{name : 'with_setup_fee', label : 'with_setup_fee'.humanize(), type : 'string', required : false, max : 50},
		{name : 'state_id', label : 'state_id'.humanize(), type : 'integer', required : true},
		{name : 'country_id', label : 'country_id'.humanize(), type : 'integer', required : true},
		{name : 'accounting_system_type_id', label : 'accounting_system_type_id'.humanize(), type : 'integer', required : false},
	],
	// place your custom model methods below.
	methods : {
            getServerTypes : function(){
                return [
                    {code:'mssql',label:'MS SQL'},
                    {code:'oracle',label:'Oracle'},
                ]
            }
	},
	relations : {
		hasOne:[
                    {model:'subscription', alias:'subscription'}
                ],
		hasMany:[
                    {model:'user', alias:'user', foreignKey:'client_id'}
                ],
		belongsTo:[],
	}
}