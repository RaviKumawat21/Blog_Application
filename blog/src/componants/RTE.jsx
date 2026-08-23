import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

// Import tinymce core and all required plugins (self-hosted, no API key needed)
import 'tinymce/tinymce'
import 'tinymce/models/dom'
import 'tinymce/themes/silver'
import 'tinymce/icons/default'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/link'
import 'tinymce/plugins/image'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/code'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/media'
import 'tinymce/plugins/table'
import 'tinymce/plugins/wordcount'

export default function RTE({ name, control, label, defaultValue = '' }) {
    return (
        <div style={{ width: '100%' }}>
            {label && (
                <label className="field-label" style={{ marginBottom: 'var(--space-2)', display: 'block' }}>
                    {label}
                </label>
            )}

            <div style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid var(--color-border)',
                transition: 'border-color var(--transition-fast)',
            }}>
                <Controller
                    name={name || 'content'}
                    control={control}
                    render={({ field: { onChange } }) => (
                        <Editor
                            licenseKey="gpl"
                            initialValue={defaultValue}
                            init={{
                                // Self-hosted — no cloud CDN, no API key prompt
                                base_url: '/tinymce',
                                suffix: '.min',
                                height: 480,
                                menubar: false,
                                branding: false,
                                promotion: false,
                                resize: false,
                                plugins: [
                                    'advlist', 'autolink', 'lists', 'link', 'image',
                                    'charmap', 'preview', 'anchor', 'searchreplace',
                                    'visualblocks', 'code', 'fullscreen', 'insertdatetime',
                                    'media', 'table', 'wordcount',
                                ],
                                toolbar:
                                    'undo redo | blocks | bold italic underline | ' +
                                    'alignleft aligncenter alignright | ' +
                                    'bullist numlist | link image | code fullscreen',
                                toolbar_mode: 'sliding',
                                block_formats: 'Paragraph=p; Heading 1=h1; Heading 2=h2; Heading 3=h3; Preformatted=pre',
                                content_style: `
                                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
                                    body {
                                        font-family: 'Inter', system-ui, sans-serif;
                                        font-size: 15px;
                                        line-height: 1.7;
                                        color: #1e293b;
                                        background: #ffffff;
                                        padding: 16px 20px;
                                        margin: 0;
                                    }
                                    p { margin: 0 0 1em; }
                                    h1,h2,h3 { font-weight: 600; line-height: 1.3; margin: 1.4em 0 0.5em; }
                                    a { color: #6366f1; }
                                    img { max-width: 100%; border-radius: 6px; }
                                    pre { background: #f1f5f9; border-radius: 6px; padding: 12px 16px; font-size: 13px; overflow-x: auto; }
                                    blockquote { border-left: 3px solid #6366f1; margin: 0; padding-left: 16px; color: #64748b; }
                                `,
                            }}
                            onEditorChange={onChange}
                        />
                    )}
                />
            </div>
        </div>
    )
}
