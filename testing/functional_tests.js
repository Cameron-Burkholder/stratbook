/* testing/functional_tests.js */

const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const assert = chai.assert;

const { issueJWT } = require("../config/utilities.js");
const mongoose = require("mongoose");

const server = require("../server.js");

suite("FUNCTIONAL TESTS", function() {


  /*
  suite("Email", function() {
    const email = require("../config/email.js");
    test("# Email sends succesfully", function() {
      assert.equal(email("cburkholder19@gmail.com", "TESTING", "This is a test email to ensure that emails send succesfully."), null, "Email should return null when an email sends successfully.");
    })
  });
  */

  suite("TEAM MODEL", function() {
    let dev_team_code;
    suite("Create a Team", function() {
      const test_user = {
        username: "TESTING USER",
        email: "testing@domain.com",
        password: process.env.TESTING_PASSWORD,
        platform: "PC",
        verified: true,
        _id: mongoose.Types.ObjectId("5f4c0e963e89966b9ce6e170")
      };
      const unverified_user = {
        user: "UNVERIFIED USER",
        email: "unverified_user@domain.com",
        password: process.env.TESTING_PASSWORD,
        platform: "PC",
        verified: false,
        _id: mongoose.Types.ObjectId("5f4c194be2fea45de4399e11")
      }
      const duplicate_team_user = {
        user: "DUPLICATE_TEAM USER_HAS_TEAM",
        email: "duplicate_team_user@domain.com",
        password: process.env.TESTING_PASSWORD,
        platform: "PC",
        verified: true,
        _id: mongoose.Types.ObjectId("5f4c1d0729b1b54e547a2990")
      }

      const invalidJWT = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTg4MTkxMTk3NDQsImV4cCI6MTU5ODgxOTExOTc0NH0.qkun-NSiUKZ-lC0tW6g0eu8VWqUSAxzQZbG4alpfXeSbL3_SPlfS87FHgRMaJeYkNb2qwqq8blq3JjvK5jYYxRhwfecOFvBsCnjzVrr-q4WRUm_PvJMdYW1TDK6iQwmuv8n2PP9vyz558ne9m065Ufqf1fn_3NIdSHNzsGkWf_tJYKX9d8ChxMn2L6pVtnetolD9KHgajJzpS9llbO7VUOSsnbuv8eMxo3N3Jlgw1NViarxYfctNhj7mL_PynlTqxSeRxpXR5vGqbCU7XP7y34gqrj9p7wsNklwsYaqGqr9oVbo0Ai5rtNRukykQ5MDB6rH15WQpcPH1JBi03bZMA407IgHsJXUo0p9Nv9pFDqLqfIuB-LQcA8ALjViPQ9L_v_g2PxU-47DEALtRldTobu4tKTQ8yAOc0mw6Da8SgpML8sysBmC6uCzFlkcw9u9LNrLVmkmcUYSrtJwtJeXOGeUhICumhHl-NsYmguJht4tTa56SRUfkcZZL7i4uxnS36pF66A_V0NU1jqeKWFaWzBhLPLEy7HAuWuSyLOrS5haS40S70Pz6s_Bf6ED1R0lPd6tjtIVIlAJ3JLkGouzR2s1sETySmQlKDSi7fQ9e0Bvfrow10QhcExG7bdkxQ58xDhXh8KnY4jLH1vqhA6TSX7TFOJtgOtxSA2NvDym7uRo";
      const validJWT = issueJWT(test_user).token;
      const unverifiedJWT = issueJWT(unverified_user).token;
      const duplicateTeamJWT = issueJWT(duplicate_team_user).token;

      test("# Valid team creation", function(done) {
        chai.request(server)
          .post("/api/teams/create-team")
          .send({ name: "Valid Team" })
          .set({ Authorization: validJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if JWT is valid.");
            assert.equal(response.body.status, "TEAM_CREATED", "Response object should be TEAM_CREATED when input is valid.");
            dev_team_code = response.body.team_code;
            done();
          });
      });
      test("# JWT not provided", function(done) {
        chai.request(server)
          .post("/api/teams/create-team")
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 401, "Response should be 401 Unauthorized if JWT not provided.");
            assert.equal(response.text, "Unauthorized", "Response should return unauthorized if JWT not provided.");
            done();
          });
      });
      test("# JWT is invalid", function(done) {
        chai.request(server)
          .post("/api/teams/create-team")
          .send({ name: "TESTING_TEAM" })
          .set({ Authorization: invalidJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 401, "Response should be 401 Unauthorized if JWT is invalid.");
            assert.equal(response.text, "Unauthorized", "Response should return unauthorized if JWT is invalid.");
            done();
          });
      });
      test("# Name field not provided", function(done) {
        chai.request(server)
          .post("/api/teams/create-team")
          .send({})
          .set({ Authorization: validJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if JWT is valid but name field is not provided.");
            assert.equal(response.body.status, "INVALID_TEAM_INPUT", "Response object should be INVALID_TEAM_INPUT if name field is not provided.");
            assert.isOk(response.body.errors, "Response object should have an errors object if name field is not provided.");
            done();
          });
      });
      test("# Name field is empty", function(done) {
        chai.request(server)
          .post("/api/teams/create-team")
          .send({ name: "" })
          .set({ Authorization: validJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if JWT is valid but name field is empty.");
            assert.equal(response.body.status, "INVALID_TEAM_INPUT", "Response object should be INVALID_TEAM_INPUT if name field is empty.");
            assert.isOk(response.body.errors, "Response object should have an errors object if name field is empty.");
            done();
          });
      });
      test("# Name field is inappropriate", function(done) {
        chai.request(server)
          .post("/api/teams/create-team")
          .send({ name: "FuckBoys" })
          .set({ Authorization: validJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if JWT is valid but name is inappropriate.");
            assert.equal(response.body.status, "PROFANE_TEAM_INPUT", "Response object should be PROFANE_TEAM_INPUT if name is profane.");
            assert.isOk(response.body.errors, "Response object should have an errors object if name field is profrane.");
            done();
          });
      });
      test("# User is not verified", function(done) {
        chai.request(server)
          .post("/api/teams/create-team")
          .send({ name: "Team Unverified" })
          .set({ Authorization: unverifiedJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if JWT is valid but user is not verified.");
            assert.equal(response.body.status, "USER_NOT_VERIFIED", "Response object should be USER_NOT_VERIFIED if user is not verified.");
            done();
          })
      });
      test("# User already has team", function(done) {
        chai.request(server)
          .post("/api/teams/create-team")
          .send({ name: "Duplicate Team" })
          .set({ Authorization: validJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if JWT is valid but user has a team already.");
            assert.equal(response.body.status, "USER_HAS_TEAM", "Response object should be USER_HAS_TEAM if user has a team.");
            done();
          });
      });
      test("# Team with that name exists", function(done) {
        chai.request(server)
          .post("/api/teams/create-team")
          .send({ name: "Valid Team" })
          .set({ Authorization: duplicateTeamJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if JWT is valid.");
            assert.equal(response.body.status, "TEAM_ALREADY_EXISTS", "Response object should be TEAM_ALREADY_EXISTS if team already exists.");
            done();
          });
      });
    });

    suite("View Team Join Code", function() {
      const test_user = {
        username: "TESTING USER",
        email: "testing@domain.com",
        password: process.env.TESTING_PASSWORD,
        platform: "PC",
        verified: true,
        _id: mongoose.Types.ObjectId("5f4c0e963e89966b9ce6e170")
      };
      const validJWT = issueJWT(test_user).token;

      const unverified_user = {
        user: "UNVERIFIED USER",
        email: "unverified_user@domain.com",
        password: process.env.TESTING_PASSWORD,
        platform: "PC",
        verified: false,
        _id: mongoose.Types.ObjectId("5f4c194be2fea45de4399e11")
      }
      const unverifiedJWT = issueJWT(unverified_user).token;

      const not_admin_user = {
        username: "NOT ADMIN",
        email: "not_admin_user@domain.com",
        password: process.env.TESTING_PASSWORD,
        platform: "PC",
        verified: true,
        _id: mongoose.Types.ObjectId("5f4c3bd592e824573ce5be7e")
      }
      const notAdminJWT = issueJWT(not_admin_user).token;

      const not_on_team_user = {
        username: "NOT ON TEAM",
        email: "not_on_team_user",
        password: process.env.TESTING_PASSWORD,
        platform: "PC",
        verified: true,
        _id: mongoose.Types.ObjectId("5f4c3ea6a790f9581cbda208")
      };
      const notOnTeamJWT = issueJWT(not_on_team_user).token;

      const no_team_user = {
        username: "HAS NO TEAM",
        email: "no_team@domain.com",
        password: process.env.TESTING_PASSWORD,
        platform: "PC",
        verified: true,
        _id: mongoose.Types.ObjectId("5f4c40a31e8c2816948e5549")
      }
      const noTeamJWT = issueJWT(no_team_user).token;

      const team_not_found_user = {
        username: "TEAM DOES NOT EXIST",
        email: "team_not_found@domain.com",
        password: process.env.TESTING_PASSWORD,
        platform: "PC",
        verified: true,
        _id: mongoose.Types.ObjectId("5f4c428646ffca6e54af04b6")
      };
      const teamNotFoundJWT = issueJWT(team_not_found_user).token;

      const invalidJWT = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTg4MTkxMTk3NDQsImV4cCI6MTU5ODgxOTExOTc0NH0.qkun-NSiUKZ-lC0tW6g0eu8VWqUSAxzQZbG4alpfXeSbL3_SPlfS87FHgRMaJeYkNb2qwqq8blq3JjvK5jYYxRhwfecOFvBsCnjzVrr-q4WRUm_PvJMdYW1TDK6iQwmuv8n2PP9vyz558ne9m065Ufqf1fn_3NIdSHNzsGkWf_tJYKX9d8ChxMn2L6pVtnetolD9KHgajJzpS9llbO7VUOSsnbuv8eMxo3N3Jlgw1NViarxYfctNhj7mL_PynlTqxSeRxpXR5vGqbCU7XP7y34gqrj9p7wsNklwsYaqGqr9oVbo0Ai5rtNRukykQ5MDB6rH15WQpcPH1JBi03bZMA407IgHsJXUo0p9Nv9pFDqLqfIuB-LQcA8ALjViPQ9L_v_g2PxU-47DEALtRldTobu4tKTQ8yAOc0mw6Da8SgpML8sysBmC6uCzFlkcw9u9LNrLVmkmcUYSrtJwtJeXOGeUhICumhHl-NsYmguJht4tTa56SRUfkcZZL7i4uxnS36pF66A_V0NU1jqeKWFaWzBhLPLEy7HAuWuSyLOrS5haS40S70Pz6s_Bf6ED1R0lPd6tjtIVIlAJ3JLkGouzR2s1sETySmQlKDSi7fQ9e0Bvfrow10QhcExG7bdkxQ58xDhXh8KnY4jLH1vqhA6TSX7TFOJtgOtxSA2NvDym7uRo";

      test("# Valid team code viewing", function(done) {
        chai.request(server)
          .get("/api/teams/view-join-code")
          .set({ Authorization: validJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if the JWT is valid and the input is valid.");
            assert.equal(response.body.status, "TEAM_CODE_FOUND", "Response should indicate team code has been sent if inputs are valid.");
            done();
          });
      });
      test("# JWT not provided", function(done) {
        chai.request(server)
          .get("/api/teams/view-join-code")
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 401, "Response should be 401 Unauthorized if JWT not provided.");
            assert.equal(response.text, "Unauthorized", "Response should return unauthorized if JWT not provided.");
            done();
          });
      });
      test("# JWT is invalid", function(done) {
        chai.request(server)
          .get("/api/teams/view-join-code")
          .set({ Authorization: invalidJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 401, "Response should be 401 Unauthorized if JWT is invalid.");
            assert.equal(response.text, "Unauthorized", "Response should return unauthorized if JWT is invalid.");
          });
          done();
      });
      test("# User not verified", function(done) {
        chai.request(server)
          .get("/api/teams/view-join-code")
          .set({ Authorization: unverifiedJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if JWT is valid but user is unverified.");
            assert.equal(response.body.status, "USER_NOT_VERIFIED", "Response should indicate user is not verified if user is not verified.");
            done();
          });
      });
      test("# User not qualified (not on team)", function(done) {
        chai.request(server)
          .get("/api/teams/view-join-code")
          .set({ Authorization: notOnTeamJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if JWT is valid but user is not on team.");
            assert.equal(response.body.status, "USER_NOT_QUALIFIED", "Response should indicate user is not qualified if they are not on team.");
            done();
          });
      });
      test("# User has no team", function(done) {
        chai.request(server)
          .get("/api/teams/view-join-code")
          .set({ Authorization: noTeamJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if JWT is valid but user has no team.");
            assert.equal(response.body.status, "USER_HAS_NO_TEAM", "Response should indicate user has no team if they have no team.");
            done();
          });
      })
      test("# Team does not exist", function(done) {
        chai.request(server)
          .get("/api/teams/view-join-code")
          .set({ Authorization: teamNotFoundJWT })
          .end((error, response) => {
            if (error) return done(error);
              assert.equal(response.status, 200, "Response should be 200 if JWT is valid but team does not exist.");
              assert.equal(response.body.status, "TEAM_DOES_NOT_EXIST", "Response should indicate team does not exist if it does not.");
            done();
          });
      });
    });

    suite("View Team", function() {
      const test_user = {
        username: "TESTING USER",
        email: "testing@domain.com",
        password: process.env.TESTING_PASSWORD,
        platform: "PC",
        verified: true,
        _id: mongoose.Types.ObjectId("5f4c0e963e89966b9ce6e170")
      };
      const validJWT = issueJWT(test_user).token;

      const unverified_user = {
        user: "UNVERIFIED USER",
        email: "unverified_user@domain.com",
        password: process.env.TESTING_PASSWORD,
        platform: "PC",
        verified: false,
        _id: mongoose.Types.ObjectId("5f4c194be2fea45de4399e11")
      }
      const unverifiedJWT = issueJWT(unverified_user).token;

      const not_admin_user = {
        username: "NOT ADMIN",
        email: "not_admin_user@domain.com",
        password: process.env.TESTING_PASSWORD,
        platform: "PC",
        verified: true,
        _id: mongoose.Types.ObjectId("5f4c3bd592e824573ce5be7e")
      }
      const notAdminJWT = issueJWT(not_admin_user).token;

      const not_on_team_user = {
        username: "NOT ON TEAM",
        email: "not_on_team_user",
        password: process.env.TESTING_PASSWORD,
        platform: "PC",
        verified: true,
        _id: mongoose.Types.ObjectId("5f4c3ea6a790f9581cbda208")
      };
      const notOnTeamJWT = issueJWT(not_on_team_user).token;

      const no_team_user = {
        username: "HAS NO TEAM",
        email: "no_team@domain.com",
        password: process.env.TESTING_PASSWORD,
        platform: "PC",
        verified: true,
        _id: mongoose.Types.ObjectId("5f4c40a31e8c2816948e5549")
      }
      const noTeamJWT = issueJWT(no_team_user).token;

      const team_not_found_user = {
        username: "TEAM DOES NOT EXIST",
        email: "team_not_found@domain.com",
        password: process.env.TESTING_PASSWORD,
        platform: "PC",
        verified: true,
        _id: mongoose.Types.ObjectId("5f4c428646ffca6e54af04b6")
      };
      const teamNotFoundJWT = issueJWT(team_not_found_user).token;

      const invalidJWT = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTg4MTkxMTk3NDQsImV4cCI6MTU5ODgxOTExOTc0NH0.qkun-NSiUKZ-lC0tW6g0eu8VWqUSAxzQZbG4alpfXeSbL3_SPlfS87FHgRMaJeYkNb2qwqq8blq3JjvK5jYYxRhwfecOFvBsCnjzVrr-q4WRUm_PvJMdYW1TDK6iQwmuv8n2PP9vyz558ne9m065Ufqf1fn_3NIdSHNzsGkWf_tJYKX9d8ChxMn2L6pVtnetolD9KHgajJzpS9llbO7VUOSsnbuv8eMxo3N3Jlgw1NViarxYfctNhj7mL_PynlTqxSeRxpXR5vGqbCU7XP7y34gqrj9p7wsNklwsYaqGqr9oVbo0Ai5rtNRukykQ5MDB6rH15WQpcPH1JBi03bZMA407IgHsJXUo0p9Nv9pFDqLqfIuB-LQcA8ALjViPQ9L_v_g2PxU-47DEALtRldTobu4tKTQ8yAOc0mw6Da8SgpML8sysBmC6uCzFlkcw9u9LNrLVmkmcUYSrtJwtJeXOGeUhICumhHl-NsYmguJht4tTa56SRUfkcZZL7i4uxnS36pF66A_V0NU1jqeKWFaWzBhLPLEy7HAuWuSyLOrS5haS40S70Pz6s_Bf6ED1R0lPd6tjtIVIlAJ3JLkGouzR2s1sETySmQlKDSi7fQ9e0Bvfrow10QhcExG7bdkxQ58xDhXh8KnY4jLH1vqhA6TSX7TFOJtgOtxSA2NvDym7uRo";

      test("# Valid team viewing", function(done) {
        chai.request(server)
          .get("/api/teams/view-team")
          .set({ Authorization: validJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if the JWT is valid and the input is valid.");
            assert.equal(response.body.status, "TEAM_FOUND", "Response should indicate team has been sent if inputs are valid.");
            done();
          });
      });
      test("# JWT not provided", function(done) {
        chai.request(server)
          .get("/api/teams/view-team")
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 401, "Response should be 401 Unauthorized if JWT not provided.");
            assert.equal(response.text, "Unauthorized", "Response should return unauthorized if JWT not provided.");
            done();
          });
      });
      test("# JWT is invalid", function(done) {
        chai.request(server)
          .get("/api/teams/view-team")
          .set({ Authorization: invalidJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 401, "Response should be 401 Unauthorized if JWT is invalid.");
            assert.equal(response.text, "Unauthorized", "Response should return unauthorized if JWT is invalid.");
          });
          done();
      });
      test("# User not verified", function(done) {
        chai.request(server)
          .get("/api/teams/view-team")
          .set({ Authorization: unverifiedJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if JWT is valid but user is unverified.");
            assert.equal(response.body.status, "USER_NOT_VERIFIED", "Response should indicate user is not verified if user is not verified.");
            done();
          });
      });
      test("# User not qualified (not on team)", function(done) {
        chai.request(server)
          .get("/api/teams/view-team")
          .set({ Authorization: notOnTeamJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if JWT is valid but user is not on team.");
            assert.equal(response.body.status, "USER_NOT_QUALIFIED", "Response should indicate user is not qualified if they are not on team.");
            done();
          });
      });
      test("# User has no team", function(done) {
        chai.request(server)
          .get("/api/teams/view-team")
          .set({ Authorization: noTeamJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if JWT is valid but user has no team.");
            assert.equal(response.body.status, "USER_HAS_NO_TEAM", "Response should indicate user has no team if they have no team.");
            done();
          });
      })
      test("# Team does not exist", function(done) {
        chai.request(server)
          .get("/api/teams/view-team")
          .set({ Authorization: teamNotFoundJWT })
          .end((error, response) => {
            if (error) return done(error);
              assert.equal(response.status, 200, "Response should be 200 if JWT is valid but team does not exist.");
              assert.equal(response.body.status, "TEAM_DOES_NOT_EXIST", "Response should indicate team does not exist if it does not.");
            done();
          });
      });
    });

    suite("Update Team Name", function() {
      const test_user = {
        username: "TESTING USER",
        email: "testing@domain.com",
        password: process.env.TESTING_PASSWORD,
        platform: "PC",
        verified: true,
        _id: mongoose.Types.ObjectId("5f4c0e963e89966b9ce6e170")
      };
      const unverified_user = {
        user: "UNVERIFIED USER",
        email: "unverified_user@domain.com",
        password: process.env.TESTING_PASSWORD,
        platform: "PC",
        verified: false,
        _id: mongoose.Types.ObjectId("5f4c194be2fea45de4399e11")
      }
      const duplicate_team_user = {
        user: "DUPLICATE_TEAM USER_HAS_TEAM",
        email: "duplicate_team_user@domain.com",
        password: process.env.TESTING_PASSWORD,
        platform: "PC",
        verified: true,
        _id: mongoose.Types.ObjectId("5f4c1d0729b1b54e547a2990")
      }

      const invalidJWT = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTg4MTkxMTk3NDQsImV4cCI6MTU5ODgxOTExOTc0NH0.qkun-NSiUKZ-lC0tW6g0eu8VWqUSAxzQZbG4alpfXeSbL3_SPlfS87FHgRMaJeYkNb2qwqq8blq3JjvK5jYYxRhwfecOFvBsCnjzVrr-q4WRUm_PvJMdYW1TDK6iQwmuv8n2PP9vyz558ne9m065Ufqf1fn_3NIdSHNzsGkWf_tJYKX9d8ChxMn2L6pVtnetolD9KHgajJzpS9llbO7VUOSsnbuv8eMxo3N3Jlgw1NViarxYfctNhj7mL_PynlTqxSeRxpXR5vGqbCU7XP7y34gqrj9p7wsNklwsYaqGqr9oVbo0Ai5rtNRukykQ5MDB6rH15WQpcPH1JBi03bZMA407IgHsJXUo0p9Nv9pFDqLqfIuB-LQcA8ALjViPQ9L_v_g2PxU-47DEALtRldTobu4tKTQ8yAOc0mw6Da8SgpML8sysBmC6uCzFlkcw9u9LNrLVmkmcUYSrtJwtJeXOGeUhICumhHl-NsYmguJht4tTa56SRUfkcZZL7i4uxnS36pF66A_V0NU1jqeKWFaWzBhLPLEy7HAuWuSyLOrS5haS40S70Pz6s_Bf6ED1R0lPd6tjtIVIlAJ3JLkGouzR2s1sETySmQlKDSi7fQ9e0Bvfrow10QhcExG7bdkxQ58xDhXh8KnY4jLH1vqhA6TSX7TFOJtgOtxSA2NvDym7uRo";
      const validJWT = issueJWT(test_user).token;
      const unverifiedJWT = issueJWT(unverified_user).token;
      const duplicateTeamJWT = issueJWT(duplicate_team_user).token;

      const not_admin_user = {
        username: "NOT ADMIN",
        email: "not_admin_user@domain.com",
        password: process.env.TESTING_PASSWORD,
        platform: "PC",
        verified: true,
        _id: mongoose.Types.ObjectId("5f4c3bd592e824573ce5be7e")
      }
      const notAdminJWT = issueJWT(not_admin_user).token;

      const not_on_team_user = {
        username: "NOT ON TEAM",
        email: "not_on_team_user",
        password: process.env.TESTING_PASSWORD,
        platform: "PC",
        verified: true,
        _id: mongoose.Types.ObjectId("5f4c3ea6a790f9581cbda208")
      };
      const notOnTeamJWT = issueJWT(not_on_team_user).token;

      const no_team_user = {
        username: "HAS NO TEAM",
        email: "no_team@domain.com",
        password: process.env.TESTING_PASSWORD,
        platform: "PC",
        verified: true,
        _id: mongoose.Types.ObjectId("5f4c40a31e8c2816948e5549")
      }
      const noTeamJWT = issueJWT(no_team_user).token;

      const team_not_found_user = {
        username: "TEAM DOES NOT EXIST",
        email: "team_not_found@domain.com",
        password: process.env.TESTING_PASSWORD,
        platform: "PC",
        verified: true,
        _id: mongoose.Types.ObjectId("5f4c428646ffca6e54af04b6")
      };
      const teamNotFoundJWT = issueJWT(team_not_found_user).token;

      test("# Valid team name updating", function(done) {
        chai.request(server)
          .patch("/api/teams/update-name")
          .send({ name: "New Valid Team" })
          .set({ Authorization: validJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if JWT is valid.");
            assert.equal(response.body.status, "TEAM_NAME_UPDATED", "Response object should be TEAM_NAME_UPDATED when input is valid.");
            done();
          });
      });
      test("# Valid team name reversion", function(done) {
        chai.request(server)
          .patch("/api/teams/update-name")
          .send({ name: "Valid Team" })
          .set({ Authorization: validJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if JWT is valid.");
            assert.equal(response.body.status, "TEAM_NAME_UPDATED", "Response object should be TEAM_NAME_UPDATED when input is valid.");
            done();
          })
      });
      test("# Team with new name already exists", function(done) {
        chai.request(server)
          .patch("/api/teams/update-name")
          .send({ name: "Valid Team" })
          .set({ Authorization: validJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if JWT is valid but name already exists.");
            assert.equal(response.body.status, "TEAM_ALREADY_EXISTS", "Response should indicate team with new name already exists.");
            done();
          });
      });
      test("# JWT not provided", function(done) {
        chai.request(server)
          .patch("/api/teams/update-name")
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 401, "Response should be 401 Unauthorized if JWT not provided.");
            assert.equal(response.text, "Unauthorized", "Response should return unauthorized if JWT not provided.");
            done();
          });
      });
      test("# JWT is invalid", function(done) {
        chai.request(server)
          .patch("/api/teams/update-name")
          .send({ name: "TESTING_TEAM" })
          .set({ Authorization: invalidJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 401, "Response should be 401 Unauthorized if JWT is invalid.");
            assert.equal(response.text, "Unauthorized", "Response should return unauthorized if JWT is invalid.");
          });
          done();
      });
      test("# Name field not provided", function(done) {
        chai.request(server)
          .patch("/api/teams/update-name")
          .send({})
          .set({ Authorization: validJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if JWT is valid but name field is not provided.");
            assert.equal(response.body.status, "INVALID_TEAM_INPUT", "Response object should be INVALID_TEAM_INPUT if name field is not provided.");
            assert.isOk(response.body.errors, "Response object should have an errors object if name field is not provided.");
            done();
          });
      });
      test("# Name field is empty", function(done) {
        chai.request(server)
          .patch("/api/teams/update-name")
          .send({ name: "" })
          .set({ Authorization: validJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if JWT is valid but name field is empty.");
            assert.equal(response.body.status, "INVALID_TEAM_INPUT", "Response object should be INVALID_TEAM_INPUT if name field is empty.");
            assert.isOk(response.body.errors, "Response object should have an errors object if name field is empty.");
            done();
          });
      });
      test("# Name field is inappropriate", function(done) {
        chai.request(server)
          .patch("/api/teams/update-name")
          .send({ name: "FuckBoys" })
          .set({ Authorization: validJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if JWT is valid but name is inappropriate.");
            assert.equal(response.body.status, "PROFANE_TEAM_INPUT", "Response object should be PROFANE_TEAM_INPUT if name is profane.");
            assert.isOk(response.body.errors, "Response object should have an errors object if name field is profrane.");
            done();
          });
      });
      test("# User is not verified", function(done) {
        chai.request(server)
          .patch("/api/teams/update-name")
          .send({ name: "Team Unverified" })
          .set({ Authorization: unverifiedJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if JWT is valid but user is not verified.");
            assert.equal(response.body.status, "USER_NOT_VERIFIED", "Response object should be USER_NOT_VERIFIED if user is not verified.");
            done();
          })
      });
      test("# User not qualified (not on team)", function(done) {
        chai.request(server)
          .patch("/api/teams/update-name")
          .send({ name: "NEW_TESTING_TEAM" })
          .set({ Authorization: notOnTeamJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if JWT is valid but user is not on team.");
            assert.equal(response.body.status, "USER_NOT_QUALIFIED", "Response should indicate user is not qualified if they are not on team.");
            done();
          });
      });
      test("# User has no team", function(done) {
        chai.request(server)
          .patch("/api/teams/update-name")
          .send({ name: "TESTING_TEAM" })
          .set({ Authorization: noTeamJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if JWT is valid but user has no team.");
            assert.equal(response.body.status, "USER_HAS_NO_TEAM", "Response should indicate user has no team if they have no team.");
            done();
          });
      })
      test("# Team does not exist", function(done) {
        chai.request(server)
          .patch("/api/teams/update-name")
          .send({ name: "NONEXISTENT_TEAM" })
          .set({ Authorization: teamNotFoundJWT })
          .end((error, response) => {
            if (error) return done(error);
              assert.equal(response.status, 200, "Response should be 200 if JWT is valid but team does not exist.");
              assert.equal(response.body.status, "TEAM_DOES_NOT_EXIST", "Response should indicate team does not exist if it does not.");
            done();
          });
      });
      test("# User not qualified (not admin)", function(done) {
        chai.request(server)
          .patch("/api/teams/update-name")
          .send({ name: "TESTING_TEAM" })
          .set({ Authorization: notAdminJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if JWT is valid but user is not admin.");
            assert.equal(response.body.status, "USER_NOT_QUALIFIED", "Response should indicate that user is not qualified if they are not.");
            done();
          });
      });
    });

    suite("Block a User", function() {
      const invalidJWT = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTg4MTkxMTk3NDQsImV4cCI6MTU5ODgxOTExOTc0NH0.qkun-NSiUKZ-lC0tW6g0eu8VWqUSAxzQZbG4alpfXeSbL3_SPlfS87FHgRMaJeYkNb2qwqq8blq3JjvK5jYYxRhwfecOFvBsCnjzVrr-q4WRUm_PvJMdYW1TDK6iQwmuv8n2PP9vyz558ne9m065Ufqf1fn_3NIdSHNzsGkWf_tJYKX9d8ChxMn2L6pVtnetolD9KHgajJzpS9llbO7VUOSsnbuv8eMxo3N3Jlgw1NViarxYfctNhj7mL_PynlTqxSeRxpXR5vGqbCU7XP7y34gqrj9p7wsNklwsYaqGqr9oVbo0Ai5rtNRukykQ5MDB6rH15WQpcPH1JBi03bZMA407IgHsJXUo0p9Nv9pFDqLqfIuB-LQcA8ALjViPQ9L_v_g2PxU-47DEALtRldTobu4tKTQ8yAOc0mw6Da8SgpML8sysBmC6uCzFlkcw9u9LNrLVmkmcUYSrtJwtJeXOGeUhICumhHl-NsYmguJht4tTa56SRUfkcZZL7i4uxnS36pF66A_V0NU1jqeKWFaWzBhLPLEy7HAuWuSyLOrS5haS40S70Pz6s_Bf6ED1R0lPd6tjtIVIlAJ3JLkGouzR2s1sETySmQlKDSi7fQ9e0Bvfrow10QhcExG7bdkxQ58xDhXh8KnY4jLH1vqhA6TSX7TFOJtgOtxSA2NvDym7uRo";

      const test_user = {
        username: "TESTING USER",
        email: "testing@domain.com",
        password: process.env.TESTING_PASSWORD,
        platform: "PC",
        verified: true,
        _id: mongoose.Types.ObjectId("5f4c0e963e89966b9ce6e170")
      };
      const validJWT = issueJWT(test_user).token;

      test("# JWT is not provided", function(done) {
        chai.request(server)
          .patch("/api/teams/block-user")
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 401, "Response should be 401 Unauthorized if JWT is not provided.");
            assert.equal(response.text, "Unauthorized", "Response should return unauthorized if JWT is not provided.");
            done();
          });
      });
      test("# JWT is invalid", function(done) {
        chai.request(server)
          .patch("/api/teams/block-user")
          .set({ Authorization: invalidJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 401, "Response should be 401 Unauthorized if JWT is invalid.");
            assert.equal(response.text, "Unauthorized", "Response should return unauthorized if JWT is invalid.");
            done();
          });
      });
      test("# Valid Block a User", function(done) {
        chai.request(server)
          .patch("/api/teams/block-user")
          .send({ username: "BLOCKED USER" })
          .set({ Authorization: validJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if input is valid.");
            assert.equal(response.body.status, "USER_BLOCKED", "Response should return valid blocking when input data is valid.");
            done();
          });
      });

    });

    suite("Join a Team", function() {
      const test_user = {
        username: "TESTING USER",
        email: "testing@domain.com",
        password: process.env.TESTING_PASSWORD,
        platform: "PC",
        verified: true,
        _id: mongoose.Types.ObjectId("5f4c0e963e89966b9ce6e170")
      };
      const validJWT = issueJWT(test_user).token;
      const invalidJWT = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTg4MTkxMTk3NDQsImV4cCI6MTU5ODgxOTExOTc0NH0.qkun-NSiUKZ-lC0tW6g0eu8VWqUSAxzQZbG4alpfXeSbL3_SPlfS87FHgRMaJeYkNb2qwqq8blq3JjvK5jYYxRhwfecOFvBsCnjzVrr-q4WRUm_PvJMdYW1TDK6iQwmuv8n2PP9vyz558ne9m065Ufqf1fn_3NIdSHNzsGkWf_tJYKX9d8ChxMn2L6pVtnetolD9KHgajJzpS9llbO7VUOSsnbuv8eMxo3N3Jlgw1NViarxYfctNhj7mL_PynlTqxSeRxpXR5vGqbCU7XP7y34gqrj9p7wsNklwsYaqGqr9oVbo0Ai5rtNRukykQ5MDB6rH15WQpcPH1JBi03bZMA407IgHsJXUo0p9Nv9pFDqLqfIuB-LQcA8ALjViPQ9L_v_g2PxU-47DEALtRldTobu4tKTQ8yAOc0mw6Da8SgpML8sysBmC6uCzFlkcw9u9LNrLVmkmcUYSrtJwtJeXOGeUhICumhHl-NsYmguJht4tTa56SRUfkcZZL7i4uxnS36pF66A_V0NU1jqeKWFaWzBhLPLEy7HAuWuSyLOrS5haS40S70Pz6s_Bf6ED1R0lPd6tjtIVIlAJ3JLkGouzR2s1sETySmQlKDSi7fQ9e0Bvfrow10QhcExG7bdkxQ58xDhXh8KnY4jLH1vqhA6TSX7TFOJtgOtxSA2NvDym7uRo";

      const unverified_user = {
        user: "UNVERIFIED USER",
        email: "unverified_user@domain.com",
        password: process.env.TESTING_PASSWORD,
        platform: "PC",
        verified: false,
        _id: mongoose.Types.ObjectId("5f4c194be2fea45de4399e11")
      }
      const unverifiedJWT = issueJWT(unverified_user).token;

      const blocked_user = {
        user: "BLOCKED USER",
        email: "blocked_user@domain.com",
        password: process.env.TESTING_PASSWORD,
        platform: "PC",
        verified: true,
        _id: mongoose.Types.ObjectId("5f4d52551936573004857312")
      };
      const blockedJWT = issueJWT(blocked_user).token;

      test("# JWT is not provided", function(done) {
        chai.request(server)
          .patch("/api/teams/join-team")
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 401, "Response should be 401 Unauthorized if JWT is not provided.");
            assert.equal(response.text, "Unauthorized", "Response should return unauthorized if JWT is not provided.");
            done();
          });
      });
      test("# JWT is invalid", function(done) {
        chai.request(server)
          .patch("/api/teams/join-team")
          .set({ Authorization: invalidJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 401, "Response should be 401 Unauthorized if JWT is invalid.");
            assert.equal(response.text, "Unauthorized", "Response should return unauthorized if JWT is invalid.");
            done();
          });
      });
      test("# Join code field not provided", function(done) {
        chai.request(server)
          .patch("/api/teams/join-team")
          .send({})
          .set({ Authorization: validJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if JWT is valid but join code is not present in request.");
            assert.equal(response.body.status, "INVALID_JOIN_CODE", "Response object should state INVALID_JOIN_CODE if it is not present in request.");
            assert.equal(response.body.errors.join_code, "Join code field is required", "Errors object should identify join code as required.");
            done();
          });
      });
      test("# Join code field empty", function(done) {
        chai.request(server)
          .patch("/api/teams/join-team")
          .send({ join_code: "" })
          .set({ Authorization: validJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if JWT is valid but join code field is empty.");
            assert.equal(response.body.status, "INVALID_JOIN_CODE", "Response object should state INVALID_JOIN_CODE if it is empty.");
            assert.equal(response.body.errors.join_code, "Join code field is required", "Errors object should identify join code as required.");
            done();
          });
      });
      test("# Join code too short", function(done) {
        chai.request(server)
          .patch("/api/teams/join-team")
          .send({ join_code: "7777777" })
          .set({ Authorization: validJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if JWT is valid but join code is too short.");
            assert.equal(response.body.status, "INVALID_JOIN_CODE", "Response object should state INVALID_JOIN_CODE if it is too short.");
            assert.equal(response.body.errors.join_code, "Join code must be exactly 8 digits", "Errors object should identify join code as too short if it is.");
            done();
          });
      });
      test("# Join code too long", function(done) {
        chai.request(server)
          .patch("/api/teams/join-team")
          .send({ join_code: "999999999" })
          .set({ Authorization: validJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if JWT is valid but join code is too long.");
            assert.equal(response.body.status, "INVALID_JOIN_CODE", "Response object should state INVALID_JOIN_CODE if it is too long.");
            assert.equal(response.body.errors.join_code, "Join code must be exactly 8 digits", "Errors object should identify join code as too long if it is.");
            done();
          });
      });
      test("# Join code non-numeric", function(done) {
        chai.request(server)
          .patch("/api/teams/join-team")
          .send({ join_code: "a8a8b9b9" })
          .set({ Authorization: validJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if JWT is valid but code is non-numeric.");
            assert.equal(response.body.status, "INVALID_JOIN_CODE", "Response object should indicate join code is invalid if it contains non-numeric characters.");
            assert.equal(response.body.errors.join_code, "Join code may not contain non-number characters", "Errors object should state join code may not contain alpha characters.");
            done();
          });
      });
      test("# User not verified", function(done) {
        chai.request(server)
          .patch("/api/teams/join-team")
          .send({ join_code: "00000000" })
          .set({ Authorization: unverifiedJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if JWT is valid but user is unverified.");
            assert.equal(response.body.status, "USER_NOT_VERIFIED", "Response should indicate user is not verified if user is not verified.");
            done();
          });
      });
      test("# User already has team", function(done) {
        chai.request(server)
          .patch("/api/teams/join-team")
          .send({ join_code: "00000000" })
          .set({ Authorization: validJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if JWT is valid but user has a team already.");
            assert.equal(response.body.status, "USER_HAS_TEAM", "Response object should be USER_HAS_TEAM if user has a team.");
            done();
          });
      });

      test("# User is blocked from team", function(done) {
        chai.request(server)
          .patch("/api/teams/join-team")
          .send({ join_code: dev_team_code })
          .set({ Authorization: blockedJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if JWT is valid but user is blocked.");
            assert.equal(response.body.status, "UNABLE_TO_JOIN_TEAM", "Response object should vaguely indicated use has been blocked.");
            done();
          });
      });
    });

    suite("Delete a Team", function() {
      const test_user = {
        username: "TESTING USER",
        email: "testing@domain.com",
        password: process.env.TESTING_PASSWORD,
        platform: "PC",
        verified: true,
        _id: mongoose.Types.ObjectId("5f4c0e963e89966b9ce6e170")
      };
      const validJWT = issueJWT(test_user).token;

      const unverified_user = {
        user: "UNVERIFIED USER",
        email: "unverified_user@domain.com",
        password: process.env.TESTING_PASSWORD,
        platform: "PC",
        verified: false,
        _id: mongoose.Types.ObjectId("5f4c194be2fea45de4399e11")
      }
      const unverifiedJWT = issueJWT(unverified_user).token;

      const not_admin_user = {
        username: "NOT ADMIN",
        email: "not_admin_user@domain.com",
        password: process.env.TESTING_PASSWORD,
        platform: "PC",
        verified: true,
        _id: mongoose.Types.ObjectId("5f4c3bd592e824573ce5be7e")
      }
      const notAdminJWT = issueJWT(not_admin_user).token;

      const not_on_team_user = {
        username: "NOT ON TEAM",
        email: "not_on_team_user",
        password: process.env.TESTING_PASSWORD,
        platform: "PC",
        verified: true,
        _id: mongoose.Types.ObjectId("5f4c3ea6a790f9581cbda208")
      };
      const notOnTeamJWT = issueJWT(not_on_team_user).token;

      const no_team_user = {
        username: "HAS NO TEAM",
        email: "no_team@domain.com",
        password: process.env.TESTING_PASSWORD,
        platform: "PC",
        verified: true,
        _id: mongoose.Types.ObjectId("5f4c40a31e8c2816948e5549")
      }
      const noTeamJWT = issueJWT(no_team_user).token;

      const team_not_found_user = {
        username: "TEAM DOES NOT EXIST",
        email: "team_not_found@domain.com",
        password: process.env.TESTING_PASSWORD,
        platform: "PC",
        verified: true,
        _id: mongoose.Types.ObjectId("5f4c428646ffca6e54af04b6")
      };
      const teamNotFoundJWT = issueJWT(team_not_found_user).token;

      const invalidJWT = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTg4MTkxMTk3NDQsImV4cCI6MTU5ODgxOTExOTc0NH0.qkun-NSiUKZ-lC0tW6g0eu8VWqUSAxzQZbG4alpfXeSbL3_SPlfS87FHgRMaJeYkNb2qwqq8blq3JjvK5jYYxRhwfecOFvBsCnjzVrr-q4WRUm_PvJMdYW1TDK6iQwmuv8n2PP9vyz558ne9m065Ufqf1fn_3NIdSHNzsGkWf_tJYKX9d8ChxMn2L6pVtnetolD9KHgajJzpS9llbO7VUOSsnbuv8eMxo3N3Jlgw1NViarxYfctNhj7mL_PynlTqxSeRxpXR5vGqbCU7XP7y34gqrj9p7wsNklwsYaqGqr9oVbo0Ai5rtNRukykQ5MDB6rH15WQpcPH1JBi03bZMA407IgHsJXUo0p9Nv9pFDqLqfIuB-LQcA8ALjViPQ9L_v_g2PxU-47DEALtRldTobu4tKTQ8yAOc0mw6Da8SgpML8sysBmC6uCzFlkcw9u9LNrLVmkmcUYSrtJwtJeXOGeUhICumhHl-NsYmguJht4tTa56SRUfkcZZL7i4uxnS36pF66A_V0NU1jqeKWFaWzBhLPLEy7HAuWuSyLOrS5haS40S70Pz6s_Bf6ED1R0lPd6tjtIVIlAJ3JLkGouzR2s1sETySmQlKDSi7fQ9e0Bvfrow10QhcExG7bdkxQ58xDhXh8KnY4jLH1vqhA6TSX7TFOJtgOtxSA2NvDym7uRo";

      test("# Valid team deletion", function(done) {
        chai.request(server)
          .delete("/api/teams/delete-team")
          .set({ Authorization: validJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if JWT is valid.");
            assert.equal(response.body.status, "TEAM_DELETED", "Response object should be TEAM_DELETED when input is valid.");
            done();
          });
      });
      test("# JWT not provided", function(done) {
        chai.request(server)
          .delete("/api/teams/delete-team")
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 401, "Response should be 401 Unauthorized if JWT not provided.");
            assert.equal(response.text, "Unauthorized", "Response should return unauthorized if JWT not provided.");
            done();
          });
      });
      test("# JWT is invalid", function(done) {
        chai.request(server)
          .delete("/api/teams/delete-team")
          .set({ Authorization: invalidJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 401, "Response should be 401 Unauthorized if JWT is invalid.");
            assert.equal(response.text, "Unauthorized", "Response should return unauthorized if JWT is invalid.");
          });
          done();
      });
      test("# User not verified", function(done) {
        chai.request(server)
          .delete("/api/teams/delete-team")
          .set({ Authorization: unverifiedJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if JWT is valid but user is unverified.");
            assert.equal(response.body.status, "USER_NOT_VERIFIED", "Response should indicate user is not verified if user is not verified.");
            done();
          });
      });
      test("# User not qualified (not admin)", function(done) {
        chai.request(server)
          .delete("/api/teams/delete-team")
          .set({ Authorization: notAdminJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if JWT is valid but user is not an admin.");
            assert.equal(response.body.status, "USER_NOT_QUALIFIED", "Response should indicate user is not qualified if they are not an admin.");
            done();
          });
      });
      test("# User not qualified (not on team)", function(done) {
        chai.request(server)
          .delete("/api/teams/delete-team")
          .set({ Authorization: notOnTeamJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if JWT is valid but user is not on team.");
            assert.equal(response.body.status, "USER_NOT_QUALIFIED", "Response should indicate user is not qualified if they are not on team.");
            done();
          });
      });
      test("# User has no team", function(done) {
        chai.request(server)
          .delete("/api/teams/delete-team")
          .set({ Authorization: noTeamJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if JWT is valid but user has no team.");
            assert.equal(response.body.status, "USER_HAS_NO_TEAM", "Response should indicate user has no team if they have no team.");
            done();
          });
      })
      test("# Team does not exist", function(done) {
        chai.request(server)
          .delete("/api/teams/delete-team")
          .set({ Authorization: teamNotFoundJWT })
          .end((error, response) => {
            if (error) return done(error);
              assert.equal(response.status, 200, "Response should be 200 if JWT is valid but team does not exist.");
              assert.equal(response.body.status, "TEAM_DOES_NOT_EXIST", "Response should indicate team does not exist if it does not.");
            done();
          });
      });
    });
  });

});
