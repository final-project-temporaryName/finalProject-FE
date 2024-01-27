import KebabButton from './KebabButton';
import PrimaryButton from './PrimaryButton';
import CategoryButton from './Category/CategoryButton';

export const Button = Object.assign(PrimaryButton, {
  Category: CategoryButton,
  Kebab: KebabButton,
});
