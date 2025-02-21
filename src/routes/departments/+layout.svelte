<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import SidebarNav from '$lib/components/posts/editor/sidebar-nav.svelte';
	import { invalidate } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import { CirclePlus } from 'lucide-svelte';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	const sidebarNavItems = data.departments.map((item) => ({
		title: item.label,
		href: '/departments/' + item.id
	}));
</script>

<div class="space-y-6 p-10 pb-16 md:block">
	<div class="flex items-end justify-between">
		<div class="space-y-0.5">
			<h2 class="text-2xl font-bold tracking-tight">Abteilungen verwalten</h2>
			<p class="text-muted-foreground">Verwalte alle Abteilungen, sowie deren Teams.</p>
		</div>
		<Button size="lg" class="gap-2 text-sm">
			<CirclePlus class="h-3.5 w-3.5" />
			Abteilung hinzufügen
		</Button>
	</div>
	<Separator class="my-6" />
	<div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
		<aside class="-mx-4 lg:w-1/5">
			<SidebarNav items={sidebarNavItems} />
		</aside>
		<div class="flex-1 lg:max-w-full">
			{@render children()}
		</div>
	</div>
</div>
