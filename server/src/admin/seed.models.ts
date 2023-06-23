export interface measurementModel {
  id: number
  unit: string
  definition: any
}

export interface regionModel {
  id: number
  name: string
  extension: number
  measurementId: number
}

export interface stateModel {
  id: number
  name: string
  extension: number
  regionId: number
  measurementId: number
}

export interface provinceModel {
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

export interface periodModel {
  id: number
  year: string
  descriptionEn: string
  descriptionEs: string
  url: string
}

export interface generalPopulationStatisticModel {
  total: any
  urban: any
  rural: any
  periodId: number
}

export interface populationStatisticsByStateModel {
  total: any
  urban: any
  rural: any
  periodId: number
  stateId: number
}
