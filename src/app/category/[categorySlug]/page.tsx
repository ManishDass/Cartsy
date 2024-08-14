export default function Page({ params }: { params: { categorySlug: string } }) {
    return <div>Category Slug: {params.categorySlug}</div>
  }