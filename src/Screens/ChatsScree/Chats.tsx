import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import { FAB,Icon } from 'react-native-elements'; 
import { collection, doc, DocumentData, getDoc, getDocs, getFirestore, query, QueryDocumentSnapshot, where } from "firebase/firestore"
import { ChatUser } from '../../Interfaces/Chat';
import { getAuth,User } from "firebase/auth";
import SearchUsers from './Components/SearchUsers';


export default function Chats({navigation}: any) {
    //const currentUser = getUser
    const [userContacts, setUserContacts] = useState<ChatUser>({
        email: ''
    })

    const [allUsers, setAllUsers] = useState<ChatUser[]>([]);

    const [showUsers, setShowUsers] = useState<boolean>(false);

    
    const addContact = () =>  {

    }
    useEffect(() => {
        const auth = getAuth();
        const user: User | null = auth.currentUser;
       // console.log('current user? ', user?.email);

        const getUserData = async () => {
            try {
                const db = getFirestore();
                const q = query(collection(db, 'users'), where('email', '==', user?.email));
                const usersQuery = query(collection(db, 'users'));

                const users = await getDocs(usersQuery);
                const queryUsers: ChatUser[] = [];
                if(!users.empty){
                    users.forEach((result: QueryDocumentSnapshot<DocumentData>) => {
                       // console.log('result.data', result.data());
                       queryUsers.push({...(result.data() as ChatUser), userId: result.id});
                    })
                    console.log('all users ', queryUsers)
                    setAllUsers(queryUsers);
                }
                //const docs = 
            
                const results = await getDocs(q);
                if(!results.empty){
                    const first = results.docs[0];
                    const data = first.data();
                    setUserContacts({...(data as ChatUser), userId: first.id});
             
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
           
            <TouchableOpacity onPress={()=> setShowUsers(true)}>
                <Icon  
                    name='add-user'  
                    type='entypo'  
                    color='green' 
                    raised 
                    reverse 
                    onPress={()=> setShowUsers(true)}/>
            </TouchableOpacity>

            <SearchUsers 
                show={showUsers}
                setShow={setShowUsers}
                users={allUsers.filter((user: ChatUser)=> user.email !==userContacts.email  )}
                currentUserId={userContacts.userId || ''}
                navigation={navigation}
                  />
           
        </View>
    )
}
