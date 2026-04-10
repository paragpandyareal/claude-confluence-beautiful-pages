# Page Templates

Ready-to-use templates for common Confluence page types. Replace the brand colour `#5a7554` with the user's preferred colour if they've provided one.

## Table of Contents

1. [Requirements Validation Table](#template-1-requirements-validation-table)
2. [Overview / Hub Page](#template-2-overview--hub-page)
3. [Reference / Info Page](#template-3-reference--info-page)
4. [Questions / Input Page](#template-4-questions--input-page)
5. [Meeting Notes](#template-5-meeting-notes)
6. [Runbook / How-to Guide](#template-6-runbook--how-to-guide)
7. [Release Notes](#template-7-release-notes)
8. [Architecture / Technical Design](#template-8-architecture--technical-design)
9. [Retrospective](#template-9-retrospective)

---

## Template 1: Requirements Validation Table

Use for any document where you need reviewers to confirm requirements.

**Structure per section:**
1. Heading (H2) with section letter and name
2. Optional panel highlighting key changes
3. Table with branded header row
4. Each row has: Ref/Clause cell, Description cell, Response cell (with 3 status lozenges), Notes cell

**Header row:**
```json
{
  "type": "tableRow",
  "content": [
    { "type": "tableHeader", "attrs": { "background": "#5a7554" }, "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Ref / Clause", "marks": [{"type": "strong"}, {"type": "textColor", "attrs": {"color": "#ffffff"}}]}]}] },
    { "type": "tableHeader", "attrs": { "background": "#5a7554" }, "content": [{"type": "paragraph", "content": [{"type": "text", "text": "The Rule requires...", "marks": [{"type": "strong"}, {"type": "textColor", "attrs": {"color": "#ffffff"}}]}]}] },
    { "type": "tableHeader", "attrs": { "background": "#5a7554" }, "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Response", "marks": [{"type": "strong"}, {"type": "textColor", "attrs": {"color": "#ffffff"}}]}]}] },
    { "type": "tableHeader", "attrs": { "background": "#5a7554" }, "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Notes / Corrections", "marks": [{"type": "strong"}, {"type": "textColor", "attrs": {"color": "#ffffff"}}]}]}] }
  ]
}
```

**Response cell with status lozenges:**
```json
{
  "type": "tableCell",
  "attrs": {},
  "content": [
    {"type": "paragraph", "content": [
      {"type": "status", "attrs": {"text": "CONFIRMED", "color": "green", "localId": "xxx", "style": ""}},
      {"type": "text", "text": " "}
    ]},
    {"type": "paragraph", "content": [
      {"type": "status", "attrs": {"text": "NOT CORRECT", "color": "red", "localId": "yyy", "style": ""}},
      {"type": "text", "text": " "}
    ]},
    {"type": "paragraph", "content": [
      {"type": "status", "attrs": {"text": "MISSING", "color": "yellow", "localId": "zzz", "style": ""}}
    ]}
  ]
}
```

**Ref/Clause cell with grey clause reference:**
```json
{
  "type": "tableCell",
  "attrs": {},
  "content": [
    {"type": "paragraph", "content": [{"type": "text", "text": "A-01", "marks": [{"type": "strong"}]}]},
    {"type": "paragraph", "content": [{"type": "text", "text": "Section 3.1", "marks": [{"type": "textColor", "attrs": {"color": "#6b778c"}}]}]}
  ]
}
```

---

## Template 2: Overview / Hub Page

Use for landing pages, space homepages, and navigation hubs.

**Structure:**
1. Info panel with a brief overview of what this space/section covers
2. H2 "How this is organised" or "Sections"
3. Table with branded headers listing sections and descriptions
4. Optional H2 "Quick navigation" with links to key pages

**Example info panel:**
```json
{
  "type": "panel",
  "attrs": { "panelType": "info" },
  "content": [
    {
      "type": "paragraph",
      "content": [
        { "type": "text", "text": "Welcome: ", "marks": [{"type": "strong"}] },
        { "type": "text", "text": "This space contains all documentation for [project/team]. Use the sections below to navigate." }
      ]
    }
  ]
}
```

**Navigation table:**
```json
{
  "type": "table",
  "attrs": { "isNumberColumnEnabled": false, "layout": "default" },
  "content": [
    {
      "type": "tableRow",
      "content": [
        { "type": "tableHeader", "attrs": { "background": "#5a7554" }, "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Section", "marks": [{"type": "strong"}, {"type": "textColor", "attrs": {"color": "#ffffff"}}]}]}] },
        { "type": "tableHeader", "attrs": { "background": "#5a7554" }, "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Description", "marks": [{"type": "strong"}, {"type": "textColor", "attrs": {"color": "#ffffff"}}]}]}] }
      ]
    }
  ]
}
```

---

## Template 3: Reference / Info Page

Use for overviews, key dates, quick reference pages.

**Structure:**
1. H2 "Quick Reference"
2. Two-column table (Item | Detail) with branded header, using status lozenges for dates and statuses
3. Divider
4. H2 for each major section
5. Content with panels for callouts
6. Tables for structured data

---

## Template 4: Questions / Input Page

Use for gathering input from stakeholders.

**Structure:**
1. Tip panel explaining what's needed from the reader
2. Table with branded headers: #, Area, Question, Your response
3. Each row has a number, bold area name, question text, and empty response cell

**Example tip panel:**
```json
{
  "type": "panel",
  "attrs": { "panelType": "tip" },
  "content": [
    {
      "type": "paragraph",
      "content": [
        { "type": "text", "text": "Your input needed: ", "marks": [{"type": "strong"}] },
        { "type": "text", "text": "Please review the questions below and add your responses in the last column. Click on a cell to edit." }
      ]
    }
  ]
}
```

---

## Splitting Large Pages

If your ADF exceeds ~30KB (roughly 15-20 rows with status lozenges), split into child pages:
- Create a parent page with overview, how-to-use info, and a navigation table
- Create child pages for content sections (e.g. "Requirements A-F", "Requirements G-L")
- Each child page gets the same info panel at the top explaining how to use it

---

## Template 5: Meeting Notes

Use for recording meetings, standups, or workshops.

**Structure:**
1. Info panel with meeting title, date (date lozenge), and attendees
2. H2 "Agenda" with ordered list of agenda items
3. H2 "Discussion" with notes under each agenda item
4. H2 "Decisions" with decision list
5. H2 "Action Items" with task list

**Decisions section:**
```json
[
  { "type": "heading", "attrs": { "level": 2 }, "content": [{ "type": "text", "text": "Decisions" }] },
  {
    "type": "decisionList",
    "attrs": { "localId": "dec-list-1" },
    "content": [
      {
        "type": "decisionItem",
        "attrs": { "localId": "d-1", "state": "DECIDED" },
        "content": [{ "type": "text", "text": "Go with vendor B for the new platform" }]
      }
    ]
  }
]
```

**Action items section:**
```json
[
  { "type": "heading", "attrs": { "level": 2 }, "content": [{ "type": "text", "text": "Action Items" }] },
  {
    "type": "taskList",
    "attrs": { "localId": "actions-1" },
    "content": [
      {
        "type": "taskItem",
        "attrs": { "localId": "act-1", "state": "TODO" },
        "content": [
          { "type": "text", "text": "Update the project timeline ", "marks": [{ "type": "strong" }] },
          { "type": "text", "text": "- due by end of week" }
        ]
      },
      {
        "type": "taskItem",
        "attrs": { "localId": "act-2", "state": "TODO" },
        "content": [
          { "type": "text", "text": "Send stakeholder update email" }
        ]
      }
    ]
  }
]
```

---

## Template 6: Runbook / How-to Guide

Use for step-by-step operational procedures, troubleshooting guides, or onboarding instructions.

**Structure:**
1. Warning panel at top with prerequisites
2. H2 for each major step with ordered list for sub-steps
3. Code blocks for commands, configs, or scripts
4. Expand sections for detailed troubleshooting
5. Tip panels for gotchas and shortcuts

**Example with expand and code blocks:**
```json
[
  { "type": "heading", "attrs": { "level": 2 }, "content": [{ "type": "text", "text": "Step 1: Configure the environment" }] },
  {
    "type": "panel",
    "attrs": { "panelType": "warning" },
    "content": [
      { "type": "paragraph", "content": [
        { "type": "text", "text": "Prerequisite: ", "marks": [{ "type": "strong" }] },
        { "type": "text", "text": "You need admin access to the server before starting." }
      ]}
    ]
  },
  {
    "type": "orderedList",
    "attrs": { "order": 1 },
    "content": [
      {
        "type": "listItem",
        "content": [
          { "type": "paragraph", "content": [{ "type": "text", "text": "SSH into the server" }] },
          {
            "type": "codeBlock",
            "attrs": { "language": "bash" },
            "content": [{ "type": "text", "text": "ssh admin@server.example.com" }]
          }
        ]
      },
      {
        "type": "listItem",
        "content": [
          { "type": "paragraph", "content": [{ "type": "text", "text": "Check the service status" }] },
          {
            "type": "codeBlock",
            "attrs": { "language": "bash" },
            "content": [{ "type": "text", "text": "systemctl status myservice" }]
          }
        ]
      }
    ]
  },
  {
    "type": "expand",
    "attrs": { "title": "Troubleshooting: service won't start" },
    "content": [
      {
        "type": "panel",
        "attrs": { "panelType": "tip" },
        "content": [
          { "type": "paragraph", "content": [
            { "type": "text", "text": "Check the logs first: ", "marks": [{ "type": "strong" }] },
            { "type": "text", "text": "Most startup failures are caused by missing config files or port conflicts." }
          ]}
        ]
      },
      {
        "type": "codeBlock",
        "attrs": { "language": "bash" },
        "content": [{ "type": "text", "text": "journalctl -u myservice --since '5 min ago'" }]
      }
    ]
  }
]
```

---

## Template 7: Release Notes

Use for software releases, product updates, or changelog pages.

**Structure:**
1. Info panel with version number, release date (date lozenge), and summary
2. H2 sections for New Features, Bug Fixes, and Changes
3. Status lozenges for each category (NEW green, FIXED blue, CHANGED yellow)

**Example:**
```json
[
  {
    "type": "panel",
    "attrs": { "panelType": "info" },
    "content": [
      { "type": "paragraph", "content": [
        { "type": "text", "text": "Version 2.4.0 ", "marks": [{ "type": "strong" }] },
        { "type": "text", "text": "- Released " },
        { "type": "date", "attrs": { "timestamp": "1719792000000" } }
      ]}
    ]
  },
  { "type": "heading", "attrs": { "level": 2 }, "content": [{ "type": "text", "text": "New Features" }] },
  {
    "type": "bulletList",
    "content": [
      {
        "type": "listItem",
        "content": [
          { "type": "paragraph", "content": [
            { "type": "status", "attrs": { "text": "NEW", "color": "green", "localId": "r1", "style": "" } },
            { "type": "text", "text": " Dashboard redesign with real-time charts" }
          ]}
        ]
      },
      {
        "type": "listItem",
        "content": [
          { "type": "paragraph", "content": [
            { "type": "status", "attrs": { "text": "NEW", "color": "green", "localId": "r2", "style": "" } },
            { "type": "text", "text": " Export to PDF support" }
          ]}
        ]
      }
    ]
  },
  { "type": "heading", "attrs": { "level": 2 }, "content": [{ "type": "text", "text": "Bug Fixes" }] },
  {
    "type": "bulletList",
    "content": [
      {
        "type": "listItem",
        "content": [
          { "type": "paragraph", "content": [
            { "type": "status", "attrs": { "text": "FIXED", "color": "blue", "localId": "r3", "style": "" } },
            { "type": "text", "text": " Login timeout issue on slow connections" }
          ]}
        ]
      }
    ]
  }
]
```

---

## Template 8: Architecture / Technical Design

Use for system architecture docs, technical design proposals, or API documentation.

**Structure:**
1. Info panel with document purpose and audience
2. Column layout (67/33) with overview on left and quick reference table on right
3. H2 sections for each component with code blocks for configs and APIs
4. Expand sections for detailed specs

**Example with column layout:**
```json
[
  {
    "type": "panel",
    "attrs": { "panelType": "info" },
    "content": [
      { "type": "paragraph", "content": [
        { "type": "text", "text": "Audience: ", "marks": [{ "type": "strong" }] },
        { "type": "text", "text": "Engineering team. This document describes the architecture of the notification service." }
      ]}
    ]
  },
  {
    "type": "layoutSection",
    "content": [
      {
        "type": "layoutColumn",
        "attrs": { "width": 66.66 },
        "content": [
          { "type": "heading", "attrs": { "level": 2 }, "content": [{ "type": "text", "text": "Overview" }] },
          { "type": "paragraph", "content": [{ "type": "text", "text": "The notification service handles email, SMS, and push notifications through a unified API. It uses a message queue for reliability and supports templates for consistent formatting." }] }
        ]
      },
      {
        "type": "layoutColumn",
        "attrs": { "width": 33.33 },
        "content": [
          { "type": "heading", "attrs": { "level": 3 }, "content": [{ "type": "text", "text": "Quick Reference" }] },
          {
            "type": "table",
            "attrs": { "isNumberColumnEnabled": false, "layout": "default" },
            "content": [
              {
                "type": "tableRow",
                "content": [
                  { "type": "tableHeader", "attrs": { "background": "#5a7554" }, "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Detail", "marks": [{ "type": "strong" }, { "type": "textColor", "attrs": { "color": "#ffffff" } }] }] }] },
                  { "type": "tableHeader", "attrs": { "background": "#5a7554" }, "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Value", "marks": [{ "type": "strong" }, { "type": "textColor", "attrs": { "color": "#ffffff" } }] }] }] }
                ]
              },
              {
                "type": "tableRow",
                "content": [
                  { "type": "tableCell", "attrs": {}, "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Owner" }] }] },
                  { "type": "tableCell", "attrs": {}, "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Platform Team" }] }] }
                ]
              },
              {
                "type": "tableRow",
                "content": [
                  { "type": "tableCell", "attrs": {}, "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Status" }] }] },
                  { "type": "tableCell", "attrs": {}, "content": [{ "type": "paragraph", "content": [{ "type": "status", "attrs": { "text": "IN PRODUCTION", "color": "green", "localId": "arch1", "style": "" } }] }] }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "type": "expand",
    "attrs": { "title": "API endpoint details" },
    "content": [
      {
        "type": "codeBlock",
        "attrs": { "language": "json" },
        "content": [{ "type": "text", "text": "POST /api/v1/notifications\n{\n  \"type\": \"email\",\n  \"to\": \"user@example.com\",\n  \"template\": \"welcome\",\n  \"data\": { \"name\": \"Jane\" }\n}" }]
      }
    ]
  }
]
```

---

## Template 9: Retrospective

Use for sprint retrospectives, project post-mortems, or after-action reviews.

**Structure:**
1. Info panel with retro date and team name
2. Three panels: success for "What went well", warning for "What didn't go well", info for "What to try next"
3. Dividers between sections
4. H2 "Action Items" with task list

**Example:**
```json
[
  {
    "type": "panel",
    "attrs": { "panelType": "info" },
    "content": [
      { "type": "paragraph", "content": [
        { "type": "text", "text": "Sprint 14 Retrospective ", "marks": [{ "type": "strong" }] },
        { "type": "date", "attrs": { "timestamp": "1719792000000" } }
      ]}
    ]
  },
  { "type": "rule" },
  {
    "type": "panel",
    "attrs": { "panelType": "success" },
    "content": [
      { "type": "paragraph", "content": [{ "type": "text", "text": "What went well", "marks": [{ "type": "strong" }] }] },
      { "type": "bulletList", "content": [
        { "type": "listItem", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Shipped the new dashboard on time" }] }] },
        { "type": "listItem", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Cross-team collaboration on the API was smooth" }] }] }
      ]}
    ]
  },
  {
    "type": "panel",
    "attrs": { "panelType": "warning" },
    "content": [
      { "type": "paragraph", "content": [{ "type": "text", "text": "What didn't go well", "marks": [{ "type": "strong" }] }] },
      { "type": "bulletList", "content": [
        { "type": "listItem", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Testing was rushed in the last two days" }] }] },
        { "type": "listItem", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Requirements changed mid-sprint without re-estimation" }] }] }
      ]}
    ]
  },
  {
    "type": "panel",
    "attrs": { "panelType": "info" },
    "content": [
      { "type": "paragraph", "content": [{ "type": "text", "text": "What to try next", "marks": [{ "type": "strong" }] }] },
      { "type": "bulletList", "content": [
        { "type": "listItem", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Start testing earlier, allocate 20% of sprint to QA" }] }] },
        { "type": "listItem", "content": [{ "type": "paragraph", "content": [{ "type": "text", "text": "Flag scope changes in standup immediately" }] }] }
      ]}
    ]
  },
  { "type": "rule" },
  { "type": "heading", "attrs": { "level": 2 }, "content": [{ "type": "text", "text": "Action Items" }] },
  {
    "type": "taskList",
    "attrs": { "localId": "retro-tasks-1" },
    "content": [
      {
        "type": "taskItem",
        "attrs": { "localId": "rt-1", "state": "TODO" },
        "content": [{ "type": "text", "text": "Add QA checkpoint to sprint planning template" }]
      },
      {
        "type": "taskItem",
        "attrs": { "localId": "rt-2", "state": "TODO" },
        "content": [{ "type": "text", "text": "Create a scope-change escalation process" }]
      }
    ]
  }
]
```
