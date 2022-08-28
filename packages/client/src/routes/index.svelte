<script>
	import { onMount } from 'svelte'

	import UrlModal from '../components/UrlModal.svelte'
	import StatsModal from '../components/StatsModal.svelte'
	import Footer from '../components/Footer.svelte'

	let url = ''
	let error = ''
	let shortenedUrl = {}

	let urlModal = null
	let statsModal = null
	let origin = ''

	onMount(() => {
		urlModal = new bootstrap.Modal(document.getElementById('urlmodal'))
		statsModal = new bootstrap.Modal(document.getElementById('statsmodal'))

		origin = location.origin
	})

	async function shorten() {
		if (!url)
			return error = 'Url is required'

		const { API_URL } = env
		const res = await fetch(`${API_URL}/shorten?url=${url}&hostname=${origin}`, { method: 'POST' })
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

<UrlModal {...shortenedUrl} />
<StatsModal on:search={stats} />

<div class="container">
	<div class="text-center mt-5 mb-4">
		<h1 style="font-size: 1.7rem">preon</h1>
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

	<section class="mt-5">
		<h3>• How to use</h3>
		<ul>
			<li>
				Paste the url that you want to shorten. <br>
				(Please note that you need to include the http:// or https://) <br>
				Then click "Shorten" Button
			</li>
			<li>
				To see how many clicks your shortened url has <br>
				Click the "Url Stats" Button then paste the id of your shortend url <br>
				You can see this id at the end of your url <br>
				Example: {origin}/8TW_3jxl Then Your id is 8TW_3jxl
			</li>
		</ul>
	</section>

	<section class="mt-4">
		<h3>• Faq</h3>
		<ol>
			<li>
				Why preon? <br>
				- I want to name this project on the smallest thing on the world
				and preon is what i found
			</li>
		</ol>
	</section>
</div>

<Footer />

<style>
	.btn-link {
		text-decoration: none;
	}
</style>
