import Text from "../text/Text";
import React, { ReactElement } from "react";
import {
    View,
    Image,
    StyleSheet,
    ImageSourcePropType,
    TouchableWithoutFeedbackProps,
    TouchableWithoutFeedback
} from "react-native";

type charRoleProps = {
    role: string;
    uri: ImageSourcePropType;
} & TouchableWithoutFeedbackProps;

// interface Props {

//     margin?: number;

// }

export function CharRole({ role, uri, ...props }: charRoleProps): ReactElement {
    return (
        <View>
            <TouchableWithoutFeedback {...props}>
                <View style={styles.char}>
                    <Image
                        source={uri}
                        style={{ height: 180, maxWidth: "80%", resizeMode: "contain" }}
                    />
                    <Text weight="400" style={styles.text}>
                        {role}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    char: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 15
    },
    text: {
        color: "#FFF",
        marginTop: 10
    }
});
