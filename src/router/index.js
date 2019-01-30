import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import EditEmployee from '@/components/EditEmployee'
import NewEmployee from '@/components/NewEmployee'
import ViewEmployee from '@/components/ViewEmployee'
import Login from '@/components/Login'
import Register from '@/components/Register'
import firebase from 'firebase';

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta:{
        requiresAuth: true //protecting with login
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta:{
        requiresGuest: true //protecting guest required
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta:{
        requiresGuest: true //protecting guest required
      }
    },
    {
      path: '/new',
      name: 'new-employee',
      component: NewEmployee,
      meta:{
        requiresAuth: true //protecting with login
      }
    },
    {
      path: '/edit/:employee_id',
      name: 'edit-employee',
      component: EditEmployee,
      meta:{
        requiresAuth: true //protecting with login
      }
    },
    {
      path: '/:employee_id',
      name: 'view-employee',
      component: ViewEmployee,
      meta:{
        requiresAuth: true //protecting with login
      }
    }
  ]
})


//Nav guards methods

router.beforeEach((to,from,next) => {
  //check for required auth guard on each of the routes 
  if(to.matched.some(record => record.meta.requiresAuth)){ //if there is any record of guard in the router
    //check if not logged in on firebase
    if(!firebase.auth().currentUser){
      //go to login page
      next({
        path:'/login',
        query:{
          redirect: to.fullPath
        }
      });
    }else{
      //proceed to the route by calling next
      next();
    }
  }else if(to.matched.some(record => record.meta.requiresGuest)){
    if(firebase.auth().currentUser){
      //go to login page
      next({
        path:'/',
        query:{
          redirect: to.fullPath
        }
      });
    }else{
      //proceed to the route by calling next
      next();
    }
  }else{
    //proceed to the route
    next();
  }
})

export default router;