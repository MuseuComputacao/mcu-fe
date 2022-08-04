import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, Platform, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput } from "react-native-paper";
import { style } from "../../globalStyles";
import { Link, useLinkTo } from "@react-navigation/native";
import {
  SignInView,
  SignInTitleView,
  Title,
  InputView,
} from "../SignIn/styles";

import UserService from "../../services/UserServices/index";
import RoleService from "../../services/RoleService";
import Dropdown from "../../components/Dropdown";
import Sidebar from "../../components/Sidebar";
import { DashboardView } from "../Dashboard/styles";
import Progress from "../../components/Progress";
import { NextButton, BackButton, ButtonsView } from "./styles";

interface FormData {
  name: string;
  email: string;
  role: string;
  password: string;
  password_confirmation: string;
}
interface AddItemFormData {
  name: string; //ok
  id_photo: string; //ok
  description: string; //ok
  material: string; // ok
  reference_measures: string; // ok
  release_date: string; // ok
  publication_date: string; // ok
  conservation_state: string; // ok
  conservation_description: string; // ok
  recommendations: string;
  general_observations: string;
  origin: string;
  country: string;
  donor_by: string;
  donation_date: string;
  localization: string;
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

function Copyright(props: any) {
  return (
    <Text>
      {"Copyright © "}
      <Link
        to="/"
        style={{
          color: `${style.colors.primary}`,
          textDecorationLine: "underline",
          textDecorationColor: `${style.colors.primary}`,
        }}
      >
        Museu da computação UFRJ
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Text>
  );
}

const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    getFieldState,
    getValues,
    trigger,
    clearErrors,
  } = useForm({ mode: "onSubmit" });
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
    // UserService.createUser(data).then(response => {
    //     const user = {
    //         token: response.headers['access-token'],
    //         uid: response.headers.uid,
    //         client: response.headers.client,
    //         role: response.data.data.role,
    //         email: response.data.data.email
    //     }
    //     console.log('Response: ', user)
    //     linkTo('admin/dashboard')
    // })
    //     .catch(error => {
    //         console.log(error)
    //     });
  };

  const [roles, setRoles] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    RoleService.getRoles()
      .then((response) => {
        let temp: { label: string; value: string }[] = new Array();
        response.data.map((item: string) => {
          temp.push({ label: item, value: item });
        });
        setRoles(temp);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

  function checkAndPass() {
    clearErrors("name");
    clearErrors("description");
    clearErrors("material");
    let nameCheck = false;
    let descriptionCheck = false;
    let materialCheck = false;
    if (getFieldState("name").isDirty && getValues("name") !== "") {
      nameCheck = true;
    } else {
      nameCheck = false;
      trigger("name");
    }

    if (
      getFieldState("description").isDirty &&
      getValues("description") !== ""
    ) {
      descriptionCheck = true;
    } else {
      descriptionCheck = false;
      trigger("description");
    }

    if (getFieldState("material").isDirty && getValues("material") !== "") {
      materialCheck = true;
    } else {
      materialCheck = false;
      trigger("material");
    }

    if (nameCheck && descriptionCheck && materialCheck) {
      setCurrentSection(2);
    }
  }

  function checkAndPass2() {
    clearErrors("release_date");
    clearErrors("conservation_description");
    clearErrors("conservation_state");
    let release_dateCheck = false;
    let conservation_descriptionCheck = false;
    let conservation_stateCheck = false;
    if (getFieldState("release_date").isDirty && getValues("release_date") !== "") {
      release_dateCheck = true;
    } else {
      release_dateCheck = false;
      trigger("release_date");
    }

    if (
      getFieldState("conservation_description").isDirty &&
      getValues("conservation_description") !== ""
    ) {
      conservation_descriptionCheck = true;
    } else {
      conservation_descriptionCheck = false;
      trigger("conservation_description");
    }

    if (getFieldState("conservation_state").isDirty && getValues("conservation_state") !== "") {
      conservation_stateCheck = true;
    } else {
      conservation_stateCheck = false;
      trigger("conservation_state");
    }

    if (release_dateCheck && conservation_descriptionCheck && conservation_stateCheck) {
      setCurrentSection(3);
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
              autoComplete={Platform.OS === "web" ? "none" : "off"}
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
        {errors.name && (
          <Text style={{ color: "red" }}>{errors.name.message}</Text>
        )}
      </InputView>

      <InputView>
        <Controller
          control={control}
          name="id_photo"
          defaultValue=""
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              autoComplete={Platform.OS === "web" ? "none" : "off"}
              error={errors.id_photo}
              mode="outlined"
              activeOutlineColor={style.colors.primary}
              value={value}
              onBlur={onBlur}
              onChangeText={(value: any) => onChange(value)}
              style={textInputStyle}
              theme={textInputTheme}
              outlineColor={style.colors.black}
              label="Foto*"
            />
          )}
          rules={{
            required: "A foto é obrigatória",
          }}
        />
        {errors.id_photo && (
          <Text style={{ color: "red" }}>{errors.id_photo.message}</Text>
        )}
      </InputView>

      <InputView>
        <Controller
          control={control}
          name="material"
          defaultValue=""
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              autoComplete={Platform.OS === "web" ? "none" : "off"}
              error={errors.material}
              mode="outlined"
              activeOutlineColor={style.colors.primary}
              value={value}
              onBlur={onBlur}
              onChangeText={(value: any) => onChange(value)}
              style={textInputStyle}
              theme={textInputTheme}
              outlineColor={style.colors.black}
              label="Material do item*"
            />
          )}
          rules={{
            required: "O material é obrigatório",
          }}
        />
        {errors.material && (
          <Text style={{ color: "red" }}>{errors.material.message}</Text>
        )}
      </InputView>

      <InputView>
        <Controller
          control={control}
          name="description"
          defaultValue=""
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              autoComplete={Platform.OS === "web" ? "none" : "off"}
              error={errors.description}
              mode="outlined"
              activeOutlineColor={style.colors.primary}
              value={value}
              onBlur={onBlur}
              onChangeText={(value: any) => onChange(value)}
              style={textInputStyle}
              theme={textInputTheme}
              outlineColor={style.colors.black}
              label="Descrição do item*"
              multiline={true}
              numberOfLines={6}
            />
          )}
          rules={{
            required: "A descrição é obrigatória",
          }}
        />
        {errors.description && (
          <Text style={{ color: "red" }}>{errors.description.message}</Text>
        )}
      </InputView>

      <InputView>
        <Controller
          control={control}
          name="reference_measures"
          defaultValue=""
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              autoComplete={Platform.OS === "web" ? "none" : "off"}
              error={errors.reference_measures}
              mode="outlined"
              activeOutlineColor={style.colors.primary}
              value={value}
              onBlur={onBlur}
              onChangeText={(value: any) => onChange(value)}
              style={textInputStyle}
              theme={textInputTheme}
              outlineColor={style.colors.black}
              label="Medidas do item"
            />
          )}
          rules={{
            required: "A descrição é obrigatória",
          }}
        />
        {errors.reference_measures && (
          <Text style={{ color: "red" }}>
            {errors.reference_measures.message}
          </Text>
        )}
      </InputView>

      <ButtonsView>
        <NextButton onPress={() => checkAndPass()}>
          <Text style={{ color: "white" }}>Próximo</Text>
        </NextButton>
      </ButtonsView>
    </View>
  );

  const secondSection = (
    <View>
      <InputView>
        <Controller
          control={control}
          name="release_date"
          defaultValue=""
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              autoComplete={Platform.OS === "web" ? "none" : "off"}
              error={errors.release_date}
              mode="outlined"
              activeOutlineColor={style.colors.primary}
              value={value}
              onBlur={onBlur}
              onChangeText={(value: any) => onChange(value)}
              style={textInputStyle}
              theme={textInputTheme}
              outlineColor={style.colors.black}
              label="Data de lançamento*"
            />
          )}
          rules={{
            required: "A data de lançamento é obrigatória",
          }}
        />
        {errors.release_date && (
          <Text style={{ color: "red" }}>{errors.release_date.message}</Text>
        )}
      </InputView>

      <InputView>
        <Controller
          control={control}
          name="publication_date"
          defaultValue=""
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              autoComplete={Platform.OS === "web" ? "none" : "off"}
              error={errors.publication_date}
              mode="outlined"
              activeOutlineColor={style.colors.primary}
              value={value}
              onBlur={onBlur}
              onChangeText={(value: any) => onChange(value)}
              style={textInputStyle}
              theme={textInputTheme}
              outlineColor={style.colors.black}
              label="Data da publicação*"
            />
          )}
          rules={{
            required: "A data de publicação é obrigatória",
          }}
        />
        {errors.publication_date && (
          <Text style={{ color: "red" }}>{errors.publication_date.message}</Text>
        )}
      </InputView>

      <InputView>
        <Controller
          control={control}
          name="conservation_state"
          defaultValue=""
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              autoComplete={Platform.OS === "web" ? "none" : "off"}
              error={errors.conservation_state}
              mode="outlined"
              activeOutlineColor={style.colors.primary}
              value={value}
              onBlur={onBlur}
              onChangeText={(value: any) => onChange(value)}
              style={textInputStyle}
              theme={textInputTheme}
              outlineColor={style.colors.black}
              label="Estado de consevação do item*"
            />
          )}
          rules={{
            required: "O estado de conservação é obrigatório",
          }}
        />
        {errors.conservation_state && (
          <Text style={{ color: "red" }}>{errors.conservation_state.message}</Text>
        )}
      </InputView>

      <InputView>
        <Controller
          control={control}
          name="conservation_description"
          defaultValue=""
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              autoComplete={Platform.OS === "web" ? "none" : "off"}
              error={errors.conservation_description}
              mode="outlined"
              activeOutlineColor={style.colors.primary}
              value={value}
              onBlur={onBlur}
              onChangeText={(value: any) => onChange(value)}
              style={textInputStyle}
              theme={textInputTheme}
              outlineColor={style.colors.black}
              label="Descrição do item*"
              multiline={true}
              numberOfLines={6}
            />
          )}
          rules={{
            required: "A descrição é obrigatória",
          }}
        />
        {errors.conservation_description && (
          <Text style={{ color: "red" }}>{errors.conservation_description.message}</Text>
        )}
      </InputView>

      <ButtonsView>
        <NextButton onPress={() => checkAndPass2()}>
          <Text style={{ color: "white" }}>Próximo</Text>
        </NextButton>
      </ButtonsView>
    </View>
  );

  const thirdSection = (
    <View>
      <InputView>
        <Controller
          control={control}
          name="email"
          defaultValue=""
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              autoComplete={Platform.OS === "web" ? "none" : "off"}
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
        {errors.email && (
          <Text style={{ color: "red" }}>{errors.email.message}</Text>
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
                  name={securePassword ? "eye-outline" : "eye-off-outline"}
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
                    secureConfirmPassword ? "eye-outline" : "eye-off-outline"
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

      <ButtonsView>
        <NextButton onPress={handleSubmit(onSubmit)}>
          <Text style={{ color: `${style.colors.white}`, fontSize: "16px" }}>
            Criar novo usuário
          </Text>
        </NextButton>
        <BackButton onPress={() => setCurrentSection(1)}>
          <Text style={{ color: `${style.colors.white}`, fontSize: "16px" }}>
            Voltar
          </Text>
        </BackButton>
      </ButtonsView>
    </View>
  );

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Sidebar func={getIsOpenProp} />
      <DashboardView isOpen={isOpen}>
        <SafeAreaView
          style={{
            flex: 1,
            alignItems: "center",
            overflow: "scroll",
            paddingBottom: 64,
          }}
        >
          <SignInView>
            <SignInTitleView>
              <Title>Cadastro</Title>
              <Progress
                progress={currentSection === 1 ? 50 : 100}
                height={10}
                trackColor={"#A9A9A9"}
                backgroundColor={style.colors.primary}
                iconColor={
                  currentSection === 1 ? "#A9A9A9" : style.colors.primary
                }
              />
            </SignInTitleView>
            {currentSection === 1 && firstSection}
            {currentSection === 2 && secondSection}
            {currentSection === 3 && thirdSection}
          </SignInView>
          <Copyright />
        </SafeAreaView>
      </DashboardView>
    </View>
  );
};

export default SignIn;
