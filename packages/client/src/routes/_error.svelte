<script>
	export let status
	export let error

	const dev = process.env.NODE_ENV === 'development'
</script>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<div class="container mt-5 px-1">
	<div class="text-center">
		<h1>{status}</h1>
		<p>{error.message}</p>
	</div>

	{#if dev && error.stack}
		<pre>{error.stack}</pre>
	{/if}
</div>
