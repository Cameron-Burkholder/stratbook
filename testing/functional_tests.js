/* testing/functional_tests.js */

const chai = require("chai");
const assert = chai.assert;

suite("FUNCTIONAL TESTS", function() {
  suite("Email", function() {
    const email = require("../config/email.js");
    test("# Email sends succesfully", function() {
      assert.equal(email("cburkholder19@gmail.com", "TESTING", "This is a test email to ensure that emails send succesfully."), null, "Email should return null when an email sends successfully.");
    })
  });
  
});
