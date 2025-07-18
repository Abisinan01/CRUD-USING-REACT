const Footer = () => {
    return (
        <footer className="h-[20vh] w-full bg-black/30 text-white text-center flex flex-col items-center justify-center space-y-2 text-sm">
            <p>© {new Date().getFullYear()} User Management App</p>
            <div className="flex space-x-4">
                <a className="hover:underline">Privacy Policy</a>
                <a className="hover:underline">Terms of Service</a>
                <a className="hover:underline">Contact</a>
            </div>
        </footer>
    )
}

export default Footer