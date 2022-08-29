<script>
  import { createEventDispatcher } from 'svelte'
  import config from '../config'

  const dispatch = createEventDispatcher()
  let error = ''
  let id = ''

  async function search() {
    if (!id)
      return error = 'id is required'

    const { API_URL } = env
    const res = await fetch(`${API_URL}/get?id=${id.replace(`${location.origin}/`, '')}`)
    const data = await res.json()

    if (res.status !== 200)
      return error = data.message

    error = ''
    dispatch('search', { ...data })
  }
</script>

<div class="modal fade" id="statsmodal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Url Stats</h4>
        <button class="btn-close" data-bs-dismiss="modal"></button>
      </div>

      <div class="modal-body">
        <div class="container">
          <div class="my-1">
            <label for="inp" class="form-label">Search</label>
            <input bind:value={id} class="form-control" class:is-invalid={error} id="inp" type="text" placeholder="8TW_3jxl or {config.APP_URL}/8TW_3jxl">
            <div class="invalid-feedback">{error}</div>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button on:click={search} class="btn btn-primary">Search</button>
      </div>
    </div>
  </div>
</div>
