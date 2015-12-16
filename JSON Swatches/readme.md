# Illustrator JSON Styles
v 0.1
Eric Kramp

## Overview

The goal of these scripts are to provide versionable, user controlled syncing of colors & styles between Illustrator files as an alternative to the blackbox syncing provided by Cloud Libraries. 

The initial release (v0.1) only has the functionality of syncing "Spot" colors in RGB format. There are 2 scripts: Load Swatches & Save Swatches, and they do what you'd expect. You can keep these scripts whereever you prefer, I recommend associating the ".jsx" file extension with Adobe Illustrator that way simply double-clicking the script file will launch loading/saving with the currently open file.

At the moment creating a new JSON is not supported, so you'll need to provide an empty text file for starters. You can copy & rename the file "sample-color.json" included in this repository as a good starting point.

## Caveats & Warnings

- "Saving" will ENTIRELY overwrite the contents of the JSON file you select, it doesn't do any merging, so if there are colors you want to keep but are not present in the document you save from they will be lost. 
- "Loading" does not override the existing swatch library in your open document, it will only update the swatches that have matching names to the JSON file. For this reason the names must match exactly for the updating process to work.

## Included

JSON Object 2 by Douglas Crawford
https://github.com/douglascrockford/JSON-js
