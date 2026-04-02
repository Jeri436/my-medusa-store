import { defineRouteConfig } from "@medusajs/admin-sdk"
  import { TagSolid } from "@medusajs/icons"
  import { useQuery } from "@tanstack/react-query"
  import { sdk } from "../../lib/sdk"

  const BrandsPage = () => {
    const { data, isLoading } = useQuery({
      queryKey: ["brands"],
      queryFn: () =>
        sdk.client.fetch("/admin/brands", {
          method: "GET",
        }),
    })

    return (
      <div className="flex flex-col gap-4 p-8">
        <h1 className="text-2xl font-semibold">Brands</h1>
        {isLoading && <p>Loading...</p>}
        {data?.brand_products?.map((entry) => (
          <div
            key={entry.brand_id}
            className="bg-white border rounded-lg p-4 shadow-sm flex justify-between"
          >
            <span className="font-medium">{entry.brand?.name}</span>
            <span className="text-gray-500 text-sm">
              {entry.product ? "1 product linked" : "No products linked"}
            </span>
          </div>
        ))}
      </div>
    )
  }

  export const config = defineRouteConfig({
    label: "Brands",
    icon: TagSolid,
  })

  export default BrandsPage