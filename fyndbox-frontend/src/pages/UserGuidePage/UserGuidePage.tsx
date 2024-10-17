import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AuthButtonsGroup from '../../components/AuthButtonsGroup/AuthButtonsGroup';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import SliderCard from '../../components/SliderCard/SliderCard';
import { FullPageContainer } from '../../styles/commonStyles';

const UserGuidePage: FC = () => {
    const navigate = useNavigate();

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
            {guideSteps.map((guideStep, index) => <SliderCard key={index} title={guideStep.title} description={guideStep.description} step={guideStep.step} />)}
            <AuthButtonsGroup
                showLoginButton={false}
                onRegisterClick={handleSignupClick}
            />
            <LanguageSelector />
        </FullPageContainer>

    );

}

export default UserGuidePage;