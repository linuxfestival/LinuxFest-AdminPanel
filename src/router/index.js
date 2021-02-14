import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import store from '@/store/index';
import Users from "@/views/Users";
import UsersProfile from "@/views/UsersProfile";
import UsersCreate from "../views/UsersCreate";
import Workshops from "@/views/Workshops"
import WorkshopCreate from "@/views/WorkshopCreate";
import Teachers from "@/views/Teachers";
import TeacherCreate from "@/views/TeacherCreate"
import TeacherProfile from "@/views/TeacherProfile"
import WorkshopProfile from "@/views/WorkshopProfile";
import Email from "@/views/Email";
import CareersCreate from "../views/careers/CareersCreate";
import AllCompanies from "../views/careers/AllCompanies";
import CompanyProfile from "../views/careers/CompanyProfile";
import Discounts from "../views/discounts/Discounts";
import discountCreate from "../views/discounts/discountCreate";
import DiscountEdit from "../views/discounts/DiscountEdit";

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
    },
    {
        path : '/workshops',
        name : 'workshops',
        component : Workshops
    },
    {
        path : '/createworkshop',
        name : 'workshopcreate',
        component : WorkshopCreate,
    },{
        path : '/workshops/:id',
        name : 'workshopProfile',
        component : WorkshopProfile 
    },
    {
        path : '/teachers',
        name : 'teachers',
        component : Teachers
    },
    {
        path : '/createteacher',
        name : 'teachercreate',
        component : TeacherCreate
    },
    {
        path : '/teachers/:id',
        name : "teacherProfile",
        component : TeacherProfile
    },
    {
        path: '/email',
        name: "Email",
        component: Email
    },
    {
        path: '/companies',
        name: "companies",
        component: AllCompanies
    },
    {
        path: '/careercreate',
        name: "careerCreate",
        component: CareersCreate
    },
    {
        path: '/companies/:id',
        name: "careerCreate",
        component: CompanyProfile
    },
    {
        path: '/discounts',
        name: "discounts",
        component: Discounts
    },
    {
        path: '/discounts/:id',
        name: "discountEdit",
        component: DiscountEdit
    },
    {
        path: '/creatediscount',
        name: "discountCreate",
        component: discountCreate
    }
];

const router = new VueRouter({
    mode: 'history',
    base: '/almightyone/',
    routes
});

const requiredAuth = ['/home', '/users' , '/workshops' , '/workshops/:id' , '/users/:id', '/createuser' , '/createworkshop' , '/teachers', '/teachers/:id' , '/createteacher', '/email','/careercreate','/companies','/companies/:id','/discounts','/creatediscount','/discounts:id'];
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
