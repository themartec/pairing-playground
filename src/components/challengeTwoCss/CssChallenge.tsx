import { Card, Col, Row } from "antd";

export default function CssCallenge() {
  return (
    <div data-testid="css-challenge">
      <Row gutter={16}>
        <Col>
          <Card title="User Profile" style={{ width: 400 }}>
            <p>Name: John Doe</p>
            <p>Email: john@example.com</p>
          </Card>
        </Col>
        <Col>
          <Card title="Activity Chart" style={{ width: 400 }}>
            <p>[Chart Placeholder]</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
