__author__ = 'joemanley'
#Templates
blocklyStartTemplate = "Blockly.Blocks['$$$'] = {init: function() {"
appendFieldTemplate = "appendField('$$$')"
previousStatementTemplate = "this.setPreviousStatement($$$);"
nextStatementTemplate = "this.setNextStatement($$$);"

setEditableFalse = "this.setEditable(false);"
blocklyEnd = "}};"
dummyInput = "this.appendDummyInput()"

#Files
outputBlockly = open("blockly/blocks/output.js", "w")
inputFile = open("input.txt", "r")

def generateBlocklyAndWrite(blockObj):
    JSONString = ""
    JSONString += blocklyStartTemplate.replace("$$$", blockObj['name'])
    if blockObj['type'] == "proofStart":
        JSONString += dummyInput + "." + appendFieldTemplate.replace("$$$", "Prove") + "." + appendFieldTemplate.replace("$$$", blockObj['proofStatement'])
        JSONString += "." + appendFieldTemplate.replace("$$$", "By")
        JSONString += "." + appendFieldTemplate.replace("'$$$'", "new Blockly.FieldDropdown(" + block['proofTypes'] + ")," + "'" + blockObj['handle'] + "'")
        JSONString += ";"
        JSONString += "this.setColour(260);"
    elif blockObj['type'] == "proofEnd":
        JSONString += dummyInput + "." + appendFieldTemplate.replace("$$$", blockObj['text']) + ";"
        JSONString += "this.setColour(260);"
        JSONString += setEditableFalse
    elif blockObj['type'] == "proofStep":
        JSONString += dummyInput + "." + appendFieldTemplate.replace("'$$$'", "new Blockly.FieldTextInput(" + blockObj['text'] + ")," + "'" + blockObj['handle'] + "'")
        JSONString += ";"
        JSONString += "this.setColour(160);"
        JSONString += setEditableFalse

    if "nextStatement" in blockObj:
        JSONString += nextStatementTemplate.replace("$$$", blockObj['nextStatement'])
    if "previousStatement" in blockObj:
        JSONString += previousStatementTemplate.replace("$$$", blockObj['previousStatement'])
    JSONString += blocklyEnd
    outputBlockly.write(JSONString)

for line in inputFile:
    block = {}
    #blockName
    parts = line.split(":")
    if parts[0] == "blockName":
        block['name'] = parts[1].strip()

    line = inputFile.next()
    parts = line.split(":")
    if parts[0] == "proofStart":
        block['type'] = parts[0].strip()
        block['proofStatement'] = parts[1].strip()
        block['proofTypes'] = parts[2].strip()
        block['handle'] = "proofType"
    elif parts[0] == "proofEnd":
        block['type'] = parts[0].strip()
        block['text'] = parts[1].strip()
    elif parts[0].find("proofStep") != -1:
        block['type'] = "proofStep"
        block['handle'] = parts[1].strip()
        block['text'] = parts[2].strip()

    line = inputFile.next()
    parts = line.split(":")
    if parts[0] == "nextStatement":
        block['nextStatement'] = parts[1].strip()

    line = inputFile.next()
    parts = line.split(":")
    if parts[0] == "previousStatement":
        block['previousStatement'] = parts[1].strip()
    generateBlocklyAndWrite(block)