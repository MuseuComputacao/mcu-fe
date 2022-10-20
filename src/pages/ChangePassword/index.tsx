import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput } from "react-native-paper";
import { style } from "../../globalStyles";
import axios from "axios";
import { Link, useLinkTo } from "@react-navigation/native";
import {
  SignInView,
  SignInTitleView,
  Title,
  InputView,
  ForgotPasswordView,
  ForgotPassword,
  SubmitButton,
} from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

import UserService from "../../services/UserServices/index";

interface FormData {
  current_password: string;
  password: string;
  password_confirmation: string;
}

const textInputStyle = {
  fontSize: 16,
  borderColor: style.colors.black,
  color: style.colors.black,
  backgroundColor: style.colors.white,
};

const textInputTheme = {
  roundness: +style.borderRadius.slice(0, 2),
};

const SignIn = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onSubmit" });
  const linkTo = useLinkTo();
  const watchPassword = watch("password");
  const [currentSecurePassword, setCurrentSecurePassword] = useState(true);
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);

  const onSubmit = async (data: FormData) => {
    UserService.resetPassword(data)
      .then((response) => {
        const user = {
          token: response.headers["access-token"],
          uid: response.headers.uid,
          client: response.headers.client,
          role: response.data.data.role,
          email: response.data.data.email,
        };
        // console.log("Response: ", user);
        AsyncStorage.setItem("@user", JSON.stringify(user));
        // console.log(response);
        if(response.data.status == "success"){
            let first_login = false;
            UserService.updateUser({first_login}).then((response) => {
                console.log(response);
                linkTo("/admin/dashboard");
            })
        }
      })
      .then(async () => {
        const value = await AsyncStorage.getItem("@user");
        console.log(value);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <SignInView>
        <SignInTitleView>
          <Image
            style={{ width: 100, height: 75 }}
            source={require("../../../assets/museu-icon.png")}
          />
          <Title>Reset Password</Title>
        </SignInTitleView>

        <InputView>
          <Controller
            control={control}
            name="current_password"
            defaultValue=""
            render={({ field: { onBlur, onChange, value } }) => (
              <TextInput
                autoComplete={Platform.OS === "web" ? "none" : "off"}
                error={errors.current_password}
                secureTextEntry={currentSecurePassword}
                right={
                  <TextInput.Icon
                    name={!currentSecurePassword ? "eye-outline" : "eye-off-outline"}
                    onPress={() => {
                      setCurrentSecurePassword(!currentSecurePassword);
                    }}
                  />
                }
                mode="outlined"
                activeOutlineColor={style.colors.primary}
                value={value}
                onBlur={onBlur}
                onChangeText={(value: any) => onChange(value)}
                style={textInputStyle}
                theme={textInputTheme}
                outlineColor={style.colors.black}
                label="Senha atual*"
                placeholder="A partir de 9 caracteres"
              />
            )}
            rules={{
              required: "A senha atual é obrigatória.",
              minLength: {
                value: 9,
                message: "Senha muito curta.",
              },
            }}
          />
          {errors.current_password && (
            <Text style={{ color: "red" }}>{errors.current_password.message}</Text>
          )}
        </InputView>

        <InputView>
          <Controller
            control={control}
            name="password"
            defaultValue=""
            render={({ field: { onBlur, onChange, value } }) => (
              <TextInput
                autoComplete={Platform.OS === "web" ? "none" : "off"}
                error={errors.password}
                secureTextEntry={securePassword}
                right={
                  <TextInput.Icon
                    name={!securePassword ? "eye-outline" : "eye-off-outline"}
                    onPress={() => {
                      setSecurePassword(!securePassword);
                    }}
                  />
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
          {errors.password && (
            <Text style={{ color: "red" }}>{errors.password.message}</Text>
          )}
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
                    name={
                      !secureConfirmPassword ? "eye-outline" : "eye-off-outline"
                    }
                    onPress={() => {
                      setSecureConfirmPassword(!secureConfirmPassword);
                    }}
                  />
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
            <Text style={{ color: "red" }}>
              {errors.password_confirmation.message}
            </Text>
          )}
        </InputView>

        <SubmitButton onPress={handleSubmit(onSubmit)}>
          <Text style={{ color: `${style.colors.white}`, fontSize: "16px" }}>
            Alterar senha
          </Text>
        </SubmitButton>
      </SignInView>
    </SafeAreaView>
  );
};

export default SignIn;
