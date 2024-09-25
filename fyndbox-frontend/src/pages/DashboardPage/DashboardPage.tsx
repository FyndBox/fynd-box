import { FC } from 'react';
import { FullPageContainer } from '../../styles/commonStyles';
import TopBar from '../../components/TopBar/TopBar';
import SearchField from '../../components/SearchField/SearchField';

const DashboardPage: FC = () => {
  return (
    <>
      <TopBar />
      <FullPageContainer>
        <SearchField />
      </FullPageContainer>
      ;
    </>
  );
};

export default DashboardPage;
