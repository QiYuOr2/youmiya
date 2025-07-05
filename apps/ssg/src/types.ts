export interface EventVO {
  /**
   * eg. 2026-02-28 (土)
   */
  date: string
  image: string
  imageAlt: string
  title: string
  eventUrl: string
  place: Place
  time: Time
  actors: Place[]
  participants: number
}

interface Time {
  /**
   * eg. 12:30
   */
  open?: string
  /**
   * eg. 12:30
   */
  start?: string
  /**
   * eg. 12:30
   */
  end?: string
}

interface Place {
  name: string
  url: string
}
