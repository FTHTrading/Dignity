/**
 * Dignity Institutional PDF Design System
 *
 * Shared primitives, palette, and layout components used by all five
 * downloadable documents. Produces consistent executive-grade print quality.
 *
 * Stack: @react-pdf/renderer — purely server-side, no DOM dependency.
 */

import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// ─── Palette ────────────────────────────────────────────────────────────────
export const C = {
  obsidian:    "#0d0d0f",
  dark:        "#111115",
  surface:     "#18181c",
  border:      "#2a2a32",
  borderLight: "#38383f",
  gold:        "#c9a84c",
  goldLight:   "#e2c675",
  goldMuted:   "#8c7035",
  white:       "#f4f4f5",
  body:        "#a1a1aa",
  muted:       "#71717a",
  faint:       "#3f3f46",
  green:       "#4ade80",
  greenMuted:  "#166534",
};

// ─── Shared Styles ──────────────────────────────────────────────────────────
export const S = StyleSheet.create({
  // Page
  page: {
    backgroundColor: C.obsidian,
    paddingTop: 56,
    paddingBottom: 64,
    paddingHorizontal: 52,
    fontFamily: "Helvetica",
  },

  // Cover block
  coverPage: {
    backgroundColor: C.obsidian,
    padding: 0,
  },
  coverHero: {
    backgroundColor: C.dark,
    padding: 52,
    flexGrow: 1,
    justifyContent: "flex-end",
    borderBottomWidth: 1,
    borderBottomColor: C.gold,
    borderBottomStyle: "solid",
  },
  coverFooter: {
    paddingHorizontal: 52,
    paddingVertical: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  // Typography
  eyebrow: {
    fontSize: 7,
    letterSpacing: 3,
    color: C.goldMuted,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  h1: {
    fontSize: 28,
    color: C.white,
    fontFamily: "Helvetica-Bold",
    lineHeight: 1.2,
    marginBottom: 6,
  },
  h2: {
    fontSize: 16,
    color: C.white,
    fontFamily: "Helvetica-Bold",
    marginBottom: 12,
    marginTop: 28,
  },
  h3: {
    fontSize: 11,
    color: C.goldLight,
    fontFamily: "Helvetica-Bold",
    marginBottom: 6,
    marginTop: 18,
  },
  subtitle: {
    fontSize: 13,
    color: C.body,
    lineHeight: 1.5,
    maxWidth: 380,
    marginBottom: 20,
  },
  body: {
    fontSize: 9.5,
    color: C.body,
    lineHeight: 1.65,
    marginBottom: 8,
  },
  small: {
    fontSize: 7.5,
    color: C.muted,
    lineHeight: 1.5,
  },
  mono: {
    fontSize: 8,
    color: C.muted,
    fontFamily: "Courier",
  },

  // Layout
  row: {
    flexDirection: "row",
    gap: 0,
  },
  col: {
    flex: 1,
  },
  gap4: { gap: 4 },
  gap8: { gap: 8 },
  gap16: { gap: 16 },

  // Cards / boxes
  card: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderStyle: "solid",
    borderRadius: 4,
    padding: 14,
    marginBottom: 10,
  },
  cardGold: {
    backgroundColor: "#1a1608",
    borderWidth: 1,
    borderColor: C.goldMuted,
    borderStyle: "solid",
    borderRadius: 4,
    padding: 14,
    marginBottom: 10,
  },
  highlight: {
    backgroundColor: C.surface,
    borderLeftWidth: 2,
    borderLeftColor: C.gold,
    borderLeftStyle: "solid",
    paddingLeft: 12,
    paddingVertical: 8,
    marginBottom: 10,
  },

  // Dividers
  rule: {
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    borderBottomStyle: "solid",
    marginVertical: 16,
  },
  goldRule: {
    borderBottomWidth: 1,
    borderBottomColor: C.goldMuted,
    borderBottomStyle: "solid",
    marginVertical: 16,
  },

  // Stat blocks
  statRow: {
    flexDirection: "row",
    gap: 0,
    marginBottom: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderStyle: "solid",
    padding: 10,
    marginRight: 8,
    borderRadius: 3,
  },
  statValue: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: C.gold,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 7,
    color: C.muted,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },

  // Table
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: C.goldMuted,
    borderBottomStyle: "solid",
    paddingBottom: 5,
    marginBottom: 4,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: C.faint,
    borderBottomStyle: "solid",
    paddingVertical: 5,
  },
  tableCell: {
    fontSize: 8,
    color: C.body,
    flex: 1,
  },
  tableCellHead: {
    fontSize: 7,
    color: C.goldMuted,
    flex: 1,
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  // Footer / header
  pageNumber: {
    fontSize: 7,
    color: C.faint,
    position: "absolute",
    bottom: 24,
    right: 52,
  },
  headerLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    borderBottomStyle: "solid",
  },
  confidential: {
    fontSize: 6.5,
    color: C.faint,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  logo: {
    fontSize: 9,
    color: C.gold,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 2,
    textTransform: "uppercase",
  },

  // Bullet points
  bulletRow: {
    flexDirection: "row",
    marginBottom: 5,
    alignItems: "flex-start",
  },
  bullet: {
    fontSize: 9,
    color: C.goldMuted,
    marginRight: 8,
    lineHeight: 1.65,
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
    color: C.body,
    lineHeight: 1.65,
  },
  
  // Badge / pill
  badge: {
    backgroundColor: "#1a1608",
    borderWidth: 1,
    borderColor: C.goldMuted,
    borderStyle: "solid",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 7,
    color: C.gold,
    letterSpacing: 1,
  },
});

