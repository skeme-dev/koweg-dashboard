<script lang="ts">
	import File from 'lucide-svelte/icons/file';
	import ListFilter from 'lucide-svelte/icons/list-filter';
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import CirclePlus from 'lucide-svelte/icons/circle-plus';

	import { Badge } from '$lib/components/ui/badge/index.js';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import CreateSponsorDialog from '$lib/components/create-sponsor-dialog.svelte';
	import { PlusCircle } from 'lucide-svelte';

	let { data } = $props();

	let createSponsorDialogOpen: boolean = $state.raw(true);
</script>

<CreateSponsorDialog bind:open={createSponsorDialogOpen} />

<main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
	<Tabs.Root value="all">
		<div class="flex items-center">
			<Tabs.List>
				<Tabs.Trigger value="all">All</Tabs.Trigger>
				<Tabs.Trigger value="active">Active</Tabs.Trigger>
				<Tabs.Trigger value="draft">Draft</Tabs.Trigger>
				<Tabs.Trigger value="archived" class="hidden sm:flex">Archived</Tabs.Trigger>
			</Tabs.List>
			<div class="ml-auto flex items-center gap-2">
				<Button size="sm" class="h-8 gap-1" onclick={() => (createSponsorDialogOpen = true)}>
					<PlusCircle class="h-3.5 w-3.5" />
					<span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Sponsor hinzufügen </span>
				</Button>
			</div>
		</div>
		<Tabs.Content value="all">
			<Card.Root>
				<Card.Header>
					<Card.Title>Sponsoren</Card.Title>
					<Card.Description>Verwalte alle Sponsoren des Vereins.</Card.Description>
				</Card.Header>
				<Card.Content>
					<Table.Root>
						<Table.Header>
							<Table.Row>
								
								<Table.Head>Name</Table.Head>
								<Table.Head>Sponsorart</Table.Head>
								<Table.Head class="hidden md:table-cell">Sponsorenbild</Table.Head>
								<Table.Head class="hidden md:table-cell">Link</Table.Head>
								<Table.Head>
									<span class="sr-only">Actions</span>
								</Table.Head> 
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{#each data.sponsors as sponsor}
								<Table.Row>
									
									<Table.Cell class="font-medium">{sponsor.name}</Table.Cell>
									<Table.Cell>
										<Badge variant="outline">
											{#if sponsor.main_sponsor}
												Hauptsponsor
											{:else}
												Sponsor 
                                            {/if}
										</Badge>
									</Table.Cell>
									<Table.Cell class="hidden md:table-cell">{sponsor.logo}</Table.Cell>
									<Table.Cell class="hidden md:table-cell">
										<a href={sponsor.link}>

											{sponsor.link}
										</a>
									</Table.Cell>
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
						Angezeigt <strong>{data.sponsors.length}</strong> von <strong>{data.sponsors.length}</strong> Sponsoren
					</div>
				</Card.Footer>
			</Card.Root>
		</Tabs.Content>
	</Tabs.Root>
</main>
