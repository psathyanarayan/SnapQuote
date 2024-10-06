"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  useEffect(() => {
    const setProvidersFunction = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setProvidersFunction();
  }, []);
  return (
    <>
      <nav className="w-full flex-between mb-16 pt-3">
        <Link href="/" className="flex gap-2 flex-center">
          <Image
            src="/assets/images/logo.png"
            alt="Promptify Logo"
            width={30}
            height={30}
            className="object-contain rounded-full"
            
          />
          <p className="logo_text">SnapQuote</p>
        </Link>
        <div className="sm:flex hidden">
          {session?.user ? (
            <div className="flex gap-3 md:gap-5">
              <Link className="black_btn" href="/create-quote">
                Create Post
              </Link>
              <button onClick={signOut} className="outline_btn">
                Sign Out
              </button>
              <Link href="/profile">
                <Image
                  src={session?.user.image}
                  width={37}
                  height={37}
                  className="rounded-full"
                  alt="profile"
                />
              </Link>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((prov) => (
                  <button
                    className="black_btn"
                    type="button"
                    key={prov.name}
                    onClick={() => signIn(prov.id)}
                  >
                    Sign In
                  </button>
                ))}
            </>
          )}
        </div>
        {/* Mobile View  */}
        <div className="sm:hidden flex relative">
          {session?.user ? (
            <div className="flex">
              <div>
                <Image
                  src={session?.user.image}
                  width={37}
                  height={37}
                  onClick={() => setToggleDropdown((prev) => !prev)}
                  className="rounded-full cursor-pointer"
                  alt="profile"
                />
              </div>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((prov) => (
                  <button
                    className="black_btn"
                    type="button"
                    key={prov.name}
                    onClick={() => signIn(prov.id)}
                  >
                    Sign In
                  </button>
                ))}
            </>
          )}
          {toggleDropdown && (
            <div className="dropdown">
              <Link
                href="/profile"
                className="dropdown_link"
                onClick={() => setToggleDropdown(false)}
              >
                Profile
              </Link>
              <Link
                href="/profile"
                className="dropdown_link"
                onClick={() => setToggleDropdown(false)}
              >
                Create Prompt
              </Link>
              <button
                type="button"
                onClick={() => {
                  setToggleDropdown(false);
                  signOut();
                }}
                className="mt-5 w-fit black_btn"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Nav;
