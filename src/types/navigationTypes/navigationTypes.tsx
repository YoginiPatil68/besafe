import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { ImageSourcePropType } from "react-native";

export type StackNavigatorParams = {
    Home: undefined;
    Getstarted: undefined;
    Language: undefined;
    Register: undefined;
    PoliceSignin: undefined;
    PoliceSignup: undefined;
    PoliceDetail: {
        uri: ImageSourcePropType;
        role: number;
    };
    DetailFilled: undefined;
    CitizenSignin: undefined;
    CitizenSignup: undefined;
    forgotPass: undefined;
    SignIn: {
        uri: ImageSourcePropType;
        role: number;
        agree?: string;
    };
    SignUp: {
        uri: ImageSourcePropType;
        role: number;
        agree?: string;
    };
    UserProfile: undefined;
    EditProfile: undefined;
    ViewProfile: {
        id: string;
        name: string;
        role: number;
        avatar: string;
        email: string;
        userDetails: any;
    };
    Setting: undefined;
    PostForm: undefined;
    Help: undefined;
    Post: undefined;
    Wanted: undefined;
    CyberCrime: undefined;
    MissingPerson: undefined;
    MSLF: undefined;
    UnidPerson: undefined;
    Bank: undefined;
    MobileApp: undefined;
    Exam: undefined;
    NearbyPolice: undefined;
    ViewPost: undefined;
    ViewWanted: undefined;
    ViewCyberCrime: undefined;
    ViewMissingPerson: undefined;
    ViewMSLF: undefined;
    ViewUnidentifiedPerson: undefined;
    ViewMobApp: undefined;
    ViewBank: undefined;
    HistoryPost: undefined;
    HistoryWanted: undefined;
    HistoryCyberCrime: undefined;
    HistoryMissingPerson: undefined;
    HistoryMSLF: undefined;
    HistoryUnidPerson: undefined;
    HistoryUnidentifiedPerson: undefined;
    ViewExam: undefined;
    ViewAllComplaints: undefined;
    HistoryAllComplaints: undefined;
    AllComplaints: undefined;
    Complaints: undefined;
    ComplaintGroup: undefined;
    ComplaintsLayout: {
        _id?: string;
        complaintAgainst?: string;
        complaintAgainstName?: string;
        complaintType?: string;
        createdAt?: Date;
        proof?: string;
        reason?: string;
        status?: string;
        updatedAt?: Date;
        images?: string[];
        assignTo?: string;
    };
};

export type NavigationProps<T extends keyof StackNavigatorParams> = {
    navigation: StackNavigationProp<StackNavigatorParams, T>;
    route: RouteProp<StackNavigatorParams, T>;
};
