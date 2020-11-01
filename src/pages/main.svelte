<script>
    import {fly} from 'svelte/transition';
import MultiImageUploader from '../components/multiImageUploader.svelte';
    
    
</script>

<div class="main-bg" transition:fly="{{ y: 900, duration: 500 }}">
    <MultiImageUploader />
</div>


<style>
    
   .main-bg{
        opacity: 0.5;
        width: 100%;
        height: 100%;
        background-position: center;
        background-image: url("img/main.jpg");
        background-repeat: no-repeat; /* Do not repeat the image */
        background-size: cover; /* Resize the background image to cover the entire container */
    }
</style>