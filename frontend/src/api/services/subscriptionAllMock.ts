import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum();

export const subscriptionAllMock = [
  {
    id: 1,
    name: lorem.generateWords(2),
    description: lorem.generateParagraphs(1),
    duration: 10,
    price: 100,
  },
  {
    id: 2,
    name: lorem.generateWords(2),
    description: lorem.generateParagraphs(1),
    duration: 30,
    price: 200,
  },
  {
    id: 3,
    name: lorem.generateWords(2),
    description: lorem.generateParagraphs(1),
    duration: 180,
    price: 300,
  },
];
