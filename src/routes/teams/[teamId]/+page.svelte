<script lang="ts">
	import type { PageData } from './$types';

	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import House from 'lucide-svelte/icons/house';
	import ChartLine from 'lucide-svelte/icons/chart-line';
	import Package from 'lucide-svelte/icons/package';
	import Package2 from 'lucide-svelte/icons/package-2';
	import PanelLeft from 'lucide-svelte/icons/panel-left';
	import CirclePlus from 'lucide-svelte/icons/circle-plus';
	import Search from 'lucide-svelte/icons/search';
	import Settings from 'lucide-svelte/icons/settings';
	import ShoppingCart from 'lucide-svelte/icons/shopping-cart';
	import Upload from 'lucide-svelte/icons/upload';
	import UsersRound from 'lucide-svelte/icons/users-round';
	import Check from 'lucide-svelte/icons/check';

	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as ToggleGroup from '$lib/components/ui/toggle-group/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import ImageUploadDialog from '$lib/components/ImageUploadDialog.svelte';
	import DeleteDialog from '$lib/components/DeleteDialog.svelte';
	import { Trash, Trash2 } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	import Calendar from '$lib/components/ui/calendar/calendar.svelte';
	import EventsCard from '$lib/components/teams/events-card.svelte';

	import getFiles from '$lib/fileUpload';

	let { data }: { data: PageData } = $props();

	let currentTeamName = $state(data.team.name);
	let currentTeamDescription = $state(data.team.description);

	let userSelectionOpen = $state(false);
	let selectedUsers = $state([]);

	let imageUploadDialogOpen = $state(false);
	let deleteTeamDialogOpen = $state(false);

	const weekdays = [
		{ value: 1, label: 'Montag' },
		{ value: 2, label: 'Dienstag' },
		{ value: 3, label: 'Mittwoch' },
		{ value: 4, label: 'Donnerstag' },
		{ value: 5, label: 'Freitag' },
		{ value: 6, label: 'Samstag' },
		{ value: 7, label: 'Sonntag' }
	];

	let selectedWeekday = $state();
	let addTrainingSchedule = $state(false);

	let formElement;
</script>

<!-- <ImageUploadDialog bind:image={imageFile} bind:open={imageUploadDialogOpen} /> -->

<DeleteDialog
	bind:open={deleteTeamDialogOpen}
	dialogTitle="Team löschen"
	dialogDescription="Das Löschen dieses Teams kann nicht mehr rückgängig gemacht werden."
	onDelete={() => alert('LÖSCHEN')}
