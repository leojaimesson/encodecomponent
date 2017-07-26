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

	function isArray(array) {
		return Array.isArray(array);
	}

	function isFunction(fn) {
		return typeof(fn) === 'function';
	}

	function normalizeUri(uri) {
		while (uri[uri.length-1] === '&') {
			uri = uri.slice(0, uri.length-1);
		}
		return uri;
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
	 * @param {Object} obj 
	 * @return {String}
	 */
	function _objectToQueryString(obj, name) {
		return isObject(obj) ? encodeURIComponent(normalizeUri(_buildCode(obj, name))) : obj;
	}

	/**
	 * @description
	 * Tranforma a substring em sua versão de objeto
	 * 
	 * @param {Object} obj 
	 * @param {Array} keys 
	 * @param {String} value
	 * @return {Object} 
	 */
	function _deconstructCodeSubUri(obj, keys, value) {
		if(keys.length === 1) {
			obj[keys[0]] = value;
			return obj;
		}
		obj[keys[0]] = _deconstructCodeSubUri(
			{}
			,keys.slice(1, keys.length)
			,value
		);
		return obj;
	}

	/**
	 * @description
	 * Recebe uma string "URI" e retorna a sua versão em objecto
	 * 
	 * @param {String} rawUri
	 * @return {Object} 
	 */
	function _deconstructCode(rawUri) {
		//retiras os caracteres [] e transforma em um array quebrando a string no &
		var uriProcessed = 
						decodeURIComponent(rawUri)
						.replace(/[\[]/ig,',')
						.replace(/[\]]/ig,'')
						.split('&');

		return uriProcessed.reduce(function(acc, item) {
			var keyAndValue = item.split('=');
			var value = keyAndValue[1];
			var keys = keyAndValue[0].split(',');
			if(keys.length === 1){
				acc[keys[0]] = value;
			}
			else{
				acc[keys[0]] = _deconstructCodeSubUri(
					acc[keys[0]] ? acc[keys[0]] : {}
					,keys.slice(1, keys.length)
					,value
				);
			}
			return acc;
		}, {});
	}

	/**
	 * @description
	 * Recebe uma string "URI" e retorna a sua versão de objeto.
	 * 
	 * @param {String} uri 
	 * @return {Object}
	 */
	function _queryStringToObject(uri) {
		return isString(uri) ? _deconstructCode(uri) : uri;
	}

	var uricomponent = {
		encode : function(obj) {
			return _objectToQueryString(obj);
		},
		decode : function(uri) {
			return _queryStringToObject(uri);
		}
	}

	return uricomponent; 
})