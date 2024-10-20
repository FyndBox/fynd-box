import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, MobileStepper, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AuthButtonsGroup from '../../components/AuthButtonsGroup/AuthButtonsGroup';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import SliderCard from '../../components/SliderCard/SliderCard';
import { FullPageContainer } from '../../styles/commonStyles';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { StyledArrowBack, GoBackButton } from './UserGuide.styles';

const UserGuidePage: FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const { t } = useTranslation();

  const guideSteps = [
    {
      title: t('userGuide.guideSteps.stepOne.title'),
      description: t('userGuide.guideSteps.stepOne.description'),
      step: 1,
    },
    {
      title: t('userGuide.guideSteps.stepTwo.title'),
      description: t('userGuide.guideSteps.stepTwo.description'),
      step: 2,
    },
    {
      title: t('userGuide.guideSteps.stepThree.title'),
      description: t('userGuide.guideSteps.stepThree.description'),
      step: 3,
    },
  ];

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
        title={guideSteps[activeStep].title}
        description={guideSteps[activeStep].description}
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
