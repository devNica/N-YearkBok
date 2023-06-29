import { z } from 'zod'

const PopulationInfoCoreModel = z.object({
  id: z.string().uuid(),
  range: z.string(),
  total: z.number(),
  male: z.number(),
  female: z.number(),
  minRnage: z.number().optional(),
  maxRange: z.number().optional(),
  periodId: z.number(),
  descriptionEs: z.string(),
  descriptionEn: z.string()
})

export type FetchStatisticsPopulationOutputModel = z.infer<typeof PopulationInfoCoreModel>
const GetStatisticsPopulationResponseModel = z.array(PopulationInfoCoreModel)

export const populationModels = {
  GetStatisticsPopulationResponseModel
}
