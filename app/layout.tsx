import './globals.css';
import cn from 'classnames';
import { Roboto } from '@next/font/google';
import localFont from '@next/font/local';

import Provider from '@/components/provider';
import Nav from '@/components/nav';
import Footer from '@/components/footer';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

const recoleta = localFont({
  src: '../fonts/Recoleta-Regular.otf',
  variable: '--font-recoleta',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn([roboto.variable, recoleta.variable])}>
      <head />
      <body>
        <Provider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
