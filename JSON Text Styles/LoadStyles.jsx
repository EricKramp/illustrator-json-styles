//----------- JSON Object -----------------
"object"!=typeof JSON&&(JSON={}),function(){"use strict";function f(a){return 10>a?"0"+a:a}function this_value(){return this.valueOf()}function quote(a){return rx_escapable.lastIndex=0,rx_escapable.test(a)?'"'+a.replace(rx_escapable,function(a){var b=meta[a];return"string"==typeof b?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(a,b){var c,d,e,f,h,g=gap,i=b[a];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(a)),"function"==typeof rep&&(i=rep.call(b,a,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";if(gap+=indent,h=[],"[object Array]"===Object.prototype.toString.apply(i)){for(f=i.length,c=0;f>c;c+=1)h[c]=str(c,i)||"null";return e=0===h.length?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]",gap=g,e}if(rep&&"object"==typeof rep)for(f=rep.length,c=0;f>c;c+=1)"string"==typeof rep[c]&&(d=rep[c],e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));else for(d in i)Object.prototype.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));return e=0===h.length?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}",gap=g,e}}var rx_one=/^[\],:{}\s]*$/,rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rx_four=/(?:^|:|,)(?:\s*\[)+/g,rx_escapable=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=this_value,Number.prototype.toJSON=this_value,String.prototype.toJSON=this_value);var gap,indent,meta,rep;"function"!=typeof JSON.stringify&&(meta={"\b":"\\b"," ":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(a,b,c){var d;if(gap="",indent="","number"==typeof c)for(d=0;c>d;d+=1)indent+=" ";else"string"==typeof c&&(indent=c);if(rep=b,b&&"function"!=typeof b&&("object"!=typeof b||"number"!=typeof b.length))throw new Error("JSON.stringify");return str("",{"":a})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&"object"==typeof e)for(c in e)Object.prototype.hasOwnProperty.call(e,c)&&(d=walk(e,c),void 0!==d?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;if(text=String(text),rx_dangerous.lastIndex=0,rx_dangerous.test(text)&&(text=text.replace(rx_dangerous,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})),rx_one.test(text.replace(rx_two,"@").replace(rx_three,"]").replace(rx_four,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();

//----------- END JSON Object -----------------

var docRef = app.activeDocument;

function LoadFromJSON () {
	
	var swatchesFile = File.openDialog ("Please select the JSON file containing your text styles");

	if (swatchesFile.exists) {
		swatchesFile.open("r");
		var col = swatchesFile.read();
	    var data = eval("(" + col + ")");
	    // alert (data);

	    // loop through all the spot "global" swatches in the document
		for (var i = 0; i < docRef.characterStyles.length; i++) {
		    var currStyle = docRef.characterStyles[i];
		    // alert(currStyle.characterAttributes);
			
			// loop through all the styles in the json file to see if there are matches
			for (var h = data.styles.length - 1; h >= 0; h--) {
			    if (currStyle.name == data.styles[h].name) {
			    	// alert ("found matching style");
			    	var jsonStyle = data.styles[h],
			    		attr = currStyle.characterAttributes;

			    	// list of character attributes, not sure how to unset them if there is no value specified in the JSON yet
			    	if (jsonStyle.akiLeft) attr.akiLeft = jsonStyle.akiLeft;
			    	if (jsonStyle.akiRight) attr.akiRight = jsonStyle.akiRight;
			    	if (jsonStyle.alignment) attr.alignment = jsonStyle.alignment;
			    	if (jsonStyle.alternateGlyphs) attr.alternateGlyphs = jsonStyle.alternateGlyphs;
			    	if (jsonStyle.autoLeading) attr.autoLeading = jsonStyle.autoLeading;
			    	if (jsonStyle.baselineDirection) attr.baselineDirection = jsonStyle.baselineDirection;
			    	if (jsonStyle.baselinePosition) attr.baselinePosition = jsonStyle.baselinePosition;
			    	if (jsonStyle.baselineShift) attr.baselineShift = jsonStyle.baselineShift;
			    	if (jsonStyle.capitalization) attr.capitalization = jsonStyle.capitalization;
			    	if (jsonStyle.connectionForms) attr.connectionForms = jsonStyle.connectionForms;
			    	if (jsonStyle.contextualLigature) attr.contextualLigature = jsonStyle.contextualLigature;
			    	if (jsonStyle.discretionaryLigature) attr.discretionaryLigature = jsonStyle.discretionaryLigature;
			    	if (jsonStyle.figureStyle) attr.figureStyle = jsonStyle.figureStyle;
			    	if (jsonStyle.fillColor) attr.fillColor = jsonStyle.fillColor;
			    	if (jsonStyle.fractions) attr.fractions = jsonStyle.fractions;
			    	if (jsonStyle.horizontalScale) attr.horizontalScale = jsonStyle.horizontalScale;
			    	if (jsonStyle.italics) attr.italics = jsonStyle.italics;
			    	if (jsonStyle.kerningMethod) attr.kerningMethod = jsonStyle.kerningMethod;
			    	if (jsonStyle.language) attr.language = jsonStyle.language;
			    	if (jsonStyle.leading) attr.leading = jsonStyle.leading;
			    	if (jsonStyle.ligature) attr.ligature = jsonStyle.ligature;
			    	if (jsonStyle.noBreak) attr.noBreak = jsonStyle.noBreak;
			    	if (jsonStyle.openTypePosition) attr.openTypePosition = jsonStyle.openTypePosition;
			    	if (jsonStyle.ordinals) attr.ordinals = jsonStyle.ordinals;
			    	if (jsonStyle.ornaments) attr.ornaments = jsonStyle.ornaments;
			    	if (jsonStyle.overprintFill) attr.overprintFill = jsonStyle.overprintFill;
			    	if (jsonStyle.overprintStroke) attr.overprintStroke = jsonStyle.overprintStroke;
			    	if (jsonStyle.parent) attr.parent = jsonStyle.parent;
			    	if (jsonStyle.proportionalMetrics) attr.proportionalMetrics = jsonStyle.proportionalMetrics;
			    	if (jsonStyle.rotation) attr.rotation = jsonStyle.rotation;
			    	if (jsonStyle.size) attr.size = jsonStyle.size;
			    	if (jsonStyle.strikeThrough) attr.strikeThrough = jsonStyle.strikeThrough;
			    	if (jsonStyle.strokeColor) attr.strokeColor = jsonStyle.strokeColor;
			    	if (jsonStyle.strokeWeight) attr.strokeWeight = jsonStyle.strokeWeight;
			    	if (jsonStyle.stylisticAlternates) attr.stylisticAlternates = jsonStyle.stylisticAlternates;
			    	if (jsonStyle.swash) attr.swash = jsonStyle.swash;
			    	if (jsonStyle.tateChuYokoHorizontal) attr.tateChuYokoHorizontal = jsonStyle.tateChuYokoHorizontal;

			    }
			}
		}
	} else {
		alert("Couldn't find swatches json file");
	}
}

LoadFromJSON();