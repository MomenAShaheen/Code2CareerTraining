import { admin_test_user } from "../../users/users.repository";
import { generateCourses } from "../courses.data";
import { courseService } from "../courses.service";
import { authedTestAgent } from "../../../tests/helpers/tests.helper";
import { Course } from "../courses.entity";
import { ResponseBuilder } from "../../../shard/utils/responsebuilder.util";
import { removeFields } from "../../../shard/utils/object.util";
import { object } from "zod";
import { expectWithoutProperties } from "../../../tests/helpers/tests.utils";
import id from "zod/v4/locales/id.js";

const courses: Course[] = generateCourses(1, admin_test_user.id);

describe("course route test", () => {
  let createdCourseId = 0;
  it("test create course route", async () => {
    const response = await authedTestAgent
      .post("/api/v1/course")
      .send(courses[0]);

    const course = removeFields(courses[0]!, [
      "createdAt",
      "updatedAt",
      "id",
      "image",
    ]);

    const responseBuilder = ResponseBuilder.success(
      "Created successfully",
      course,
      200
    );

    expectWithoutProperties(response.body, [
      "createdAt",
      "updatedAt",
      "timestamp",
      "id",
    ]).toEqual(removeFields(responseBuilder, ["timestamp"]));
    createdCourseId = response.body["data"]["id"];
    console.log("created course ID : ", createdCourseId);
  });

  it("test get course route", async () => {
    const course = removeFields(courses[0]!, [
      "createdAt",
      "updatedAt",
      "id",
      "image",
    ]);
    const response = await authedTestAgent.get("/api/v1/course");
    const responseBuilder = ResponseBuilder.success(
      "Courses Information",
      [course],
      200
    );

    expectWithoutProperties(response.body, [
      "createdAt",
      "updatedAt",
      "timestamp",
      "id",
    ]).toEqual(removeFields(responseBuilder, ["timestamp"]));
  });

  it("test get course by ID route", async () => {
    const course = removeFields(courses[0]!, [
      "createdAt",
      "updatedAt",
      "id",
      "image",
    ]);
    const response = await authedTestAgent.get(
      `/api/v1/course/${createdCourseId}`
    );
    const responseBuilder = ResponseBuilder.success(
      "Course Information",
      course,
      200
    );

    expectWithoutProperties(response.body, [
      "createdAt",
      "updatedAt",
      "timestamp",
      "id",
    ]).toEqual(removeFields(responseBuilder, ["timestamp"]));
  });

  it("test update course by ID route", async () => {
    const course = removeFields(courses[0]!, [
      "createdAt",
      "updatedAt",
      "id",
      "image",
    ]);
    course.title = "updated course title";
    const response = await authedTestAgent
      .put(`/api/v1/course/${createdCourseId}`)
      .send(course);
    const responseBuilder = ResponseBuilder.success(
      "Updated successfully",
      course,
      200
    );

    expectWithoutProperties(response.body, [
      "createdAt",
      "updatedAt",
      "timestamp",
      "id",
    ]).toEqual(removeFields(responseBuilder, ["timestamp"]));
  });

  it("test Delete course by ID route", async () => {
    const course = removeFields(courses[0]!, [
      "createdAt",
      "updatedAt",
      "id",
      "image",
    ]);
    const response = await authedTestAgent.delete(
      `/api/v1/course/${createdCourseId}`
    );
    const responseBuilder = ResponseBuilder.success(
      "Deleted Successfully",
      null,
      200
    );

    expectWithoutProperties(response.body, [
      "createdAt",
      "updatedAt",
      "timestamp",
      "id",
    ]).toEqual(removeFields(responseBuilder, ["timestamp"]));
  });
});
