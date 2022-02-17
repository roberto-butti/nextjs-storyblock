import Storyblok, { useStoryblok } from '../../lib/storyblok'
import DynamicComponent from '../../components/DynamicComponent'
import styles from '../../styles/Home.module.css'

function PostPage({ story }) {
    //const enableBridge = true; // load the storyblok bridge everywhere
    //story = useStoryblok(story, enableBridge);

    if (story) {
        return (
            <>
                <h1>Post title: {story.content.title}</h1>
                <p>{story.content.intro}</p>
                <div className={styles.grid}>
                    {story.content.body
                        ? story.content.body.map((blok) => (
                            <DynamicComponent blok={blok} key={blok._uid} />
                        ))
                        : null}
                </div>
            </>
        )
    } else {
        return (<div></div>)
    }
}

export async function getStaticProps({ params }) {

    let preview = process.env.PREVIEW === 'true'
    let slug = params.slug ? params.slug.join("/") : "home";
    let sbParams = {
        version: 'published',
    }

    if (preview) {
        sbParams.version = 'draft'
        sbParams.cv = Date.now()
    }

    let { data } = await Storyblok.get(`cdn/stories/posts/${slug}`, sbParams)

    return {
        props: {
            story: data ? data.story : false,
            preview,
        },
        revalidate: 3600, // revalidate every hour
    }
}
export async function getStaticPaths() {
    let { data } = await Storyblok.get("cdn/links/", {
        starts_with: 'posts'
    });
    let paths = [];
    Object.keys(data.links).forEach((linkKey) => {
        if (data.links[linkKey].is_folder || data.links[linkKey].slug === "home") {
            return;
        }
        const slug = data.links[linkKey].slug;

        let splittedSlug = [slug.split("/")[1]];
        console.log(splittedSlug);
        paths.push({ params: { slug: splittedSlug } });
    });

    return {
        paths: paths,
        fallback: true,
    };
}

export default PostPage