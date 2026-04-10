/**
 * ADF Helper Functions for Confluence Beautiful Pages
 *
 * Use these helper functions when building large ADF documents programmatically.
 * They make constructing the JSON much cleaner and less error-prone.
 *
 * Usage:
 *   node adf-helpers.js
 *   (modify the example at the bottom to build your document)
 */

// Default brand colour - replace with user's preferred colour
const BRAND_COLOUR = "#5a7554";
const HEADER_TEXT_COLOUR = "#ffffff";

/**
 * Create a table header cell with brand colour background and white bold text
 */
function th(text, brandColour = BRAND_COLOUR) {
  return {
    type: "tableHeader",
    attrs: { background: brandColour },
    content: [{
      type: "paragraph",
      content: [{
        type: "text", text: text,
        marks: [
          { type: "strong" },
          { type: "textColor", attrs: { color: HEADER_TEXT_COLOUR } }
        ]
      }]
    }]
  };
}

/**
 * Create a regular table cell
 * Accepts a string (plain text) or an array of ADF paragraph nodes
 */
function td(content) {
  return {
    type: "tableCell",
    attrs: {},
    content: Array.isArray(content) ? content :
      [{ type: "paragraph", content: [{ type: "text", text: content }] }]
  };
}

/**
 * Create a table row from cells
 */
function tr(...cells) {
  return { type: "tableRow", content: cells };
}

/**
 * Create a complete table with wide layout
 */
function table(...rows) {
  return {
    type: "table",
    attrs: { isNumberColumnEnabled: false, layout: "wide" },
    content: rows
  };
}

/**
 * Create a heading (default level 2)
 */
function h2(text) {
  return { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text }] };
}

/**
 * Create a heading level 3
 */
function h3(text) {
  return { type: "heading", attrs: { level: 3 }, content: [{ type: "text", text }] };
}

/**
 * Create a panel (info, note, warning, error, tip, success)
 */
function panel(panelType, text) {
  return {
    type: "panel",
    attrs: { panelType },
    content: [{ type: "paragraph", content: [{ type: "text", text }] }]
  };
}

/**
 * Create a panel with bold title and description
 */
function panelWithTitle(panelType, title, description) {
  return {
    type: "panel",
    attrs: { panelType },
    content: [{
      type: "paragraph",
      content: [
        { type: "text", text: title + ": ", marks: [{ type: "strong" }] },
        { type: "text", text: description }
      ]
    }]
  };
}

/**
 * Create a status lozenge
 * Colours: green, yellow, red, blue, purple
 */
function status(text, color, localId) {
  return {
    type: "status",
    attrs: {
      text,
      color,
      localId: localId || Math.random().toString(36).substr(2, 8),
      style: ""
    }
  };
}

/**
 * Create a horizontal rule (divider)
 */
function rule() {
  return { type: "rule" };
}

/**
 * Create a paragraph with plain text
 */
function p(text) {
  return { type: "paragraph", content: [{ type: "text", text }] };
}

/**
 * Create bold text (inline node, use inside a paragraph's content array)
 */
function bold(text) {
  return { type: "text", text, marks: [{ type: "strong" }] };
}

/**
 * Create grey text (inline node, use inside a paragraph's content array)
 */
function grey(text) {
  return { type: "text", text, marks: [{ type: "textColor", attrs: { color: "#6b778c" } }] };
}

/**
 * Wrap the content array into a complete ADF document
 */
function doc(...content) {
  return {
    version: 1,
    type: "doc",
    content: content
  };
}

/**
 * Create an expand/collapse section
 */
function expand(title, ...content) {
  return { type: "expand", attrs: { title }, content };
}

/**
 * Create a bullet list from items
 * Each item can be a string (wrapped automatically) or an array of ADF nodes
 */
function ul(...items) {
  return {
    type: "bulletList",
    content: items.map(item => li(item))
  };
}

/**
 * Create an ordered list from items
 */
function ol(...items) {
  return {
    type: "orderedList",
    attrs: { order: 1 },
    content: items.map(item => li(item))
  };
}

/**
 * Create a list item
 * Accepts a string (plain text) or an array of ADF block nodes
 */
function li(content) {
  return {
    type: "listItem",
    content: typeof content === "string"
      ? [{ type: "paragraph", content: [{ type: "text", text: content }] }]
      : Array.isArray(content) ? content : [content]
  };
}

/**
 * Create a task list
 */
function taskList(localId, ...items) {
  return { type: "taskList", attrs: { localId }, content: items };
}

/**
 * Create a task item
 * state: "TODO" or "DONE"
 */
