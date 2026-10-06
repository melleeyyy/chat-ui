Ith oru .md ee code css js html yenigane .md file aayi tharumo?

തീർച്ചയായും! ഞാൻ ഈ മുഴുവൻ കോഡും ഒരു **single `.md` file** ആയി തയ്യാറാക്കി തരാം. അതിൽ HTML, CSS, JavaScript എല്ലാം code blocks ആയി ഉണ്ടാകും. നിങ്ങൾക്ക് ആ `.md` file download ചെയ്തോ copy ചെയ്തോ ഉപയോഗിക്കാം.

### 📄 `ai-chat-ui.md` എന്ന ഫയൽ:

````markdown
# AI Chat UI - Complete Code

A professional AI chat interface with multiple features. Pure HTML, CSS, and JavaScript. No backend required.

## Features

- Dark / Light theme
- Multiple chat sessions (sidebar)
- File upload (image, PDF, TXT)
- Streaming AI response (typewriter effect)
- Voice input & Text-to-speech
- Think & Search modes
- Markdown support (code, tables, lists)
- Copy / Edit / Regenerate / Delete messages
- Export chat as Markdown
- Mock AI responses (no backend needed)
- Keyboard shortcuts
- Mobile responsive

---

## index.html

Save the following code as `index.html` and open it in any browser.

