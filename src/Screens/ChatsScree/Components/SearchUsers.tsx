import React, { useEffect, useState } from 'react'
import { View, Text, FlatList ,StyleSheet, Dimensions,KeyboardAvoidingView} from 'react-native'
import { Input, ListItem, Overlay } from 'react-native-elements'
import { ChatUser } from '../../../Interfaces/Chat'
import { getDatabase, ref, set } from "firebase/database";
import { arrayUnion, doc,getFirestore, updateDoc } from 'firebase/firestore';



export default function SearchUsers({
    show, 
    setShow,
    users,
    currentUserId,
    navigation}:{
        show: boolean,
        setShow: Function,
        users: ChatUser[],
        currentUserId: string,
        navigation:  any;
    }) {

        const [searchUsers, setSearchUsers] = useState<ChatUser[]>([])

        useEffect(()=> {
           // console.log('len ', users.length);
           setSearchUsers(users);
        }, []);

        const onTextChange = (text: string) => {
            if(!text || text==='') {
                setSearchUsers(users);
            }else {
                const searchedUsers =searchUsers.filter((user: ChatUser) => {
                    return user.name?.includes(text.toLowerCase());
                } )
                setSearchUsers(searchedUsers);
            }

        };

        const createChat = async (user: ChatUser) => {
            try {
              const db = getFirestore()
               // set(ref(db, ``))
             //  const chatReference = ref(db, `chats/${currentUserId}/${user.userId}`);
              // await set(chatReference, '');
               const currentUserRef = doc(db,'users', currentUserId);
               await updateDoc(currentUserRef,{
                   contacts: arrayUnion(user.userId)
                })

                navigation.navigate('Chat');

            }catch(e){

            }

        }

        const keyExtractor = (item: any, index: number) => index.toString()
        const renderItem = ({ item }: {item: ChatUser}) => (
               
        <ListItem bottomDivider onPress={() => createChat(item)}>    
        <ListItem.Content>      
            <ListItem.Title>{item.name}</ListItem.Title>    
            
            </ListItem.Content>   
           
        </ListItem>)
    return (
       
        <Overlay 
            overlayStyle={styles.container}
            isVisible={show} 
            onBackdropPress={() => setShow(false)}>
             <KeyboardAvoidingView behavior='height'>

            
            <Input
                placeholder='Name'
                onChangeText={onTextChange} />

            <FlatList
                keyExtractor={keyExtractor}
                data={searchUsers}
                renderItem={renderItem} />

            </KeyboardAvoidingView> 

            
        </Overlay>
      
    )
}


const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width*0.9,
        height: Dimensions.get('window').height*0.4
    }
})