// ─── Shared Components ───────────────────────────────────────────────────────

export function PageHeader({ title, section }: { title: string; section: string }) {
  return (
    <View style={S.headerLine}>
      <Text style={S.logo}>Dignity</Text>
      <Text style={[S.confidential, { color: C.muted }]}>{section} — {title}</Text>
      <Text style={S.confidential}>Confidential</Text>
    </View>
  );
}

export function SectionTitle({ children }: { children: string }) {
  return (
    <View>
      <Text style={S.h2}>{children}</Text>
      <View style={S.goldRule} />
    </View>
  );
}

export function SubTitle({ children }: { children: string }) {
  return <Text style={S.h3}>{children}</Text>;
}

export function BodyText({ children }: { children: string }) {
  return <Text style={S.body}>{children}</Text>;
}

export function Bullet({ children }: { children: string }) {
  return (
    <View style={S.bulletRow}>
      <Text style={S.bullet}>◆</Text>
      <Text style={S.bulletText}>{children}</Text>
    </View>
  );
}

export function StatBlock({
  stats,
}: {
  stats: { label: string; value: string }[];
}) {
  return (
    <View style={S.statRow}>
      {stats.map((s) => (
        <View key={s.label} style={S.statBox}>
          <Text style={S.statValue}>{s.value}</Text>
          <Text style={S.statLabel}>{s.label}</Text>
        </View>
      ))}
    </View>
  );
}

export function Highlight({ children }: { children: string }) {
  return (
    <View style={S.highlight}>
      <Text style={S.body}>{children}</Text>
    </View>
  );
}

export function TableBlock({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <View>
      <View style={S.tableHeader}>
        {headers.map((h) => (
          <Text key={h} style={S.tableCellHead}>{h}</Text>
        ))}
      </View>
      {rows.map((row, i) => (
        <View key={i} style={S.tableRow}>
          {row.map((cell, j) => (
            <Text key={j} style={S.tableCell}>{cell}</Text>
          ))}
        </View>
      ))}
    </View>
  );
}

export function CoverPage({
  eyebrow,
  title,
  subtitle,
  docNumber,
  date,
  classification,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  docNumber: string;
  date: string;
  classification: string;
}) {
  return (
    <Page size="A4" style={{ backgroundColor: C.obsidian, paddingTop: 0 }}>
      {/* Gold accent bar */}
      <View style={{ height: 4, backgroundColor: C.gold }} />

      {/* Hero area */}
      <View style={{ padding: 52, flexGrow: 1 }}>
        <Text style={S.eyebrow}>{eyebrow}</Text>
        <Text style={S.h1}>{title}</Text>
        <Text style={S.subtitle}>{subtitle}</Text>

        <View style={S.goldRule} />

        <View style={[S.row, { marginTop: 8, gap: 32 }]}>
          <View>
            <Text style={[S.small, { color: C.faint, marginBottom: 2 }]}>Document Number</Text>
            <Text style={S.mono}>{docNumber}</Text>
          </View>
          <View>
            <Text style={[S.small, { color: C.faint, marginBottom: 2 }]}>Effective Date</Text>
            <Text style={S.mono}>{date}</Text>
          </View>
          <View>
            <Text style={[S.small, { color: C.faint, marginBottom: 2 }]}>Classification</Text>
            <Text style={S.mono}>{classification}</Text>
          </View>
        </View>

        <View style={{ marginTop: 48 }}>
          <Text style={[S.small, { color: C.muted, lineHeight: 1.7 }]}>
            This document has been prepared for qualified institutional investors only. It does not
            constitute a public offering or solicitation. The information contained herein is
            confidential and subject to the terms of any applicable non-disclosure agreement.
            Redistribution without written consent of Dignity is strictly prohibited.
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: C.goldMuted,
          borderTopStyle: "solid",
          paddingHorizontal: 52,
          paddingVertical: 24,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={[S.badge]}>
          <Text style={S.badgeText}>DIGNITY · INSTITUTIONAL</Text>
        </View>
        <Text style={S.confidential}>
          © {new Date().getFullYear()} Dignity. All Rights Reserved.
        </Text>
      </View>
    </Page>
  );
}

export function ContentPage({
  title,
  section,
  children,
}: {
  title: string;
  section: string;
  children: React.ReactNode;
}) {
  return (
    <Page size="A4" style={S.page}>
      {/* Gold top bar */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          backgroundColor: C.goldMuted,
        }}
      />

      <PageHeader title={title} section={section} />

      {children}

      {/* Page number */}
      <Text
        style={S.pageNumber}
        render={({ pageNumber, totalPages }) =>
          `${pageNumber} / ${totalPages}`
        }
        fixed
      />
    </Page>
  );
}
