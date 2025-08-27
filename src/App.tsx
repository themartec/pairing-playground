import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider, theme } from "antd";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <ConfigProvider
      theme={{
        cssVar: true,
        token: {
          colorPrimary: "#52c41a",
          colorBgLayout: "#FEF9ED",
          colorWarningText: "#52c41a",
        },
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <LandingPage />
    </ConfigProvider>
  );
}

export default App;
