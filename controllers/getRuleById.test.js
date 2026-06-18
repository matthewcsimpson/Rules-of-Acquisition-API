// Unit tests for the consolidated rule-by-id handlers.
//
// The handler's data-access boundaries — the shared knex client (`../db`)
// and the `exists` helper — are mocked, so these tests exercise the
// handler's branching, response shape, and query-construction without a
// live database.

jest.mock("../db", () => jest.fn());
jest.mock("../helpers/exists", () => ({ exists: jest.fn() }));

const db = require("../db");
const { exists } = require("../helpers/exists");
const { getRuleById, getRevisedRuleById } = require("./getRuleById");

// A chainable, awaitable stand-in for a knex query builder. Every builder
// method returns the same stub (so chaining works) and the stub resolves
// to `rows` when awaited.
const queryStub = (rows) => {
  const stub = {};
  for (const method of [
    "where",
    "select",
    "distinct",
    "join",
    "orderBy",
    "whereNotNull",
  ]) {
    stub[method] = jest.fn(() => stub);
  }
  stub.then = (resolve, reject) => Promise.resolve(rows).then(resolve, reject);
  return stub;
};

const mockReq = (ruleId) => ({ params: { rule_id: ruleId } });

const mockRes = () => {
  const res = {};
  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);
  return res;
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("getRuleById", () => {
  test("returns rule details and episode appearances for a valid rule", async () => {
    exists.mockResolvedValue(true);
    const ruleRow = {
      rule_number: 1,
      rule_text: "Once you have their money, you never give it back.",
      rule_variation: null,
      rule_note: null,
    };
    const episodeRows = [{ series_name: "Star Trek: Deep Space Nine" }];
    const ruleQuery = queryStub([ruleRow]);
    const episodeQuery = queryStub(episodeRows);
    db.mockReturnValueOnce(ruleQuery).mockReturnValueOnce(episodeQuery);

    const res = mockRes();
    await getRuleById(mockReq("1"), res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      ruleDetails: ruleRow,
      episodeDetails: episodeRows,
    });
  });

  test("selects the canonical (non-revised) rule columns", async () => {
    exists.mockResolvedValue(true);
    const ruleQuery = queryStub([{ rule_number: 1 }]);
    db.mockReturnValueOnce(ruleQuery).mockReturnValueOnce(queryStub([]));

    await getRuleById(mockReq("1"), mockRes());

    expect(ruleQuery.select).toHaveBeenCalledWith([
      "rules.rule_number",
      "rules.rule_text",
      "rules.rule_variation",
      "rules.rule_note",
    ]);
  });

  test("de-duplicates the episode list and does not apply the revised filter", async () => {
    exists.mockResolvedValue(true);
    const episodeQuery = queryStub([]);
    db.mockReturnValueOnce(queryStub([{ rule_number: 1 }])).mockReturnValueOnce(
      episodeQuery
    );

    await getRuleById(mockReq("1"), mockRes());

    expect(episodeQuery.distinct).toHaveBeenCalled();
    // only the rule_number where — no rule_appearance.revised_edition filter
    expect(episodeQuery.where).toHaveBeenCalledTimes(1);
    expect(episodeQuery.where).toHaveBeenCalledWith("rules.rule_number", "1");
  });

  test("does not apply the revised existence filter", async () => {
    exists.mockResolvedValue(true);
    db.mockReturnValueOnce(queryStub([{ rule_number: 1 }])).mockReturnValueOnce(
      queryStub([])
    );

    await getRuleById(mockReq("1"), mockRes());

    const builder = exists.mock.calls[0][1];
    const qb = {
      where: jest.fn(() => qb),
      whereNotNull: jest.fn(() => qb),
    };
    builder(qb);
    expect(qb.where).toHaveBeenCalledWith("rule_number", 1);
    expect(qb.whereNotNull).not.toHaveBeenCalled();
  });

  test("responds 404 for a non-numeric id without touching the database", async () => {
    const res = mockRes();
    await getRuleById(mockReq("5abc"), res);

    expect(exists).not.toHaveBeenCalled();
    expect(db).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: "There is no rule by that number",
    });
  });

  test("responds 404 for a non-existent rule without running detail queries", async () => {
    exists.mockResolvedValue(false);
    const res = mockRes();

    await getRuleById(mockReq("9999"), res);

    expect(db).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: "There is no rule by that number",
    });
  });
});

describe("getRevisedRuleById", () => {
  test("selects the revised rule columns", async () => {
    exists.mockResolvedValue(true);
    const ruleQuery = queryStub([{ rule_number: 10 }]);
    db.mockReturnValueOnce(ruleQuery).mockReturnValueOnce(queryStub([]));

    await getRevisedRuleById(mockReq("10"), mockRes());

    expect(ruleQuery.select).toHaveBeenCalledWith([
      "rules.rule_number",
      "rules.revised_edition",
      "rules.revised_note",
    ]);
  });

  test("de-duplicates and filters episode appearances to revised editions", async () => {
    exists.mockResolvedValue(true);
    const episodeQuery = queryStub([]);
    db.mockReturnValueOnce(queryStub([{ rule_number: 10 }])).mockReturnValueOnce(
      episodeQuery
    );

    await getRevisedRuleById(mockReq("10"), mockRes());

    expect(episodeQuery.distinct).toHaveBeenCalled();
    expect(episodeQuery.where).toHaveBeenCalledWith(
      "rule_appearance.revised_edition",
      true
    );
  });

  test("applies whereNotNull('revised_edition') to the existence check", async () => {
    exists.mockResolvedValue(true);
    db.mockReturnValueOnce(queryStub([{ rule_number: 10 }])).mockReturnValueOnce(
      queryStub([])
    );

    await getRevisedRuleById(mockReq("10"), mockRes());

    const builder = exists.mock.calls[0][1];
    const qb = {
      where: jest.fn(() => qb),
      whereNotNull: jest.fn(() => qb),
    };
    builder(qb);
    expect(qb.where).toHaveBeenCalledWith("rule_number", 10);
    expect(qb.whereNotNull).toHaveBeenCalledWith("revised_edition");
  });

  test("responds 404 with the revised message for a non-existent revised rule", async () => {
    exists.mockResolvedValue(false);
    const res = mockRes();

    await getRevisedRuleById(mockReq("9999"), res);

    expect(db).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: "There is no revised rule by that number",
    });
  });
});
