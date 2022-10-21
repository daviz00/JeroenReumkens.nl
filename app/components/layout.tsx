import { Link } from '@remix-run/react';
import classNames from 'classnames';
import type { ElementOrSelector } from 'motion';
import { animate, stagger } from 'motion';
import { useEffect, useRef, useState } from 'react';
import { useScrollDepth, useWindowWidth } from '~/utils/use-window';
import { Container } from './container';
import { CtaButton } from './cta-button';
import { Footer } from './footer';
import { HamburgerIcon } from './icons';
import { HomeIcon } from './icons/home';

interface LayoutProps {
  children: React.ReactNode;
}

const staggerAnimation = (elements: ElementOrSelector, isVisible: boolean) =>
  animate(elements, isVisible ? { x: 0, opacity: 1 } : { x: 30, opacity: 0 }, {
    delay: stagger(0.1, {
      start: !isVisible ? 0 : 0.5,
      from: isVisible ? 'first' : 'last',
    }),
  });

export const Layout = ({ children }: LayoutProps) => {
  const navRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  const width = useWindowWidth();
  const [isNavVisible, setIsNavVisible] = useState(width >= 1024);
  const scrollY = useScrollDepth();

  useEffect(() => {
    if (width < 1024) return;

    if (scrollY > 100) {
      setIsNavVisible(false);
    } else {
      setIsNavVisible(true);
    }
  }, [scrollY, width]);

  useEffect(() => {
    const links = navRef.current?.querySelectorAll('a');
    const icons = iconsRef.current?.querySelectorAll('a, button');

    if (!links || !icons) {
      return;
    }

    if (width < 1024) {
      // Removes any existing inline styles (set by animations). This ensures there's
      // no animation styles sticking around on mobile if user resized their screen.
      if (icons) icons.forEach((icon) => icon.removeAttribute('style'));
      staggerAnimation(links, isNavVisible);
    } else {
      staggerAnimation(links, isNavVisible);
      staggerAnimation(icons, !isNavVisible);
    }
  }, [isNavVisible, width]);

  return (
    <main className="font-serif leading-tight [--responsive-massive-radius:60px] sm:[--responsive-massive-radius:120px]">
      <header className="fixed top-[0] left-[0] z-20 w-full text-body">
        <Container className={'relative flex h-5 pt-3 md:block [&_a]:bg-white'}>
          <nav
            ref={navRef}
            className={classNames(
              'grain fixed top-[0] left-[0] ml-auto flex h-full w-full translate-x-full flex-col bg-gray opacity-0 transition-opacity current-child:shadow-faded md:relative md:top-auto md:left-auto md:flex md:h-auto md:w-auto md:translate-x-[0] md:flex-row md:bg-transparent md:opacity-100 md:after:hidden',
              isNavVisible && 'translate-x-[0] opacity-100'
            )}
          >
            <Container className="md:space-y-auto mt-6 space-y-4 md:mt-auto md:ml-auto md:mr-[0] md:w-auto md:space-y-3 md:space-x-3 md:p-[0]">
              <CtaButton className="w-full md:w-auto" to="/" variant="small">
                Home
              </CtaButton>
              <CtaButton
                className="w-full md:w-auto"
                to="/mentoring"
                variant="small"
              >
                Mentorship
              </CtaButton>
              <CtaButton
                className="w-full md:w-auto"
                to="/about-jeroen"
                variant="small"
              >
                About me
              </CtaButton>
            </Container>
          </nav>

          <div
            ref={iconsRef}
            className="absolute right-4 top-3 flex space-x-3  transition-opacity lg:right-[0]"
          >
            <Link
              to="/"
              className="transition-color flex h-[60px] w-[60px] items-center justify-center rounded-md border bg-white px-3 text-[currentColor] shadow-hard md:opacity-0"
            >
              <span className="sr-only">Go back home</span>
              <HomeIcon />
            </Link>

            <button
              onClick={() => setIsNavVisible((visible) => !visible)}
              className="transition-color h-[60px] w-[60px] rounded-md border bg-white px-3 text-[currentColor] shadow-hard md:opacity-0"
            >
              <span className="sr-only">
                {isNavVisible ? 'hide' : 'show'} navigation
              </span>
              <HamburgerIcon />
            </button>
          </div>
        </Container>
      </header>
      {children}
      <Footer />
    </main>
  );
};
