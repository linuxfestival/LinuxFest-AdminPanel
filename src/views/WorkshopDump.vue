<template>
    <div>
        <h1>Download all workshops as seperated csv</h1>
        <div class="container h-75 d-flex align-items-center justify-content-center">
            <div @click="get_workshop_dump" class="btn btn-info btn-lg">Click on this beautiful button!</div>            
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

export default {
    name : "WorkshopDump",
    methods : {
       

        get_workshop_dump() {
             axios({
                url: this.$store.getters.workshopsApi + "manage/dump/",
                method: "GET",
                responseType: 'blob',
                headers: {
                Authorization: "Bearer " + this.$store.getters.token,
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                var fileLink = document.createElement('a');
            
                fileLink.href = fileURL;
                fileLink.setAttribute('download', 'workshopDump.zip');
                document.body.appendChild(fileLink);
                fileLink.click();
            });
        }
      
    },
   
}
</script>

<style scoped>

</style>