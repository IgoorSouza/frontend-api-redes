interface Props {
  title: string;
  buttonText: string;
  submitFunction: () => void;
  loading: boolean;
  children: React.ReactNode;
}

export default function Form({
  title,
  buttonText,
  submitFunction,
  loading,
  children,
}: Props) {
  return (
    <form
      className="flex flex-col items-center py-5 px-8 bg-slate-300 rounded-lg w-[80%] max-w-[600px] mx-auto mt-12"
      onSubmit={(event) => {
        event.preventDefault();
        submitFunction();
      }}
    >
      <h1 className="text-center mb-3 text-3xl font-bold">{title}</h1>

      {children}

      <button
        className={`bg-black text-white px-4 py-2 text-lg rounded-lg cursor-pointer ${
          loading ? "opacity-60" : "hover:opacity-80"
        }`}
        disabled={loading}
      >
        {buttonText}
      </button>
    </form>
  );
}
