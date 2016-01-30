Blockly.Blocks['mathematical_proof_container_block'] = {
	init: function() {
		this.appendDummyInput().appendField('Prove').appendField('statement to prove').appendField('By').appendField(new Blockly.FieldDropdown([
			["Mathematical Induction", "mathematicalInduction"],
			["Contraposition", "contraposition"],
			["Contradiction", "contradiction"],
			["Construction", "construction"],
			["Exhaustion", "exhaustion"]
		]), 'proofType');
		this.setColour(260);
		this.setNextStatement(true);
		this.setPreviousStatement(false);
	}
};
Blockly.Blocks['mathematical_proof_hence_proved'] = {
	init: function() {
		this.appendDummyInput().appendField('Hence Proved');
		this.setColour(260);
		this.setEditable(false);
		this.setNextStatement(false);
		this.setPreviousStatement(true);
	}
};
Blockly.Blocks['mathematical_proof_step1'] = {
	init: function() {
		this.appendDummyInput().appendField(new Blockly.FieldTextInput("This is step 1"), 'step1');
		this.setColour(160);
		this.setEditable(false);
		this.setNextStatement(true);
		this.setPreviousStatement(true);
	}
};
Blockly.Blocks['mathematical_proof_step2'] = {
	init: function() {
		this.appendDummyInput().appendField(new Blockly.FieldTextInput("This is step 2"), 'step2');
		this.setColour(160);
		this.setEditable(false);
		this.setNextStatement(true);
		this.setPreviousStatement(true);
	}
};
Blockly.Blocks['mathematical_proof_step3'] = {
	init: function() {
		this.appendDummyInput().appendField(new Blockly.FieldTextInput("This is step 3"), 'step3');
		this.setColour(160);
		this.setEditable(false);
		this.setNextStatement(true);
		this.setPreviousStatement(true);
	}
};
Blockly.Blocks['mathematical_proof_step4'] = {
	init: function() {
		this.appendDummyInput().appendField(new Blockly.FieldTextInput("This is step 4"), 'step4');
		this.setColour(160);
		this.setEditable(false);
		this.setNextStatement(true);
		this.setPreviousStatement(true);
	}
};
Blockly.Blocks['mathematical_proof_step5'] = {
	init: function() {
		this.appendDummyInput().appendField(new Blockly.FieldTextInput("This is step 5"), 'step5');
		this.setColour(160);
		this.setEditable(false);
		this.setNextStatement(true);
		this.setPreviousStatement(true);
	}
};