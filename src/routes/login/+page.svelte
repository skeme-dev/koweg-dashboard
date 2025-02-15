<script lang="ts">
	import type { PageData } from './$types';

	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Login | SV Koweg e.V.</title>
</svelte:head>

<div class="w-full h-screen lg:grid lg:grid-cols-2">
	<div class="flex items-center justify-center py-12">
		<div class="mx-auto grid w-[350px] gap-6">
			<div class="grid gap-2 text-center">
				<h1 class="text-3xl font-bold">Login</h1>
				<p class="text-muted-foreground text-balance">Anmeldedaten eingeben, um dich anzumelden</p>
			</div>
			<div>
				<form class="grid gap-4" action="?/login" method="post">
					<div class="grid gap-2">
						<Label for="email">Email</Label>
						<Input name="email" id="email" type="email" placeholder="m@example.com" required />
					</div>
					<div class="grid gap-2">
						<div class="flex items-center">
							<Label for="password">Passwort</Label>
						</div>
						<Input name="password" id="password" type="password" required />
					</div>
					<Button type="submit" class="w-full">Anmelden</Button>
				</form>
			</div>
			<div class="mt-4 text-center text-sm">
				<a href="##" class="underline"> Passwort vergessen? </a>
			</div>
		</div>
	</div>
	<div class="bg-muted hidden lg:block">
		<img
			src="/images/placeholder.svg"
			alt="placeholder"
			width="1920"
			height="1080"
			class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
		/>
	</div>
</div>
