<script>
    export let res;
    import { goto } from '@sveltech/routify'; 

    const openReviewDetail = ()=>{
        $goto(`../reviewdetail/${res.name.replace(/\s/g, '*')}`);
    }
</script>
<div on:click={openReviewDetail}>
    <h3>{res.name}</h3>
    <span>{res.address}</span>
</div>

<style>
    h3{
        font-size: 18px;
        font-weight: bold;
        margin: 0;
        transition: 0.3s;
    }
    span{
        font-size: 14px;
    }
    div{
        cursor: pointer;
        margin-bottom: 15px;
        border-radius: 4px;
        border: 1px solid #ddd;
        padding: 10px;
        transition: 0.3s;
    }
    div:hover{
        box-shadow: 2px 3px 4px rgba(0,0,0,0.2);
        background: rgba(0,0,0,0.1);
    }
    div:hover h3{
        color: white;
        text-shadow: 2px 3px 4px rgba(0,0,0,0.2);
    }
</style>