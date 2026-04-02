import { defineWidgetConfig } from '@medusajs/admin-sdk'
import { useQuery } from '@tanstack/react-query'
import { sdk } from '../lib/sdk'

const ProductBrandWidget = ({ data: product }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['product-brand', product.id],
    queryFn: () =>
      sdk.client.fetch(`/admin/brands?product_id=${product.id}`, {
        method: 'GET',
      }),
  })

  if (isLoading) return <div>Loading...</div>

  const brand = data?.brand_products?.[0]?.brand

  return (
    <div className='bg-white border rounded-lg p-4 shadow-sm'>
      <h2 className='text-lg font-semibold mb-2'>Brand</h2>
      {brand ? (
        <p className='text-gray-700'>{brand.name}</p>
      ) : (
        <p className='text-gray-400 italic'>No brand linked</p>
      )}
    </div>
  )
}

export const config = defineWidgetConfig({
  zone: 'product.details.before',
})

export default ProductBrandWidget
