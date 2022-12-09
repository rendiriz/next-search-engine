'use client';

import { Fragment, useState } from 'react';
import { useAtom } from 'jotai';
import { isEmpty } from 'lodash';
import qs from 'qs';
import { useQuery } from '@tanstack/react-query';

import PersonPreviewList from '@/components/personPreviewList';
import Pagination from '@/components/pagination';
import { searchAtom, sexAtom } from '@/store/postgresStore';

async function getData({ page, perPage, search, sex }: any) {
  const params = {
    type: 'postgres',
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

export default function PostgresList() {
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [search] = useAtom(searchAtom);
  const [sex] = useAtom(sexAtom);

  const { isLoading, data: person } = useQuery({
    queryKey: ['person-postgres', page, perPage, search, sex],
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

              <Pagination
                pagination={person.pagination}
                onPage={(e: number) => setPage(Number(e))}
              />
            </>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
