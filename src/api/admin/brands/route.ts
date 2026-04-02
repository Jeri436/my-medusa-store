import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http'
import { ContainerRegistrationKeys } from '@medusajs/framework/utils'
import BrandProductLink from '../../../links/brand-product'
import { createBrandWorkflow } from '../../../workflows/create-brand'
import '../../../workflows/hooks/products-created'

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

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const { data: brandProducts } = await query.graph({
    entity: BrandProductLink.entryPoint,
    fields: ['*', 'product.*'],
  })

  res.json({ brand_products: brandProducts })
}
