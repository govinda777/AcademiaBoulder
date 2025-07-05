import { useQuery } from '@tanstack/react-query'
import { client, queries } from '@/lib/sanity'

export function useSiteSettings() {
  return useQuery({
    queryKey: ['sanity', 'siteSettings'],
    queryFn: () => client.fetch(queries.siteSettings),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export function useHeroSection() {
  return useQuery({
    queryKey: ['sanity', 'heroSection'],
    queryFn: () => client.fetch(queries.heroSection),
    staleTime: 1000 * 60 * 5,
  })
}

export function useVirtualTourSection() {
  return useQuery({
    queryKey: ['sanity', 'virtualTourSection'],
    queryFn: () => client.fetch(queries.virtualTourSection),
    staleTime: 1000 * 60 * 5,
  })
}

export function usePrograms() {
  return useQuery({
    queryKey: ['sanity', 'programs'],
    queryFn: () => client.fetch(queries.programs),
    staleTime: 1000 * 60 * 5,
  })
}

export function useEvents() {
  return useQuery({
    queryKey: ['sanity', 'events'],
    queryFn: () => client.fetch(queries.events),
    staleTime: 1000 * 60 * 5,
  })
}

export function useAboutSection() {
  return useQuery({
    queryKey: ['sanity', 'about'],
    queryFn: () => client.fetch(queries.about),
    staleTime: 1000 * 60 * 5,
  })
}

export function useCommunitySection() {
  return useQuery({
    queryKey: ['sanity', 'community'],
    queryFn: () => client.fetch(queries.community),
    staleTime: 1000 * 60 * 5,
  })
}

export function useFaqSection() {
  return useQuery({
    queryKey: ['sanity', 'faq'],
    queryFn: () => client.fetch(queries.faq),
    staleTime: 1000 * 60 * 5,
  })
}

export function useContactSection() {
  return useQuery({
    queryKey: ['sanity', 'contact'],
    queryFn: () => client.fetch(queries.contact),
    staleTime: 1000 * 60 * 5,
  })
}

export function useSchedulingSection() {
  return useQuery({
    queryKey: ['sanity', 'scheduling'],
    queryFn: () => client.fetch(queries.scheduling),
    staleTime: 1000 * 60 * 5,
  })
}