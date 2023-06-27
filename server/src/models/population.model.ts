import { z } from 'zod'

const PopulationInfoCoreModel = z.object({
  id: z.string().uuid(),
  range: z.string(),
  total: z.number(),
  male: z.number(),
  female: z.number(),
  periodId: z.number(),
  descriptionEs: z.string(),
  descriptionEn: z.string()
})

export type FetchUnifiedStatisticsPopulationOutputModel = z.infer<typeof PopulationInfoCoreModel>
const GetUnifiedStatisticsPopulationResponseModel = z.array(PopulationInfoCoreModel)

export const populationModels = {
  GetUnifiedStatisticsPopulationResponseModel
}
