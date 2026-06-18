// Unit tests for getAllEpisodes' row-grouping logic. The shared knex client
// (../db) is mocked as a chainable, awaitable builder that resolves to a
// configurable set of joined rows, so the reshaping into grouped episode
// objects is exercised without a database.

jest.mock("../db", () => {
  const builder = {
    __rows: [],
    then(resolve, reject) {
      return Promise.resolve(builder.__rows).then(resolve, reject);
    },
  };
  for (const method of ["select", "from", "join", "orderBy"]) {
    builder[method] = jest.fn(() => builder);
  }
  return builder;
});

const db = require("../db");
const { getAllEpisodes } = require("./getAllEpisodes");

const row = (overrides) => ({
  episode_id: "ds9-1x01",
  episode_title: "The Nagus",
  series_name: "Star Trek: Deep Space Nine",
  episode_season: 1,
  episode_number: 1,
  episode_synopsis: "Quark becomes Grand Nagus.",
  episode_date: "1993-03-21T00:00:00.000Z",
  rule_number: 1,
  rule_text: "Once you have their money, you never give it back.",
  ...overrides,
});

const mockRes = () => {
  const res = {};
  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);
  return res;
};

beforeEach(() => {
  jest.clearAllMocks();
  db.__rows = [];
});

test("groups multiple rule rows under a single episode", async () => {
  db.__rows = [
    row({ rule_number: 1, rule_text: "a" }),
    row({ rule_number: 2, rule_text: "b" }),
  ];
  const res = mockRes();

  await getAllEpisodes({}, res);

  expect(res.status).toHaveBeenCalledWith(200);
  const payload = res.json.mock.calls[0][0];
  expect(payload).toHaveLength(1);
  expect(payload[0].episode_rules).toEqual([
    { rule_number: 1, rule_text: "a" },
    { rule_number: 2, rule_text: "b" },
  ]);
});

test("includes an episode with no rules and an empty episode_rules array", async () => {
  db.__rows = [row({ rule_number: null, rule_text: null })];
  const res = mockRes();

  await getAllEpisodes({}, res);

  const payload = res.json.mock.calls[0][0];
  expect(payload).toHaveLength(1);
  expect(payload[0].episode_rules).toEqual([]);
});

test("returns one entry per distinct episode", async () => {
  db.__rows = [
    row({ episode_id: "ds9-1x01", rule_number: 1 }),
    row({ episode_id: "tng-5x21", episode_title: "The Perfect Mate", rule_number: 35 }),
  ];
  const res = mockRes();

  await getAllEpisodes({}, res);

  const payload = res.json.mock.calls[0][0];
  expect(payload).toHaveLength(2);
  expect(payload.map((episode) => episode.episode_id)).toEqual([
    "ds9-1x01",
    "tng-5x21",
  ]);
});
