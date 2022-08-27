<script>
  import { onMount } from 'svelte'
  import Clipboard from 'clipboard'

  export let id
  export let url
  export let clicks

  let copiedSuccess = false

  onMount(() => {
    const clipboard = new Clipboard('.btn')

    clipboard.on('success', () => {
      copiedSuccess = true
    })
  })

  function selectAll() {
    this.setSelectionRange(0, this.value.length)
  }

  function close() {
    copiedSuccess = false
  }
</script>

<div class="modal fade" id="urlmodal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Success</h4>
        <button on:click={close} class="btn-close" data-bs-dismiss="modal"></button>
      </div>

      <div class="modal-body">
        <div class="container">
          <div>
            <label class="form-label" for="url">ID: {id}</label>
            <div class="input-group">
              <input on:click={selectAll} class="form-control" id="url" type="url" value={url} readonly>
              <button class="btn btn-primary" data-clipboard-target="#url">Copy!</button>
            </div>

            {#if copiedSuccess}
              <p class="text-success">Copied!</p>
            {/if}
          </div>

          <div class="text-center mt-5">
            <h1>Clicks: {clicks}</h1>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button on:click={close} class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
