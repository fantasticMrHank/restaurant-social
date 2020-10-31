<script>
    import helpManager from '../Services/helpManager';
    import userStore from '../stores/userStore';
    import OtherReviewDataStore from '../stores/OtherReviewDataStore';
    import reviewDataStore from '../stores/reviewDataStore';

    export let review;

    const markHelpful =() =>{
        helpManager("reviews", review.id, $userStore.email, "addHelpful", (list)=>{
            $OtherReviewDataStore = $OtherReviewDataStore.map(
                rev => {                    
                    if(rev.id == review.id){
                        return {...review, helpful:list}
                    }  
                    else{
                        return {...review}
                    }              
                }
            )

            $reviewDataStore = $reviewDataStore.map(
                rev => {                    
                    if(rev.id == review.id){
                        return {...review, helpful:list}
                    }  
                    else{
                        return {...review}
                    }              
                }
            )
        })
    }
    
    const markUnHelpful =() =>{
        helpManager("reviews", review.id, $userStore.email, "notHelpful", (list)=>{
            $OtherReviewDataStore = $OtherReviewDataStore.map(
                rev => {                    
                    if(rev.id == review.id){
                        return {...review, unhelpful:list}
                    }  
                    else{
                        return {...review}
                    }              
                }
            )

            $reviewDataStore = $reviewDataStore.map(
                rev => {                    
                    if(rev.id == review.id){
                        return {...review, unhelpful:list}
                    }  
                    else{
                        return {...review}
                    }              
                }
            )
        })
    }

    
</script>


<div class="helpful-area">
    <div class="review-btn helpful-btn" on:click={markHelpful}>Helpful</div>  
    {#if review.helpful && review.helpful.length}
        <span class="helful-num">{review.helpful.length}</span> 
    {:else}
        <span class="helful-num">0</span> 
    {/if}
    <div class="review-btn unhelpful-btn" on:click={markUnHelpful}>Not Helpful</div>  
    
    {#if review.unhelpful && review.unhelpful.length}
        <span class="helful-num">{review.unhelpful.length}</span>      
    {:else}
        <span class="helful-num">0</span> 
    {/if}
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