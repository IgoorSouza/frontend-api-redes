interface Props {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  maxLength: number;
  value: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
}

export default function Input({
  label,
  id,
  type,
  placeholder,
  maxLength,
  value,
  setter,
}: Props) {
  return (
    <div className="flex flex-col gap-1 text-lg mb-4 w-full">
      <label htmlFor={id} className="ml-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        required
        className="p-2 rounded-md"
        onChange={(event) => setter(event.target.value)}
      />
    </div>
  );
}
