# 
# minify command is a go program available on GitHub: 
# https://github.com/tdewolff/minify/tree/master/cmd/minify
#

fresh: clean sinclair.min.css

sinclair.min.css:
	minify flex-layout.css typography.css sinclair.css > $@

clean:
	rm -f sinclair.min.css
