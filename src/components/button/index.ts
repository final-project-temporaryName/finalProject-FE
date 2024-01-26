import KebabButton from './KebabButton';
import PrimaryButton from './PrimaryButton';
import CategoryButton from './category/categoryButton';

export const Button = Object.assign(PrimaryButton, {
  Category: CategoryButton,
  Kebab: KebabButton,
});
