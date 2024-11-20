"use client";
import Image from "next/image";

export function AppNavbar() {
    return (
        <nav className="fixed w-full flex items-center justify-between px-4 py-3  bg-gray-50 border-b	z-50">
            <div className="flex items-center">
            <Image
                    src="/images/logo.png"
                    alt=""
                    width={100}
                    height={100}
                />
            </div>
            <div className="flex items-center">
            <div className="flex items-center">
                <input
                    type="text"
                    placeholder="Rechercher..."
                    className="w-32 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black sm:w-72"
                />
            </div>
            </div>
        </nav>
    );
}



