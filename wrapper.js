/*\
title: $:/plugins/joerenes/TW5-TeXZilla/wrapper.js
type: application/javascript
module-type: widget

Wrapper for `TeXZilla-min.js` that provides a `<$latex>` widget.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var texzilla = require("$:/plugins/joerenes/TW5-TeXZilla/TeXZilla-min.js"),
	macroparser = require("$:/plugins/joerenes/TW5-TeXZilla/macro-parser.js"),
	//Wiki = require("$:/core/modules/wiki.js"),
	Widget = require("$:/core/modules/widgets/widget.js").widget;

var LaTeXWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Load macros from LaTeX Macros tiddler
*/
//var blah = $tw.wiki.getTiddlerText("Nonexist");
// this doesn't seem to notice changes to the tiddler.
// also, we aren't doing any error-handling...

/*
Inherit from the base widget class
*/
LaTeXWidget.prototype = new Widget();

/*
Render this widget into the DOM
*/
LaTeXWidget.prototype.render = function(parent,nextSibling) {
	// Housekeeping
	this.parentDomNode = parent;
	this.computeAttributes();
	this.execute();
	// Get the source text and figure out the displaystyle
	var text = this.getAttribute("text",this.parseTreeNode.text || "");
	var style = this.getAttribute("style",this.parseTreeNode.text || "");
	var blockflag = (style == "block") ? true:false;
	// expand macros, after loading them, if they are present
	var macrocont = $tw.wiki.getTiddlerText("LaTeX Macros");
	if (typeof macrocont === "undefined") {
		; // no macros
	} else {
		text = macroparser.expandLaTeXmacros(text,macrocont.toString().split('\n'));
	}
	// Render it into MathML 
	var elemnt = this.document.createElement("span"); 
	try {
		if($tw.browser) {
			// false means inline, true would be display / block
			var elemnt = texzilla.toMathML(text,blockflag,false,true);
		} else {
			elemnt.innerHTML = texzilla.toMathMLString(text,blockflag,false,true);
		}
	} catch(ex) {
		elemnt.className = "tc-error";
		elemnt.textContent = text;
	}
	// Insert it into the DOM
	parent.insertBefore(elemnt,nextSibling);
	this.domNodes.push(elemnt);
};

/*
Compute the internal state of the widget
*/
LaTeXWidget.prototype.execute = function() {
	// Nothing to do for a LaTeX widget
};

/*
Selectively refreshes the widget if needed. Returns true if the widget or any of its children needed re-rendering
*/
LaTeXWidget.prototype.refresh = function(changedTiddlers) {
	var changedAttributes = this.computeAttributes();
	if(changedAttributes.text) {
		this.refreshSelf();
		return true;
	} else {
		return false;	
	}
};

exports.latex = LaTeXWidget;


})();

