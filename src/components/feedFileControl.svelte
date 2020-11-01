<script>
    import XLSX from 'xlsx';

    let theFile;

    const grabSpreadsheet = (e) =>{
        theFile = e.target.files[0];
    }

    const readFile =()=>{
        var FR = new FileReader();
        FR.onload = function(e) {
            var data = new Uint8Array(e.target.result);
            var workbook = XLSX.read(data, {type: 'array'});
            var firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            var result = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

            console.log(result);
        };
        FR.readAsArrayBuffer(theFile);
    }

</script>




<div>
    <input type="file" on:change={grabSpreadsheet}>
    <div class="review-btn uploader-btn" on:click={readFile}>Parse Feed File</div>
</div>


<style>
    .uploader-btn{
        background: green;
        margin-left: 20px;
    }
</style>