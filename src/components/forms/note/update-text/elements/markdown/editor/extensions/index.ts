import { Compartment, Prec } from '@codemirror/state';
import { EditorView } from 'codemirror';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { indentWithTab } from '@codemirror/commands';
import { keymap } from '@codemirror/view';
import { tags } from '@lezer/highlight';

export const themeCompartment = new Compartment();
export const highlightCompartment = new Compartment();
export const editorBaseExtensions = [Prec.high(keymap.of([indentWithTab]))];

export const buildTheme = (isDark: boolean) =>
    EditorView.theme(
        {
            '&': { backgroundColor: 'transparent', },
            '.cm-content': { caretColor: isDark ? 'white' : 'black', },
            '.cm-cursor': { borderLeftColor: isDark ? 'white' : 'black', },
        },
        { dark: isDark }
    );

export const buildHighlight = (isDark: boolean) =>
    syntaxHighlighting(
        HighlightStyle.define([
            { tag: tags.link, color: 'rgb(var(--inverted))' },
            { tag: tags.url, color: 'rgb(var(--primary))' },
            { tag: tags.string, color: isDark ? '#e5e5e5' : '#262626' },
            { tag: tags.meta, color: isDark ? '#e5e5e5' : '#262626' },
            { tag: tags.emphasis, fontStyle: 'italic' },
            { tag: tags.strong, fontWeight: 'bold' },
            { tag: tags.heading, fontWeight: 'bold' },
            { tag: tags.comment, color: isDark ? '#e5e5e5' : '#262626' },
        ])
    );