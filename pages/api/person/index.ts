import type { NextApiRequest, NextApiResponse } from 'next';
import { assign, isNil } from 'lodash';
import { prisma } from '@/lib/prisma';
import { meili } from '@/lib/meili';
import { pagination } from '@/lib/pagination';

async function getTotal(req: NextApiRequest) {
  const { search, sex } = req.query;

  const options: any = {
    orderBy: [
      {
        modifiedAt: 'desc',
      },
    ],
    where: {
      isActive: true,
    },
  };

  if (search) {
    assign(options.where, {
      OR: [
        {
          firstName: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          middleName: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          lastName: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ],
    });
  }

  if (sex) {
    assign(options.where, { sex });
  }

  const qTotal = await prisma.person.count(options);

  return qTotal;
}

async function getList(req: NextApiRequest) {
  const { limit, offset, search, sex } = req.query;

  const options: any = {
    orderBy: [
      {
        modifiedAt: 'desc',
      },
    ],
    where: {
      isActive: true,
    },
  };

  if (offset) {
    assign(options, { skip: Number(offset) });
  }

  if (limit) {
    assign(options, { take: Number(limit) });
  }

  if (search) {
    assign(options.where, {
      OR: [
        {
          firstName: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          middleName: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          lastName: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ],
    });
  }

  if (sex) {
    assign(options.where, { sex });
  }

  const qList = await prisma.person.findMany(options);

  return qList;
}

async function getAllPostgres(req: NextApiRequest) {
  const { limit, offset } = req.query;

  const isPagination = !(isNil(offset) && isNil(limit));

  const qList = await getList(req);
  const query = [];
  query.push(qList);

  if (isPagination) {
    const qTotal = await getTotal(req);
    query.push(qTotal);
  }

  return Promise.all(query).then(async (responses) => {
    const data: any = responses[0];

    let paging = {};
    if (isPagination) {
      const total = responses[1] as number;
      paging = pagination(total, Number(offset), Number(limit));
    }

    if (data.length > 0) {
      return {
        data: data,
        pagination: paging,
      };
    } else {
      return {
        data: [],
        pagination: {},
      };
    }
  });
}

async function getAllMeilisearch(req: NextApiRequest) {
  const { limit, offset, search, sex } = req.query;

  const options = {
    limit: Number(limit),
    offset: Number(offset),
    sort: ['modifiedAt:desc'],
    filter: ['isActive = "true"'],
  };

  if (sex) {
    options.filter.push(`sex = "${sex}"`);
  }

  const person = await meili.index('person').search(search as string, options);

  return {
    data: person.hits,
    meta: {
      estimatedTotalHits: person.estimatedTotalHits,
      query: person.query,
      limit: person.limit,
      offset: person.offset,
      processingTimeMs: person.processingTimeMs,
    },
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    try {
      const { type } = req.query;

      switch (type) {
        case 'postgres':
          const pg: any = await getAllPostgres(req);
          return res.status(200).send({
            code: 200,
            error: false,
            message: 'Retrieve data successfully.',
            ...pg,
          });
        case 'meilisearch':
          const ms: any = await getAllMeilisearch(req);
          return res.status(200).send({
            code: 200,
            error: false,
            message: 'Retrieve data successfully.',
            ...ms,
          });
        default:
          break;
      }

      return res.status(200).send({
        code: 200,
        error: false,
        message: 'Retrieve data successfully.',
        data: [],
      });
    } catch (err: any) {
      return res.status(500).send({
        code: 500,
        error: true,
        message: err.message,
        type: 'UnknownError',
        data: {},
      });
    }
  }
}
