<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { invalidate } from '$app/navigation';
	import { page } from '$app/state';

	let { data }: { data: PageData } = $props();

	let currentDepartmentName = data.department.label;
	let currentDepartmentDescription = $state(data.department.description);
</script>

<Card.Root class="w-full">
	<Card.Header>
		<Card.Title>Abteilungsinformationen</Card.Title>
		<Card.Description>Bearbeite die Abteilungsinformationen.</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="grid gap-6">
			<div class="grid gap-3">
				<Label for="name">Name</Label>
				<Input id="name" type="text" class="w-full" bind:value={currentDepartmentName} />
			</div>
			<div class="grid gap-3">
				<Label for="description">Beschreibung</Label>
				<Textarea id="description" bind:value={currentDepartmentDescription} class="min-h-32" />
			</div>
		</div>
	</Card.Content>
</Card.Root>
