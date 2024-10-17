import { FC,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, MobileStepper, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AuthButtonsGroup from '../../components/AuthButtonsGroup/AuthButtonsGroup';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import SliderCard from '../../components/SliderCard/SliderCard';
import { FullPageContainer } from '../../styles/commonStyles';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

const UserGuidePage: FC = () => {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);

    const { t } = useTranslation();

    const guideSteps = [
        {
            title: 'Skapa Konto',
            description: 'Börja med att skapa konto. Det är gratis och innebär föpliktelser men möjliggör tillgång till Fyndbox när du vill och hur mycket du vill.',
            step: 1
        },
        {
            title: 'Skapa Konto',
            description: 'Börja med att skapa konto. Det är gratis och innebär föpliktelser men möjliggör tillgång till Fyndbox när du vill och hur mycket du vill.',
            step: 2
        },
        {
            title: 'Skapa Konto',
            description: 'Börja med att skapa konto. Det är gratis och innebär föpliktelser men möjliggör tillgång till Fyndbox när du vill och hur mycket du vill.',
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

    return (
        <FullPageContainer>
            <Typography variant="h1" mt={10} mb={2} ml={1}>
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
                        Next
                        <KeyboardArrowRight />
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        <KeyboardArrowLeft />
                        Back
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