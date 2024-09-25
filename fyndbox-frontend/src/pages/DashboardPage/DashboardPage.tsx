import { FC } from 'react';
import { FullPageContainer } from '../../styles/commonStyles';
import TopBar from '../../components/TopBar/TopBar';

const DashboardPage: FC = () => {
  return (
    <>
      <TopBar />
      <FullPageContainer></FullPageContainer>;
    </>
  );
};

export default DashboardPage;
