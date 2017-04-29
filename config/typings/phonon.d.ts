
interface Popup {
	
	open(): void;

	close(): void;

}

interface Dialog extends Popup {

	// events = confirm, cancel
	on(event: string, handler: () => any): Dialog;

}

interface InputDialog extends Popup {

	// events = confirm, cancel
	on(event: string, handler: (inputValue: string) => any): InputDialog;

}

interface Panel extends Popup {
	
}

/**
 * The Phonon Framework instance members;
 */
interface Phonon {

	// Panels
	panel(element: object): Panel;
	panel(selector: string): Panel;

	// Dialogs
	alert(text: string, title: string, cancelable: boolean, textOk: string): Dialog;
	confirm(text: string, title: string, cancelable: boolean, textOk: string, textCancel: string): Dialog;
	prompt(text: string, title: string, cancelable: boolean, textOk: string, textCancel: string): InputDialog;
	passPrompt(text: string, title: string, cancelable: boolean, textOk: string, textCancel: string): InputDialog;
	indicator(title: string, cancelable: boolean): Popup;
	dialog(element: object): Dialog;
	dialog(selector: string): Dialog;

}

declare const phonon: Phonon;

declare module "phonon" {
    export = phonon;
}
