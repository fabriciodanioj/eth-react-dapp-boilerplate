/* eslint-disable no-undef */
const Example = artifacts.require("Example.sol");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("Example", ([deployer]) => {
  let example;

  before(async () => {
    example = await Example.deployed();
  });

  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = example.address;

      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it("has a name", async () => {
      const name = await example.name();

      assert.equal(name, "Example");
    });
  });

});
