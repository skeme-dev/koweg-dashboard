<script lang="ts">
	import '../app.css';

	import File from 'lucide-svelte/icons/file';
	import House from 'lucide-svelte/icons/house';
	import ChartLine from 'lucide-svelte/icons/chart-line';
	import ListFilter from 'lucide-svelte/icons/list-filter';
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import Package from 'lucide-svelte/icons/package';
	import Package2 from 'lucide-svelte/icons/package-2';
	import PanelLeft from 'lucide-svelte/icons/panel-left';
	import CirclePlus from 'lucide-svelte/icons/circle-plus';
	import Search from 'lucide-svelte/icons/search';
	import Settings from 'lucide-svelte/icons/settings';
	import ShoppingCart from 'lucide-svelte/icons/shopping-cart';
	import UsersRound from 'lucide-svelte/icons/users-round';

	import { Badge } from '$lib/components/ui/badge/index.js';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { BookOpen, Building2, Files, Inbox, Megaphone, Volleyball } from 'lucide-svelte';
	import { page } from '$app/state';
	import FileUploadDialog from '$lib/fileUpload/file-upload-dialog.svelte';
	import DeleteDialog from '$lib/components/delete-dialog/delete-dialog.svelte';
	import Sonner from '$lib/components/ui/sonner/sonner.svelte';
	import UserPickerDialog from '$lib/components/user-picker/user-picker-dialog.svelte';

	let { children } = $props();
	let logoutForm = $state();

	function getBreadcrumb() {
		const routes = page.url.pathname.split('/');
	}

	getBreadcrumb();
</script>

<Sonner />

