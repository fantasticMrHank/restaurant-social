<script>

    export let review;
    const markHelpful =() =>{
        console.log("helpfull!!", review.id);
    }
    
    const markUnHelpful =() =>{
        console.log("not helpfull!!", review.id);
        
    }
</script>


<div class="helpful-area">
    <div class="review-btn helpful-btn" on:click={markHelpful}>Helpful</div>  
    <span class="helful-num">2</span> 
    <div class="review-btn unhelpful-btn" on:click={markUnHelpful}>Not Helpful</div>  
    <span class="helful-num">2</span>      
</div>


<style>
    .helful-num{
        padding-top: 23px;
    }
    .helpful-area{
        display: grid;
        grid-template-columns: 85px 20px 100px 10px;
    }
    .helpful-btn, .unhelpful-btn{
        width: max-content;  
        transition: 0.3s;  
        font-weight: bold;
        font-size: 11px;    
        
    }
    .helpful-btn{
        background: green;
    }
    .unhelpful-btn{
        background: #800000;
    }
    .helpful-btn:hover{
        background: rgb(117, 200, 117);
    }
    .unhelpful-btn:hover{
        background: #ff0000;
    }
</style>