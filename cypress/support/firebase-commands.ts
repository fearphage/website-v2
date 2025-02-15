/*  eslint-disable no-console, import/no-named-as-default-member */
// TODO the firebase-cypress plugin doesn't support
// the v9 modular syntax, when it does, change this
// to the v9 module syntax
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
// TODO something wrong with the cypress-firebase package
// https://github.com/prescottprue/cypress-firebase/issues/483
// @ts-ignore
import { attachCustomCommands } from "cypress-firebase";
import * as fbConfig from "../../firebase-config/local";

firebase.initializeApp(fbConfig);

const firestoreEmulatorHost = Cypress.env("FIRESTORE_EMULATOR_HOST");
const authEmulatorHost = Cypress.env("FIREBASE_AUTH_EMULATOR_HOST");

firebase.firestore().settings({
  host: firestoreEmulatorHost,
  ssl: false,
});
console.debug(`Using Firestore emulator: http://${firestoreEmulatorHost}/`);

firebase.auth().useEmulator(`http://${authEmulatorHost}/`);
console.debug(`Using Auth emulator: http://${authEmulatorHost}/`);

attachCustomCommands({ Cypress, cy, firebase });
