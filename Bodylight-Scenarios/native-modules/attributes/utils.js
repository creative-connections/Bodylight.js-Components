"use strict";

exports.__esModule = true;
exports.parseHashParamString = parseHashParamString;

/** parseHashParamString
 * returns associative array of {'paramname':'paramvalue'} based on hash string
 * keys are splitted by '&', key-value are splited by '='
 * if not '=' is there the key is index of the paramvalue
 * e.g. '#docs.md&summary=sum.md' returns {'1':'docs.md','summary','sum.md'}
 * @param hash
 * @returns {{}}
 */
function parseHashParamString(hash) {
  //console.log('parseHashParamString',hash);
  var paramsarray = hash.substr(1).split('&'); //gets all params seprated by &

  var params = {}; //go through all params

  for (var i = 0; i < paramsarray.length; i++) {
    //gets param item - name value - if it is separated by = or only value if no '='
    var paramnamevalue = paramsarray[i].split('=', 2);

    if (paramnamevalue.length === 1) {
      //param is in form 'value' - so insert it as numbered param with index i
      params[i] = paramnamevalue[0];
    } else {
      //param is in form 'name=value' - so insert as {name:value}
      params[paramnamevalue[0]] = paramnamevalue[1];
    }
  }

  return params;
}
//# sourceMappingURL=utils.js.map
