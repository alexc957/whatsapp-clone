import { FirebaseApp } from 'firebase/app';
import React, { useContext, useState } from 'react'
import { View, Text } from 'react-native'
import { Button, Card, Input } from 'react-native-elements';
import FirebaseContext from '../Contexts/FirebaseContext';
import Toast from 'react-native-toast-message';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPasword] = useState<string>("");
    const app: FirebaseApp | null = useContext(FirebaseContext);

    const onLogin = async () => {

        try {
            const auth = getAuth(app || undefined);
            await signInWithEmailAndPassword(auth, email, password);
        }catch(e){
            console.log('something happened ', e);
            Toast.show({
                text1: 'Bad credentials',
                type: 'error'
            })
            
        }

    }

    return (
        <View style={{flexDirection: 'column', justifyContent: 'center',paddingTop: '35%'}}>
            <Card>
                 <Card.Title>Login</Card.Title>
                <Card.Divider/>

                <Input  
                    placeholder="Email"
                    onChangeText={(text) => setEmail(text)}
                    value={email}/>
                <Input  
                    placeholder="Password"
                    onChangeText={(text) => setPasword(text)}
                    value={password}
                    secureTextEntry={true}/>

                <Button title={"Log In"}  onPress={onLogin} />


            </Card>
        </View>
    )
}
