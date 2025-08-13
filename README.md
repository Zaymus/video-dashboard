# React Video Dashboard
This application is an interview prep project that will mimic a video streaming platform using the youtube data API for content and React to create the UI and functionality.

## Minimum Viable Product
This project must contain the following features to be defined as complete:

1. Home Page
    - Displays Trending Videos from the youtube data API
    - Lazy load thumbnails for performance
    - infinite scroll to browse trending videos
2. Video Player Page
    - Custom video player controls:
        - play/pause, volume, mute
        - seek bar
        - captions toggle
        - playback speed change
    Related Videos section (click to load)
3. Search Functionality
    - Debouced search bar (optimizes API calls)
    - search results page with infinite scroll
4. Responsive UI
    - works seamlessly on mobile, tablet, desktop
5. Accessibility
    - Color contrast compliance

### Nice-to-Have Features
1. Light/Dark Mode toggle
2. SSR for SEO & performance

## Architecture Plan
### Framework & Tools
- React
- State management: Redux
- Styling: Styled components + CSS modules
- API Calls: Fetch API or Axios
- Routing: React Router
- Video player: HTML <video> element + custom controls
- Testing: Jest + React Testing Library
 
