import { readable, writable } from 'svelte/store';

const fileStore = writable({
	files: [],
	error: null
});

const fileUploadDialogStore = writable({
	open: false
});

export { fileStore, fileUploadDialogStore };
