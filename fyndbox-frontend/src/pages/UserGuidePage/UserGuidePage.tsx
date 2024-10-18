import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, MobileStepper, Button, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AuthButtonsGroup from '../../components/AuthButtonsGroup/AuthButtonsGroup';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import SliderCard from '../../components/SliderCard/SliderCard';
import { FullPageContainer } from '../../styles/commonStyles';
import { KeyboardArrowLeft, KeyboardArrowRight} from '@mui/icons-material';
import { StyledArrowBack, StyledButton } from './UserGuide.styles';

const UserGuidePage: FC = () => {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);

    const { t } = useTranslation();

    const guideSteps = [
        {
            title: t('userguide.guideSteps.stepOne.title'),
            description: t('userguide.guideSteps.stepOne.description'),
            step: 1
        },
        {
            title: t('userguide.guideSteps.stepTwo.title'),
            description: t('userguide.guideSteps.stepTwo.description'),
            step: 2
        },
        {
            title: t('userguide.guideSteps.stepThree.title'),
            description: t('userguide.guideSteps.stepThree.description'),
            step: 3
        }
    ]

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
                <StyledButton onClick={handleBackClick}>
                    <StyledArrowBack />
                    <Typography variant="h6" ml={1.25} component="span" color='#000000'>
                    {t('userguide.back')}
                    </Typography>
                </StyledButton>
            <Typography variant="h1" mb={2} ml={1}>
                {t('userguide.title')}
            </Typography>
            <Typography variant="body1" mb={4} ml={1}>
                {t('userguide.description')}
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
                    <Button size="small" onClick={handleNext} disabled={activeStep === guideSteps.length - 1}>
                        {t('userguide.guideSteps.next')}
                        <KeyboardArrowRight />
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        <KeyboardArrowLeft />
                        {t('userguide.guideSteps.back')}
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

}

export default UserGuidePage;