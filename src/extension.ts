// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

// const PORT = 8000;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "onnx-connx-covert" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('onnx-connx-covert.start', () => {
	// 	// The code you place here will be executed every time your command is executed
	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello ONNX-CONNX Covert!');
	// });
	const provide = new OnnxViewProvider(context.extensionUri);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(OnnxViewProvider.viewType, provide),

		// vscode.commands.registerCommand('onnx-connx-covert.start',()=>{
		// 	const panel = vscode.window.createWebviewPanel(
		// 		'Onnx-Connx-Covert',
		// 		'onnx-connx',

		// 		vscode.ViewColumn.One,{
		// 			enableScripts:true,
		// 			retainContextWhenHidden:true,
		// 			enableCommandUris:true,
		// 			// portMapping:[
		// 			// 	{webviewPort:PORT,extensionHostPort:PORT}
		// 			// ]
		// 		}

		// 	);
		// 	//const cspSource = panel.webview.cspSource;
		// 	//Get path to resource on disk
		// 	const pathToHtml = vscode.Uri.file(
		// 		path.join(context.extensionPath,'src','page.html')
		// 	);
		// 	//Get the special URI to use with the webview
		// 	const pathUri = pathToHtml.with({scheme:'vscode-resource'});
			
		// 	// And set its HTML content
		// 	panel.webview.html = fs.readFileSync(pathUri.fsPath,'utf-8');
		// }), 
	);
}

// this method is called when your extension is deactivated
export function deactivate() {}

class OnnxViewProvider implements vscode.WebviewViewProvider {

	public static readonly viewType = 'opw';

	private _view?: vscode.WebviewView;

	constructor(
		private readonly _extensionUri: vscode.Uri,
	) { }
			//Get path to resource on disk

	public resolveWebviewView(
		webviewView: vscode.WebviewView,
		context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken,
	) {
		this._view = webviewView;

		webviewView.webview.options = {
			// Allow scripts in the webview
			enableScripts: true,

			localResourceRoots: [
				this._extensionUri
			]
		};

		webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

	}


	private _getHtmlForWebview(webview: vscode.Webview) {
		// Get the local path to main script run in the webview, then convert it to a uri we can use in the webview.
		const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'out', 'page.html'));
		const pathUri = scriptUri.with({scheme:'vscode-resource'});
		const html = fs.readFileSync(pathUri.fsPath,'utf-8');
		return html;
	}
}