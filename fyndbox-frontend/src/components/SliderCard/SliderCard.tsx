import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Card } from '@mui/material';

const SliderCard: FC = () => {
    const { t } = useTranslation();

    return (
        <Card style={{backgroundColor: "#F4F2F2", margin: '10px' ,marginBottom: '30px'}}>
            <Typography variant="h6" mt={5} p={1.25}>
                Skapa konto
            </Typography>
            <Typography variant="body2" mb={5} p={1.25}>
                Börja med att skapa konto. Det är gratis och innebär föpliktelser men möjliggör tillgång till Fyndbox när du vill och hur mycket du vill.
            </Typography>
        </Card>

    );

}

export default SliderCard;