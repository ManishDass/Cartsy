export default function Page({ params }: { params: { categorySlug: string } }) {
    return <div>My Post: {params.categorySlug}</div>
  }