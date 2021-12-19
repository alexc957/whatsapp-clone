import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import { FAB,Icon } from 'react-native-elements'; 
import { collection, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore"
import { ChatUser } from '../Interfaces/Chat';
import { getAuth,User } from "firebase/auth";


export default function Chats() {
    //const currentUser = getUser
    const [userContacts, setUserContacts] = useState<ChatUser>({
        email: ''
    })
    const addContact = () =>  {

    }
    useEffect(() => {
        const auth = getAuth();
        const user: User | null = auth.currentUser;
       // console.log('current user? ', user?.email);

        const getUserData = async () => {
            try {
                const db = getFirestore();
                const q = query(collection(db, 'users'), where('email', '==', user?.email))
                const results = await getDocs(q);
                if(!results.empty){
                    const first = results.docs[0];
                    const data = first.data();
                    console.log('whats data ', data);
                    setUserContacts(data as ChatUser);
                  //  console.log('what did i GET ,',first);
                 /* results.forEach((result)=> {
                      console.log('resutl ? ', result.);
                  })*/
                }

            }catch(e){
                console.log(e);
            }
        }
        getUserData();

    },[])
    return (
        <View style={{
            flexDirection: 'column', 
            alignItems: 'center',
            justifyContent: 'center', 
           // width: Dimensions.get('window').width*0.9,
        }}>
            <Text>{userContacts.email}</Text>
           
            <TouchableOpacity>
                <Icon  name='add-user'  type='entypo'  color='green' raised reverse onPress={addContact}/>
            </TouchableOpacity>
           
        </View>
    )
}
