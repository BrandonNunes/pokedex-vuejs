export interface PokeTypesProps {
    id: number,
    name: string,
    abilities: [
        {
            ability: {
                name: string,
                url: string
            }
        }
    ],
    sprites: {
        front_default: string,
        "official-artwork": {
            front_default: string
        }
    },
    stats: [
        {
            base_stat: number,
            effort: number,
            stat: {
                name: string,
                url: string
            }
        }
    ],
    types: [
        {
            slot: 1,
            type: {
                name: string,
                url: string
            }
        },
    ]
}