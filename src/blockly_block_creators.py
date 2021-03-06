from blockly_constants import PROOF_STATEMENT, PROOF_END, PROOF_STEP, CATEGORY_ELEMENT


#Blockly Template Getters
def getBlocklyStart(blockName):
    return "Blockly.Blocks['" + blockName + "'] = {init: function() {"

def getColor(colorValue):
    #Please check this link to get the different colors available - https://blockly-demo.appspot.com/static/demos/blockfactory/index.html
    return "this.setColour(" + colorValue + ");"

def getNavigation(allowPrevious, allowNext):
    return "this.setNextStatement(" + allowNext + ");" + "this.setPreviousStatement(" + allowPrevious + ");"

def getBlocklyEnd():
    return "}};"

def getEditable(editable):
    return "this.setEditable(" + editable + ");"

def getLabelField(blockContent, isProofStatement):
    appendHTML = ".appendField('Prove that')" if isProofStatement else ""
    return "this.appendDummyInput()" + appendHTML + ".appendField('" + blockContent + "');"

def getTextField(blockContent, blockName):
    return "this.appendDummyInput().appendField(new Blockly.FieldTextInput('" + blockContent + "'), '" + blockName + "');"

def getImageField(imageLink, width, height, isProofStatement):
    appendHTML = ".appendField('Prove that')" if isProofStatement else ""
    return "this.appendDummyInput()" + appendHTML + ".appendField(new Blockly.FieldImage('" + imageLink + "', " + width[:-2] + ", " + height[:-2] + ", ''));"


#Blockly Block Processors
def getBlockContent(blockJSON, isLabel):
    isProofStatementBlock = (blockJSON["blockType"] == PROOF_STATEMENT)
    if ("image" in blockJSON):
        imageInfo = blockJSON["image"]
        return getImageField(imageInfo["imagePath"], imageInfo["width"], imageInfo["height"], isProofStatementBlock)
    else:
        if isLabel:
            return getLabelField(blockJSON["blockText"], isProofStatementBlock)
        else:
            return getTextField(blockJSON["blockText"], blockJSON["blockName"])

def getJSBlockStringForJSON(blockJSON):
    if blockJSON["blockType"] == PROOF_STATEMENT:
        return getProofStatementBlock(blockJSON)
    elif blockJSON["blockType"] == PROOF_END:
        return getProofEndBlock(blockJSON)
    elif blockJSON["blockType"] == PROOF_STEP:
        return getProofStepBlock(blockJSON)


#Blockly Block creators
def getProofStatementBlock(blockJSON):
    return getBlocklyStart(blockJSON["blockName"]) \
           + getBlockContent(blockJSON, True)\
           + getColor("360")\
           + getEditable("false")\
           + getNavigation("false", "true")\
           + getBlocklyEnd()

def getProofEndBlock(blockJSON):
    return getBlocklyStart(blockJSON["blockName"]) \
           + getBlockContent(blockJSON, True)\
           + getColor("210")\
           + getEditable("false")\
           + getNavigation("true", "false")\
           + getBlocklyEnd()

def getProofStepBlock(blockJSON):
    return getBlocklyStart(blockJSON["blockName"]) \
           + getBlockContent(blockJSON, False)\
           + getColor("160")\
           + getEditable("false")\
           + getNavigation("true", "true")\
           + getBlocklyEnd()


#Blockly HTML helpers
def getBlockHtmlForBlockName(blockName):
    return "<block type='" + blockName + "'></block>"

def getJSForAppendingNewBlocksToToolbox(blockHtml):
    return "document.getElementById('" + CATEGORY_ELEMENT + "').innerHTML += \"" + blockHtml + "\";"