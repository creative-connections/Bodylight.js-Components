"use strict";

exports.__esModule = true;
exports.markdownitbtoc = markdownitbtoc;
//'use strict';

/* Markdown-it plugin to generate table of content with numbering like wiki style
*/
var defaultOptions = {
  tocRegexp: /@\[toc\]/im,
  numberingRegexp: /^[0-9]+\./,
  tocTitle: 'Table of Contents',
  tocId: 'toc',
  tocWrapperClass: 'toc',
  tocLevelWrapperClass: 'toc-level',
  anchorIdPrefix: 'h-',
  reverseLink: false
};

function markdownitbtoc(md, _options) {
  // Set default options
  var options = Object.assign({}, defaultOptions, _options); // Global variables

  if (!window.headingInfos) {
    window.headingInfos = [];
    window.headingNumberEnabled = false;
  }

  md.inline.ruler.after('emphasis', 'toc', function (state, silent) {
    if (silent) {
      return false;
    }

    var match = options.tocRegexp.exec(state.src);
    match = !match ? [] : match.filter(function (m) {
      return m;
    });

    if (match.length < 1) {
      return false;
    }

    var token;
    token = state.push('toc_open', 'toc', 1);
    token.markup = match[0];
    token = state.push('toc_body', '', 0);
    token = state.push('toc_close', 'toc', -1); // to continue pasing, Update pos

    state.pos = state.pos + match[0].length;
    return true;
  });
  md.core.ruler.push('init_toc', function (state) {
    // For each rendering, initialize heading count
    var headingCounts = [null, 0, 0, 0, 0, 0, 0]; //let countsEnabled = false;

    headingNumberEnabled = false;
    var tokens = state.tokens; // Parses all heading information to render the TOC

    for (var i = 0; i < tokens.length; i++) {
      if (tokens[i].type === 'heading_open') {
        var tagLevel = parseInt(tokens[i].tag[1], 10);
        var numbering = []; //console.log('init toc tokens[i]',tokens[i]);
        // e.g. # Title {num=3} set the numbering from 3 otherwise default increment
        // # 3. Title

        if (options.numberingRegexp.test(tokens[i + 1].content)) {
          //if (tokens[i].attrs && tokens[i].attrs.length > 0) {
          var customcount1 = options.numberingRegexp.exec(tokens[i + 1].content)[0];
          var customcount = customcount1.slice(0, -1);
          headingCounts[tagLevel] = parseInt(customcount, 10);
          headingNumberEnabled = true;
        } else {
          headingCounts[tagLevel] += 1;
        } //console.log('headingCounts', headingCounts[tagLevel]);
        //console.log('init toc tokens[i]', tokens[i]);
        //console.log('init toc tokens[i+1]',tokens[i+1]);


        for (var j = 1; j < headingCounts.length; j++) {
          if (j <= tagLevel) {
            numbering.push(headingCounts[j]);
          } else {
            headingCounts[j] = 0;
          }
        }

        var hInfo = {
          numbering: numbering,
          customNumber: options.numberingRegexp.test(tokens[i + 1].content),
          content: tokens[i + 1].content.replace(/ *\{[^}]*\} */g, '') //will ignore custom numbering between { }

        };
        headingInfos.push(hInfo);
      }
    }
  });

  md.renderer.rules.toc_open = function (tokens, index) {
    return '<div id="' + options.tocId + '" class="' + options.tocWrapperClass + '">';
  };

  md.renderer.rules.toc_close = function (token, index) {
    return '</div>';
  };

  md.renderer.rules.toc_body = function (tokens, index) {
    var results = [];
    var previousLevel = 0;

    for (var i = 0; i < headingInfos.length; i++) {
      var hInfo = headingInfos[i];
      var levelDiff = hInfo.numbering.length - previousLevel;

      if (levelDiff > 0) {
        for (var _ = 0; _ < levelDiff; _++) {
          results.push('<ul class="' + options.tocLevelWrapperClass + '">');
        }
      } else if (levelDiff < 0) {
        for (var _2 = 0; _2 > levelDiff; _2--) {
          results.push('</ul>');
        }
      }

      var numberingStr = hInfo.numbering.join('.');
      var anchor = options.anchorIdPrefix + numberingStr;
      results.push('<li> <a onclick="document.getElementById(\'' + anchor + '\').scrollIntoView();">' + (headingNumberEnabled && !hInfo.customNumber ? numberingStr + '. ' : '') + hInfo.content + '</a></li>');
      previousLevel = headingInfos[i].numbering.length;
    } // Add the remaining </ul> tags at end of TOC.


    for (var _i = 0; _i < previousLevel; _i++) {
      results.push('</ul>');
    }

    return results.join('');
  };

  md.renderer.rules.heading_open = function (tokens, index) {
    var hInfo = headingInfos.shift();
    var numberingStr = hInfo.numbering.join('.');
    var anchor = options.anchorIdPrefix + numberingStr; //console.log('rendering header', numberingStr, headingNumberEnabled);

    return '<' + tokens[index].tag + '><a id="' + anchor + '">' + (headingNumberEnabled && !hInfo.customNumber ? numberingStr + '. ' : '') + '</a>';
  };
}
//# sourceMappingURL=markdown-it-btoc.js.map
