//'use strict';
/* Markdown-it plugin to generate table of content with numbering like wiki style
*/

let defaultOptions = {
  tocRegexp: /@\[toc\]/im,
  numberingRegexp: /^[0-9]+\./,
  tocTitle: 'Table of Contents',
  tocId: 'toc',
  tocWrapperClass: 'toc',
  tocLevelWrapperClass: 'toc-level',
  anchorIdPrefix: 'h-',
  reverseLink: false
};

export function markdownitbtoc(md, _options) {
  // Set default options
  let options = Object.assign({}, defaultOptions, _options);

  // Global variables
  if (!window.headingInfos) {
    window.headingInfos = [];
    window.headingNumberEnabled = false;
  }

  md.inline.ruler.after('emphasis', 'toc', function(state, silent) {
    if (silent) {
      return false;
    }
    let match = options.tocRegexp.exec(state.src);
    match = !match ? [] : match.filter(function(m) {
      return m;
    });
    if (match.length < 1) {
      return false;
    }

    let token;

    token = state.push('toc_open', 'toc', 1);
    token.markup = match[0];
    token = state.push('toc_body', '', 0);
    token = state.push('toc_close', 'toc', -1);

    // to continue pasing, Update pos
    state.pos = state.pos + match[0].length;
    return true;
  });

  md.core.ruler.push('init_toc', function(state) {
    // For each rendering, initialize heading count
    let headingCounts = [null, 0, 0, 0, 0, 0, 0];
    //let countsEnabled = false;
    headingNumberEnabled = false;
    let tokens = state.tokens;

    // Parses all heading information to render the TOC
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type === 'heading_open') {
        let tagLevel = parseInt(tokens[i].tag[1], 10);
        let numbering = [];
        //console.log('init toc tokens[i]',tokens[i]);
        // e.g. # Title {num=3} set the numbering from 3 otherwise default increment
        // # 3. Title
        if (options.numberingRegexp.test(tokens[i + 1].content)) {
        //if (tokens[i].attrs && tokens[i].attrs.length > 0) {
          let customcount1 = options.numberingRegexp.exec(tokens[i + 1].content)[0];
          let customcount = customcount1.slice(0, -1);
          headingCounts[tagLevel] = parseInt(customcount, 10);
          headingNumberEnabled = true;
        } else {
          headingCounts[tagLevel] += 1;
        }
        //console.log('headingCounts', headingCounts[tagLevel]);
        //console.log('init toc tokens[i]', tokens[i]);
        //console.log('init toc tokens[i+1]',tokens[i+1]);

        for (let j = 1; j < headingCounts.length; j++) {
          if (j <= tagLevel) {
            numbering.push(headingCounts[j]);
          } else {
            headingCounts[j] = 0;
          }
        }

        let hInfo = {
          numbering: numbering,
          customNumber: options.numberingRegexp.test(tokens[i + 1].content),
          content: tokens[i + 1].content.replace(/ *\{[^}]*\} */g, '') //will ignore custom numbering between { }
        };

        headingInfos.push(hInfo);
      }
    }
  });

  md.renderer.rules.toc_open = function(tokens, index) {
    return '<div id="' + options.tocId + '" class="' + options.tocWrapperClass + '">';
  };

  md.renderer.rules.toc_close = function(token, index) {
    return '</div>';
  };

  md.renderer.rules.toc_body = function(tokens, index) {
    let results = [];
    let previousLevel = 0;

    for (let i = 0; i < headingInfos.length; i++) {
      let hInfo = headingInfos[i];
      let levelDiff = hInfo.numbering.length - previousLevel;

      if (levelDiff > 0) {
        for (let _ = 0; _ < levelDiff; _++) {
          results.push('<ul class="' + options.tocLevelWrapperClass + '">');
        }
      } else if (levelDiff < 0) {
        for (let _ = 0; _ > levelDiff; _--) {
          results.push('</ul>');
        }
      }

      let numberingStr = hInfo.numbering.join('.');
      let anchor = options.anchorIdPrefix + numberingStr;

      results.push('<li> <a onclick="document.getElementById(\'' +
          anchor + '\').scrollIntoView();">' +
          ((headingNumberEnabled && !hInfo.customNumber) ? numberingStr + '. ' : '' ) +
          hInfo.content + '</a></li>');

      previousLevel = headingInfos[i].numbering.length;
    }

    // Add the remaining </ul> tags at end of TOC.
    for (let i = 0; i < previousLevel; i++) {
      results.push('</ul>');
    }

    return results.join('');
  };

  md.renderer.rules.heading_open = function(tokens, index) {
    let hInfo = headingInfos.shift();
    let numberingStr = hInfo.numbering.join('.');
    let anchor = options.anchorIdPrefix + numberingStr;
    //console.log('rendering header', numberingStr, headingNumberEnabled);
    return '<' + tokens[index].tag + '><a id="' + anchor + '">' + ((headingNumberEnabled && !hInfo.customNumber) ? numberingStr + '. ' : '' ) + '</a>';
  };
}
