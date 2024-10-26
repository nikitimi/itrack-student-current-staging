import Footer from '@/components/Footer';
import Main from '@/components/Main';
import userRoleEnum from '@/lib/enums/userRole';
import Link from 'next/link';

const About = () => {
  const routes = userRoleEnum.options;
  return (
    <>
      {/* TODO: If there is a user, hide this navigation UI. */}
      <nav className="group bg-white/40 p-2 duration-200 ease-in-out hover:bg-white/80">
        <ul className="flex flex-row justify-between gap-2">
          {routes.map((route) => {
            return (
              <li key={route}>
                <Link href={`/${route}`} passHref>
                  <button className="font-geist-mono capitalize duration-200 ease-in-out hover:text-green-600">
                    {route}
                  </button>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <Main>
        <p>Hello World</p>
      </Main>
      <Footer />
    </>
  );
};

export default About;
