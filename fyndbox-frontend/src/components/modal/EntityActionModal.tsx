import { FC } from 'react';
import { EntityType } from '../../types/entityTypes';
import {
  StyledModalBox,
  SaveButton,
  DeleteButton,
  // ImageUploader,
  BaseButtonStyle,
  CancelButton,
} from './EntityActionModal.styles';
import { useTranslation } from 'react-i18next';
import CustomTextField from '../../components/CustomTextField/CustomTextField';
import { TextFieldsContainer, CustomIcon } from '../../styles/commonStyles';
import { Modal } from '@mui/material';
import imageSrc from '../../assets/AddImage.png';
import { Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalHeading from './ModalHeading';
import ImageUploader from './ImageUploader';

interface EntityActionModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: { name: string; description: string; image?: string }) => void; 
  onDelete?: () => void; 
  entityType: EntityType;
  mode: 'add' | 'edit';
  initialData?: { name: string; description: string; image?: string  };

}

const EntityActionModal: FC<EntityActionModalProps> = ({
  open,
  onClose,
  onSave,
  onDelete,
  mode,
  entityType,
  initialData,

}) => {
  const { t } = useTranslation();

  return (
    <Modal open={open} onClose={onClose}>
      <StyledModalBox>
        <CancelButton
          variant="text"
          onClick={onClose}
        >
          {t('modal.cancel')}
        </CancelButton>

        <ModalHeading mode={mode} type={entityType} />

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

        <ImageUploader
          label={t('modal.image.label')} // This will be 'Bild' or any other dynamic label
          initialImage={initialData?.image}
          onImageUpload={(uploadedImage) => {
            console.log('Image uploaded:', uploadedImage);
          
          }}
        />

        {/* buttons */}
        <BaseButtonStyle>
          <SaveButton
            variant="contained"
            fullWidth
            startIcon={
              <CustomIcon>
                <CheckIcon />
              </CustomIcon>
            }
            onClick={() => {
              const data = {
                name: 'Collected Name', // Replace with actual form data
                description: 'Collected Description', // Replace with actual form data
              };
              onSave(data); // Trigger save with form data
            }}
          >
             {t('modal.save')}
          </SaveButton>

          <DeleteButton
            variant="contained"
            fullWidth
            startIcon={
              <CustomIcon>
                <DeleteIcon />
              </CustomIcon>
            }
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
          </DeleteButton>
        </BaseButtonStyle>
      </StyledModalBox>
    </Modal>
  );
};

export default EntityActionModal;
