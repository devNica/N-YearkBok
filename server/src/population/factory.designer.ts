import { fetchUnifiedPopulationStatisticQuery, fetchUnifiedPopulationStatisticsInATotalRangeQuery, fetchUnifiedPopulationStatisticsInAgeRangeQuery, fetchUnifiedPopulationStatisticsForAMaleRangeQuery, fetchUnifiedPopulationStatisticsForAFemaleRangeQuery } from './population.query'
import { queryOptionType } from './population.service'

export type domain = 'unified' | 'rural' | 'urban'

interface QueryDesignerInterface {
  queryDesigner: (type: queryOptionType, min: number, max: number) => string
}

class UnifiedDataQueryDesigner implements QueryDesignerInterface {
  constructor (
    private readonly type: queryOptionType,
    private readonly min: number,
    private readonly max: number
  ) {}

  queryDesigner (): string {
    if (this.type === 'fetchAll') {
      return fetchUnifiedPopulationStatisticQuery()
    } else if (this.type === 'fetchInATotalRange') {
      return fetchUnifiedPopulationStatisticsInATotalRangeQuery({ min: this.min, max: this.max })
    } else if (this.type === 'fetchInAgeRange') {
      return fetchUnifiedPopulationStatisticsInAgeRangeQuery({ min: this.min, max: this.max })
    } else if (this.type === 'fetchInARangeForMale') {
      return fetchUnifiedPopulationStatisticsForAMaleRangeQuery({ min: this.min, max: this.max })
    } else if (this.type === 'fetchInARangeForFemale') {
      return fetchUnifiedPopulationStatisticsForAFemaleRangeQuery({ min: this.min, max: this.max })
    } else return ''
  }
}

class RuralDataQueryDesigner implements QueryDesignerInterface {
  constructor (
    private readonly type: queryOptionType,
    private readonly min: number,
    private readonly max: number
  ) {}

  queryDesigner (): string {
    return ''
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class DataQueryDesignerFactory {
  static getQuery (domainType: domain, queryType: queryOptionType, min: number, max: number): any {
    switch (domainType) {
      case 'unified':
        return new UnifiedDataQueryDesigner(queryType, min, max).queryDesigner()
      case 'rural':
        return new RuralDataQueryDesigner(queryType, min, max).queryDesigner()
      default:
        return ''
    }
  }
}
