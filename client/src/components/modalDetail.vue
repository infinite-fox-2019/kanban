<template>
    <div class="modal fade" id="modalDetail" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
       <div class="modal-dialog" role="document">
         <div class="modal-content">
           <div class="modal-header">
             <h5 class="modal-title" id="">Add Task</h5>
             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">&times;</span>
             </button>
           </div>
           <div class="modal-body">
               <form id="detailTask">
                  {{taskItem}}
                   <p>Title : {{title}}</p>
                   <br>
                    <p>Description : {{description}}</p>
                   <br>
                   <p>point: {{point}}</p>
                   <br>
                   <p>assigned to:{{assigned}} </p>
                   <br>
                   <button @click.prevent="deleteTask(id)" class="btn btn-danger" type="submit" data-dismiss="modal" value="delete">Delete</button>
               </form>
           </div>
           <div class="modal-footer">
             <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
           </div>
         </div>
       </div>
     </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
