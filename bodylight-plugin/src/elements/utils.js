/** parseHashParamString
 * returns associative array of {'paramname':'paramvalue'} based on hash string
 * keys are splitted by '&', key-value are splited by '='
 * if not '=' is there the key is index of the paramvalue
 * e.g. '#doc.md&summary=sum.md' returns {'1':'doc.md','summary','sum.md'}
 * @param hash
 * @returns {{}}
 */
export function parseHashParamString(hash) {
  //console.log('parseHashParamString',hash);
  let paramsarray = hash.substr(1).split('&');
  let params = {};
  for (let i = 0; i < paramsarray.length; i++) {
    let paramnamevalue = paramsarray[i].split('=', 2);
    if (paramnamevalue.length === 1) {params[i] = paramnamevalue[0];} else {params[paramnamevalue[0]] = paramnamevalue[1];}
  }
  return params;
}
