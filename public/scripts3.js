window.onload = function () {
  const ui = SwaggerUIBundle({
    spec: {
      openapi: "3.0.1",
      info: {
        title: "Rules of Acquisition",
        description: "",
        version: "1.0.0",
      },
      tags: [],
      paths: {
        "/rules": {
          get: {
            summary: "/rules",
            deprecated: false,
            description:
              "Returns a list of all of the known Ferengi Rules of Acquisition",
            tags: [],
            parameters: [],
            responses: {
              200: {
                description: "",
                content: {
                  "application/json": {
                    schema: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          rule_number: { type: "integer" },
                          rule_text: { type: "string" },
                        },
                        required: ["rule_number", "rule_text"],
                        "x-apidog-orders": ["rule_number", "rule_text"],
                        "x-apidog-ignore-properties": [],
                      },
                    },
                    examples: {
                      1: {
                        summary: "Success",
                        value:
                          '[\n  {\n    "rule_number": 0,\n    "rule_text": "When no appropriate rule applies, make one up."\n  },\n]',
                      },
                    },
                  },
                },
                headers: {},
                "x-apidog-name": "Success",
              },
            },
            security: [],
            "x-apidog-folder": "",
            "x-apidog-status": "released",
            "x-run-in-apidog":
              "https://app.apidog.com/web/project/711531/apis/api-11091539-run",
          },
        },
        "/rules/revised": {
          get: {
            summary: "/rules/revised",
            deprecated: false,
            description:
              "Returns a list of all of the known Revised Ferengi Rules of Acquisition",
            tags: [],
            parameters: [],
            responses: {
              200: {
                description: "",
                content: {
                  "application/json": {
                    schema: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          rule_number: { type: "integer" },
                          revised_edition: { type: "string" },
                        },
                        required: ["rule_number", "revised_edition"],
                        "x-apidog-orders": ["rule_number", "revised_edition"],
                        "x-apidog-ignore-properties": [],
                      },
                    },
                    examples: {
                      1: {
                        summary: "Success",
                        value:
                          '[\n  {\n    "rule_number": 1,\n    "revised_edition": "If they want their money back, give it to them."\n  },\n]',
                      },
                    },
                  },
                },
                headers: {},
                "x-apidog-name": "Success",
              },
            },
            security: [],
            "x-apidog-folder": "",
            "x-apidog-status": "released",
            "x-run-in-apidog":
              "https://app.apidog.com/web/project/711531/apis/api-11091601-run",
          },
        },
        "/rules/{rule_id}": {
          get: {
            summary: "/rules/{rule_id}",
            deprecated: false,
            description:
              "Returns the details for a specified Rule of Acquisition and the Star Trek episode(s) in which it appeared.",
            tags: [],
            parameters: [
              {
                name: "rule_id",
                in: "path",
                description: "",
                required: true,
                schema: { type: "string" },
              },
            ],
            responses: {
              200: {
                description: "",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        ruleDetails: {
                          type: "object",
                          properties: {
                            rule_number: { type: "integer" },
                            rule_text: { type: "string" },
                            rule_variation: { type: "null" },
                            rule_note: { type: "null" },
                          },
                          required: [
                            "rule_number",
                            "rule_text",
                            "rule_variation",
                            "rule_note",
                          ],
                          "x-apidog-orders": [
                            "rule_number",
                            "rule_text",
                            "rule_variation",
                            "rule_note",
                          ],
                          "x-apidog-ignore-properties": [],
                        },
                        episodeDetails: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              series_name: { type: "string" },
                              episode_season: { type: "integer" },
                              episode_number: { type: "integer" },
                              episode_title: { type: "string" },
                              episode_synopsis: { type: "string" },
                              episode_date: { type: "string" },
                            },
                            required: [
                              "series_name",
                              "episode_season",
                              "episode_number",
                              "episode_title",
                              "episode_synopsis",
                              "episode_date",
                            ],
                            "x-apidog-orders": [
                              "series_name",
                              "episode_season",
                              "episode_number",
                              "episode_title",
                              "episode_synopsis",
                              "episode_date",
                            ],
                            "x-apidog-ignore-properties": [],
                          },
                        },
                      },
                      required: ["ruleDetails", "episodeDetails"],
                      "x-apidog-orders": ["ruleDetails", "episodeDetails"],
                      "x-apidog-ignore-properties": [],
                    },
                    examples: {
                      1: {
                        summary: "Success",
                        value: {
                          ruleDetails: {
                            rule_number: 1,
                            rule_text:
                              "Once you have their money, you never give it back.",
                            rule_variation: null,
                            rule_note: null,
                          },
                          episodeDetails: [
                            {
                              series_name: "Star Trek: Deep Space Nine",
                              episode_season: 1,
                              episode_number: 11,
                              episode_title: "The Nagus",
                              episode_synopsis:
                                "With the sudden death of Grand Nagus Zek, Quark becomes the new leader of the Ferengi Alliance, but he also becomes a target for murder.",
                              episode_date: "1993-03-21T00:00:00.000Z",
                            },
                            {
                              series_name: "Star Trek: Deep Space Nine",
                              episode_season: 3,
                              episode_number: 14,
                              episode_title: "Heart of Stone",
                              episode_synopsis:
                                "Searching for a Maquis raider on an unstable moon, Kira is trapped in an expanding crystal formation that threatens to engulf her if Odo cannot set her free. Meanwhile, Nog attempts to persuade a skeptical Commander Benjamin Sisko to write him a letter of recommendation to join Starfleet Academy.",
                              episode_date: "1995-02-06T00:00:00.000Z",
                            },
                            {
                              series_name: "Star Trek: Deep Space Nine",
                              episode_season: 3,
                              episode_number: 16,
                              episode_title: "Prophet Motive",
                              episode_synopsis:
                                "Grand Nagus Zek has become a philanthropist, and Quark worries that he may have gone insane; Bashir is nominated for a prestigious medical award.",
                              episode_date: "1995-02-20T00:00:00.000Z",
                            },
                            {
                              series_name: "Star Trek: Prodigy",
                              episode_season: 1,
                              episode_number: 7,
                              episode_title: "First Con-tact",
                              episode_synopsis:
                                "When a mentor from Dal's past persuades him to use their Federation cover for personal gain, they quickly discover Starfleet has protocols for a reason.",
                              episode_date: "2022-01-13T00:00:00.000Z",
                            },
                          ],
                        },
                      },
                    },
                  },
                },
                headers: {},
                "x-apidog-name": "Success",
              },
            },
            security: [],
            "x-apidog-folder": "",
            "x-apidog-status": "released",
            "x-run-in-apidog":
              "https://app.apidog.com/web/project/711531/apis/api-11091545-run",
          },
        },
        "/rules/{rule_id}/revised": {
          get: {
            summary: "/rules/{rule_id}/revised",
            deprecated: false,
            description:
              "Returns the details for a specified Revised Rule of Acquisition and the Star Trek episode(s) in which it appeared.",
            tags: [],
            parameters: [
              {
                name: "rule_id",
                in: "path",
                description: "",
                required: true,
                schema: { type: "string" },
              },
            ],
            responses: {
              200: {
                description: "",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        ruleDetails: {
                          type: "object",
                          properties: {
                            rule_number: { type: "integer" },
                            revised_edition: { type: "string" },
                            revised_note: { type: "string" },
                          },
                          required: [
                            "rule_number",
                            "revised_edition",
                            "revised_note",
                          ],
                          "x-apidog-orders": [
                            "rule_number",
                            "revised_edition",
                            "revised_note",
                          ],
                          "x-apidog-ignore-properties": [],
                        },
                        episodeDetails: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              series_name: { type: "string" },
                              episode_season: { type: "integer" },
                              episode_number: { type: "integer" },
                              episode_title: { type: "string" },
                              episode_synopsis: { type: "string" },
                              episode_date: { type: "string" },
                            },
                            "x-apidog-orders": [
                              "series_name",
                              "episode_season",
                              "episode_number",
                              "episode_title",
                              "episode_synopsis",
                              "episode_date",
                            ],
                            "x-apidog-ignore-properties": [],
                          },
                        },
                      },
                      required: ["ruleDetails", "episodeDetails"],
                      "x-apidog-orders": ["ruleDetails", "episodeDetails"],
                      "x-apidog-ignore-properties": [],
                    },
                    examples: {
                      1: {
                        summary: "Success",
                        value: {
                          ruleDetails: {
                            rule_number: 10,
                            revised_edition: "Greed is dead.",
                            revised_note:
                              "The revised edition was written by Grand Nagus Zek while temporarily turned into a philanthropist under the influence of the Bajoran Prophets",
                          },
                          episodeDetails: [
                            {
                              series_name: "Star Trek: Deep Space Nine",
                              episode_season: 3,
                              episode_number: 16,
                              episode_title: "Prophet Motive",
                              episode_synopsis:
                                "Grand Nagus Zek has become a philanthropist, and Quark worries that he may have gone insane; Bashir is nominated for a prestigious medical award.",
                              episode_date: "1995-02-20T00:00:00.000Z",
                            },
                          ],
                        },
                      },
                    },
                  },
                },
                headers: {},
                "x-apidog-name": "Success",
              },
            },
            security: [],
            "x-apidog-folder": "",
            "x-apidog-status": "released",
            "x-run-in-apidog":
              "https://app.apidog.com/web/project/711531/apis/api-11091614-run",
          },
        },
        "/episodes": {
          get: {
            summary: "/episodes",
            deprecated: false,
            description:
              "Returns a list of Star Trek episodes in which Rules of Acquisition have appeared and the Rule(s) of Acquisition that appeared therein ",
            tags: [],
            parameters: [],
            responses: {
              200: {
                description: "",
                content: {
                  "application/json": {
                    schema: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          episode_title: { type: "string" },
                          series_name: { type: "string" },
                          episode_season: { type: "integer" },
                          episode_number: { type: "integer" },
                          episode_synopsis: { type: "string" },
                          episode_date: { type: "string" },
                          episode_rules: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                rule_number: { type: "integer" },
                                rule_text: { type: "string" },
                              },
                              required: ["rule_number", "rule_text"],
                              "x-apidog-orders": ["rule_number", "rule_text"],
                              "x-apidog-ignore-properties": [],
                            },
                          },
                        },
                        required: [
                          "episode_title",
                          "series_name",
                          "episode_season",
                          "episode_number",
                          "episode_synopsis",
                          "episode_date",
                          "episode_rules",
                        ],
                        "x-apidog-orders": [
                          "episode_title",
                          "series_name",
                          "episode_season",
                          "episode_number",
                          "episode_synopsis",
                          "episode_date",
                          "episode_rules",
                        ],
                        "x-apidog-ignore-properties": [],
                      },
                    },
                    examples: {
                      1: {
                        summary: "Success",
                        value:
                          '[\n  {\n    "episode_title": "The Perfect Mate",\n    "series_name": "Star Trek: The Next Generation",\n    "episode_season": 5,\n    "episode_number": 21,\n    "episode_synopsis": "Picard serves as host for a peace treaty between two warring planets, but he may be unable to resist the reconciliation "gift" – a beautiful empathic metamorph who is to be presented by one leader as the other\'s wife.",\n    "episode_date": "1992-04-27T00:00:00.000Z",\n    "episode_rules": [\n      {\n        "rule_number": 35,\n        "rule_text": "Peace is good for business."\n      }\n    ]\n  },\n]',
                      },
                    },
                  },
                },
                headers: {},
                "x-apidog-name": "Success",
              },
            },
            security: [],
            "x-apidog-folder": "",
            "x-apidog-status": "released",
            "x-run-in-apidog":
              "https://app.apidog.com/web/project/711531/apis/api-11091574-run",
          },
        },
        "/episodes/{episode_id}": {
          get: {
            summary: "/episodes/{episode_id}",
            deprecated: false,
            description:
              "Returns the details fore a specified Star Trek episode, and the Rule(s) of Acquisition that appeared therein. \nEpisode ID schema is the shortcode for the series, hyphen, season number, x, episode number. \ne.g.: Deep Space Nine Season 3 Episode 11, `ds9-3x11`\n\nThe Next Generation: `TNG`\nDeep Space Nine: `DS9`\nVoyager: `VOY`\nEnterprise: `ENT`\nLower Decks: `LD`",
            tags: [],
            parameters: [
              {
                name: "episode_id",
                in: "path",
                description: "",
                required: true,
                schema: { type: "string" },
              },
            ],
            responses: {
              200: {
                description: "",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        episodeInfo: {
                          type: "object",
                          properties: {
                            episode_id: { type: "string" },
                            episode_title: { type: "string" },
                            series_name: { type: "string" },
                            episode_season: { type: "integer" },
                            episode_number: { type: "integer" },
                            episode_date: { type: "string" },
                            episode_synopsis: { type: "string" },
                          },
                          required: [
                            "episode_id",
                            "episode_title",
                            "series_name",
                            "episode_season",
                            "episode_number",
                            "episode_date",
                            "episode_synopsis",
                          ],
                          "x-apidog-orders": [
                            "episode_id",
                            "episode_title",
                            "series_name",
                            "episode_season",
                            "episode_number",
                            "episode_date",
                            "episode_synopsis",
                          ],
                          "x-apidog-ignore-properties": [],
                        },
                        episodeRules: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              rule_number: { type: "integer" },
                              rule_text: { type: "string" },
                            },
                            required: ["rule_number", "rule_text"],
                            "x-apidog-orders": ["rule_number", "rule_text"],
                            "x-apidog-ignore-properties": [],
                          },
                        },
                      },
                      required: ["episodeInfo", "episodeRules"],
                      "x-apidog-orders": ["episodeInfo", "episodeRules"],
                      "x-apidog-ignore-properties": [],
                    },
                    examples: {
                      1: {
                        summary: "Success",
                        value: {
                          episodeInfo: {
                            episode_id: "ds9-3x11",
                            episode_title: "Past Tense, Part I",
                            series_name: "Star Trek: Deep Space Nine",
                            episode_season: 3,
                            episode_number: 11,
                            episode_date: "1995-01-08T00:00:00.000Z",
                            episode_synopsis:
                              "Trapped three hundred years in the past, Sisko, Bashir, and Dax find themselves confronting one of the darkest hours in Earth's history...",
                          },
                          episodeRules: [
                            {
                              rule_number: 111,
                              rule_text:
                                "Treat people in your debt like family... exploit them.",
                            },
                            {
                              rule_number: 217,
                              rule_text: "You can't free a fish from water.",
                            },
                          ],
                        },
                      },
                    },
                  },
                },
                headers: {},
                "x-apidog-name": "Success",
              },
            },
            security: [],
            "x-apidog-folder": "",
            "x-apidog-status": "released",
            "x-run-in-apidog":
              "https://app.apidog.com/web/project/711531/apis/api-11091575-run",
          },
        },
      },
      components: { schemas: {}, securitySchemes: {} },
      servers: [
        {
          url: "https://rulesofacquisition.herokuapp.com",
          description: "Prod Env",
        },
      ],
    },
    dom_id: "#swagger-ui",
    deepLinking: true,
    presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
    plugins: [SwaggerUIBundle.plugins.DownloadUrl],
    layout: "StandaloneLayout",
    showCommonExtensions: true,
  });
  // End Swagger UI call region

  window.ui = ui;
};
