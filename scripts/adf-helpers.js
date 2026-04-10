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
    ),
    tr(
      td("Phase 3 Planning"),
      td("TBD"),
      td([{ type: "paragraph", content: [status("NOT STARTED", "yellow")] }])
    )
  ),
  rule(),
  h2("Notes"),
  panelWithTitle("warning", "Deadline", "Phase 2 must be completed before the end of Q1."),
  p("Contact the project lead for any questions about timelines.")
);

// Output the ADF JSON
console.log(JSON.stringify(myDoc, null, 2));
