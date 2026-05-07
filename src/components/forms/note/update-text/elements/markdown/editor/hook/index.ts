import { basicSetup } from 'codemirror';
import { buildHighlight, buildTheme, editorBaseExtensions, highlightCompartment, themeCompartment, } from '../extensions';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { markdown } from '@codemirror/lang-markdown';
import { useEffect, useRef } from 'react';

type UseEditorParams = {
    parentRef: React.RefObject<HTMLDivElement | null>;
    value: string;
    isDark: boolean;
    onChange: (value: string) => void;
}

export function useEditor({ parentRef, value, isDark, onChange, }: UseEditorParams) {

    const viewRef = useRef<EditorView | null>(null);
    const skipNextSyncRef = useRef(false);

    useEffect(() => {
        if (!parentRef.current) return;
        const view = new EditorView({
            state: EditorState.create({
                doc: value,
                extensions: [
                    ...editorBaseExtensions,
                    basicSetup,
                    markdown(),
                    EditorView.lineWrapping,
                    themeCompartment.of(buildTheme(isDark)),
                    highlightCompartment.of(buildHighlight(isDark)),
                    EditorView.updateListener.of((update) => {
                        if (!update.docChanged) return;

                        const newValue = update.state.doc.toString();
                        skipNextSyncRef.current = true;
                        onChange(newValue);
                    })
                ]
            }),
            parent: parentRef.current,
        })
        viewRef.current = view;
        return () => {
            view.destroy();
            viewRef.current = null;
        }
    }, [])

    useEffect(() => {
        if (!viewRef.current) return;
        viewRef.current.dispatch({
            effects: [
                themeCompartment.reconfigure(buildTheme(isDark)),
                highlightCompartment.reconfigure(buildHighlight(isDark)),
            ]
        })
    }, [isDark]);

    useEffect(() => {
        if (!viewRef.current) return;
        if (skipNextSyncRef.current) {
            skipNextSyncRef.current = false;
            return;
        }
        const current = viewRef.current.state.doc.toString();
        if (current !== value) {
            viewRef.current.dispatch({
                changes: {
                    from: 0,
                    to: current.length,
                    insert: value,
                }
            })
        }
    }, [value])

    return viewRef;

}