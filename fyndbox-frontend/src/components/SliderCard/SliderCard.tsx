import { FC } from 'react';
import { Typography } from '@mui/material';
import { CardContainer, StepCounter } from './SliderCard.style';

interface SliderCardProps {
  title: string;
  description: string;
  step: number;
}

const SliderCard: FC<SliderCardProps> = ({ title, description, step }) => {
  return (
    <CardContainer>
      <StepCounter>{step}</StepCounter>
      <Typography variant="h6" mt={1} p={1}>
        {title}
      </Typography>
      <Typography variant="body2" mb={1} p={1}>
        {description}
      </Typography>
    </CardContainer>
  );
};

export default SliderCard;
