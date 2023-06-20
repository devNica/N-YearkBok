import { jsonToObject } from '@shared/utils/object'
import prisma from '@shared/utils/prisma'
import fs from 'fs'
import path from 'path'

interface measurementModel {
  id: number
  unit: string
  definition: any
}

interface regionModel {
  id: number
  name: string
  extension: number
  measurementId: number
}

interface stateModel {
  id: number
  name: string
  extension: number
  regionId: number
  measurementId: number
}

interface provinceModel {
  id: number
  name: string
  capital: string
  extension: number
  latitude: string
  longitude: string
  msm: number
  stateId: number
  measurementId: number
}

export async function migrateSeeds (): Promise<void> {
  const measurementsJSON = fs.readFileSync(path.join(__dirname, '../seeds/unidades.json'), 'utf-8')
  const regionJSON = fs.readFileSync(path.join(__dirname, '../seeds/zonas.json'), 'utf-8')
  const statesJSON = fs.readFileSync(path.join(__dirname, '../seeds/departamentos.json'), 'utf-8')
  const provincesJSON = fs.readFileSync(path.join(__dirname, '../seeds/municipios.json'), 'utf-8')

  const measurements: measurementModel[] = await jsonToObject(measurementsJSON)
  const region: regionModel[] = await jsonToObject(regionJSON)
  const states: stateModel[] = await jsonToObject(statesJSON)
  const provinces: provinceModel[] = await jsonToObject(provincesJSON)

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
}
