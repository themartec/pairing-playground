import { Flex, Image, Progress, Typography } from "antd";

const contentStyle = {
  backgroundImage: "url(/images/subtle-prism.svg)",
  padding: "1em",
};

export default function A11yCallenge() {
  return (
    <div data-testid="a11y-challenge" style={contentStyle}>
      <Flex gap="middle">
        <div>
          <h1>Employee Branding AI Platform Demo</h1>
          <h3>Testing Accessibility</h3>
        </div>
        <Image
          data-testid="image"
          width={200}
          src="/images/the-martec-logo.svg"
          onClick={() => window.open("https://www.themartec.com/", "_blank")}
        />
      </Flex>
      <Typography.Title level={3}>
        Progress through this exercise
      </Typography.Title>
      <Progress data-testid="progress-bar" percent={33} status="active" />
      <Typography.Title level={3}>Key Features</Typography.Title>
      <ul data-testid="unordered-list">
        <p style={{ color: "var(--ant-color-warning-text)" }}>
          This is where the magic happens
        </p>
        <li>AI-driven content creation</li>
        <li>Brand consistency tools</li>
        <li>Employee engagement analytics</li>
        <li>Integration with company platforms</li>
      </ul>
      <section>
        <label>
          <h3>Favourite Feature ✨</h3>
        </label>
        <div>
          <input data-testid="auto-complete" autoComplete="names" />
        </div>
      </section>
    </div>
  );
}
