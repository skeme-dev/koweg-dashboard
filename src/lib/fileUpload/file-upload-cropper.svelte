<script lang="ts">
	import Cropper from 'cropperjs';
	// import 'cropperjs/dist/cropper.css';
	import { onMount } from 'svelte';

	export let imageUrl: string;

	let imageElement = null;
	let cropper;

	export function getCroppedImage() {
		return new Promise((resolve, reject) => {
			if (!cropper) {
				reject(new Error('Cropper not initialized'));
			}

			cropper.getCroppedCanvas().toBlob((blob) => {
				console.log(blob);
				resolve(blob);
			});
		});
	}

	function initCropper() {
		if (cropper) {
			cropper.destroy();
		}

		if (imageElement) {
			cropper = new Cropper(imageElement, {
				aspectRatio: 16 / 9, // Seitenverhältnis 1:1 (kann geändert werden)
				viewMode: 2,
				autoCropArea: 1,
				responsive: true
			});
		}
	}

	onMount(async () => {
		initCropper();
	});
</script>

<div class="container">
	{#if imageUrl}
		<img src={imageUrl} bind:this={imageElement} alt="" />
	{/if}
</div>

<style>
	.container {
		text-align: center;
		margin-top: 20px;
		display: block;
		height: 300px;
		width: 100%;
	}
</style>
