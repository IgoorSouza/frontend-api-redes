import User from "../types/user";
import Project from "../types/project";

interface Props {
  label: string;
  id: string;
  options: User[] | Project[];
  value: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
}

export default function Select({ label, id, options, value, setter }: Props) {
  return (
    <div className="flex flex-col gap-1 text-lg mb-4 w-full">
      <label htmlFor={id} className="ml-1">
        {label}
      </label>
      <select
        id={id}
        value={value}
        required
        className="p-2 rounded-md"
        onChange={(event) => setter(event.target.value)}
      >
        {options?.map((option) => (
          <option value={option.id} key={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
