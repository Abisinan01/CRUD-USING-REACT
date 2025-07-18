import * as Yup from 'yup';

const passwordRegex = /[A-Za-z\d@$!%*?&]{6,}/;
export const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
        .required("Email is required")
        .email("Invalid email format"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(
            passwordRegex,
            "Password must contain at least one digit, one uppercase, one lowercase and one symbol"
        ),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required")
});



export const validationSchemaLogin = Yup.object().shape({
    username: Yup.string().required("Please enter valid username or emailId"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(
            passwordRegex,
            "Password must contain at least one digit, one uppercase, one lowercase and one symbol"
        )
});
