<script lang="ts">
	import { onMount } from 'svelte';
	import { fileUploadDialogStore } from './store';
	import * as Dialog from '../components/ui/dialog';

	let open: boolean = true;

	let file: File | null = null;
	let dialogElement: HTMLDialogElement;

	fileUploadDialogStore.subscribe((value) => {
		if (value.open) {
			open = true;
		}
	});
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="max-w-[50%]">
		<Dialog.Header>
			<Dialog.Title>Datei hochladen</Dialog.Title>
			<Dialog.Description>
				This action cannot be undone. This will permanently delete your account and remove your data
				from our servers.
			</Dialog.Description>
		</Dialog.Header>
		<div class="">
			{#if !file}
				<input
					type="file"
					accept="image/*"
					onchange={(e: Event) => {
						if (e.target.files) {
							file = e.target.files[0];
						} else return;
					}}
				/>
			{:else}
				<div class="">{file.name}</div>
			{/if}
		</div>
	</Dialog.Content>
</Dialog.Root>
