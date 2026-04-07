import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http'
import { ContainerRegistrationKeys } from '@medusajs/framework/utils'
import BrandProductLink from '../../../links/brand-product'

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const filters: Record<string, unknown> = {}
  if (req.query.product_id) {
    filters.product_id = req.query.product_id
  }

  const { data: brandProducts } = await query.graph({
    entity: BrandProductLink.entryPoint,
    fields: ['brand.id', 'brand.name', 'product_id'],
    filters,
  })

  res.json({ brand_products: brandProducts })
}
