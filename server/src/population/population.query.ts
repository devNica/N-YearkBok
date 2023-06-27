export const fetchGlobalPopulationStatisticsQuery = (): string => `
    SELECT 

    gps.id,
    gps.total,
    gps.urban,
    gps.rural,
    gps.period_id as "periodId"

    FROM public.gnral_population_statistic gps 
`

export const fetchUnifiedPopulationStatisticQuery = (): string => `
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
    INNER JOIN jsonb_array_elements(gps.total) AS elementos on true
    INNER JOIN "period" p ON p.id = gps.period_id
`

export const fetchUnifiedPopulationStatisticsInATotalRangeQuery = (opt: { min: number, max: number }): string => `
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
    inner join jsonb_array_elements(gps.total) AS elementos on true
    inner join "period" p on p.id = gps.period_id
    WHERE (elementos->>'both'):: numeric between ${opt.min} and ${opt.max}
`

export const fetchUnifiedPopulationStatisticsInAgeRangeQuery = (opt: { min: number, max: number }): string => `
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
    inner join jsonb_array_elements(gps.total) AS elementos on true
    inner join "period" p on p.id = gps.period_id
    WHERE 
    CAST(elementos->>'min_range' AS INTEGER) >= ${opt.min} AND
    CAST(elementos->>'max_range' AS INTEGER) <= ${opt.max}
`