function taskItem(localId, text, state = "TODO") {
  return {
    type: "taskItem",
    attrs: { localId, state },
    content: [{ type: "text", text }]
  };
}

/**
 * Create a decision list
 */
function decisionList(localId, ...items) {
  return { type: "decisionList", attrs: { localId }, content: items };
}

/**
 * Create a decision item
 */
function decisionItem(localId, text, state = "DECIDED") {
  return {
    type: "decisionItem",
    attrs: { localId, state },
    content: [{ type: "text", text }]
  };
}

/**
 * Create a code block
 * language: "python", "javascript", "bash", "json", "sql", etc.
 */
function codeBlock(text, language = "") {
  return {
    type: "codeBlock",
    attrs: { language },
    content: [{ type: "text", text }]
  };
}

/**
 * Create a linked text node (inline, use inside a paragraph's content array)
 */
function link(text, href) {
  return {
    type: "text", text,
    marks: [{ type: "link", attrs: { href } }]
  };
}

/**
 * Create an emoji (inline, use inside a paragraph's content array)
 */
function emoji(shortName, id, text) {
  return { type: "emoji", attrs: { shortName, id, text } };
}

/**
 * Create a date lozenge (inline, use inside a paragraph's content array)
 * timestamp in milliseconds (Unix epoch * 1000)
 */
function dateLozenge(timestamp) {
  return { type: "date", attrs: { timestamp: String(timestamp) } };
}

/**
 * Create a mention (inline, use inside a paragraph's content array)
 */
function mention(id, displayName) {
  return { type: "mention", attrs: { id, text: "@" + displayName, accessLevel: "" } };
}

/**
 * Create an external image
 * layout: "center", "wide", "full-width", "wrap-left", "wrap-right"
 */
function media(url, layout = "center") {
  return {
    type: "mediaSingle",
    attrs: { layout },
    content: [{
      type: "media",
      attrs: { type: "external", url }
    }]
  };
}

/**
 * Create a column layout section
 * Pass layoutColumn() calls as arguments
 */
function layoutSection(...columns) {
  return { type: "layoutSection", content: columns };
}

/**
 * Create a layout column with a width percentage
 * Common widths: 50 (half), 33.33 (third), 66.66 (two-thirds)
 */
function layoutColumn(width, ...content) {
  return { type: "layoutColumn", attrs: { width }, content };
}

/**
 * Create underlined text (inline, use inside a paragraph's content array)
 */
function underline(text) {
  return { type: "text", text, marks: [{ type: "underline" }] };
}

/**
 * Create strikethrough text (inline, use inside a paragraph's content array)
 */
function strike(text) {
  return { type: "text", text, marks: [{ type: "strike" }] };
}

/**
 * Create inline code text (inline, use inside a paragraph's content array)
 */
function inlineCode(text) {
  return { type: "text", text, marks: [{ type: "code" }] };
}

/**
 * Create a hard break (line break within a paragraph)
 */
function hardBreak() {
  return { type: "hardBreak" };
}

// ============================================================
// Example usage - modify this to build your document
// ============================================================

const myDoc = doc(
  panelWithTitle("info", "Overview", "This page contains the project summary and key milestones."),
  rule(),
  h2("Project Milestones"),
  table(
    tr(th("Milestone"), th("Date"), th("Status")),
    tr(
      td("Phase 1 Complete"),
      td("15 Jan 2026"),
      td([{ type: "paragraph", content: [status("COMPLETE", "green")] }])
    ),
    tr(
      td("Phase 2 In Progress"),
      td("30 Mar 2026"),
      td([{ type: "paragraph", content: [status("IN PROGRESS", "blue")] }])
    )
  ),
  rule(),
  h2("Key Links"),
  ul("Project charter", "Technical design doc", "Test plan"),
  rule(),
  h2("Detailed Notes"),
  expand("Click to see implementation details",
    p("The migration will happen in three phases."),
    ol("Database migration", "API switchover", "Frontend deployment"),
    codeBlock("npm run migrate --env production", "bash")
  ),
  rule(),
  h2("Action Items"),
  taskList("demo-tasks",
    taskItem("t1", "Review the migration plan"),
    taskItem("t2", "Update the runbook", "DONE")
  ),
  rule(),
  h2("Decisions"),
  decisionList("demo-decisions",
    decisionItem("d1", "We will use PostgreSQL instead of MySQL")
  ),
  rule(),
  panelWithTitle("warning", "Deadline", "Phase 2 must be completed before the end of Q1.")
);

// Output the ADF JSON
console.log(JSON.stringify(myDoc, null, 2));
