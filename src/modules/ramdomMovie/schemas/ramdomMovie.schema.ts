import { z as zod } from "zod"

export const ramdomMovieSchema = zod.object({
    category: zod.string(),
    time: zod.string(),
})