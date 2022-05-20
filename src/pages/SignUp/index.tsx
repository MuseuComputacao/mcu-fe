import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, Image, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput } from 'react-native-paper';
import { style } from '../../globalStyles';
import axios from "axios";
import { Link, useLinkTo } from "@react-navigation/native";
import { SignInView, SignInTitleView, Title, InputView, ForgotPasswordView, ForgotPassword, SubmitButton } from '../SignIn/styles'
import AsyncStorage from '@react-native-async-storage/async-storage';

import UserService from '../../services/UserServices/index';
import Dropdown from "../../components/Dropdown";
import Sidebar from "../../components/Sidebar";
import { DashboardView } from "../Dashboard/styles";

interface FormData {
    name: string;
    email: string;
    role: string;
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

    const [isOpen, setIsOpen] = useState<boolean>(true);
    function getIsOpenProp(getIsOpen: boolean) {
        setIsOpen(getIsOpen);
    }
    const onSubmit = async (data: FormData) => {
        UserService.createUser(data).then(response => {
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
            .then(async () => {
                const value = await AsyncStorage.getItem('@user')
                console.log(value)
            })
            .catch(error => {
                console.log(error)
            });
    };

    return (
        <View style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
            <Sidebar func={getIsOpenProp} />
            <DashboardView isOpen={isOpen}>


                <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
                    <SignInView>
                        <SignInTitleView>
                            <Image
                                style={{ width: 100, height: 75 }}
                                source={require('../../../assets/museu-icon.png')}
                            />
                            <Title>Cadastro</Title>
                        </SignInTitleView>

                        <InputView>
                            <Controller
                                control={control}
                                name="name"
                                defaultValue=""
                                render={({ field: { onBlur, onChange, value } }) => (
                                    <TextInput
                                        autoComplete={Platform.OS === 'web' ? 'none' : 'off'}
                                        error={errors.name}
                                        mode="outlined"
                                        activeOutlineColor={style.colors.primary}
                                        value={value}
                                        onBlur={onBlur}
                                        onChangeText={(value: any) => onChange(value)}
                                        style={textInputStyle}
                                        theme={textInputTheme}
                                        outlineColor={style.colors.black}
                                        label="Nome*"
                                    />
                                )}
                                rules={{
                                    required: "O nome é obrigatório",
                                }}
                            />
                            {errors.name && <Text style={{ color: 'red' }}>{errors.name.message}</Text>}
                        </InputView>

                        <InputView>
                            <Controller
                                control={control}
                                name="email"
                                defaultValue=""
                                render={({ field: { onBlur, onChange, value } }) => (
                                    <TextInput
                                        autoComplete={Platform.OS === 'web' ? 'none' : 'off'}
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
                                name="role"
                                defaultValue=""
                                render={({ field: { onBlur, onChange, value } }) => (
                                    <Dropdown
                                        value={value}
                                        onValueChange={(value: any) => onChange(value)}
                                        items={[
                                            { label: "Curador", value: "curator" },
                                            { label: "Editor", value: "editor" },
                                            { label: "Catalogador", value: "cataloger" },
                                            { label: "Mestre", value: "master" },
                                        ]}
                                    />
                                )}
                                rules={{
                                    required: "O cargo é obrigatório",
                                }}
                            />
                            {errors.role && <Text style={{ color: 'red' }}>{errors.role.message}</Text>}
                        </InputView>

                        <SubmitButton onPress={handleSubmit(onSubmit)}>
                            <Text style={{ color: `${style.colors.white}`, fontSize: '16px' }}>Criar novo usuário</Text>
                        </SubmitButton>
                    </SignInView>
                    <Copyright />
                </SafeAreaView>
            </DashboardView>
        </View>
    )
}

export default SignIn;