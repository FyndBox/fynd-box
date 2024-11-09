import { Typography, Box } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const AboutUs: FC = () => {
    const { t } = useTranslation();
    return (
        <Box>
          <Typography variant="body1" mt={2}>
            {t('settings.about.welcomeText')}
          </Typography>
          <Typography fontWeight={700} variant="body1" mt={2}>
            {t('settings.about.addUnitTitle')}
          </Typography>
          <Typography variant="body2">
            {t('settings.about.addUnitText')}
          </Typography>
          <Typography fontWeight={700} variant="body1" mt={2}>
            {t('settings.about.createBoxTitle')}
          </Typography>
          <Typography variant="body2">
            {t('settings.about.createBoxText')}
          </Typography>
          <Typography fontWeight={700} variant="body1" mt={2}>
            {t('settings.about.addItemTitle')}
          </Typography>
          <Typography variant="body2">
            {t('settings.about.addItemText')}
          </Typography>
          <Typography fontWeight={700} variant="body1" mt={2}>
            {t('settings.about.printQRcodeTitle')}
          </Typography>
          <Typography variant="body2">
            {t('settings.about.printQRcodeText')}
          </Typography>
          <Typography variant="body2" mt={2}>
            {t('settings.about.withFyndboxText')}
          </Typography>
          <Typography variant="body2" mt={2}>
            {t('settings.about.contactUsText')}
          </Typography>
        </Box>
      );
}

export default AboutUs;