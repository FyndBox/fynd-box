import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Delete } from '@mui/icons-material';
import { ButtonsGroupWrapper, CustomIcon } from '../../styles/commonStyles';
import { DeleteButton, SaveButton } from './ActionButtonsGroup.styles';

interface ActionButtonsGroupProps {
  showDeleteButton?: boolean;
  onSaveClick?: (data?: any) => void;
  onDeleteClick?: () => void;
}

const ActionButtonsGroup: FC<ActionButtonsGroupProps> = ({
  showDeleteButton = false,
  onSaveClick,
  onDeleteClick,
}) => {
  const { t } = useTranslation();
  return (
    <ButtonsGroupWrapper>
      <SaveButton
        variant="contained"
        fullWidth
        startIcon={
          <CustomIcon>
            <Check />
          </CustomIcon>
        }
        onClick={() => onSaveClick && onSaveClick()}
      >
        {t('modal.save')}
      </SaveButton>

      {showDeleteButton && (
        <DeleteButton
          variant="contained"
          fullWidth
          startIcon={
            <CustomIcon>
              <Delete />
            </CustomIcon>
          }
          onClick={onDeleteClick}
        >
          {t('modal.delete')}
        </DeleteButton>
      )}
    </ButtonsGroupWrapper>
  );
};

export default ActionButtonsGroup;
