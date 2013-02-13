/**
 * User model.
 *
 * Auto-generated by modelGenerator.
 *
 * @author Nicolas Iglesias <nicolas@clevertech.biz>
 */
var inflector = require('inflector')

exports.model = {
	// access your variables by adding the $$ prefix
	name : 'user',
	// map your database columns here
	fields : [
		{name : 'id', label : 'id'.humanize(), type : 'integer', required : true, primaryKey : true},
		{name : 'is_super_user', label : 'is_super_user'.humanize(), type : 'boolean', required : false},
		{name : 'first_name', label : 'first_name'.humanize(), type : 'string', required : false, max : 200},
		{name : 'last_name', label : 'last_name'.humanize(), type : 'string', required : false, max : 200},
		{name : 'username', label : 'username'.humanize(), type : 'string', required : false, max : 200},
		{name : 'email', label : 'email'.humanize(), type : 'string', required : false, max : 350},
		{name : 'password', label : 'password'.humanize(), type : 'string', required : false, max : 200},
		{name : 'is_active', label : 'is_active'.humanize(), type : 'boolean', required : false},
		{name : 'job_title', label : 'job_title'.humanize(), type : 'string', required : false, max : 350},
		{name : 'address', label : 'address'.humanize(), type : 'string', required : false, max : 350},
		{name : 'address2', label : 'address2'.humanize(), type : 'string', required : false, max : 350},
		{name : 'city', label : 'city'.humanize(), type : 'string', required : false, max : 350},
		{name : 'zip_code', label : 'zip_code'.humanize(), type : 'string', required : false, max : 50},
		{name : 'phone', label : 'phone'.humanize(), type : 'string', required : false, max : 50},
		{name : 'fax', label : 'fax'.humanize(), type : 'string', required : false, max : 50},
		{name : 'user_auth_limit', label : 'user_auth_limit'.humanize(), type : 'float', required : false, max : 1179650},
		{name : 'region_account_code', label : 'region_account_code'.humanize(), type : 'string', required : false, max : 50},
		{name : 'is_deleted', label : 'is_deleted'.humanize(), type : 'boolean', required : false},
		{name : 'created_date', label : 'created_date'.humanize(), type : 'date', required : false},
		{name : 'created_by_id', label : 'created_by_id'.humanize(), type : 'integer', required : false},
		{name : 'modified_date', label : 'modified_date'.humanize(), type : 'date', required : false},
		{name : 'modified_by_id', label : 'modified_by_id'.humanize(), type : 'integer', required : false},
		{name : 'user_role_id', label : 'user_role_id'.humanize(), type : 'integer', required : false},
		{name : 'department_id', label : 'department_id'.humanize(), type : 'integer', required : false},
		{name : 'client_id', label : 'client_id'.humanize(), type : 'integer', required : true},
		{name : 'supervisor_id', label : 'supervisor_id'.humanize(), type : 'integer', required : false},
		{name : 'vendor_id', label : 'vendor_id'.humanize(), type : 'integer', required : false},
		{name : 'state_id', label : 'State', type : 'integer', required : true},
		{name : 'country_id', label : 'Country', type : 'integer', required : true},
	],
	// place your custom model methods below.
        methods : {
            auth: function(data, cbk){
                this.$find('one',{
                    conditions:[
                    "username = ':username' AND password = ':password'"
                    ],
                    params:{
                        username:data.username, 
                        password: data.password
                    },
                    fields:['id','username','first_name', 'last_name', 'client_id']
                },function(user){
                    /**
                     * Make only a few fields available to the auth object when saving cookie 
                     * by passing an array of fields names as 2nd argument to callback.
                     */
                    cbk(user)
                });
            }
        },
        relations : {
            hasOne:[
                
            ],
            hasMany:[],
            belongsTo:[
                {model:'client', alias:'client', foreignKey: 'client_id'},
            ]
        }
}