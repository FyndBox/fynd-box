import { FC } from 'react';
import { Typography, Card } from '@mui/material';
import { StepCounter } from './SliderCard.style';

interface SliderCardProps {
    title: string;
    description: string;
    step: number;
}

const SliderCard: FC<SliderCardProps> = ({ title, description, step }) => {

    return (
        <Card style={{ backgroundColor: "#F4F2F2", margin: '10px', marginBottom: '30px' }}>
            <StepCounter >{step}</StepCounter>
            <Typography variant="h6" mt={1} p={1.25}>
                {title}
            </Typography>
            <Typography variant="body2" mb={5} p={1.25}>
                {description}
            </Typography>
        </Card>
    );

}

export default SliderCard;