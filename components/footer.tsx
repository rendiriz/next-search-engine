export default function Footer() {
  return (
    <footer className="mx-auto max-w-4xl p-4">
      <div className="flex justify-between">
        <span>
          ©{' '}
          <a
            href={'https://rendiriz.com'}
            target={'_blank'}
            rel="noreferrer"
            className="hover:text-blue-500"
          >
            Rendi Riz
          </a>
        </span>
        <a
          href={'https://github.com/rendiriz/next-search-engine'}
          target={'_blank'}
          rel="noreferrer"
          className="hover:text-blue-500"
        >
          Github
        </a>
      </div>
    </footer>
  );
}
