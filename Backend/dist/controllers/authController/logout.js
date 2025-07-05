export const Logout = async (req, res) => {
    try {
        res.clearCookie('jwt');
        return res.json({ message: 'User logged out', success: true });
    }
    catch (error) {
        res.json({ message: "Logout failed", success: false });
        console.log("logout error :", error);
    }
};
