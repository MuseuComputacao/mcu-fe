import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, Image, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput } from 'react-native-paper';
import { style } from '../../globalStyles';
import axios from "axios";
import { Link, useLinkTo } from "@react-navigation/native";
import { SignInView, SignInTitleView, Title, InputView, ForgotPasswordView, ForgotPassword, SubmitButton } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FormData {
    email: string;
    password: string;
}

const textInputStyle = {
    fontSize: 16,
    borderColor: style.colors.black,
    color: style.colors.black,
    backgroundColor: style.colors.white,
}

const textInputTheme = {
    roundness: +style.borderRadius.slice(0, 2)
}

function Copyright(props: any) {
    return (
      <Text>
        {'Copyright © '}
        <Link to="/" style={{ color: `${style.colors.primary}`, textDecorationLine: 'underline', textDecorationColor: `${style.colors.primary}` }}>
          Museu da computação UFRJ
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Text>
    );
  }

const SignIn = () => {

    const { control, handleSubmit, formState: { errors, isValid } } = useForm({ mode: "onSubmit" });
    const [securePassword, setSecurePassword] = useState(true);
    const linkTo = useLinkTo();

    const onSubmit = async (data: FormData) => {
        await axios
            .post('http://localhost:3000/api/auth/sign_in', {
                email: data.email,
                password: data.password
            })
            .then(response => {
                const user = {
                  token: response.headers['access-token'],
                  uid: response.headers.uid,
                  client: response.headers.client,
                  role: response.data.data.role,
                  email: response.data.data.email
                }
                console.log('Response: ', user)
                AsyncStorage.setItem('@user', JSON.stringify(user))    
                linkTo('/admin/dashboard')
              })
              .then(async ()=> {
                const value = await AsyncStorage.getItem('@user')
                console.log(value)
              })
            .catch(error => {
                console.log(error)
            });
    };


    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
            <SignInView>
                <SignInTitleView>
                    <Image
                        style={{ width: 100, height: 75 }}
                        source={require('../../../assets/museu-icon.png')}
                    />
                    <Title>Login</Title>
                </SignInTitleView>

                <InputView>
                    <Controller
                        control={control}
                        name="email"
                        defaultValue=""
                        render={({ field: { onBlur, onChange, value } }) => (
                            <TextInput
                                autoComplete={ Platform.OS === 'web' ? 'none' : 'off' }
                                error={errors.email}
                                mode="outlined"
                                activeOutlineColor={style.colors.primary}
                                keyboardType="email-address"
                                value={value}
                                onBlur={onBlur}
                                onChangeText={(value: any) => onChange(value)}
                                style={textInputStyle}
                                theme={textInputTheme}
                                outlineColor={style.colors.black}
                                label="E-mail*"
                                placeholder="email@exemplo.com"
                            />
                        )}
                        rules={{
                            required: "O e-mail é obrigatório.",
                            pattern: {
                                value: /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/i,
                                message: "Formato de e-mail inválido.",
                            },
                        }}
                    />
                    {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}
                </InputView>

                <InputView>
                    <Controller
                        control={control}
                        name="password"
                        defaultValue=""
                        render={({ field: { onBlur, onChange, value } }) => (
                            <TextInput
                                autoComplete={ Platform.OS === 'web' ? 'none' : 'off' }
                                error={errors.password}
                                secureTextEntry={securePassword}
                                right={
                                    <TextInput.Icon
                                        name={(securePassword) ? "eye-outline" : "eye-off-outline"}
                                        onPress={() => { setSecurePassword(!securePassword); }} />
                                }
                                mode="outlined"
                                activeOutlineColor={style.colors.primary}
                                value={value}
                                onBlur={onBlur}
                                onChangeText={(value: any) => onChange(value)}
                                style={textInputStyle}
                                theme={textInputTheme}
                                outlineColor={style.colors.black}
                                label="Senha*"
                                placeholder="A partir de 6 caracteres"
                            />
                        )}
                        rules={{
                            required: "A senha é obrigatória.",
                            minLength: {
                                value: 6,
                                message: "Senha muito curta.",
                            },
                        }}
                    />
                    {errors.password && <Text style={{ color: 'red' }}>{errors.password.message}</Text>}
                </InputView>

                <ForgotPasswordView>
                    <TouchableOpacity>
                        <ForgotPassword>Esqueci minha senha</ForgotPassword>
                    </TouchableOpacity>
                </ForgotPasswordView>

                <SubmitButton onPress={handleSubmit(onSubmit)}>
                    <Text style={{ color: `${style.colors.white}`, fontSize: '16px' }}>Entrar</Text>
                </SubmitButton>
            </SignInView>
            <Copyright/>
        </SafeAreaView>
    )
}

export default SignIn;