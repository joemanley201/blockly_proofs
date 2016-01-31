__author__ = 'joemanley'
import json
import os
import logging
from urllib import urlretrieve

from blockly_constants import blocklyOutputFileName, logFileName, GENERATED_BLOCKLYS_PATH
from blockly_block_creators import *

ERROR_ENCOUNTERED = False

def terminateProcess():
    if ERROR_ENCOUNTERED:
        print "-Error encountered during the process. Please check the logfile: " + logFileName
    else:
        print "Process completed successfully. Please check the logfile: " + logFileName + " for more details."
    exit()


#Files
blocklyOutputFile = open(blocklyOutputFileName, "w")
inputMarkdownFile = open("inputFromMarkdownCreator.txt", "r")

#Initialize Logger files and logging
open(logFileName, 'w').close()
logging.basicConfig(filename = logFileName, level=logging.DEBUG)


#load inputFile as JSON
inputJSON = json.load(inputMarkdownFile)
blocks = inputJSON["blocks"]
blocklyName = inputJSON["blocklyName"]


#Generate SVGs if needed
logging.info("[SVG Generation] Started")
os.chdir(os.getcwd())
if os.path.exists("../" + GENERATED_BLOCKLYS_PATH + blocklyName):
    logging.error("[SVG Generation] Blockly directory with name " + " '" + blocklyName + "' already exists. Cannot overwrite Please change new blockly name in JSON")
    logging.error("[SVG Generation] Completed with Errors")
    ERROR_ENCOUNTERED = True
    terminateProcess()
else:
    os.mkdir("../" + GENERATED_BLOCKLYS_PATH + blocklyName)
    logging.info("[SVG Generation] Blockly directory with name " + " '" + blocklyName + "' does not exist. Created blockly directory")
    for block in blocks:
        if ("image" in block):
            imagePath = GENERATED_BLOCKLYS_PATH + blocklyName + "/" + block["blockName"] + ".svg"
            block["image"]["imagePath"] = imagePath
            urlretrieve(block["image"]["src"], "../" + imagePath)
            logging.info("[SVG Generation] " + blocklyName + "/" + block["blockName"] + ".svg retrieved successfully")
    logging.info("[SVG Generation] Completed successfully")


#Generate JS for Blocks
logging.info("[Block JavaScript Generation] Started")
JSBlockString = ""
blocklyBlockHTML = ""
for block in blocks:
    JSBlockString += getJSBlockStringForJSON(block)
    logging.info("[Block JavaScript Generation] Generated JavaScript Block String for block: " + block["blockName"])
    blocklyBlockHTML += getBlockHtmlForBlockName(block["blockName"])

JSBlockString += getJSForAppendingNewBlocksToToolbox(blocklyBlockHTML)
logging.info("[Block JavaScript Generation] Appended DOM Manipulation Script to add new blocks to Blockly toolbox")
blocklyOutputFile.write(JSBlockString)
blocklyOutputFile.close()
logging.info("[Block JavaScript Generation] JS file saved at " + blocklyOutputFileName)
logging.info("[Block JavaScript Generation] Completed successfully")
terminateProcess()