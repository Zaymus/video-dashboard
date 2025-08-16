// Default frozen result for normal tests
export const defaultResult = Object.freeze({
  result: {
    items: [
      { contentDetails: { id: '1' }, snippet: { title: 'Video 1' } },
      { contentDetails: { id: '2' }, snippet: { title: 'Video 2' } },
      { contentDetails: { id: '3' }, snippet: { title: 'Video 3' } }
    ],
    nextPageToken: 'ABC123'
  },
  isLoading: false,
  hasError: null
});

// Helper mocks for different test scenarios
export const loadingMock = Object.freeze({
  result: null,
  isLoading: true,
  hasError: null
});

export const errorMock = Object.freeze({
  result: null,
  isLoading: false,
  hasError: 'API error'
});

export const moreVideosMock = Object.freeze({
  result: {
    items: [
      { contentDetails: { id: '4' }, snippet: { title: 'Video 4' } },
      { contentDetails: { id: '5' }, snippet: { title: 'Video 5' } },
      { contentDetails: { id: '6' }, snippet: { title: 'Video 6' } }
    ],
    nextPageToken: 'DEF456'
  },
  isLoading: false,
  hasError: null
});

// Default export returns a controlled mock (can override in tests)
let currentMock = defaultResult;

export const setUseAPIMock = (mock) => {
  currentMock = mock || defaultResult;
};

export default () => currentMock;