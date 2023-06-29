import { fetchPopulationStatisticQuery, fetchPopulationStatisticsForAFemaleRangeQuery, fetchPopulationStatisticsForAMaleRangeQuery, fetchPopulationStatisticsInATotalRangeQuery, fetchPopulationStatisticsInAgeRangeQuery } from './population.query'
import { queryOptionType } from './population.service'

export type domain = 'total' | 'rural' | 'urban'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class DataQueryDesigner {
  static getQuery ({ source, type, min, max }: { source: domain, type: queryOptionType, min: number, max: number }): string {
    if (type === 'fetchAll') {
      return fetchPopulationStatisticQuery(source)
    } else if (type === 'fetchInATotalRange') {
      return fetchPopulationStatisticsInATotalRangeQuery({ source, min, max })
    } else if (type === 'fetchInAgeRange') {
      return fetchPopulationStatisticsInAgeRangeQuery({ source, min, max })
    } else if (type === 'fetchInARangeForMale') {
      return fetchPopulationStatisticsForAMaleRangeQuery({ source, min, max })
    } else if (type === 'fetchInARangeForFemale') {
      return fetchPopulationStatisticsForAFemaleRangeQuery({ source, min, max })
    } else return ''
  }
}
