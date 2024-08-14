export default function Page({ params }: { params: { productId: string } }) {
    return <div>Product ID: {params.productId}</div>
  }