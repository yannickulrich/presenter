# LaTeX API for the presenter

## Main file
1. Copy the `presenter.tex` file in your LaTeX directory
2. Use `\include{presenter}`
3. Right after the begin-document command, use `\presenterBegin`
4. Use `\mframe` and only `\mframe` for your slides. Otherwise you'll get errors!
5. Before the end-document command, use `\presenterEnd`

## Functions
* `\mframe{TITLE}{SUBTITLE}{CONTENT}{NOTES}`
