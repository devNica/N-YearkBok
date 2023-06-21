import prisma from '@shared/utils/prisma'
import { fetchOnlyRegionQuery, fetchProvincesByRegionQuery, fetchProvincesByStateFromRegionQuery, fetchStateByRegionQuery } from './geo.query'
import { FetchRegionInfoOutputModel } from '@models/geo.model'

export type queryOptionType = 'getOnlyRegions' | 'getStatesByRegion' | 'getProvincesByStateFromRegion' | 'getProvincesByRegion'

function querySelector (type: queryOptionType, option: string): string {
  if (type === 'getOnlyRegions') {
    return fetchOnlyRegionQuery(option)
  } else if (type === 'getStatesByRegion') {
    return fetchStateByRegionQuery(option)
  } else if (type === 'getProvincesByStateFromRegion') {
    return fetchProvincesByStateFromRegionQuery(option)
  } else if (type === 'getProvincesByRegion') {
    return fetchProvincesByRegionQuery(option)
  } else return ''
}

export async function fetchAllMacroRegions ({ option, region }: { option: queryOptionType, region: string | undefined }): Promise<FetchRegionInfoOutputModel[]> {
  const str = region !== undefined ? `WHERE mr.id = ${region}` : 'WHERE mr.id > 0'
  const query = querySelector(option, str)
  const result: FetchRegionInfoOutputModel[] = await prisma.$queryRawUnsafe(query)
  return result
}
