var rowCounter = 1;
var blocks;



function svg_to_png_data(target) {
  var ctx, mycanvas, svg_data, img, child;

  // Flatten CSS styles into the SVG
  for (i = 0; i < target.childNodes.length; i++) {
    child = target.childNodes[i];
    var cssStyle = window.getComputedStyle(child);
    if(cssStyle){
       child.style.cssText = cssStyle.cssText;
    }
  }

  // Construct an SVG image
  svg_data = '<svg xmlns="http://www.w3.org/2000/svg" width="' + target.offsetWidth +
             '" height="' + target.offsetHeight + '">' + target.innerHTML + '</svg>';
  img = new Image();
  img.src = "data:image/svg+xml," + encodeURIComponent(svg_data);

  // Draw the SVG image to a canvas
  mycanvas = document.createElement('canvas');
  mycanvas.width = target.offsetWidth;
  mycanvas.height = target.offsetHeight;
  ctx = mycanvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  // Return the canvas's data
  return mycanvas.toDataURL("image/png");
}

// Takes an SVG element as target
function svg_to_png_replace(target) {
  var data, img;
  data = svg_to_png_data(target);
  img = new Image();
  img.src = data;
  target.parentNode.replaceChild(img, target);
}

function generateImage() {
	svg_to_png_replace(document.querySelector('svg'));
}

function writeToTextFile(content){
	var downloadMarkdownLink = $("#downloadMarkdown")[0];
    downloadMarkdownLink.download = "inputFromMarkdownCreator.txt"
    var textBlob = new Blob([content], {type: 'text/plain'});
    downloadMarkdownLink.href = window.URL.createObjectURL(textBlob);
    $("#downloadMarkdown").removeClass("hidden");
}

function deleteRow(rowId) {
	var childRow = $("#row_" + rowId);
	childRow.remove();
}

function addNewRow(rowId) {
	var html = '<tr class="dataRows" id="row_' + rowId + '">'
	html += '<td>' + rowId + '</td>'
	html += '<td><select class="form-control" id="blockType_' + rowId + '" name="proofStep"><option value="proofStatement">Proof Statement</option><option value="proofEnd">Proof End</option><option value="proofStep">Proof Step</option></td>'
	html += '<td>' + '<input type="text" class="form-control" id="blockName_' + rowId + '" name="blockName">' + '</td>'
	html += '<td>' + '<input type="text" class="form-control" id="blockText_' + rowId + '" name="blockText">' + '</td>'
	html += '<td>' + '<a href="#confirmModal" data-toggle="modal" id="deleteRow_' + rowId + '" data-target="#confirmModal"><button class="btn btn-danger" type="button"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete</button></a>' + '</td>'
	html += '</tr>'
	$("#blocksTable").append(html);
	rowCounter++;
}


$("#addRow").click(function() {
	addNewRow(rowCounter);
});

$('#confirmModal').on('show.bs.modal', function(e) {
	var thisModal = $(this);
	var rowId = e.relatedTarget.id.split("_")[1];
	var html = '<p>Are you sure you want to delete row '+ rowId +'?</p>'
	thisModal.find('.modal-body').html(html);
	$("#confirmDeleteRow").click(function() {
		deleteRow(rowId);
	})
});

$("#generateMarkdown").click(function() {
	blocks = [];
	var rows = $(".dataRows");
	for (var index = 0, length = rows.length; index < length; index++) {
		var rowId = rows[index].id.split("_")[1];
		var block = {};
		block.blockType = $("#blockType_" + rowId)[0].value;
		block.blockName = $("#blockName_" + rowId)[0].value;
		block.blockText = $("#blockText_" + rowId)[0].value;
		blocks.push(block);
	}
	writeToTextFile(JSON.stringify(blocks));
});

$(document).ready(function() {
	//Adding 1 row
	$("#addRow").click()
});