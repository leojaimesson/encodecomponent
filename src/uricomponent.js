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
	 * Recebe uma string e retorna a sua versão em um parâmetro de URI
	 * 
	 * @param {String} value
	 * @return {String} 
	 */
	function encodeURI(value) {
		return encodeURIComponent(value);
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
			if(isObject(obj[item])){
				 return acc 
						+ _buildCodeSubObjects(
												(prefix + ',' + item) 
												,obj[item]
											);
			}
	 		var pre = prefixList.reduce(function(acc , item) {
				 return (acc.length > 0) 
						? (acc 
							+ encodeURI(item) 
							+ encodeURI(']') 
							+ encodeURI('[') 
						) 
						: (acc 
							+ encodeURI(item) 
							+ encodeURI('[')
						);
	 		}, '');

			return acc 
					+ pre 
					+ encodeURI(item) 
					+ encodeURI(']') 
					+ '=' 
					+ encodeURI(obj[item]) 
					+'&';
		},'');
	}

	/**
	 * @description
	 * Converte um objeto em uma string de parâmetro de URI codificada.
	 * 
	 * @param {Object} obj 
	 * @return {String}
	 */
	function _buildCode(obj) {
			return Object.keys(obj).reduce(function(acc, item){
				if(isObject(obj[item])){
					var result = _buildCodeSubObjects(
														item
														,obj[item]
													).split('');
					return acc 
							+ '&' 
							+ result.slice(0, result.length-1)
									.join('');
				}
				return (!acc 
						? '' 
						: acc + '&') 
						+ encodeURI(item) 
						+ '=' 
						+ encodeURI(obj[item]);
			}, '');
		}
	
	/**
	 * @description
	 * Recebe um objeto e retorna uma string de parâmetro de URI codificada.
	 * 
	 * @param {Object} obj 
	 * @return {String}
	 */
	function _objectToQueryString(obj) {
		return isObject(obj) 
				? _buildCode(obj) 
				: obj;
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
		var uriProcessed = decodeURIComponent(rawUri)
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
		return isString(uri) 
				? _deconstructCode(uri) 
				: uri;
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