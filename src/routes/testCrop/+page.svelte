<script>
	import { onMount, tick } from 'svelte';
	import Cropper from 'cropperjs';
	import 'cropperjs/dist/cropper.css';

	let imageSrc = '';
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
				aspectRatio: 1, // Seitenverhältnis 1:1 (kann geändert werden)
				viewMode: 2
			});
		}
	}

	function cropImage() {
		if (cropper) {
			const croppedCanvas = cropper.getCroppedCanvas();
			if (croppedCanvas) {
				const croppedImage = croppedCanvas.toDataURL('image/png');
				downloadImage(croppedImage);
			}
		}
	}

	function downloadImage(dataUrl) {
		const link = document.createElement('a');
		link.href = dataUrl;
		link.download = 'cropped-image.png';
		link.click();
	}
</script>

<div class="container">
	<input type="file" accept="image/*" on:change={handleFileUpload} />
	{#if imageSrc}
		<div>
			<img bind:this={imageElement} src={imageSrc} alt="Bild zum Zuschneiden" />
		</div>
		<button on:click={cropImage}>Bild zuschneiden & herunterladen</button>
	{/if}
</div>

<style>
	.container {
		text-align: center;
		margin-top: 20px;
	}
	img {
		max-width: 100%;
		display: block;
		margin: auto;
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
