#!/usr/bin/python
import json
import os

inkscape = "inkscape"

f = open('../comm/news.txt', 'r')
arr = f.read().split("\n>")
arr.pop(0)
f.close()

texFile = open('annotations.tex', "w")

texFile.write("\\documentclass[10pt]{article}\n")
texFile.write("\\usepackage[a4paper]{geometry}\n")
texFile.write("\\usepackage[final]{pdfpages}\n")
texFile.write("\\usepackage{graphicx}\n")
texFile.write("\\begin{document}\n")
texFile.write("\\unitlength1cm\n")

for i in range(len(arr)):
    paths = json.loads(arr[i])
    f = open("file" + str(i) + ".svg", "w")
    f.write( '<svg height="600" version="1.1" width="800" xmlns="http://www.w3.org/2000/svg" style="overflow: hidden; position: relative; -webkit-user-select: text; ">' )

    for path in paths:
        f.write( '<path style="stroke-opacity: ' + str(path['stroke-opacity']) + '; stroke-linecap: ' + path['stroke-linecap'] + '; stroke-linejoin: ' + path['stroke-linejoin'] + '; " fill="' + path['fill'] + '" stroke="' + path['stroke'] + '" d="' + path['path'] + '" stroke-opacity="' + str(path['stroke-opacity']) + '" stroke-width="' + str(path['stroke-width']) + '" stroke-linecap="' + path['stroke-linecap'] + '" stroke-linejoin="' + path['stroke-linejoin'] + '" transform="matrix(1,0,0,1,0,0)"></path>' )
    
    f.write( "</svg>" )
    f.close()
    
    os.system(inkscape +  " file" + str(i) + ".svg -z -A file" + str(i) + ".pdf ; rm file" + str(i) + ".svg")
    
    texFile.write("\\begin{picture}(20,20)\n")
    texFile.write("\\put(0,0){\\includegraphics[width=10cm,page=" + str(i+1) + "]{slides.pdf}}\n")
    texFile.write("\\put(0,0){\\includegraphics[width=10cm]{file" + str(i) + ".pdf}}\n")
    texFile.write("\\end{picture}\n")

texFile.write("\\end{document}")
texFile.close()


os.system("pdflatex annotations.tex")

for i in range(len(arr)):
    os.system("rm file" + str(i) + ".pdf")
    
