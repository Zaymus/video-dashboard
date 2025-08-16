import { jest, describe, test, expect, beforeEach } from "@jest/globals";
import { render, act, fireEvent, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

import VideoCard from "../VideoCard/VideoCard.jsx";

const mockVideo = {
  id: '12345',
  title: 'Test Video',
  thumbnails: {
    standard: { url: 'https://cdn.theatlantic.com/media/mt/science/cat_caviar.jpg' },
  },
}

describe('VideoCard Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  test('matches snapshot', () => {
    const { container } = render(<VideoCard id={mockVideo.id} title={mockVideo.title} thumbnails={mockVideo.thumbnails} />);
    expect(container).toMatchSnapshot();
  });

  test('clickHandler works as expected', () => {
    const { container } = render(<VideoCard id={mockVideo.id} title={mockVideo.title} thumbnails={mockVideo.thumbnails} />);
    
    act(() => {
      fireEvent.click(container.querySelector('div'));
    });

    expect(mockNavigate).toHaveBeenCalledWith(`/video/${mockVideo.id}`);
  });

  describe('Thumbnail rendering', () => {
    test('standard', async () => {
      render(<VideoCard id={mockVideo.id} title={mockVideo.title} thumbnails={mockVideo.thumbnails} />);

      await waitFor(() => {
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      var thumbnail = screen.getByAltText('Thumbnail image');
      expect(thumbnail).toBeInTheDocument();
      expect(thumbnail.src).toBe(mockVideo.thumbnails.standard.url);
    });

    test('medium', async () => {
      mockVideo.thumbnails.medium = { url: 'https://img3.stockfresh.com/files/n/nyul/m/16/623420_stock-photo-portrait-of-happy-old-man.jpg' };
      render(<VideoCard id={mockVideo.id} title={mockVideo.title} thumbnails={mockVideo.thumbnails} />);

      await waitFor(() => {
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      var thumbnail = screen.getByAltText('Thumbnail image');
      expect(thumbnail).toBeInTheDocument();
      expect(thumbnail.src).toBe(mockVideo.thumbnails.medium.url);
    });

    test('high', async () => {
      mockVideo.thumbnails.high = { url: 'https://previews.123rf.com/images/bowie15/bowie151208/bowie15120800108/15112437-businessman-running.jpg' };
      render(<VideoCard id={mockVideo.id} title={mockVideo.title} thumbnails={mockVideo.thumbnails} />);

      await waitFor(() => {
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      var thumbnail = screen.getByAltText('Thumbnail image');
      expect(thumbnail).toBeInTheDocument();
      expect(thumbnail.src).toBe(mockVideo.thumbnails.high.url);
    });

    test('maxres', async () => {
      mockVideo.thumbnails.maxres = { url: 'https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/514F/production/_95051802_olddriver.jpg' };
      render(<VideoCard id={mockVideo.id} title={mockVideo.title} thumbnails={mockVideo.thumbnails} />);

      await waitFor(() => {
        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      });

      var thumbnail = screen.getByAltText('Thumbnail image');
      expect(thumbnail).toBeInTheDocument();
      expect(thumbnail.src).toBe(mockVideo.thumbnails.maxres.url);
    });
  });
});