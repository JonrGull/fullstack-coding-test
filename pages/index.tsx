import { Input } from "@chakra-ui/react";
import Head from "next/head";
import { useRef } from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

import DynamicText from "components/DynamicText";
import styles from "styles/Home.module.css";

const Home = () => {
  const dynamicTextRef = useRef(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dynamicTextRef.current.changeValue(e.target.value);
  };

  const { width, height } = useWindowSize();

  return (
    <div className={styles.container}>
      <Head>
        <title>Coding Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <DynamicText ref={dynamicTextRef} />
        <Input onChange={onChange} />
      </main>
      <Confetti width={width} height={height} />
    </div>
  );
};

export default Home;
