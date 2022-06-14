//import vuex
import { createStore } from "vuex";

//import module auth
import auth from "./module/Auth";

//import module donation
import infaq from "./module/infaq";

//import module profile
import profile from "./module/profile";

//import module slider
import slider from "./module/slider";

//import module category
import category from "./module/category";

//import module campaign
import campaign from "./module/campaign";

//create store vuex
export default createStore({
    modules: {
        auth, // <-- module auth
        infaq, // <-- module donation
        profile, // <-- module profile
        slider, // <-- module slider
        category, // <-- module category
        campaign, // <-- module campaign
    },
}); 