/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect } from "react";
import useTitle from "../../Hooks/useTitle";
import Container from "../../Shared/Container";
import AlphabetTileInteraction from "./AlphabetTileInteraction";

const Home = () => {
  useTitle("Home"),
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div>
      <Container>
        <AlphabetTileInteraction></AlphabetTileInteraction>
      </Container>
    </div>
  );
};

export default Home;
