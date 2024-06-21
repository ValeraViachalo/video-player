import FullWidthBg from "@/components/FullWidthBg/FullWidthBg";
import React, { useEffect } from "react";
import "./Home.scss";
import { useIsPresent } from "framer-motion";
import { Transition } from "@/components/Transition/Transition";

export default function Home() {
  const isPresent = useIsPresent();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <main className="home">
        <FullWidthBg
          classSection="home-section"
          type="video"
          url="https://images.beta.cosmos.so/4820ce0b-773c-4953-8e4b-d54c9db9718a.mp4"
        >
          <h1 className="super-text home__title">RTRTS</h1>
        </FullWidthBg>
        <FullWidthBg
          classSection="home-section home-section-1 "
          url="https://images.beta.cosmos.so/21b09005-9166-4ac3-ba31-9436a28d0794.?format=jpeg"
        >

        </FullWidthBg>
        <FullWidthBg
          classSection="home-section section-2 "
          url="https://images.beta.cosmos.so/833c7ce8-0376-454f-9610-09f3ec21f24a?format=jpeg"
        >
          <div className="home__content">
            <h1>Matthias Leidinger</h1>
            Originally hailing from Austria, Berlin-based photographer Matthias
            Leindinger is a young creative brimming with talent and ideas. This
            is a story on the border between reality and imaginary, about the
            contradictory feelings that the insularity of a rocky, arid, and
            wild territory provokes”—so French photographer Clément Chapillon
            describes his latest highly captivating project Les rochers fauves
            (French for ‘The tawny rocks’). Though he views photography as a
            medium for storytelling, Zissou’s images don’t insist on a
            narrative. Both crisp and ethereal, they’re encoded with an
            ambiguity—a certain tension—that lets the viewer find their own
            story within them.
          </div>
        </FullWidthBg>
        <FullWidthBg
          classSection="home-section section-3"
          id="clement"
          type="video"
          url="https://images.beta.cosmos.so/7d13e75d-c0f3-4db4-856a-253498684a81.mp4"
        >
          <div className="home__content">
            <h1>Clément Chapillon</h1>
            Though he views photography as a medium for storytelling, Zissou’s
            images don’t insist on a narrative. Both crisp and ethereal, they’re
            encoded with an ambiguity—a certain tension—that lets the viewer
            find their own story within them.
          </div>
        </FullWidthBg>
      </main>

      <Transition isPresent={isPresent} />
    </>
  );
}
