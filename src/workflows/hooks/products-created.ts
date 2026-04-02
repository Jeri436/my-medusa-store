import { LinkDefinition } from '@medusajs/framework/types'
import { Modules } from '@medusajs/framework/utils'
import { StepResponse } from '@medusajs/framework/workflows-sdk'
import { createProductsWorkflow } from '@medusajs/medusa/core-flows'
import { BRAND_MODULE } from '../../modules/brand'

createProductsWorkflow.hooks.productsCreated(
  async ({ products, additional_data }, { container }) => {
    const brandId = additional_data?.brand_id
    if (!brandId) {
      return new StepResponse(null)
    }

    const link = container.resolve('link')
    const logger = container.resolve('logger')

    const links: LinkDefinition[] = products.map((product) => ({
      [BRAND_MODULE]: { brand_id: brandId },
      [Modules.PRODUCT]: { product_id: product.id },
    }))

    await link.create(links)
    logger.info('Linked brand to products')

    return new StepResponse(links, links)
  },
)
