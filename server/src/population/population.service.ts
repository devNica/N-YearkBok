import { FetchStatisticsPopulationOutputModel } from '@models/population.model'
import prisma from '@shared/utils/prisma'
import { DataQueryDesigner, domain } from './factory.designer'

export type queryOptionType =
  'fetchAll' |
  'fetchInAgeRange' |
  'fetchInATotalRange' |
  'fetchInARangeForMale' |
  'fetchInARangeForFemale'

export async function fetchStatisticsPopulation
({ source = 'total', type = 'fetchAll', min = 10000, max = 100000 }:
{
  source: domain
  type: queryOptionType
  min: number
  max: number
}): Promise<FetchStatisticsPopulationOutputModel[]> {
  const query = DataQueryDesigner.getQuery({ source, type, min, max })
  const result: FetchStatisticsPopulationOutputModel[] = await prisma.$queryRawUnsafe(query)
  return result
}
