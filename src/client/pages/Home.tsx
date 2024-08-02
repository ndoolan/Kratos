import { Image, useColorMode } from '@chakra-ui/react';
import Justin_Joes from "../assets/Joes_Justin_459kB.jpg";
import Carson_Joes from "../assets/Joes_Carson_435kB.jpg"

const Home = (): JSX.Element => {
  const { colorMode } = useColorMode()
  return (

    <>
    {colorMode === "light" ? <Image src={Justin_Joes} alt="Climbing Photo"></Image> : <Image src={Carson_Joes} alt="Climbing Photo"></Image> }
    </>
  );
};

export default Home;
