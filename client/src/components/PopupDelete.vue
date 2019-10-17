<template>
  <a-popconfirm title="Are you sure delete this task" @confirm="confirm" @cancel="cancel" okText="delete" cancelText="no">
      <a-icon type="delete" />
  </a-popconfirm>
</template>

<script>
import db from '../../config/firestore'

export default {
    name : 'PopupDelete',
    props : ['id'],
    methods : {
        confirm(e) {
            db.collection('task').doc(this.id).delete()
            .then( _ => {
                this.$message.success('deleted task')
            })
            .catch(err => {
                this.$message.error('something bad happen in our server!')
            })

        },
        cancel(e){
            this.$message.success('chill dude!')
        }

    }
}
</script>

<style>

</style>