import { useState } from 'react';
import { Link } from 'react-router-dom';
import UpdateEmail from '../components/UpdateEmail';
import UpdatePassword from '../components/UpdatePassword';

function UpdateProfile() {
  const [updateTab, setUpdateTab] = useState('email');
  const tabs = ['email', 'password'];

  return (
    <div>
      <div className="rounded-md border border-gray-300 p-6 dark:border-white/20">
        <h1 className="text-center text-4xl font-semibold">
          Update Your Profile
        </h1>
        <ul className="mt-8 flex justify-center gap-x-4">
          {tabs.map((tab) => (
            <li key={tab}>
              <button
                className={`rounded-md border-2 border-indigo-600 px-4 py-2 capitalize transition-all active:scale-95 ${
                  updateTab === tab ? 'bg-indigo-600 text-white' : ''
                }`}
                onClick={() => setUpdateTab(tab)}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
        {updateTab === 'email' ? <UpdateEmail /> : <UpdatePassword />}
      </div>
      <p className="mt-8 text-center">
        <Link to=".." className="text-indigo-600">
          Cancel
        </Link>
      </p>
    </div>
  );
}

export default UpdateProfile;
