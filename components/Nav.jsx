"use client";

import Image from "next/image";
import Link from "next/link";

import { getProviders, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

const Nav = () => {
    const isUserLoggedIn = true;
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, SetToggleDropdown] = useState(false);

    useEffect(() => {
        const setProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        };

        setProviders();
    }, []);

    return (
        <>
            <nav className="flex-between w-full mb-16 pt-3">
                <Link href={`/`} className="flex gap-2 flex-center">
                    <Image
                        src={`assets/images/logo.svg`}
                        alt="Promotopia Logo"
                        width={30}
                        height={30}
                        className="object-contain"
                    />
                    <p className="logo_text">Promptopia</p>
                </Link>

                {/* Desktop navigation */}
                <div className="hidden sm:flex">
                    {isUserLoggedIn ? (
                        <div className="flex gap-3 md:gap-5">
                            <Link href={`create-promt`} className="black_btn">
                                Create Post
                            </Link>
                            <button
                                type="button"
                                onClick={signOut}
                                className="outline_btn"
                            >
                                Sign Out
                            </button>
                            <Link href={`profile`}>
                                <Image
                                    src={`assets/images/logo.svg`}
                                    width={30}
                                    height={30}
                                    className="rounded-full"
                                    alt="User Profile Image"
                                />
                            </Link>
                        </div>
                    ) : (
                        <>
                            {providers &&
                                Object.values(providers).map((provider) => {
                                    return (
                                        <button
                                            type="button"
                                            key={provider.name}
                                            className="black_btn"
                                            onClick={() => {
                                                signIn(provider.id);
                                            }}
                                        >
                                            Sign In
                                        </button>
                                    );
                                })}
                        </>
                    )}
                </div>

                {/* Mobile navigation */}
                <div className="sm:hidden flex relative">
                    {isUserLoggedIn ? (
                        <div className="flex">
                            <Image
                                src={`assets/images/logo.svg`}
                                width={30}
                                height={30}
                                className="rounded-full"
                                alt="User Profile Image"
                                onClick={() =>
                                    SetToggleDropdown((prev) => !prev)
                                }
                            />

                            {toggleDropdown && (
                                <div className="dropdown">
                                    <Link
                                        href={`profile`}
                                        className="dropdown_Lk"
                                        onClick={() => SetToggleDropdown(false)}
                                    >
                                        My Profile
                                    </Link>
                                    <Link
                                        href={`create-promt`}
                                        className="dropdown_Lk"
                                        onClick={() => SetToggleDropdown(false)}
                                    >
                                        Create Promt
                                    </Link>
                                    <button
                                        type="button"
                                        className="mt-5 w-full black_btn"
                                        onClick={() => {
                                            SetToggleDropdown(false);
                                            signOut();
                                        }}
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            {providers &&
                                Object.values(providers).map((provider) => {
                                    return (
                                        <button
                                            type="button"
                                            key={provider.name}
                                            className="black_btn"
                                            onClick={() => {
                                                signIn(provider.id);
                                            }}
                                        >
                                            Sign In
                                        </button>
                                    );
                                })}
                        </>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Nav;
