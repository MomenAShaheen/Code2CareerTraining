import { faker } from "@faker-js/faker";
import { Course } from "./courses.entity";
import { create } from "domain";
import { count } from "console";

function createCourseSeed(
  cCreatorID?: string,
  isImage: Boolean = false
): Course {
  const image = isImage ? faker.image.avatar() : undefined;
  const creatorID = cCreatorID ? cCreatorID! : faker.string.uuid();

  return {
    id: faker.string.uuid(),
    title: faker.book.title(),
    description: faker.lorem.paragraph(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    creatorID: creatorID,
    image: image,
  };
}

export const generateCourses = (
  count: number,
  creatorID?: string,
  isImage?: boolean
): Course[] => {
  return Array(count)
    .fill(null)
    .map(() => createCourseSeed(creatorID, isImage));
};
