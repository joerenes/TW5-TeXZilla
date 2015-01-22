/*\
title: $:/plugins/joerenes/TW5-TexZilla/latex-parser-block.js
type: application/javascript
module-type: wikirule

Wiki text block rule for LaTeX. For example:

```
	$$latex-goes-here$$
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

exports.name = "latex-parser-block";
exports.types = {inline: true}; // this is confusing; but this inline is setting the form of this wikitext parser.

exports.init = function(parser) {
	this.parser = parser;
	// Regexp to match
	this.matchRegExp = /\\\[/mg;
};

exports.parse = function() {
	// Move past the match
	this.parser.pos = this.matchRegExp.lastIndex;
	var reEnd = /\\\]/mg;
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
				value: "block"
			}
		}
	}];
};

})();
