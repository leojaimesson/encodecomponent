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
	
	/**
	 * @description 
	 * Verifica se um elemento realmente é um objeto.
	 * 
	 * @param {Object} object 
	 * @return {Boolean}
	 */
	function isObject(object) {
		return Object.prototype.toString.call(object) === '[object Object]' || typeof(object) === 'object';
	}

	/**
	 * @description
	 * Recebe uma string e retorna a sua versão em formato encode
	 * 
	 * @param {String} value
	 * @return {String} 
	 */
	function encodeURI(value) {
		return encodeURIComponent(value);
	}

	/**
	 * @description
	 * Converte um sub-objeto em seu respectivo uriComponent
	 * 
	 * @param {String} prefix 
	 * @param {Object} object 
	 * @return {String}
	 */
	function _buildCodeSubObjects(prefix, object) {
		var prefixList = prefix.split(',');
		return Object.keys(object).reduce(function(acc, item) {
			if(isObject(object[item])){
	 			return acc + _buildCodeSubObjects((prefix + ',' + item) , object[item]);
			}
	 		var pre = prefixList.reduce(function(acc , item) {
	 			return acc.length > 0 ? acc + encodeURI(item) + encodeURI(']') + encodeURI('[') : acc + encodeURI(item) + encodeURI('[');
	 		}, '')

			return acc + pre + encodeURI(item) + encodeURI(']') + '=' + encodeURI(object[item]) +'&';
		},'');
	}

	/**
	 * @description
	 * Converte um objeto em um uriComponet
	 * 
	 * @param {Object} object 
	 * @return {String}
	 */
	function _buildCode(object) {
			return Object.keys(object).reduce(function(prev, item){
				if(isObject(object[item])){
					var result = _buildCodeSubObjects(item, object[item]).split('');
					return prev + '&' + result.slice(0, result.length-1).join('');
				}
				return (!prev ? '' : prev + '&') + encodeURI(item) + '=' + encodeURI(object[item]);
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