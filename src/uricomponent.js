;(function(root, factory) {
	'use strict'

	if (typeof define === 'function' && define.amd) {
    	define('uricomponent', factory)
  	} 	
	else if (typeof exports === 'object') {
    	exports = module.exports = factory()
  	} 
  	else {
    	root.uricomponent = factory()
  	}

})(this, function(){
	'use strict'

	/**
	 * @description
	 * Verifica se um elemento realmente é uma string
	 * 
	 * @param {String} str 
	 * @return {Boolean}
	 */
	function isString(str) {
		return typeof(str) === 'string';
	}
	
	/**
	 * @description 
	 * Verifica se um elemento realmente é um objeto.
	 * 
	 * @param {Object} obj 
	 * @return {Boolean}
	 */
	function isObject(obj) {
		return typeof(obj) === 'object';
	}

	/**
	 * @description
	 * Verifica se um elemento realmente é um array.
	 * 
	 * @param {Array} array 
	 * @return {Boolean}
	 */
	function isArray(array) {
		return Array.isArray(array);
	}

	/**
	 * @description
	 * Verifica se um elemento é uma function.
	 * 
	 * @param {Function} fn
	 * @return {Boolean} 
	 */
	function isFunction(fn) {
		return typeof(fn) === 'function';
	}

	/**
	 * @description
	 * Retira o excesso de caracteres '&' do final da string.
	 * 
	 * @param {String} uri
	 * @return {String} 
	 */
	function normalizeUri(uri) {
		while (uri[uri.length-1] === '&') {
			uri = uri.slice(0, uri.length-1);
		}
		return uri;
	}

	/**
	 * @description
	 * Converte um array em sua respectiva string de parâmetro de URI codificada.
	 * 
	 * @param {Array} array 
	 * @param {String} key
	 * @return {String} 
	 */
	function _buildCodeArray(array,key) {
		var acc = '';
		for(var i = 0; i < array.length; i++) {
			if(!isFunction(array[i])) {
				if(isArray(array[i])){
					acc += _buildCodeArray(array[i], key + '['+ i +']');
				}
				else if(isObject(array[i])){
					acc +=  normalizeUri(_buildCodeSubObjects( key + '['+ i +']', array[i])) + '&' ;
				}
				else {
					acc += key + '[]=' + array[i] + '&';
				}	
			}
		}
		return acc;
	}

	/**
	 * @description
	 * Converte um sub-objeto em sua respectiva string de parâmetro de URI codificada.
	 * 
	 * @param {String} prefix 
	 * @param {Object} obj 
	 * @return {String}
	 */
	function _buildCodeSubObjects(prefix, obj) {
		var prefixList = prefix.split(',');
		return Object.keys(obj).reduce(function(acc, item) {
			if(isFunction(obj[item])) {
				return acc;
			}
			if(isArray(obj[item])) {
				return acc + _buildCodeArray(obj[item], prefix + '[' + item + ']');
			}
			if(isObject(obj[item])){
				return acc + normalizeUri(_buildCodeSubObjects((prefix + '[' + item + ']') ,obj[item])) + '&'
			}
			var pre = prefixList.reduce(function(acc , item) {
				if(acc.length > 0){
					return acc + item + '][';
				}
				return acc + item + '[';
			}, '');
			return acc + pre + item + ']=' + obj[item] + '&';
		},'');
	}

	/**
	 * @description
	 * Converte um objeto em uma string de parâmetro de URI codificada.
	 * 
	 * @param {Object} obj 
	 * @return {String}
	 */
	function _buildCode(obj, name) {
		if(isArray(obj)) {
			return _buildCodeArray(obj, name)
		}
		return Object.keys(obj).reduce(function(acc, item){
			if(isFunction(obj[item])) {
				return acc;
			}
			if(isArray(obj[item])) {
				return acc +  _buildCodeArray(obj[item], item);
			}
			if(isObject(obj[item])){
					return  acc + normalizeUri(_buildCodeSubObjects(item ,obj[item])) + '&';
			}
			return acc + item + '=' + obj[item] + '&';
		}, '');
	}
	
	/**
	 * @description
	 * Recebe um objeto e retorna uma string de parâmetro de URI codificada.
	 * 
	 * @param {Object} component 
	 * @return {String}
	 */
	function _objectToQueryString(component, name) {
		return isObject(component) || isArray(component) ? encodeURIComponent(normalizeUri(_buildCode(component, name))).replace(/%3D/ig, '=').replace(/%26/ig, '&') : component;
	}

	

	function uricomponent(component, name){
		return _objectToQueryString(component, name);
	}
		

	return uricomponent; 
})