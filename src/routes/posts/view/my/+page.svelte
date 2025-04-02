<script lang="ts">
	import PostCard from '$lib/components/PostCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	console.log(data);
</script>

<div class="w-full grid grid-cols-3 gap-6">
	{#each data.posts as post}
		<PostCard {post} />
	{/each}
</div>
