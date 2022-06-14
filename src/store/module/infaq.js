//import global API
import Api from "../../api/Api";

const infaq = {
    //set namespace true
    namespaced: true,

    //state
    state: {
        //donations
        infaqs: [],

        //loadmore
        nextExists: false,
        nextPage: 0,
    },

    //mutations
    mutations: {
        //set state infaqs dengan data dari response
        SET_DONATIONS(state, infaqs) {
            state.infaqs = infaqs;
        },

        //set state nextExists
        SET_NEXTEXISTS(state, nextExists) {
            state.nextExists = nextExists;
        },

        //set state nextPage
        SET_NEXTPAGE(state, nextPage) {
            state.nextPage = nextPage;
        },

        //set state campaigns dengan data dari response loadmore
        SET_LOADMORE(state, data) {
            data.forEach((row) => {
                state.infaqs.push(row);
            });
        },
    },

    //actions
    actions: {
        //action getDonation
        getDonation({ commit }) {
            //get data token dan user
            const token = localStorage.getItem("token");

            //set axios header dengan type Authorization + Bearer token
            Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            //get data donations ke server
            Api.get("/user/infaq")
                .then((response) => {
                    //commit ke mutation SET_DONATIONS dengan response data
                    commit("SET_DONATIONS", response.data.data.data);

                    if (
                        response.data.data.current_page <
                        response.data.data.last_page
                    ) {
                        //commit ke mutation SET_NEXTEXISTS dengan true
                        commit("SET_NEXTEXISTS", true);

                        //commit ke mutation SET_NEXTPAGE dengan current page + 1
                        commit(
                            "SET_NEXTPAGE",
                            response.data.data.current_page + 1
                        );
                    } else {
                        //commit ke mutation SET_NEXTEXISTS dengan false
                        commit("SET_NEXTEXISTS", false);
                    }
                })
                .catch((error) => {
                    //show error log dari response
                    console.log(error);
                });
        },

        //action getLoadMore
        getLoadMore({ commit }, nextPage) {
            //get data token dan user
            const token = localStorage.getItem("token");

            //set axios header dengan type Authorization + Bearer token
            Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            //get data infaqs dengan parameter page ke server
            Api.get(`/user/infaq?page=${nextPage}`)
                .then((response) => {
                    //commit ke mutation SET_LOADMORE dengan response data
                    commit("SET_LOADMORE", response.data.data.data);

                    //console.log(response.data.data.data)

                    if (
                        response.data.data.current_page <
                        response.data.data.last_page
                    ) {
                        //commit ke mutation SET_NEXTEXISTS dengan true
                        commit("SET_NEXTEXISTS", true);

                        //commit ke mutation SET_NEXTPAGE dengan current page + 1
                        commit(
                            "SET_NEXTPAGE",
                            response.data.data.current_page + 1
                        );
                    } else {
                        //commit ke mutation SET_NEXTEXISTS dengan false
                        commit("SET_NEXTEXISTS", false);
                    }
                })
                .catch((error) => {
                    //show error log dari response
                    console.log(error);
                });
        },

        //storeDonation
        storeDonation({ commit }, data) {
               //get data token dan user
               const token = localStorage.getItem("token");

               //set axios header dengan type Authorization + Bearer token
               Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            //define callback promise
            return new Promise((resolve, reject) => {
                //get data token dan user
                const token = localStorage.getItem("token");

                //set axios header dengan type Authorization + Bearer token
                Api.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${token}`;

                //send data donatiion ke server
                Api.post("/user/infaq", data)
                    .then((response) => {
                        commit("");
                        resolve(response);
                    })
                    .catch((error) => {
                        //show error log dari response
                        reject(error.response.data);
                    });
            });
        },
    },

    //getters
    getters: {},
};

export default infaq;
