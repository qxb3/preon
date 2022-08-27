<script>
	import { onMount } from 'svelte'

	import UrlModal from '../components/UrlModal.svelte'
	import StatsModal from '../components/StatsModal.svelte'

	let url = ''
	let error = ''
	let shortenedUrl = {}

	let urlModal = null
	let statsModal = null

	onMount(() => {
		urlModal = new bootstrap.Modal(document.getElementById('urlmodal'))
		statsModal = new bootstrap.Modal(document.getElementById('statsmodal'))
	})

	async function shorten() {
		if (!url)
			return error = 'Url is required'

		const { API_URL } = env
		const res = await fetch(`${API_URL}/shorten?url=${url}&hostname=${location.origin}`, { method: 'POST' })
		const data = await res.json()

		if (res.status !== 200)
			return error = data.message

		shortenedUrl = data
		error = ''

		urlModal.show()
	}

	function stats({ detail }) {
		shortenedUrl = detail

		statsModal.hide()
		urlModal.show()
	}
</script>

<div class="container">
	<div class="text-center mt-5 mb-4">
		<h1 style="font-size: 1.7rem;">quark</h1>
		<p style="font-size: 1.4rem;">A free url shortener</p>
	</div>

	<form on:submit|preventDefault={shorten} novalidate>
		<div class="input-group has-validation">
			<input class="form-control" class:is-invalid={error} bind:value={url} type="url" placeholder="https://google.com">
			<button class="btn btn-primary" class:btn-danger={error} type="submit">Shorten</button>
			<div class="invalid-feedback">{error}</div>
		</div>
	</form>

	<div class="text-center mt-3">
		<button on:click={() => statsModal.show()} class="btn btn-link">Url Stats</button>
	</div>

	<UrlModal {...shortenedUrl} />
	<StatsModal on:search={stats} />
</div>
