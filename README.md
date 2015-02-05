# TW5-TeXZilla

TiddlyWiki5 plugin for parsing LaTeX into MathML, using the [TeXZilla](https://github.com/fred-wang/TeXZilla) javascript parser. Based on the official [KaTeX plugin](http://tiddlywiki.com/plugins/tiddlywiki/katex/). In contrast to [KaTeX](https://github.com/Khan/KaTeX), TeXZilla supports a larger set of LaTeX commands (similar to [itex2MML](https://golem.ph.utexas.edu/~distler/blog/itex2MML.html)). 

See http://tw5-texzilla.tiddlyspot.com for a demo wiki.

Usage: LaTeX commands can be used in wikiText by surrounding them with $$...$$ for inline mode or \\[...\\] for display mode. Parsing errors encountered by TeXZilla will show up as red-colored latex commands.

Additionally, macros may be specified in the tiddler "LaTeX Macros". These should be formatted one macro 
per line, as (macro name) tab (number of arguments) tab (LaTeX replacement rule). The arguments in the latter should be specified, as usual, by #1, #2, etc. Macros can be defined in terms of other macros appearing earlier in the tiddler.

As in the KaTeX plugin, this plugin adds a latex widget responsible for storing LaTeX and rendering it to MathML, as well as an extension to the wikiText markup to comprehend both $$...$$ and \\[...\\] delimiters as respectively signifying inline or display latex. 

This plugin is experimental, though I believe it conforms to the TiddlyWiki plugin standard. On the other hand, the plugin is only useful for situations where the browser can interpret MathML (i.e. Firefox), and this is at odds with the TiddlyWiki goal of portability. One can presumably get around this by running the MathJax plugin to convert MathML to HTML+CSS.