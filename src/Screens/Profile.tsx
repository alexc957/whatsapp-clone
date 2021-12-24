import { getAuth, signOut } from 'firebase/auth'
import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'

export default function Profile() {

    const onLogOut = async () => {
        try{
            const auth = getAuth();
            await signOut(auth);
        }catch(e){
            console.log(e);
        }
    }
    return (
        <View>
            <Button title={"Log Out"} onPress={onLogOut} />
        </View>
    )
}
