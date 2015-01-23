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
	this.matchRegExp = /\\\[|\$\$/mg; // just escape regexp... new RegExp(displayopen + '|' + inlinestring,'mg'); 
};

exports.parse = function() {
	// figure out which delimiter we're dealing with. the result of the first regex from init is stored in this.match
	var openmatch = this.match[0],
		displaystyle,
		reEnd;

	if(openmatch == '\$\$') {
		displaystyle = "inline";
		reEnd = /\$\$/mg;
	} else {
		displaystyle = "block";
		reEnd = /\\\]/mg;
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
