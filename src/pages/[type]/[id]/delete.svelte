<script>
  export let type, id;
  import { params } from "@sveltech/routify";
  $: type = $params.type;
</script>

<h1>Are you sure you want to delete: {id} of type: {type}</h1>
<button>Yes: confirm</button>
<button>No: cancel</button>
