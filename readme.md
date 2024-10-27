# Rules-of-Acquisition-API

This is an API listing the Ferengi Rules of Acquisition, the guiding principles of the hyper-capitalist Ferengi people featured in Star Trek.

It is built with Node.js, Express.js, with MySQL and Knex.js.

# API Reference

You can access the API -along with full interactive documentation generated via apidog- here: <https://rulesofacquisition.herokuapp.com>

## Base URL:

```string
https://rulesofacquisition.herokuapp.com
```

## Get a list of the rules

Returns the full list of rules as an array of objects in JSON format.

## Request:

```http
GET /rules

```

## Response:

```Javascript
[
  {
    "rule_number": number,
    "rule_text": string,
  },
]
```

- `rule_number` is the in-universe rule number and database ID.
- `rule_text` is the canon text of the rule

## Get a specific rule

Returns the text and details of a specified rule, including the episodes in which that rule appeared.

## Request:

```http
GET /rule/:rule_id

```

| Parameter  | Type     | Description                    |
| :--------- | :------- | :----------------------------- |
| `:rule_id` | `number` | The identifying rule number/ID |

## Response

```javascript
{
  "ruleDetails":
    {
      "rule_number": number,
      "rule_text": string,
      "rule_variation": string || null,
      "rule_note": string || null,
    },
  "episodeDetails": [
    {
      "series_name": string,
      "episode_season": number,
      "episode_number": number,
      "episode_title": string,
      "episode_synopsis": string,
      "episode_date": string
    },
  ]
}
```

- `ruleDetails`, an object containing the full details of the specified rule.
- - `rule_number` is the in-universe rule number and database ID for the specified rule.
  - `rule_text` is the canon text of the specified rule
  - `rule_variation` is a variation on the specified rules language. `null` if there isn't one.
  - `rule_note` is a note about the context of the specified rule. `null` if there isn't one.
- `episodeDetails` is an array of episodes that the specified rule appeared in.
- - `series_name` is the full name of the series this episode was in.
  - `episode_season` is the season this episode was in.
  - `episode_number` is the episode number in the season that the specified rule appeared in.
  - `episode_title` is the title of the episode the specified rule appeared in
  - `episode_synopsis` is a brief description of the episode the specified rule appeared in.
  - `episode_date` is the original airdate for the episode the specified rule appeared in, in the format "1993-05-02T00:00:00.000Z"

Note: Returns 404 if a rule number that does not exist is specified.

## Get a list of the "revised" edition rules.

Returns the full list of 'revised edition' rules as created by Grand Nagus Zek under the influence of the Bajoran Prophets.

## Request:

```http
GET /rules/revised

```

## Response

```Javascript
[
  {
    "rule_number": number,
    "revised_editionÏ": string,
  },
]
```

- `rule_number` is the in-universe rule number and database ID.
- `revised_edition` is the canon text of the rule

## Get a specific revsied rule

Returns the text and details of a specified 'revised edition' rule, including the episodes in which that rule appeared.

## Request:

```http
GET /rule/:rule_id/revised

```

| Parameter  | Type     | Description                    |
| :--------- | :------- | :----------------------------- |
| `:rule_id` | `number` | The identifying rule number/ID |

## Response

```javascript
{
  "ruleDetails":
    {
      "rule_number": number,
      "revised_edition": string,
      "revised_note": string
    },
  "episodeDetails": [
    {
      "series_name": string,
      "episode_season": number,
      "episode_number": number,
      "episode_title": string,
      "episode_synopsis": string,
      "episode_date": string,
    },
  ]
}
```

- `ruleDetails`, an object containing the full details of the specified revised edition rule.
- - `rule_number` is the in-universe rule number and database ID for the specified rule.
  - `revised_edition` is the canon text of the specified revised edition rule
  - `revised_note` is a note about the context of the specified revised edition rule. `null` if there isn't one.
- `episodeDetails` is an array of episodes that the specified rule appeared in.
- - `series_name` is the full name of the series this episode was in.
  - `episode_season` is the season this episode was in.
  - `episode_number` is the episode number in the season that the specified rule appeared in.
  - `episode_title` is the title of the episode the specified rule appeared in
  - `episode_synopsis` is a brief description of the episode the specified rule appeared in.
  - `episode_date` is the original airdate for the episode the specified rule appeared in, in the format "1993-05-02T00:00:00.000Z".

Note: Returns 404 if a rule number that does not exist is specified.

## Get a list of all Star Trek episodes in which rules appear

Returns the full list of episodes as an array of objects in JSON format.

## Request:

```http
GET /episodes
```

## Reponse

```javascript
  {
    "episode_title": string,
    "series_name": string,
    "episode_season": number,
    "episode_number": number,
    "episode_synopsis": string,
    "episode_date": string,
    "episode_id": string,
    "episode_rules": [
      {
        "rule_number": number,
        "rule_text": string
      }
    ]
  },
```
- `episode_title` is the title of the episode the specified rule appeared in
- `series_name` is the full name of the series this episode was in.
- `episode_season` is the season this episode was in.
- `episode_number` is the episode number in the season that this episode appeared in.
- `episode_synopsis` is a brief description of the episode.
- `episode_date` is the original airdate for the episode in the format 1993-05-02T00:00:00.000Z".
- `episode_id` is the id string of the episode
- `episode_rules` is an array of the rules that appeared in this episode
- - `rule_number` is the in-universe rule number and database ID.
  - `rule_text` is the canon text of the rule


## Get a specific episode

## Request:

```http
GET /episodes/{episode_id}
```

| Parameter     | Type     | Description                    |
| :------------ | :------- | :----------------------------- |
| `:episode_id` | `string` | The episode ID String, the format `<series code>`-`<season number>`x`<episode number>`.  eg: Deep Space Nine, Season 3, Episode 11 is `ds9-3x11`|

Series codes:
```markdown
| Series Name         | Series Code |
| :------------------ | :---------- |
| The Next Generation | `tng`       |
| Deep Space Nine     | `ds9`       |
| Voyager             | `voy`       |
| Enterprise          | `ent`       |
| Discovery           | `dis`       |
| Lower Decks         | `ld`        |
| Prodigy             | `pro`       |
```

## Response: 

```javascript
{
  "episodeInfo": {
    "episode_id": string,
    "episode_title": string,
    "series_name": string,
    "episode_season": number,
    "episode_number": number,
    "episode_date": string,
    "episode_synopsis": string,
  },
  "episodeRules": [
    {
      "rule_number": number,
      "rule_text": string
    },
  ]
}
```

- `episodeInfo` - an object containing the episode details
- - `episode_id` is the id string of the episode
  - `episode_title` is the title of the episode the specified rule appeared in
  - `series_name` - the name of the series this episode is in
  - `episode_season` is the season this episode was in.
  - `episode_number` is the episode number in the season that this episode appeared in.
  - `episode_date` is the original airdate for the episode in the format 1993-05-02T00:00:00.000Z".
  - `episode_synopsis` is a brief description of the episode.
- `episode_rules` is an array of the rules that appeared in this episode
- - `rule_number` is the in-universe rule number and database ID.
  - `rule_text` is the canon text of the rule