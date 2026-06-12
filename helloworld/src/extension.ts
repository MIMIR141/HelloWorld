import * as vscode from 'vscode';
import markdownItContainer from 'markdown-it-container';
import markdownItEmoji from 'markdown-it-emoji';

export function activate(context: vscode.ExtensionContext) {
    return {
        extendMarkdownIt(md: any) {
            md.use(markdownItEmoji);

            md.use(markdownItContainer, 'alert', {
                validate: () => true,
                render: (tokens: any, idx: number) => {
                    return tokens[idx].nesting === 1 ? '<div class="alert">\n' : '</div>\n';
                }
            });

            md.use(markdownItContainer, 'spoiler', {
                marker: '?',
                validate: (params: string) => params.trim().match(/^spoiler\s+(.*)$/),
                render: (tokens: any, idx: number) => {
                    if (tokens[idx].nesting === 1) {
                        const match = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/);
                        const title = match ? match[1].replace(/^"(.*)"$/, '$1') : 'Спойлер';
                        return `<div class="spoiler">\n<details>\n<summary>${title}</summary>\n`;
                    } else {
                        return '</details>\n</div>\n';
                    }
                }
            });

            md.use(markdownItContainer, 'mermaid', {
                validate: () => true,
                render: (tokens: any, idx: number) => {
                    return tokens[idx].nesting === 1 ? '<div class="mermaid">\n' : '</div>\n';
                }
            });

            return md;
        }
    };
}

export function deactivate() {}