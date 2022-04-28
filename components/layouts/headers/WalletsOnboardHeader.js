import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

const navigation = [];

export default function WalletsOnboardHeader() {
    return (
        <Popover as="header" className="relative">
            <div className="bg-zinc-800 pt-4">
                <nav
                    className="relative mx-auto flex items-center justify-between px-4 sm:px-6"
                    aria-label="Global"
                >
                    <div className="flex items-center flex-1">
                        <div className="flex items-center justify-between w-full md:w-auto">
                            <Link href="/" passHref>
                                <a>
                                    <span className="sr-only">Candle</span>
                                    <div className="w-16 h-16">
                                        <Image
                                            width={251}
                                            height={251}
                                            src="/images/logo.png"
                                            alt="Candle logo"
                                        />
                                    </div>
                                </a>
                            </Link>
                            <div className="-mr-2 flex items-center md:hidden">
                                <Popover.Button className="bg-zinc-900 rounded-md p-2 inline-flex items-center justify-center text-zinc-400 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-zinc-700">
                                    <span className="sr-only">
                                        Open main menu
                                    </span>
                                    <MenuIcon
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                    />
                                </Popover.Button>
                            </div>
                        </div>
                        <div className="hidden space-x-8 md:flex md:ml-10">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="text-base font-medium text-white hover:text-zinc-300"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="hidden md:flex md:items-center md:space-x-6">
                        <Link href="/guides" passHref>
                            <a className="text-base font-medium text-white hover:text-zinc-300">
                                Support
                            </a>
                        </Link>

                        <Link href="https://metamask.io/" passHref>
                            <a
                                target="_blank"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600"
                            >
                                Connect to a Wallet
                            </a>
                        </Link>
                    </div>
                </nav>
            </div>

            <Transition
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <Popover.Panel
                    focus
                    className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top md:hidden"
                >
                    <div className="rounded-lg shadow-md bg-zinc-800 ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="px-5 pt-4 flex items-center justify-between">
                            <div>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    className="h-8 w-auto"
                                    src="/images/logo.png"
                                    alt=""
                                />
                            </div>
                            <div className="-mr-2">
                                <Popover.Button className="bg-zinc-900/70 rounded-md p-2 inline-flex items-center justify-center text-zinc-400 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-zinc-700">
                                    <span className="sr-only">Close menu</span>
                                    <XIcon
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                    />
                                </Popover.Button>
                            </div>
                        </div>
                        <div className="pt-5 pb-6">
                            <div className="px-2 space-y-1">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="block px-3 py-2 rounded-md text-base font-medium text-zinc-300 hover:bg-zinc-700"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                            <div className="mt-6 px-5">
                                <a
                                    href="#"
                                    className="block text-center w-full py-3 px-4 rounded-md shadow bg-indigo-600 text-white font-medium hover:bg-indigo-700"
                                >
                                    Sign up
                                </a>
                            </div>
                            <div className="mt-6 px-5">
                                <p className="text-center text-base font-medium text-zinc-400">
                                    Existing account?{' '}
                                    <a
                                        href="#"
                                        className="text-indigo-300 hover:underline"
                                    >
                                        Login
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    );
}
