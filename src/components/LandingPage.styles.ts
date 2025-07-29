import styled from "styled-components";
import Layout from "antd/es/layout";

const StyledContent = styled(Layout.Content)<{
  background: string;
  borderradius: number;
}>`
  padding: 24px;
  margin: 0;
  min-height: 280px;
  background: ${({ background }) => background};
  border-radius: ${({ borderradius }) => borderradius}px;
`;

export default StyledContent;
