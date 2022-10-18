import { getCookie } from "cookies-next";

export async function getServerSideProps({ req, res }) {
  const token = getCookie("isAuthenticated", {
    req,
    res,
  });

  if (token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
