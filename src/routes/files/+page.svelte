<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Table from "$lib/components/ui/table";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Ellipsis } from 'lucide-svelte';
	
	import type { PageData } from './$types';

	const files = [{
		name: "Datei 1",
		size: "1 MB",
		type: "PDF",
		uploadedBy: {
			name: "Max Mustermann",
			email: "privat.lukas.schneider@gmail.com"
		}
	}]

	let { data }: { data: PageData } = $props();
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
			<!-- <Card.Header>
				<Card.Title>Benutzer</Card.Title>
				<Card.Description>Verwalte alle registrierten Benutzer des Vereins.</Card.Description>
			</Card.Header> -->
			<Card.Content>
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head class="hidden w-[100px] sm:table-cell">
								<span class="sr-only">Image</span>
							</Table.Head>
							<Table.Head>Name</Table.Head>
							<Table.Head>Größe</Table.Head>
							<Table.Head class="hidden md:table-cell">Typ</Table.Head>
							<Table.Head class="hidden md:table-cell">Hochgeladen von</Table.Head>
							<Table.Head>
								<span class="sr-only">Actions</span>
							</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each files as file}
							<Table.Row>
								<Table.Cell class="hidden sm:table-cell">
									<!-- <img
										alt="Product example"
										class="aspect-square rounded-md object-cover"
										height="64"
										src="/images/placeholder.svg"
										width="64"
									/> -->
								</Table.Cell>
								<Table.Cell class="font-medium">{file.name}</Table.Cell>
								<Table.Cell>
									<Badge variant="outline">
										{file.size}
									</Badge>
								</Table.Cell>
								<Table.Cell class="hidden md:table-cell">{file.type}</Table.Cell>
								<Table.Cell class="hidden md:table-cell">{file.uploadedBy.name}</Table.Cell>
								<Table.Cell>
									<DropdownMenu.Root>
										<DropdownMenu.Trigger asChild let:builder>
											<Button
												aria-haspopup="true"
												size="icon"
												variant="ghost"
												builders={[builder]}
											>
												<Ellipsis class="h-4 w-4" />
												<span class="sr-only">Toggle menu</span>
											</Button>
										</DropdownMenu.Trigger>
										<DropdownMenu.Content align="end">
											<DropdownMenu.Label>Aktionen</DropdownMenu.Label>
											<DropdownMenu.Item>Bearbeiten</DropdownMenu.Item>
											<DropdownMenu.Item>Löschen</DropdownMenu.Item>
										</DropdownMenu.Content>
									</DropdownMenu.Root>
								</Table.Cell>
							</Table.Row>
						{/each}
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
