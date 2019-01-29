<template>
    <div id="view-employee">
        <ul class="collection with-header">
            <li class="collection-header"><h4>{{name}}</h4></li>
            <li class="collection-item">Employee ID#: {{employee_id}}</li>
            <li class="collection-item">Department: {{dept}}</li>
            <li class="collection-item">Position: {{position}}</li>
        </ul>
        <router-link to="/" class="btn grey fixed-button-bottom">Back</router-link>
        <button @click="deleteEmployee" class="btn red fixed-button-bottom">Delete</button>
        <div class="fixed-action-btn">
            <router-link v-bind:to="{name:'edit-employee',params:{employee_id:employee_id}}" class="btn-floating btn-large red fixed-button-bottom">
                <i class="fa fa-pencil"></i>
            </router-link>
        </div> 
    </div>
</template>

<script>

import db from './firebaseInit'

export default{
    name: 'view-employee',
    data(){
        return{
            employee_id:null,
            name:null,
            dept:null,
            position:null,
        }
    },
    //this runs before we enter the router, as the name says
    beforeRouteEnter(to, from, next) {
        //db where filtering. We defined this as a parameter in router employee_id
        db.collection('employees').where('employee_id',
            '==',to.params.employee_id).get()
                .then(querySnapshot =>{
                    querySnapshot.forEach(doc =>{
                        next(vm => {
                            vm.employee_id = doc.data().employee_id
                            vm.name = doc.data().name
                            vm.dept = doc.data().dept
                            vm.position = doc.data().position
                        })
                    })
                }) 
    },

    watch:{
        '$route':'fetchData'
    },

    methods:{
       
       //fetching the data for only 1 employee
       fetchData(){
           //as from here we have no access to the to method from the before watch, we use this.$route parameter
           db.collection('employees').where('employee_id','==',this.$route.params.employee_id).get().then(querySnapshot => {
               querySnapshot.forEach(doc =>{
                   this.employee_id = doc.data().employee_id
                   this.name = doc.data().name
                   this.dept = doc.data().dept
                   this.position = doc.data().position
               })
           })
       },

       deleteEmployee(){
           if(confirm('Are you sure you want to delete this Employee?')){
               db.collection('employees').where('employee_id','==',this.$route.params.employee_id).get().then(querySnapshot => {
               querySnapshot.forEach(doc =>{
                   doc.ref.delete(); //deleting by the reference
                   this.$router.push('/') ; //redirecting back to the main Dashboard
               })
           })
           }
       }

    }

}

</script>