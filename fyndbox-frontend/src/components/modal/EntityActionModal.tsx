import { FC, useEffect, useState } from 'react';
import { Modal, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CustomTextField from '../../components/CustomTextField/CustomTextField';
import ModalHeading from './ModalHeading';
import ImageUploader from './ImageUploader';
import { EntityType } from '../../types/entityTypes';
import { ModalBox, CancelButton } from './EntityActionModal.styles';
import { TextFieldsContainer } from '../../styles/commonStyles';
import ActionButtonsGroup from '../ActionButtonsGroup/ActionButtonsGroup';
import { Close } from '@mui/icons-material';

interface EntityActionModalProps {
  open: boolean;
  entityType: EntityType;
  mode: 'add' | 'edit';
  initialData?: { name: string; description: string; image?: string };
  onClose: () => void;
  onSave: (data: { name: string; description: string; image?: string }) => void;
  onDelete?: () => void;
}

const EntityActionModal: FC<EntityActionModalProps> = ({
  open,
  mode,
  entityType,
  initialData,
  onClose,
  onSave,
  onDelete,
}) => {
  const { t } = useTranslation();
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(
    initialData?.description || '',
  );
  const [image, setImage] = useState(initialData?.image || '');
  const [nameError, setNameError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open) {
      setNameError(false);
      setName(initialData?.name || '');
      setDescription(initialData?.description || '');
      setImage(initialData?.image || '');
    }
  }, [open, initialData]);

  const handleSave = () => {
    if (!name) {
      setNameError(true);
    } else {
      onSave({ name, description, image });
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalBox>
        <CancelButton onClick={onClose}>
          <Close />
        </CancelButton>

        <ModalHeading mode={mode} type={entityType} />

        <TextFieldsContainer>
          <CustomTextField
            label={t('modal.name.label')}
            placeholder={t('modal.name.placeholder')}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameError(false);
              if (error) setError(null);
            }}
            error={nameError}
            helperText={
              nameError
                ? t('modal.name.errorMessage', {
                    type: t(`types.${entityType}`),
                  })
                    .split('\n')
                    .map((line, index) => (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    ))
                : ''
            }
          />
          <CustomTextField
            label={t('modal.description.label')}
            placeholder={t('modal.description.placeholder')}
            value={description}
            multiline
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </TextFieldsContainer>

        <ImageUploader
          label={t('modal.image.label')}
          initialImage={image}
          onImageUpload={(uploadedImage) => {
            console.log('Image uploaded:', uploadedImage);
            setImage(uploadedImage);
          }}
        />

        <ActionButtonsGroup
          showDeleteButton={mode === 'edit'}
          onSaveClick={handleSave}
          onDeleteClick={onDelete}
        />
        {error && (
          <Typography variant="caption" color="error">
            {error}
          </Typography>
        )}
      </ModalBox>
    </Modal>
  );
};

export default EntityActionModal;
