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
  let test_team_code;
  let newUserJWT;
  let newUserWTeamJWT;
  let onlyUserOnTeamJWT;

  suite("TEAM MODEL", function() {

    suite("/api/teams/create-team", function() {
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

    suite("/api/teams/view-join-code", function() {
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

    suite("/api/teams/view-team", function() {
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

    suite("/api/teams/update-name", function() {
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

    suite("/api/teams/block-user", function() {
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

    suite("/api/teams/join-team", function() {
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

    suite("/api/teams/delete-team", function() {
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

  suite("USER MODEL", function() {

    suite("/api/users/register", function() {
      test("# Username field not provided", function(done) {
        chai.request(server)
          .post("/api/users/register")
          .send({})
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if username field not provided.");
            assert.equal(response.body.status, "INVALID_REGISTRATION", "Response should indicate registration is invalid if username is not in request.");
            assert.equal(response.body.errors.username, "Username field is required", "Errors should indicate username field is required if username is not in request.");
            done();
          });
      });
      test("# Username field is empty", function(done) {
        chai.request(server)
          .post("/api/users/register")
          .send({ username: "" })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if username field is empty.");
            assert.equal(response.body.status, "INVALID_REGISTRATION", "Response should indicate registration is invalid if username is empty.");
            assert.equal(response.body.errors.username, "Username field is required", "Errors should indicate username field is required if username is empty.");
            done();
          });
      });
      test("# Email field not provided", function(done) {
        chai.request(server)
          .post("/api/users/register")
          .send({})
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if email field is not in request.");
            assert.equal(response.body.status, "INVALID_REGISTRATION", "Response should indicate invalid registration if email not in request.");
            assert.equal(response.body.errors.email, "Email field is required", "Errors should indicate email is required.");
            done();
          });
      });
      test("# Email field is empty", function(done) {
        chai.request(server)
          .post("/api/users/register")
          .send({ email: "" })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if email field is empty.");
            assert.equal(response.body.status, "INVALID_REGISTRATION", "Response should indicate invalid registration if email is empty.");
            assert.equal(response.body.errors.email, "Email field is required", "Errors should indicate email is required.");
            done();
          });
      });
      test("# Email is invalid", function(done) {
        chai.request(server)
          .post("/api/users/register")
          .send({ email: "something_wrong" })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if email field is invalid.");
            assert.equal(response.body.status, "INVALID_REGISTRATION", "Response should indicate invalid registration if email is invalid.");
            assert.equal(response.body.errors.email, "Email is invalid", "Errors should indicate email is invalid.");
            done();
          });
      });
      test("# Password field not provided", function(done) {
        chai.request(server)
          .post("/api/users/register")
          .send({})
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if password field is not in request.");
            assert.equal(response.body.status, "INVALID_REGISTRATION", "Response should indicate invalid registration if password field is not provided.");
            assert.equal(response.body.errors.password1, "Password field is required", "Errors should indicate password is required.");
            done();
          });
      });
      test("# Password field is empty", function(done) {
        chai.request(server)
          .post("/api/users/register")
          .send({ password1: "" })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if password field is empty.");
            assert.equal(response.body.status, "INVALID_REGISTRATION", "Response should indicate invalid registration if password field is empty.");
            assert.equal(response.body.errors.password1, "Password field is required", "Errors should indicate password is required.");
            done();
          });
      });
      test("# Password is wrong length", function(done) {
        chai.request(server)
          .post("/api/users/register")
          .send({ password1: "short" })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if password is wrong length.");
            assert.equal(response.body.status, "INVALID_REGISTRATION", "Response should indicate invalid registration if password is wrong length.");
            assert.equal(response.body.errors.password1, "Password must be at least 6 characters and at most 30", "Errors should indicate password is wrong length.");
            done();
          });
      });
      test("# Confirm password field not provided", function(done) {
        chai.request(server)
          .post("/api/users/register")
          .send({})
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if confirm password field not included.");
            assert.equal(response.body.status, "INVALID_REGISTRATION", "Response should indicate registration is invalid if confirm password not included.");
            assert.equal(response.body.errors.password2, "Confirm password field is required", "Errors should indicate confirm password field is required.");
            done();
          });
      });
      test("# Confirm password field is empty", function(done) {
        chai.request(server)
          .post("/api/users/register")
          .send({ password2: "" })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if confirm password field is empty.");
            assert.equal(response.body.status, "INVALID_REGISTRATION", "Response should indicate registration is invalid if confirm password field is empty.");
            assert.equal(response.body.errors.password2, "Confirm password field is required", "Errors should indicate confirm password field is required.");
            done();
          });
      });
      test("# Passwords do not match", function(done) {
        chai.request(server)
          .post("/api/users/register")
          .send({ password1: "somethingA", password2: "somethingB" })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if passwords do not match.");
            assert.equal(response.body.status, "INVALID_REGISTRATION", "Response should indicate passwords do not match.");
            assert.equal(response.body.errors.password2, "Passwords must match", "Errors should indicate passwords do not match.");
            done();
          });
      });
      test("# Platform field not provided", function(done) {
        chai.request(server)
          .post("/api/users/register")
          .send({})
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if platform is not provided.");
            assert.equal(response.body.status, "INVALID_REGISTRATION", "Response should indicate registration is invalid if platform is not required.");
            assert.equal(response.body.errors.platform, "Platform field is required", "Errors should indicate platform field is required.");
            done();
          });
      });
      test("# Platform field is empty", function(done) {
        chai.request(server)
          .post("/api/users/register")
          .send({ platform: "" })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if platform is empty.");
            assert.equal(response.body.status, "INVALID_REGISTRATION", "Response should indicate registration is invalid if platform is empty.");
            assert.equal(response.body.errors.platform, "Platform field is required", "Errors should indicate platform field is required.");
            done();
          });
      });
      test("# Platform is not valid", function(done) {
        chai.request(server)
          .post("/api/users/register")
          .send({ platform: "INVALID" })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if platform is invalid.");
            assert.equal(response.body.status, "INVALID_REGISTRATION", "Response should indicate registration is invalid if platform is invalid.");
            assert.equal(response.body.errors.platform, "The only platforms accepted are Xbox, PC, or PS4", "Errors should indicate platform is invalid.");
            done();
          });
      });
      test("# Email and Username are profane", function(done) {
        chai.request(server)
          .post("/api/users/register")
          .send({ username: "Fuck", email: "fuck@domain.com", platform: "XBOX", password1: "SomePassword", password2: "SomePassword" })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if input is profane.");
            assert.equal(response.body.status, "PROFANE_INPUT", "Response should indicate input is inappropriate.");
            assert.equal(response.body.errors.email, "Email may not be inappropriate", "Errors should indicate email may not be inappropriate.");
            assert.equal(response.body.errors.username, "Username may not be inappropriate", "Errors should indicate username may not be inappropriate.");
            done();
          });
      });
      test("# Existing user email", function(done) {
        chai.request(server)
          .post("/api/users/register")
          .send({ email: "testing@domain.com", username: "ANOTHER ONE", platform: "XBOX", password1: process.env.TESTING_PASSWORD, password2: process.env.TESTING_PASSWORD })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if user is duplicate (email).");
            assert.equal(response.body.status, "EXISTING_USER", "Response should indicate user already exists if email has already been registered.");
            done();
          });
      });
      test("# Existing username", function(done) {
        chai.request(server)
          .post("/api/users/register")
          .send({ email: "something_new@domain.com", username: "TESTING USER", platform: "PC", password1: process.env.TESTING_PASSWORD, password2: process.env.TESTING_PASSWORD })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if user is duplicate (username).");
            assert.equal(response.body.status, "EXISTING_USER", "Response should indicate user already exists if username has already been registered.");
            done();
          });
      });
      test("# User registered succesfully", function(done) {
        let newUser = {
          email: "new_user@domain.com",
          username: "NEW USER",
          platform: "PS4",
          password1: process.env.TESTING_PASSWORD,
          password2: process.env.TESTING_PASSWORD,
        };
        chai.request(server)
          .post("/api/users/register")
          .send(newUser)
          .end((error, response) => {
            if (error) return done(error);
            newUser._id = mongoose.Types.ObjectId(response.body._id);
            newUserJWT = issueJWT(newUser).token;
            assert.equal(response.status, 200, "Response should be 200 if registration input is valid.");
            assert.equal(response.body.status, "USER_REGISTERED", "If user is registered succesfully response should indicate such.");
            done();
          });
      });

    });

    suite("/api/users/login", function() {
      test("# Email field not provided", function(done) {
        chai.request(server)
          .post("/api/users/login")
          .send({ password: process.env.TESTING_PASSWORD })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if email field is not in request.");
            assert.equal(response.body.status, "INVALID_LOGIN", "Response should indicate invalid login if email not in request.");
            assert.equal(response.body.errors.email, "Email field is required", "Errors should indicate email is required.");
            done();
          });
      });
      test("# Email field is empty", function(done) {
        chai.request(server)
          .post("/api/users/login")
          .send({ email: "", password: process.env.TESTING_PASSWORD })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if email field is empty.");
            assert.equal(response.body.status, "INVALID_LOGIN", "Response should indicate invalid login if email is empty.");
            assert.equal(response.body.errors.email, "Email field is required", "Errors should indicate email is required.");
            done();
          });
      });
      test("# Email is invalid", function(done) {
        chai.request(server)
          .post("/api/users/login")
          .send({ email: "invalid_email", password: process.env.TESTING_PASSWORD })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if email field is invalid.");
            assert.equal(response.body.status, "INVALID_LOGIN", "Response should indicate invalid login if email is invalid.");
            assert.equal(response.body.errors.email, "Email is invalid", "Errors should indicate email is invalid.");
            done();
          });
      });
      test("# Password field not provided", function(done) {
        chai.request(server)
          .post("/api/users/login")
          .send({ email: "testing@domain.com" })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if password field is not in request.");
            assert.equal(response.body.status, "INVALID_LOGIN", "Response should indicate invalid login if password field is not provided.");
            assert.equal(response.body.errors.password, "Password field is required", "Errors should indicate password is required.");
            done();
          });
      });
      test("# Password field is empty", function(done) {
        chai.request(server)
          .post("/api/users/login")
          .send({ email: "testing@domain.com", password: "" })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if password field is empty.");
            assert.equal(response.body.status, "INVALID_LOGIN", "Response should indicate invalid login if password field is empty.");
            assert.equal(response.body.errors.password, "Password field is required", "Errors should indicate password is required.");
            done();
          });
      });
      test("# User not found", function(done) {
        chai.request(server)
          .post("/api/users/login")
          .send({ email: "not_found_user@domain.com", password: process.env.TESTING_PASSWORD })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if user is not found.");
            assert.equal(response.body.status, "USER_NOT_FOUND", "Response should indicate user not found if user does not exist.");
            done();
          });
      });
      test("# Incorrect password", function(done) {
        chai.request(server)
          .post("/api/users/login")
          .send({ email: "testing@domain.com", password: "Some Wrong Pass" })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if password is incorrect.");
            assert.equal(response.body.status, "INCORRECT_PASSWORD", "Response should indicate password is incorrect.");
            done();
          })
      });
      test("# Valid login", function(done) {
        chai.request(server)
          .post("/api/users/login")
          .send({ email: "testing@domain.com", password: process.env.TESTING_PASSWORD })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if login is valid.");
            assert.equal(response.body.status, "TOKEN_ISSUED", "Response should indicate token has been issued if login is valid.");
            assert.isOk(response.body.token, "Response should issue a token if login is valid.");
            done();
          });
      });
    });

    suite("/api/users/delete", function() {
      const invalidJWT = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTg4MTkxMTk3NDQsImV4cCI6MTU5ODgxOTExOTc0NH0.qkun-NSiUKZ-lC0tW6g0eu8VWqUSAxzQZbG4alpfXeSbL3_SPlfS87FHgRMaJeYkNb2qwqq8blq3JjvK5jYYxRhwfecOFvBsCnjzVrr-q4WRUm_PvJMdYW1TDK6iQwmuv8n2PP9vyz558ne9m065Ufqf1fn_3NIdSHNzsGkWf_tJYKX9d8ChxMn2L6pVtnetolD9KHgajJzpS9llbO7VUOSsnbuv8eMxo3N3Jlgw1NViarxYfctNhj7mL_PynlTqxSeRxpXR5vGqbCU7XP7y34gqrj9p7wsNklwsYaqGqr9oVbo0Ai5rtNRukykQ5MDB6rH15WQpcPH1JBi03bZMA407IgHsJXUo0p9Nv9pFDqLqfIuB-LQcA8ALjViPQ9L_v_g2PxU-47DEALtRldTobu4tKTQ8yAOc0mw6Da8SgpML8sysBmC6uCzFlkcw9u9LNrLVmkmcUYSrtJwtJeXOGeUhICumhHl-NsYmguJht4tTa56SRUfkcZZL7i4uxnS36pF66A_V0NU1jqeKWFaWzBhLPLEy7HAuWuSyLOrS5haS40S70Pz6s_Bf6ED1R0lPd6tjtIVIlAJ3JLkGouzR2s1sETySmQlKDSi7fQ9e0Bvfrow10QhcExG7bdkxQ58xDhXh8KnY4jLH1vqhA6TSX7TFOJtgOtxSA2NvDym7uRo";

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
      test("Delete user", function(done) {
        chai.request(server)
          .delete("/api/users/delete")
          .set({ Authorization: newUserJWT })
          .end((error, response) => {
            if (error) return done(error);
            assert.equal(response.status, 200, "Response should be 200 if user is deleted succesfully.");
            assert.equal(response.body.status, "USER_DELETED", "Response should indicate user has been deleted.");
            done();
          });
      });
      test("Delete user with a team", function(done) {
        let newUserWTeam = {
          email: "new_user_w_team@domain.com",
          username: "NEW USER WITH TEAM",
          platform: "PS4",
          password1: process.env.TESTING_PASSWORD,
          password2: process.env.TESTING_PASSWORD,
        };
        chai.request(server)
          .post("/api/users/register")
          .send(newUserWTeam)
          .end((error, response) => {
            if (error) return done(error);
            newUserWTeam._id = mongoose.Types.ObjectId(response.body._id);
            newUserWTeamJWT = issueJWT(newUserWTeam).token;
            chai.request(server)
              .patch("/api/teams/join-team")
              .send({ join_code: test_team_code })
              .set({ Authorization: newUserWTeamJWT })
              .end((error, response) => {
                if (error) return done(error);
                newUserWTeam.team_code = response.body.team_code;
                newUserWTeamJWT = issueJWT(newUserWTeam).token;
                chai.request(server)
                  .delete("/api/users/delete")
                  .set({ Authorization: newUserWTeamJWT })
                  .end((error, response) => {
                    if (error) return done(error);
                    assert.equal(response.status, 200, "Response should be 200 if user is deleted succesfully with team.");
                    assert.equal(response.body.status, "USER_DELETED", "Response should indicate user has been deleted if user with team is deleted.");
                    done();
                  });
              });
          });
      });
      test("# Delete only user on team", function(done) {
        let onlyUserOnTeam = {
          email: "only_user@testing.com",
          username: "ONLY USER ON TEAM",
          platform: "PS4",
          password1: process.env.TESTING_PASSWORD,
          password2: process.env.TESTING_PASSWORD
        };
        chai.request(server)
          .post("/api/users/register")
          .send(onlyUserOnTeam)
          .end((error, response) => {
            if (error) return done(error);
            onlyUserOnTeam._id = mongoose.Types.ObjectId(response.body._id);
            onlyUserOnTeamJWT = issueJWT(onlyUserOnTeam).token
            chai.request(server)
              .post("/api/teams/create-team")
              .send({ name: "TEAM ONE USER" })
              .set({ Authorization: onlyUserOnTeamJWT })
              .end((error, response) => {
                if (error) return done(error);
                assert.equal(response.status, 200);
                assert.equal(response.body.status, "TEAM_CREATED");

                onlyUserOnTeam.team_code = response.body.team_code;
                onlyUserOnTeamJWT = issueJWT(onlyUserOnTeam).token;
                chai.request(server)
                  .delete("/api/users/delete")
                  .set({ Authorization: onlyUserOnTeamJWT })
                  .end((error, response) => {
                    if (error) return done(error);
                    assert.equal(response.status, 200, "Response  should be 200 if JWT is valid.");
                    assert.equal(response.body.status, "USER_AND_TEAM_DELETED", "User and team should be deleted if user is only member of team.");
                    done();
                  });
              });
          });
      });
    });
  });

});
