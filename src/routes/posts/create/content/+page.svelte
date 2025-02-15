<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="space-y-6">
	<div>
		<h3 class="text-lg font-medium">Inhalt</h3>
		<p class="text-muted-foreground text-sm">Füge den Inhalt deines Berichts ein.</p>
	</div>
	<Separator class="w-full mb-3" />
	<div class="flex flex-1 flex-col space-y-2">
		<Textarea
			id="input"
			placeholder="Berichtinhalt hier einfügen..."
			class="flex-1 lg:min-h-[580px]"
		/>
		<Button class="w-fit ml-auto">Speichern</Button>
	</div>
</div>
