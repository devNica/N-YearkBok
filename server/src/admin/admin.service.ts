import { jsonToObject } from '@shared/utils/object'
import prisma from '@shared/utils/prisma'
import fs from 'fs'
import path from 'path'
import { measurementModel, regionModel, stateModel, provinceModel, periodModel, generalPopulationStatisticModel, populationStatisticsByStateModel } from './seed.models'

export async function migrateSeeds (): Promise<void> {
  const measurementsJSON = fs.readFileSync(path.join(__dirname, '../seeds/unidades.json'), 'utf-8')
  const regionJSON = fs.readFileSync(path.join(__dirname, '../seeds/zonas.json'), 'utf-8')
  const statesJSON = fs.readFileSync(path.join(__dirname, '../seeds/departamentos.json'), 'utf-8')
  const provincesJSON = fs.readFileSync(path.join(__dirname, '../seeds/municipios.json'), 'utf-8')

  const periodJSON = fs.readFileSync(path.join(__dirname, '../seeds/period.json'), 'utf-8')
  const gnralPopulationStatisticsJSON = fs.readFileSync(path.join(__dirname, '../seeds/general_population_statistics.json'), 'utf-8')
  const populationStatisticsByStateJSON = fs.readFileSync(path.join(__dirname, '../seeds/population_statistics_by_state.json'), 'utf-8')

  const measurements: measurementModel[] = await jsonToObject(measurementsJSON)
  const region: regionModel[] = await jsonToObject(regionJSON)
  const states: stateModel[] = await jsonToObject(statesJSON)
  const provinces: provinceModel[] = await jsonToObject(provincesJSON)

  const period: periodModel[] = await jsonToObject(periodJSON)
  const gnralPopulationStatistic: generalPopulationStatisticModel[] = await jsonToObject(gnralPopulationStatisticsJSON)

  const populationStatisticsByState: populationStatisticsByStateModel[] = await jsonToObject(populationStatisticsByStateJSON)

  await (Promise.all(measurements.map(async (m) => {
    await prisma.measurementUnit.create({
      data: {
        id: m.id,
        unit: m.unit,
        definition: m.definition
      }
    })
  })))

  await (Promise.all(region.map(async (r) => {
    await prisma.macroRegion.create({
      data: {
        id: r.id,
        name: r.name,
        extension: r.extension,
        measurementId: r.measurementId
      }
    })
  })))

  await (Promise.all(states.map(async (s) => {
    await prisma.state.create({ data: s })
  })))

  await (Promise.all(provinces.map(async (p) => {
    await prisma.province.create({ data: p })
  })))

  await (Promise.all(period.map(async (p) => {
    await prisma.period.create({ data: p })
  })))

  await (Promise.all(gnralPopulationStatistic.map(async (gps) => {
    await prisma.generalPopulationStatistic.create({
      data: {
        total: gps.total,
        rural: gps.rural,
        urban: gps.urban,
        periodId: gps.periodId
      }
    })
  })))

  await (Promise.all(populationStatisticsByState.map(async (pss) => {
    await prisma.populationStatisticByState.create({
      data: {
        total: pss.total,
        rural: pss.rural,
        urban: pss.urban,
        periodId: pss.periodId,
        stateId: pss.stateId
      }
    })
  })))
}
