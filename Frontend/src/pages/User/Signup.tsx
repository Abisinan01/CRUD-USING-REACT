import { useSelector } from "react-redux";
import SignupForm from "../../components/Form/SignupForm";
import { Spinner } from "flowbite-react";
import type { RootState } from "../../redux/store";
const Signup = () => {
    const { status } = useSelector((state: RootState) => state.auth)
    return (
        <>
            {status === 'loading' && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <Spinner
                        aria-label="Loading user data"
                        color="info"
                        size="xl"
                        className='slow-spin'
                    />
                </div>
            )}
            <div className="bg-black w-screen h-screen flex items-center justify-center">
                <div className="p-[1px] bg-gradient-to-r from-neutral-500 via-blue-700 to-neutral-800 rounded-sm">
                    <SignupForm />
                </div>
            </div>
        </>
    );
};

export default Signup;
