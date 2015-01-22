# TW5-TeXZilla

TiddlyWiki5 plugin for parsing LaTeX into MathML, using the TeXZilla javascript parser. Based on the official KaTeX plugin. In contrast to KaTeX, TeXZilla supports a larger set of LaTeX commands (similar to itex2MML). 

As in the KaTeX plugin, this plugin adds a latex widget responsible for storing LaTeX and rendering it to MathML, as well as an extension to the wikiText markup to comprehend both $$...$$ and \\[...\\] delimiters as respectively signifying inline or display latex. 

This plugin is experimental, though I believe it conforms to the TiddlyWiki plugin standard. On the other hand, the plugin is only useful for situations where the browser can interpret MathML (i.e. Firefox), and this is at odds with the TiddlyWiki goal of portability. One can presumably get around this by running the MathJax plugin to convert MathML to HTML+CSS.