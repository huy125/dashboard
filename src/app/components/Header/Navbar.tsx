"use client"

import Link from "next/link";
import {AiOutlineMenu, AiOutlineClose} from "react-icons/ai";
import {useState} from "react";

const Navbar= () => {
    const [nav, setNav] = useState(false);
    const handleNav = () => {
        setNav(!nav)
    }
    return (
        <div>
            <div className="m-auto flex items-center justify-between p-4 text-white">
                <Link href={"/"} data-testid={"logo-link"}>
                    <h1 className="text-4xl font-bold">FirePhoenix</h1>
                </Link>
                <ul className="hidden sm:flex">
                    <li className="p-4 hover:text-gray-500">
                        <Link href={"/"} data-testid={"overview-link"}>Overview</Link>
                    </li>
                    <li className="p-4 hover:text-gray-500">
                        <Link href={"/incomes"}>Incomes</Link>
                    </li>
                    <li className="p-4 hover:text-gray-500">
                        <Link href={"/projects"}>Projects</Link>
                    </li>
                    <li className="p-4 hover:text-gray-500">
                        <Link href={"/sales"}>Sales</Link>
                    </li>
                </ul>

                {/* Mobile Button */}
                <div onClick={handleNav} className="z-10 block sm:hidden" data-testid={"mobile-button"}>
                    {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
                </div>

                {/* Mobile Menu */}
                <div className={
                    nav ? 'sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300'
                        : 'sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300'
                    }
                    data-testid={"mobile-menu"}
                >
                    <ul>
                        <li className="p-4 text-4xl hover:text-gray-500">
                            <Link href={"/"}>Overview</Link>
                        </li>
                        <li className="p-4 text-4xl hover:text-gray-500">
                            <Link href={"/incomes"}>Incomes</Link>
                        </li>
                        <li className="p-4 text-4xl hover:text-gray-500">
                            <Link href={"/projects"}>Projects</Link>
                        </li>
                        <li className="p-4 text-4xl hover:text-gray-500">
                            <Link href={"/sales"}>Sales</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
