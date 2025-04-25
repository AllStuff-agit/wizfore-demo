import '../styles/globals.css';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  // 관리자 페이지는 레이아웃을 적용하지 않습니다
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }

  // 일반 페이지에는 공통 레이아웃을 적용합니다
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;