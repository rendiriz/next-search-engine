'use client';

import Link from 'next/link';
import Image from 'next/image';

import { Disclosure } from '@headlessui/react';
import { CgClose, CgMenu } from 'react-icons/cg';

import NavItem from '@/components/navItem';
import NavItemMobile from '@/components/navItemMobile';
import ThemeSwitcher from '@/components/themeSwitcher';
import logoPic from '@/public/logoipsum.svg';

const navigation = [
  { name: 'Postgres', href: '/postgres' },
  { name: 'Meilisearch', href: '/meilisearch' },
];

export default function Nav() {
  return (
    <Disclosure
      as="nav"
      className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-4xl px-4">
            <div className="relative flex flex-wrap items-center justify-between py-2">
              <Link href={'/'}>
                <Image alt="Logo" src={logoPic} />
              </Link>
              <div className="flex space-x-2 items-center">
                <div className="sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-800 dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-800">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <CgClose className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <CgMenu className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="hidden sm:block">
                  <div className="flex space-x-2">
                    {navigation.map((item, index) => (
                      <NavItem key={index} href={item.href} text={item.name} />
                    ))}
                  </div>
                </div>
                <ThemeSwitcher />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="absolute w-full bg-white dark:bg-gray-900 sm:hidden mt-[1px] border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col">
              <div className="space-y-1 py-4">
                {navigation.map((item) => (
                  <NavItemMobile
                    key={item.name}
                    href={item.href}
                    text={item.name}
                  />
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
