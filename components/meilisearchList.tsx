'use client';

import { Fragment, useState } from 'react';
import { useAtom } from 'jotai';
import { isEmpty } from 'lodash';
import qs from 'qs';
import { useQuery } from '@tanstack/react-query';

import PersonPreviewList from '@/components/personPreviewList';
import { searchAtom, sexAtom } from '@/store/meilisearchStore';

async function getData({ page, perPage, search, sex }: any) {
  const params = {
    type: 'meilisearch',
    search,
    sex,
    limit: perPage,
    offset: perPage * page - perPage,
  };
  const merge = qs.stringify(params);
  const res = await fetch(`/api/person?${merge}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default function MeilisearchList() {
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [search] = useAtom(searchAtom);
  const [sex] = useAtom(sexAtom);

  const { isLoading, data: person } = useQuery({
    queryKey: ['person-meilisearch', page, perPage, search, sex],
    queryFn: () => getData({ page, perPage, search, sex }),
  });

  return (
    <Fragment>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Fragment>
          {isEmpty(person.data) ? (
            <div>Not Found</div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 mb-4">
                {person.data.map((res: any, index: number) => (
                  <PersonPreviewList
                    key={index}
                    avatar={res.avatar}
                    name={`${res.firstName} ${res.middleName} ${res.lastName}`}
                    sex={res.sex}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={person.meta.offset === 0}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </button>

                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={person.data.length < perPage}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
