import { FC } from 'react';
import { StyledHeader } from './PageHeader.styles';

interface PageHeaderProps {
  heading: string;
}

const PageHeader: FC<PageHeaderProps> = ({ heading }) => {
  return <StyledHeader variant="h2">{heading}</StyledHeader>;
};

export default PageHeader;
