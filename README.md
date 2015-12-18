# blockly_proofs
Developing components using "Blockly For Education" to teach proofs
### File Structure
- js/ contains the JavaScript files
- media/ contains images and mp3 files
- index.html starter page for blockly
- input.txt markdown file to generate the appropriate blocks
- generateBlocklyFromInput.py Python parser to parse input file and generate appropriate JS files

### Input.txt
- Each block needs to be of the following format: blockName -> proofStart/proofStep/proofEnd -> nextStatement -> previousStatement
    - blockName - name of the block. This will be included in the html as well as in the rubric to finally check the answers
        - eg: blockName:mathematical_proof_container_block
    - proofStart - This is drop down listing the different types of Proof. Please provide the statement to be proved followed by ":" and provide a list of lists containing the proofType and its label.
        - eg: proofStart:statement to prove:[["Mathematical Induction", "mathematicalInduction"]]
    - proofStep - Provide the step id (step1, step2, etc.) followed by content for the step separated by ":"
        - eg: proofStep:step1:"This is step 1"
    - proofEnd - Block to mark the end of the proof
        - eg: proofEnd:Hence Proved
    - nextStatement - Indicates whether the block has connection to connect another block next to it
        - eg: nextStatement:true
    - previousStatement - Indicates whether the block has connection to connect another block previous to it
        - eg: previousStatement:false
### Generate Blocks
- When the input markdown file is ready, please run python generateBlocklyFromInput.py
- This will generate the output.js file

### Adding blocks to the HTML
- Once the output.js file is in place, you can start including the blocks needed in the toolbox.

Sample toolbox
```xml
<xml id="toolbox" style="display: none">
    <category name="Proof">
      <block type="mathematical_proof_container_block"></block>
      <block type="mathematical_proof_hence_proved"></block>
      <block type="mathematical_proof_step1"></block>
      <block type="mathematical_proof_step2"></block>
      <block type="mathematical_proof_step3"></block>
      <block type="mathematical_proof_step4"></block>
      <block type="mathematical_proof_step5"></block>
    </category>
    <sep></sep>
  </xml>
```

### Check the blocks
- After the blocks are dragged and a proof block is built, press Check below the toolbox to generate the blocks information.
- If a rubric is provided, we can validate the current state of the blocks