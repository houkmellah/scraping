interface MyAppProps {
    Component: React.ComponentType;
    pageProps: Record<string, unknown>;
  }

const MyApp : React.FC<MyAppProps>= ({ Component, pageProps }) => {
    return <Component {...pageProps} />
}

export default MyApp;