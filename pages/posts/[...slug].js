import { useRouter } from 'next/router'

const PostPage = () => {
    const router = useRouter()
    const slug = router.query.slug || []
    console.log(slug)
    return (
        <>
            <h1>Slug: {slug.join('/')}</h1>
        </>
    )
}

export default PostPage