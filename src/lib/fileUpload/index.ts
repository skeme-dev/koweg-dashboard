import { get } from 'svelte/store';
import { fileStore, fileUploadDialogStore } from './store';

function getFiles() {
	const fileUploadDialogStoreState: { open: boolean } = get(fileUploadDialogStore);
	const fileStoreState: { error: boolean; files: any[] } = get(fileStore);

	if (!fileUploadDialogStoreState.open) {
		fileUploadDialogStore.set({ open: true });
	}

	if (!fileStoreState.error) {
		fileUploadDialogStore.set({ open: false });

		// reset fileUploadStore
		fileStore.set({
			files: [],
			error: false
		});

		return fileStoreState.files.length == 1 ? fileStoreState.files[0] : fileStoreState.files;
	}
}

export default getFiles;
