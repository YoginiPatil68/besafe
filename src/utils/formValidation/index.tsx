import * as Yup from "yup";

export const SignInvalidationSchema = Yup.object({
    email: Yup.string().email("Invalid email!").required("email is required"),
    password: Yup.string().trim().min(8, "Password is to short! ").required("Password is required")
});
export const SignUpvalidationSchema = Yup.object({
    name: Yup.string().trim().min(3, "Invalid name").required("Name is required"),
    email: Yup.string().email("Invalid email!").required("email is required"),
    password: Yup.string()
        .trim()
        .min(8, "Password is to short! ")
        .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase and One Number"
        )
        .required("Password is required"),
    confirmPassword: Yup.string().equals([Yup.ref("password"), null], "Password does not match!")
});

interface signInInfoProps {
    email: string;
    password: string;
}

export const isValidObjectField = (obj: signInInfoProps): boolean => {
    return Object.values(obj).every(value => value.trim());
};

export const updateError = (
    error: string,
    stateUpdater: React.Dispatch<React.SetStateAction<string>>
): void => {
    stateUpdater(error);
    setTimeout(() => {
        stateUpdater("");
    }, 2500);
};

export const isValidEmail = (value: string): boolean => {
    const regx = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    return regx.test(value);
};
