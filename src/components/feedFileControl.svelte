<script>
    import XLSX from 'xlsx';
    import userManager from '../Services/userManager';

    let theFile;
    let hideBTN = true;

    let userList =[];

    const grabSpreadsheet = (e) =>{
        theFile = e.target.files[0];

        if(theFile){
            hideBTN = false;
        }
    }

    const readFile =()=>{
        var FR = new FileReader();
        FR.onload = function(e) {
            var data = new Uint8Array(e.target.result);
            var workbook = XLSX.read(data, {type: 'array'});
            var firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            var result = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

            userList = result;

            registerUsers(userList);
        };
        FR.readAsArrayBuffer(theFile);
    }

    const registerUsers =(list) =>{
        let validList=[];
        list.map(u =>{
            if(u[0] !="email"){
                validList.push(u);
            }
        });

        userManager(validList);
    }

</script>




<div>
    
    <input type="file" id="feed-uploader" on:change={grabSpreadsheet} class="file-uploader">
    <label for="feed-uploader" class="feed-btn">Choose User Feed File</label>
    <div class="review-btn uploader-btn" class:hidden={hideBTN} on:click={readFile}>Submit File</div>
</div>


<style>
    .hidden{
        display: none;
    }
    .feed-btn{
        padding: 10px;
        width: max-content;
        font-weight: 500;
        color: green;
        border: 2px solid green;
        border-radius: 6px;
        cursor: pointer;
        margin: 20px auto;
        text-align: center;
    }
    .file-uploader{
        display: none;
    }
    .uploader-btn{
        background: green;
        font-size: 12px;
        font-weight: bold;
        transition: .4s;
    }

    .uploader-btn:hover{
        background: rgb(141, 190, 141);
    }
</style>