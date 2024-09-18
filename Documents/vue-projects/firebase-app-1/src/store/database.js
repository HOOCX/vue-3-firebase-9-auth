
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { defineStore } from 'pinia'
import { auth, db } from '../firebaseConfig'
import {nanoid} from 'nanoid';
import { update } from 'firebase/database';
import router from '../router';

 export const useDatabaseStore = defineStore('database', {
    state: () => ({
        document: [],
        loadingDocument: false,
        loadingDocumentState: false,
    }),
    actions: {
        async getUrls(){ 
            if (this.document.length !== 0) {
                return;
                
            }

            this.loadingDocument = true;
            try {
                const q = query(collection(db, 'urls'), where("user", "==", auth.currentUser.uid));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                     //console.log(doc.id, doc.data()) 
                     this.document.push({
                        id: doc.id,
                        ...doc.data(),
                     })
                })  
            } catch (err) {
                console.log(err);
            } finally {
                this.loadingDocument = false;
            }
        },
        async addUrl(name){
            this.loadingDocumentState = true;
            try {
                const objetoDoc = {
                    name: name,
                    short: nanoid(6),
                    user: auth.currentUser.uid, 
                }
                const docRef = await addDoc(collection(db, 'urls'), objetoDoc);
                //console.log(docRef.id)
                this.document.push({
                    ...objetoDoc,
                    id: docRef.id,
                })
            } catch (error) {
                console.log(error);
                return error.code
            } finally {
                this.loadingDocumentState = false;
            }
        },
        async leerUrl(id){
            try {
                const docRef = doc(db, 'urls', id);
                const docSnap = await getDoc(docRef);
                if (!docSnap.exists()) {
                    throw new Error("No existing document")
                }
                if (docSnap.data().user !== auth.currentUser.uid) {
                    throw new Error("No le pertenece ese documento")
                }

                return docSnap.data().name
            } catch (error) {
                console.log(error);
            }
        },
        async updateUrl(id, name){
            this.loadingDocumentState = true;
            try {
                const docRef = doc(db, 'urls', id);
                const docSnap = await getDoc(docRef)
                if (!docSnap.exists()) {
                    throw new Error("No existing document")
                }
                if (docSnap.data().user !== auth.currentUser.uid) {
                    throw new Error("No le pertenece ese documento")
                }
                await updateDoc(docRef, {name})
                this.document = this.document.map(item => item.id === id ? ({...item, name: name}) : item)
                router.push('/')
            } catch (error) {
                console.log(error.message);
                return error.message;
            } finally {
                this.loadingDocumentState = false;
            }
        },
        async deleteUrl(id){
            this.loadingDocumentState = true;
            try {
                const docRef = doc(db, 'urls', id);
                const docSnap = await getDoc(docRef)
                if (!docSnap.exists()) {
                    throw new Error("No existing document")
                }
                if (docSnap.data().user !== auth.currentUser.uid) {
                    throw new Error("No le pertenece ese documento")
                }
                await deleteDoc(docRef)
                this.document = this.document.filter(item => item.id !== id)
            } catch (error) {
                //console.log(error.code)
                return error.message
            } finally{
                this.loadingDocumentState = false
            }
        }
    }
})