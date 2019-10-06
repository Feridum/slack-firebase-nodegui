import firebase from "firebase/app";
import 'firebase/firestore';
// @ts-ignore
import {XMLHttpRequest} from 'xmlhttprequest';
import {firebaseConfig} from "./config";

(global as any).XMLHttpRequest = XMLHttpRequest;

export const USER = 'prelegent-nodegui';

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig).firestore() : firebase.app().firestore();
export const Timestamp = firebase.firestore.Timestamp;