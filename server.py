"""
SNPE Website Local Proxy Server
- Serves local HTML pages with WordPress-style routing
- Proxies CSS/JS/fonts/images from snpelife.com (bypassing expired SSL)
"""
import http.server
import urllib.request
import ssl
import os
import sys

PORT = 8080
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ORIGIN = "https://snpelife.com"

ssl_ctx = ssl.create_default_context()
ssl_ctx.check_hostname = False
ssl_ctx.verify_mode = ssl.CERT_NONE


class ProxyHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        path = self.path.split("?")[0].rstrip("/")
        if not path:
            path = "/"

        if path == "/" or path == "/index.html":
            self.serve_local_file(os.path.join(BASE_DIR, "index.html"))
            return

        page_file = os.path.join(BASE_DIR, "pages", path.lstrip("/"), "index.html")
        if os.path.isfile(page_file):
            self.serve_local_file(page_file)
            return

        local_file = os.path.join(BASE_DIR, self.path.lstrip("/").replace("/", os.sep))
        if os.path.isfile(local_file):
            self.serve_static(local_file)
            return

        self.proxy_request()

    def serve_static(self, filepath):
        import mimetypes
        content_type, _ = mimetypes.guess_type(filepath)
        if not content_type:
            content_type = "application/octet-stream"
        try:
            with open(filepath, "rb") as f:
                data = f.read()
            self.send_response(200)
            self.send_header("Content-Type", content_type)
            self.send_header("Content-Length", len(data))
            self.send_header("Cache-Control", "public, max-age=86400")
            self.end_headers()
            self.wfile.write(data)
        except Exception as e:
            self.send_error(500, str(e))

    def serve_local_file(self, filepath):
        try:
            with open(filepath, "rb") as f:
                data = f.read()
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", len(data))
            self.end_headers()
            self.wfile.write(data)
        except Exception as e:
            self.send_error(500, str(e))

    def proxy_request(self):
        url = ORIGIN + self.path
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, context=ssl_ctx, timeout=15) as resp:
                data = resp.read()
                content_type = resp.headers.get("Content-Type", "application/octet-stream")
                self.send_response(200)
                self.send_header("Content-Type", content_type)
                self.send_header("Content-Length", len(data))
                self.send_header("Access-Control-Allow-Origin", "*")
                self.send_header("Cache-Control", "public, max-age=86400")
                self.end_headers()
                self.wfile.write(data)
        except Exception as e:
            self.send_error(502, f"Proxy error: {e}")

    def log_message(self, format, *args):
        msg = format % args
        if "404" in msg or "502" in msg or "500" in msg:
            sys.stderr.write(f"[ERROR] {msg}\n")


if __name__ == "__main__":
    os.chdir(BASE_DIR)
    server = http.server.HTTPServer(("", PORT), ProxyHandler)
    print(f"=== SNPE Local Proxy Server ===")
    print(f"http://localhost:{PORT}")
    print(f"Local pages: /pages/ directory")
    print(f"CSS/JS/Fonts -> proxied from {ORIGIN}")
    print(f"Press Ctrl+C to stop")
    print()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
        server.server_close()
