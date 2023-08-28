import { Background, Button, CustomInput, Password, Text, TextCheckBox } from "@components";
import { NavigationProps } from "@types";
import React, { ReactElement } from "react";
import { View, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styles from "./signup.styles";
import { Formik, FormikHelpers } from "formik";
import { SignUpvalidationSchema } from "@utils";
import { createUser, myDetails, signInUser } from "@contexts/api/client";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { getTokens, signUp, userData } from "@contexts/slice/authSlice";
import { isTokenExpired } from "@contexts/store/credentials";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";

export default function SignUp({ navigation, route }: NavigationProps<"SignUp">): ReactElement {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [toggleCheckBox, setToggleCheckBox] = React.useState(false);
    const signUpInfo = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: route.params.role
    };
    const emailMessage = {
        citizen: "Kindly update your personal details so you can have full access to our App",
        police: "Now as you have Created account for police you will be going under validation process to have complete access to our App"
    };
    const [signUpError, setSignUpError] = React.useState("");
    const SignUpUser = async (values: {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
        role: number;
    }) => {
        try {
            const res = await fetch(createUser, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...values })
            });
            const user = await res.json();
            console.log(user);
            if (user.success) {
                const emailres = await emailjs.send(
                    "gmail",
                    "signUp",
                    {
                        email: values.email,
                        message: values.role === 3000 ? emailMessage.citizen : emailMessage.police
                    },
                    "user_brys7kId9nfyXkoJzjuw5"
                );
                if (!isTokenExpired(user.access_token)) {
                    dispatch(userData(user.result));
                    dispatch(getTokens(user));
                    //active status to be send from backend to login police
                }
                dispatch(signUp(user));
            } else {
                setSignUpError("Invalid mail id or password");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const [hidePass, setHidePass] = React.useState(true);
    return (
        <Background>
            <View style={styles.view}>
                <View style={styles.box1}>
                    <Image style={styles.img} source={route.params.uri} />
                    <Text style={{ color: "#FFF", marginTop: 15 }}>
                        {t("signUpAs")}{" "}
                        {route.params.role === 5000
                            ? `${t("police")}`
                            : route.params.role === 4000
                            ? `${t("station")}`
                            : `${t("citizen")}`}
                    </Text>
                </View>
                <View style={styles.box2}>
                    <Formik
                        initialValues={signUpInfo}
                        validationSchema={SignUpvalidationSchema}
                        onSubmit={SignUpUser}
                    >
                        {({ values, handleChange, errors, handleBlur, touched, handleSubmit }) => {
                            const { name, email, password, confirmPassword, role } = values;
                            return (
                                <>
                                    <Text weight="700" style={{ color: "red", fontSize: 14 }}>
                                        {signUpError}
                                    </Text>
                                    <ScrollView style={{ width: "80%", height: "60%" }}>
                                        <CustomInput
                                            value={name}
                                            error={touched.name && errors.name}
                                            onChangeText={handleChange("name")}
                                            onBlur={handleBlur("name")}
                                            placeholder={t("name")}
                                            style={{ marginVertical: 12 }}
                                        />
                                        <CustomInput
                                            value={email}
                                            error={touched.email && errors.email}
                                            onChangeText={handleChange("email")}
                                            onBlur={handleBlur("email")}
                                            placeholder={t("email")}
                                            style={{ marginVertical: 12 }}
                                        />
                                        <Password
                                            value={password}
                                            error={touched.password && errors.password}
                                            onChangeText={handleChange("password")}
                                            onBlur={handleBlur("password")}
                                            placeholder={t("pass")}
                                            style={{ marginVertical: 12 }}
                                        />
                                        <CustomInput
                                            value={confirmPassword}
                                            error={
                                                touched.confirmPassword && errors.confirmPassword
                                            }
                                            onChangeText={handleChange("confirmPassword")}
                                            onBlur={handleBlur("confirmPassword")}
                                            secureTextEntry={true}
                                            placeholder={`${t("pass")} ${t("cPass")}`}
                                            style={{ marginVertical: 12 }}
                                        />
                                        {route.params.agree && (
                                            <TextCheckBox
                                                toggleCheckBox={toggleCheckBox}
                                                setToggleCheckBox={setToggleCheckBox}
                                                agree={route.params.agree}
                                            />
                                        )}
                                        <Button
                                            btnName={t("signUp")}
                                            weight="400"
                                            style={{
                                                marginVertical: 12,
                                                backgroundColor: "#281B89"
                                            }}
                                            onPress={() => handleSubmit()}
                                        />
                                    </ScrollView>
                                </>
                            );
                        }}
                    </Formik>
                </View>
            </View>
        </Background>
    );
}

{
    /* <CustomInput
                                                value={password}
                                                error={touched.password && errors.password}
                                                onChangeText={handleChange("password")}
                                                onBlur={handleBlur("password")}
                                                secureTextEntry={hidePass ? true : false}
                                                placeholder="Password"
                                                style={{
                                                    width: "89%",
                                                    marginVertical: 12
                                                    // position: "relative"
                                                }}
                                            /> */
}
