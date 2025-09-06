import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput } from 'react-native-paper';
import { style } from '../../globalStyles';
import { Link, useLinkTo } from "@react-navigation/native";
import { SignInView, SignInTitleView, Title, InputView } from '../SignIn/styles';

import UserService from '../../services/UserServices/index';
import RoleService from "../../services/RoleService";
import Dropdown from "../../components/Dropdown";
import Sidebar from "../../components/Sidebar";
import { DashboardView } from "../Dashboard/styles";
import Progress from "../../components/Progress";
import {
    NextButton,
    BackButton,
    ButtonsView
} from './styles';

interface FormData {
    name: string;
    email: string;
    role: string;
    password: string;
    password_confirmation: string;
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

    const { control, handleSubmit, formState: { errors, isValid }, watch, getFieldState, getValues, trigger, clearErrors } = useForm({ mode: "onSubmit" });
    const [securePassword, setSecurePassword] = useState(true);
    const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);
    const [currentSection, setCurrentSection] = useState(1);
    const watchPassword = watch("password");
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
            linkTo('/admin/dashboard')
        })
            .catch(error => {
                console.error(error)
            });
    };

    const [roles, setRoles] = useState<{ label: string; value: string }[]>([]);

    useEffect(() => {
        RoleService.getRoles().then(response => {
            let temp: { label: string; value: string }[] = new Array();
            response.data.map((item: string) => {
                temp.push({ label: item, value: item });
            })
            setRoles(temp);
        }).catch(response => {
            console.error(response);
        })
    }, [])

    function checkAndPass() {
        clearErrors('name');
        let nameCheck = false;
        if (getFieldState('name').isDirty && getValues('name') !== '') {
            nameCheck = true;
        }
        else {
            nameCheck = false;
            trigger('name');
        }

        if (nameCheck) {
            setCurrentSection(2);
        }
    }

    const firstSection = (
        <View>
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
                    name="role"
                    defaultValue={roles[0]}
                    render={({ field: { onBlur, onChange, value } }) => (
                        <Dropdown
                            value={value}
                            onValueChange={(value: any) => onChange(value)}
                            items={roles}
                        />
                    )}
                    rules={{
                        required: "O cargo é obrigatório",
                    }}
                />
                {errors.role && <Text style={{ color: 'red' }}>{errors.role.message}</Text>}
            </InputView>

            <ButtonsView>
                <NextButton onPress={() => checkAndPass()}>
                    <Text style={{ color: 'white' }}>Próximo</Text>
                </NextButton>
            </ButtonsView>
        </View>
    )

    const secondSection = (
        <View>
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
                    name="password"
                    defaultValue=""
                    render={({ field: { onBlur, onChange, value } }) => (
                        <TextInput
                            autoComplete={Platform.OS === 'web' ? 'none' : 'off'}
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
                            placeholder="A partir de 9 caracteres"
                        />
                    )}
                    rules={{
                        required: "A senha é obrigatória.",
                        minLength: {
                            value: 9,
                            message: "Senha muito curta.",
                        },
                    }}
                />
                {errors.password && <Text style={{ color: 'red' }}>{errors.password.message}</Text>}
            </InputView>

            <InputView>
                <Controller
                    control={control}
                    name="password_confirmation"
                    defaultValue=""
                    render={({ field: { onBlur, onChange, value } }) => (
                        <TextInput
                            error={errors.password_confirmation}
                            secureTextEntry={secureConfirmPassword}
                            right={
                                <TextInput.Icon
                                    name={(secureConfirmPassword) ? "eye-outline" : "eye-off-outline"}
                                    onPress={() => { setSecureConfirmPassword(!secureConfirmPassword); }} />
                            }
                            mode="outlined"
                            activeOutlineColor={style.colors.black}
                            value={value}
                            onBlur={onBlur}
                            onChangeText={(value: any) => onChange(value)}
                            style={textInputStyle}
                            theme={textInputTheme}
                            outlineColor={style.colors.black}
                            label="Confirmar senha*"
                            placeholder="Repita a senha"
                        />
                    )}
                    rules={{
                        required: "A confirmação de senha é obrigatória.",
                        validate: (value) => {
                            if (value !== watchPassword) {
                                return "As senhas não estão iguais";
                            }
                            return true;
                        },
                    }}
                />
                {errors.password_confirmation && (
                    <Text style={{ color: 'red' }}>{errors.password_confirmation.message}</Text>
                )}
            </InputView>

            <ButtonsView>
                <NextButton onPress={handleSubmit(onSubmit)}>
                    <Text style={{ color: `${style.colors.white}`, fontSize: '16px' }}>Criar novo usuário</Text>
                </NextButton>
                <BackButton onPress={() => setCurrentSection(1)}>
                    <Text style={{ color: `${style.colors.white}`, fontSize: '16px' }}>Voltar</Text>
                </BackButton>
            </ButtonsView>

        </View>
    )

    return (
        <View style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
            <Sidebar func={getIsOpenProp} />
            <DashboardView isOpen={isOpen}>


                <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
                    <SignInView>
                        <SignInTitleView>
                            <Title>Cadastro</Title>
                            <Progress
                                progress={currentSection === 1 ? 50 : 100}
                                height={10}
                                trackColor={"#A9A9A9"}
                                backgroundColor={style.colors.primary}
                                iconColor={
                                    currentSection === 1
                                        ? "#A9A9A9"
                                        : style.colors.primary
                                }
                            />
                        </SignInTitleView>

                        {currentSection === 1 && firstSection}
                        {currentSection === 2 && secondSection}


                    </SignInView>
                    <Copyright />
                </SafeAreaView>
            </DashboardView>
        </View>
    )
}

export default SignIn;