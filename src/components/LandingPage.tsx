import { Button, Form, Input, Layout } from "antd";
import { useState } from "react";
import StyledContent from "./LandingPage.styles";
import A11yChallenge from "./challengeOneA11y/A11yChallenge";
import CssChallenge from "./challengeTwoCss/CssChallenge";

interface ViteImportMetaEnv {
  [key: string]: any;
}

interface ResponseBody {
  success: boolean;
  message: string;
  submissionId?: number;
  data?: any;
}

interface LandingPageProps {
  challengeOneEnabled?: boolean;
  challengeTwoEnabled?: boolean;
}

export default function LandingPage({
  challengeOneEnabled = Boolean(
    (import.meta as ViteImportMetaEnv).env.VITE_CHALLENGE_ONE,
  ),
  challengeTwoEnabled = Boolean(
    (import.meta as ViteImportMetaEnv).env.VITE_CHALLENGE_TWO,
  ),
}: LandingPageProps) {
  const [submitResponse, setSubmitResponse] = useState<ResponseBody | null>(
    null,
  );

  const onFinish = async (formData: { message: string }) => {
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    setSubmitResponse(await response.json());
  };

  return (
    <Layout>
      <StyledContent>
        <h1>Pairing Playground</h1>
        <h2>This is where the magic happens</h2>
        {challengeOneEnabled && <A11yChallenge data-testid="a11y-challenge" />}
        {challengeTwoEnabled && <CssChallenge data-testid="css-challenge" />}
        {submitResponse && (
          <div data-testid="submit-response">
            <h3>Response:</h3>
            <pre>{JSON.stringify(submitResponse, null, 2)}</pre>
          </div>
        )}
        <Form
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item label="message" name="message">
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </StyledContent>
    </Layout>
  );
}

LandingPage.defaultProps = {
  challengeOneEnabled: false,
  challengeTwoEnabled: false,
};
