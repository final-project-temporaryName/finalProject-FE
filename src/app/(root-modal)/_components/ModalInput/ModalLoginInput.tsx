interface Props {
  value: string | undefined;
  htmlFor: string;
  label: string;
  placeholder: string;
  register: any;
}

function ModalLoginInput({ value, htmlFor, label, placeholder, register }: Props) {
  return (
    <div className="relative my-12 flex h-56 flex-col">
      <label
        className="absolute top-0 inline-block h-56 w-full rounded-sm border-1 border-solid border-[#cfd9de] px-8 pt-8 text-13 text-[#536471] focus-within:text-primary"
        htmlFor={htmlFor}
      >
        {label}
      </label>
      <input
        id={htmlFor}
        className="mt-16 w-full border-none px-8 pb-8 pt-12 text-17 outline-none"
        value={value}
        type="text"
        placeholder={placeholder}
        {...register}
      />
    </div>
  );
}

export default ModalLoginInput;
