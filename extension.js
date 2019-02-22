'use strict';
const vscode = require('vscode');


const runCommand = (uri, command) => {
	let fileFullPath = undefined;

	if (uri) {
		fileFullPath = uri.fsPath;
	} else if (vscode.window.activeTextEditor.document) {
		fileFullPath = vscode.window.activeTextEditor.document.uri.fsPath;
	}


	if (fileFullPath) {
		var activeTerminal = vscode.window.activeTerminal;
		if (activeTerminal) {
			activeTerminal.sendText(command + " " + fileFullPath);
		} else {
			vscode.window.showInformationMessage("To be able to run command, there must be an active terminal!");
		}
	} else {
		vscode.window.showInformationMessage("Could not locate file");
	}
};
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "TortoiseHg Commands" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json

	let revisionHistoryDisposable = vscode.commands.registerCommand('extension.revisionHistory', (uri) => {

		runCommand(uri, "thg file");
	});

	context.subscriptions.push(revisionHistoryDisposable);

	let annotateFileDisposable = vscode.commands.registerCommand('extension.annotateFile', (uri) => {
		runCommand(uri, "thg annotate");
	});

	context.subscriptions.push(annotateFileDisposable);
}


// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
