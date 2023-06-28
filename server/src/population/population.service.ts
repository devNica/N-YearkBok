import { FetchUnifiedStatisticsPopulationOutputModel } from '@models/population.model'
import prisma from '@shared/utils/prisma'
import { fetchUnifiedPopulationStatisticQuery, fetchUnifiedPopulationStatisticsForAFemaleRangeQuery, fetchUnifiedPopulationStatisticsForAMaleRangeQuery, fetchUnifiedPopulationStatisticsInATotalRangeQuery, fetchUnifiedPopulationStatisticsInAgeRangeQuery } from './population.query'

export type queryOptionType =
  'fetchAll' |
  'fetchInAgeRange' |
  'fetchInATotalRange' |
  'fetchInARangeForMale' |
  'fetchInARangeForFemale'

function queryDesigner (type: queryOptionType, min: number, max: number): string {
  if (type === 'fetchAll') {
    return fetchUnifiedPopulationStatisticQuery()
  } else if (type === 'fetchInATotalRange') {
    return fetchUnifiedPopulationStatisticsInATotalRangeQuery({ min, max })
  } else if (type === 'fetchInAgeRange') {
    return fetchUnifiedPopulationStatisticsInAgeRangeQuery({ min, max })
  } else if (type === 'fetchInARangeForMale') {
    return fetchUnifiedPopulationStatisticsForAMaleRangeQuery({ min, max })
  } else if (type === 'fetchInARangeForFemale') {
    return fetchUnifiedPopulationStatisticsForAFemaleRangeQuery({ min, max })
  } else return ''
}

export async function fetchGnralStatisticsPopulation
({ type = 'fetchAll', min = 10000, max = 100000 }:
{
  type: queryOptionType
  min: number
  max: number
}): Promise<FetchUnifiedStatisticsPopulationOutputModel[]> {
  const query = queryDesigner(type, min, max)
  const result: FetchUnifiedStatisticsPopulationOutputModel[] = await prisma.$queryRawUnsafe(query)
  return result
}
