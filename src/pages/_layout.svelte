<script>
import Nav from "../Nav.svelte";
</script>


<div class="site-con">
<Nav />
<slot />
</div>


<style>
    .site-con{
        width: 100%;
        height: 100%;
        padding: 0px;
        margin: 0px;
        background-image: url("../img/bg.jpg");
        background-repeat: no-repeat; /* Do not repeat the image */
        background-position: center bottom;
        background-size: cover; 
        overflow-x: hidden;
        overflow-y: auto;
    }
</style>