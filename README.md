# Presenter

Presenter is a tool for presentations. While the slides are shown on the beamer, you control the presentation via an iPad while seeing your notes and highlight important things on the slides.

## Requirements 
You must have the following programms installed:
 * [Inkscape](http://inkscape.org)
  * On Mac OS X: `/Applications/Inkscape.app/`
 * An image converting tool
  * On Mac OS X: `convert` (preinstalled)
 * [Python 2+](http://python.org)
  * On Mac OS X: `python` (preinstalled)
 * [pdfLaTeX](http://en.wikipedia.org/wiki/PdfTeX) (Only for creating & downloading)
  * On Mac OS X: `/usr/texbin/` 
 * A PHP-Webserver
  * For example [XAMPP](http://www.apachefriends.org/en/xampp.html) (Mac OS X, Linux, Windows)
 * A modern Webbrowser (eg. [Safari 6](http://www.apple.com/safari/), [Firefox](https://www.mozilla.org/firefox))
 * An tablet PC (eg. iPad)

## Usage
### Preperation
 1. Downloading this to your htdocs folder (eg. `/Applications/XAMPP/xamppfiles/htdocs/`)
 2. Configuration
  1. Open [http://localhost/presenter/tools](http://localhost/presenter/tools) or where ever use saved this on your PC
  2. Enter a (secure) password
  3. Upload a PDF (your slides) and a notes.txt (your moderator notes, see [below](#the-latex-interface))
 3. Connect your tablet PC
  1. Get your IP-address (eg `ifconfig`)
  2. Open this IP on your tablet and navigate to the presenter
  3. Enter the predefined password and log in
 4. Connect guests (optional)
  1. Repeat steps 3.1 - 3.2 with every guest

### Presenting
 * To get the next resp. the previous slide, swipe left resp. right or press the button
 * Drawing:
  * Press the pencil button to start drawing freehand.
  * Press the eraser to switch to erasing mode (click on drawings to remove them)
  * Press the button again to return to normal mode
  * Press the free space to size the palm rest, a non-active space.
 * Laser pointer
  * Press the cursor icon to activate the laser pointer

### Settings
This only works an the computer where the localhost is running
 * Access [http://localhost/presenter/tools](http://localhost/presenter/tools) or where ever use saved this
 * You can change your password, upload slides and notes, clear all hand-written annotations and download your annotations

### The LaTeX interface
 * We provide a LaTeX API to easly design your LaTeX beamer presentation.
 * For details see [the LaTeX API](https://github.com/yannickulrich/presenter/blob/master/latex/README.md)


## Internals

The Notes have to be seperated by "\n> ".
