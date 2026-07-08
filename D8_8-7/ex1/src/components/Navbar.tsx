"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "../redux/authSlice";
import React from "react";

import { useAppSelector, useAppDispatch } from "../redux/hooks";

const NavBar = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(logout());
    router.push("/");
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold tracking-wider">
              Navbar
            </Link>

            {/* Menu ngang */}
            <ul className="hidden md:flex gap-6 items-center">
              <li>
                <Link href="/" className="hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/student" className="hover:text-gray-300">
                  Dashboard
                </Link>
              </li>
              <li>
                <span className="text-gray-500 cursor-not-allowed">About</span>
              </li>

              {isAuthenticated ? (
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-400 hover:text-red-300"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li>
                  <Link href="/login" className="hover:text-blue-400">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <form
            className="hidden md:flex gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="px-3 py-1 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="search"
              placeholder="Search"
            />
            <button
              className="px-3 py-1 border border-green-500 text-green-500 rounded-md hover:bg-green-500 hover:text-white transition-colors"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
