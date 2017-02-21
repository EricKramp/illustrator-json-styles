# Illustrator JSON Styles

v 0.2

by Eric Kramp

## Overview

The goal of these scripts are to provide versionable, user controlled syncing of colors & styles between Illustrator files as an alternative to the blackbox syncing provided by Cloud Libraries. 

The initial release only has the functionality of syncing "Spot" colors in RGB format. There are 2 scripts: Load Swatches & Save Swatches, and they do what you'd expect. You can keep these scripts wherever you prefer, I recommend associating the ".jsx" file extension with Adobe Illustrator that way simply double-clicking the script file will launch loading/saving with the currently open file.

At the moment creating a new JSON is not supported, so you'll need to provide an empty text file for starters. You can copy & rename the file "sample-color.json" included in this repository as a good starting point.

### Swatch Generator

New in version 0.2, the "swatch-generator.jsx" script will generate rectangles on your current artboard for each Spot color in your palette along with a text label describing the name of the color, the RGB values and the HEX value. The goal is to make generating style guides and other design documentation a little easier.

## Caveats, Warnings & Directions

- "Saving" will ENTIRELY overwrite the contents of the JSON file you select, it doesn't do any merging, so if there are colors you want to keep but are not present in the document you save from they will be lost. 
- "Saving" can't actually create new files yet, so you need to point it at a existing plain text document, any extension should be fine but filename.json is the preferred format.
- "Loading" does not override the existing swatch library in your open document, it will only update the swatches that have matching names to the JSON file. For this reason the names must match exactly for the updating process to work.

## Included

JSON Object 2 by Douglas Crawford
https://github.com/douglascrockford/JSON-js
