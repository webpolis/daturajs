/**
 * User model.
 *
 * Auto-generated by modelGenerator.
 *
 * @author Nicolas Iglesias <nicolas@clevertech.biz>
 */
module.exports = function(seq, dataTypes) {
	return seq.define("user", {
		"id" : {
			type : dataTypes.INTEGER, allowNull : false, primaryKey : true, autoIncrement : true
		},
		"is_super_user" : {
			type : dataTypes.BOOLEAN, allowNull : true
		},
		"first_name" : {
			type : dataTypes.STRING, allowNull : true, max : 200
		},
		"last_name" : {
			type : dataTypes.STRING, allowNull : true, max : 200
		},
		"username" : {
			type : dataTypes.STRING, allowNull : true, max : 200
		},
		"email" : {
			type : dataTypes.STRING, allowNull : true, max : 350
		},
		"password" : {
			type : dataTypes.STRING, allowNull : true, max : 200
		},
		"is_active" : {
			type : dataTypes.BOOLEAN, allowNull : true
		},
		"job_title" : {
			type : dataTypes.STRING, allowNull : true, max : 350
		},
		"address" : {
			type : dataTypes.STRING, allowNull : true, max : 350
		},
		"address2" : {
			type : dataTypes.STRING, allowNull : true, max : 350
		},
		"city" : {
			type : dataTypes.STRING, allowNull : true, max : 350
		},
		"zip_code" : {
			type : dataTypes.STRING, allowNull : true, max : 50
		},
		"phone" : {
			type : dataTypes.STRING, allowNull : true, max : 50
		},
		"fax" : {
			type : dataTypes.STRING, allowNull : true, max : 50
		},
		"user_auth_limit" : {
			type : dataTypes.FLOAT, allowNull : true, max : 1179650
		},
		"region_account_code" : {
			type : dataTypes.STRING, allowNull : true, max : 50
		},
		"is_deleted" : {
			type : dataTypes.BOOLEAN, allowNull : true
		},
		"created_date" : {
			type : dataTypes.DATE, allowNull : true
		},
		"created_by_id" : {
			type : dataTypes.INTEGER, allowNull : true
		},
		"modified_date" : {
			type : dataTypes.DATE, allowNull : true
		},
		"modified_by_id" : {
			type : dataTypes.INTEGER, allowNull : true
		},
		"user_role_id" : {
			type : dataTypes.INTEGER, allowNull : true
		},
		"department_id" : {
			type : dataTypes.INTEGER, allowNull : true
		},
		"client_id" : {
			type : dataTypes.INTEGER, allowNull : true
		},
		"supervisor_id" : {
			type : dataTypes.INTEGER, allowNull : true
		},
		"vendor_id" : {
			type : dataTypes.INTEGER, allowNull : true
		},
		"state_id" : {
			type : dataTypes.INTEGER, allowNull : true
		},
		"country_id" : {
			type : dataTypes.INTEGER, allowNull : true
		},
	},{
		instanceMethods : {
		// place your custom model methods below.
		},
                classMethods : {
                    auth : function(data){
                        // check login fields
                        
                        return true;
                    }
                }
	});
}