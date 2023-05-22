import { useField } from 'formik';

function MyEmailInput({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div>
      <label htmlFor={props.id}>{label}</label>
      <input
        type="email"
        className={`block w-full mt-3 text-slate-800 dark:text-slate-200 bg-transparent rounded-md border border-gray-300 dark:border-white/20 px-3 py-2 outline-none transition-all focus:border-indigo-300 focus:ring focus:ring-indigo-600 focus:ring-opacity-20 dark:focus:ring-opacity-70 ${
          meta.touched && meta.error
            ? 'focus:border-red-300 focus:ring-red-600'
            : 'focus:border-indigo-300 focus:ring-indigo-600'
        } ${
          meta.touched && meta.error
            ? 'border-red-300 ring ring-red-600 ring-opacity-20 dark:ring-opacity-70'
            : ''
        }`}
        {...props}
        {...field}
        autoComplete="email"
      />
      {meta.touched && meta.error && (
        <p className="text-sm text-red-500 mt-1">*{meta.error}</p>
      )}
    </div>
  );
}

export default MyEmailInput;
