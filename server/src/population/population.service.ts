import { FetchUnifiedStatisticsPopulationOutputModel } from '@models/population.model'
import prisma from '@shared/utils/prisma'
import { DataQueryDesignerFactory } from './factory.designer'

export type queryOptionType =
  'fetchAll' |
  'fetchInAgeRange' |
  'fetchInATotalRange' |
  'fetchInARangeForMale' |
  'fetchInARangeForFemale'

export async function fetchUnifiedStatisticsPopulation
({ type = 'fetchAll', min = 10000, max = 100000 }:
{
  type: queryOptionType
  min: number
  max: number
}): Promise<FetchUnifiedStatisticsPopulationOutputModel[]> {
  const query = DataQueryDesignerFactory.getQuery('unified', type, min, max)
  const result: FetchUnifiedStatisticsPopulationOutputModel[] = await prisma.$queryRawUnsafe(query)
  return result
}
