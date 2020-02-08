<script>
  export let slug;
  import { url } from "@sveltech/routify";
</script>

<h1>Blog article: {slug}</h1>
{#each [0, 1, 2, 3, 4] as i}
  <p>Dummy text: {i} for {slug}.</p>
{/each}

<a href={$url(`${slug}/delete`)}>Delete</a>