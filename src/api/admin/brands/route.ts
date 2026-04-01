import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http'
import { createBrandWorkflow } from '../../../workflows/create-brand'

type CreateBrandInput = {
  name: string
}

export const POST = async (
  req: MedusaRequest<CreateBrandInput>,
  res: MedusaResponse,
) => {
  const { result } = await createBrandWorkflow(req.scope).run({
    input: {
      name: req.body.name,
    },
  })

  res.json({ brand: result })
}
