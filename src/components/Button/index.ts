import KebabButton from './KebabButton';
import PrimaryButton from './PrimaryButton';
import CategoryButton from './Category/CategoryButton';
import ModalCloseButton from './Modal/ModalCloseButton';
import ModalActionButton from './Modal/ModalActionButton';

export const Button = Object.assign(PrimaryButton, {
  Category: CategoryButton,
  Kebab: KebabButton,
  Modal: {
    Close: ModalCloseButton,
    Action: ModalActionButton,
  },
});
