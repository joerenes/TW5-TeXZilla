/*\
title: $:/plugins/joerenes/TW5-TexZilla/latex-parser.js
type: application/javascript
module-type: wikirule

Wiki text rule for LaTeX, both inline and display. For example:

```
	$$latex-goes-here$$   	inline
	\[more-latex\]			display
```

This wikiparser can be modified using the rules eg:

```
\rules except latex-parser 
\rules only latex-parser 
```

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";
//var displayopen = '\\\[',
//	displayclose = '\\\]',
//    inlinestring = '\$\$';

exports.name = "latex-parser";
exports.types = {inline: true}; // this is confusing; but this inline is setting the form of this wikitext parser.

exports.init = function(parser) {
	this.parser = parser;
	// Regexp to match
	this.matchRegExp = /\\\[|\$\$|\\begin{math}|\\begin{equation}|\\begin{displaymath}|\\begin{equation\*}/mg; // just escape regexp... new RegExp(displayopen + '|' + inlinestring,'mg'); 
};

// Regular expressions contain special (meta) characters, and as such it is
// dangerous to blindly pass an argument in the find function above without
// pre-processing it to escape those characters. This is covered in the Mozilla
// Developer Network's JavaScript Guide on Regular Expressions, where they
// present the following utility function:
function escapeRegExp(string) {
	return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

exports.parse = function() {
	// figure out which delimiter we're dealing with. the result of the first regex from init is stored in this.match
	var openmatch = this.match[0],
		displaystyle,
		reEnd;

    var environment = ['equation', 'displaymath', 'equation*'];

	if(openmatch == '\$\$') {
		displaystyle = "inline";
		reEnd = /\$\$/mg;
	} else if(openmatch == '\\begin{math}') {
		displaystyle = "inline";
		reEnd = /\\end{math}/mg;
    } else if(openmatch == '\\\[') {
		displaystyle = "block";
		reEnd = /\\\]/mg;
	} else {
        for(var i = 0; i < environment.length; i++) {
            if(openmatch == '\\begin{' + environment[i] + '}') {
                displaystyle = "block";
                reEnd = new RegExp(escapeRegExp('\\end{' + environment[i] + '}'), 'mg');
                break;
            }
        }
    }

	// Move past the match
	this.parser.pos = this.matchRegExp.lastIndex;
	// Look for the end marker
	reEnd.lastIndex = this.parser.pos;
	var match = reEnd.exec(this.parser.source),
		text;
	// Process the text
	if(match) {
		text = this.parser.source.substring(this.parser.pos,match.index);
		this.parser.pos = match.index + match[0].length;
	} else {
		text = this.parser.source.substr(this.parser.pos);
		this.parser.pos = this.parser.sourceLength;
	}
	return [{
		type: "latex",
		attributes: {
			text: {
				type: "text",
				value: text
			},
			style: {
				type: "text",
				value: displaystyle
			}
		}
	}];
};

})();
