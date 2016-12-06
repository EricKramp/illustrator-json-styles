var docRef = app.activeDocument;

function LoadSwatchesFromJSON () {
	
	var swatchesFile = File.openDialog ("Please select the JSON file containing your swatches");

	if (swatchesFile.exists) {
		swatchesFile.open("r");
		var col = swatchesFile.read();
	    var data = eval("(" + col + ")");

			// loop through all the colors in the json file 
		for (var h = data.colors.length - 1; h >= 0; h--) {
			var foundMatch = false;
			
	    // loop through all the spot "global" swatches in the document
			for (var i = 0; i < docRef.spots.length; i++) {
			    var currSwatch = docRef.spots[i];

			    if (currSwatch.name == data.colors[h].name) {
			        currSwatch.color = CreateColor(data.colors[h]);
			        foundMatch = true;
			    }
			}
		    
		    // if (!foundMatch)
		}
	} else {
		alert("Couldn't find swatches json file");
	}
}

function CreateColor (jsonColor) {
	var newColor = new RGBColor();

	newColor.red = jsonColor.red;
	newColor.green = jsonColor.green;
	newColor.blue = jsonColor.blue;

	return newColor;    
}

LoadSwatchesFromJSON();