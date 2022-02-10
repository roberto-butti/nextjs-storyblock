import {useEffect, useState} from 'react'
import StoryblokClient from 'storyblok-js-client'

const Storyblok = new StoryblokClient({
  accessToken: process.env.accessToken,
  cache: {
    clear: 'auto',
    type: 'memory',
  },
})

export function useStoryblok(originalStory, preview) {
  let [story, setStory] = useState(originalStory)

  // adds the events for updating the visual editor
  // see https://www.storyblok.com/docs/guide/essentials/visual-editor#initializing-the-storyblok-js-bridge
  function initEventListeners() {
    const {StoryblokBridge} = window
    if (typeof StoryblokBridge !== 'undefined') {
      // initialize the bridge with your token
      const storyblokInstance = new StoryblokBridge({
        customParent: window.location.origin,
      })

      // reload on Next.js page on save or publish event in the Visual Editor
      storyblokInstance.on(['change', 'published'], () =>
        location.reload(true),
      )

      // live update the story on input events
      storyblokInstance.on('input', event => {
        // check if the ids of the event and the passed story match
        if (story && event.story.content._uid === story.content._uid) {
          // change the story content through the setStory function
          setStory(event.story)
        }
      })

      storyblokInstance.on('enterEditmode', event => {
        // loading the draft version on initial enter of editor
        Storyblok.get(`cdn/stories/${event.storyId}`, {
          version: 'draft',
        })
        .then(({data}) => {
          if (data.story) {
            setStory(data.story)
          }
        })
        .catch(error => {
          console.log(error)
        })
      })
    }
  }

  // appends the bridge script tag to our document
  // see https://www.storyblok.com/docs/guide/essentials/visual-editor#installing-the-storyblok-js-bridge
  function addBridge(callback) {
    // check if the script is already present
    const existingScript = document.getElementById('storyblokBridge')
    if (!existingScript) {
      const script = document.createElement('script')
      script.src = '//app.storyblok.com/f/storyblok-v2-latest.js'
      script.id = 'storyblokBridge'
      document.body.appendChild(script)
      script.addEventListener('load', () => {
        // once the script is loaded, init the event listeners
        callback()
      })
    } else if (existingScript) {
      callback()
    }
  }

  useEffect(() => {
    // only load inside preview mode
    if (preview) {
      // first load the bridge, then initialize the event listeners
      addBridge(initEventListeners)
    }
  }, [originalStory, preview, setStory]) // runs the effect only once & defines effect dependencies

  return story
}

/**
 * See: https://www.storyblok.com/faq/link-object-history
 * @param {*} url 
 * @returns 
 */
export function url(url) {
/*
url: {
    id: '',
    url: 'https://storyblok.com',
    linktype: 'url',
    cached_url: 'https://storyblok.com'
}
OR
url: {
  id: '054c0749-2aad-4781-8100-3febedd93181',
  url: '',
  linktype: 'story',
  fieldtype: 'multilink',
  cached_url: 'new-page'
}
 */
    if (url.linktype === 'story') {
        return '/' + url.cached_url
    }
    return url.url
}

export default Storyblok
