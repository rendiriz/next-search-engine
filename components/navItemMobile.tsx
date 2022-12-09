'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Disclosure } from '@headlessui/react';
import cn from 'classnames';

export type TNavItemMobile = {
  className?: string;
  href: string;
  text: string;
};

export default function NavItemMobile(props: TNavItemMobile) {
  const pathname = usePathname();
  const isActive = pathname === props.href;

  return (
    <Link href={props.href}>
      <Disclosure.Button
        as="a"
        className={cn(
          isActive
            ? 'font-medium bg-blue-50 dark:bg-gray-800 text-blue-500'
            : 'text-gray-800 dark:text-gray-50',
          'block py-4 px-4',
          props.className,
        )}
        aria-current={isActive ? 'page' : undefined}
      >
        {props.text}
      </Disclosure.Button>
    </Link>
  );
}
