<template>
    <div>
        <h1>Create New Workshop :</h1>
        <div class="col-md-8 order-md-1">
            <form class="needs-validation" @submit.prevent="createNewWorkshop()">
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="workshopTitle">Title</label>   
                        <input type="text" class="form-control" id="workshopTitle" placeholder="Workshop Title..." v-model="inputData.title">
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="price">Price(ex : 10000 -> 10 hezar toman)</label>   
                        <input type="text" id="price" class="form-control" placeholder="Price..." v-model="inputData.price">
                    </div>
                </div>

                <div class="mb-3">
                        <label for="description">Description:</label>   
                        <textarea class="form-control" id="description" placeholder="Description..." v-model="inputData.description">

                        </textarea>
                </div>

               <div class="mb-3">
                        <label for="cap">Capacity (Positive Integer):</label>   
                        <input type="number" class="form-control" id="cap" min="0" max="500" placeholder="Capacity..." v-model="inputData.capacity">

                </div>

                <hr class="mb-4">
                <button class="btn btn-primary btn-lg btn-block" type="submit">Create New Workshop</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name : "WorkshopCreate",
    data() {
        return {
            inputData : {
                title : "",
                capacity : "",
                price : "",
                teachers : [],
                startTime : "",
                endTime : ""
            }
        }
    },
    methods : {
        createNewWorkshop: function() {
            //create new workshop
            console.log("Create new workshop");
        }
    },
    created() {

    }
}
</script>

<style scoped>

</style>