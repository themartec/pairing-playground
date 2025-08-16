import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider, theme } from "antd";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#91DBB6",
          colorBgLayout: "#FEF9ED",
        },
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <LandingPage />
    </ConfigProvider>
  );
}

export default App;
