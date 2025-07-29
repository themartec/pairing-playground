import React from "react";
import { Layout } from "antd";
import StyledContent from "./LandingPage.styles";

export default function LandingPage() {
  return (
    <Layout>
      <StyledContent>
        <h1>Pairing Playground</h1>
        <h2>This is where the magic happens</h2>
      </StyledContent>
    </Layout>
  );
}
