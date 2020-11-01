<script>
    import {storage} from '../firebase';

    let images =[];
    let imagePaths=[];

    const trackFiles =(e)=>{
        images =[];
        imagePaths =[];
        for (var i = 0; i < e.target.files.length; i++) {
            images.push(e.target.files[i]);
        }
    }

    const uploadFiles =()=>{
        const storageRef = storage.ref();

        images.map(async img =>{
            let fileRef = storageRef.child(img.name);
            await fileRef.put(img);
            const singleImgPath = await fileRef.getDownloadURL();
            imagePaths.push(singleImgPath);

            if(imagePaths.length == images.length){
                console.log("got all paths again: ", imagePaths);
            }
        })
    }
</script>




<div class="uploader-control">
    <h3>Upload Images</h3>
    <input type="file" id="inputer" multiple on:change={trackFiles}>
    <div class="review-btn uploader-btn" on:click={uploadFiles}>Upload</div>
</div>



<style>
    .uploader-btn{
        margin-left: 0px;
    }
    .uploader-control{
        padding: 20px;
    }
</style>