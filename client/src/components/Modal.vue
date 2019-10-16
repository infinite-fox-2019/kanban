<template>
    <b-modal id="modal-1" title="New Task">
        <table>
            <tr>
                <td>
                    <small>Title</small>
                </td>
            </tr>
            <tr>
                <td>
                    <input type='text' v-model='title' placeholder="Task Title">
                </td>
            </tr>
            <tr>
                <td>
                    <small>Description</small>
                </td>
            </tr>
            <tr>
                <td>
                    <textarea v-model='description'></textarea>
                </td>
            </tr>
            <tr>
                <td>
                    <small>Point</small>
                </td>
            </tr>
            <tr>
                <td>
                    <input type='text' placeholder="0" v-model='point'>
                </td>
            </tr>
            <tr>
                <td>
                    <small>Assigned To</small>
                </td>
            </tr>
        </table>
  </b-modal>
</template>

<script>
export default {
  data () {
    return {
      title: ''
    }
  }
}
</script>

<style>
</style>
