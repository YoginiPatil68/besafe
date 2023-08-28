import { Background, LightText, MediumText, RegularText } from "@components";
import { NavigationProps } from "@types";
import React from "react";
import { FlatList, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export function Wanted({ navigation }: NavigationProps<"Wanted">) {
    const wantedTips = [
        {
            tip: "Protect yourself",
            soln: "Run, call for help, or hide. Do what is necessary to keep yourself out of harm's way."
        },
        {
            tip: "Help others",
            soln: "Offer first aid to anyone who's injured."
        },
        {
            tip: "Call for help",
            soln: "As soon as possible, dial 911 to report the crime and to summon medical and law enforcement help."
        },
        {
            tip: "Don't touch or move anything",
            soln: "Remember that anything you touch or move can damage or contaminate critical evidence."
        },
        {
            tip: "Pay attention",
            soln: "Take a deep breath, relax, and look around. Notice people, what they look like, what they're wearing, any distinguishing marks they have, and what they're doing. Notice vehicle make, model, and license number, or any other distinguishing details, if possible."
        },
        {
            tip: "Wait for the police",
            soln: "When the police arrive, direct them to the crime and to any injured parties. Tell them exactly what you witnessed and answer all questions truthfully. Be careful to relate only what you know and don't attempt to help by filling in any gaps with what you believe should be true."
        }
    ];
    const tips = ({ item }: any) => {
        return (
            <View style={{ paddingBottom: 20 }}>
                <MediumText align="flex-start" vmargin={10} size={15} string={item.tip} />
                <LightText string={item.soln} />
            </View>
        );
    };
    return (
        <Background>
            <FlatList
                style={{ paddingHorizontal: 20 }}
                data={wantedTips}
                renderItem={tips}
                ListHeaderComponent={<MediumText size={20} string="Tips" />}
                ItemSeparatorComponent={() => (
                    <View
                        style={{
                            height: 1,
                            width: "100%",
                            backgroundColor: "#FFF"
                        }}
                    />
                )}
                ListHeaderComponentStyle={{ marginBottom: 20 }}
                keyExtractor={item => item.tip}
            />
        </Background>
    );
}
