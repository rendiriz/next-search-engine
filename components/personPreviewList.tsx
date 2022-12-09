import Image from 'next/image';

export default function PersonPreviewList({ avatar, name, sex }: any) {
  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg">
      <div className="flex p-4 gap-4">
        <Image alt={name} src={avatar} width={50} height={50} />
        <div>
          <h5 className="text-lg">{name}</h5>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 capitalize">
            {sex}
          </span>
        </div>
      </div>
    </div>
  );
}
