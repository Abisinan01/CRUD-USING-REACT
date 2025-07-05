import CreateNewUsers from "../../utils/createNewUsers";
const SignUpForm = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body.formData;
        console.log("password ", password);
        const newUser = await CreateNewUsers({ username, email, password });
        console.log('new user', newUser);
        res.status(200).json(newUser);
        return;
    }
    catch (error) {
        console.log(error);
    }
};
export default SignUpForm;
