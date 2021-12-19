import React, { createContext } from 'react';
import { FirebaseApp } from 'firebase/app';
const FirebaseContext = createContext<FirebaseApp | null>(null);



export const FirebaseProvider = FirebaseContext.Provider;
export const FirebaseConsumer = FirebaseContext.Consumer;


export default FirebaseContext; 