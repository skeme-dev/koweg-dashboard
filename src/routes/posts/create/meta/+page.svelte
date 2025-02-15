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
		<h3 class="text-lg font-medium">Metadaten</h3>
		<p class="text-muted-foreground text-sm">
			Lege für deinen Bericht Titel, Beschreibung und ein Bild fest.
		</p>
	</div>
	<Separator class="w-full" />
	<form class="flex flex-col w-full gap-10" action="" method="post">
		<div class="flex w-full max-w-sm flex-col gap-2">
			<Label for="title">Titel</Label>
			<Input name="title" type="text" id="title" placeholder="Neuer Bericht" />
			<p class="text-muted-foreground text-sm">
				Der Titel wird als Kopfzeile des Berichts angezeigt.
			</p>
		</div>
		<div class="flex w-full max-w-sm flex-col gap-2">
			<Label for="description">Beschreibung</Label>
			<Textarea
				name="description"
				type="text"
				id="description"
				placeholder="Kurze Beschreibung zum Bericht"
			/>
			<!-- <p class="text-muted-foreground text-sm">
				Der Titel wird als Kopfzeile des Berichts angezeigt.
			</p> -->
		</div>
		<div class="flex w-full max-w-sm flex-col gap-2">
			<Label for="image">Bild</Label>
			<Input name="image" type="file" id="image" accept="image/*" />
			<p class="text-muted-foreground text-sm">
				Dieses Bild wird dann als Titelbild des Berichts angezeigt.
			</p>
		</div>

		<Button type="submit" class="ml-auto w-fit">Speichern</Button>
	</form>
</div>
