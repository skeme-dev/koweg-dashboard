<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import SidebarNav from '$lib/components/posts/editor/sidebar-nav.svelte';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	const sidebarNavItems = data.departments.map((item) => ({
		title: item.label,
		href: '/departments/' + item.id
	}));
</script>

<div class="hidden space-y-6 p-10 pb-16 md:block">
	<div class="space-y-0.5">
		<h2 class="text-2xl font-bold tracking-tight">Abteilungen verwalten</h2>
		<p class="text-muted-foreground">Verwalte alle Abteilungen, sowie deren Teams.</p>
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
