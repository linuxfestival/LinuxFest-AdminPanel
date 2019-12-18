import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import store from '@/store/index';
import Users from "@/views/Users";
import UsersProfile from "@/views/UsersProfile";
import UsersCreate from "../views/UsersCreate";

Vue.use(VueRouter);

const routes = [
    {
        path: '/home',
        name: 'home',
        component: Home
    }, {
        path: '/',
        name: 'login',
        component: Login
    }, {
        path : '/users',
        name : 'users',
        component : Users
    },
    {
        path: '/users/:id',
        name : 'userProfile',
        component : UsersProfile
    },
    {
        path : '/createuser',
        name : 'usersCreate',
        component : UsersCreate,
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

const requiredAuth = ['/home', '/users' , '/workshops' , '/users/:id', '/createuser'];
const requiredNotAuth = ['/'];

router.beforeEach((to,from,next) => {
    console.log(to.path);
    console.log(to.matched);
    console.log(from.path);
    if(matchPath(to,requiredAuth)) {
        if(store.getters.isLoggedIn) {
            next();
        }else {
            next('/');
        }
    }else if(matchPath(to,requiredNotAuth)){
        if(!store.getters.isLoggedIn){
            next();
        }else {

        }
    }
});

function matchPath(route, list){
    for(let i = 0; i < list.length ; i++) {
        console.log('route ', route.path , ' checking with ', list[i]);
        if(route.path.startsWith(list[i])) {
            console.log('match');
            return true;
        }
    }
    return false;
}

export default router
