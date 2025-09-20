import { singJWT } from "../../module/auth/utils/jwt.util";
import { admin_test_user } from "../../module/users/users.repository";
import supertest from "supertest";
import { app } from "../../server";

// import type { Config } from "jest";

// export default async (): Promise<Config> => {
//   return {
//     verbose: true,
//   };
// };

const jwtToken = singJWT({
  sub: admin_test_user.id,
  name: admin_test_user.name,
  role: admin_test_user.role,
});
export const unAuthorizedAgent = supertest.agent(app);
export const authedTestAgent = supertest
  .agent(app)
  .set("AUTHORIZATION", `Bearer ${jwtToken}`);
