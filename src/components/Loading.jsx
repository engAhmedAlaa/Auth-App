import { IconParkOutlineLoading } from './Icons';

function Loading() {
  return (
    <div className="grid min-h-screen place-content-center text-4xl font-bold">
      <IconParkOutlineLoading className="animate-spin text-6xl text-indigo-500" />
    </div>
  );
}

export default Loading;
