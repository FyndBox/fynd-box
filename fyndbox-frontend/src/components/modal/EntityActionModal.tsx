import { FC } from 'react';
import { EntityType } from '../../types/entityTypes';
import {
    StyledModalBox, 
    StyledModalAddButton,
    StyledModalDeleteButton, 
    ModalImageBox,
    UpdateImageBox,
    ModalBaseButton,
    } 
    from './EntityActionModal.styles';
import { useTranslation } from 'react-i18next';
import PageHeader from '../../components/PageHeader/PageHeader';
import CustomTextField from '../../components/CustomTextField/CustomTextField';
import { TextFieldsContainer } from '../../styles/commonStyles';
import { Modal } from '@mui/material';
import { AuthButtonsWrapper } from '../AuthButtonsGroup/AuthButtonsGroup.styles';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import imageSrc from '../../assets/AddImage.png';
import { Typography } from '@mui/material';

interface EntityActionModalProps {
    open: boolean;
    onClose: () => void;
    entityType: EntityType;
    mode: 'add' | 'edit';
    initialData?: any;
}

const EntityActionModal: FC<EntityActionModalProps> = ({ open, onClose, entityType, mode, initialData }) => {
    const { t } = useTranslation();

    return (
        <Modal 
            open={open} 
            onClose={onClose}
        >
            <StyledModalBox>
                <Typography 
                variant="body1" 
                sx={{ textAlign: 'left', }}>
                    {t('modal.Avbryt')}
                </Typography> 
                <Typography variant="h3" >{t('modal.heading')}</Typography>
                {/* <PageHeader heading={t('modal.heading')} />    */}

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
                    <Typography variant="h4" >Bild</Typography>
                    {/* Image Example */}
                    <ModalImageBox
                        src={imageSrc}
                        alt={t('modal.imageAltText')} 
                    />
                </UpdateImageBox>
              

                {/* buttons */}
                <ModalBaseButton>
                    <StyledModalAddButton 
                        variant="contained" 
                        fullWidth 
                        startIcon={<CheckIcon sx={{ color:(theme)=> theme.palette.secondary.contrastText }}/>} 
                        onClick={() => console.log('Button Clicked')}  
                    >
                        {mode === 'add' ? t('modal.add') : t('modal.edit')} 
                    </StyledModalAddButton>

                    <StyledModalDeleteButton 
                        variant="contained" 
                        fullWidth
                        startIcon={<DeleteIcon sx={{ color:(theme)=> theme.palette.secondary.contrastText }}/>} 
                        onClick={() => console.log('Button Clicked')}    
                    > 
                        {t('modal.delete')}
                    </StyledModalDeleteButton>
                </ModalBaseButton>
            </StyledModalBox>
        </Modal>
    );
};

export default EntityActionModal;
