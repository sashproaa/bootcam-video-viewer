import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum();

export const subscriptionMock = {
  id: 1,
  name: lorem.generateWords(2),
  description: lorem.generateParagraphs(1),
  duration: 10,
  price: 100,
};