/>
<main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 !pb-12">
	<div class="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
		<div class="flex items-center gap-4">
			<Button
				onclick={() => {
					window.history.back();
				}}
				variant="outline"
				size="icon"
				class="h-7 w-7"
			>
				<ChevronLeft class="h-4 w-4" />
				<span class="sr-only">Zurück</span>
			</Button>
			<h1 class="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
				Team verwalten
			</h1>
			<!-- <Badge variant="outline" class="ml-auto sm:ml-0">In stock</Badge> -->
			<div class="hidden items-center gap-2 md:ml-auto md:flex">
				<Button variant="outline" size="sm" onclick={() => (deleteTeamDialogOpen = true)}
					>Löschen</Button
				>
				<Button size="sm">Speichern</Button>
			</div>
		</div>
		<div class="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
			<div class="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
				<Card.Root>
					<Card.Header>
						<Card.Title>Teaminformationen</Card.Title>
						<Card.Description>Bearbeite die Teaminformationen</Card.Description>
					</Card.Header>
					<Card.Content>
						<div class="grid gap-6">
							<div class="grid gap-3">
								<Label for="name">Name</Label>
								<Input id="name" type="text" class="w-full" bind:value={currentTeamName} />
							</div>
							<div class="grid gap-3">
								<Label for="description">Beschreibung</Label>
								<Textarea id="description" bind:value={currentTeamDescription} class="min-h-32" />
							</div>
						</div>
					</Card.Content>
				</Card.Root>
				<Card.Root>
					<Card.Header>
						<Card.Title>Trainingszeiten</Card.Title>
						<!-- <Card.Description></Card.Description> -->
					</Card.Header>
					<Card.Content>
						<Table.Root>
							<Table.Header>
								<Table.Row>
									<Table.Head>Wochentag</Table.Head>
									<Table.Head>Start</Table.Head>
									<Table.Head>Ende</Table.Head>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{#if data.trainings.totalItems > 0}
									{#each data.trainings.items as training}
										<Table.Row>
											<Table.Cell>
												{training.day}
											</Table.Cell>
											<Table.Cell>
												{training.start} Uhr
											</Table.Cell>
											<Table.Cell>
												{training.end} Uhr
											</Table.Cell>
										</Table.Row>
									{/each}
								{/if}
								<!-- {#if addTrainingSchedule}
									<Table.Row>
										<Table.Cell>
										<Label for="weekday" class="sr-only">Wochentag</Label>
										<Select.Root portal={null}>
											<Select.Trigger class="w-[180px]">
												<Select.Value placeholder="Wähle ein Wochentag aus" />
											</Select.Trigger>
											<Select.Content>
												<Select.Group>
													<Select.Label>Wochentage</Select.Label>
													{#each weekdays as weekday}
														<Select.Item value={weekday.value} label={weekday.label}
															>{weekday.label}</Select.Item
														>
													{/each}
												</Select.Group>
											</Select.Content>
											<Select.Input name="weekday" />
										</Select.Root>
									</Table.Cell> 

										<Table.Cell>
											<ToggleGroup.Root
												type="single"
												bind:value={selectedWeekday}
												variant="outline"
											>
												{#each weekdays as weekday}
													<ToggleGroup.Item
														onclick={() => (selectedWeekday = weekday.value)}
														value={weekday.value}>{weekday.label.slice(0, 2)}</ToggleGroup.Item
													>
												{/each}
											</ToggleGroup.Root>
										</Table.Cell>
									</Table.Row>
								{/if} -->
							</Table.Body>
						</Table.Root>
					</Card.Content>
					<Card.Footer class="justify-center border-t p-4">
						<Button
							size="sm"
							variant="ghost"
							class="gap-1"
							onclick={() => (addTrainingSchedule = true)}
						>
							<CirclePlus class="h-3.5 w-3.5" />
							Trainingszeit hinzufügen
						</Button>
					</Card.Footer>
				</Card.Root>
				<!-- <Card.Root>
					<Card.Header>
						<Card.Title>Events</Card.Title>
					</Card.Header>
					<Card.Content>
						<div class="grid gap-6 sm:grid-cols-3">
							<div class="grid gap-3">
								Hier soll ein Kalender gerendert werden
								<Label for="category">Category</Label>
								<Select.Root>
									<Select.Trigger id="category" aria-label="Select category">
										<Select.Value placeholder="Select category" />
									</Select.Trigger>
									<Select.Content>
										<Select.Item value="clothing" label="Clothing">Clothing</Select.Item>
										<Select.Item value="electronics" label="Electronics">Electronics</Select.Item>
										<Select.Item value="accessories" label="Accessories">Accessories</Select.Item>
									</Select.Content>
								</Select.Root>
							</div>
							<div class="grid gap-3">
								<Label for="subcategory">Subcategory (optional)</Label>
								<Select.Root>
									<Select.Trigger id="subcategory" aria-label="Select subcategory">
										<Select.Value placeholder="Select subcategory" />
									</Select.Trigger>
									<Select.Content>
										<Select.Item value="t-shirts" label="T-Shirts">T-Shirts</Select.Item>
										<Select.Item value="hoodies" label="Hoodies">Hoodies</Select.Item>
										<Select.Item value="sweatshirts" label="Sweatshirts">Sweatshirts</Select.Item>
									</Select.Content>
								</Select.Root>
							</div>
						</div>
					</Card.Content>
				</Card.Root> -->
			</div>
			<div class="grid auto-rows-max items-start gap-4 lg:gap-8">
				<Card.Root>
					<Card.Header>
						<Card.Title>Trainer</Card.Title>
					</Card.Header>
					<Card.Content>
						<div class="grid gap-6">
							<div class="grid gap-3">
								{#each data.team.expand.trainers as trainer}
									<div class="flex items-center justify-between">
										<span class="text-sm">{trainer.name}</span>
										<Button variant="ghost" size="icon">
											<Trash2 class="h-3.5 w-3.5" />
										</Button>
									</div>
								{/each}
							</div>
						</div>
					</Card.Content>
					<Card.Footer class="justify-center border-t p-2">
						<Button
							on:click={() => (userSelectionOpen = true)}
							size="sm"
							variant="ghost"
							class="gap-1"
						>
							<CirclePlus class="h-3.5 w-3.5" />
							Trainer hinzufügen
						</Button>
					</Card.Footer>
				</Card.Root>
				<Card.Root class="overflow-hidden">
					<Card.Header>
						<Card.Title>Teambild</Card.Title>
						<Card.Description>Lipsum dolor sit amet, consectetur adipiscing elit</Card.Description>
					</Card.Header>
					<Card.Content>
						<div class="grid gap-2">
							<img
								alt="Product"
								class="aspect-square w-full rounded-md object-cover"
								height="300"
								src={data.team.team_image}
								width="300"
							/>
							<div class="">
								<button
									onclick={() => {
										getFiles();
									}}
									class="py-3 flex w-full items-center justify-center rounded-md border border-dashed"
								>
									<Upload class="text-muted-foreground h-4 w-4" />
									<span class="sr-only">Upload</span>
								</button>
							</div>
						</div>
					</Card.Content>
				</Card.Root>
				<!-- <Card.Root>
					<Card.Header>
						<Card.Title>Archive Product</Card.Title>
						<Card.Description>Lipsum dolor sit amet, consectetur adipiscing elit.</Card.Description>
					</Card.Header>
					<Card.Content>
						<div></div>
						<Button size="sm" variant="secondary">Archive Product</Button>
					</Card.Content>
				</Card.Root> -->
			</div>
		</div>
		<div class="flex items-center justify-center gap-2 md:hidden">
			<Button variant="outline" size="sm">Discard</Button>
			<Button size="sm">Save Product</Button>
		</div>
		<EventsCard events={data.team.expand.events} />
	</div>
</main>
<Dialog.Root bind:open={userSelectionOpen}>
	<Dialog.Content class="gap-0 p-0 outline-none">
		<Dialog.Header class="px-4 pb-4 pt-5">
			<Dialog.Title>Trainer hinzufügen</Dialog.Title>
			<Dialog.Description>
				Wähle einen Benutzer aus, um ihn als Trainer hinzuzufügen.
			</Dialog.Description>
		</Dialog.Header>
		<Command.Root class="overflow-hidden rounded-t-none border-t bg-transparent">
			<Command.Input placeholder="Benutzer suchen..." />
			<Command.List>
				<Command.Empty>Keine Benutzer gefunden</Command.Empty>
				<Command.Group class="p-2">
					{#each data.users as user}
						<Command.Item
							class="flex items-center px-2"
							onSelect={() => {
								if (selectedUsers.includes(user)) {
									selectedUsers = selectedUsers.filter((selectedUser) => selectedUser !== user);
								} else {
									selectedUsers = [...data.users].filter((u) =>
										[...selectedUsers, user].includes(u)
									);
								}
								console.log(selectedUsers);
							}}
						>
							<Avatar.Root>
								<Avatar.Image src={user.avatar} alt="Image" />
								<Avatar.Fallback>{user.name[0]}</Avatar.Fallback>
							</Avatar.Root>
							<div class="ml-2">
								<p class="text-sm font-medium leading-none">
									{user.name}
								</p>
								<p class="text-muted-foreground text-sm">
									{user.email}
								</p>
							</div>
							{#if selectedUsers.includes(user)}
								<Check class="text-primary ml-auto flex h-5 w-5" />
							{/if}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
		<Dialog.Footer class="flex items-center border-t p-4 sm:justify-between">
			{#if selectedUsers.length}
				<div class="flex -space-x-2 overflow-hidden">
					{#each selectedUsers as user}
						<div class="flex items-center space-x-2">
							<Avatar.Root class="border-background inline-block border-2">
								<Avatar.Image src={user.avatar} />
								<Avatar.Fallback>{user.name[0]}</Avatar.Fallback>
							</Avatar.Root>
							<p class="text-sm font-medium leading-none">{user.name}</p>
						</div>
					{/each}
				</div>
			{:else}
				<p class="text-muted-foreground text-sm">Wähle einen Benutzer aus, um ihn hinzuzufügen.</p>
			{/if}
			<Button disabled={selectedUsers.length == 0} on:click={() => (userSelectionOpen = false)}
				>Weiter</Button
			>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

<Dialog.Root bind:open={addTrainingSchedule}>
	<Dialog.Content class="gap-0 p-0 outline-none sm:max-w-1/2">
		<Dialog.Header class="px-4 pb-4 pt-5">
			<Dialog.Title>Trainingszeit hinzufügen</Dialog.Title>
			<Dialog.Description>Erstelle eine neue Trainingszeit für das Team.</Dialog.Description>
		</Dialog.Header>
		<form
			class="grid gap-4 p-4"
			bind:this={formElement}
			action="?/createTrainingSchedule"
			method="post"
			use:enhance={() => {
				return ({ update }) => {
					addTrainingSchedule = false;
					update({ invalidateAll: true });
				};
			}}
		>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="day" class="text-right">Trainingstag</Label>
				<Select.Root portal={null}>
					<Select.Trigger class="col-span-3">
						<Select.Value placeholder="Wähle einen Trainingstag aus" />
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							<Select.Label>Wochentag</Select.Label>
							{#each weekdays as weekday}
								<Select.Item value={weekday.value} label={weekday.label}
									>{weekday.label}</Select.Item
								>
							{/each}
						</Select.Group>
					</Select.Content>
					<Select.Input name="day" id="day" />
				</Select.Root>
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="description" class="text-right">Zeitraum</Label>

				<div class="col-span-3 flex space-x-3 items-center">
					<Input type="time" name="time_start" value="18:00" class="w-fit" />
					<p class="">bis</p>
					<Input type="time" name="time_end" id="description" class="w-fit" value="19:00" />
				</div>
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="name" class="text-right">Trainingsort</Label>
				<Input
					name="location"
					placeholder="z.B. Alianz Arena..."
					class="col-span-3"
					value="Alianz Arena"
				/>
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="location_url" class="text-right">Link zum Ort</Label>
				<Input
					type="url"
					name="location_url"
					id="location_url"
					placeholder="z.B. Google Maps Link"
					class="col-span-3"
					value="https://localhost:5173/contact"
				/>
			</div>
		</form>
		<Dialog.Footer class="flex items-center border-t p-4 sm:justify-between">
			<Button class="ml-auto">Erstellen</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
