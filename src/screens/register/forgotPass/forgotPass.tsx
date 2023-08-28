import { Background, Button, CustomInput, MediumText } from "@components";
import { NavigationProps } from "@types";
import React from "react";
import { View } from "react-native";

type Props = {};

const forgotPass = ({ navigation }: NavigationProps<"forgotPass">) => {
    // const { email, password, role } = values;

    return (
        <Background>
            <View
                style={{
                    height: "100%",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <MediumText string="Forgot Password" />
                <CustomInput
                    // value={email}
                    // error={touched.email && errors.email}
                    // onChangeText={handleChange("email")}
                    // onBlur={handleBlur("email")}
                    autoCapitalize="none"
                    placeholder={"Email"}
                    style={{ width: "90%", marginVertical: 12 }}
                />
                <Button
                    btnName={"Submit"}
                    weight="400"
                    style={{
                        width: "80%",
                        marginVertical: 12,
                        backgroundColor: "#281B89"
                    }}
                    // onPress={() => handleSubmit()}
                />
            </View>
        </Background>
    );
};

export default forgotPass;
