var rowCounter = 1;
var blocks;
var totalImages = 0;
var imagesLoadedCount = 0;

var IMG_LINK_TEMP = "http://latex.codecogs.com/svg.latex?"

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
	html += '<td class="col-lg-1">' + rowId + '</td>'
	html += '<td class="col-lg-2"><select class="form-control" id="blockType_' + rowId + '" name="proofStep"><option value="proofStatement">Proof Statement</option><option value="proofEnd">Proof End</option><option value="proofStep">Proof Step</option></td>'
	html += '<td class="col-lg-2">' + '<input type="text" class="form-control" id="blockName_' + rowId + '" name="blockName"/>' + '</td>'
	html += '<td class="col-lg-2">' + '<textarea type="text" class="form-control" id="blockContent_' + rowId + '" name="blockContent"></textarea>' + '</td>'
	html += '<td class="col-lg-1 text-center">' + '<input type="checkbox" name="isMathOrMultiLine" id="blockMathOrMultiLine_' + rowId + '" />' + '</td>'
	html += '<td class="col-lg-4">' + '<img id="blockContentPreview_' + rowId + '" name="blockContentPreview"/>' + '</td>'
	html += '<td class="col-lg-1">' + '<a href="#confirmModal" data-toggle="modal" id="deleteRow_' + rowId + '" data-target="#confirmModal"><button class="btn btn-danger" type="button"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete</button></a>' + '</td>'
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
		block.blockText = $("#blockContent_" + rowId)[0].value;
		if ($("#blockMathOrMultiLine_" + rowId +":checked").length) {
			var imageElement = $("#blockContentPreview_" + rowId)[0];
			var stylee = getComputedStyle(imageElement);
			block.image = {
				width: stylee.width,
				height:  stylee.height,
				src: imageElement.src
			}
		}
		blocks.push(block);
	}
	finalJSON = {
		blocklyName: $("#blocklyName").val(),
		blocks: blocks
	}
	writeToTextFile(JSON.stringify(finalJSON));
});

$("#showPreview").click(function() {
	var blockContents = $("#blocksTable").find("textarea");
	for (var index = 0, length = blockContents.length; index < length; index++) {
		var blockContent = blockContents[index];
		var rowId = blockContent.id.split("_")[1];
		var blockContent = blockContents[index];
		if ($("#blockMathOrMultiLine_" + rowId +":checked").length) {
			totalImages++;
			var contentPreviewElement = $("#blockContentPreview_" + rowId);
			//$(contentPreviewElement).attr("src", "http://latex.codecogs.com/svg.latex?$$What \ is\ the\ time\ now?\ \[\frac{x^2+1}{y^2}\]\\Hello\\Hello\\Hello\\Hello\\Hello\\Hello$$");
			$(contentPreviewElement).attr("src", IMG_LINK_TEMP + blockContent.value);
			setTimeout(function() {
				$(contentPreviewElement).attr("onload", imagesLoaded);
			}, 100);
			//contentPreviewElement.src = IMG_LINK_TEMP + blockContent.value;
		}
	}
	if (totalImages == 0) {
		checkIfGenerateMarkdownButtonCanBeEnabled();
	}
});

$("#blocklyName").change(function() {
	checkIfGenerateMarkdownButtonCanBeEnabled();
	var regexx = /[^a-zA-Z]+/g;
	this.value = this.value.toLowerCase().replace(regexx, "");
});

function checkIfGenerateMarkdownButtonCanBeEnabled() {
	if (imagesLoadedCount == totalImages) {
		if ($("#blocklyName").val().length) {
			$("#validationWarningMessage").toggle(false);
			$("#generateMarkdown").removeClass("disabled");
		} else {
			$("#generateMarkdown").addClass("disabled")
			$("#validationWarningMessage").toggle(true);
		}
	}
}

function imagesLoaded() {
	imagesLoadedCount++;
	checkIfGenerateMarkdownButtonCanBeEnabled();
}

$(document).ready(function() {
	//Adding 1 row
	//$("#addRow").click()
});