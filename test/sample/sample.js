 module.exports = (function() {

	function Sample() {
		this.foo = 123;
		this.bar = 234;
	}

	Sample.staticProp = "abc";

	return Sample;

})();