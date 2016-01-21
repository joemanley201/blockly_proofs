Blockly.Blocks['proof_by_contradiction'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Proof By Contradiction");
    this.appendStatementInput("False Assumption")
        .appendField("False Assumption");
    this.appendStatementInput("Proof By Contradiction")
        .setCheck("String")
        .appendField("Reduction to Contradiction");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip('');
  }
};


Blockly.Blocks['proof_by_induction'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Proof By Induction");
    this.appendStatementInput("Base Case")
        .appendField("Base Case");
    this.appendStatementInput("Proof Of Base Case")
        .appendField("Proof of Base Case");
    this.appendStatementInput("Induction assumption")
        .setCheck("String")
        .appendField("Induction assumption");
    this.appendStatementInput("Inductive Proof")
        .setCheck("String")
        .appendField("Inductive Proof");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip('');
  }
};

Blockly.Blocks['proof_qed'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("QED");
    this.setPreviousStatement(true, null);
    this.setColour(330);
    this.setTooltip('');
  }
};


Blockly.Blocks['proof_to_be_proven'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Statement To Be Proven");
    this.setNextStatement(true);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};