
escapeRegExp = function(string) {
	return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
};


// force use of #1, #2, etc. in newcommand definitions, which I think is the standard 
// (though I believe it is possible to use a single # for a one-argument command)

// then, we can input the data to be mapped through the template as an array, rather than an object 
// with keyword/definition pairs. perhaps this is faster. Here, the template itself is just \langle #1 | #2 \rangle

maplatextemplate = function(template, data) {
	return template.replace(/#(\d)/g, function(match, p1) {
		return data[p1-1];
	})
};

latexmacro2regex = function(macroname, numargs) { // macroname is the string  '\ket'
	return new RegExp(escapeRegExp(macroname) + Array(numargs+1).join('{(.*?)}'), 'g');
};

// the regexp searcher is going to need to know how many arguments to look for, since in latex it's always
// permissible to enclose commands in {}, i.e. \frac{a}{b}{c} is the same as \frac{a}{b}c. 
// note that here we are doing a simple parse which looks for arguments explicitly bounded by {};
// even though latex itself recognizes \frac ab as \frac{a}{b}, we will only accept the latter.  

// follow padawanphysicist's convention of separating by tab.

// going in "reverse" error has the advantage that macros can be defined in terms of macros 
// appearing previously on the list

exports.expandLaTeXmacros = function(wtext,macrolist) { // returns text with latex macros expanded
	for (var i = macrolist.length - 1; i >= 0; i--) { 
		var macroarray = macrolist[i].split('\t');
		var searchRe = latexmacro2regex(macroarray[0],parseInt(macroarray[1]));
		function replacer(match) {
			var data = Array.prototype.slice.call(arguments, 1,-2);
			return maplatextemplate(macroarray[2],data);
		}
		wtext = wtext.replace(searchRe,replacer);
	};
	return wtext;
};



//var text = "\\ket{a}+\\tr[A]+\\braket{x}{y}+\\ketbra{j}{k}";
//var macrolist = ["\\tr\t0\t\\text{Tr}","\\ket\t1\t|#1\\rangle","\\bra\t1\t\\langle #1 |","\\braket\t2\t\\langle #1 | #2 \\rangle","\\ketbra\t2\t\\ket{#1}\\bra{#2}"];
//console.log(exports.expandLaTeXmacros(text,macrolist))