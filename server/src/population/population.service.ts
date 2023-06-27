import { FetchUnifiedStatisticsPopulationOutputModel } from '@models/population.model'
import prisma from '@shared/utils/prisma'
import { fetchUnifiedPopulationStatisticQuery, fetchUnifiedPopulationStatisticsInATotalRangeQuery } from './population.query'

export type queryOptionType =
  'fetchAll' |
  'fetchInATotalRange' |
  'fetchInARangeForMale' |
  'fetchInARangeForFemale'

function queryDesigner (type: queryOptionType, min: number, max: number): string {
  if (type === 'fetchAll') {
    return fetchUnifiedPopulationStatisticQuery()
  } else if (type === 'fetchInATotalRange') {
    return fetchUnifiedPopulationStatisticsInATotalRangeQuery({ min, max })
  } else return ''
}

export async function fetchGnralStatisticsPopulation
({ type = 'fetchAll', min = 0, max = 1 }:
{
  type: queryOptionType
  min: number
  max: number
}): Promise<FetchUnifiedStatisticsPopulationOutputModel[]> {
  const query = queryDesigner(type, min, max)
  const result: FetchUnifiedStatisticsPopulationOutputModel[] = await prisma.$queryRawUnsafe(query)
  return result
}
