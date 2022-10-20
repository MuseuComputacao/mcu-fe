import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput } from "react-native-paper";
import { style } from "../../globalStyles";
import { Link, useLinkTo } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import {
  SignInView,
  SignInTitleView,
  Title,
  InputView,
  InputView2,
  NextButton,
  BackButton,
  ButtonsView,
  SubtitlesView,
  SubtitlesText,
  ImageContainer,
  ProductImage,
  InputView3,
} from "./styles";

import { Upload } from "element-react";
import RoleService from "../../services/RoleService";
import Sidebar from "../../components/Sidebar";
import { DashboardView } from "../Dashboard/styles";
import Ionicon from "react-native-vector-icons/Ionicons";
import ItemService from "../../services/ItemService";

interface AddItemFormData {
  name: string;
  id_photo: string;
  description: string;
  material: string;
  reference_measures: string;
  release_date: string;
  publication_date: string;
  conservation_state: string;
  conservation_description: string;
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

const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    getFieldState,
    getValues,
    setValue,
    trigger,
    clearErrors,
  } = useForm({ mode: "onSubmit" });
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const linkTo = useLinkTo();

  const [isOpen, setIsOpen] = useState<boolean>(true);
  function getIsOpenProp(getIsOpen: boolean) {
    setIsOpen(getIsOpen);
  }

  const onSubmit = async (data: AddItemFormData) => {
    ItemService.createItem(data).then((response) => {
      linkTo("/admin/items");
    });
  };

  async function openImagePickerAsyncProduct() {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      console.log("acesso negado");
      return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      setCapturedPhoto(result.uri);
      setHasPhoto(true);
      setValue("id_photo", result.base64, { shouldValidate: true });
    }
  }

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
            </SignInTitleView>
            <View>
              <SubtitlesText> Informações sobre o item: </SubtitlesText>
              <InputView>
                <Controller
                  control={control}
                  name="id_photo"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TouchableOpacity
                      onPress={() => openImagePickerAsyncProduct()}
                    >
                      <ImageContainer>
                        {!hasPhoto && (
                          <Ionicon
                            name="camera-outline"
                            size={38}
                            color={style.colors.primary}
                            style={{ alignSelf: "center", paddingVertical: 32 }}
                          />
                        )}
                        {hasPhoto && (
                          <ProductImage
                            style={{ aspectRatio: 3 / 4 }}
                            source={{ uri: capturedPhoto }}
                          />
                        )}
                      </ImageContainer>
                    </TouchableOpacity>
                  )}
                  rules={{
                    required: "Preencha este campo.",
                  }}
                />

                {errors.id_photo && (
                  <Text style={{ color: "red" }}>
                    {errors.id_photo.message}
                  </Text>
                )}
              </InputView>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <InputView2>
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
                </InputView2>

                <InputView2>
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
                    <Text style={{ color: "red" }}>
                      {errors.material.message}
                    </Text>
                  )}
                </InputView2>

                <InputView2>
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
                </InputView2>
              </View>

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
                  <Text style={{ color: "red" }}>
                    {errors.description.message}
                  </Text>
                )}
              </InputView>

              <SubtitlesText> Informações sobre datas: </SubtitlesText>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <InputView3>
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
                    <Text style={{ color: "red" }}>
                      {errors.release_date.message}
                    </Text>
                  )}
                </InputView3>

                <InputView3>
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
                        label="Data da publicação"
                      />
                    )}
                  />
                </InputView3>
              </View>

              <SubtitlesText>
                {" "}
                Informações sobre estado de conservação:{" "}
              </SubtitlesText>

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
                  <Text style={{ color: "red" }}>
                    {errors.conservation_state.message}
                  </Text>
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
                      label="Descrição do estado de conservação*"
                      multiline={true}
                      numberOfLines={6}
                    />
                  )}
                  rules={{
                    required: "A descrição é obrigatória",
                  }}
                />
                {errors.conservation_description && (
                  <Text style={{ color: "red" }}>
                    {errors.conservation_description.message}
                  </Text>
                )}
              </InputView>

              <InputView>
                <Controller
                  control={control}
                  name="recommendations"
                  defaultValue=""
                  render={({ field: { onBlur, onChange, value } }) => (
                    <TextInput
                      autoComplete={Platform.OS === "web" ? "none" : "off"}
                      error={errors.recommendations}
                      mode="outlined"
                      activeOutlineColor={style.colors.primary}
                      value={value}
                      onBlur={onBlur}
                      onChangeText={(value: any) => onChange(value)}
                      style={textInputStyle}
                      theme={textInputTheme}
                      outlineColor={style.colors.black}
                      label="Recomendações*"
                      multiline={true}
                      numberOfLines={6}
                    />
                  )}
                  rules={{
                    required: "A descrição é obrigatória",
                  }}
                />
                {errors.recommendations && (
                  <Text style={{ color: "red" }}>
                    {errors.recommendations.message}
                  </Text>
                )}
              </InputView>

              <InputView>
                <Controller
                  control={control}
                  name="general_observations"
                  defaultValue=""
                  render={({ field: { onBlur, onChange, value } }) => (
                    <TextInput
                      autoComplete={Platform.OS === "web" ? "none" : "off"}
                      error={errors.general_observations}
                      mode="outlined"
                      activeOutlineColor={style.colors.primary}
                      value={value}
                      onBlur={onBlur}
                      onChangeText={(value: any) => onChange(value)}
                      style={textInputStyle}
                      theme={textInputTheme}
                      outlineColor={style.colors.black}
                      label="Observações gerais*"
                      multiline={true}
                      numberOfLines={6}
                    />
                  )}
                  rules={{
                    required: "A descrição é obrigatória",
                  }}
                />
                {errors.general_observations && (
                  <Text style={{ color: "red" }}>
                    {errors.general_observations.message}
                  </Text>
                )}
              </InputView>

              <SubtitlesText> Informações sobre origem do item: </SubtitlesText>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <InputView2>
                  <Controller
                    control={control}
                    name="origin"
                    defaultValue=""
                    render={({ field: { onBlur, onChange, value } }) => (
                      <TextInput
                        autoComplete={Platform.OS === "web" ? "none" : "off"}
                        error={errors.origin}
                        mode="outlined"
                        activeOutlineColor={style.colors.primary}
                        value={value}
                        onBlur={onBlur}
                        onChangeText={(value: any) => onChange(value)}
                        style={textInputStyle}
                        theme={textInputTheme}
                        outlineColor={style.colors.black}
                        label="Origem do item*"
                      />
                    )}
                    rules={{
                      required: "a origem é obrigatório",
                    }}
                  />
                  {errors.origin && (
                    <Text style={{ color: "red" }}>
                      {errors.origin.message}
                    </Text>
                  )}
                </InputView2>

                <InputView2>
                  <Controller
                    control={control}
                    name="country"
                    defaultValue=""
                    render={({ field: { onBlur, onChange, value } }) => (
                      <TextInput
                        autoComplete={Platform.OS === "web" ? "none" : "off"}
                        error={errors.country}
                        mode="outlined"
                        activeOutlineColor={style.colors.primary}
                        value={value}
                        onBlur={onBlur}
                        onChangeText={(value: any) => onChange(value)}
                        style={textInputStyle}
                        theme={textInputTheme}
                        outlineColor={style.colors.black}
                        label="Estado de origem*"
                      />
                    )}
                    rules={{
                      required: "O estado de origem é obrigatório",
                    }}
                  />
                  {errors.country && (
                    <Text style={{ color: "red" }}>
                      {errors.country.message}
                    </Text>
                  )}
                </InputView2>

                <InputView2>
                  <Controller
                    control={control}
                    name="localization"
                    defaultValue=""
                    render={({ field: { onBlur, onChange, value } }) => (
                      <TextInput
                        autoComplete={Platform.OS === "web" ? "none" : "off"}
                        error={errors.localization}
                        mode="outlined"
                        activeOutlineColor={style.colors.primary}
                        value={value}
                        onBlur={onBlur}
                        onChangeText={(value: any) => onChange(value)}
                        style={textInputStyle}
                        theme={textInputTheme}
                        outlineColor={style.colors.black}
                        label="Localidade*"
                      />
                    )}
                    rules={{
                      required: "O estado de origem é obrigatório",
                    }}
                  />
                  {errors.localization && (
                    <Text style={{ color: "red" }}>
                      {errors.localization.message}
                    </Text>
                  )}
                </InputView2>
              </View>

              <SubtitlesText> Informações sobre doadores: </SubtitlesText>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <InputView3>
                  <Controller
                    control={control}
                    name="donor_by"
                    defaultValue=""
                    render={({ field: { onBlur, onChange, value } }) => (
                      <TextInput
                        autoComplete={Platform.OS === "web" ? "none" : "off"}
                        error={errors.donor_by}
                        mode="outlined"
                        activeOutlineColor={style.colors.primary}
                        value={value}
                        onBlur={onBlur}
                        onChangeText={(value: any) => onChange(value)}
                        style={textInputStyle}
                        theme={textInputTheme}
                        outlineColor={style.colors.black}
                        label="Doado por*"
                      />
                    )}
                    rules={{
                      required: "a origem é obrigatório",
                    }}
                  />
                  {errors.donor_by && (
                    <Text style={{ color: "red" }}>
                      {errors.donor_by.message}
                    </Text>
                  )}
                </InputView3>

                <InputView3>
                  <Controller
                    control={control}
                    name="donation_date"
                    defaultValue=""
                    render={({ field: { onBlur, onChange, value } }) => (
                      <TextInput
                        autoComplete={Platform.OS === "web" ? "none" : "off"}
                        error={errors.donation_date}
                        mode="outlined"
                        activeOutlineColor={style.colors.primary}
                        value={value}
                        onBlur={onBlur}
                        onChangeText={(value: any) => onChange(value)}
                        style={textInputStyle}
                        theme={textInputTheme}
                        outlineColor={style.colors.black}
                        label="Data da doação*"
                      />
                    )}
                    rules={{
                      required: "O estado de origem é obrigatório",
                    }}
                  />
                  {errors.donation_date && (
                    <Text style={{ color: "red" }}>
                      {errors.donation_date.message}
                    </Text>
                  )}
                </InputView3>
              </View>

              <ButtonsView>
                <NextButton onPress={handleSubmit(onSubmit)}>
                  <Text
                    style={{ color: `${style.colors.white}`, fontSize: "16px" }}
                  >
                    Cadastrar novo item
                  </Text>
                </NextButton>
              </ButtonsView>
            </View>
          </SignInView>
        </SafeAreaView>
      </DashboardView>
    </View>
  );
};

export default SignIn;
