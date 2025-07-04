<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Ellipsis, Trash, Trash2, Upload } from 'lucide-svelte';

	import type { PageData } from './$types';
	import getFiles from '$lib/fileUpload';
	import { deleteFile, uploadFile } from '$lib/api/files';
	import { invalidateAll } from '$app/navigation';
	import { onMount, tick } from 'svelte';
	import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

	const files = [
		{
			name: 'Datei 1',
			size: '1 MB',
			type: 'PDF',
			uploadedBy: {
				name: 'Max Mustermann',
				email: 'privat.lukas.schneider@gmail.com'
			}
		}
	];

	let { data }: { data: PageData } = $props();

	function getFileExtension(filename: string): string | undefined {
		const parts = filename.split('.');
		return parts.length > 1 ? parts.pop()?.toUpperCase() : '';
	}

	async function getFileObject(filename: string): File | undefined {
		const response = await fetch(`${PUBLIC_POCKETBASE_URL}/public/downloads/${filename}`, {
			method: 'GET'
		});

		if (!response.ok) {
			console.error('Error while fetching file:', response.statusText);
			return undefined;
		}

		const blob = await response.blob();

		return new File([blob], filename, { type: blob.type });
	}

	let fileList: File[] = $state.raw([]);

	let filesLoading = $state(true);

	onMount(async () => {
		for (const file of data.files) {
			const f = await getFileObject(file);

			fileList.push(f);
		}

		filesLoading = false;
	});

</script>

<div class="space-y-6 p-10 pb-16 md:block">
	<div class="flex items-end justify-between">
		<div class="space-y-0.5">
			<h2 class="text-2xl font-bold tracking-tight">Dateien</h2>
			<p class="text-muted-foreground">Verwalte alle Dateien der Anwendung.</p>
		</div>
	</div>
	<div class="flex flex-col w-3/4">
		<Card.Root>
			<Card.Header class="flex flex-row justify-between">
				<div class="">
					<Card.Title>Öffentliche Dateien</Card.Title>
					<Card.Description>Verwalte alle registrierten Benutzer des Vereins.</Card.Description>
				</div>
				<Button
					onclick={() => {
						getFiles()
							.then((data) => {
								console.log(data);

								// upload file to server

								uploadFile(
									data[0],
									async () => {
										console.log('file uploaded successfully');

										await invalidateAll();
									},
									(error) => {
										console.error(error);
									}
								);
							})
							.catch((error) => {
								console.error('Error while getting files:', error);
							});
					}}
				>
					<Upload class="mr-2 h-4 w-4" />
					<span class="hidden sm:inline">Datei hochladen</span>
				</Button>
			</Card.Header>
			<Card.Content>
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head>Name</Table.Head>
							<Table.Head>Größe</Table.Head>
							<Table.Head class="hidden md:table-cell">Typ</Table.Head>
							<!-- <Table.Head class="hidden md:table-cell">Hochgeladen von</Table.Head> -->
							<Table.Head>
								<span class="sr-only">Actions</span>
							</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#if !filesLoading}
							{#each fileList as file}
								<Table.Row>
									<Table.Cell class="font-medium">{file.name}</Table.Cell>
									<Table.Cell>
										{(file?.size / 1_000_000).toPrecision(2)} MB
									</Table.Cell>
									<Table.Cell class="hidden md:table-cell">
										<Badge variant="outline">
											{getFileExtension(file.name)}
										</Badge>
									</Table.Cell>
									<!-- <Table.Cell class="hidden md:table-cell">{file.uploadedBy.name}</Table.Cell> -->
									<Table.Cell>
										<Button
											on:click={() => {
												deleteFile(
													file.name,
													async () => {
														console.log('File deleted successfully');
														await invalidateAll();
													},
													(error) => {
														console.error('Error while deleting file:', error);
													}
												);
											}}
											variant="outline"
											size="icon"
										>
											<Trash2 class="h-4 w-4" />
											<span class="sr-only">Löschen</span>
										</Button>
									</Table.Cell>
								</Table.Row>
							{/each}
						{/if}
					</Table.Body>
				</Table.Root>
			</Card.Content>
			<Card.Footer>
				<div class="text-muted-foreground text-xs">
					Angezeigt <strong>{files.length}</strong> von <strong>{files.length}</strong> Dateien
				</div>
			</Card.Footer>
		</Card.Root>
	</div>
</div>
