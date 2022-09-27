import { Container } from '~/components/container';
import { Footer } from '~/components/footer';
import { DivingIntoFrontend } from '~/sections/diving-into-frontend';
import { AllThePossibilities } from '~/sections/all-the-possibilities';
import { Early2000s } from '~/sections/early-2000s';
import { Intro } from '~/sections/intro';
import { OldSkoolWebsite } from '~/sections/old-skool-website';
import { PastDecade } from '~/sections/past-decade';
import { SharingMyPassion } from '~/sections/sharing-my-passion';
import { ReadOn } from '~/sections/read-on';

export default function Index() {
  return (
    <main className="[--responsive-massive-radius:60px] sm:[--responsive-massive-radius:120px]">
      <Intro />
      <Early2000s />
      <div className="relative overflow-clip">
        <Container className="relative z-10">
          <img
            className="mx-auto -mt-6 mb-6 w-[600px] max-w-full md:ml-col"
            src="/img/gifs/it-looked-a-bit-like-this.gif"
            alt="Animated GIF with flaming text that says 'It looked a bit like this'"
          />
          <span className="sr-only">It looked a bit like this...</span>
        </Container>
        <OldSkoolWebsite />
      </div>
      <AllThePossibilities />
      <PastDecade />
      <DivingIntoFrontend />
      <SharingMyPassion />
      <ReadOn />
      <Footer />
    </main>
  );
}
