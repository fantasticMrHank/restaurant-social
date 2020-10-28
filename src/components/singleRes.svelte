<script>
    export let res;
    import { goto } from '@sveltech/routify'; 

    const openReviewDetail = ()=>{
        $goto(`../reviewdetail/${res.name.replace(/\s/g, '*')}`);
    }
</script>
<div on:click={openReviewDetail}>
    <h3>{res.name}</h3>
    <p>{res.address}</p>
</div>

<style>
    div{
        cursor: pointer;
    }
    div:hover{
        opacity: 0.5;
    }
</style>