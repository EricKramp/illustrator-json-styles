// https://gist.github.com/jenmontes/6274784#file-scalestrokepalette-js-L31


// script.name = scaleStrokes.jsx;
// script.description = scales selected objects strokes only;
// script.required = one or more selected objects
// script.parent = CarlosCanto // 5/7/12;
// script.elegant = false;
// script.updates = preview ON by default // 5/7/12
#target Illustrator
#targetengine 'main'

var unscale = 0;

var win = new Window("palette", "Scale Strokes");
var pnlScale = win.add("panel");
pnlScale.orientation = "row";
var lblScale = pnlScale.add("statictext", undefined, "Scale");
var editScale = pnlScale.add("edittext", undefined, "100");
editScale.characters = 5;
var lblScale = pnlScale.add("statictext", undefined, "%");

var grpScroll = win.add("group");
var scrlScale = grpScroll.add("scrollbar", undefined, 100, 1, 1000); // 1 min scaling to avoid division by zero
var btnReset = win.add("button", undefined, "Reset");
btnReset.helpTip = "unscale or reset value to 100%"
win.helpTip = "\u00A9 2012 Carlos Canto";

scrlScale.onChange = function() {
  editScale.text = this.value; // update edit box with scroll value
	editScale.notify("onChange") // call the onchange event handler
}

editScale.onChange = function() {
	if (this.text < 1) // if value entered by hand is less than 1, make it 1 to avoid division by zero
	this.text = 1;
	scrlScale.value = this.text; // update edit box with scroll value
	btMsg("scaleStrokes(activeDocument.selection," + editScale.text + ")");
}

// unscale (back to 100%) on reset, except no scaling has applied
btnReset.onClick = function() {
	editScale.text = 100;
	editScale.notify("onChange")
}

// Deal with selection changed, reset values onActivate
var sel, newsel;

win.onDeactivate = function() {
	btMsg('sel = activeDocument.selection')
}

win.onActivate = function() {
	btMsg('newsel = activeDocument.selection')
	if (!isSelEqual(sel, newsel) && editScale.text != 100) {
		editScale.text = scrlScale.value = 100, unscale = 0;
	}
}

win.center();
win.show();

function scaleStrokes(sel, scale) {
	// skip unscaling the first time, there's nothing to unscale
	if (unscale != 0) {
		unscaleStrokes(sel, unscale);
	}
	for (i = 0; i < sel.length; i++) {
		var pgitem = sel[i];
		pgitem.resize(100, 100, undefined, undefined, undefined, undefined, scale, Transformation.CENTER);
	}
	unscale = 10000 / scale;
}

// unscale or bring back selection to 100%
function unscaleStrokes(sel, unscale) {
	for (j = 0; j < sel.length; j++) {
		var pgitem = sel[j];
		pgitem.resize(100, 100, undefined, undefined, undefined, undefined, unscale, Transformation.CENTER);
	}
}

function BridgeTalkErrorHandler(a) {
	alert(a.body + "(" + a.headers["Error-Code"] + ")")
}

// use BridgeTalk to call function, this is needed because the use of "palette" panel
function btMsg(a) {
	var b = new BridgeTalk;
	b.target = "illustrator", b.body = a, b.onError = BridgeTalkErrorHandler, b.send()
}

// check whether selection changed or not
function isSelEqual(a, b) {
	if (!a || !b) return false
	if (a.length != b.length) return false
	for (var i = 0; i < a.length; i++) {
		if (a[i] != b[i]) return false
	}
	return true
}