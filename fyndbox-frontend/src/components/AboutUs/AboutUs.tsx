import { Typography, Box, Link } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const AboutUs: FC = () => {
  const { t } = useTranslation();

  const sections = [
    {
      titleKey: 'settings.about.addUnitTitle',
      textKey: 'settings.about.addUnitText',
    },
    {
      titleKey: 'settings.about.createBoxTitle',
      textKey: 'settings.about.createBoxText',
    },
    {
      titleKey: 'settings.about.addItemTitle',
      textKey: 'settings.about.addItemText',
    },
    {
      titleKey: 'settings.about.printQRcodeTitle',
      textKey: 'settings.about.printQRcodeText',
    },
  ];

  const contactUsText = t('settings.about.contactUsText');

  const [beforeEmail, afterEmail] = contactUsText.split('{email}');

  return (
    <Box>
      <Typography variant="body1" pt={2}>
        {t('settings.about.welcomeText')}
      </Typography>

      {sections.map((section, index) => (
        <Box key={index} pt={2}>
          <Typography fontWeight={700} variant="body1">
            {t(section.titleKey)}
          </Typography>
          <Typography variant="body2">{t(section.textKey)}</Typography>
        </Box>
      ))}

      <Typography variant="body2" pt={2}>
        {t('settings.about.withFyndboxText')}
      </Typography>

      <Typography variant="body2" pt={2}>
        {beforeEmail}
        <Link
          href={`mailto:${t('settings.about.email')}`}
          underline="always"
          color="info"
        >
          {t('settings.about.email')}
        </Link>
        {afterEmail}
      </Typography>
    </Box>
  );
};

export default AboutUs;
