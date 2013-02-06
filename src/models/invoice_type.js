/**
 * Invoice Type model.
 *
 * Auto-generated by modelGenerator.
 *
 * @author Nicolas Iglesias <nicolas@clevertech.biz>
 */
module.exports = function(seq, dataTypes) {
	return seq.define("invoice_type", {
		"id" : {
			type : dataTypes.INTEGER, allowNull : false, primaryKey : true, autoIncrement : true
		},
		"invoice_type_name" : {
			type : dataTypes.STRING, allowNull : true, max : 100
		},
		"invoice_type_code" : {
			type : dataTypes.STRING, allowNull : true, max : 50
		},
	},{
		instanceMethods : {
		// place your custom model methods below.
		}
	});
}