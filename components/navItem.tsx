import { usePathname } from 'next/navigation';
import Link from 'next/link';
import cn from 'classnames';

export type TNavItem = {
  className?: string;
  href: string;
  text: string;
};

export default function NavItem(props: TNavItem) {
  const pathname = usePathname();
  const isActive = pathname === props.href;

  return (
    <Link
      href={props.href}
      className={cn(
        isActive ? 'text-blue-500' : 'text-gray-800 dark:text-gray-50',
        'block font-medium py-4 px-4',
        props.className,
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {props.text}
    </Link>
  );
}
