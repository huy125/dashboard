import Navbar from "@/app/components/Header/Navbar";

const Header: React.FC = () => {
    return (
        <header className="fixed top-0 left-0 z-10 w-full duration-300 ease-in">
            <div>
                <Navbar/>
            </div>
        </header>
    );
};

export default Header;
