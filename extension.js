'use strict';
const vscode = require('vscode');

const getTerminal = () => {
	var activeTerminal = vscode.window.activeTerminal;
	if (activeTerminal) {
		return activeTerminal;
	}

	return vscode.window.createTerminal('thg');
}
const runCommand = (uri, command) => {
	let fileFullPath = undefined;

	if (uri) {
		fileFullPath = uri.fsPath;
	} else if (vscode.window.activeTextEditor.document) {
		fileFullPath = vscode.window.activeTextEditor.document.uri.fsPath;
	}

	if (fileFullPath) {
		var activeTerminal = getTerminal();
		if (activeTerminal) {
			command = command.replace("${fileFullPath}", fileFullPath);
			activeTerminal.sendText(command);
		} else {
			vscode.window.showInformationMessage("Could not get active terminal");
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

	let workbenchDisposable = vscode.commands.registerCommand('extension.workbench', (uri) => {
		runCommand(uri, "thg log");
	});

	context.subscriptions.push(workbenchDisposable);


	let revisionHistoryDisposable = vscode.commands.registerCommand('extension.revisionHistory', (uri) => {
		runCommand(uri, "thg file ${fileFullPath}");
	});

	context.subscriptions.push(revisionHistoryDisposable);


	let revisionHistoryCompareDisposable = vscode.commands.registerCommand('extension.revisionHistoryCompare', (uri) => {
		runCommand(uri, "thg file ${fileFullPath} --compare");
	});

	context.subscriptions.push(revisionHistoryCompareDisposable);


	let annotateFileDisposable = vscode.commands.registerCommand('extension.annotateFile', (uri) => {
		runCommand(uri, "thg annotate ${fileFullPath}");
	});

	context.subscriptions.push(annotateFileDisposable);

}


// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
