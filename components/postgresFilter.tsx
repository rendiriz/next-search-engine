'use client';

import { useMemo } from 'react';
import { useAtom } from 'jotai';
import debounce from 'lodash/debounce';

import { searchAtom, sexAtom } from '@/store/postgresStore';

export default function PostgresFilter() {
  const [search, setSearch] = useAtom(searchAtom);
  const [sex, setSex] = useAtom(sexAtom);

  // Action
  const handleSearch = ({ target }: any) => {
    setSearch(target.value);
  };

  const debouncedChangeHandler = useMemo(() => debounce(handleSearch, 500), []);

  const handleSex = ({ target }: any) => {
    setSex(target.value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div className="col-span-2">
        <div>
          <input
            type="text"
            placeholder="Search"
            defaultValue={search}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={debouncedChangeHandler}
          />
        </div>
      </div>
      <div>
        <select
          defaultValue={sex}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-[0.7rem] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handleSex}
        >
          <option value="">Choose a gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
    </div>
  );
}
