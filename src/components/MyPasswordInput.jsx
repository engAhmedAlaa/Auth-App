import { useState } from 'react';
import { useField } from 'formik';
import { BxsShow, BxsHide } from '../components/Icons';

function MyPasswordInput({ label, ...props }) {
  const [field, meta] = useField(props);
  const [show, setShow] = useState(false);

  return (
    <div>
      <label htmlFor={props.id}>{label}</label>
      <div className="relative mt-3 text-slate-800 dark:text-slate-200">
        <input
          type={show ? 'text' : 'password'}
          className={`block w-full bg-transparent rounded-md border border-gray-300 dark:border-white/20 py-2 pl-3 pr-12 outline-none transition-all focus:border-indigo-300 focus:ring focus:ring-indigo-600 focus:ring-opacity-20 dark:focus:ring-opacity-70 ${
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
        />
        <button
          type="button"
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-xl"
          aria-label="Show Password"
          onClick={() => setShow((prevState) => !prevState)}
          tabIndex="-1"
        >
          {show ? <BxsHide /> : <BxsShow />}
        </button>
      </div>
      {meta.touched && meta.error && (
        <p className="text-sm text-red-500 mt-1">*{meta.error}</p>
      )}
    </div>
  );
}

export default MyPasswordInput;
