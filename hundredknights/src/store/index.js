import Vue from 'vue'
import Vuex from 'vuex'
import db from '../api/firebase'
import * as firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        planned: [],
        wip: [],
        testing: [],
        completed: []
    },
    mutations: {
        setPlanned(state, payload) {
            state.planned = payload
        },
        setWIP(state, payload) {
            state.wip = payload
        },
        setTesting(state, payload) {
            state.testing = payload
        },
        setCompleted(state, payload) {
            state.completed = payload
        },
    },
    actions: {
        startListening({ commit }) {
            return new Promise((resolve, reject) => {
                db.collection('kanban')
                    .onSnapshot((querySnapshot) => {
                        let arrPlan = [],
                            arrWIP = [],
                            arrTesting = [],
                            arrCompleted = []
                        querySnapshot.forEach(doc => {
                            let data = doc.data()
                            switch (data.status) {
                                case 'Planned':
                                    arrPlan.push({
                                        id: doc.id,
                                        ...data
                                    })
                                    break;
                                case "WIP":
                                    arrWIP.push({
                                        id: doc.id,
                                        ...data
                                    })
                                    break;
                                case "Testing and Validation":
                                    arrTesting.push({
                                        id: doc.id,
                                        ...data
                                    })
                                    break;
                                case "Completed":
                                    arrCompleted.push({
                                        id: doc.id,
                                        ...data
                                    })
                                    break;
                            }

                        })
                        commit('setPlanned', arrPlan)
                        commit('setWIP', arrWIP)
                        commit('setTesting', arrTesting)
                        commit('setCompleted', arrCompleted)
                        resolve()
                    })
            })
        },
        createKanBan({ commit }, payload) {
            return new Promise((resolve, reject) => {
                db.collection('kanban')
                    .add({
                        name: payload.name,
                        description: payload.description,
                        status: payload.status
                    })
                    .then(() => resolve())
                    .catch(reject)
            })
        },
        updateKanBan({ commit }, payload) {
            return new Promise((resolve, reject) => {
                db.collection('kanban')
                    .doc(payload.id)
                    .update({
                        name: payload.name,
                        description: payload.description,
                        status: payload.status
                    })
                    .then(() => resolve())
                    .catch(reject)
            })
        },
        deleteKanBan({ commit }, id) {
            return new Promise((resolve, reject) => {
                db.collection('kanban')
                    .doc(id)
                    .delete()
                    .then(() => resolve())
                    .catch(reject)
            })
        }
    },
    modules: {
    }
})
