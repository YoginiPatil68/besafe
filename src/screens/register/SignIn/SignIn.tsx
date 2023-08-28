import { Background, Button, CustomInput, LightText, Password, Text } from "@components";
import { NavigationProps } from "@types";
import { colors } from "@utils";
import React, { ReactElement } from "react";
import { View, Image } from "react-native";
import styles from "./signin.styles";
import { SignInvalidationSchema } from "@utils";
import { Formik, FormikHelpers } from "formik";
import { myDetails, signInUser } from "@contexts/api/client";
import { useDispatch } from "react-redux";
import { getTokens, signUp, userData } from "@contexts/slice/authSlice";
import { isTokenExpired } from "@contexts/store/credentials";
import { string } from "yup/lib/locale";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { useTranslation } from "react-i18next";
import forgotPass from "../forgotPass/forgotPass";

interface signInProps {
    email: string;
    password: string;
    role: number;
}

export default function SignIn({ navigation, route }: NavigationProps<"SignIn">): ReactElement {
    const signInInfo = {
        email: "",
        password: "",
        role: route.params.role
    };
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [signInError, setSignInError] = React.useState("");
    const SignInUser = async (values: signInProps, formikActions: FormikHelpers<signInProps>) => {
        try {
        } catch (error) {
            console.log(error);
        }
        const res = await fetch(signInUser, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...values })
        });
        const user = await res.json();
        if (user.success) {
            if (!isTokenExpired(user.access_token)) {
                dispatch(userData(user.result));
                dispatch(getTokens(user));
                //active status to be send from backend to login police
            }
            dispatch(signUp(user));
        } else {
            setSignInError("Invalid mail id or password");
        }
    };

    const [hidePass, setHidePass] = React.useState(true);

    return (
        <Background>
            <View style={styles.view}>
                <View style={styles.box1}>
                    <Image resizeMode="center" style={styles.img} source={route.params.uri} />
                    <Text style={{ color: colors.white }}>
                        {t("signAs")}{" "}
                        {route.params.role === 5000
                            ? `${t("police")}`
                            : route.params.role === 4000
                            ? `${t("station")}`
                            : `${t("citizen")}`}
                    </Text>
                </View>
                <View style={styles.box2}>
                    <Formik
                        initialValues={signInInfo}
                        validationSchema={SignInvalidationSchema}
                        onSubmit={SignInUser}
                    >
                        {({ values, handleChange, errors, handleBlur, touched, handleSubmit }) => {
                            const { email, password, role } = values;
                            return (
                                <>
                                    <Text weight="700" style={{ color: "red", fontSize: 14 }}>
                                        {signInError}
                                    </Text>
                                    <CustomInput
                                        value={email}
                                        error={touched.email && errors.email}
                                        onChangeText={handleChange("email")}
                                        onBlur={handleBlur("email")}
                                        autoCapitalize="none"
                                        placeholder={t("userId")}
                                        style={{ marginVertical: 12 }}
                                    />
                                    <Password
                                        value={password}
                                        error={touched.password && errors.password}
                                        onChangeText={handleChange("password")}
                                        onBlur={handleBlur("password")}
                                        placeholder={`${t("pass")}`}
                                        style={{ marginVertical: 12 }}
                                    />
                                    <Text
                                        weight="200"
                                        style={{ color: "#FFF" }}
                                        onPress={() => navigation.navigate("forgotPass")}
                                    >
                                        {`${t("forgetPass")}`}
                                    </Text>
                                    <Button
                                        btnName={t("signIn")}
                                        weight="400"
                                        style={{
                                            width: "80%",
                                            marginVertical: 12,
                                            backgroundColor: "#281B89"
                                        }}
                                        onPress={() => handleSubmit()}
                                    />
                                </>
                            );
                        }}
                    </Formik>
                    <Text
                        weight="200"
                        style={{ color: "#FFF", fontSize: 18 }}
                        onPress={() => navigation.navigate("SignUp", route.params)}
                    >
                        {t("createAc")}
                    </Text>
                </View>
            </View>
        </Background>
    );
}