```html
<!DOCTYPE html>
<html lang="ml">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Chat</title>
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <style>
        /* ===== THEME VARIABLES ===== */
        :root {
            --bg: #0d0d0d;
            --bg-2: #161616;
            --bg-3: #1a1a1a;
            --bg-4: #1f1f1f;
            --border: #262626;
            --border-hover: #333;
            --text: #e0e0e0;
            --text-2: #888;
            --text-3: #555;
            --accent: #2563eb;
            --accent-hover: #1d4ed8;
            --user-bubble: #2563eb;
            --ai-bubble: #161616;
            --shadow: rgba(0,0,0,0.4);
            --code-bg: #0a0a0a;
            --code-text: #e879a8;
            --sidebar-bg: #0a0a0a;
            --success: #22c55e;
            --danger: #dc2626;
        }

        [data-theme="light"] {
            --bg: #ffffff;
            --bg-2: #f7f7f8;
            --bg-3: #f0f0f0;
            --bg-4: #e8e8e8;
            --border: #e5e5e5;
            --border-hover: #d4d4d4;
            --text: #1a1a1a;
            --text-2: #666;
            --text-3: #999;
            --accent: #2563eb;
            --accent-hover: #1d4ed8;
            --user-bubble: #2563eb;
            --ai-bubble: #f0f0f0;
            --shadow: rgba(0,0,0,0.08);
            --code-bg: #1a1a1a;
            --code-text: #e879a8;
            --sidebar-bg: #f7f7f8;
            --success: #16a34a;
            --danger: #dc2626;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        html, body { height: 100%; overflow: hidden; }
        body { background: var(--bg); color: var(--text); display: flex; transition: background 0.3s, color 0.3s; }

        .app { display: flex; width: 100%; height: 100vh; height: 100dvh; }

        /* Sidebar */
        .sidebar {
            width: 280px; background: var(--sidebar-bg); border-right: 1px solid var(--border);
            display: flex; flex-direction: column;
            transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s;
            z-index: 100;
        }
        .sidebar-header { padding: 16px; display: flex; gap: 8px; border-bottom: 1px solid var(--border); }
        .new-chat-btn {
            flex: 1; background: var(--accent); color: #fff; border: none;
            padding: 11px 14px; border-radius: 10px; font-size: 13px; font-weight: 500;
            cursor: pointer; display: flex; align-items: center; justify-content: center;
            gap: 8px; transition: all 0.2s;
        }
        .new-chat-btn:hover { background: var(--accent-hover); }
        .new-chat-btn svg { width: 15px; height: 15px; stroke-width: 2.2; }
        .sidebar-search { padding: 12px 16px; border-bottom: 1px solid var(--border); }
        .sidebar-search input {
            width: 100%; background: var(--bg-2); border: 1px solid var(--border);
            color: var(--text); padding: 9px 12px; border-radius: 8px;
            font-size: 13px; outline: none; transition: border 0.2s;
        }
        .sidebar-search input:focus { border-color: var(--accent); }
        .sidebar-search input::placeholder { color: var(--text-3); }
        .chat-list { flex: 1; overflow-y: auto; padding: 8px; }
        .chat-item {
            padding: 11px 12px; border-radius: 8px; cursor: pointer;
            display: flex; align-items: center; gap: 10px;
            margin-bottom: 4px; transition: all 0.15s; position: relative;
        }
        .chat-item:hover { background: var(--bg-2); }
        .chat-item.active { background: var(--bg-3); }
        .chat-item-icon {
            width: 30px; height: 30px; border-radius: 8px; background: var(--bg-3);
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0; color: var(--text-2);
        }
        .chat-item-icon svg { width: 15px; height: 15px; stroke-width: 1.8; }
        .chat-item-info { flex: 1; min-width: 0; }
        .chat-item-title {
            font-size: 13px; font-weight: 500; color: var(--text);
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .chat-item-preview {
            font-size: 11px; color: var(--text-3);
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 2px;
        }
        .chat-item-delete {
            background: transparent; border: none; color: var(--text-3);
            width: 26px; height: 26px; border-radius: 6px; cursor: pointer;
            display: none; align-items: center; justify-content: center;
            transition: all 0.2s; flex-shrink: 0;
        }
        .chat-item:hover .chat-item-delete { display: flex; }
        .chat-item-delete:hover { background: var(--danger); color: #fff; }
        .chat-item-delete svg { width: 13px; height: 13px; stroke-width: 2; }
        .sidebar-footer {
            padding: 12px; border-top: 1px solid var(--border); display: flex; gap: 6px;
        }
        .footer-btn {
            flex: 1; background: transparent; border: 1px solid var(--border);
            color: var(--text-2); padding: 9px; border-radius: 8px; font-size: 12px;
            cursor: pointer; display: flex; align-items: center; justify-content: center;
            gap: 6px; transition: all 0.2s;
        }
        .footer-btn:hover { background: var(--bg-2); color: var(--text); }
        .footer-btn svg { width: 14px; height: 14px; stroke-width: 1.8; }

        /* Main */
        .main { flex: 1; display: flex; flex-direction: column; background: var(--bg); min-width: 0; }
        .header {
            display: flex; justify-content: space-between; align-items: center;
            padding: 14px 20px; border-bottom: 1px solid var(--border);
            transition: border 0.3s; flex-shrink: 0;
        }
        .header-left { display: flex; align-items: center; gap: 12px; min-width: 0; }
        .menu-btn {
            background: transparent; border: none; color: var(--text-2);
            width: 36px; height: 36px; border-radius: 10px; cursor: pointer;
            display: none; align-items: center; justify-content: center;
            transition: all 0.2s; flex-shrink: 0;
        }
        .menu-btn:hover { background: var(--bg-3); color: var(--text); }
        .menu-btn svg { width: 20px; height: 20px; stroke-width: 1.8; }
        .header-title {
            font-size: 15px; font-weight: 600; color: var(--text);
            display: flex; align-items: center; gap: 8px;
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .status-dot {
            width: 7px; height: 7px; border-radius: 50%; background: var(--success);
            box-shadow: 0 0 8px var(--success); flex-shrink: 0;
            animation: pulseDot 2s infinite;
        }
        @keyframes pulseDot { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .header-actions { display: flex; gap: 6px; }
        .icon-btn {
            background: transparent; border: none; color: var(--text-2);
            width: 36px; height: 36px; border-radius: 10px; cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            transition: all 0.2s;
        }
        .icon-btn:hover { background: var(--bg-3); color: var(--text); transform: translateY(-1px); }
        .icon-btn:active { transform: translateY(0); }
        .icon-btn svg { width: 18px; height: 18px; stroke-width: 1.8; }

        /* Chat Area */
        .chat-area {
            flex: 1; padding: 24px 20px; overflow-y: auto;
            display: flex; flex-direction: column; gap: 20px;
            scroll-behavior: smooth; position: relative;
        }
        .welcome {
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            height: 100%; text-align: center; padding: 20px; animation: fadeIn 0.5s;
        }
        .welcome-icon {
            width: 64px; height: 64px; border-radius: 16px;
            background: linear-gradient(135deg, var(--accent), #7c3aed);
            display: flex; align-items: center; justify-content: center;
            color: #fff; margin-bottom: 20px;
            box-shadow: 0 8px 24px rgba(37, 99, 235, 0.3);
        }
        .welcome-icon svg { width: 30px; height: 30px; stroke-width: 1.8; }
        .welcome h2 { font-size: 22px; font-weight: 600; margin-bottom: 8px; color: var(--text); }
        .welcome p { font-size: 14px; color: var(--text-2); margin-bottom: 24px; max-width: 400px; }
        .suggestion-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; max-width: 500px; width: 100%; }
        .suggestion-card {
            background: var(--bg-2); border: 1px solid var(--border);
            padding: 14px; border-radius: 12px; text-align: left;
            cursor: pointer; transition: all 0.2s; display: flex; gap: 10px; align-items: flex-start;
        }
        .suggestion-card:hover {
            border-color: var(--accent); transform: translateY(-2px);
            box-shadow: 0 4px 12px var(--shadow);
        }
        .suggestion-card svg { width: 16px; height: 16px; stroke-width: 2; color: var(--accent); flex-shrink: 0; margin-top: 2px; }
        .suggestion-card-text { font-size: 13px; color: var(--text); line-height: 1.4; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        /* Messages */
        .message-wrapper {
            display: flex; flex-direction: column; max-width: 85%;
            animation: messageIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .message-wrapper.user { align-self: flex-end; align-items: flex-end; }
        .message-wrapper.ai { align-self: flex-start; align-items: flex-start; }
        @keyframes messageIn {
            from { opacity: 0; transform: translateY(12px) scale(0.97); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .message {
            padding: 12px 16px; border-radius: 18px; font-size: 14.5px;
            line-height: 1.65; word-wrap: break-word; overflow-wrap: break-word; position: relative;
        }
        .user .message { background: var(--user-bubble); color: #fff; border-bottom-right-radius: 6px; }
        .ai .message { background: var(--ai-bubble); color: var(--text); border-bottom-left-radius: 6px; border: 1px solid var(--border); }

        .message-attachments { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 8px; }
        .attachment-img { max-width: 200px; max-height: 200px; border-radius: 10px; cursor: pointer; object-fit: cover; }
        .attachment-file {
            display: flex; align-items: center; gap: 8px; padding: 8px 12px;
            background: rgba(255,255,255,0.1); border-radius: 8px; font-size: 12px;
        }
        .attachment-file svg { width: 14px; height: 14px; }

        /* Markdown */
        .ai .message p { margin-bottom: 8px; }
        .ai .message p:last-child { margin-bottom: 0; }
        .ai .message ul, .ai .message ol { margin-left: 18px; margin-bottom: 8px; }
        .ai .message li { margin-bottom: 4px; }
        .ai .message h1, .ai .message h2, .ai .message h3 { margin: 12px 0 8px 0; font-weight: 600; color: var(--text); }
        .ai .message h1 { font-size: 18px; }
        .ai .message h2 { font-size: 16px; }
        .ai .message h3 { font-size: 15px; }
        .ai .message code {
            background: var(--bg-3); padding: 2px 6px; border-radius: 4px;
            font-family: 'SF Mono', Monaco, monospace; font-size: 13px; color: var(--code-text);
        }
        .ai .message pre {
            background: var(--code-bg); padding: 14px; border-radius: 10px;
            overflow-x: auto; margin: 10px 0; border: 1px solid var(--border); position: relative;
        }
        .ai .message pre code { background: transparent; padding: 0; color: #e0e0e0; font-size: 13px; }
        .ai .message strong { font-weight: 600; }
        .ai .message a { color: var(--accent); text-decoration: none; }
        .ai .message a:hover { text-decoration: underline; }
        .ai .message blockquote {
            border-left: 3px solid var(--accent); padding-left: 12px;
            margin: 8px 0; color: var(--text-2);
        }
        .ai .message table { width: 100%; border-collapse: collapse; margin: 8px 0; font-size: 13px; }
        .ai .message th, .ai .message td { border: 1px solid var(--border); padding: 6px 10px; text-align: left; }
        .ai .message th { background: var(--bg-3); font-weight: 600; }

        .code-copy-btn {
            position: absolute; top: 8px; right: 8px;
            background: var(--bg-3); border: 1px solid var(--border);
            color: var(--text-2); padding: 4px 8px; border-radius: 6px;
            font-size: 11px; cursor: pointer; display: flex; align-items: center;
            gap: 4px; transition: all 0.2s;
        }
        .code-copy-btn:hover { background: var(--bg-4); color: var(--text); }
        .code-copy-btn svg { width: 12px; height: 12px; stroke-width: 2; }

        .message-actions {
            display: flex; gap: 4px; margin-top: 6px;
            opacity: 0; transition: opacity 0.2s;
        }
        .message-wrapper:hover .message-actions { opacity: 1; }
        .action-icon {
            background: transparent; border: none; color: var(--text-3);
            width: 28px; height: 28px; border-radius: 8px; cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            transition: all 0.2s;
        }
        .action-icon:hover { background: var(--bg-3); color: var(--text); }
        .action-icon svg { width: 15px; height: 15px; stroke-width: 2; }
        .action-icon.danger:hover { color: var(--danger); }

        /* Typing */
        .typing-indicator {
            display: none; align-self: flex-start; background: var(--ai-bubble);
            padding: 14px 18px; border-radius: 18px; border-bottom-left-radius: 6px;
            gap: 4px; align-items: center; border: 1px solid var(--border);
        }
        .typing-indicator span {
            width: 7px; height: 7px; background: var(--text-3);
            border-radius: 50%; display: inline-block;
            animation: bounce 1.4s infinite ease-in-out both;
        }
        .typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
        .typing-indicator span:nth-child(2) { animation-delay: -0.16s; }
        @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }

        /* Attachment preview */
        .attachment-preview { display: none; padding: 10px 20px 0 20px; gap: 8px; flex-wrap: wrap; }
        .attachment-preview.visible { display: flex; }
        .preview-item {
            position: relative; background: var(--bg-2); border: 1px solid var(--border);
            border-radius: 10px; padding: 8px; display: flex; align-items: center;
            gap: 8px; max-width: 200px; animation: messageIn 0.3s;
        }
        .preview-item img { width: 36px; height: 36px; border-radius: 6px; object-fit: cover; }
        .preview-item-icon {
            width: 36px; height: 36px; border-radius: 6px; background: var(--bg-3);
            display: flex; align-items: center; justify-content: center;
            color: var(--text-2); flex-shrink: 0;
        }
        .preview-item-icon svg { width: 16px; height: 16px; stroke-width: 1.8; }
        .preview-item-info { flex: 1; min-width: 0; }
        .preview-item-name {
            font-size: 12px; font-weight: 500; color: var(--text);
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .preview-item-size { font-size: 10px; color: var(--text-3); }
        .preview-remove {
            background: transparent; border: none; color: var(--text-3);
            width: 20px; height: 20px; border-radius: 50%; cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0; transition: all 0.2s;
        }
        .preview-remove:hover { background: var(--danger); color: #fff; }
        .preview-remove svg { width: 11px; height: 11px; stroke-width: 2.5; }

        /* Input */
        .input-area {
            padding: 0 20px 20px 20px; border-top: 1px solid var(--border);
            transition: border 0.3s; background: var(--bg); flex-shrink: 0;
        }
        .input-wrapper {
            display: flex; align-items: flex-end; background: var(--bg-2);
            border-radius: 24px; padding: 8px 8px 8px 14px;
            border: 1px solid var(--border); transition: all 0.2s;
            gap: 6px; margin-top: 16px;
        }
        .input-wrapper:focus-within {
            border-color: var(--accent);
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
        .input-wrapper textarea {
            flex: 1; background: transparent; border: none; color: var(--text);
            font-size: 14.5px; outline: none; padding: 10px 0;
            resize: none; max-height: 120px; font-family: inherit; line-height: 1.5;
        }
        .input-wrapper textarea::placeholder { color: var(--text-3); }
        .input-actions { display: flex; gap: 2px; align-items: center; padding-bottom: 2px; }
        .mode-btn, .mic-btn, .attach-btn {
            background: transparent; border: none; color: var(--text-3);
            width: 36px; height: 36px; border-radius: 10px; cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            transition: all 0.2s; flex-shrink: 0;
        }
        .mode-btn:hover, .mic-btn:hover, .attach-btn:hover { background: var(--bg-3); color: var(--text-2); }
        .mode-btn.active { background: var(--accent); color: #fff; }
        .mode-btn.active:hover { background: var(--accent-hover); }
        .mode-btn svg, .mic-btn svg, .attach-btn svg { width: 17px; height: 17px; stroke-width: 1.8; }
        .send-btn {
            background: var(--accent); border: none; color: #fff;
            width: 36px; height: 36px; border-radius: 50%; cursor: pointer;
            display: flex; justify-content: center; align-items: center;
            transition: all 0.2s; flex-shrink: 0;
        }
        .send-btn svg { width: 16px; height: 16px; stroke-width: 2.2; }
        .send-btn:hover:not(:disabled) { background: var(--accent-hover); transform: scale(1.05); }
        .send-btn:active:not(:disabled) { transform: scale(0.95); }
        .send-btn:disabled { background: var(--bg-3); color: var(--text-3); cursor: not-allowed; }
        .mic-btn.recording { background: var(--danger); color: #fff; animation: pulse 1.5s infinite; }
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.6); }
            70% { box-shadow: 0 0 0 8px rgba(220, 38, 38, 0); }
            100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0); }
        }

        /* Scrollbar */
        .chat-area::-webkit-scrollbar, .chat-list::-webkit-scrollbar { width: 5px; }
        .chat-area::-webkit-scrollbar-track, .chat-list::-webkit-scrollbar-track { background: transparent; }
        .chat-area::-webkit-scrollbar-thumb, .chat-list::-webkit-scrollbar-thumb { background: var(--border); border-radius: 10px; }
        .chat-area::-webkit-scrollbar-thumb:hover, .chat-list::-webkit-scrollbar-thumb:hover { background: var(--border-hover); }

        /* Toast */
        .toast {
            position: fixed; bottom: 30px; left: 50%;
            transform: translateX(-50%) translateY(20px);
            background: var(--bg-2); color: var(--text);
            padding: 10px 18px; border-radius: 10px; font-size: 13px;
            border: 1px solid var(--border); box-shadow: 0 8px 24px var(--shadow);
            opacity: 0; pointer-events: none;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            z-index: 1000; display: flex; align-items: center; gap: 8px;
        }
        .toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
        .toast svg { width: 15px; height: 15px; stroke-width: 2.5; }

        .scroll-bottom-btn {
            position: absolute; bottom: 20px; right: 30px;
            width: 38px; height: 38px; border-radius: 50%;
            background: var(--bg-2); border: 1px solid var(--border);
            color: var(--text-2); cursor: pointer; display: none;
            align-items: center; justify-content: center;
            box-shadow: 0 4px 12px var(--shadow); transition: all 0.2s; z-index: 50;
        }
        .scroll-bottom-btn:hover { color: var(--text); transform: translateY(-2px); }
        .scroll-bottom-btn.visible { display: flex; }
        .scroll-bottom-btn svg { width: 16px; height: 16px; stroke-width: 2; }

        .image-modal {
            position: fixed; inset: 0; background: rgba(0,0,0,0.9);
            display: none; align-items: center; justify-content: center;
            z-index: 2000; cursor: pointer; padding: 40px;
        }
        .image-modal.visible { display: flex; }
        .image-modal img { max-width: 90%; max-height: 90%; border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.5); }

        .sidebar-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 99; }
        .sidebar-overlay.visible { display: block; }

        @media (max-width: 768px) {
            .sidebar {
                position: fixed; left: 0; top: 0; bottom: 0;
                transform: translateX(-100%);
            }
            .sidebar.open { transform: translateX(0); }
            .menu-btn { display: flex; }
            .suggestion-grid { grid-template-columns: 1fr; }
            .chat-area { padding: 16px 14px; }
            .input-area { padding: 0 14px 14px 14px; }
            .header { padding: 12px 14px; }
            .message-wrapper { max-width: 92%; }
            .scroll-bottom-btn { right: 20px; }
        }

        ::selection { background: var(--accent); color: #fff; }
    </style>
</head>
<body>

    <div class="app">
        <div class="sidebar" id="sidebar">
            <div class="sidebar-header">
                <button class="new-chat-btn" id="newChatBtn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    New Chat
                </button>
            </div>
            <div class="sidebar-search">
                <input type="text" id="searchChats" placeholder="Search chats...">
            </div>
            <div class="chat-list" id="chatList"></div>
            <div class="sidebar-footer">
                <button class="footer-btn" id="themeBtn">
                    <svg id="themeIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                    Theme
                </button>
                <button class="footer-btn" id="clearAllBtn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                    </svg>
                    Clear All
                </button>
            </div>
        </div>
        <div class="sidebar-overlay" id="sidebarOverlay"></div>

        <div class="main">
            <div class="header">
                <div class="header-left">
                    <button class="menu-btn" id="menuBtn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                    <div class="header-title">
                        <span class="status-dot"></span>
                        <span id="currentChatTitle">New Chat</span>
                    </div>
                </div>
                <div class="header-actions">
                    <button class="icon-btn" id="exportBtn" title="Export chat">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                    </button>
                    <button class="icon-btn" id="deleteChatBtn" title="Delete chat">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <div class="chat-area" id="chatArea"></div>

            <button class="scroll-bottom-btn" id="scrollBottomBtn" title="Scroll to bottom">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </button>

            <div class="typing-indicator" id="typingIndicator">
                <span></span><span></span><span></span>
            </div>

            <div class="attachment-preview" id="attachmentPreview"></div>

            <div class="input-area">
                <div class="input-wrapper">
                    <button class="attach-btn" id="attachBtn" title="Attach file">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                        </svg>
                    </button>
                    <input type="file" id="fileInput" multiple accept="image/*,.pdf,.txt,.md" style="display:none">
                    <textarea id="userInput" placeholder="Ask anything..." rows="1"></textarea>
                    <div class="input-actions">
                        <button class="mode-btn" id="thinkBtn" title="Think mode">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path>
                                <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path>
                            </svg>
                        </button>
                        <button class="mode-btn" id="searchBtn" title="Web search">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="2" y1="12" x2="22" y2="12"></line>
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                            </svg>
                        </button>
                    </div>
                    <button class="mic-btn" id="micBtn" title="Voice input">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                            <line x1="12" y1="19" x2="12" y2="23"></line>
                            <line x1="8" y1="23" x2="16" y2="23"></line>
                        </svg>
                    </button>
                    <button class="send-btn" id="sendBtn" disabled title="Send">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="12" y1="19" x2="12" y2="5"></line>
                            <polyline points="5 12 12 5 19 12"></polyline>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="toast" id="toast"></div>
    <div class="image-modal" id="imageModal">
        <img id="modalImage" src="" alt="">
    </div>

    <script>
        // ===== DOM =====
        const chatArea = document.getElementById('chatArea');
        const userInput = document.getElementById('userInput');
        const sendBtn = document.getElementById('sendBtn');
        const typingIndicator = document.getElementById('typingIndicator');
        const thinkBtn = document.getElementById('thinkBtn');
        const searchBtn = document.getElementById('searchBtn');
        const micBtn = document.getElementById('micBtn');
        const attachBtn = document.getElementById('attachBtn');
        const fileInput = document.getElementById('fileInput');
        const attachmentPreview = document.getElementById('attachmentPreview');
        const newChatBtn = document.getElementById('newChatBtn');
        const deleteChatBtn = document.getElementById('deleteChatBtn');
        const exportBtn = document.getElementById('exportBtn');
        const themeBtn = document.getElementById('themeBtn');
        const themeIcon = document.getElementById('themeIcon');
        const clearAllBtn = document.getElementById('clearAllBtn');
        const chatList = document.getElementById('chatList');
        const searchChats = document.getElementById('searchChats');
        const currentChatTitle = document.getElementById('currentChatTitle');
        const menuBtn = document.getElementById('menuBtn');
        const sidebar = document.getElementById('sidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');
        const scrollBottomBtn = document.getElementById('scrollBottomBtn');
        const toast = document.getElementById('toast');
        const imageModal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');

        // ===== STATE =====
        let state = {
            chats: [],
            currentChatId: null,
            isThinking: false,
            isSearching: false,
            isRecording: false,
            attachments: [],
            userScrolledUp: false
        };

        // ===== ICONS =====
        const ICONS = {
            copy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`,
            speak: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`,
            check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
            trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path></svg>`,
            refresh: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>`,
            edit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`,
            chat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`,
            close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
            file: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>`,
            sparkle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4"></path></svg>`,
            code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
            lightbulb: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"></path></svg>`,
            globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,
            pen: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>`
        };

        // ===== MOCK RESPONSES =====
        const MOCK_RESPONSES = [
            `**ഇതൊരു Mock Response ആണ്!**\n\nഞാൻ ഒരു demo AI ആണ്. യഥാർത്ഥ AI ബന്ധിപ്പിക്കാൻ API ആവശ്യമാണ്.\n\n**ഉദാഹരണം:**\n\`\`\`javascript\nfetch('/api/chat', {\n  method: 'POST',\n  body: JSON.stringify({ message: 'Hello' })\n})\n\`\`\`\n\nകൂടുതൽ വിവരങ്ങൾക്ക് [ഇവിടെ ക്ലിക്ക് ചെയ്യുക](https://example.com)`,
            `**JavaScript ഉദാഹരണം:**\n\n\`\`\`javascript\nfunction greet(name) {\n  return \`Hello, \${name}!\`;\n}\n\nconsole.log(greet('World'));\n\`\`\`\n\n**Output:**\n\`\`\`\nHello, World!\n\`\`\`\n\nഇത് ഒരു simple function ആണ്.`,
            `**AI-യെ കുറിച്ചുള്ള കാര്യങ്ങൾ:**\n\n1. **Machine Learning** - ഡാറ്റയിൽ നിന്ന് പഠിക്കുന്നു\n2. **Deep Learning** - Neural Networks ഉപയോഗിക്കുന്നു\n3. **NLP** - ഭാഷ മനസ്സിലാക്കുന്നു\n4. **Computer Vision** - ചിത്രങ്ങൾ കാണുന്നു\n\n> "AI is the new electricity" - Andrew Ng\n\n**പ്രധാന പോയിന്റുകൾ:**\n- Data ആണ് ഏറ്റവും പ്രധാനം\n- Model architecture\n- Training compute`,
            `**Table Example:**\n\n| Feature | Status | Notes |\n|---------|--------|-------|\n| Fast | ✅ | Optimized |\n| Reliable | ✅ | Tested |\n| Scalable | ⚠️ | Needs work |\n| Secure | ✅ | Encrypted |\n\n**Code Block:**\n\`\`\`python\ndef fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)\n\nprint(fibonacci(10))\n\`\`\``,
            `**നമസ്കാരം!** 🙏\n\nഞാൻ നിങ്ങളെ സഹായിക്കാൻ ഇവിടെയുണ്ട്. എനിക്ക് ചെയ്യാൻ കഴിയുന്ന കാര്യങ്ങൾ:\n\n- ✍️ എഴുത്ത്\n- 💻 കോഡിംഗ്\n- 📊 ഡാറ്റ analysis\n- 🌐 വിവർത്തനം\n- 🎨 ക്രിയേറ്റീവ് ഐഡിയകൾ\n\n**എന്തെങ്കിലും ചോദിക്കൂ!**\n\n> 💡 Tip: Think mode ON ചെയ്താൽ കൂടുതൽ ആഴത്തിൽ ചിന്തിക്കും.`,
            `**Quick Answer:**\n\nചോദ്യത്തിന് ഉത്തരം ഇതാ:\n\n\`\`\`json\n{\n  "status": "success",\n  "data": {\n    "message": "This is mock data"\n  }\n}\n\`\`\`\n\n**Key Points:**\n- Point 1: Fast\n- Point 2: Reliable\n- Point 3: Scalable`,
            `**Step-by-Step Guide:**\n\n**Step 1:** Setup\n\`\`\`bash\nnpm install\nnpm start\n\`\`\`\n\n**Step 2:** Configure\n\`\`\`javascript\nconst config = {\n  apiKey: 'your-key',\n  model: 'gpt-4'\n};\n\`\`\`\n\n**Step 3:** Run\n\`\`\`bash\nnpm run dev\n\`\`\`\n\nഇത്രയും ചെയ്താൽ പ്രവർത്തിക്കും! 🚀`
        ];

        const SUGGESTIONS = [
            { icon: 'sparkle', text: 'Explain quantum computing in simple terms' },
            { icon: 'code', text: 'Write a JavaScript function to sort an array' },
            { icon: 'lightbulb', text: 'Give me 5 ideas for a startup' },
            { icon: 'globe', text: 'What is the capital of France?' }
        ];

        // ===== STORAGE =====
        const STORAGE_KEY = 'ai_chat_app';
        const THEME_KEY = 'ai_chat_theme';

        function saveState() {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                chats: state.chats,
                currentChatId: state.currentChatId
            }));
        }

        function loadState() {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                try {
                    const data = JSON.parse(saved);
                    state.chats = data.chats || [];
                    state.currentChatId = data.currentChatId;
                } catch (e) { console.error(e); }
            }
            if (state.chats.length === 0) createNewChat();
            else if (!state.currentChatId || !state.chats.find(c => c.id === state.currentChatId)) {
                state.currentChatId = state.chats[0].id;
            }
            renderChatList();
            renderCurrentChat();
        }

        // ===== THEME =====
        function loadTheme() {
            const saved = localStorage.getItem(THEME_KEY) || 'dark';
            document.documentElement.setAttribute('data-theme', saved);
            updateThemeIcon(saved);
        }
        function toggleTheme() {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem(THEME_KEY, next);
            updateThemeIcon(next);
            showToast(next === 'dark' ? 'Dark theme' : 'Light theme');
        }
        function updateThemeIcon(theme) {
            themeIcon.innerHTML = theme === 'dark'
                ? '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>'
                : '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
        }
        themeBtn.addEventListener('click', toggleTheme);

        // ===== CHAT MANAGEMENT =====
        function createNewChat() {
            const id = Date.now().toString();
            const chat = { id, title: 'New Chat', messages: [], createdAt: Date.now(), updatedAt: Date.now() };
            state.chats.unshift(chat);
            state.currentChatId = id;
            saveState();
            renderChatList();
            renderCurrentChat();
            return chat;
        }
        function getCurrentChat() { return state.chats.find(c => c.id === state.currentChatId); }
        function deleteChat(id) {
            state.chats = state.chats.filter(c => c.id !== id);
            if (state.currentChatId === id) {
                if (state.chats.length === 0) { createNewChat(); return; }
                state.currentChatId = state.chats[0].id;
            }
            saveState(); renderChatList(); renderCurrentChat();
            showToast('Chat deleted');
        }
        function switchChat(id) {
            state.currentChatId = id;
            saveState(); renderChatList(); renderCurrentChat(); closeSidebar();
        }
        function renderChatList() {
            const query = searchChats.value.toLowerCase().trim();
            const filtered = state.chats.filter(c =>
                c.title.toLowerCase().includes(query) ||
                c.messages.some(m => m.text.toLowerCase().includes(query))
            );
            chatList.innerHTML = '';
            if (filtered.length === 0) {
                chatList.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text-3);font-size:13px;">No chats found</div>';
                return;
            }
            filtered.forEach(chat => {
                const item = document.createElement('div');
                item.className = 'chat-item' + (chat.id === state.currentChatId ? ' active' : '');
                const lastMsg = chat.messages[chat.messages.length - 1];
                const preview = lastMsg ? lastMsg.text.replace(/[#*`_]/g, '').substring(0, 40) : 'No messages yet';
                item.innerHTML = `
                    <div class="chat-item-icon">${ICONS.chat}</div>
                    <div class="chat-item-info">
                        <div class="chat-item-title">${escapeHtml(chat.title)}</div>
                        <div class="chat-item-preview">${escapeHtml(preview)}</div>
                    </div>
                    <button class="chat-item-delete" data-id="${chat.id}">${ICONS.trash}</button>
                `;
                item.addEventListener('click', (e) => {
                    if (e.target.closest('.chat-item-delete')) return;
                    switchChat(chat.id);
                });
                item.querySelector('.chat-item-delete').addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (confirm('Delete this chat?')) deleteChat(chat.id);
                });
                chatList.appendChild(item);
            });
        }

        // ===== RENDER CHAT =====
        function renderCurrentChat() {
            const chat = getCurrentChat();
            if (!chat) return;
            currentChatTitle.textContent = chat.title;
            chatArea.innerHTML = '';
            if (chat.messages.length === 0) { renderWelcome(); return; }
            chat.messages.forEach(msg => renderMessage(msg, false));
            scrollToBottom(false);
        }
        function renderWelcome() {
            const welcome = document.createElement('div');
            welcome.className = 'welcome';
            welcome.innerHTML = `
                <div class="welcome-icon">${ICONS.sparkle}</div>
                <h2>How can I help you?</h2>
                <p>Ask me anything. I can help with writing, coding, analysis, and more.</p>
                <div class="suggestion-grid">
                    ${SUGGESTIONS.map((s, i) => `
                        <div class="suggestion-card" data-index="${i}">
                            ${ICONS[s.icon]}
                            <div class="suggestion-card-text">${s.text}</div>
                        </div>
                    `).join('')}
                </div>
            `;
            chatArea.appendChild(welcome);
            welcome.querySelectorAll('.suggestion-card').forEach(card => {
                card.addEventListener('click', () => {
                    const idx = parseInt(card.dataset.index);
                    userInput.value = SUGGESTIONS[idx].text;
                    userInput.dispatchEvent(new Event('input'));
                    userInput.focus();
                });
            });
        }

        // ===== MESSAGES =====
        function renderMessage(msg, animate = true) {
            const wrapper = document.createElement('div');
            wrapper.className = 'message-wrapper ' + msg.sender;
            wrapper.dataset.msgId = msg.id;
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message';
            if (msg.attachments && msg.attachments.length > 0) {
                const attDiv = document.createElement('div');
                attDiv.className = 'message-attachments';
                msg.attachments.forEach(att => {
                    if (att.type && att.type.startsWith('image/')) {
                        const img = document.createElement('img');
                        img.className = 'attachment-img';
                        img.src = att.data; img.alt = att.name;
                        img.onclick = () => openImageModal(att.data);
                        attDiv.appendChild(img);
                    } else {
                        const file = document.createElement('div');
                        file.className = 'attachment-file';
                        file.innerHTML = ICONS.file + `<span>${escapeHtml(att.name)}</span>`;
                        attDiv.appendChild(file);
                    }
                });
                messageDiv.appendChild(attDiv);
            }
            if (msg.sender === 'ai') {
                const content = document.createElement('div');
                content.innerHTML = marked.parse(msg.text);
                messageDiv.appendChild(content);
                setTimeout(() => attachCodeCopyButtons(messageDiv), 0);
            } else {
                const textNode = document.createElement('div');
                textNode.textContent = msg.text;
                messageDiv.appendChild(textNode);
            }
            wrapper.appendChild(messageDiv);
            const actions = document.createElement('div');
            actions.className = 'message-actions';
            const copyBtn = document.createElement('button');
            copyBtn.className = 'action-icon';
            copyBtn.innerHTML = ICONS.copy;
            copyBtn.title = 'Copy';
            copyBtn.onclick = () => { navigator.clipboard.writeText(msg.text); showToast('Copied'); };
            actions.appendChild(copyBtn);
            if (msg.sender === 'ai') {
                const speakBtn = document.createElement('button');
                speakBtn.className = 'action-icon';
                speakBtn.innerHTML = ICONS.speak;
                speakBtn.title = 'Read aloud';
                speakBtn.onclick = () => speakText(msg.text);
                actions.appendChild(speakBtn);
                const regenBtn = document.createElement('button');
                regenBtn.className = 'action-icon';
                regenBtn.innerHTML = ICONS.refresh;
                regenBtn.title = 'Regenerate';
                regenBtn.onclick = () => regenerateMessage(msg.id);
                actions.appendChild(regenBtn);
            } else {
                const editBtn = document.createElement('button');
                editBtn.className = 'action-icon';
                editBtn.innerHTML = ICONS.edit;
                editBtn.title = 'Edit';
                editBtn.onclick = () => editMessage(msg.id);
                actions.appendChild(editBtn);
            }
            const delBtn = document.createElement('button');
            delBtn.className = 'action-icon danger';
            delBtn.innerHTML = ICONS.trash;
            delBtn.title = 'Delete';
            delBtn.onclick = () => deleteMessage(msg.id);
            actions.appendChild(delBtn);
            wrapper.appendChild(actions);
            if (!animate) wrapper.style.animation = 'none';
            chatArea.appendChild(wrapper);
        }

        function addMessage(text, sender, attachments = []) {
            const chat = getCurrentChat();
            if (!chat) return;
            const msg = { id: Date.now().toString() + Math.random().toString(36).substr(2, 5), text, sender, attachments, timestamp: Date.now() };
            chat.messages.push(msg);
            chat.updatedAt = Date.now();
            if (sender === 'user' && chat.title === 'New Chat') {
                chat.title = text.substring(0, 35) + (text.length > 35 ? '...' : '');
                currentChatTitle.textContent = chat.title;
            }
            saveState(); renderChatList();
            if (chat.messages.length === 1 && sender === 'user') chatArea.innerHTML = '';
            renderMessage(msg);
            if (!state.userScrolledUp) scrollToBottom();
        }

        function deleteMessage(msgId) {
            const chat = getCurrentChat();
            chat.messages = chat.messages.filter(m => m.id !== msgId);
            saveState(); renderCurrentChat(); renderChatList();
            showToast('Message deleted');
        }
        function editMessage(msgId) {
            const chat = getCurrentChat();
            const msg = chat.messages.find(m => m.id === msgId);
            if (!msg) return;
            userInput.value = msg.text;
            userInput.dispatchEvent(new Event('input'));
            userInput.focus();
            chat.messages = chat.messages.filter(m => m.id !== msgId);
            saveState(); renderCurrentChat();
        }
        function regenerateMessage(msgId) {
            const chat = getCurrentChat();
            const msgIndex = chat.messages.findIndex(m => m.id === msgId);
            if (msgIndex === -1) return;
            chat.messages = chat.messages.slice(0, msgIndex);
            saveState(); renderCurrentChat();
            const lastUserMsg = [...chat.messages].reverse().find(m => m.sender === 'user');
            if (lastUserMsg) simulateAIResponse(lastUserMsg.text);
        }

        // ===== SEND =====
        function sendMessage() {
            const text = userInput.value.trim();
            if (!text && state.attachments.length === 0) return;
            const attachments = [...state.attachments];
            addMessage(text || '(attachment)', 'user', attachments);
            userInput.value = ''; userInput.style.height = 'auto';
            sendBtn.disabled = true;
            state.attachments = []; renderAttachments();
            simulateAIResponse(text);
        }

        function simulateAIResponse(userText) {
            typingIndicator.style.display = 'flex';
            chatArea.appendChild(typingIndicator);
            if (!state.userScrolledUp) scrollToBottom();
            let response = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
            if (state.isThinking && state.isSearching) response = `**Think + Search Mode**\n\n_Thinking deeply and searching the web..._\n\n---\n\n${response}`;
            else if (state.isThinking) response = `**Thinking Mode**\n\n_Let me think carefully..._\n\n---\n\n${response}`;
            else if (state.isSearching) response = `**Search Mode**\n\n_Searching the web..._\n\n---\n\n${response}`;
            setTimeout(() => { typingIndicator.style.display = 'none'; streamResponse(response); }, 800);
        }

        function streamResponse(fullText) {
            const chat = getCurrentChat();
            if (!chat) return;
            const msgId = Date.now().toString() + Math.random().toString(36).substr(2, 5);
            const msg = { id: msgId, text: '', sender: 'ai', timestamp: Date.now() };
            chat.messages.push(msg);
            const wrapper = document.createElement('div');
            wrapper.className = 'message-wrapper ai';
            wrapper.dataset.msgId = msgId;
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message';
            const contentDiv = document.createElement('div');
            messageDiv.appendChild(contentDiv);
            wrapper.appendChild(messageDiv);
            const actions = document.createElement('div');
            actions.className = 'message-actions';
            actions.innerHTML = `
                <button class="action-icon" data-action="copy">${ICONS.copy}</button>
                <button class="action-icon" data-action="speak">${ICONS.speak}</button>
                <button class="action-icon" data-action="regen">${ICONS.refresh}</button>
                <button class="action-icon danger" data-action="del">${ICONS.trash}</button>
            `;
            wrapper.appendChild(actions);
            chatArea.appendChild(wrapper);
            let i = 0;
            const chars = fullText.split('');
            let lastRendered = '';
            function type() {
                if (i >= chars.length) {
                    msg.text = fullText;
                    saveState(); renderChatList();
                    contentDiv.innerHTML = marked.parse(fullText);
                    attachCodeCopyButtons(contentDiv);
                    attachMessageActionHandlers(actions, msg);
                    return;
                }
                i += 3;
                const current = fullText.substring(0, i);
                if (current.length - lastRendered.length > 20 || i >= chars.length) {
                    contentDiv.innerHTML = marked.parse(current + '▊');
                    lastRendered = current;
                }
                if (!state.userScrolledUp) scrollToBottom();
                setTimeout(type, 8);
            }
            type();
        }

        function attachCodeCopyButtons(container) {
            container.querySelectorAll('pre').forEach(pre => {
                if (pre.querySelector('.code-copy-btn')) return;
                const btn = document.createElement('button');
                btn.className = 'code-copy-btn';
                btn.innerHTML = ICONS.copy + ' Copy';
                btn.onclick = () => {
                    const code = pre.querySelector('code')?.textContent || pre.textContent;
                    navigator.clipboard.writeText(code);
                    showToast('Code copied');
                };
                pre.appendChild(btn);
            });
        }
        function attachMessageActionHandlers(actionsContainer, msg) {
            actionsContainer.querySelectorAll('.action-icon').forEach(btn => {
                btn.onclick = () => {
                    const action = btn.dataset.action;
                    if (action === 'copy') { navigator.clipboard.writeText(msg.text); showToast('Copied'); }
                    else if (action === 'speak') speakText(msg.text);
                    else if (action === 'regen') regenerateMessage(msg.id);
                    else if (action === 'del') deleteMessage(msg.id);
                };
            });
        }

        // ===== ATTACHMENTS =====
        attachBtn.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            files.forEach(file => {
                if (file.size > 5 * 1024 * 1024) { showToast('File too large (max 5MB)'); return; }
                const reader = new FileReader();
                reader.onload = (ev) => {
                    state.attachments.push({ name: file.name, type: file.type, size: file.size, data: ev.target.result });
                    renderAttachments();
                };
                reader.readAsDataURL(file);
            });
            fileInput.value = '';
        });
        function renderAttachments() {
            if (state.attachments.length === 0) {
                attachmentPreview.classList.remove('visible');
                attachmentPreview.innerHTML = '';
                return;
            }
            attachmentPreview.classList.add('visible');
            attachmentPreview.innerHTML = '';
            state.attachments.forEach((att, idx) => {
                const item = document.createElement('div');
                item.className = 'preview-item';
                if (att.type.startsWith('image/')) {
                    item.innerHTML = `<img src="${att.data}" alt=""><div class="preview-item-info"><div class="preview-item-name">${escapeHtml(att.name)}</div><div class="preview-item-size">${formatSize(att.size)}</div></div><button class="preview-remove">${ICONS.close}</button>`;
                } else {
                    item.innerHTML = `<div class="preview-item-icon">${ICONS.file}</div><div class="preview-item-info"><div class="preview-item-name">${escapeHtml(att.name)}</div><div class="preview-item-size">${formatSize(att.size)}</div></div><button class="preview-remove">${ICONS.close}</button>`;
                }
                item.querySelector('.preview-remove').onclick = () => {
                    state.attachments.splice(idx, 1);
                    renderAttachments();
                };
                attachmentPreview.appendChild(item);
            });
            sendBtn.disabled = false;
        }

        // ===== UTILITIES =====
        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
        function formatSize(bytes) {
            if (bytes < 1024) return bytes + ' B';
            if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
            return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
        }
        function scrollToBottom(smooth = true) {
            chatArea.scrollTo({ top: chatArea.scrollHeight, behavior: smooth ? 'smooth' : 'auto' });
        }
        function speakText(text) {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                const clean = text.replace(/[#*`_]/g, '');
                const u = new SpeechSynthesisUtterance(clean);
                u.lang = 'ml-IN'; u.rate = 1;
                window.speechSynthesis.speak(u);
            }
        }
        function showToast(message) {
            toast.innerHTML = ICONS.check + '<span>' + escapeHtml(message) + '</span>';
            toast.classList.add('show');
            clearTimeout(toast._timeout);
            toast._timeout = setTimeout(() => toast.classList.remove('show'), 2000);
        }
        function openImageModal(src) {
            modalImage.src = src;
            imageModal.classList.add('visible');
        }
        imageModal.addEventListener('click', () => imageModal.classList.remove('visible'));

        // ===== TEXTAREA =====
        userInput.addEventListener('input', () => {
            userInput.style.height = 'auto';
            userInput.style.height = Math.min(userInput.scrollHeight, 120) + 'px';
            sendBtn.disabled = userInput.value.trim() === '' && state.attachments.length === 0;
        });
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey && !sendBtn.disabled) {
                e.preventDefault();
                sendMessage();
            }
        });
        sendBtn.addEventListener('click', sendMessage);

        // ===== SCROLL =====
        chatArea.addEventListener('scroll', () => {
            const isNearBottom = chatArea.scrollHeight - chatArea.scrollTop - chatArea.clientHeight < 80;
            state.userScrolledUp = !isNearBottom;
            scrollBottomBtn.classList.toggle('visible', state.userScrolledUp);
        });
        scrollBottomBtn.addEventListener('click', () => {
            scrollToBottom();
            state.userScrolledUp = false;
            scrollBottomBtn.classList.remove('visible');
        });

        // ===== MODES =====
        thinkBtn.addEventListener('click', () => {
            state.isThinking = !state.isThinking;
            thinkBtn.classList.toggle('active', state.isThinking);
            showToast(state.isThinking ? 'Think mode ON' : 'Think mode OFF');
        });
        searchBtn.addEventListener('click', () => {
            state.isSearching = !state.isSearching;
            searchBtn.classList.toggle('active', state.isSearching);
            showToast(state.isSearching ? 'Search mode ON' : 'Search mode OFF');
        });

        // ===== VOICE =====
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.lang = 'ml-IN';
            recognition.interimResults = false;
            micBtn.addEventListener('click', () => {
                if (state.isRecording) { recognition.stop(); return; }
                recognition.start();
            });
            recognition.onstart = () => {
                state.isRecording = true;
                micBtn.classList.add('recording');
                showToast('Listening...');
            };
            recognition.onresult = (e) => {
                userInput.value = e.results[0][0].transcript;
                userInput.dispatchEvent(new Event('input'));
            };
            recognition.onerror = () => showToast('Voice input failed');
            recognition.onend = () => {
                state.isRecording = false;
                micBtn.classList.remove('recording');
            };
        } else {
            micBtn.addEventListener('click', () => showToast('Voice not supported'));
        }

        // ===== SIDEBAR =====
        menuBtn.addEventListener('click', () => {
            sidebar.classList.add('open');
            sidebarOverlay.classList.add('visible');
        });
        function closeSidebar() {
            sidebar.classList.remove('open');
            sidebarOverlay.classList.remove('visible');
        }
        sidebarOverlay.addEventListener('click', closeSidebar);

        // ===== HEADER BUTTONS =====
        newChatBtn.addEventListener('click', () => {
            createNewChat();
            closeSidebar();
            showToast('New chat created');
        });
        deleteChatBtn.addEventListener('click', () => {
            if (confirm('Delete this chat?')) deleteChat(state.currentChatId);
        });
        exportBtn.addEventListener('click', () => {
            const chat = getCurrentChat();
            if (!chat) return;
            let text = `# ${chat.title}\n\n`;
            chat.messages.forEach(m => {
                text += `**${m.sender === 'user' ? 'You' : 'AI'}:** ${m.text}\n\n`;
            });
            const blob = new Blob([text], { type: 'text/markdown' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${chat.title.replace(/[^a-z0-9]/gi, '_')}.md`;
            a.click();
            URL.revokeObjectURL(url);
            showToast('Chat exported');
        });
        clearAllBtn.addEventListener('click', () => {
            if (confirm('Delete ALL chats?')) {
                state.chats = [];
                createNewChat();
                showToast('All chats cleared');
            }
        });
        searchChats.addEventListener('input', renderChatList);

        // ===== KEYBOARD =====
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); userInput.focus(); }
            if ((e.ctrlKey || e.metaKey) && e.key === 'n') { e.preventDefault(); createNewChat(); }
            if (e.key === 'Escape') { userInput.blur(); closeSidebar(); imageModal.classList.remove('visible'); }
        });

        // ===== INIT =====
        loadTheme();
        loadState();
    </script>
</body>
</html>
```

---

## 🚀 How to Use

1. Copy the HTML code above.
2. Save it as `index.html`.
3. Open the file in any modern browser (Chrome, Edge, Firefox, Safari).
4. Start chatting with mock AI responses!

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + K` | Focus input |
| `Ctrl/Cmd + N` | New chat |
| `Enter` | Send message |
| `Shift + Enter` | New line |
| `Esc` | Close sidebar / modal |

## 🎯 Features Included

- ✅ Dark / Light theme toggle
- ✅ Multiple chat sessions with sidebar
- ✅ Chat search
- ✅ File upload (image / PDF / TXT)
- ✅ Streaming typewriter response
- ✅ Voice input & Text-to-speech
- ✅ Think & Search modes
- ✅ Markdown support (code, tables, lists)
- ✅ Copy / Edit / Regenerate / Delete messages
- ✅ Export chat as Markdown
- ✅ Mock AI responses (7 variations)
- ✅ Mobile responsive
- ✅ Toast notifications

## 📝 Notes

- No backend required — everything runs in the browser.
- Chat history is saved in `localStorage`.
- Replace `MOCK_RESPONSES` array with real API calls when ready.
````

---

### 📥 എങ്ങനെ ഉപയോഗിക്കാം?

**ഓപ്ഷൻ 1: Copy-Paste**
1. മുകളിലെ മുഴുവൻ content-ഉം copy ചെയ്യുക
2. ഒരു text editor തുറക്കുക (Notepad, VS Code)
3. `ai-chat-ui.md` എന്ന പേരിൽ save ചെയ്യുക

**ഓപ്ഷൻ 2: Download**
- ഞാൻ ഇത് ഒരു `.md` ഫയലായി തരാൻ ആഗ്രഹിക്കുന്നുവെങ്കിൽ, നിങ്ങൾക്ക് മുകളിലെ content-ഉം copy ചെയ്ത് `.md` extension-ൽ save ചെയ്യാം.

### 📂 ഫയൽ ഉപയോഗിക്കാൻ:
1. `.md` ഫയൽ open ചെയ്യുക (VS Code, Notepad, അല്ലെങ്കിൽ GitHub-ൽ)
2. അതിലെ **HTML code block** copy ചെയ്യുക
3. `index.html` എന്ന ഫയലിൽ paste ചെയ്ത് save ചെയ്യുക
4. Browser-ൽ തുറക്കുക

### 💡 GitHub-ൽ ഉപയോഗിക്കാൻ:
ഈ `.md` ഫയൽ GitHub-ൽ upload ചെയ്താൽ, അതിലെ code blocks syntax highlighting-നോട് കൂടി കാണാം. അതിൽ HTML code block-ൽ **copy button** GitHub സ്വയം നൽകും.

വേണമെങ്കിൽ ഞാൻ ഇതിനെ **3 separate files** ആക്കി തരാം (`index.html`, `style.css`, `script.js`) — അതും ഒരു `.md` ഫയലിൽ ഉൾപ്പെടുത്തി. പറഞ്ഞാൽ മതി! 😊