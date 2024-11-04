import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Typography, MobileStepper, Button } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import AuthButtonsGroup from '../../components/AuthButtonsGroup/AuthButtonsGroup';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import SliderCard from '../../components/SliderCard/SliderCard';
import {
  FullPageContainer,
  GoBackButton,
  StyledArrowBack,
} from '../../styles/commonStyles';
import { guideSteps } from '../../data/guideSteps';

const UserGuidePage: FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const { t } = useTranslation();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <FullPageContainer>
      <GoBackButton onClick={handleBackClick}>
        <StyledArrowBack />
        <Typography variant="h6" component="span" pl={1}>
          {t('userGuide.back')}
        </Typography>
      </GoBackButton>
      <Typography variant="h2">{t('userGuide.title')}</Typography>
      <Typography variant="body1" py={2}>
        {t('userGuide.description')}
      </Typography>
      <SliderCard
        title={t(guideSteps[activeStep].title)}
        description={t(guideSteps[activeStep].description)}
        step={guideSteps[activeStep].step}
      />
      <MobileStepper
        variant="dots"
        steps={guideSteps.length}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === guideSteps.length - 1}
          >
            {t('userGuide.guideSteps.next')}
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            {t('userGuide.guideSteps.back')}
          </Button>
        }
      />
      <AuthButtonsGroup
        showLoginButton={false}
        onRegisterClick={handleSignupClick}
      />
      <LanguageSelector />
    </FullPageContainer>
  );
};

export default UserGuidePage;
