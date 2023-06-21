
export const fetchOnlyRegionQuery = (opt: string): string => `
    SELECT 

    mr.id,
    mr.extension,
    mr.name,
    mu.unit

    FROM macro_region mr 
    INNER JOIN measurement_unit mu ON mu.id  = mr.measurement_id
    ${opt}
`

export const fetchStateByRegionQuery = (opt: string): string => `
    SELECT 

    mr.id,
    mr.extension,
    mr.name,
    mu.unit,
    json_agg(jsonb_build_object('state', s.name, 'stateId', s.id)) as "states"

    FROM macro_region mr 
    INNER JOIN measurement_unit mu ON mu.id  = mr.measurement_id
    INNER JOIN state s ON s.region_id = mr.id
    ${opt}
    GROUP BY mr.id, mr.name, mu.unit 
`

export const fetchProvincesByStateFromRegionQuery = (opt: string): string => `
    SELECT
    mr.id,
    mr.extension,
    mr.name,
    mu.unit,
    json_agg(jsonb_build_object('state', s.name, 'stateId', s.id, 'provinces', subquery.provinces)) AS "states"
    
    FROM macro_region mr
    INNER JOIN measurement_unit mu ON mu.id = mr.measurement_id
    INNER JOIN state s ON s.region_id = mr.id
    LEFT JOIN (
    SELECT DISTINCT p.state_id, jsonb_agg(jsonb_build_object('provinceId', p.id, 'province', p.name) ORDER BY p.id) AS provinces
    FROM province p
    GROUP BY p.state_id
    ) subquery ON subquery.state_id = s.id
    ${opt}
    GROUP BY mr.id, mr.extension, mr.name, mu.unit
`

export const fetchProvincesByRegionQuery = (opt: string): string => `
    SELECT 

    mr.id,
    mr.extension,
    mr.name,
    mu.unit,
    json_agg(jsonb_build_object('province', p.name, 'provinceId', p.id)) as "provinces"

    FROM macro_region mr 
    INNER JOIN measurement_unit mu ON mu.id  = mr.measurement_id
    INNER JOIN state s ON s.region_id = mr.id
    INNER JOIN province p ON p.state_id = s.id
    ${opt} 
    GROUP BY mr.id, mr.name, mu.unit
`
