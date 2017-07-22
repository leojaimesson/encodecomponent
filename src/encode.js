;(function(root, factory) {
	'use strict'

	if (typeof define === 'function' && define.amd) {
    	define('encode', factory)
  	} 
	else if (typeof exports === 'object') {
    	exports = module.exports = factory()
  	} 
  	else {
    	root.encode = factory()
  	}

})(this, function(){
	'use strict'
 
	function isObject(object) {
		return Object.prototype.toString.call(object) === '[object Object]' || typeof(object) === 'object';
	}

	function encodeURL(value) {
		return encodeURIComponent(value);
	}

	function _buildCodeSubObjects(prefix, object) {
		var prefixList = prefix.split(',');
		return Object.keys(object).reduce(function(acc, item) {
			if(isObject(object[item])){
	 			return acc + _buildCodeSubObjects((prefix + ',' + item) , object[item]);
			}
	 		var pre = prefixList.reduce(function(acc , item) {
	 			return acc.length > 0 ? acc + encodeURL(item) + encodeURL(']') + encodeURL('[') : acc + encodeURL(item) + encodeURL('[');
	 		}, '')

			return acc + pre + encodeURL(item) + encodeURL(']') + '=' + encodeURL(object[item]) +'&';
		},'');
	}

	function _buildCode(object) {
			return Object.keys(object).reduce(function(prev, item){
				if(isObject(object[item])){
					var result = _buildCodeSubObjects(item, object[item]).split('');
					return prev + '&' + result.slice(0, result.length-1).join('');
				}
				return (!prev ? '' : prev + '&') + encodeURL(item) + '=' + encodeURL(object[item]);
			}, '');
		}

	function _objectToQueryString(object) {
		return isObject(object) ? _buildCode(object) : object;
	}

	function encode(obj) {
		return _objectToQueryString(obj);
	}

	return encode; 
})