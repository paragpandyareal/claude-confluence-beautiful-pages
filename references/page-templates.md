# Page Templates

Ready-to-use templates for common Confluence page types. Replace the brand colour `#5a7554` with the user's preferred colour if they've provided one.

## Table of Contents

1. [Requirements Validation Table](#template-1-requirements-validation-table)
2. [Overview / Hub Page](#template-2-overview--hub-page)
3. [Reference / Info Page](#template-3-reference--info-page)
4. [Questions / Input Page](#template-4-questions--input-page)

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
