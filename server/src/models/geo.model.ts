import { z } from 'zod'

const ProvinceInfoCoreModel = {
  provinceId: z.number(),
  province: z.string()
}

const StateInfoCoreModel = {
  stateId: z.number(),
  state: z.string(),
  provinces: z.array(z.object({ ...ProvinceInfoCoreModel })).optional()
}

const RegionInfoCoreModel = z.object({
  id: z.number(),
  name: z.string(),
  extension: z.number(),
  unit: z.string(),
  states: z.array(z.object({ ...StateInfoCoreModel })).optional(),
  provinces: z.array(z.object({ ...ProvinceInfoCoreModel })).optional()
})

export type FetchRegionInfoOutputModel = z.infer<typeof RegionInfoCoreModel>

const GetRegionInfoResponseModel = z.array(RegionInfoCoreModel)

export const geoModels = {
  GetRegionInfoResponseModel
}
