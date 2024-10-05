import { FC } from 'react';
import { EntityType } from '../../types/entityTypes';
import {
  StyledModalBox,
  StyledModalAddButton,
  StyledModalDeleteButton,
  ModalImageBox,
  UpdateImageBox,
  ModalBaseButton,
  StyledCheckIcon,
  StyledDeleteIcon,
} from './EntityActionModal.styles';
import { useTranslation } from 'react-i18next';
import CustomTextField from '../../components/CustomTextField/CustomTextField';
import { TextFieldsContainer } from '../../styles/commonStyles';
import { Modal } from '@mui/material';
import imageSrc from '../../assets/AddImage.png';
import { Typography } from '@mui/material';

interface EntityActionModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: { name: string; description: string; image?: string }) => void; // Ensure this prop is expected
  onDelete?: () => void; // Optional delete function
  entityType: string;
  mode: 'add' | 'edit';
  initialData?: { name: string; description: string };
}

const EntityActionModal: FC<EntityActionModalProps> = ({
  open,
  onClose,
  onSave,
  onDelete,
  entityType,
  mode,
  initialData,
}) => {
  const { t } = useTranslation();

  return (
    <Modal open={open} onClose={onClose}>
      <StyledModalBox>
        <Typography
          variant="body1"
          sx={{
            textAlign: 'left',
            cursor: 'pointer',
            color: 'secondary.contrastText',
          }}
          onClick={() => {
            onClose();
          }}
        >
          {t('modal.cancel')}
        </Typography>
        <Typography variant="h3" sx={{ lineHeight: '3.5', fontWieght: 'bold' }}>
          {t('modal.heading')}
        </Typography>

        <TextFieldsContainer>
          {/* name */}
          <CustomTextField
            label={t('modal.name.label')}
            placeholder={t('modal.name.placeholder')}
          />
          {/* description */}
          <CustomTextField
            label={t('modal.description.label')}
            placeholder={t('modal.description.placeholder')}
          />
        </TextFieldsContainer>

        <UpdateImageBox>
          <Typography variant="h4">Bild</Typography>
          {/* Image Example */}
          <ModalImageBox src={imageSrc} alt={t('modal.imageAltText')} />
        </UpdateImageBox>

        {/* buttons */}
        <ModalBaseButton>
          <StyledModalAddButton
            variant="contained"
            fullWidth
            startIcon={<StyledCheckIcon />}
            onClick={() => {
              const data = {
                name: 'Collected Name', // Replace with actual form data
                description: 'Collected Description', // Replace with actual form data
              };
              onSave(data); // Trigger save with form data
            }}
          >
            {mode === 'add' ? 'Add' : 'Edit'}
          </StyledModalAddButton>

          <StyledModalDeleteButton
            variant="contained"
            fullWidth
            startIcon={<StyledDeleteIcon />}
            onClick={() => {
              if (onDelete) {
                const data = {
                  name: 'Collected Name', // Replace with actual form data
                  description: 'Collected Description', // Replace with actual form data
                };
                onDelete(); // Trigger delete with form data
              } else {
                console.error('Delete function not provided');
              }
            }}
          >
            {t('modal.delete')}
          </StyledModalDeleteButton>
        </ModalBaseButton>
      </StyledModalBox>
    </Modal>
  );
};

export default EntityActionModal;
