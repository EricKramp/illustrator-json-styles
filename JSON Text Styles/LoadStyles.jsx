//----------- JSON Object -----------------
"object"!=typeof JSON&&(JSON={}),function(){"use strict";function f(a){return 10>a?"0"+a:a}function this_value(){return this.valueOf()}function quote(a){return rx_escapable.lastIndex=0,rx_escapable.test(a)?'"'+a.replace(rx_escapable,function(a){var b=meta[a];return"string"==typeof b?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(a,b){var c,d,e,f,h,g=gap,i=b[a];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(a)),"function"==typeof rep&&(i=rep.call(b,a,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";if(gap+=indent,h=[],"[object Array]"===Object.prototype.toString.apply(i)){for(f=i.length,c=0;f>c;c+=1)h[c]=str(c,i)||"null";return e=0===h.length?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]",gap=g,e}if(rep&&"object"==typeof rep)for(f=rep.length,c=0;f>c;c+=1)"string"==typeof rep[c]&&(d=rep[c],e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));else for(d in i)Object.prototype.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));return e=0===h.length?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}",gap=g,e}}var rx_one=/^[\],:{}\s]*$/,rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rx_four=/(?:^|:|,)(?:\s*\[)+/g,rx_escapable=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=this_value,Number.prototype.toJSON=this_value,String.prototype.toJSON=this_value);var gap,indent,meta,rep;"function"!=typeof JSON.stringify&&(meta={"\b":"\\b"," ":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(a,b,c){var d;if(gap="",indent="","number"==typeof c)for(d=0;c>d;d+=1)indent+=" ";else"string"==typeof c&&(indent=c);if(rep=b,b&&"function"!=typeof b&&("object"!=typeof b||"number"!=typeof b.length))throw new Error("JSON.stringify");return str("",{"":a})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&"object"==typeof e)for(c in e)Object.prototype.hasOwnProperty.call(e,c)&&(d=walk(e,c),void 0!==d?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;if(text=String(text),rx_dangerous.lastIndex=0,rx_dangerous.test(text)&&(text=text.replace(rx_dangerous,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})),rx_one.test(text.replace(rx_two,"@").replace(rx_three,"]").replace(rx_four,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();

//----------- END JSON Object -----------------

/*
	Array.prototype.[method name] allows you to define/overwrite an objects method
	needle is the item you are searching for
	this is a special variable that refers to "this" instance of an Array.
	returns true if needle is in the array, and false otherwise

	https://css-tricks.com/snippets/javascript/javascript-array-contains/
 */
Array.prototype.contains = function(needle) {
	for (i in this) {
		if (this[i] == needle) return true;
	}
	return false;
}

var docRef = app.activeDocument,
	skippedProperties = "";

function LoadFromJSON() {

	var swatchesFile = File.openDialog("Please select the JSON file containing your text styles");

	if (swatchesFile.exists) {
		swatchesFile.open("r");
		var col = swatchesFile.read();
		var data = eval("(" + col + ")");
		var saveableProperties = [
			"name", // string
			"textFont", // TextFont
			"size", // float
			"autoLeading", //bool
			"leading", // float
			"kerningMethod", // AutoKernType.AUTO
			"capitalization", // FontCapsOption.NORMALCAPS
			"baselinePosition", //	FontBaselineOption.NORMALBASELINE
			"fillColor", // [NoColor]
			"strokeColor" // [NoColor]
		];

		// loop through all the spot "global" swatches in the document
		for (var i = 0; i < docRef.characterStyles.length; i++) {
			var currStyle = docRef.characterStyles[i];

			// loop through all the styles in the json file to see if there are matches
			for (var h = data.styles.length - 1; h >= 0; h--) {
				if (currStyle.name == data.styles[h].name) {
					var jsonStyle = data.styles[h];

					if (currStyle.name != "[Normal Character Style]") {
						for (var property in currStyle) {
							if (jsonStyle.hasOwnProperty(property)) {
								if (saveableProperties.contains(property)) {
									try {
										// alert(currStyle.name + "." + property + ": " + currStyle[property]);
										var newValue = parseProperty(property, jsonStyle[property]);
										if (newValue) {
											currStyle[property] = newValue;
										}
									} catch (error) {
										alert(currStyle.name + "." + property + " error: " + error);
									}
								}
							}
						}

					}
				}
			}
		}

		alert("These properties were skipped because we don't know how to handle them yet: " + skippedProperties);
	} else {
		alert("Couldn't find swatches json file");
	}
}

function parseProperty(property, value) {
	switch (property) {
		case "name":
			return value;
		case "size":
		case "leading":
			return parseFloat(value);
		case "autoLeading":
			return (value === "true");
		case "textFont":
			return null;

		default:
			skippedProperties += ", " + property.toString();
			// alert("unknown property: " + property + " : " + value);
			return null;
	}
}

LoadFromJSON();