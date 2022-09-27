import { NavLink } from '@remix-run/react';
import classNames from 'classnames';
import { Container } from '~/components/container';
import { DoubleArrowIcon } from '~/components/icons/double-arrow';
import { SectionTitle } from '~/components/section-title';

interface CtaProps {
  children: React.ReactNode;
  to: string;
}

const Cta = ({ children, to }: CtaProps) => (
  <NavLink
    className={classNames(
      'group relative mb-2 inline-flex w-full flex-col justify-center rounded-lg border bg-white p-3 shadow-hard sm:mb-3 sm:p-4 md:mb-[0] md:h-[300px] md:w-[32%]',
      'before:absolute before:right-[-2rem] before:top-[-2rem] before:block before:rounded-md before:bg-gray80 before:px-3 before:py-2 before:text-[1.8rem] before:text-white before:content-["soon"]'
    )}
    to={to}
  >
    {children}
    <span
      className="absolute right-4 bottom-4 h-3 w-3 transition-transform group-hover:translate-x-3"
      aria-hidden
    >
      <DoubleArrowIcon />
    </span>
  </NavLink>
);

export const ReadOn = () => (
  <div className="mt-5 sm:mt-6">
    <Container>
      <SectionTitle>Read on</SectionTitle>

      <div className="mt-4 justify-between font-serif text-body leading-tight sm:mt-5 sm:text-xl md:flex">
        <Cta to="/about-jeroen">More about me</Cta>
        <Cta to="/mentoring">Mentoring</Cta>
        <Cta to="/my-vision-on-frontend">My vision on frontend</Cta>
      </div>
    </Container>
  </div>
);
