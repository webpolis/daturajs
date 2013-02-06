/**
 * Client model.
 *
 * Auto-generated by modelGenerator.
 *
 * @author Nicolas Iglesias <nicolas@clevertech.biz>
 */
module.exports = function(seq, dataTypes) {
	return seq.define("client", {
		"id" : {
			type : dataTypes.INTEGER, allowNull : false, primaryKey : true, autoIncrement : true
		},
		"client_name" : {
			type : dataTypes.STRING, allowNull : true, max : 250
		},
		"address" : {
			type : dataTypes.STRING, allowNull : true, max : 250
		},
		"address2" : {
			type : dataTypes.STRING, allowNull : true, max : 250
		},
		"city" : {
			type : dataTypes.STRING, allowNull : true, max : 100
		},
		"postal_code" : {
			type : dataTypes.STRING, allowNull : true, max : 50
		},
		"phone" : {
			type : dataTypes.STRING, allowNull : true, max : 50
		},
		"fax" : {
			type : dataTypes.STRING, allowNull : true, max : 50
		},
		"cfdsn" : {
			type : dataTypes.STRING, allowNull : true, max : 100
		},
		"server_address" : {
			type : dataTypes.STRING, allowNull : true, max : 1024
		},
		"server_port" : {
			type : dataTypes.INTEGER, allowNull : true
		},
		"server_type" : {
			type : dataTypes.STRING, allowNull : true, max : 50
		},
		"dbname" : {
			type : dataTypes.STRING, allowNull : true, max : 100
		},
		"dblogin" : {
			type : dataTypes.STRING, allowNull : true, max : 100
		},
		"dbpassword" : {
			type : dataTypes.STRING, allowNull : true, max : 150
		},
		"accounts_payable_code" : {
			type : dataTypes.STRING, allowNull : true, max : 150
		},
		"is_active" : {
			type : dataTypes.BOOLEAN, allowNull : true
		},
		"is_deleted" : {
			type : dataTypes.BOOLEAN, allowNull : true
		},
		"is_setup_displayed" : {
			type : dataTypes.BOOLEAN, allowNull : true
		},
		"client_code" : {
			type : dataTypes.STRING, allowNull : true, max : 50
		},
		"client_folder" : {
			type : dataTypes.STRING, allowNull : true, max : 50
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
		"last_sync_date" : {
			type : dataTypes.DATE, allowNull : true
		},
		"billing_address" : {
			type : dataTypes.STRING, allowNull : true, max : 250
		},
		"billing_address2" : {
			type : dataTypes.STRING, allowNull : true, max : 250
		},
		"billing_city" : {
			type : dataTypes.STRING, allowNull : true, max : 250
		},
		"billing_state_id" : {
			type : dataTypes.INTEGER, allowNull : true
		},
		"card_holder_name" : {
			type : dataTypes.STRING, allowNull : true, max : 250
		},
		"credit_card_expiration" : {
			type : dataTypes.STRING, allowNull : true, max : 50
		},
		"credit_card_number" : {
			type : dataTypes.STRING, allowNull : true, max : 250
		},
		"mile_rate" : {
			type : dataTypes.FLOAT, allowNull : false, max : 1179650
		},
		"subscription_id" : {
			type : dataTypes.INTEGER, allowNull : true
		},
		"with_setup_fee" : {
			type : dataTypes.STRING, allowNull : true, max : 50
		},
		"state_id" : {
			type : dataTypes.INTEGER, allowNull : false
		},
		"country_id" : {
			type : dataTypes.INTEGER, allowNull : false
		},
		"accounting_system_type_id" : {
			type : dataTypes.INTEGER, allowNull : false
		},
	},{
		instanceMethods : {
		// place your custom model methods below.
		}
	});
}