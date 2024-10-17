import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AuthButtonsGroup from '../../components/AuthButtonsGroup/AuthButtonsGroup';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import SliderCard from '../../components/SliderCard/SliderCard';

const UserGuidePage: FC = () => {
    const navigate = useNavigate();

    const { t } = useTranslation();

    const handleSignupClick = () => {
        navigate('/signup');
    };

    return (
        <div>
            <Typography variant="h1" mt={10} mb={2} ml={1}>
                {t('userguide.title')}
            </Typography>
            <Typography variant="body1" mb={4} ml={1}>
                {t('userguide.description')}
            </Typography>
            <SliderCard/>
            <AuthButtonsGroup
                showLoginButton={false}
                onRegisterClick={handleSignupClick}
            />
            <LanguageSelector />
        </div>

    );

}

export default UserGuidePage;