import React from "react";
import Layout from "antd/es/layout";
import theme from "antd/es/theme";
import StyledContent from "./LandingPage.styles";

export default function LandingPage() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <StyledContent
        background={colorBgContainer}
        borderradius={borderRadiusLG}
      >
        <h1>Pairing Playground</h1>
        <h2>This is where the magic happens</h2>
      </StyledContent>
    </Layout>
  );
}
