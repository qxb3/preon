<script context="module">
	export async function preload(page) {
		const { id } = page.params

		const res = await this.fetch(`${process.env.API_URL}/click?id=${id}`, { method: 'POST' })
		const data = await res.json()

		if (res.status !== 200)
			return this.error(data.statusCode, data.message)

		this.redirect(302, data.origin)
	}
</script>