{#if page.url.pathname.startsWith('/login')}
	{@render children()}
{:else}
	<FileUploadDialog />
	<UserPickerDialog users={page.data.users} />
	<DeleteDialog />

	<div class="bg-muted/40 flex min-h-screen w-full flex-col">
		<aside class="bg-background fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r sm:flex">
			<nav class="flex flex-col items-center gap-4 px-2 sm:py-5">
				<a
					href="##"
					class="bg-primary text-primary-foreground group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold md:h-8 md:w-8 md:text-base"
				>
					<Package2 class="h-4 w-4 transition-all group-hover:scale-110" />
					<span class="sr-only">Acme Inc</span>
				</a>
				<Tooltip.Root>
					<Tooltip.Trigger asChild let:builder>
						<a
							href="##"
							class="text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
							use:builder.action
							{...builder}
						>
							<House class="h-5 w-5" />
							<span class="sr-only">Dashboard</span>
						</a>
					</Tooltip.Trigger>
					<Tooltip.Content side="right">Dashboard</Tooltip.Content>
				</Tooltip.Root>
				<!-- <Tooltip.Root>
					<Tooltip.Trigger asChild let:builder>
						<a
							href="/teams/370ajc41u9q7hxm"
							class="text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
							use:builder.action
							{...builder}
						>
							<Volleyball class="h-5 w-5" />
							<span class="sr-only">Teams</span>
						</a>
					</Tooltip.Trigger>
					<Tooltip.Content side="right">Teams</Tooltip.Content>
				</Tooltip.Root> -->
				<Tooltip.Root>
					<Tooltip.Trigger asChild let:builder>
						<a
							href="/users"
							class="text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
							use:builder.action
							{...builder}
						>
							<UsersRound class="h-5 w-5" />
							<span class="sr-only">Benutzer</span>
						</a>
					</Tooltip.Trigger>
					<Tooltip.Content side="right">Benutzer</Tooltip.Content>
				</Tooltip.Root>
				<Tooltip.Root>
					<Tooltip.Trigger asChild let:builder>
						<a
							href="/posts/view/my"
							class="text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
							use:builder.action
							{...builder}
						>
							<BookOpen class="h-5 w-5" />
							<span class="sr-only">Berichte</span>
						</a>
					</Tooltip.Trigger>
					<Tooltip.Content side="right">Berichte</Tooltip.Content>
				</Tooltip.Root>
				<Tooltip.Root>
					<Tooltip.Trigger asChild let:builder>
						<a
							href="/inbox"
							class="text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
							use:builder.action
							{...builder}
						>
							<Inbox class="h-5 w-5" />
							<span class="sr-only">Anfragen</span>
						</a>
					</Tooltip.Trigger>
					<Tooltip.Content side="right">Anfragen</Tooltip.Content>
				</Tooltip.Root>
				<Tooltip.Root>
					<Tooltip.Trigger asChild let:builder>
						<a
							href="/departments"
							class="text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
							use:builder.action
							{...builder}
						>
							<Building2 class="h-5 w-5" />
							<span class="sr-only">Abteilungen</span>
						</a>
					</Tooltip.Trigger>
					<Tooltip.Content side="right">Abteilungen</Tooltip.Content>
				</Tooltip.Root>
				<Tooltip.Root>
					<Tooltip.Trigger asChild let:builder>
						<a
							href="/files"
							class="text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
							use:builder.action
							{...builder}
						>
							<Files class="h-5 w-5" />
							<span class="sr-only">Dateien</span>
						</a>
					</Tooltip.Trigger>
					<Tooltip.Content side="right">Dateien</Tooltip.Content>
				</Tooltip.Root>
				<Tooltip.Root>
					<Tooltip.Trigger asChild let:builder>
						<a
							href="/sponsors"
							class="text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
							use:builder.action
							{...builder}
						>
							<Megaphone class="h-5 w-5" />
							<span class="sr-only">Sponsoren</span>
						</a>
					</Tooltip.Trigger>
					<Tooltip.Content side="right">Sponsoren</Tooltip.Content>
				</Tooltip.Root>
			</nav>
			<nav class="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
				<Tooltip.Root>
					<Tooltip.Trigger asChild let:builder>
						<a
							href="/settings"
							class="text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
							use:builder.action
							{...builder}
						>
							<Settings class="h-5 w-5" />
							<span class="sr-only">Einstellungen</span>
						</a>
					</Tooltip.Trigger>
					<Tooltip.Content side="right">Einstellungen</Tooltip.Content>
				</Tooltip.Root>
			</nav>
		</aside>
		<div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
			<header
				class="bg-background sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
			>
				<Sheet.Root>
					<Sheet.Trigger asChild let:builder>
						<Button builders={[builder]} size="icon" variant="outline" class="sm:hidden">
							<PanelLeft class="h-5 w-5 p-6 m-6" />
							<span class="sr-only">Toggle Menu</span>
						</Button>
					</Sheet.Trigger>
					<Sheet.Content side="left" class="sm:max-w-xs">
						<nav class="grid gap-6 text-lg font-medium">
							<a
								href="##"
								class="bg-primary text-primary-foreground group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold md:text-base"
							>
								<Package2 class="h-5 w-5 transition-all group-hover:scale-110" />
								<span class="sr-only">Acme Inc</span>
							</a>
							<a
								href="/"
								class="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
							>
								<House class="h-5 w-5" />
								Dashboard
							</a>
							<!-- <a
								href="/teams/370ajc41u9q7hxm"
								class="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
							>
								<Volleyball class="h-5 w-5" />
								Teams
							</a> -->
							<a href="/users" class="text-foreground flex items-center gap-4 px-2.5">
								<UsersRound class="h-5 w-5" />
								Benutzer
							</a>
							<a
								href="/posts/view/my"
								class="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
							>
								<BookOpen class="h-5 w-5" />
								Berichte
							</a>
							<a
								href="/inbox"
								class="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
							>
								<Inbox class="h-5 w-5" />
								Anfragen
							</a>
							<a
								href="/departments"
								class="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
							>
								<Building2 class="h-5 w-5" />
								Abteilungen
							</a>
							<a
								href="/sponsors"
								class="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
							>
								<Megaphone class="h-5 w-5" />
								Sponsoren
							</a>
						</nav>
					</Sheet.Content>
				</Sheet.Root>
				<Breadcrumb.Root class="hidden md:flex">
					<Breadcrumb.List>
						<Breadcrumb.Item>
							<Breadcrumb.Link href="##">Dashboard</Breadcrumb.Link>
						</Breadcrumb.Item>
						<!-- <Breadcrumb.Separator />
					<Breadcrumb.Item>
						<Breadcrumb.Link href="##">Products</Breadcrumb.Link>
					</Breadcrumb.Item>
					<Breadcrumb.Separator />
					<Breadcrumb.Item>
						<Breadcrumb.Page>All Products</Breadcrumb.Page>
					</Breadcrumb.Item> -->
					</Breadcrumb.List>
				</Breadcrumb.Root>
				<div class="relative ml-auto flex-1 md:grow-0">
					<!-- <Search class="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
				<Input
					type="search"
					placeholder="Suchen..."
					class="bg-background w-full rounded-lg pl-8 md:w-[200px] lg:w-[336px]"
				/> -->
				</div>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger asChild let:builder>
						<Button
							builders={[builder]}
							variant="outline"
							size="icon"
							class="overflow-hidden rounded-full"
						>
							<!-- <img
							src="/images/placeholder-user.jpg"
							width={36}
							height={36}
							alt="Avatar"
							class="overflow-hidden rounded-full"
						/> -->
							T
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="end">
						<DropdownMenu.Label>Mein Account</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>Einstellungen</DropdownMenu.Item>
						<DropdownMenu.Item>Hilfe</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<form bind:this={logoutForm} method="post" action="/login?/logout">
							<DropdownMenu.Item on:click={() => logoutForm.submit()}>Abmelden</DropdownMenu.Item>
						</form>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</header>

			{@render children()}
		</div>
	</div>
{/if}
