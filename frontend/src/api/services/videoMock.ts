import { LoremIpsum } from 'lorem-ipsum';
import { Video } from '../../common/interfaces/VideoInterface';

const lorem = new LoremIpsum();

export function videoMock(): Video {
  return {
    id: Math.random(),
    title: lorem.generateWords(2),
    description: lorem.generateParagraphs(1),
    meta: lorem.generateParagraphs(1),
    genre: lorem.generateWords(),
    actors: lorem.generateSentences(),
    price: Math.floor(Math.random() * 100),
    created_at: Math.floor(Math.random() * 10000000000000),
    duration: Math.floor(Math.random() * 100),
    video_subscription: '',
    image: `https://picsum.photos/200/300?random=${Math.random()}`,
    preview: 'https://ipsm.io/api/video/720p/mp4',
    unlock: Math.random() > 0.7,
  };
}
