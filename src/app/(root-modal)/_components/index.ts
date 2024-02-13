import ModalBody from './ModalBody/ModalBody';
import { default as ModalContainer, default as ModalLayout } from './ModalContainer/ModalContainer';
import ModalFormTemplate from './ModalForm/ModalLoginForm';
import ArtModalHeader from './ModalHeader/ArtModalHeader';
import ModalHeader from './ModalHeader/ModalHeader';
import ModalTextInput from './ModalInput/ModalLoginInput';

const Modal = Object.assign(ModalLayout, {
  Container: ModalContainer,
  Body: ModalBody,
  Form: {
    Login: ModalFormTemplate,
  },
  Header: ModalHeader,
  ArtHeader: ArtModalHeader,
  Input: {
    Login: ModalTextInput,
  },
});

export default Modal;
