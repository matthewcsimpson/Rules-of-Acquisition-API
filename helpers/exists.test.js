// Unit tests for the exists() existence-check helper. The shared knex
// client (../db) is mocked so the helper's query construction and boolean
// coercion are exercised without a database.

jest.mock("../db", () => jest.fn());

const db = require("../db");
const { exists } = require("./exists");

// A minimal builder stub: .where() chains, .first() resolves to `row`.
const builderStub = (row) => {
  const stub = {};
  stub.where = jest.fn(() => stub);
  stub.first = jest.fn(() => Promise.resolve(row));
  return stub;
};

beforeEach(() => {
  jest.clearAllMocks();
});

test("returns true when a matching row exists", async () => {
  const stub = builderStub({ rule_number: 1 });
  db.mockReturnValue(stub);

  const result = await exists("rules", (qb) => qb.where("rule_number", 1));

  expect(result).toBe(true);
  expect(db).toHaveBeenCalledWith("rules");
});

test("returns false when no row matches", async () => {
  const stub = builderStub(undefined);
  db.mockReturnValue(stub);

  const result = await exists("episodes", (qb) =>
    qb.where("episode_id", "nope")
  );

  expect(result).toBe(false);
});

test("passes the supplied where-builder to the query", async () => {
  const stub = builderStub({});
  db.mockReturnValue(stub);
  const build = (qb) => qb;

  await exists("rules", build);

  expect(stub.where).toHaveBeenCalledWith(build);
  expect(stub.first).toHaveBeenCalled();
});
