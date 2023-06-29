export const fetchGlobalPopulationStatisticsQuery = (): string => `
    SELECT 

    gps.id,
    gps.total,
    gps.urban,
    gps.rural,
    gps.period_id as "periodId"

    FROM public.gnral_population_statistic gps 
`

export const fetchPopulationStatisticQuery = (source: string): string => `
    SELECT 
    gps.id,
    elementos->>'range' as "range",
    elementos->>'both' AS "total",
    elementos->>'male' as "male",
    elementos->>'female' as "female",
    gps.period_id as "periodId",
    p.description_es,
    p.description_en,
    p.year

    FROM public.gnral_population_statistic gps
    INNER JOIN jsonb_array_elements(gps.${source}) AS elementos on true
    INNER JOIN "period" p ON p.id = gps.period_id
`

export const fetchPopulationStatisticsInATotalRangeQuery = (opt: { source: string, min: number, max: number }): string => `
    SELECT 
    gps.id,
    elementos->>'range' as "range",
    elementos->>'both' AS "total",
    elementos->>'male' as "male",
    elementos->>'female' as "female",
    gps.period_id as "periodId",
    p.description_es,
    p.description_en,
    p.year

    FROM public.gnral_population_statistic gps
    inner join jsonb_array_elements(gps.${opt.source}) AS elementos on true
    inner join "period" p on p.id = gps.period_id
    WHERE (elementos->>'both'):: numeric between ${opt.min} and ${opt.max}
`

export const fetchPopulationStatisticsInAgeRangeQuery = (opt: { source: string, min: number, max: number }): string => `
    SELECT 
    gps.id,
    elementos->>'range' as "range",
    elementos->>'both' AS "total",
    elementos->>'male' as "male",
    elementos->>'female' as "female",
    elementos->>'min_range' as "minRange",
    elementos->>'max_range' as "maxRange",
    gps.period_id as "periodId",
    p.description_es,
    p.description_en,
    p.year

    FROM public.gnral_population_statistic gps
    inner join jsonb_array_elements(gps.${opt.source}) AS elementos on true
    inner join "period" p on p.id = gps.period_id
    WHERE 
    CAST(elementos->>'min_range' AS INTEGER) >= ${opt.min} AND
    CAST(elementos->>'max_range' AS INTEGER) <= ${opt.max}
`

export const fetchPopulationStatisticsForAMaleRangeQuery = (opt: { source: string, min: number, max: number }): string => `
    SELECT 
    gps.id,
    elementos->>'range' as "range",
    elementos->>'both' AS "total",
    elementos->>'male' as "male",
    elementos->>'female' as "female",
    elementos->>'min_range' as "min_range",
    elementos->>'max_range' as "max_range",
    gps.period_id as "periodId",
    p.description_es,
    p.description_en,
    p.year

    FROM public.gnral_population_statistic gps
    inner join jsonb_array_elements(gps.${opt.source}) AS elementos on true
    inner join "period" p on p.id = gps.period_id
    WHERE (elementos->>'male'):: numeric between ${opt.min} and ${opt.max}
`

export const fetchPopulationStatisticsForAFemaleRangeQuery = (opt: { source: string, min: number, max: number }): string => `
    SELECT 
    gps.id,
    elementos->>'range' as "range",
    elementos->>'both' AS "total",
    elementos->>'male' as "male",
    elementos->>'female' as "female",
    elementos->>'min_range' as "min_range",
    elementos->>'max_range' as "max_range",
    gps.period_id as "periodId",
    p.description_es,
    p.description_en,
    p.year

    FROM public.gnral_population_statistic gps
    inner join jsonb_array_elements(gps.${opt.source}) AS elementos on true
    inner join "period" p on p.id = gps.period_id
    WHERE (elementos->>'female'):: numeric between ${opt.min} and ${opt.max}
`
