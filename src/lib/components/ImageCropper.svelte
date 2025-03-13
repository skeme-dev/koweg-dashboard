<script lang="ts">
	import { onMount, tick } from 'svelte';
	import Cropper from 'cropperjs';
	import 'cropperjs/dist/cropper.css';
	import { Button } from './ui/button/index';

	export let imageFile: File;
	export let croppedImage: string;
	export let enable: boolean;

	let imageSrc = URL.createObjectURL(imageFile);
	let imageElement;
	let cropper;

	function handleFileUpload(event) {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = async () => {
				imageSrc = reader.result;
				await tick(); // Sicherstellen, dass das Bild gerendert wurde
				initCropper();
			};
			reader.readAsDataURL(file);
		}
	}

	function initCropper() {
		if (cropper) {
			cropper.destroy(); // Verhindert doppelte Instanzen
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

	function cropImage() {
		if (cropper) {
			const croppedCanvas = cropper.getCroppedCanvas();
			if (croppedCanvas) {
				croppedImage = croppedCanvas.toDataURL('image/png');
				// downloadImage(croppedImage);
				enable = false;
			}
		}
	}

	onMount(async () => {
		// Sicherstellen, dass das Bild gerendert wurde
		initCropper();
		enable = true;
	});

	//
</script>

<div class="container">
	{#if imageSrc}
		<div class="cc">
			<img bind:this={imageElement} src={imageSrc} alt="Bild zum Zuschneiden" />
		</div>
		<Button class="mt-3" on:click={cropImage} size="sm" variant="outline">Bild zuschneiden</Button>
	{/if}
</div>

<style>
	.container {
		text-align: center;
		margin-top: 20px;
		display: block;
		height: calc(100vh * (1 / 3));
		width: 100%;
	}
	.cc {
		max-width: 100% !important;
		height: 100% !important;
	}
	img {
		width: 100%;
		height: 100%;
		display: block;
		margin: auto;
		object-fit: cover;
	}
	button {
		margin-top: 10px;
		padding: 8px 12px;
		background: #007bff;
		color: white;
		border: none;
		cursor: pointer;
		border-radius: 5px;
	}
	button:hover {
		background: #0056b3;
	}
</style>
