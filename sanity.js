import createImageUrlBuilder from '@sanity/image-url';
import { createClient, createCurrentUserHook } from 'next-sanity';

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANIY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: '2021-10-21',
  useCdn: process.env.NODE_ENV === 'production',
}

export const sanityClient = createClient(config)
export const urlFor = (source) => createImageUrlBuilder(config).image(source)
export const useCurrentUser = createCurrentUserHook(config)
