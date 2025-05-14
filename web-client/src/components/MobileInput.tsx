import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface IMobileInputProps {
  phone: string;
  country: string;
  onChange: (phone: string) => void;
}

export const MobileInput: React.FC<IMobileInputProps> = (
  props: IMobileInputProps,
) => {
  const { phone, country, onChange } = props;

  return (
    <PhoneInput
      country={country}
      value={phone}
      onChange={onChange}
      inputClass="!w-full !h-[50px] !rounded-2xl !text-lg border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900"
      buttonClass="!rounded-l-2xl"
      dropdownClass="!rounded-2xl !w-[450px]"
    />
  );
};