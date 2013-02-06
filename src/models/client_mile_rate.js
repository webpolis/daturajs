/**
 * Client Mile Rate model.
 *
 * Auto-generated by modelGenerator.
 *
 * @author Nicolas Iglesias <nicolas@clevertech.biz>
 */
module.exports = function(seq, dataTypes) {
	return seq.define("client_mile_rate", {
		"id" : {
			type : dataTypes.INTEGER, allowNull : false, primaryKey : true, autoIncrement : true
		},
		"mile" : {
			type : dataTypes.FLOAT, allowNull : false, max : 1179650
		},
		"rate" : {
			type : dataTypes.FLOAT, allowNull : false, max : 1179650
		},
		"client_id" : {
			type : dataTypes.INTEGER, allowNull : false
		},
	});
}